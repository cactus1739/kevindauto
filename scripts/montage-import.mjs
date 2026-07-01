import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const sourceDir = process.argv[2]
if (!sourceDir) {
  console.error('Cach dung: node scripts/montage-import.mjs import/0300')
  process.exit(1)
}

const extensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const files = (await readdir(sourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

const columns = 5
const rows = 5
const cellWidth = 180
const imageHeight = 220
const labelHeight = 30
const outputDir = path.join('scripts', '_preview', path.basename(sourceDir))
await mkdir(outputDir, { recursive: true })

for (let page = 0; page * columns * rows < files.length; page++) {
  const pageFiles = files.slice(page * columns * rows, (page + 1) * columns * rows)
  const width = columns * cellWidth
  const height = rows * (imageHeight + labelHeight)
  const composites = []

  for (let index = 0; index < pageFiles.length; index++) {
    const fileName = pageFiles[index]
    const column = index % columns
    const row = Math.floor(index / columns)
    const left = column * cellWidth
    const top = row * (imageHeight + labelHeight)
    const image = await sharp(path.join(sourceDir, fileName))
      .resize({ width: cellWidth, height: imageHeight, fit: 'contain', background: '#f4f4f5' })
      .toBuffer()
    const label = Buffer.from(
      `<svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">` +
        `<rect width="100%" height="100%" fill="#111827"/>` +
        `<text x="50%" y="20" text-anchor="middle" font-family="Arial" font-size="15" fill="white">${fileName}</text>` +
      `</svg>`,
    )
    composites.push({ input: image, left, top })
    composites.push({ input: label, left, top: top + imageHeight })
  }

  const outputPath = path.join(outputDir, `page-${page + 1}.webp`)
  await sharp({ create: { width, height, channels: 3, background: '#f4f4f5' } })
    .composite(composites)
    .webp({ quality: 88 })
    .toFile(outputPath)
  console.log(outputPath)
}
