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
  3001, 3002, 3004, 3008, 3009, 3010, 3011, 3014, 3016, 3017, 3018, 3020, 3023, 3027, 3034,
  3035, 3036, 3044, 3046, 3052, 3065, 3067, 3075, 3083, 3086, 3087, 3089, 3090, 3091, 3094,
  3097, 3099, 3113, 3114, 3115, 3116, 3117, 3118, 3119, 3120, 3121, 3122, 3123, 3124, 3126,
  3127, 3128, 3129, 3130, 3131, 3132, 3134, 3135, 3137, 3141, 3143, 3156, 3157, 3159, 3162,
  3163, 3165, 3166, 3167, 3168, 3169, 3177, 3178, 3182, 3183, 3192, 3195, 3196, 3197, 3206,
  3207, 3208, 3210, 3211, 3212, 3218, 3221, 3224, 3227, 3228, 3231, 3232, 3233, 3234, 3235,
  3236, 3237, 3238, 3250, 3251, 3252, 3254, 3256, 3257, 3258, 3259, 3260, 3261, 3262, 3263,
  3264, 3265, 3267, 3269, 3271, 3273, 3274, 3276, 3277, 3279, 3280, 3281, 3282, 3283, 3284,
  3285, 3286, 3287, 3288, 3289, 3290, 3292, 3293, 3294, 3295, 3296, 3297, 3298, 3299,
])

const familyCodes = new Set([3039, 3040, 3136, 3139, 3147, 3266, 3272, 3291])
const childCodes = new Set([3041, 3042])
const seniorCodes = new Set([3050, 3144, 3148, 3149, 3150, 3151, 3170, 3171, 3175, 3184, 3187, 3188, 3189, 3198, 3199, 3278])
const sportCodes = new Set([3003, 3005, 3015, 3068, 3069, 3093, 3160, 3161, 3191, 3203, 3221])
const animalCodes = new Set([
  3012, 3026, 3053, 3054, 3055, 3056, 3057, 3058, 3059, 3060, 3061, 3062, 3070, 3071, 3072,
  3073, 3074, 3078, 3079, 3080, 3081, 3084, 3085, 3088, 3103, 3110, 3133, 3144, 3186, 3239,
  3240, 3241, 3242, 3243, 3244, 3245, 3246,
])
const vehicleCodes = new Set([3042, 3064, 3194])
const accessoryCodes = new Set([3037, 3049, 3092, 3138, 3247])
const streetCodes = new Set([3002, 3038, 3145, 3214, 3215, 3216])

const specialNames: Record<number, string> = {
  3002: 'Người bán hoa ôm bó hướng dương',
  3003: 'Nam vận động viên bóng rổ',
  3012: 'Gấu nâu bên chậu hướng dương',
  3013: 'Thợ vệ sinh đeo bình dụng cụ',
  3015: 'Nam vận động viên thể hình xách đồ',
  3021: 'Nhân vật đầu hộp quái vật',
  3022: 'Nhiếp ảnh gia ngồi chụp hình',
  3024: 'Đặc nhiệm mặc giáp',
  3026: 'Kiếm sĩ bên chó cưng',
  3037: 'Thùng gỗ diorama',
  3038: 'Người bán đồ ăn đường phố',
  3039: 'Hai bé mặc áo mưa',
  3040: 'Nhóm trẻ em mặc áo mưa',
  3041: 'Bé gái áo mưa giơ tay',
  3042: 'Cậu bé bên xe cứu hỏa đồ chơi',
  3049: 'Tượng Phật Di Lặc',
  3052: 'Nữ thần đứng trên lá',
  3053: 'Nhân vật chibi đội mũ đầu bếp',
  3054: 'Ếch chibi đội vương miện',
  3055: 'Thỏ chibi mặc hoodie',
  3056: 'Heo chibi mặc áo khoác',
  3057: 'Gà chibi áo choàng',
  3058: 'Mèo chibi ôm cá',
  3059: 'Cú mèo chibi đội vương miện',
  3060: 'Thỏ chibi ngồi thiền',
  3061: 'Nhân vật chibi cầm búa',
  3062: 'Mèo chibi cầm cào',
  3064: 'Cô gái đi xe đạp',
  3068: 'Nam vận động viên cơ bắp',
  3070: 'Mèo chibi cầm cào',
  3071: 'Ếch vua chibi',
  3072: 'Thỏ lực sĩ chibi',
  3073: 'Vịt đầu bếp chibi',
  3074: 'Mèo vàng mặc áo',
  3078: 'Hai chú chó ngồi',
  3079: 'Chó chân ngắn đứng',
  3080: 'Chó Corgi đứng',
  3081: 'Mèo vằn bước đi',
  3084: 'Chàng trai vuốt ve mèo',
  3085: 'Cô gái cúi bên chó',
  3088: 'Cô gái ngồi bên chó Golden',
  3092: 'Cọc tiêu đội trên đầu',
  3093: 'Cô gái trượt ván',
  3103: 'Chàng trai đứng bên chó',
  3110: 'Bạch tuộc trang trí',
  3111: 'Superman ăn tại bàn',
  3112: 'Người Nhện ăn tại bàn',
  3133: 'Cô gái ôm chó trắng',
  3138: 'Tiểu cảnh cây trên vali',
  3139: 'Nhóm ba người đồng phục xanh',
  3145: 'Người chăm chậu cây',
  3147: 'Cặp đôi đội mũ đi dạo',
  3149: 'Ông già Noel ngồi đọc sách',
  3150: 'Ông già Noel vẫy tay',
  3151: 'Ông già Noel vác túi quà',
  3160: 'Võ sĩ sumo đứng',
  3161: 'Đô vật cơ bắp',
  3164: 'Chiến binh robot đỏ',
  3186: 'Nhân vật chibi múa lân',
  3194: 'Người lái mô tô phân khối lớn',
  3198: 'Thần tài đỏ cầm gậy như ý',
  3199: 'Thần tài đỏ ôm vàng',
  3203: 'Chàng trai mang ván trượt',
  3213: 'Tượng người đội nón rộng vành',
  3214: 'Nhiếp ảnh gia chiến trường',
  3215: 'Kỹ sư khảo sát địa hình',
  3216: 'Kỹ sư vận hành máy trắc địa',
  3218: 'Cô gái mặc kimono đỏ',
  3221: 'Nữ vận động viên khởi động',
  3239: 'Nhân vật M&M vàng đội kính',
  3240: 'Nhân vật M&M nâu',
  3241: 'Nhân vật M&M vàng cầm túi',
  3242: 'Nhân vật M&M xanh lá',
  3243: 'Nhân vật M&M tím',
  3244: 'Nhân vật M&M cam',
  3245: 'Nhân vật M&M xanh dương',
  3246: 'Nhân vật M&M đỏ',
  3247: 'Bộ bàn ăn diorama',
  3266: 'Cặp đôi đi dạo',
  3269: 'Cô gái kéo vali du lịch',
  3270: 'Người phụ nữ đội nón lá',
  3272: 'Cặp đôi lớn tuổi đi chợ',
  3291: 'Cặp đôi cô dâu chú rể',
}

function categoryFor(code: number): Category {
  if (familyCodes.has(code)) return 'giadinh'
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
  if ((code >= 3053 && code <= 3062) || (code >= 3070 && code <= 3074) || (code >= 3239 && code <= 3246)) return 'Chibi'
  if ([3111, 3112, 3164, 3186].includes(code)) return 'Fantasy & Siêu anh hùng'
  if ([3149, 3150, 3151].includes(code)) return 'Giáng sinh'
  if ([3198, 3199].includes(code)) return 'Tài lộc'
  if (category === 'giadinh') return 'Gia đình & Cặp đôi'
  if (category === 'treem') return 'Trẻ em'
  if (category === 'caotuoi') return 'Người cao tuổi'
  if (category === 'thethao') return 'Thể thao'
  if (category === 'dongvat') return 'Động vật & Chibi'
  if (category === 'xe') return 'Phương tiện'
  if (category === 'phukien') return 'Phụ kiện Diorama'
  if (category === 'duongpho') return 'Nghề nghiệp & Đường phố'
  return code >= 3200 ? 'Streetwear' : 'Đời thường'
}

const defaultNames: Record<Category, string> = {
  nam: 'Nhân vật nam tạo dáng',
  nu: 'Nhân vật nữ tạo dáng',
  giadinh: 'Cặp đôi và gia đình',
  treem: 'Nhân vật trẻ em',
  caotuoi: 'Nhân vật lớn tuổi',
  thethao: 'Nhân vật thể thao',
  dongvat: 'Động vật và nhân vật chibi',
  xe: 'Phương tiện diorama',
  phukien: 'Phụ kiện diorama',
  duongpho: 'Nhân vật nghề nghiệp',
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

export const batch3000Products = range(3000, 3099)
export const batch3100Products = range(3100, 3199)
export const batch3200Products = range(3200, 3299)
