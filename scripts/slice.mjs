// Cắt ảnh lưới 4400–4451 thành 52 ảnh sản phẩm đơn lẻ.
// Cách dùng:
//   node scripts/slice.mjs calibrate          -> chỉ cắt vài ô góc để canh
//   node scripts/slice.mjs all <trimBottom>   -> cắt toàn bộ 52 ô vào public/products
// trimBottom: tỉ lệ % chiều cao ô cắt bỏ phía dưới (bỏ phần số nhãn). Mặc định 0.14
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const SRC = 'import/4400/4400-4451 color_.jpg'
const COLS = 13
const ROWS = 4
const START = 4400

const mode = process.argv[2] || 'calibrate'
// Mặc định GIỮ NGUYÊN ô: không cắt viền, không cắt nhãn số (full cell)
const trimBottom = process.argv[3] !== undefined ? parseFloat(process.argv[3]) : 0
const trimSide = process.argv[4] !== undefined ? parseFloat(process.argv[4]) : 0

const meta = await sharp(SRC).metadata()
const W = meta.width
const H = meta.height
console.log(`Ảnh gốc: ${W}x${H}, ô ~ ${Math.round(W / COLS)}x${Math.round(H / ROWS)}`)

function cellBox(r, c) {
  const x0 = Math.round((c * W) / COLS)
  const x1 = Math.round(((c + 1) * W) / COLS)
  const y0 = Math.round((r * H) / ROWS)
  const y1 = Math.round(((r + 1) * H) / ROWS)
  let cw = x1 - x0
  let ch = y1 - y0
  // cắt biên
  const sx = Math.round(cw * trimSide)
  const left = x0 + sx
  const width = cw - sx * 2
  const top = y0
  const height = Math.round(ch * (1 - trimBottom))
  return { left, top, width, height }
}

async function extract(r, c, outPath, size = 640) {
  const box = cellBox(r, c)
  await sharp(SRC)
    .extract(box)
    .resize({ width: size, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(outPath)
}

if (mode === 'calibrate') {
  const dir = process.env.PREVIEW_DIR || 'scripts/_preview'
  mkdirSync(dir, { recursive: true })
  const picks = [
    [0, 0],
    [0, COLS - 1],
    [1, 6],
    [2, 3],
    [3, 0],
    [3, COLS - 1],
  ]
  for (const [r, c] of picks) {
    const code = START + r * COLS + c
    await extract(r, c, `${dir}/cell-${code}.webp`)
    console.log(`canh: ${code} (hàng ${r}, cột ${c})`)
  }
  console.log(`Xong calibrate → ${dir}`)
} else if (mode === 'all') {
  const dir = 'public/products'
  mkdirSync(dir, { recursive: true })
  let n = 0
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const code = START + r * COLS + c
      await extract(r, c, `${dir}/sp-${code}.webp`)
      n++
    }
  }
  console.log(`Đã cắt ${n} ảnh → ${dir}/sp-4400..sp-4451.webp (trimBottom=${trimBottom})`)
}
