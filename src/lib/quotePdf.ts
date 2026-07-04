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
  const margin = 12
  const contentWidth = pageWidth - margin * 2
  const columns = 3
  const rows = 5
  const itemsPerPage = columns * rows
  const columnGap = 3
  const rowGap = 3
  const cardWidth = (contentWidth - columnGap * (columns - 1)) / columns
  const cardHeight = 41
  const gridStartY = 45
  const totalQuantity = items.reduce((sum, item) => sum + item.qty, 0)
  const orderTotal = quoteTotal(quote)
  const totalPages = Math.ceil(items.length / itemsPerPage)
  const generatedAt = new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date())

  const drawHeader = (pageNumber: number) => {
    doc.setFillColor(15, 10, 28)
    doc.rect(0, 0, pageWidth, 39, 'F')
    doc.setTextColor(244, 63, 94)
    doc.setFont('BeVietnamPro', 'bold')
    doc.setFontSize(10)
    doc.text(site.brand, margin, 10)
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(17)
    doc.text('BÁO GIÁ SẢN PHẨM', margin, 20)
    doc.setFont('BeVietnamPro', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(203, 213, 225)
    doc.text(`${items.length} mẫu • ${totalQuantity} sản phẩm • ${generatedAt}`, margin, 27)
    doc.text(`${site.phone}  •  ${site.email}`, margin, 33)

    const totalBoxWidth = 62
    const totalBoxX = pageWidth - margin - totalBoxWidth
    doc.setFillColor(76, 29, 149)
    doc.roundedRect(totalBoxX, 6, totalBoxWidth, 27, 3, 3, 'F')
    doc.setTextColor(221, 214, 254)
    doc.setFontSize(7.5)
    doc.text('TẠM TÍNH', totalBoxX + 5, 13)
    doc.setTextColor(255, 255, 255)
    doc.setFont('BeVietnamPro', 'bold')
    doc.setFontSize(14)
    doc.text(formatVND(orderTotal), pageWidth - margin - 5, 23, { align: 'right' })
    doc.setFont('BeVietnamPro', 'normal')
    doc.setFontSize(6.7)
    doc.setTextColor(221, 214, 254)
    doc.text(`Trang ${pageNumber}/${totalPages}`, pageWidth - margin - 5, 29, { align: 'right' })
  }

  drawHeader(1)

  for (let index = 0; index < items.length; index += 1) {
    const { product, qty } = items[index]
    if (!product) continue

    if (index > 0 && index % itemsPerPage === 0) {
      doc.addPage()
      drawHeader(Math.floor(index / itemsPerPage) + 1)
    }

    const slot = index % itemsPerPage
    const column = slot % columns
    const row = Math.floor(slot / columns)
    const x = margin + column * (cardWidth + columnGap)
    const y = gridStartY + row * (cardHeight + rowGap)

    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(226, 232, 240)
    doc.roundedRect(x, y, cardWidth, cardHeight, 2.5, 2.5, 'FD')

    const imageData = await imageToJpeg(product.image)
    if (imageData) {
      doc.addImage(imageData, 'JPEG', x + 2.5, y + 2.5, 24, 24, undefined, 'FAST')
    } else {
      doc.setFillColor(241, 245, 249)
      doc.roundedRect(x + 2.5, y + 2.5, 24, 24, 2, 2, 'F')
      doc.setFont('BeVietnamPro', 'bold')
      doc.setFontSize(7)
      doc.setTextColor(148, 163, 184)
      doc.text(product.code, x + 14.5, y + 15, { align: 'center' })
    }

    const textX = x + 29
    doc.setFont('BeVietnamPro', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(15, 23, 42)
    const titleLines = doc.splitTextToSize(product.name, cardWidth - 31).slice(0, 3)
    doc.text(titleLines, textX, y + 5, { lineHeightFactor: 1.12 })

    doc.setFont('BeVietnamPro', 'normal')
    doc.setFontSize(6.7)
    doc.setTextColor(100, 116, 139)
    doc.text(`Mã ${product.code}`, textX, y + 17.5)
    doc.text(`${formatVND(product.price)} × ${qty}`, textX, y + 23.5)

    doc.setFillColor(248, 250, 252)
    doc.roundedRect(x + 2.5, y + 29, cardWidth - 5, 9.5, 1.5, 1.5, 'F')
    doc.setFont('BeVietnamPro', 'normal')
    doc.setFontSize(6.5)
    doc.setTextColor(100, 116, 139)
    doc.text(`SL ${qty}`, x + 5, y + 35)
    doc.setFont('BeVietnamPro', 'bold')
    doc.setFontSize(8.3)
    doc.setTextColor(225, 29, 72)
    doc.text(formatVND(product.price * qty), x + cardWidth - 5, y + 35, { align: 'right' })
  }

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
