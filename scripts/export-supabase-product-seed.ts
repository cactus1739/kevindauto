import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { products } from '../src/data/products'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const outPath = join(root, 'supabase', 'seed-product-image-embeddings.sql')
const chunksDir = join(root, 'supabase', 'seed-product-image-embeddings')
const publicImageBase = (process.env.PUBLIC_IMG_BASE ?? 'https://kevindauto.com/products').replace(/\/+$/, '')
const chunkSize = 80

function sql(value: string | number | boolean | null | undefined) {
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'number') return String(value)
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  return `'${String(value).replace(/'/g, "''")}'`
}

function sqlTextArray(values: string[]) {
  if (!values.length) return "'{}'"
  return `array[${values.map(sql).join(', ')}]::text[]`
}

const rows = products.map((product) => {
  const imageName = product.image?.split('/').pop() ?? `sp-${product.code}.webp`
  return [
    sql(product.id),
    sql(product.code),
    sql(product.name),
    sql(`${publicImageBase}/${imageName}`),
    sql(product.category),
    sql(product.series),
    sqlTextArray(product.tags),
  ].join(', ')
})

const statements = rows.map((row) => `insert into public.product_image_embeddings (
  product_id,
  code,
  name,
  image_url,
  category,
  series,
  tags
) values (${row})
on conflict (product_id) do update set
  code = excluded.code,
  name = excluded.name,
  image_url = excluded.image_url,
  category = excluded.category,
  series = excluded.series,
  tags = excluded.tags,
  updated_at = now();`)

const body = `-- Du lieu san pham KEVIN DAU TO cho bang tim kiem hinh anh.
-- Chay sau file product-image-search.sql.
-- Cot embedding de null o buoc nay; buoc sau moi tao vector hinh anh.

begin;
${statements.join('\n\n')}
commit;
`

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, body, 'utf8')

rmSync(chunksDir, { recursive: true, force: true })
mkdirSync(chunksDir, { recursive: true })

for (let i = 0; i < rows.length; i += chunkSize) {
  const chunk = rows.slice(i, i + chunkSize)
  const chunkNo = String(Math.floor(i / chunkSize) + 1).padStart(3, '0')
  const startCode = products[i]?.code ?? 'start'
  const endCode = products[Math.min(i + chunkSize, products.length) - 1]?.code ?? 'end'
  const chunkPath = join(chunksDir, `${chunkNo}-${startCode}-${endCode}.sql`)
  const chunkBody = `-- Lo ${chunkNo}: san pham ${startCode} den ${endCode}
insert into public.product_image_embeddings (
  product_id, code, name, image_url, category, series, tags
)
values
${chunk.map((row) => `  (${row})`).join(',\n')}
on conflict (product_id) do update set
  code = excluded.code,
  name = excluded.name,
  image_url = excluded.image_url,
  category = excluded.category,
  series = excluded.series,
  tags = excluded.tags,
  updated_at = now();
`
  writeFileSync(chunkPath, chunkBody, 'utf8')
}

console.log(`Exported ${products.length} products to ${outPath}`)
console.log(`Exported ${Math.ceil(rows.length / chunkSize)} chunk files to ${chunksDir}`)
