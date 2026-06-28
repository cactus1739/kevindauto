// ============================================================================
//  DỮ LIỆU SẢN PHẨM
//  - Để thêm ảnh thật: đặt ảnh vào thư mục /public/products/ và điền vào field
//    `image` (vd: image: './products/rx78.jpg'). Nếu để trống, web tự render
//    ảnh nền gradient theo `accent`.
// ============================================================================

export type Accent = 'brand' | 'cyan' | 'gold' | 'violet'

export type Category =
  | 'gunpla'
  | 'figure'
  | 'anime'
  | 'xe'
  | 'limited'

export interface Product {
  id: string
  name: string
  category: Category
  series: string // dòng / thương hiệu
  price: number
  oldPrice?: number
  scale: string // tỉ lệ (vd 1/100)
  height: string // chiều cao
  rating: number // 0-5
  reviews: number
  badge?: 'Mới' | 'Best Seller' | 'Limited' | 'Pre-order' | 'Sale'
  inStock: boolean
  accent: Accent
  image?: string
  tags: string[]
  description: string
  highlights: string[]
}

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'gunpla', label: 'Gunpla', icon: 'bot' },
  { id: 'figure', label: 'Action Figure', icon: 'swords' },
  { id: 'anime', label: 'Mô hình Anime', icon: 'sparkles' },
  { id: 'xe', label: 'Xe mô hình', icon: 'car' },
  { id: 'limited', label: 'Limited Edition', icon: 'crown' },
]

export const categoryLabel: Record<Category, string> = {
  gunpla: 'Gunpla',
  figure: 'Action Figure',
  anime: 'Mô hình Anime',
  xe: 'Xe mô hình',
  limited: 'Limited Edition',
}

export const products: Product[] = [
  {
    id: 'rx78-2-pg',
    name: 'RX-78-2 Gundam Perfect Grade',
    category: 'gunpla',
    series: 'Mobile Suit Gundam',
    price: 4290000,
    oldPrice: 4990000,
    scale: '1/60',
    height: '30 cm',
    rating: 5,
    reviews: 214,
    badge: 'Best Seller',
    inStock: true,
    accent: 'brand',
    tags: ['Perfect Grade', 'Khung trong', 'LED'],
    description:
      'Bản Perfect Grade huyền thoại với khung nội bộ chi tiết, khớp đa điểm và hệ LED phát sáng. Độ hoàn thiện đỉnh cao cho dân sưu tầm thực thụ.',
    highlights: ['Hơn 800 chi tiết', 'Khung trong full chuyển động', 'Tặng kèm LED phần đầu', 'Sticker nước cao cấp'],
  },
  {
    id: 'nu-gundam-rg',
    name: 'RG Nu Gundam Special Coating',
    category: 'gunpla',
    series: "Char's Counterattack",
    price: 1850000,
    scale: '1/144',
    height: '18 cm',
    rating: 5,
    reviews: 132,
    badge: 'Mới',
    inStock: true,
    accent: 'cyan',
    tags: ['Real Grade', 'Coating', 'Fin Funnel'],
    description:
      'Phiên bản phủ ánh kim đặc biệt, tái hiện Nu Gundam với hệ Fin Funnel tháo lắp. Nhỏ gọn nhưng chi tiết tới từng đường gân giáp.',
    highlights: ['Lớp phủ ánh kim nhà máy', 'Fin Funnel tháo rời', 'Khớp Advanced MS Joint', 'Decal phản quang'],
  },
  {
    id: 'sazabi-mg',
    name: 'MG Sazabi Ver.Ka',
    category: 'gunpla',
    series: "Char's Counterattack",
    price: 3290000,
    scale: '1/100',
    height: '26 cm',
    rating: 5,
    reviews: 98,
    badge: 'Best Seller',
    inStock: true,
    accent: 'brand',
    tags: ['Master Grade', 'Ver.Ka', 'Mở giáp'],
    description:
      'Master Grade Ver.Ka với thiết kế mở giáp toàn thân, lộ khung và động cơ. Tạo dáng cực ngầu cho tủ trưng bày.',
    highlights: ['Mở giáp toàn thân', 'Khung chi tiết', 'Vũ khí đầy đủ', 'Decal Ver.Ka'],
  },
  {
    id: 'goku-ultra',
    name: 'Son Goku Ultra Instinct S.H.Figuarts',
    category: 'figure',
    series: 'Dragon Ball Super',
    price: 1690000,
    oldPrice: 1990000,
    scale: 'Non-scale',
    height: '14 cm',
    rating: 5,
    reviews: 187,
    badge: 'Sale',
    inStock: true,
    accent: 'gold',
    tags: ['S.H.Figuarts', 'Hiệu ứng', 'Khớp động'],
    description:
      'Bản Bản Năng Vô Cực với tóc ánh bạc, kèm bộ phụ kiện hiệu ứng năng lượng. Khớp linh hoạt cho mọi tư thế combat.',
    highlights: ['Nhiều mặt thay thế', 'Hiệu ứng khí năng lượng', 'Hơn 20 điểm khớp', 'Đế tạo dáng bay'],
  },
  {
    id: 'luffy-gear5',
    name: 'Monkey D. Luffy Gear 5 — Figuarts ZERO',
    category: 'figure',
    series: 'One Piece',
    price: 2390000,
    scale: 'Non-scale',
    height: '22 cm',
    rating: 5,
    reviews: 156,
    badge: 'Mới',
    inStock: true,
    accent: 'cyan',
    tags: ['Figuarts ZERO', 'Diorama', 'Hiệu ứng'],
    description:
      'Khoảnh khắc Gear 5 bùng nổ được tái hiện sống động với hiệu ứng mây và chuyển động tóc. Tượng trưng bày cố định, chi tiết điện ảnh.',
    highlights: ['Tạo dáng điện ảnh', 'Hiệu ứng mây trắng', 'Sơn phủ thủ công', 'Đế diorama đi kèm'],
  },
  {
    id: 'nezuko-1-7',
    name: 'Nezuko Kamado 1/7 Scale Figure',
    category: 'anime',
    series: 'Kimetsu no Yaiba',
    price: 2890000,
    scale: '1/7',
    height: '20 cm',
    rating: 5,
    reviews: 143,
    badge: 'Best Seller',
    inStock: true,
    accent: 'brand',
    tags: ['Scale Figure', 'PVC', 'Sưu tầm'],
    description:
      'Tượng scale 1/7 chế tác tinh xảo, sắc thái biểu cảm và hoạ tiết kimono được sơn phủ tỉ mỉ. Lựa chọn kinh điển cho fan.',
    highlights: ['Tỉ lệ 1/7 chuẩn', 'Sơn phủ cao cấp', 'Đế trưng bày riêng', 'Hộp box màu'],
  },
  {
    id: 'gojo-1-7',
    name: 'Gojo Satoru 1/7 — Hollow Purple',
    category: 'anime',
    series: 'Jujutsu Kaisen',
    price: 3190000,
    scale: '1/7',
    height: '25 cm',
    rating: 5,
    reviews: 121,
    badge: 'Pre-order',
    inStock: false,
    accent: 'violet',
    tags: ['Scale Figure', 'Hiệu ứng LED', 'Pre-order'],
    description:
      'Tái hiện kỹ thuật Hư Vô Tím với chi tiết hiệu ứng trong suốt và tùy chọn LED. Hàng đặt trước, số lượng giới hạn.',
    highlights: ['Hiệu ứng Hollow Purple', 'Tùy chọn đế LED', 'Khăn bịt mắt tháo rời', 'Phiên bản giới hạn'],
  },
  {
    id: 'ferrari-f40',
    name: 'Ferrari F40 — Die-cast 1/18',
    category: 'xe',
    series: 'Ferrari Heritage',
    price: 2590000,
    scale: '1/18',
    height: '24 cm (dài)',
    rating: 5,
    reviews: 76,
    badge: 'Best Seller',
    inStock: true,
    accent: 'brand',
    tags: ['Die-cast', 'Kim loại', 'Mở cửa'],
    description:
      'Mô hình kim loại tỉ lệ 1/18, mở được cửa - capo - cốp, nội thất chi tiết. Tái hiện huyền thoại F40 từng đường nét.',
    highlights: ['Thân kim loại die-cast', 'Mở cửa/capo/cốp', 'Nội thất chi tiết', 'Lốp cao su thật'],
  },
  {
    id: 'lambo-aventador',
    name: 'Lamborghini Aventador SVJ 1/18',
    category: 'xe',
    series: 'Lamborghini',
    price: 2790000,
    oldPrice: 3090000,
    scale: '1/18',
    height: '26 cm (dài)',
    rating: 4,
    reviews: 64,
    badge: 'Sale',
    inStock: true,
    accent: 'gold',
    tags: ['Die-cast', 'Cửa cắt kéo', 'Chi tiết'],
    description:
      'Bản SVJ với cửa cắt kéo đặc trưng, sơn phủ nhiều lớp bóng gương. Chi tiết động cơ V12 hiển thị qua nắp kính sau.',
    highlights: ['Cửa cắt kéo', 'Sơn bóng nhiều lớp', 'Động cơ V12 chi tiết', 'Vô-lăng xoay bánh trước'],
  },
  {
    id: 'eva-01-limited',
    name: 'EVA-01 Test Type — Limited Chrome Edition',
    category: 'limited',
    series: 'Neon Genesis Evangelion',
    price: 5990000,
    scale: '1/400',
    height: '34 cm',
    rating: 5,
    reviews: 42,
    badge: 'Limited',
    inStock: true,
    accent: 'violet',
    tags: ['Giới hạn', 'Đánh số', 'Phủ chrome'],
    description:
      'Phiên bản giới hạn phủ chrome ánh tím, mỗi sản phẩm được đánh số riêng kèm giấy chứng nhận. Tuyệt phẩm cho bộ sưu tập đỉnh.',
    highlights: ['Đánh số giới hạn', 'Phủ chrome đặc biệt', 'Kèm giấy chứng nhận', 'Hộp gỗ sang trọng'],
  },
  {
    id: 'demon-king-statue',
    name: 'Statue Premium — Đại Đế Bóng Tối',
    category: 'limited',
    series: 'Original Collection',
    price: 8990000,
    scale: '1/4',
    height: '52 cm',
    rating: 5,
    reviews: 28,
    badge: 'Limited',
    inStock: true,
    accent: 'brand',
    tags: ['Statue 1/4', 'Resin', 'Thủ công'],
    description:
      'Tượng resin tỉ lệ 1/4 chế tác thủ công, sơn vẽ từng lớp, đế diorama đèn LED. Kiệt tác trưng bày trung tâm cho phòng sưu tầm.',
    highlights: ['Resin cao cấp 1/4', 'Sơn vẽ thủ công', 'Đế diorama LED', 'Giới hạn 500 bản toàn cầu'],
  },
  {
    id: 'strike-freedom-mg',
    name: 'MG Strike Freedom Gundam',
    category: 'gunpla',
    series: 'Gundam SEED Destiny',
    price: 2090000,
    scale: '1/100',
    height: '20 cm',
    rating: 5,
    reviews: 110,
    badge: 'Best Seller',
    inStock: true,
    accent: 'gold',
    tags: ['Master Grade', 'Mạ vàng', 'Cánh DRAGOON'],
    description:
      'Master Grade với chi tiết mạ vàng và hệ cánh DRAGOON bung xòe hoành tráng. Một trong những bộ Gunpla được yêu thích nhất.',
    highlights: ['Chi tiết mạ vàng', 'Cánh DRAGOON bung', 'Súng dài Xiphias', 'Khớp linh hoạt'],
  },
]

export const productsById = Object.fromEntries(products.map((p) => [p.id, p]))
