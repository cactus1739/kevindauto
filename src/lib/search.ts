// Search "thông minh": không dấu + từ đồng nghĩa + sửa lỗi chính tả + xếp theo độ liên quan.
// Khớp theo TỪ trên (tên + series + tag + danh mục) — KHÔNG dùng mô tả để tránh nhiễu.
import { normalizeVi } from './text'
import { SYNONYMS } from '../data/facets'
import { products, categoryLabel, type Product } from '../data/products'

interface Indexed {
  product: Product
  text: string
  words: Set<string>
}

const indexed: Indexed[] = products.map((p) => {
  const text = normalizeVi([p.name, p.series, p.code, categoryLabel[p.category], ...p.tags].join(' '))
  const words = new Set(text.split(' ').filter((w) => w.length >= 2))
  return { product: p, text, words }
})

// Từ điển tất cả các từ (để sửa lỗi chính tả).
const vocab = [...new Set(indexed.flatMap((i) => [...i.words]))].filter((w) => w.length >= 3)

// Khoảng cách Damerau-Levenshtein (tính cả hoán vị 2 ký tự liền kề: "vets" -> "vest").
function lev(a: string, b: string): number {
  const m = a.length
  const n = b.length
  if (Math.abs(m - n) > 2) return 99
  let prevPrev: number[] = []
  let prev = Array.from({ length: n + 1 }, (_, i) => i)
  for (let i = 1; i <= m; i++) {
    const cur = [i]
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        cur[j] = Math.min(cur[j], prevPrev[j - 2] + 1)
      }
    }
    prevPrev = prev
    prev = cur
  }
  return prev[n]
}

/** Gợi ý từ đúng cho 1 token gõ sai (vd "vets" -> "vest", "hodie" -> "hoodie"). */
function corrections(token: string): string[] {
  if (token.length < 4) return []
  const max = token.length <= 5 ? 1 : 2
  return vocab.filter((w) => Math.abs(w.length - token.length) <= 2 && lev(token, w) <= max)
}

function tokenize(rawQuery: string) {
  const nq = normalizeVi(rawQuery)
  const primary = [...new Set(nq.split(' ').filter((t) => t.length >= 2))]
  const phrases = new Set<string>()
  for (const [trigger, expansions] of Object.entries(SYNONYMS)) {
    // cụm nhiều từ: khớp cả chuỗi; một từ: khớp đúng token (tránh 'ong' lọt vào 'long')
    const hit = trigger.includes(' ') ? nq.includes(trigger) : primary.includes(trigger)
    if (hit) for (const e of expansions) phrases.add(e)
  }
  return { primary, phrases: [...phrases] }
}

function tokenHitsWords(token: string, words: Set<string>): boolean {
  if (words.has(token)) return true
  if (token.length >= 4) for (const w of words) if (w.startsWith(token)) return true
  return false
}

/**
 * Trả về sản phẩm khớp query, xếp theo độ liên quan. Query rỗng => toàn bộ.
 * Kết quả "chọn lọc": chỉ gồm sản phẩm thật sự dính từ khoá/đặc điểm.
 */
export function searchProducts(rawQuery: string): Product[] {
  if (!rawQuery.trim()) return products

  const { primary, phrases } = tokenize(rawQuery)
  if (!primary.length && !phrases.length) return products

  const N = indexed.length || 1
  // Tần suất tài liệu (df) + trọng số IDF: từ càng phổ biến (vd "người") trọng số càng thấp.
  const df = primary.map((t) => indexed.reduce((c, it) => c + (tokenHitsWords(t, it.words) ? 1 : 0), 0))
  const idf = df.map((d) => Math.log((N + 1) / (d + 1)) + 0.2)
  const common = df.map((d) => d > N * 0.3) // token khớp > 30% sản phẩm = quá phổ biến
  const allCommon = common.every(Boolean)
  const totalIdf = idf.reduce((a, b) => a + b, 0) || 1
  const COVER = 0.45 // sản phẩm phải "phủ" tối thiểu 45% trọng số truy vấn mới được tính

  const scored = new Map<string, number>()
  const add = (id: string, pts: number) => scored.set(id, (scored.get(id) ?? 0) + pts)

  // Lượt 1: khớp từ khoá (có trọng số IDF) + cụm đồng nghĩa
  for (const it of indexed) {
    let tokenPts = 0
    let matchedIdf = 0
    let hitSpecific = false
    for (let i = 0; i < primary.length; i++) {
      if (tokenHitsWords(primary[i], it.words)) {
        tokenPts += 2 * idf[i]
        matchedIdf += idf[i]
        if (allCommon || !common[i]) hitSpecific = true // khớp được một từ ĐẶC TRƯNG
      }
    }
    let phrasePts = 0
    for (const ph of phrases) if (it.text.includes(ph)) phrasePts += 1

    // Đủ điều kiện: khớp cụm đồng nghĩa, HOẶC khớp ≥1 từ đặc trưng và phủ đủ trọng số truy vấn
    // (tránh việc chỉ khớp một từ quá phổ biến như "người" mà lọt vào kết quả).
    if (phrasePts > 0 || (hitSpecific && matchedIdf >= COVER * totalIdf)) {
      add(it.product.id, tokenPts + phrasePts)
    }
  }

  // Lượt 2 (chỉ khi KHÔNG ra gì): sửa lỗi chính tả token gốc rồi thử lại
  if (scored.size === 0) {
    for (const token of primary) {
      for (const cw of corrections(token)) {
        for (const it of indexed) if (it.words.has(cw)) add(it.product.id, 1)
      }
    }
  }

  return [...scored.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => indexed.find((i) => i.product.id === id)!.product)
}
