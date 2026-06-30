import { productsById } from '../data/products'
import { formatVND, site } from '../data/site'
import type { QuoteItem } from '../context/ui'

/** Tổng tạm tính của danh sách báo giá. */
export function quoteTotal(items: QuoteItem[]): number {
  return items.reduce((sum, it) => {
    const p = productsById[it.id]
    return sum + (p ? p.price * it.qty : 0)
  }, 0)
}

/** Soạn nội dung báo giá để gửi shop qua Zalo/Messenger. */
export function quoteText(items: QuoteItem[]): string {
  const lines = items
    .map((it, idx) => {
      const p = productsById[it.id]
      if (!p) return ''
      return `${idx + 1}. [${p.code}] ${p.name} x${it.qty} = ${formatVND(p.price * it.qty)}`
    })
    .filter(Boolean)
  return (
    `Chào ${site.brand}, mình muốn báo giá ${items.length} mẫu:\n` +
    lines.join('\n') +
    `\n\nTạm tính: ${formatVND(quoteTotal(items))}\n(Gửi từ website kevindauto.com)`
  )
}

export interface QuoteContact {
  name: string
  phone: string
  note?: string
}

/** Gửi báo giá thẳng về shop (tạo đơn trong WooCommerce + email cho chủ). */
export async function submitQuote(
  items: QuoteItem[],
  contact: QuoteContact,
): Promise<{ ok: boolean; error?: string; order?: number }> {
  const payload = {
    name: contact.name.trim(),
    phone: contact.phone.trim(),
    note: (contact.note ?? '').trim(),
    website: '', // honeypot — form thật luôn để trống
    items: items
      .map((it) => ({ code: productsById[it.id]?.code, qty: it.qty }))
      .filter((x) => x.code),
  }
  try {
    // Content-Type text/plain để tránh CORS preflight giữa kevindauto.com và subdomain admin
    const res = await fetch(site.quoteApi, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(payload),
    })
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; order?: number }
    if (!res.ok || !data.ok) return { ok: false, error: data.error || 'Gửi thất bại, vui lòng thử lại.' }
    return { ok: true, order: data.order }
  } catch {
    return { ok: false, error: 'Lỗi kết nối, vui lòng thử lại sau.' }
  }
}
