import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const sourceDir = process.argv[2]
const start = Number(process.argv[3])
const end = Number(process.argv[4])
const outputDir = process.argv[5] || 'public/products'

if (!sourceDir || !Number.isInteger(start) || !Number.isInteger(end) || end < start) {
  console.error('Cach dung: node scripts/import-numbered-images.mjs <thu-muc> <ma-dau> <ma-cuoi> [thu-muc-dich]')
  process.exit(1)
}

const entries = await readdir(sourceDir, { withFileTypes: true })
const filesByCode = new Map(
  entries
    .filter((entry) => entry.isFile() && /^\d+\.(jpe?g|png|webp)$/i.test(entry.name))
    .map((entry) => [Number(path.parse(entry.name).name), entry.name]),
)

await mkdir(outputDir, { recursive: true })

for (let code = start; code <= end; code++) {
  const fileName = filesByCode.get(code)
  if (!fileName) throw new Error(`Thieu anh ma ${code} trong ${sourceDir}`)

  await sharp(path.join(sourceDir, fileName))
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(path.join(outputDir, `sp-${code}.webp`))
}

console.log(`Da toi uu ${end - start + 1} anh: sp-${start}.webp -> sp-${end}.webp`)
