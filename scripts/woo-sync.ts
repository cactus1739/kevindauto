// ============================================================================
//  ĐỒNG BỘ NGƯỢC: WooCommerce -> src/data/products.generated.ts
//  Kéo toàn bộ sản phẩm (kể cả mục bạn vừa sửa/thêm trên trang admin) về,
//  dựng lại đúng định dạng Product để web React hiển thị.
//
//  Cách chạy:
//    npx -y tsx scripts/woo-sync.ts
//  Sau đó build + deploy như thường (npm run build) để web cập nhật.
// ============================================================================
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import type { Product, Category, Accent } from '../src/data/products'

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
if (!WOO_URL || !WOO_KEY || !WOO_SECRET) {
  console.error('❌ Thiếu WOO_URL / WOO_KEY / WOO_SECRET (điền trong file .env).')
  process.exit(1)
}
const API = `${WOO_URL}/wp-json/wc/v3`
const AUTH = 'Basic ' + Buffer.from(`${WOO_KEY}:${WOO_SECRET}`).toString('base64')

async function woo(path: string) {
  const res = await fetch(`${API}${path}`, { headers: { Authorization: AUTH } })
  const text = await res.text()
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}: ${text}`)
  return JSON.parse(text)
}

// ---- tiện ích đọc meta + làm sạch ------------------------------------------
const metaVal = (p: any, key: string): string => {
  const m = (p.meta_data || []).find((x: any) => x.key === key)
  return m && m.value != null ? String(m.value) : ''
}
const stripHtml = (s: string) => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()

function mapProduct(p: any): Product {
  const code = String(p.sku || p.id)
  const highlightsRaw = metaVal(p, '_kdt_highlights')
  let highlights: string[] = []
  try { highlights = highlightsRaw ? JSON.parse(highlightsRaw) : [] } catch { highlights = [] }
  if (!highlights.length) highlights = ['Chế tác chi tiết sắc nét', 'Sơn phủ tỉ mỉ', 'Phù hợp trưng bày & diorama']

  const badge = metaVal(p, '_kdt_badge')
  const product: Product = {
    id: `sp-${code}`,
    code,
    name: p.name || '',
    category: (metaVal(p, '_kdt_category') || p.categories?.[0]?.slug || 'nam') as Category,
    series: metaVal(p, '_kdt_series') || '',
    price: Math.round(parseFloat(p.price || p.regular_price || '0')) || 0,
    material: metaVal(p, '_kdt_material') || 'Resin 3D cao cấp',
    rating: Number(metaVal(p, '_kdt_rating')) || 5,
    reviews: Number(metaVal(p, '_kdt_reviews')) || 0,
    inStock: p.stock_status ? p.stock_status === 'instock' : true,
    accent: (metaVal(p, '_kdt_accent') || 'brand') as Accent,
    image: p.images?.[0]?.src || `./products/sp-${code}.webp`,
    tags: (p.tags || []).map((t: any) => t.name),
    description: stripHtml(p.short_description || p.description || ''),
    highlights,
  }
  if (badge) product.badge = badge as Product['badge']
  return product
}

async function main() {
  console.log(`→ Kéo sản phẩm từ ${WOO_URL} ...`)
  const all: any[] = []
  for (let page = 1; ; page++) {
    const batch: any[] = await woo(`/products?per_page=100&page=${page}&orderby=id&order=asc&status=publish`)
    all.push(...batch)
    console.log(`  trang ${page}: +${batch.length} (tổng ${all.length})`)
    if (batch.length < 100) break
  }

  const products = all.map(mapProduct)
  const body =
    `// ============================================================================\n` +
    `//  FILE TỰ ĐỘNG SINH từ WooCommerce — đừng sửa tay.\n` +
    `//  Tạo lại bằng: npx -y tsx scripts/woo-sync.ts\n` +
    `//  Cập nhật lần cuối: ${new Date().toISOString()} — ${products.length} sản phẩm.\n` +
    `// ============================================================================\n` +
    `import type { Product } from './products'\n\n` +
    `export const generatedProducts: Product[] = ${JSON.stringify(products, null, 2)}\n`

  writeFileSync('src/data/products.generated.ts', body, 'utf8')
  console.log(`✅ Đã ghi src/data/products.generated.ts với ${products.length} sản phẩm.`)
}

main().catch((e) => { console.error('❌', e); process.exit(1) })
