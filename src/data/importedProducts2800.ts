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

const femaleCodes = new Set([
  2806, 2807, 2810, 2813, 2814, 2824, 2826, 2827, 2831, 2833, 2839, 2840, 2841, 2848, 2851,
  2853, 2856, 2857, 2858, 2859, 2860, 2862, 2865, 2866, 2867, 2871, 2877, 2879, 2880, 2888,
  2889, 2901, 2903, 2907, 2908, 2909, 2914, 2916, 2917, 2918, 2919, 2920, 2921, 2928, 2933,
  2934, 2949, 2950, 2951, 2952, 2954, 2955, 2956, 2961, 2962, 2963, 2973, 2976, 2977, 2978,
  2979, 2980, 2981, 2982, 2983, 2985, 2986, 2987, 2990, 2992, 2993, 2994, 2995, 2996, 2997,
  2998, 2999,
])

const familyCodes = new Set([2850, 2900, 2957])
const seniorCodes = new Set([2801, 2854, 2868, 2869, 2906, 2960])
const sportCodes = new Set([
  2802, 2803, 2812, 2815, 2816, 2817, 2818, 2819, 2820, 2821, 2822, 2823, 2824, 2825, 2834,
  2835, 2836, 2837, 2838, 2899, 2944, 2945, 2946, 2947, 2948, 2971, 2972, 2973, 2974, 2975,
])
const animalCodes = new Set([
  2800, 2842, 2843, 2852, 2864, 2870, 2875, 2882, 2892, 2923, 2924, 2925, 2935, 2936, 2937,
  2938, 2953, 2958,
])
const vehicleCodes = new Set([2964])
const accessoryCodes = new Set([2891, 2929, 2941, 2942, 2943])
const streetCodes = new Set([2808, 2809, 2845, 2846, 2878, 2881, 2890, 2896, 2897])

const specialNames: Record<number, string> = {
  2800: 'Mèo thần tài trong chậu',
  2801: 'Cụ ông khoanh tay',
  2802: 'Cầu thủ bóng đá giơ áo',
  2803: 'Cầu thủ bóng đá ăn mừng',
  2808: 'Người chăm cây cảnh',
  2809: 'Thợ mộc thao tác trên bàn',
  2812: 'Chàng trai trượt ván',
  2815: 'Tay đua chỉ đường',
  2816: 'Thợ máy đua xe',
  2817: 'Thợ máy cầm lốp xe',
  2820: 'Tay đua quỳ bên mũ bảo hiểm',
  2824: 'Nữ cổ động viên cầm cờ',
  2834: 'Võ sĩ giơ hai tay',
  2835: 'Nam vận động viên thể hình',
  2842: 'Tuần lộc chibi đeo kính',
  2843: 'Tuần lộc chibi cầm ly',
  2845: 'Công nhân bảo trì',
  2846: 'Công nhân đội nón lá',
  2850: 'Đôi bạn nam streetwear',
  2852: 'Hà mã nằm nghỉ',
  2854: 'Ông già Noel dang tay',
  2864: 'Chó bulldog chibi',
  2867: 'Cô gái Noel',
  2868: 'Ông già Noel cầm gậy kẹo',
  2869: 'Ông già Noel bước đi',
  2875: 'Nhân vật chibi tóc chỏm',
  2876: 'Chiến binh robot đỏ',
  2877: 'Nữ chiến binh cầm gậy',
  2878: 'Người bán hàng rong ngồi',
  2881: 'Người bán hàng gánh giỏ',
  2882: 'Mèo chibi ôm túi may mắn',
  2886: 'Tôn Ngộ Không cầm gậy',
  2887: 'Võ tướng áo choàng',
  2890: 'Người bán đồ ăn đường phố',
  2891: 'Búp bê Daruma may mắn',
  2892: 'Doraemon ôm bảo bối',
  2893: 'Người câu cá cầm cần',
  2894: 'Người câu cá bên thùng đồ',
  2895: 'Người câu cá ngồi trên đá',
  2896: 'Nghệ nhân làm đèn lồng',
  2897: 'Người bán trái cây ngồi',
  2899: 'Võ sĩ cầm côn',
  2900: 'Cặp đôi trò chuyện',
  2906: 'Cụ ông cầm gậy',
  2923: 'Chồn đen đứng',
  2924: 'Chuột lang nước',
  2925: 'Chó đốm đứng',
  2926: 'Ông già Noel vẫy tay',
  2927: 'Ông già Noel vác túi quà',
  2929: 'Hộp quà Giáng sinh',
  2935: 'Gấu chibi ngồi thiền',
  2936: 'Chó săn đứng',
  2937: 'Sói xám đứng',
  2938: 'Chuột túi kangaroo',
  2939: 'Trâu chibi cầm cờ Việt Nam',
  2940: 'Nhân vật chibi cầm cờ Việt Nam',
  2941: 'Chậu hoa đào ngày Tết',
  2942: 'Chậu hoa cúc ngày Tết',
  2943: 'Chậu quất ngày Tết',
  2944: 'Cầu thủ bóng đá chạy',
  2945: 'Cầu thủ Việt Nam đặt tay lên ngực',
  2946: 'Cầu thủ Việt Nam số 9',
  2947: 'Cầu thủ Việt Nam đứng nghiêm',
  2948: 'Cầu thủ bóng đá chào',
  2953: 'Mèo đội nón lá',
  2957: 'Cặp đôi lễ cưới',
  2958: 'Gấu mèo chibi đứng',
  2959: 'Hiệp sĩ trung cổ',
  2964: 'Chàng trai đi xe đạp',
  2970: 'Nữ quân nhân chào',
  2971: 'Chiến binh cầm đại kiếm',
  2972: 'Võ sĩ áo đỏ',
  2973: 'Nữ chiến binh fantasy',
  2974: 'Chiến binh phép thuật',
  2975: 'Võ sĩ cơ bắp',
  2991: 'Quý ông bên chó cưng',
}

function categoryFor(code: number): Category {
  if (familyCodes.has(code)) return 'giadinh'
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
  if ((code >= 2815 && code <= 2825)) return 'Đua xe thể thao'
  if ([2854, 2867, 2868, 2869, 2926, 2927, 2929].includes(code)) return 'Giáng sinh'
  if ([2876, 2877, 2886, 2887, 2899, 2959, 2971, 2972, 2973, 2974, 2975].includes(code)) return 'Fantasy & Anime'
  if ([2939, 2940, 2941, 2942, 2943].includes(code)) return 'Tết Việt'
  if (category === 'giadinh') return 'Cặp đôi'
  if (category === 'caotuoi') return 'Người cao tuổi'
  if (category === 'thethao') return 'Thể thao'
  if (category === 'dongvat') return 'Động vật & Chibi'
  if (category === 'xe') return 'Xe đạp'
  if (category === 'phukien') return 'Phụ kiện Diorama'
  if (category === 'duongpho') return 'Đường phố & Lao động'
  return code >= 2900 ? 'Streetwear' : 'Đời thường'
}

const defaultNames: Record<Category, string> = {
  nam: 'Nhân vật nam tạo dáng',
  nu: 'Nhân vật nữ tạo dáng',
  giadinh: 'Cặp đôi đời thường',
  treem: 'Nhân vật trẻ em',
  caotuoi: 'Nhân vật lớn tuổi',
  thethao: 'Nhân vật thể thao',
  dongvat: 'Động vật và nhân vật chibi',
  xe: 'Phương tiện diorama',
  phukien: 'Phụ kiện diorama',
  duongpho: 'Nhân vật đường phố',
  movie: 'Nhân vật phim ảnh & manga',
  famous: 'Nhân vật nổi tiếng',
  cartoon: 'Nhan vat hoat hinh',
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

function range(start: number, end: number): Product[] {
  return Array.from({ length: end - start + 1 }, (_, index) => product(start + index))
}

export const batch2800Products = range(2800, 2899)
export const batch2900Products = range(2900, 2999)
