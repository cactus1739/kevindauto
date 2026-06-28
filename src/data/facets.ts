// ============================================================================
//  HỆ THỐNG FACET — phân loại sâu & CHÉO NHAU (1 figure thuộc nhiều nhóm).
//  Mỗi facet khớp sản phẩm qua từ khoá (so với tên + series + tag + mô tả).
//  Thêm/bớt facet hay từ khoá thoải mái ở đây, không cần sửa từng sản phẩm.
// ============================================================================
import { normalizeVi } from '../lib/text'
import type { Product } from './products'

export interface Facet {
  id: string
  label: string
  keywords: string[]
}
export interface FacetGroup {
  id: string
  label: string
  facets: Facet[]
}

export const facetGroups: FacetGroup[] = [
  {
    id: 'style',
    label: 'Phong cách',
    facets: [
      { id: 'congso', label: 'Công sở / Vest', keywords: ['công sở', 'vest', 'suit', 'doanh nhân', 'thuyết trình'] },
      { id: 'street', label: 'Streetwear', keywords: ['streetwear', 'denim', 'jean', 'hoodie', 'cá tính'] },
      { id: 'aokhoac', label: 'Áo khoác', keywords: ['áo khoác', 'parka', 'măng tô', 'trench', 'choàng'] },
      { id: 'vaydam', label: 'Váy & Đầm', keywords: ['váy', 'đầm', 'dạ hội'] },
      { id: 'cuoi', label: 'Cô dâu / Cưới', keywords: ['cô dâu', 'cưới', 'voan'] },
      { id: 'goicam', label: 'Gợi cảm', keywords: ['gợi cảm', 'bikini', 'nội y'] },
      { id: 'thethao', label: 'Đồ thể thao', keywords: ['thể thao', 'bóng đá', 'bóng rổ', 'jersey', 'vận động'] },
    ],
  },
  {
    id: 'pose',
    label: 'Tư thế',
    facets: [
      { id: 'ngoi', label: 'Ngồi', keywords: ['ngồi'] },
      { id: 'dichuyen', label: 'Đi / Di chuyển', keywords: ['đi bộ', 'dạo bước', 'phượt', 'sải bước'] },
      { id: 'nangdong', label: 'Năng động', keywords: ['năng động', 'ăn mừng', 'dẫn bóng', 'tung'] },
      { id: 'thugian', label: 'Thư giãn / Thiền', keywords: ['thiền', 'nghỉ', 'thư giãn', 'tĩnh lặng'] },
    ],
  },
  {
    id: 'theme',
    label: 'Chủ đề',
    facets: [
      { id: 'dulich', label: 'Du lịch / Phượt', keywords: ['du lịch', 'phượt', 'ba lô'] },
      { id: 'nghenghiep', label: 'Nghề nghiệp', keywords: ['shipper', 'giao hàng', 'đầu bếp', 'thợ', 'doanh nhân', 'nghề nghiệp'] },
      { id: 'hocduong', label: 'Học đường', keywords: ['học sinh', 'sinh viên', 'gile'] },
      { id: 'anime', label: 'Anime / Cosplay', keywords: ['anime', 'kiếm', 'katana', 'sát thủ', 'money heist'] },
      { id: 'nghethuat', label: 'Nghệ thuật', keywords: ['tượng', 'nghệ thuật', 'điêu khắc', 'thiên thần', 'cổ điển'] },
      { id: 'dethuong', label: 'Dễ thương', keywords: ['chibi', 'dễ thương', 'gấu', 'teddy', 'kumamon', 'khủng long'] },
    ],
  },
  {
    id: 'color',
    label: 'Màu chủ đạo',
    facets: [
      { id: 'do', label: 'Đỏ', keywords: ['đỏ'] },
      { id: 'den', label: 'Đen', keywords: ['đen'] },
      { id: 'trang', label: 'Trắng', keywords: ['trắng'] },
      { id: 'xanh', label: 'Xanh', keywords: ['xanh'] },
      { id: 'vang', label: 'Vàng / Đồng', keywords: ['vàng', 'gold', 'đồng', 'vương miện'] },
    ],
  },
  {
    id: 'props',
    label: 'Kèm theo',
    facets: [
      { id: 'dienthoai', label: 'Điện thoại', keywords: ['điện thoại'] },
      { id: 'mayanh', label: 'Máy ảnh', keywords: ['máy ảnh', 'nhiếp ảnh'] },
      { id: 'balo', label: 'Ba lô', keywords: ['ba lô'] },
      { id: 'douong', label: 'Đồ uống', keywords: ['ly nước', 'trà sữa', 'ly'] },
      { id: 'vukhi', label: 'Vũ khí', keywords: ['kiếm', 'katana'] },
      { id: 'hoa', label: 'Hoa', keywords: ['hoa'] },
    ],
  },
]

/** Văn bản tìm kiếm gộp của 1 sản phẩm (đã chuẩn hoá không dấu). */
export function searchableText(p: Product): string {
  return normalizeVi(
    [p.name, p.series, p.code, ...p.tags, p.description].join(' '),
  )
}

/** Sản phẩm có khớp facet không (theo từ khoá, không dấu). */
export function productMatchesFacet(p: Product, facet: Facet): boolean {
  const text = searchableText(p)
  return facet.keywords.some((k) => text.includes(normalizeVi(k)))
}

/**
 * TỪ ĐỒNG NGHĨA / mở rộng từ khoá vu vơ -> đặc điểm sản phẩm.
 * Khi người dùng gõ "đi làm", "gym", "cute"... sẽ được mở rộng để tìm ra nhóm tương đồng.
 */
export const SYNONYMS: Record<string, string[]> = {
  'di lam': ['cong so', 'vest', 'doanh nhan'],
  'van phong': ['cong so', 'vest'],
  'cong viec': ['cong so', 'nghe nghiep'],
  sep: ['cong so', 'doanh nhan', 'vest'],
  gym: ['the thao', 'van dong'],
  tap: ['the thao'],
  khoe: ['the thao'],
  'da banh': ['bong da', 'the thao'],
  'da bong': ['bong da', 'the thao'],
  bong: ['bong da', 'bong ro', 'the thao'],
  'dam cuoi': ['co dau', 'vay cuoi'],
  cuoi: ['co dau', 'vay', 'voan'],
  'ket hon': ['co dau', 'cuoi'],
  cute: ['de thuong', 'chibi', 'gau'],
  'dang yeu': ['de thuong', 'chibi'],
  thu: ['dong vat', 'gau', 'khung long'],
  'con vat': ['dong vat', 'gau', 'khung long'],
  'thu cung': ['dong vat', 'de thuong'],
  sexy: ['goi cam', 'bikini'],
  'nong bong': ['goi cam'],
  'quyen ru': ['goi cam'],
  ong: ['nguoi cao tuoi', 'cao tuoi'],
  ba: ['nguoi cao tuoi'],
  gia: ['nguoi cao tuoi', 'cao tuoi'],
  'lon tuoi': ['nguoi cao tuoi'],
  'tre con': ['tre em', 'be trai'],
  'em be': ['tre em'],
  be: ['tre em'],
  'con nit': ['tre em'],
  pho: ['streetwear'],
  'duong pho': ['streetwear'],
  street: ['streetwear'],
  ngau: ['streetwear', 'ca tinh'],
  chat: ['streetwear', 'ca tinh'],
  'ca phe': ['ly', 'tra sua', 'do uong'],
  uong: ['ly', 'tra sua'],
  nuoc: ['ly', 'tra sua', 'thuyen', 'phao'],
  bien: ['thuyen', 'phao'],
  song: ['thuyen', 'phao'],
  tau: ['thuyen', 'phao', 'ca no'],
  'du thuyen': ['thuyen', 'phao'],
  'chup hinh': ['may anh', 'nhiep anh'],
  'chup anh': ['may anh', 'nhiep anh'],
  camera: ['may anh', 'nhiep anh'],
  'di choi': ['du lich', 'ba lo'],
  ninja: ['kiem', 'sat thu', 'anime'],
  'sat thu': ['kiem', 'anime'],
  chien: ['kiem', 'anime'],
  noel: ['thien than'],
  'giang sinh': ['thien than'],
  red: ['do'],
  black: ['den'],
  white: ['trang'],
  blue: ['xanh'],
  yellow: ['vang'],
  shipper: ['giao hang', 'nghe nghiep'],
  'giao hang': ['shipper', 'nghe nghiep'],
}
