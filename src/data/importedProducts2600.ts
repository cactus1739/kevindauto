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

const femaleCodes = new Set([
  2614, 2615, 2616, 2618, 2619, 2620, 2621, 2622, 2625, 2627, 2628, 2629, 2632, 2633, 2634,
  2637, 2639, 2640, 2641, 2642, 2643, 2645, 2646, 2649, 2651, 2652, 2657, 2658, 2660, 2661,
  2662, 2669, 2672, 2673, 2677, 2679, 2685, 2688, 2694, 2698, 2699,
])

const familyCodes = new Set([2601, 2630, 2636, 2638, 2650, 2683])
const childCodes = new Set([2675, 2687, 2689])
const seniorCodes = new Set([2624, 2678, 2691])
const sportCodes = new Set([2618, 2626, 2695])
const animalCodes = new Set([2639, 2653, 2671])

const specialNames: Record<number, string> = {
  2600: 'Kiếm sĩ áo choàng fantasy',
  2601: 'Đôi bạn nam tạo dáng',
  2602: 'Samurai giáp trụ cầm giáo',
  2603: 'Siêu anh hùng giáp máy',
  2604: 'Chiến binh anime quân phục',
  2605: 'Chiến binh anime tóc nhọn',
  2606: 'Kiếm sĩ anime cầm đại kiếm',
  2607: 'Pháp sư anime bên ngai',
  2608: 'Chiến binh giáp cánh',
  2609: 'Chiến binh thiên giới',
  2610: 'Võ sĩ anime giơ tay',
  2611: 'Chiến binh anime cầm cầu năng lượng',
  2612: 'Chiến binh giáp gai',
  2613: 'Nhân vật anime mũ chóp',
  2618: 'Nữ vận động viên tennis',
  2623: 'Pháp sư đội mũ rộng vành',
  2624: 'Quý ông lớn tuổi đội mũ',
  2625: 'Nữ ca sĩ cầm micro',
  2626: 'Chàng trai trượt patin',
  2630: 'Mẹ và bé dạo phố',
  2636: 'Cặp đôi ôm vai',
  2638: 'Cặp đôi đứng bên nhau',
  2639: 'Cô gái bế mèo',
  2650: 'Chàng trai bên chó cưng',
  2653: 'Nữ chiến binh đuôi rắn',
  2654: 'Hoàng đế ngồi ngai',
  2671: 'Chàng trai dắt chó',
  2675: 'Bé gái áo mưa chibi',
  2678: 'Ông già Noel cầm điện thoại',
  2683: 'Người cha bế em bé',
  2684: 'Kiếm sĩ áo choàng cầm trường kiếm',
  2687: 'Cậu bé phong cách fantasy',
  2689: 'Cậu bé đầu xoăn chibi',
  2691: 'Cụ ông ngồi suy tư',
  2692: 'Nhân vật mặt nạ bên xe một bánh',
  2695: 'Nam vận động viên thể hình',
  2696: 'Ông già Noel lực sĩ',
  2698: 'Quý cô cầm cà phê và túi xách',
  2699: 'Quý cô áo khoác mùa đông',
}

function categoryFor(code: number): Category {
  if (familyCodes.has(code)) return 'giadinh'
  if (childCodes.has(code)) return 'treem'
  if (seniorCodes.has(code)) return 'caotuoi'
  if (sportCodes.has(code)) return 'thethao'
  if (animalCodes.has(code)) return 'dongvat'
  if (femaleCodes.has(code)) return 'nu'
  return 'nam'
}

function seriesFor(code: number, category: Category): string {
  if (code <= 2613 || code === 2623 || code === 2653 || code === 2654 || code === 2684) return 'Fantasy & Anime'
  if (category === 'giadinh') return 'Gia đình & Cặp đôi'
  if (category === 'treem') return 'Trẻ em & Chibi'
  if (category === 'caotuoi') return 'Người cao tuổi'
  if (category === 'thethao') return 'Thể thao'
  if (category === 'dongvat') return 'Thú cưng'
  if (code === 2678 || code === 2696) return 'Giáng sinh'
  return code >= 2655 ? 'Streetwear' : 'Đời thường'
}

const defaultNames: Record<Category, string> = {
  nam: 'Nhân vật nam tạo dáng',
  nu: 'Nhân vật nữ tạo dáng',
  giadinh: 'Cặp đôi và gia đình',
  treem: 'Nhân vật trẻ em',
  caotuoi: 'Nhân vật lớn tuổi',
  thethao: 'Nhân vật thể thao',
  dongvat: 'Nhân vật cùng thú cưng',
  xe: 'Phương tiện diorama',
  phukien: 'Phụ kiện diorama',
  duongpho: 'Nhân vật đường phố',
}

function product(code: number): Product {
  const category = categoryFor(code)
  const series = seriesFor(code, category)
  const name = specialNames[code] ?? `${defaultNames[category]} ${code}`

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
    tags: [category, series.toLocaleLowerCase('vi'), name.toLocaleLowerCase('vi'), `${code}`],
    description: `Mô hình ${name.toLocaleLowerCase('vi')} với tạo hình rõ nét, phù hợp trưng bày và dựng diorama chủ đề ${series.toLocaleLowerCase('vi')}.`,
    highlights: ['Tạo hình rõ nét', 'Tối ưu cho in resin 3D', 'Phù hợp trưng bày và dựng diorama'],
  }
}

export const batch2600Products: Product[] = Array.from(
  { length: 100 },
  (_, index) => product(2600 + index),
)
