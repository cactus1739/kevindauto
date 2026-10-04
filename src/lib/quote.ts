import { productsById, type Category } from '../data/products'
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

/**
 * Nội dung copy gửi shop qua Zalo/Messenger: CHỈ mã sản phẩm, mỗi mã 1 dòng, xếp từ nhỏ
 * tới lớn. Mẫu đặt nhiều cái thì mã được lặp lại theo số lượng để shop vẫn biết số lượng.
 */
export function quoteText(items: QuoteItem[]): string {
  const codes: number[] = []
  for (const it of items) {
    const p = productsById[it.id]
    if (!p) continue
    for (let i = 0; i < it.qty; i++) codes.push(Number(p.code))
  }
  return codes.sort((a, b) => a - b).join('\n')
}
