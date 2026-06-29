// ============================================================================
//  IMPORT SẢN PHẨM -> WooCommerce (headless)
//  Đẩy toàn bộ sản phẩm trong src/data/products.ts lên WordPress/WooCommerce.
//  Ảnh được WooCommerce tự kéo về từ URL công khai (PUBLIC_IMG_BASE).
//
//  Cách chạy (không cần cài thêm gì nhờ npx):
//    1) Sao chép .env.example -> .env, điền WOO_URL / WOO_KEY / WOO_SECRET
//    2) npx -y tsx scripts/woo-import.ts --dry   (xem trước, KHÔNG gửi)
//    3) npx -y tsx scripts/woo-import.ts         (import thật)
//
//  Script CHẠY LẠI ĐƯỢC NHIỀU LẦN an toàn: trùng SKU thì cập nhật, không tạo trùng.
// ============================================================================
import { readFileSync, existsSync } from 'node:fs'
import { products, categories, categoryLabel } from '../src/data/products'

// ---- Nạp biến môi trường từ .env (không cần thư viện) ----------------------
function loadEnv(file = '.env') {
  if (!existsSync(file)) return
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}
loadEnv()

const WOO_URL = (process.env.WOO_URL || '').replace(/\/$/, '')
const WOO_KEY = process.env.WOO_KEY || ''
const WOO_SECRET = process.env.WOO_SECRET || ''
const IMG_BASE = (process.env.PUBLIC_IMG_BASE || 'https://kevindauto.com/products').replace(/\/$/, '')
const DRY = process.argv.includes('--dry')

if (!WOO_URL || !WOO_KEY || !WOO_SECRET) {
  console.error('❌ Thiếu WOO_URL / WOO_KEY / WOO_SECRET (điền trong file .env).')
  process.exit(1)
}

const API = `${WOO_URL}/wp-json/wc/v3`
const AUTH = 'Basic ' + Buffer.from(`${WOO_KEY}:${WOO_SECRET}`).toString('base64')

async function woo(path: string, method = 'GET', body?: unknown) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let data: any
  try { data = text ? JSON.parse(text) : null } catch { data = text }
  if (!res.ok) {
    throw new Error(`${method} ${path} -> ${res.status}: ${typeof data === 'string' ? data : JSON.stringify(data)}`)
  }
  return data
}

// ---- 1) Tạo / lấy danh mục (map slug -> id Woo) ----------------------------
async function ensureCategories(): Promise<Record<string, number>> {
  const map: Record<string, number> = {}
  // Lấy danh mục đã có để tránh tạo trùng
  const existing: any[] = await woo('/products/categories?per_page=100')
  const bySlug = new Map(existing.map((c) => [c.slug, c.id]))
  for (const { id: slug } of categories) {
    if (bySlug.has(slug)) {
      map[slug] = bySlug.get(slug)
      continue
    }
    if (DRY) { console.log(`  [dry] tạo danh mục "${categoryLabel[slug]}" (${slug})`); map[slug] = -1; continue }
    const created = await woo('/products/categories', 'POST', { name: categoryLabel[slug], slug })
    map[slug] = created.id
    console.log(`  + danh mục "${categoryLabel[slug]}" (id ${created.id})`)
  }
  return map
}

// ---- 2) Dựng payload sản phẩm cho WooCommerce ------------------------------
function buildPayload(p: (typeof products)[number], catMap: Record<string, number>) {
  return {
    name: p.name,
    type: 'simple',
    sku: p.code,
    regular_price: String(p.price),
    description: p.description,
    short_description: p.description,
    catalog_visibility: 'visible',
    stock_status: p.inStock ? 'instock' : 'outofstock',
    categories: [{ id: catMap[p.category] }],
    tags: p.tags.map((name) => ({ name })),
    images: [{ src: `${IMG_BASE}/sp-${p.code}.webp` }],
    // Các trường riêng của KEVIN ĐẦU TO -> lưu vào meta để React đọc lại qua API
    meta_data: [
      { key: '_kdt_series', value: p.series },
      { key: '_kdt_material', value: p.material },
      { key: '_kdt_badge', value: p.badge ?? '' },
      { key: '_kdt_accent', value: p.accent },
      { key: '_kdt_rating', value: String(p.rating) },
      { key: '_kdt_reviews', value: String(p.reviews) },
      { key: '_kdt_category', value: p.category },
      { key: '_kdt_highlights', value: JSON.stringify(p.highlights) },
    ],
  }
}

// ---- 3) Tìm sản phẩm theo SKU (để cập nhật thay vì tạo trùng) --------------
async function findBySku(sku: string): Promise<number | null> {
  const found: any[] = await woo(`/products?sku=${encodeURIComponent(sku)}`)
  return found.length ? found[0].id : null
}

// ---- Chạy ------------------------------------------------------------------
async function main() {
  console.log(`→ WooCommerce: ${WOO_URL}`)
  console.log(`→ Ảnh kéo từ: ${IMG_BASE}/sp-<mã>.webp`)
  console.log(`→ Tổng ${products.length} sản phẩm${DRY ? '  [CHẾ ĐỘ DRY — không gửi gì]' : ''}\n`)

  console.log('1) Danh mục...')
  const catMap = await ensureCategories()

  console.log('\n2) Sản phẩm...')
  let created = 0, updated = 0, failed = 0
  for (const p of products) {
    const payload = buildPayload(p, catMap)
    try {
      if (DRY) { console.log(`  [dry] ${p.code} — ${p.name}`); continue }
      const existingId = await findBySku(p.code)
      if (existingId) {
        await woo(`/products/${existingId}`, 'PUT', payload)
        updated++
        console.log(`  ~ cập nhật ${p.code} — ${p.name}`)
      } else {
        await woo('/products', 'POST', payload)
        created++
        console.log(`  + tạo ${p.code} — ${p.name}`)
      }
    } catch (err) {
      failed++
      console.error(`  ✗ LỖI ${p.code}: ${(err as Error).message}`)
    }
  }

  console.log(`\n✅ Xong. Tạo mới: ${created} | Cập nhật: ${updated} | Lỗi: ${failed}`)
}

main().catch((e) => { console.error('❌', e); process.exit(1) })
