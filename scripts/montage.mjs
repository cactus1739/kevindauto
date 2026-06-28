// Ghép 52 ảnh đã cắt thành 4 bảng (mỗi hàng 13 ô) có đánh số mã, để soi nhanh.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const COLS = 13
const ROWS = 4
const START = parseInt(process.env.START || '4400', 10)
const CW = 150
const CH = 205
const LH = 26
const outDir = process.env.MONTAGE_DIR || 'scripts/_preview'
mkdirSync(outDir, { recursive: true })

for (let r = 0; r < ROWS; r++) {
  const width = COLS * CW
  const height = CH + LH
  const composites = []
  let labels = ''
  for (let c = 0; c < COLS; c++) {
    const code = START + r * COLS + c
    const buf = await sharp(`public/products/sp-${code}.webp`)
      .resize({ width: CW, height: CH, fit: 'cover' })
      .toBuffer()
    composites.push({ input: buf, left: c * CW, top: 0 })
    labels += `<rect x="${c * CW}" y="${CH}" width="${CW}" height="${LH}" fill="#111"/>` +
      `<text x="${c * CW + CW / 2}" y="${CH + 18}" font-family="sans-serif" font-size="15" fill="#fff" text-anchor="middle">${code}</text>`
  }
  const svg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${labels}</svg>`,
  )
  composites.push({ input: svg, left: 0, top: 0 })
  await sharp({ create: { width, height, channels: 3, background: '#1b1f26' } })
    .composite(composites)
    .webp({ quality: 80 })
    .toFile(`${outDir}/row-${r + 1}.webp`)
  console.log(`row-${r + 1}.webp (mã ${START + r * COLS} → ${START + r * COLS + COLS - 1})`)
}
