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
 * Nội dung copy gửi shop qua Zalo/Messenger: CHỈ mã sản phẩm 4 chữ số, mỗi mã 1 dòng, xếp từ nhỏ
 * tới lớn. Mẫu đặt nhiều cái thì mã được lặp lại theo số lượng để shop vẫn biết số lượng.
 */
export function quoteCodes(items: QuoteItem[]): string[] {
  const codes: number[] = []
  for (const it of items) {
    const p = productsById[it.id]
    if (!p) continue
    for (let i = 0; i < it.qty; i++) codes.push(Number(p.code))
  }
  // Mã luôn đủ 4 chữ số (1 → 0001, 61 → 0061) cho thống nhất.
  return codes.sort((a, b) => a - b).map((code) => String(code).padStart(4, '0'))
}

/**
 * Bản chữ thường: các mã cách nhau 1 dòng trống. Notion (và trình soạn kiểu Markdown) chỉ tách
 * thành khối/đoạn riêng khi gặp dòng trống — xuống dòng đơn bị coi là ngắt dòng mềm (Shift+Enter).
 */
export function quoteText(items: QuoteItem[]): string {
  return quoteCodes(items).join('\n\n')
}

/**
 * Bản HTML: mỗi mã là 1 đoạn <p> riêng — dán vào Zalo, Word, Google Docs… sẽ thành các đoạn
 * như bấm Enter thật, thay vì ngắt dòng mềm kiểu Shift+Enter của bản chữ thường.
 */
export function quoteHtml(items: QuoteItem[]): string {
  return quoteCodes(items).map((code) => `<p>${code}</p>`).join('')
}
