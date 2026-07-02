// Search "thông minh": không dấu + từ đồng nghĩa + sửa lỗi chính tả + xếp theo độ liên quan.
// Khớp theo TỪ trên (tên + series + tag + danh mục) — KHÔNG dùng mô tả để tránh nhiễu.
import { normalizeVi } from './text'
import { SYNONYMS } from '../data/facets'
import { products, categoryLabel, type Product } from '../data/products'

interface Indexed {
  product: Product
  text: string
  words: Set<string>
  rawWords: Set<string>
}

const indexed: Indexed[] = products.map((p) => {
  const parts = [p.name, p.series, p.code, categoryLabel[p.category], ...p.tags]
  const raw = parts.join(' ')
  const text = normalizeVi(raw)
  const words = new Set(text.split(' ').filter((w) => w.length >= 2))
  const rawWords = new Set(raw.toLowerCase().split(/\s+/).filter((w) => w.length >= 2))
  return { product: p, text, words, rawWords }
})

const productsByCode = new Map(
  products.map((product) => [String(Number(product.code)), product] as const),
)

export function productCodesFromQuery(rawQuery: string): string[] | null {
  const query = rawQuery.trim()
  if (!query || !/^[\d\s,;./|+\-_–—]+$/u.test(query)) return null

  const codes = query.match(/\d+/g) ?? []
  if (!codes.length || codes.some((code) => code.length < 3)) return null

  return [...new Set(codes.map((code) => String(Number(code))))]
}

export function isProductCodeListQuery(rawQuery: string): boolean {
  return productCodesFromQuery(rawQuery) !== null
}

function productsFromCodeList(rawQuery: string): Product[] | null {
  const codes = productCodesFromQuery(rawQuery)
  if (!codes) return null

  return codes
    .map((code) => productsByCode.get(code))
    .filter((product): product is Product => Boolean(product))
}

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

  const productsByRequestedCode = productsFromCodeList(rawQuery)
  if (productsByRequestedCode) return productsByRequestedCode

  const { primary, phrases } = tokenize(rawQuery)
  if (!primary.length && !phrases.length) return products

  const N = indexed.length || 1
  const df = primary.map((t) => indexed.reduce((c, it) => c + (tokenHitsWords(t, it.words) ? 1 : 0), 0))
  const idf = df.map((d) => Math.log((N + 1) / (d + 1)) + 0.2)
  // Token không khớp sản phẩm nào (df=0, vd "xinh", "đẹp" — tính từ cảm tính không có trong dữ liệu)
  // bị loại khỏi yêu cầu bắt buộc: không thể đòi khớp một từ không tồn tại trong kho dữ liệu.
  const realIdx = idf.map((_, i) => i).filter((i) => df[i] > 0)

  const hasDiacritics = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i.test(rawQuery)
  const rawTokens = hasDiacritics ? rawQuery.toLowerCase().split(/\s+/).filter((t) => t.length >= 2) : []

  // Ánh xạ token chuẩn hoá → token gốc (có dấu) để phân biệt "đá"/"da"/"dạ", "nằm"/"nam"
  const rawByNorm = new Map<string, string>()
  if (hasDiacritics) {
    const normParts = normalizeVi(rawQuery).split(' ').filter((t) => t.length >= 2)
    for (let i = 0; i < Math.min(rawTokens.length, normParts.length); i++) {
      if (rawTokens[i] !== normParts[i]) rawByNorm.set(normParts[i], rawTokens[i])
    }
  }

  const scored = new Map<string, number>()
  const add = (id: string, pts: number) => scored.set(id, (scored.get(id) ?? 0) + pts)

  for (const it of indexed) {
    let tokenPts = 0
    let matchedCount = 0
    for (let i = 0; i < primary.length; i++) {
      if (df[i] === 0) continue // từ không tồn tại trong kho dữ liệu — bỏ qua, không bắt buộc khớp
      let matched = tokenHitsWords(primary[i], it.words)
      if (matched) {
        // Nếu người dùng gõ CÓ dấu cho token này, bắt buộc khớp đúng dấu gốc
        // (tránh "nằm" khớp "nam", "đá" khớp "da"/"dạ" chỉ vì trùng sau khi bỏ dấu).
        const rawForm = rawByNorm.get(primary[i])
        if (rawForm) {
          const rawHit = it.rawWords.has(rawForm) ||
            (rawForm.length >= 4 && [...it.rawWords].some((rw) => rw.startsWith(rawForm)))
          if (!rawHit) matched = false
        }
      }
      if (matched) {
        tokenPts += 2 * idf[i]
        matchedCount++
      }
    }
    let phrasePts = 0
    for (const ph of phrases) if (it.text.includes(ph)) phrasePts += 1

    if (realIdx.length > 0) {
      // Bắt buộc khớp ĐỦ toàn bộ từ khoá có thật (AND) — gõ "nam hút thuốc" thì phải
      // vừa là nam, vừa hút thuốc, không lọt sản phẩm chỉ khớp 1 trong 2 điều kiện.
      if (matchedCount === realIdx.length) {
        add(it.product.id, tokenPts + phrasePts)
      } else if (phrasePts > 0 && tokenPts > 0) {
        // Ngoại lệ cho từ khoá mơ hồ mở rộng qua đồng nghĩa (vd "đi làm" -> công sở):
        // chấp nhận nếu cụm đồng nghĩa khớp VÀ có ít nhất 1 từ khoá gốc khớp thật.
        add(it.product.id, tokenPts + phrasePts)
      }
    } else if (phrasePts > 0) {
      add(it.product.id, phrasePts)
    }
  }

  // Lượt 2 (chỉ khi KHÔNG có từ khoá nào tồn tại thật trong dữ liệu): thử sửa lỗi chính tả.
  // KHÔNG chạy khi mọi token đều là từ thật nhưng tổ hợp AND không ra sản phẩm nào — trường hợp
  // đó nghĩa là shop thật sự chưa có sản phẩm khớp đủ điều kiện, trả rỗng mới đúng (không đoán bừa).
  if (scored.size === 0 && realIdx.length === 0) {
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
