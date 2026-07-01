import { readdir, access } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const importDir = path.join(root, 'import')
const productDir = path.join(root, 'public', 'products')
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

if (!(await exists(importDir))) {
  console.log('Chua co thu muc import/. Hay tao thu muc va dat anh san pham vao do.')
  process.exit(0)
}

const entries = await readdir(importDir, { withFileTypes: true })
const images = entries
  .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b, 'vi'))

if (images.length === 0) {
  console.log('Khong co anh moi nam truc tiep trong import/.')
  process.exit(0)
}

console.log(`Tim thay ${images.length} anh san pham moi:\n`)

for (const fileName of images) {
  const sourcePath = path.join(importDir, fileName)
  const metadata = await sharp(sourcePath).metadata()
  const outputName = `${path.parse(fileName).name}.webp`
  const duplicate = await exists(path.join(productDir, outputName))
  const size = metadata.width && metadata.height ? `${metadata.width}x${metadata.height}` : 'khong ro kich thuoc'
  console.log(`- ${fileName} | ${size}${duplicate ? ' | CANH BAO: trung ten anh da dang' : ''}`)
}

console.log('\nHay nhan Codex: "Xu ly anh moi trong import va dua len web".')
