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

const animalCodes = new Set([2700, 2701, 2702, 2703, 2704, 2705, 2706, 2707, 2708, 2713, 2714, 2715, 2716, 2717, 2718, 2758, 2785])
const femaleCodes = new Set([
  2710, 2719, 2720, 2721, 2722, 2723, 2724, 2725, 2726, 2728, 2737, 2738, 2739, 2740, 2743, 2746,
  2747, 2759, 2760, 2761, 2762, 2767, 2771, 2773, 2777, 2781, 2783, 2792, 2794, 2797, 2798, 2799,
])
const childCodes = new Set([2770, 2774])
const seniorCodes = new Set([2782])
const familyCodes = new Set([2776])
const sportCodes = new Set([2731, 2734, 2742, 2744, 2786])
const streetCodes = new Set([2741, 2748, 2749, 2751, 2763, 2764, 2769, 2780, 2787, 2788, 2793, 2795, 2796])

const specialNames: Record<number, string> = {
  2700: 'Thỏ cảnh sát tạo dáng',
  2701: 'Cáo mặc áo sơ mi hồng',
  2702: 'Thỏ nữ cầm hồ sơ',
  2703: 'Thỏ cầm cốc cà phê',
  2704: 'Thỏ đứng nghiêm trang',
  2705: 'Cáo mặc áo sơ mi xanh rêu',
  2706: 'Trâu cảnh sát trưởng',
  2707: 'Con lười cầm giấy tờ',
  2708: 'Báo cảnh sát trực ban',
  2709: 'Chàng trai đeo balo cầm máy ảnh',
  2710: 'Cô gái ngồi bó gối',
  2711: 'Người đàn ông ngồi trầm tư',
  2712: 'Chàng trai đội mũ len cầm ly',
  2713: 'Cáo mặc vest đứng dựa tường',
  2714: 'Cáo cầm ly cà phê dạo bước',
  2715: 'Cáo dang tay vui vẻ',
  2716: 'Thỏ mặc đồng phục cảnh sát giao thông',
  2717: 'Cáo đeo cà vạt dang tay',
  2718: 'Cáo đứng chống đuôi',
  2719: 'Cô gái áo croptop quần ống rộng',
  2720: 'Cô gái mặc váy xếp ly',
  2721: 'Cô gái áo khoác da ôm túi',
  2722: 'Cô gái mặc áo khoác oversize',
  2723: 'Cô gái đội khăn trùm đầu',
  2724: 'Cô gái phong cách vintage đội mũ',
  2725: 'Cô gái mặc áo khoác caro',
  2726: 'Nữ chiến binh giáp bạc huyền bí',
  2727: 'Chàng trai cởi trần khoác áo',
  2728: 'Cô gái đội mũ lưỡi trai đường phố',
  2729: 'Nam pháp sư cầm quả cầu phép',
  2730: 'Chiến binh giáp trụ cầm giáo',
  2731: 'Tay đua ăn mừng cùng champagne',
  2732: 'Chàng trai áo hoodie vàng',
  2733: 'Người đàn ông vest đeo kính râm',
  2734: 'Nam vận động viên thể hình gồng cơ',
  2735: 'Người đàn ông đeo mặt nạ đen lịch lãm',
  2736: 'Người đàn ông khoác áo choàng dài',
  2737: 'Cô gái ngồi áo khoác đỏ mùa đông',
  2738: 'Cô gái nâng ly rượu vang',
  2739: 'Cô gái áo da phong cách bụi bặm',
  2740: 'Cô gái mặc váy caro ôm gấu bông',
  2741: 'Người thợ sửa chữa ngồi làm việc',
  2742: 'Tay đua mô tô đội mũ bảo hiểm',
  2743: 'Cô gái áo khoác đỏ dạo phố',
  2744: 'Chàng trai vác ván trượt',
  2745: 'Robot giáp trụ công nghệ cao',
  2746: 'Cô gái mặc đồ thể thao rộng',
  2747: 'Nữ chiến binh quỳ gối cầm kiếm',
  2748: 'Người đàn ông ngồi đếm tiền lẻ',
  2749: 'Chàng trai áo da ngồi vỉa hè',
  2750: 'Ông già Noel mặc áo khoác đỏ dài',
  2751: 'Chàng trai ngồi phong cách đường phố',
  2752: 'Người đàn ông cầm bút ghi chép',
  2753: 'Người đàn ông đeo balo phong cách',
  2754: 'Người đàn ông khoanh tay đứng',
  2755: 'Người đàn ông khoác áo choàng đỏ nghiêm nghị',
  2756: 'Chiến binh giáp đỏ cầm đại đao',
  2757: 'Cung thủ đội nón lá',
  2758: 'Người đội đầu heo vui nhộn',
  2759: 'Cô gái đường phố khoanh tay',
  2760: 'Cô gái mặc áo khoác dài',
  2761: 'Cô gái áo khoác nhiều màu',
  2762: 'Cô gái áo khoác cam quần jeans',
  2763: 'Chàng trai đeo khăn rằn phong cách hip-hop',
  2764: 'Chàng trai đeo kính ngồi vỉa hè',
  2765: 'Người đàn ông vest be xách túi da',
  2766: 'Chiến binh giáp đỏ vàng khoác choàng',
  2767: 'Cô gái mặc áo croptop quần short',
  2768: 'Robot giáp bạc xanh',
  2769: 'Người đàn ông hút thuốc ngồi vỉa hè',
  2770: 'Cậu bé đội mũ nồi',
  2771: 'Cô gái mặc đầm ôm túi xách',
  2772: 'Chàng trai áo phao đỏ',
  2773: 'Cô gái mặc bikini ôm phao bơi',
  2774: 'Cậu bé té ngã nghịch ngợm',
  2775: 'Ông già Noel cầm túi quà',
  2776: 'Cặp đôi ôm nhau tạo dáng',
  2777: 'Cô gái mặc áo da bịt mắt cá tính',
  2778: 'Quan văn cổ trang cầm quạt',
  2779: 'Quan võ cổ trang đứng nghiêm',
  2780: 'Người đàn ông mặc đồ rằn ri dắt chó',
  2781: 'Cô gái ngồi xổm đội mũ',
  2782: 'Quý ông lớn tuổi mặc áo khoác',
  2783: 'Cô gái mặc áo khoác dạ thanh lịch',
  2784: 'Ninja tóc vàng ngồi thiền áo cam',
  2785: 'Quái vật đá cầm gậy gỗ',
  2786: 'Chàng trai cởi trần cơ bắp',
  2787: 'Chàng trai xăm hình phong cách hip-hop',
  2788: 'Chàng trai áo khoác đeo túi',
  2789: 'Ông già Noel vác túi quà',
  2790: 'Ông già Noel ngồi xe trượt tuyết',
  2791: 'Người đàn ông vest xách túi công sở',
  2792: 'Cô gái cầm dù dạo phố',
  2793: 'Chàng trai áo khoác vest phong cách',
  2794: 'Cô gái áo khoác denim váy ngắn',
  2795: 'Chàng trai đội mũ lưỡi trai áo khoác dài',
  2796: 'Chàng trai áo khoác đen tạo dáng',
  2797: 'Cô gái áo croptop cầm quạt',
  2798: 'Cô gái mặc đầm hai dây',
  2799: 'Cô gái quần ống rộng vuốt tóc',
}

const specialSeries: Record<number, string> = {
  2726: 'Fantasy & Anime',
  2729: 'Fantasy & Anime',
  2730: 'Fantasy & Anime',
  2745: 'Fantasy & Anime',
  2747: 'Fantasy & Anime',
  2756: 'Fantasy & Anime',
  2757: 'Cổ trang',
  2766: 'Fantasy & Anime',
  2768: 'Fantasy & Anime',
  2778: 'Cổ trang',
  2779: 'Cổ trang',
  2784: 'Fantasy & Anime',
  2750: 'Giáng sinh',
  2775: 'Giáng sinh',
  2789: 'Giáng sinh',
  2790: 'Giáng sinh',
}

function categoryFor(code: number): Category {
  if (childCodes.has(code)) return 'treem'
  if (seniorCodes.has(code)) return 'caotuoi'
  if (familyCodes.has(code)) return 'giadinh'
  if (sportCodes.has(code)) return 'thethao'
  if (animalCodes.has(code)) return 'dongvat'
  if (streetCodes.has(code)) return 'duongpho'
  if (femaleCodes.has(code)) return 'nu'
  return 'nam'
}

function seriesFor(code: number, category: Category): string {
  if (specialSeries[code]) return specialSeries[code]
  if (category === 'dongvat') return 'Động vật & Chibi'
  if (category === 'treem') return 'Trẻ em'
  if (category === 'caotuoi') return 'Người cao tuổi'
  if (category === 'giadinh') return 'Cặp đôi'
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
    description: `Mô hình ${lowerName} với tạo hình rõ nét, phù hợp trưng bày và dựng diorama chủ đề ${series.toLocaleLowerCase('vi')}.`,
    highlights: ['Tạo hình rõ nét', 'Tối ưu cho in resin 3D', 'Phù hợp trưng bày và dựng diorama'],
  }
}

function range(start: number, end: number): Product[] {
  return Array.from({ length: end - start + 1 }, (_, index) => product(start + index))
}

export const batch2700Products = range(2700, 2799)
