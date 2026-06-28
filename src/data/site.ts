// ============================================================================
//  CẤU HÌNH CHUNG CỦA WEBSITE — CHỈNH SỬA THÔNG TIN LIÊN HỆ Ở ĐÂY
//  (Thay số điện thoại, Zalo, Messenger, địa chỉ thật của cửa hàng)
// ============================================================================

export const site = {
  brand: 'KEVIN ĐẦU TO',
  tagline: 'Mô hình & figure cao cấp chính hãng',
  slogan: 'Sưu tầm chất — Chơi tới bến',

  // --- Liên hệ (THAY BẰNG THÔNG TIN THẬT) ---
  phone: '0900 000 000',
  phoneRaw: '84900000000', // dùng cho link tel: và wa.me (không có số 0 đầu, có mã quốc gia)
  email: 'kevindauto.shop@gmail.com',
  address: '123 Đường Mô Hình, Quận 1, TP. Hồ Chí Minh',

  // --- Mạng xã hội / kênh đặt hàng (THAY BẰNG LINK THẬT) ---
  zalo: 'https://zalo.me/0900000000',
  messenger: 'https://m.me/kevindauto',
  facebook: 'https://facebook.com/kevindauto',
  instagram: 'https://instagram.com/kevindauto',
  tiktok: 'https://tiktok.com/@kevindauto',
  youtube: 'https://youtube.com/@kevindauto',

  // --- Giờ mở cửa ---
  hours: '09:00 – 21:00 (T2 – CN)',

  // Google Maps embed (thay bằng địa chỉ thật nếu muốn hiển thị bản đồ)
  mapsQuery: 'mô hình đồ chơi quận 1 hồ chí minh',
} as const

/** Tạo link đặt hàng nhanh qua Zalo kèm tên sản phẩm */
export function orderZaloLink(productName?: string) {
  if (!productName) return site.zalo
  return site.zalo
}

/** Tạo link nhắn Messenger */
export function orderMessengerLink() {
  return site.messenger
}

/** Định dạng giá tiền VND */
export function formatVND(value: number) {
  return value.toLocaleString('vi-VN') + '₫'
}
