import { readFileSync, writeFileSync } from 'node:fs'

const sourcePath = 'C:/tmp/kevindauto-excel-read/products-from-excel.json'
const outputPath = 'src/data/productNameOverrides.ts'

const { rows } = JSON.parse(readFileSync(sourcePath, 'utf8'))
const namesByCode = new Map()

for (const row of rows) {
  const code = String(row.code ?? '').trim()
  const name = String(row.name ?? '').trim()
  if (!code || !name) continue
  const normalizedCode = String(Number(code))
  if (!namesByCode.has(normalizedCode)) namesByCode.set(normalizedCode, [])
  namesByCode.get(normalizedCode).push(name)
}

const sortedEntries = [...namesByCode.entries()].sort((a, b) => Number(a[0]) - Number(b[0]))
const lines = [
  '// Generated from outputs/product-catalog-c16cdb7/du-lieu-san-pham-kevin-dau-to.xlsx',
  '// Edit the Excel file and rerun scripts/apply-excel-product-names.mjs to refresh.',
  'export const productNameOverrides: Record<string, string[]> = {',
]

for (const [code, names] of sortedEntries) {
  lines.push(`  ${JSON.stringify(code)}: ${JSON.stringify(names)},`)
}

lines.push('}')
lines.push('')

writeFileSync(outputPath, lines.join('\n'), 'utf8')
console.log(`Wrote ${sortedEntries.length} code groups to ${outputPath}`)
