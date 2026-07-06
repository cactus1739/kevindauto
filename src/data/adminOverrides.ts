// Ghi đè từ trang quản trị nội bộ (/admin, chỉ chạy khi npm run dev). Áp dụng SAU CÙNG lên
// toàn bộ `products` (cả staticProducts lẫn importedProducts) nên không cần phân biệt nguồn
// gốc dữ liệu — sửa 1 chỗ, có tác dụng với mọi mã sản phẩm.
import type { Category } from './products'
// (import type — chỉ dùng lúc biên dịch, không tạo vòng lặp import lúc chạy)

export interface AdminOverride {
  name?: string
  category?: Category
  tags?: string[]
  price?: number
}

export const adminOverrides: Record<string, AdminOverride> = {
  "100": {"name":"Nam cởi trần","category":"nam","tags":["nam","cởi trần","tattoo","giang hồ"],"price":30000},
  "101": {"name":"Nam finger ngón tay giữa","category":"nam","tags":["nam","áo phông","fuck","finger","ngón tay giữa","mắt kính","giang hồ"],"price":30000},
  "102": {"name":"Nam phục vụ cà phê khoanh tay","category":"nam","tags":["nam","khoanh tay","đứng","phục vụ","cà phê","mắt kính"],"price":30000},
  "103": {"name":"Ông chú dắt chó","category":"nam","tags":["nam","chó","dắt chó","ông chú","cao tuổi","lớn tuổi","đi dạo"],"price":30000},
  "105": {"name":"Ông chú đang nói","category":"nam","tags":["nam","dang tay","áo rộng","kinh doanh","sơ mi","lớn tuổi","trung niên","quần jean"],"price":30000},
  "106": {"name":"Nam cúi hút thuốc xin lửa","category":"nam","tags":["nam","cúi người","hút thuốc","xin lửa"],"price":30000},
  "107": {"name":"Nam chụp ảnh","category":"nam","tags":["nam","chụp ảnh","chụp hình","photographer"],"price":30000},
  "300": {"name":"Nữ quần jean áo cổ cao","category":"nu","tags":["nữ","Jean","đứng"],"price":30000},
  "301": {"name":"Nữ tennis","category":"thethao","tags":["nữ","váy ôm","tạo dáng","thời trang","tennis","thể thao"],"price":30000},
  "302": {"name":"Nữ vest thời trang đeo kính","category":"nu","tags":["nữ","glasses","vest","kính"],"price":30000},
  "304": {"name":"Nữ vest công sở điện thoại","category":"nu","tags":["nữ","công sở","điện thoại","vest","túi xách"],"price":30000},
  "305": {"name":"Nữ quần jean sơ mi","category":"nu","tags":["nữ","jean"],"price":30000},
  "306": {"name":"Nữ áo khoác lông","category":"nu","tags":["nữ","áo khoác dài","thời trang","lông","mắt kính"],"price":30000},
  "4449": {"name":"Thuyền camel động cơ","category":"phukien","tags":["phụ kiện","phụ kiện","thuyền cam động cơ","camel","xuồng","offroad"],"price":60000},
  "4451": {"name":"Cô gái cầm ly cà phê street style","category":"nu","tags":["nữ","streetwear","cô gái cầm ly cà phê street style"],"price":30000},
}
