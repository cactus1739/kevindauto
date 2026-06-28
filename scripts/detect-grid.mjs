// Dò vị trí các đường kẻ (gutter) dọc & ngang của lưới catalog.
// In ra các biên cột/hàng để cắt cho đúng đường line.
import sharp from 'sharp'

const SRC = 'import/4400/4400-4451 color_.jpg'
const COLS = 13
const ROWS = 4

const img = sharp(SRC).grayscale()
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
const W = info.width
const H = info.height
const ch = info.channels

// Mean brightness theo cột và theo hàng
const colMean = new Float64Array(W)
const rowMean = new Float64Array(H)
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const v = data[(y * W + x) * ch]
    colMean[x] += v
    rowMean[y] += v
  }
}
for (let x = 0; x < W; x++) colMean[x] /= H
for (let y = 0; y < H; y++) rowMean[y] /= W

// Tìm các "thung lũng" (đường kẻ tối) gần các vị trí chia đều kỳ vọng.
function findLines(mean, n, total) {
  const step = total / n
  const lines = [0]
  for (let i = 1; i < n; i++) {
    const guess = Math.round(i * step)
    const win = Math.round(step * 0.12) // ±12% quanh vị trí kỳ vọng
    let best = guess
    let bestVal = Infinity
    for (let p = guess - win; p <= guess + win; p++) {
      if (p < 1 || p >= total - 1) continue
      if (mean[p] < bestVal) {
        bestVal = mean[p]
        best = p
      }
    }
    lines.push(best)
  }
  lines.push(total)
  return lines
}

const colLines = findLines(colMean, COLS, W)
const rowLines = findLines(rowMean, ROWS, H)
console.log('W,H =', W, H)
console.log('colLines =', JSON.stringify(colLines))
console.log('rowLines =', JSON.stringify(rowLines))
// In độ rộng từng cột/hàng để kiểm tra đều không
console.log('colWidths =', colLines.slice(1).map((v, i) => v - colLines[i]).join(','))
console.log('rowHeights =', rowLines.slice(1).map((v, i) => v - rowLines[i]).join(','))
