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
  3316, 3317, 3318, 3319, 3320, 3321, 3322, 3323, 3324, 3325, 3326, 3327, 3328, 3329,
  3330, 3331, 3332, 3333, 3334, 3335, 3336, 3337, 3338, 3348, 3350, 3352, 3353, 3354,
  3355, 3356, 3357, 3358, 3359, 3360, 3361, 3362, 3363, 3364, 3365, 3366, 3367, 3368,
  3369, 3370, 3371, 3372, 3373, 3374, 3375, 3376, 3377, 3378,
])
const seniorCodes = new Set([3307, 3309, 3310, 3311, 3312, 3349, 3395])
const sportCodes = new Set([3313, 3340, 3342, 3343])
const animalCodes = new Set([3315])
const streetCodes = new Set([3300, 3305, 3306, 3308, 3314, 3330, 3331, 3333, 3335, 3336, 3379, 3380, 3386, 3387, 3389, 3390, 3392, 3397, 3398, 3399])
const accessoryCodes = new Set([3339, 3341, 3378, 3388])
const familyCodes = new Set([3350])

const specialNames: Record<number, string> = {
  3300: 'Co gai ngoi xom ao khoac hong',
  3301: 'Chang trai ao thun rong',
  3302: 'Chang trai streetwear do den',
  3303: 'Chang trai ao choang trang',
  3304: 'Nhan vat ao kimono toi mau',
  3305: 'Chang trai ao khoac do',
  3306: 'Chang trai ao sat nach xach tui',
  3307: 'Quy ong biker ao da',
  3308: 'Quy ong ao khoac trang den',
  3309: 'Quy ong rau dai ao khoac xanh',
  3310: 'Quy ong mu fedora choang khan',
  3311: 'Quy ong kinh vest lich lam',
  3312: 'Cu ong ao len hoa tiet',
  3313: 'Nam chien binh co bap cam dao',
  3314: 'Nhan vat ao hoodie rong',
  3315: 'Co gai ben cho Shiba',
  3316: 'Nu sinh dong phuc den',
  3317: 'Nu sinh dong phuc trang',
  3318: 'Co gai ao bong ro form rong',
  3319: 'Co gai vay hong tao dang',
  3320: 'Co gai toc xoan ao khoac xanh',
  3321: 'Co gai ao so 88 streetwear',
  3322: 'Co gai dong phuc xanh',
  3323: 'Co gai ao thun va quan jean',
  3324: 'Co gai tracksuit vang',
  3325: 'Quy co ao den xach tui',
  3326: 'Co gai ao khoac vang doi mu',
  3327: 'Co gai dam dai cam tui',
  3328: 'Co gai streetwear quan ong rong',
  3329: 'Co gai dam vang om dang',
  3330: 'Co gai ao len xam dung thoai mai',
  3331: 'Co gai ao do the thao',
  3332: 'Co gai hoodie hong dang dung',
  3333: 'Co gai ao khoac be doi non',
  3334: 'Co gai ao khoac denim',
  3335: 'Co gai ao khoac cam',
  3336: 'Co gai hoodie do streetwear',
  3337: 'Co gai ao khoac xam doi mu',
  3338: 'Co gai ao choang xanh xach tui',
  3339: 'Nhan vat phap su ao do',
  3340: 'Kiem si dang chay',
  3341: 'Nhan vat phap su ganh do',
  3342: 'Kiem si hanh dong voi vu khi',
  3343: 'Nhan vat hanh dong cam luoi hai',
  3344: 'Chang trai hoodie xam',
  3345: 'Chang trai ao da den xach tui',
  3346: 'Chang trai ao khoac do chinh tai nghe',
  3347: 'Chang trai ao khoac nau',
  3348: 'Co gai ao crop top den',
  3349: 'Cu ong day xe keo hang',
  3350: 'Me va em be trang phuc hong',
  3351: 'Quy ong cam du den',
  3352: 'Co gai ao khoac xanh va khan do',
  3353: 'Co gai ao ke xanh',
  3354: 'Co gai ao ke khoanh tay',
  3355: 'Co gai chup anh bang dien thoai',
  3356: 'Co gai dam den xach tui',
  3357: 'Co gai deo dan guitar',
  3358: 'Co gai ao khoac do doi mu',
  3359: 'Co gai vay caro xach tui',
  3360: 'Co gai tao dang ben trong tron',
  3361: 'Co gai ao khoac xanh xach tui',
  3362: 'Co gai quan short doi mu',
  3363: 'Co gai ao khoac den quan jean',
  3364: 'Co gai ao xanh xach tui',
  3365: 'Co gai ao khoac xanh doi mu',
  3366: 'Co gai dong phuc cam',
  3367: 'Co gai dong phuc trang xanh',
  3368: 'Co gai suit trang xach tui',
  3369: 'Co gai streetwear do den',
  3370: 'Co gai ao hong be gau nho',
  3371: 'Co gai ngoi thu gian',
  3372: 'Co gai ao poncho vang',
  3373: 'Co gai ao khoac denim',
  3374: 'Co gai ao khoac xanh la',
  3375: 'Co gai ao hoodie xam',
  3376: 'Co gai ao khoac vang',
  3377: 'Co gai ao thun trang quan jean',
  3378: 'Nhan vat ao choang long vu',
  3379: 'Nhan vat jumpsuit xanh',
  3380: 'Chang trai ao da nghe tai nghe',
  3381: 'Quy ong suit trang',
  3382: 'Quy ong suit den deo kinh',
  3383: 'Quy ong suit den ngoi thap',
  3385: 'Co gai denim giang tay',
  3386: 'Chang trai streetwear deo kinh',
  3387: 'Chang trai ao da den',
  3388: 'Nhan vat sieu anh hung ao vang',
  3389: 'Chang trai hoodie vang',
  3390: 'Chang trai ao den vui ve',
  3391: 'Quy ong ao da nau',
  3392: 'Chang trai ao da den hut thuoc',
  3393: 'Quy ong suit sang mau',
  3394: 'Chang trai ao khoac den',
  3395: 'Nguoi dan ong lon tuoi ngoi nghi',
  3396: 'Chang trai ao thun xanh',
  3397: 'Chang trai ao caro ngoi xom',
  3398: 'Chang trai ao khoac ngoi xom',
  3399: 'Chang trai ao khoac xanh ngoi nghi',
}

function categoryFor(code: number): Category {
  if (familyCodes.has(code)) return 'giadinh'
  if (seniorCodes.has(code)) return 'caotuoi'
  if (sportCodes.has(code)) return 'thethao'
  if (animalCodes.has(code)) return 'dongvat'
  if (accessoryCodes.has(code)) return 'phukien'
  if (streetCodes.has(code)) return 'duongpho'
  if (femaleCodes.has(code)) return 'nu'
  return 'nam'
}

function seriesFor(category: Category): string {
  if (category === 'giadinh') return 'Gia dinh & Cap doi'
  if (category === 'caotuoi') return 'Nguoi cao tuoi'
  if (category === 'thethao') return 'Hanh dong & The thao'
  if (category === 'dongvat') return 'Dong vat & Thu cung'
  if (category === 'phukien') return 'Fantasy & Phu kien'
  if (category === 'duongpho') return 'Streetwear & Duong pho'
  if (category === 'nu') return 'Thoi trang nu'
  return 'Thoi trang nam'
}

const defaultNames: Record<Category, string> = {
  nam: 'Nhan vat nam tao dang',
  nu: 'Nhan vat nu thoi trang',
  giadinh: 'Nhan vat gia dinh',
  treem: 'Nhan vat tre em',
  caotuoi: 'Nhan vat lon tuoi',
  thethao: 'Nhan vat hanh dong',
  dongvat: 'Nhan vat cung thu cung',
  xe: 'Phuong tien diorama',
  phukien: 'Nhan vat fantasy',
  duongpho: 'Nhan vat streetwear',
}

function product(code: number): Product {
  const category = categoryFor(code)
  const series = seriesFor(category)
  const name = specialNames[code] ?? `${defaultNames[category]} ${code}`

  return {
    id: `sp-${code}`,
    code: `${code}`,
    name,
    category,
    series,
    price: 30000,
    material: 'Resin 3D cao cap',
    rating: 5,
    reviews: 20 + (code % 30),
    badge: 'Mới',
    inStock: true,
    accent: accents[category],
    image: `./products/sp-${code}.webp`,
    tags: [category, series.toLocaleLowerCase('vi'), name.toLocaleLowerCase('vi'), `${code}`],
    description: `Mo hinh ${name.toLocaleLowerCase('vi')} voi tao hinh ro net, phu hop trung bay va dung diorama chu de ${series.toLocaleLowerCase('vi')}.`,
    highlights: ['Tao hinh ro net', 'Toi uu cho in resin 3D', 'Phu hop trung bay va dung diorama'],
  }
}

function range(start: number, end: number): Product[] {
  return Array.from({ length: end - start + 1 }, (_, index) => product(start + index))
}

export const batch3300Products = range(3300, 3399)
