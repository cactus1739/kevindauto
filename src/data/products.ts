// ============================================================================
//  DỮ LIỆU SẢN PHẨM — Mô hình người (figure) & phụ kiện KEVIN ĐẦU TO
//  Ảnh nằm ở /public/products/sp-<mã>.webp (cắt từ catalog gốc).
//  Giá đang để đồng giá 30.000₫ — chỉnh tay lại trong từng dòng nếu cần.
// ============================================================================

export type Accent = 'brand' | 'cyan' | 'gold' | 'violet'

export type Category =
  | 'nam'
  | 'nu'
  | 'giadinh'
  | 'caotuoi'
  | 'thethao'
  | 'tuong'
  | 'dongvat'
  | 'phukien'

export interface Product {
  id: string
  code: string
  name: string
  category: Category
  series: string // chủ đề / nhóm hiển thị
  price: number
  material: string
  rating: number
  reviews: number
  badge?: 'Mới' | 'Best Seller' | 'Limited' | 'Pre-order'
  inStock: boolean
  accent: Accent
  image?: string
  tags: string[]
  description: string
  highlights: string[]
}

export const categories: { id: Category; label: string }[] = [
  { id: 'nam', label: 'Nam giới' },
  { id: 'nu', label: 'Nữ giới' },
  { id: 'giadinh', label: 'Cặp đôi & Gia đình' },
  { id: 'caotuoi', label: 'Người cao tuổi' },
  { id: 'thethao', label: 'Thể thao' },
  { id: 'tuong', label: 'Tượng & Nghệ thuật' },
  { id: 'dongvat', label: 'Động vật & Chibi' },
  { id: 'phukien', label: 'Phụ kiện & Bối cảnh' },
]

export const categoryLabel: Record<Category, string> = {
  nam: 'Nam giới',
  nu: 'Nữ giới',
  giadinh: 'Cặp đôi & Gia đình',
  caotuoi: 'Người cao tuổi',
  thethao: 'Thể thao',
  tuong: 'Tượng & Nghệ thuật',
  dongvat: 'Động vật & Chibi',
  phukien: 'Phụ kiện & Bối cảnh',
}

const ACCENT: Record<Category, Accent> = {
  nam: 'cyan',
  nu: 'brand',
  giadinh: 'gold',
  caotuoi: 'violet',
  thethao: 'cyan',
  tuong: 'gold',
  dongvat: 'brand',
  phukien: 'violet',
}

interface Opts {
  material?: string
  rating?: number
  reviews?: number
  badge?: Product['badge']
  inStock?: boolean
  highlights?: string[]
}

// Hàm dựng sản phẩm gọn — đồng giá 30.000₫, ảnh & accent tự suy ra theo mã/danh mục.
function p(
  code: number,
  name: string,
  category: Category,
  series: string,
  tags: string[],
  description: string,
  opts: Opts = {},
): Product {
  return {
    id: `sp-${code}`,
    code: `${code}`,
    name,
    category,
    series,
    price: 30000,
    material: opts.material ?? 'Resin 3D cao cấp',
    rating: opts.rating ?? 5,
    reviews: opts.reviews ?? 40 + (code % 160),
    badge: opts.badge,
    inStock: opts.inStock ?? true,
    accent: ACCENT[category],
    image: `./products/sp-${code}.webp`,
    tags,
    description,
    highlights:
      opts.highlights ?? ['Chế tác chi tiết sắc nét', 'Sơn phủ tỉ mỉ', 'Phù hợp trưng bày & diorama'],
  }
}

export const products: Product[] = [
  // ---------------- Hàng 1: 4400–4412 ----------------
  p(4400, 'Chàng trai phượt chụp ảnh', 'nam', 'Du lịch', ['nam', 'phượt', 'du lịch', 'ba lô', 'nhiếp ảnh', 'máy ảnh', 'đời thường'],
    'Mô hình chàng trai đeo ba lô lớn đang đưa máy ảnh lên chụp — chất phượt thủ năng động, hợp diorama đường phố.'),
  p(4401, 'Chàng trai áo khoác denim', 'nam', 'Streetwear', ['nam', 'denim', 'jean', 'streetwear', 'đời thường', 'dạo phố'],
    'Chàng trai trẻ trung trong áo khoác denim, dáng đi tự tin — phong cách streetwear đời thường.'),
  p(4402, 'Quý ông sơ mi thường ngày', 'nam', 'Đời thường', ['nam', 'sơ mi', 'lịch lãm', 'kính', 'đời thường'],
    'Quý ông trong sơ mi sáng màu, tay chống hông, kính gài cổ áo — lịch lãm mà thoải mái.'),
  p(4403, 'Chàng trai áo khoác parka', 'nam', 'Streetwear', ['nam', 'parka', 'áo khoác', 'streetwear', 'mùa đông'],
    'Chàng trai khoác parka rộng nhiều lớp, phong cách đường phố cá tính cho mùa lạnh.'),
  p(4404, 'Quý ông vest đen', 'nam', 'Công sở', ['nam', 'vest', 'suit', 'công sở', 'doanh nhân', 'lịch lãm'],
    'Quý ông trong bộ vest đen, hai tay đút túi — hình mẫu doanh nhân lịch lãm, sang trọng.',
    { badge: 'Best Seller' }),
  p(4405, 'Cầu thủ bóng rổ', 'thethao', 'Thể thao', ['thể thao', 'bóng rổ', 'vận động viên', 'jersey', 'năng động'],
    'Cầu thủ bóng rổ đang dẫn bóng đầy năng lượng — điểm nhấn thể thao cho bộ sưu tập.'),
  p(4406, 'Chàng trai áo khoác đỏ ngồi nghỉ', 'nam', 'Đời thường', ['nam', 'áo đỏ', 'ngồi', 'đời thường', 'năng động'],
    'Chàng trai áo khoác đỏ ngồi nghỉ uống nước, thần thái thư giãn rất đời.'),
  p(4407, 'Cặp đôi dạo phố', 'giadinh', 'Cặp đôi', ['cặp đôi', 'đôi', 'tình nhân', 'hẹn hò', 'nam nữ', 'gia đình', 'hoa'],
    'Cặp đôi tay trong tay đi dạo, cô gái ôm bó hoa — khoảnh khắc hẹn hò ngọt ngào.',
    { badge: 'Mới' }),
  p(4408, 'Chàng trai áo polo đỏ', 'nam', 'Đời thường', ['nam', 'polo', 'casual', 'đời thường', 'quần short'],
    'Chàng trai áo polo đỏ phối quần short, phong cách trẻ trung thường ngày.'),
  p(4409, 'Phượt thủ ba lô lớn', 'nam', 'Du lịch', ['nam', 'phượt', 'du lịch', 'ba lô', 'mũ', 'đi bộ'],
    'Phượt thủ với ba lô cỡ đại và mũ lưỡi trai, sải bước trên hành trình khám phá.'),
  p(4410, 'Cô gái cá tính nóng bỏng', 'nu', 'Cá tính', ['nữ', 'bikini', 'gợi cảm', 'biker', 'mũ bảo hiểm', 'boots'],
    'Cô gái cá tính cầm mũ bảo hiểm, phong cách biker quyến rũ và mạnh mẽ.'),
  p(4411, 'Quý cô váy mỏng', 'nu', 'Gợi cảm', ['nữ', 'gợi cảm', 'váy', 'tóc vàng', 'cao gót'],
    'Quý cô tóc vàng trong chiếc váy mỏng và giày cao gót — gợi cảm và sang trọng.'),
  p(4412, 'Quý cô áo măng tô', 'nu', 'Thanh lịch', ['nữ', 'măng tô', 'trench coat', 'thanh lịch', 'boots'],
    'Quý cô khoác măng tô dài phối boots cao cổ — khí chất thanh lịch, sành điệu.'),

  // ---------------- Hàng 2: 4413–4425 ----------------
  p(4413, 'Cụ ông vest chào', 'caotuoi', 'Người cao tuổi', ['người già', 'cao tuổi', 'vest', 'ông', 'lịch lãm'],
    'Cụ ông trong bộ vest chỉnh tề, đưa tay chào thân thiện — phong thái đáng kính.'),
  p(4414, 'Cụ ông tạp dề thợ', 'caotuoi', 'Nghề nghiệp', ['người già', 'cao tuổi', 'tạp dề', 'thợ', 'đầu bếp', 'ông'],
    'Cụ ông đeo tạp dề và kính, hình mẫu người thợ/đầu bếp lành nghề tận tụy.'),
  p(4415, 'Cụ ông túi đeo dạo bước', 'caotuoi', 'Người cao tuổi', ['người già', 'cao tuổi', 'ông', 'túi', 'đi bộ'],
    'Cụ ông áo sơ mi kẻ, túi đeo vai, thong dong dạo bước rất đời thường.'),
  p(4416, 'Chàng trai ngồi xổm xem điện thoại', 'nam', 'Streetwear', ['nam', 'denim', 'ngồi xổm', 'điện thoại', 'streetwear'],
    'Chàng trai denim ngồi xổm lướt điện thoại — dáng street chất chơi quen thuộc.'),
  p(4417, 'Bóng đen bí ẩn', 'nam', 'Độc đáo', ['nam', 'bí ẩn', 'bóng đen', 'ngồi', 'độc đáo', 'kinh dị'],
    'Nhân vật bóng đen ngồi trên ghế, bí ẩn và đầy ám ảnh — điểm nhấn độc lạ cho tủ trưng bày.'),
  p(4418, 'Ông hoàng áo choàng', 'nam', 'Độc đáo', ['nam', 'vương miện', 'áo choàng', 'hoàng gia', 'độc đáo', 'quyền lực'],
    'Nhân vật đội vương miện, khoác áo choàng lộng lẫy cùng cây gậy — khí chất ông hoàng quyền lực.'),
  p(4419, 'Mẫu áo liền quần đỏ', 'nam', 'Ấn tượng', ['đỏ', 'áo liền quần', 'money heist', 'trùm đầu', 'ấn tượng', 'unisex'],
    'Bộ áo liền quần đỏ trùm đầu cực ấn tượng (cảm hứng Money Heist) — màu sắc nổi bật trên kệ.',
    { badge: 'Best Seller' }),
  p(4420, 'Cụ ông tạp dề xem điện thoại', 'caotuoi', 'Nghề nghiệp', ['người già', 'cao tuổi', 'tạp dề', 'ông', 'điện thoại'],
    'Cụ ông đeo tạp dề đứng xem điện thoại — khoảnh khắc đời thường gần gũi.'),
  p(4421, 'Quý cô áo choàng đen', 'nu', 'Cá tính', ['nữ', 'đen', 'áo choàng', 'bí ẩn', 'tóc đen', 'cá tính'],
    'Quý cô tóc đen trong áo choàng đen, ánh nhìn lạnh lùng đầy cuốn hút.'),
  p(4422, 'Doanh nhân ngồi suy tư', 'nam', 'Công sở', ['nam', 'vest', 'doanh nhân', 'ngồi', 'suy tư'],
    'Doanh nhân trong bộ vest, ngồi tì khuỷu tay suy tư — thần thái trầm tĩnh, bản lĩnh.'),
  p(4423, 'Nam sinh áo gile', 'nam', 'Học đường', ['nam', 'học sinh', 'sinh viên', 'gile', 'ba lô', 'trẻ'],
    'Nam sinh áo gile kẻ, đeo ba lô, dáng vẻ trẻ trung của tuổi học trò.'),
  p(4424, 'Quý cô nội y đen', 'nu', 'Gợi cảm', ['nữ', 'gợi cảm', 'nội y', 'đen', 'ngồi'],
    'Quý cô trong trang phục đen gợi cảm, dáng ngồi quyến rũ và cá tính.'),
  p(4425, 'Tượng thiếu nữ cổ điển', 'tuong', 'Nghệ thuật', ['tượng', 'nghệ thuật', 'cổ điển', 'trắng', 'điêu khắc'],
    'Tượng thiếu nữ phong cách điêu khắc cổ điển, đường nét mềm mại — tác phẩm trưng bày nghệ thuật.',
    { badge: 'Limited', material: 'Resin trắng cao cấp' }),

  // ---------------- Hàng 3: 4426–4438 ----------------
  p(4426, 'Người ngồi thiền hoodie', 'nu', 'Thư giãn', ['thiền', 'hoodie', 'ngồi', 'yoga', 'tĩnh lặng', 'unisex'],
    'Nhân vật khoác hoodie ngồi thiền tĩnh lặng — nét bình yên giữa nhịp sống.'),
  p(4427, 'Cô nàng áo khoác xanh cá tính', 'nu', 'Streetwear', ['nữ', 'streetwear', 'áo khoác xanh', 'jean', 'cá tính', 'kính'],
    'Cô nàng áo khoác xanh, jeans và kính mát, tạo dáng cực ngầu và tự tin.'),
  p(4428, 'Quý cô đầm đỏ', 'nu', 'Dạ hội', ['nữ', 'đầm đỏ', 'sang trọng', 'ngồi', 'dạ hội'],
    'Quý cô trong đầm đỏ nổi bật, dáng ngồi sang trọng kiểu tiệc tối.'),
  p(4429, 'Nữ mẫu bản xám (chưa sơn)', 'nu', 'Prototype', ['nữ', 'xám', 'chưa sơn', 'prototype', 'điện thoại'],
    'Bản mẫu màu xám chưa sơn — phù hợp người chơi thích tự tay tô màu sáng tạo.'),
  p(4430, 'Cô gái tóc vàng', 'nu', 'Đời thường', ['nữ', 'tóc vàng', 'đời thường', 'điện thoại'],
    'Cô gái tóc vàng dáng đứng tự nhiên, cầm điện thoại — hình mẫu đời thường dễ thương.'),
  p(4431, 'Cô dâu váy cưới', 'nu', 'Cưới', ['nữ', 'cô dâu', 'váy cưới', 'cưới', 'voan', 'lãng mạn'],
    'Cô dâu trong váy cưới trắng và voan dài — khoảnh khắc lãng mạn nhất đời người.',
    { badge: 'Mới' }),
  p(4432, 'Nữ sát thủ kiếm đỏ', 'nu', 'Anime', ['nữ', 'kiếm', 'katana', 'đầm đỏ', 'sát thủ', 'anime', 'ấn tượng'],
    'Cô gái đầm đỏ cầm katana, khí chất nữ sát thủ ngầu lòi đậm chất anime.',
    { badge: 'Best Seller' }),
  p(4433, 'Tượng nữ thần áo choàng', 'tuong', 'Nghệ thuật', ['tượng', 'nghệ thuật', 'cổ điển', 'nữ thần', 'điêu khắc', 'trắng'],
    'Tượng nữ thần khoác áo choàng buông xõa, tạo hình điêu khắc cổ điển uy nghi.',
    { material: 'Resin trắng cao cấp' }),
  p(4434, 'Tượng thiếu nữ ngồi', 'tuong', 'Nghệ thuật', ['tượng', 'nghệ thuật', 'trắng', 'điêu khắc', 'ngồi'],
    'Tượng thiếu nữ ngồi trên bệ, đường nét tinh tế — tác phẩm trưng bày trung tâm.',
    { material: 'Resin trắng cao cấp' }),
  p(4435, 'Thiên thần có cánh', 'tuong', 'Fantasy', ['tượng', 'thiên thần', 'cánh', 'nghệ thuật', 'điêu khắc', 'fantasy'],
    'Tượng thiên thần với đôi cánh lớn trải rộng — kiệt tác fantasy đầy mê hoặc.',
    { badge: 'Limited', material: 'Resin trắng cao cấp' }),
  p(4436, 'Cô gái hoodie thường ngày', 'nu', 'Streetwear', ['nữ', 'hoodie', 'đời thường', 'điện thoại', 'streetwear'],
    'Cô gái hoodie và quần jogger, cầm điện thoại — phong cách thường ngày năng động.'),
  p(4437, 'Cô nàng hoodie mũ lưỡi trai', 'nu', 'Streetwear', ['nữ', 'hoodie', 'mũ', 'streetwear', 'năng động'],
    'Cô nàng hoodie phối mũ lưỡi trai, chất streetwear khoẻ khoắn và trẻ trung.'),
  p(4438, 'Cô gái áo denim cầm ly', 'nu', 'Streetwear', ['nữ', 'denim', 'beanie', 'streetwear', 'đời thường', 'ly nước'],
    'Cô gái áo denim, mũ len, tay cầm ly nước — hình ảnh đời thường cực cuốn.'),

  // ---------------- Hàng 4: 4439–4451 ----------------
  p(4439, 'Shipper giao hàng', 'nam', 'Nghề nghiệp', ['nam', 'shipper', 'giao hàng', 'xe máy', 'mũ bảo hiểm', 'đời thường', 'nghề nghiệp'],
    'Anh shipper với thùng giao hàng và mũ bảo hiểm — hình ảnh quen thuộc của phố phường Việt.',
    { badge: 'Mới' }),
  p(4440, 'Gấu Kumamon áo da', 'dongvat', 'Chibi', ['gấu', 'kumamon', 'chibi', 'dễ thương', 'mascot', 'đen'],
    'Chú gấu Kumamon khoác áo da cá tính — mascot dễ thương được yêu thích.',
    { badge: 'Best Seller', material: 'Nhựa PVC cao cấp' }),
  p(4441, 'Khủng long T-Rex', 'dongvat', 'Khủng long', ['khủng long', 't-rex', 'động vật', 'dinosaur', 'mô hình'],
    'Mô hình khủng long T-Rex chi tiết, da vảy sắc nét — uy mãnh và sống động.',
    { material: 'Nhựa PVC cao cấp' }),
  p(4442, 'Gấu bông đeo kính', 'dongvat', 'Chibi', ['gấu', 'teddy', 'chibi', 'dễ thương', 'kính', 'đồ chơi'],
    'Chú gấu bông đeo kính đỏ, mặc denim — ngộ nghĩnh và đáng yêu hết nấc.',
    { material: 'Nhựa PVC cao cấp' }),
  p(4443, 'Khủng long hoạt hình xanh', 'dongvat', 'Chibi', ['khủng long', 'dinosaur', 'chibi', 'dễ thương', 'xanh', 'hoạt hình'],
    'Khủng long phong cách hoạt hình màu xanh mướt, tạo hình cute cho mọi lứa tuổi.',
    { material: 'Nhựa PVC cao cấp' }),
  p(4444, 'Cậu bé cầm máy ảnh', 'giadinh', 'Trẻ em', ['trẻ em', 'bé trai', 'máy ảnh', 'ghế xếp', 'gia đình', 'dễ thương'],
    'Cậu bé đội mũ ngồi ghế xếp, tay cầm máy ảnh — khoảnh khắc tuổi thơ trong veo.'),
  p(4445, 'Cầu thủ bóng đá ăn mừng', 'thethao', 'Thể thao', ['thể thao', 'bóng đá', 'cầu thủ', 'ăn mừng', 'jersey', 'số 7'],
    'Cầu thủ bóng đá áo số 7 tung nắm đấm ăn mừng bàn thắng — khoảnh khắc bùng nổ.',
    { badge: 'Mới' }),
  p(4446, 'Chàng trai đeo kính ngồi ghế', 'nam', 'Đời thường', ['nam', 'kính', 'ngồi', 'đời thường', 'ghế'],
    'Chàng trai đeo kính ngồi thư thái trên ghế đẩu — dáng đời thường tự nhiên.'),
  p(4447, 'Doanh nhân thuyết trình', 'nam', 'Công sở', ['nam', 'doanh nhân', 'ngồi', 'thuyết trình', 'công sở'],
    'Người đàn ông ngồi thuyết trình, tay khua diễn đạt — thần thái chuyên nghiệp.'),
  p(4448, 'Quý ông vest ngồi', 'nam', 'Công sở', ['nam', 'vest', 'suit', 'ngồi', 'công sở', 'lịch lãm'],
    'Quý ông vest ngồi đan tay, phong thái điềm tĩnh và sang trọng.'),
  p(4449, 'Thuyền phao gắn máy', 'phukien', 'Phụ kiện', ['phụ kiện', 'thuyền', 'thuyền phao', 'ca nô', 'bối cảnh', 'nước'],
    'Mô hình thuyền phao gắn máy chi tiết — đạo cụ hoàn hảo cho diorama sông nước.',
    { material: 'Nhựa cao cấp' }),
  p(4450, 'Thuyền phao cứu sinh', 'phukien', 'Phụ kiện', ['phụ kiện', 'thuyền', 'phao cứu sinh', 'bối cảnh', 'nước'],
    'Thuyền phao cứu sinh mô phỏng thực tế — phụ kiện tạo bối cảnh sống động.',
    { material: 'Nhựa cao cấp' }),
  p(4451, 'Cô nàng trà sữa streetwear', 'nu', 'Streetwear', ['nữ', 'streetwear', 'beanie', 'trà sữa', 'đời thường', 'cá tính'],
    'Cô nàng mũ len cầm hai ly trà sữa, phối cargo cá tính — chuẩn gu giới trẻ.',
    { badge: 'Best Seller' }),
]

export const productsById = Object.fromEntries(products.map((p) => [p.id, p]))
