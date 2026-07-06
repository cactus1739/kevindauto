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
  "300": {"name":"Nữ quần jean áo cổ cao","category":"nu","tags":["nữ","Jean","đứng"],"price":30000},
  "4449": {"name":"Thuyền camel động cơ","category":"phukien","tags":["phụ kiện","phụ kiện","thuyền cam động cơ","camel","xuồng","offroad"],"price":60000},
  "4451": {"name":"Cô gái cầm ly cà phê street style","category":"nu","tags":["nữ","streetwear","cô gái cầm ly cà phê street style"],"price":30000},
}
