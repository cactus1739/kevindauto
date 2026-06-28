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
