import type { QuoteItem } from '../context/ui'
import { productsById } from '../data/products'
import { formatVND, site } from '../data/site'
import { quoteTotal } from './quote'

const FONT_REGULAR_URL = '/fonts/BeVietnamPro-Regular.ttf'
const FONT_BOLD_URL = '/fonts/BeVietnamPro-Bold.ttf'

function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  const chunkSize = 0x8000

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize))
  }

  return btoa(binary)
}

async function fetchFont(url: string) {
  const response = await fetch(url, { cache: 'force-cache' })
  if (!response.ok) throw new Error('Không tải được font tiếng Việt')
  return arrayBufferToBase64(await response.arrayBuffer())
}

async function imageToJpeg(imageUrl?: string): Promise<string | null> {
  if (!imageUrl) return null

  try {
    const url = new URL(imageUrl.replace(/^\.\//, ''), `${window.location.origin}/`).toString()
    const response = await fetch(url, { cache: 'force-cache' })
    if (!response.ok) return null

    const objectUrl = URL.createObjectURL(await response.blob())
    const image = new Image()
    image.src = objectUrl

    try {
      await image.decode()

      const size = 420
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const context = canvas.getContext('2d')
      if (!context) return null

      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, size, size)

      const scale = Math.min(size / image.naturalWidth, size / image.naturalHeight)
      const width = image.naturalWidth * scale
      const height = image.naturalHeight * scale
      context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height)

      return canvas.toDataURL('image/jpeg', 0.82)
    } finally {
      URL.revokeObjectURL(objectUrl)
    }
  } catch {
    return null
  }
}

function pdfFileName() {
  const date = new Date()
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
  return `Kevin-Dau-To-Bao-Gia-${stamp}.pdf`
}

export async function downloadQuotePdf(quote: QuoteItem[]) {
  const items = quote
    .map((item) => ({ ...item, product: productsById[item.id] }))
    .filter((item) => Boolean(item.product))

  if (items.length === 0) throw new Error('Danh sách báo giá đang trống')

  const [{ jsPDF }, regularFont, boldFont] = await Promise.all([
    import('jspdf'),
    fetchFont(FONT_REGULAR_URL),
    fetchFont(FONT_BOLD_URL),
  ])

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true })
  doc.addFileToVFS('BeVietnamPro-Regular.ttf', regularFont)
  doc.addFont('BeVietnamPro-Regular.ttf', 'BeVietnamPro', 'normal')
  doc.addFileToVFS('BeVietnamPro-Bold.ttf', boldFont)
  doc.addFont('BeVietnamPro-Bold.ttf', 'BeVietnamPro', 'bold')
  doc.setFont('BeVietnamPro', 'normal')

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 14
  const contentWidth = pageWidth - margin * 2
  const rowHeight = 36
  const bottomLimit = pageHeight - 20
  const totalQuantity = items.reduce((sum, item) => sum + item.qty, 0)
  const generatedAt = new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date())

  const drawHeader = (continued = false) => {
    doc.setFillColor(15, 10, 28)
    doc.rect(0, 0, pageWidth, continued ? 29 : 45, 'F')
    doc.setTextColor(244, 63, 94)
    doc.setFont('BeVietnamPro', 'bold')
    doc.setFontSize(11)
    doc.text(site.brand, margin, 12)

    if (continued) {
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(16)
      doc.text('BÁO GIÁ SẢN PHẨM — TIẾP THEO', margin, 22)
      return 35
    }

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.text('BÁO GIÁ SẢN PHẨM', margin, 24)
    doc.setFont('BeVietnamPro', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(203, 213, 225)
    doc.text(site.tagline, margin, 32)
    doc.text(`${site.phone}  •  ${site.email}`, margin, 38)
    doc.text(generatedAt, pageWidth - margin, 12, { align: 'right' })

    doc.setTextColor(71, 85, 105)
    doc.setFontSize(8.5)
    doc.text(
      `${items.length} mẫu • ${totalQuantity} sản phẩm • Giá dưới đây là tạm tính`,
      margin,
      52,
    )
    return 59
  }

  let y = drawHeader()

  for (let index = 0; index < items.length; index += 1) {
    const { product, qty } = items[index]
    if (!product) continue

    if (y + rowHeight > bottomLimit) {
      doc.addPage()
      y = drawHeader(true)
    }

    doc.setFillColor(index % 2 === 0 ? 249 : 255, index % 2 === 0 ? 250 : 255, 251)
    doc.setDrawColor(226, 232, 240)
    doc.roundedRect(margin, y, contentWidth, rowHeight - 2, 2.5, 2.5, 'FD')

    const imageData = await imageToJpeg(product.image)
    if (imageData) {
      doc.addImage(imageData, 'JPEG', margin + 2.5, y + 2.5, 29, 29, undefined, 'FAST')
    } else {
      doc.setFillColor(241, 245, 249)
      doc.roundedRect(margin + 2.5, y + 2.5, 29, 29, 2, 2, 'F')
      doc.setFont('BeVietnamPro', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(148, 163, 184)
      doc.text(product.code, margin + 17, y + 18, { align: 'center' })
    }

    const textX = margin + 35
    doc.setFont('BeVietnamPro', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(15, 23, 42)
    const titleLines = doc.splitTextToSize(product.name, 87).slice(0, 2)
    doc.text(titleLines, textX, y + 8)

    doc.setFont('BeVietnamPro', 'normal')
    doc.setFontSize(8.3)
    doc.setTextColor(100, 116, 139)
    doc.text(`Mã ${product.code}`, textX, y + 20)
    doc.text(`${formatVND(product.price)} × ${qty}`, textX, y + 27)

    doc.setFont('BeVietnamPro', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(225, 29, 72)
    doc.text(formatVND(product.price * qty), pageWidth - margin - 3, y + 18, { align: 'right' })

    y += rowHeight
  }

  if (y + 31 > bottomLimit) {
    doc.addPage()
    y = drawHeader(true)
  }

  doc.setFillColor(76, 29, 149)
  doc.roundedRect(margin, y + 2, contentWidth, 23, 3, 3, 'F')
  doc.setTextColor(221, 214, 254)
  doc.setFont('BeVietnamPro', 'normal')
  doc.setFontSize(9)
  doc.text('TẠM TÍNH', margin + 6, y + 11)
  doc.setTextColor(255, 255, 255)
  doc.setFont('BeVietnamPro', 'bold')
  doc.setFontSize(16)
  doc.text(formatVND(quoteTotal(quote)), pageWidth - margin - 6, y + 16, { align: 'right' })

  const pageCount = doc.getNumberOfPages()
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page)
    doc.setFont('BeVietnamPro', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(100, 116, 139)
    doc.text(
      'Vui lòng gửi file này qua Zalo hoặc Messenger để shop xác nhận tồn kho và phí vận chuyển.',
      margin,
      pageHeight - 8,
    )
    doc.text(`${page}/${pageCount}`, pageWidth - margin, pageHeight - 8, { align: 'right' })
  }

  doc.save(pdfFileName())
}
