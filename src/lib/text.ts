// Chuẩn hoá chuỗi tiếng Việt: bỏ dấu, đưa về chữ thường, đổi đ -> d.
// Giúp search không phân biệt dấu / hoa thường ("ao do" khớp "áo đỏ").
export function normalizeVi(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đ]/g, 'd') // đ -> d
    .replace(/\s+/g, ' ')
    .trim()
}
