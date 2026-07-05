// Ghi đè từ trang quản trị nội bộ (/admin, chỉ chạy khi npm run dev). Áp dụng SAU CÙNG lên
// toàn bộ `products` (cả staticProducts lẫn importedProducts) nên không cần phân biệt nguồn
// gốc dữ liệu — sửa 1 chỗ, có tác dụng với mọi mã sản phẩm.
import type { Category } from './products'
// (import type — chỉ dùng lúc biên dịch, không tạo vòng lặp import lúc chạy)

export interface AdminOverride {
  name?: string
  category?: Category
  tags?: string[]
}

export const adminOverrides: Record<string, AdminOverride> = {}
