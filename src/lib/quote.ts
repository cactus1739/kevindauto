import { productsById, type Category } from '../data/products'
import { formatVND, site } from '../data/site'
import type { QuoteItem } from '../context/ui'

/** Danh mục tính là "phôi người" — được hưởng ưu đãi cứ 11 cái tặng 1 (không áp dụng cho
 * xe, động vật & chibi, phụ kiện diorama vì đó không phải phôi hình người). */
const PHOI_NGUOI_CATEGORIES: Category[] = ['nam', 'nu', 'giadinh', 'treem', 'caotuoi', 'duongpho', 'thethao']

export interface PhoiNguoiDiscount {
  eligibleQty: number
  freeQty: number
  discountAmount: number
}

/** Tổng tiền trước khi áp ưu đãi. */
export function quoteSubtotal(items: QuoteItem[]): number {
  return items.reduce((sum, it) => {
    const p = productsById[it.id]
    return sum + (p ? p.price * it.qty : 0)
  }, 0)
}

/**
 * Ưu đãi phôi người: cứ đủ 11 phôi (10 trả tiền + 1 miễn phí) thì lặp lại —
 * 11 phôi tặng 1, 22 phôi tặng 2, v.v. Phôi giá thấp nhất trong danh sách được
 * tính miễn phí trước để công bằng cho khách.
 */
export function quotePhoiNguoiDiscount(items: QuoteItem[]): PhoiNguoiDiscount {
  const unitPrices: number[] = []
  for (const it of items) {
    const p = productsById[it.id]
    if (!p || !PHOI_NGUOI_CATEGORIES.includes(p.category)) continue
    for (let i = 0; i < it.qty; i++) unitPrices.push(p.price)
  }

  const eligibleQty = unitPrices.length
  const freeQty = Math.floor(eligibleQty / 11)
  unitPrices.sort((a, b) => a - b)
  const discountAmount = unitPrices.slice(0, freeQty).reduce((sum, v) => sum + v, 0)

  return { eligibleQty, freeQty, discountAmount }
}

/** Tổng tạm tính của danh sách báo giá sau khi trừ ưu đãi phôi người. */
export function quoteTotal(items: QuoteItem[]): number {
  return quoteSubtotal(items) - quotePhoiNguoiDiscount(items).discountAmount
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

  const subtotal = quoteSubtotal(items)
  const { freeQty, discountAmount } = quotePhoiNguoiDiscount(items)
  const discountLine =
    freeQty > 0
      ? `\nƯu đãi phôi người (cứ 11 tặng 1): -${freeQty} phôi = -${formatVND(discountAmount)}`
      : ''

  return (
    `Chào ${site.brand}, mình muốn báo giá ${items.length} mẫu:\n` +
    lines.join('\n') +
    `\n\nTạm tính: ${formatVND(subtotal)}${discountLine}` +
    `\nThành tiền: ${formatVND(subtotal - discountAmount)}\n(Gửi từ website kevindauto.com)`
  )
}
