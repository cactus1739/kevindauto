import type { Accent, Category, Product } from './products'

const accents: Record<Category, Accent> = {
  nam: 'cyan',
  nu: 'brand',
  giadinh: 'gold',
  treem: 'brand',
  caotuoi: 'violet',
  thethao: 'cyan',
  dongvat: 'brand',
  xe: 'gold',
  phukien: 'violet',
  duongpho: 'cyan',
  movie: 'violet',
  famous: 'gold',
  cartoon: 'brand',
}

const VALID_CODES = [
  4452, 4453, 4454, 4455, 4456, 4457, 4458, 4459, 4460, 4461, 4462, 4463, 4464, 4465, 4466, 4467,
  4468, 4469, 4470, 4478, 4479, 4491, 4492, 4493, 4494, 4495, 4496,
]

const categoryOf: Record<number, Category> = {
  4459: 'thethao',
  4478: 'nu',
  4479: 'nu',
  4491: 'phukien',
  4492: 'phukien',
  4493: 'phukien',
  4494: 'dongvat',
  4495: 'xe',
  4496: 'cartoon',
}

const specialNames: Record<number, string> = {
  4452: 'Chàng trai áo khoác đỏ đen',
  4453: 'Chàng trai áo da đeo túi',
  4454: 'Chàng trai hoodie in hình đội mũ',
  4455: 'Chàng trai tóc xoăn che mặt',
  4456: 'Chàng trai áo khoác đỏ đen thời trang',
  4457: 'Chàng trai áo da chào kiểu quân đội',
  4458: 'Chàng trai áo gile đeo balo',
  4459: 'Chàng trai cầm ván trượt',
  4460: 'Chàng trai áo flannel đứng',
  4461: 'Chàng trai áo flannel cài cúc cổ',
  4462: 'Chàng trai áo khoác vàng',
  4463: 'Chàng trai áo flannel quần rộng',
  4464: 'Chàng trai áo khoác da đứng',
  4465: 'Chàng trai áo khoác tóc dài',
  4466: 'Chàng trai áo sơ mi rộng vắt vai',
  4467: 'Chàng trai hoodie tựa tường',
  4468: 'Chàng trai áo khoác đỏ đen phối quần',
  4469: 'Chàng trai áo da đen bóng',
  4470: 'Chàng trai áo sơ mi mở cúc',
  4478: 'Cô gái tóc xoăn áo croptop chân váy',
  4479: 'Cô gái áo phông short đỏ',
  4491: 'Nồi cơm điện',
  4492: 'Nồi hấp inox ba tầng',
  4493: 'Ghế xếp du lịch',
  4494: 'Mèo cam ngước nhìn',
  4495: 'Xe bán tải cắm trại',
  4496: 'Gà trống cơ bắp',
}

const seriesOf: Record<Category, string> = {
  nam: 'Streetwear',
  nu: 'Thời trang nữ',
  giadinh: 'Cặp đôi',
  treem: 'Trẻ em',
  caotuoi: 'Người cao tuổi',
  thethao: 'Thể thao',
  dongvat: 'Động vật',
  xe: 'Xe cộ diorama',
  phukien: 'Phụ kiện diorama',
  duongpho: 'Đường phố',
  movie: 'Movie - Manga',
  famous: 'Famous',
  cartoon: 'Hoạt hình - Cartoon',
}

function product(code: number): Product {
  const category = categoryOf[code] ?? 'duongpho'
  const series = seriesOf[category]
  const name = specialNames[code] ?? `Nhân vật ${code}`
  const lowerName = name.charAt(0).toLocaleLowerCase('vi') + name.slice(1)

  return {
    id: `sp-${code}`,
    code: `${code}`,
    name,
    category,
    series,
    price: 30000,
    material: 'Resin 3D cao cấp',
    rating: 5,
    reviews: 20 + (code % 30),
    badge: 'Mới',
    inStock: true,
    accent: accents[category],
    image: `./products/sp-${code}.webp`,
    tags: [category, series.toLocaleLowerCase('vi'), lowerName, `${code}`],
    description: `Mô hình ${lowerName} với tạo hình rõ nét, phù hợp trưng bày và dựng diorama.`,
    highlights: ['Tạo hình rõ nét', 'Tối ưu cho in resin 3D', 'Phù hợp trưng bày và dựng diorama'],
  }
}

export const batch4452Products = VALID_CODES.map(product)
