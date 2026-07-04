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
}

const omittedCodes = new Set([214])

const animalCodes = new Set([237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 271, 291, 292, 293, 294, 295])
const vehicleCodes = new Set([213, 229, 286, 288])
const accessoryCodes = new Set([285])
const childCodes = new Set([279])
const seniorCodes = new Set([220])
const sportCodes = new Set([258, 263, 282])
const streetCodes = new Set([217, 218, 257])
const femaleCodes = new Set([
  200, 201, 202, 204, 205, 206, 207, 208, 209, 210, 211, 212, 215, 216, 233, 234, 235, 236, 249,
  250, 251, 252, 253, 254, 255, 256, 259, 260, 261, 262, 264, 265, 266, 267, 268, 269, 270, 272,
  281, 297, 298, 299,
])

const specialNames: Record<number, string> = {
  200: 'Cô gái áo khoác chân váy',
  201: 'Cô gái mặc đầm bước đi ngoái nhìn',
  202: 'Nữ chiến binh khoác súng trường da',
  203: 'Chàng trai đeo túi đội mũ',
  204: 'Cô gái bikini chống hông',
  205: 'Cô gái vươn vai thể hình',
  206: 'Cô gái mặc đầm xách túi',
  207: 'Cô gái hoodie cầm ly',
  208: 'Cô gái hoodie chụp ảnh',
  209: 'Cô gái đội mũ chào',
  210: 'Cô gái tóc dài đứng thẳng',
  211: 'Cô gái khoác áo qua vai',
  212: 'Cô gái bước đi khoác áo',
  213: 'Xe máy scooter mini',
  215: 'Nữ thợ máy vác cờ lê',
  216: 'Nữ thợ máy ngồi bên xe máy',
  217: 'Thợ sơn cầm xô sơn',
  218: 'Công nhân cầm ly nước',
  219: 'Người đàn ông khoác áo choàng rộng',
  220: 'Quý ông lớn tuổi ngồi chống gậy',
  221: 'Người đàn ông đứng gầy',
  222: 'Người đàn ông đứng thẳng',
  223: 'Người đàn ông cởi trần đứng',
  224: 'Người đàn ông cõng chó trên vai',
  225: 'Chiến binh tóc dựng vẫy tay',
  226: 'Chàng trai cởi trần mặc quần short biển',
  227: 'Người đàn ông chĩa súng hành động',
  228: 'Người đàn ông cúi buộc dây giày',
  229: 'Xe máy có thùng bên hông',
  230: 'Người đội mũ phi hành gia mặc short',
  231: 'Người mặc áo choàng trùm đầu',
  232: 'Thầy tu áo choàng đứng trầm mặc',
  233: 'Cô gái chụp ảnh selfie',
  234: 'Cô gái xách túi dạo phố',
  235: 'Cô gái dùng ống nhòm quan sát',
  236: 'Nữ chiến binh cầm kiếm',
  237: 'Ngựa đứng trưng bày',
  238: 'Cừu đứng trưng bày',
  239: 'Heo nằm trưng bày',
  240: 'Mèo ngồi trưng bày',
  241: 'Bò rừng đứng trưng bày',
  242: 'Bò sữa đứng trưng bày',
  243: 'Bò gặm cỏ',
  244: 'Bò đứng gặm cỏ',
  245: 'Chó con đứng',
  246: 'Chó nằm nghỉ',
  247: 'Chó đánh hơi',
  248: 'Chó ngồi trưng bày',
  249: 'Nữ robot cơ khí',
  250: 'Cô gái tai mèo hóa trang',
  251: 'Cô gái tóc dài dạo phố',
  252: 'Cô gái dáng chuẩn tạo dáng',
  253: 'Cô gái tạo dáng chạm tóc',
  254: 'Cô gái đứng thẳng tự nhiên',
  255: 'Cô gái chạm tay lên má',
  256: 'Cô gái bước đi bốt cao',
  257: 'Cô gái lau nhà cầm xô',
  258: 'Nữ vận động viên đội mũ bảo hiểm ngồi',
  259: 'Cô gái cúi người vươn tay',
  260: 'Cô gái quỳ một gối',
  261: 'Cô gái mặc đầm chống hông',
  262: 'Cô gái mặc đầm bước đi',
  263: 'Chàng trai cởi trần mặc short thể thao',
  264: 'Cô gái đá chân tà váy bay',
  265: 'Cô gái đội mũ mặc chân váy',
  266: 'Cô gái ngã ngửa tạo dáng',
  267: 'Cô gái ngồi xổm tạo dáng',
  268: 'Cô gái ngồi vẽ tranh',
  269: 'Cô gái xem điện thoại',
  270: 'Cô gái cầm sách đứng',
  271: 'Người mặc trang phục thú bông tròn',
  272: 'Phụ nữ mang thai đứng',
  273: 'Chàng trai hoodie đứng',
  274: 'Người đàn ông ngồi xếp bằng',
  275: 'Chiến binh cơ bắp cầm gậy vác túi',
  276: 'Người đàn ông chỉ tay',
  277: 'Người đàn ông bước đi cúi đầu',
  278: 'Người đàn ông ngồi trầm ngâm',
  279: 'Cậu bé ngồi xếp bằng',
  280: 'Người đàn ông khoác áo bước đi',
  281: 'Cô gái bikini tạo dáng',
  282: 'Chàng trai nhảy giữa không trung',
  283: 'Người đàn ông vest đút túi quần',
  284: 'Người đàn ông tựa người thư giãn',
  285: 'Túi xách trưng bày',
  286: 'Xe đạp mini đồ chơi',
  287: 'Donald Trump',
  288: 'Xe mô tô thể thao',
  289: 'Tướng quân cổ trang cầm giáo trên bệ',
  290: 'Chiến binh giáp côn trùng',
  291: 'Linh vật hổ nhỏ cầm cào',
  292: 'Nai đực gạc lớn đứng',
  293: 'Chó cúi đầu đánh hơi',
  294: 'Nai cái đứng trưng bày',
  295: 'Hươu con đứng',
  296: 'Donald Trump',
  297: 'Cô gái vẫy tay chào',
  298: 'Cô gái mặc vest bước đi',
  299: 'Cô gái mặc váy công sở đứng',
}

const specialSeries: Record<number, string> = {
  202: 'Chiến thuật',
  225: 'Fantasy & Anime',
  231: 'Fantasy & Anime',
  232: 'Fantasy & Anime',
  236: 'Fantasy & Anime',
  249: 'Fantasy & Anime',
  271: 'Hóa trang',
  275: 'Fantasy & Anime',
  289: 'Fantasy & Anime',
  290: 'Fantasy & Anime',
  287: 'Chân dung',
  296: 'Chân dung',
}

function categoryFor(code: number): Category {
  if (childCodes.has(code)) return 'treem'
  if (seniorCodes.has(code)) return 'caotuoi'
  if (sportCodes.has(code)) return 'thethao'
  if (animalCodes.has(code)) return 'dongvat'
  if (vehicleCodes.has(code)) return 'xe'
  if (accessoryCodes.has(code)) return 'phukien'
  if (streetCodes.has(code)) return 'duongpho'
  if (femaleCodes.has(code)) return 'nu'
  return 'nam'
}

function seriesFor(code: number, category: Category): string {
  if (specialSeries[code]) return specialSeries[code]
  if (category === 'dongvat') return 'Động vật trưng bày'
  if (category === 'xe') return 'Xe cộ diorama'
  if (category === 'phukien') return 'Phụ kiện diorama'
  if (category === 'treem') return 'Trẻ em'
  if (category === 'caotuoi') return 'Người cao tuổi'
  if (category === 'thethao') return 'Thể thao'
  if (category === 'duongpho') return 'Đường phố & Lao động'
  return 'Đời thường'
}

function product(code: number): Product {
  const category = categoryFor(code)
  const series = seriesFor(code, category)
  const name = specialNames[code] ?? `Nhân vật ${category === 'nu' ? 'nữ' : 'nam'} tạo dáng ${code}`
  const lowerName = name.charAt(0).toLocaleLowerCase('vi') + name.slice(1)

  return {
    id: `sp-${code}`,
    code: `${code}`.padStart(4, '0'),
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
    description: `Mô hình ${lowerName} với tạo hình rõ nét, phù hợp trưng bày và dựng diorama chủ đề ${series.toLocaleLowerCase('vi')}.`,
    highlights: ['Tạo hình rõ nét', 'Tối ưu cho in resin 3D', 'Phù hợp trưng bày và dựng diorama'],
  }
}

function range(start: number, end: number): Product[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
    .filter((code) => !omittedCodes.has(code))
    .map(product)
}

export const batch200Products = range(200, 299)
