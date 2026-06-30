// ============================================================================
//  CẤU HÌNH CHUNG CỦA WEBSITE — CHỈNH SỬA THÔNG TIN LIÊN HỆ Ở ĐÂY
//  (Thay số điện thoại, Zalo, Messenger, địa chỉ thật của cửa hàng)
// ============================================================================

export const site = {
  brand: 'KEVIN ĐẦU TO',
  tagline: 'Mô hình & figure cao cấp chính hãng',
  slogan: 'Sưu tầm chất — Chơi tới bến',

  // --- Liên hệ (THAY BẰNG THÔNG TIN THẬT) ---
  phone: '0909 180 098',
  phoneRaw: '84909180098', // dùng cho link tel: và wa.me (không có số 0 đầu, có mã quốc gia)
  email: 'cactus1739@gmail.com',
  address: '124 Lê Văn Chí, Phường Linh Xuân, TP.HCM',

  // Endpoint nhận báo giá gửi thẳng về shop (tạo đơn trong WooCommerce + email cho chủ)
  quoteApi: 'https://admin.kevindauto.com/wp-json/kdt/v1/quote',

  // --- Mạng xã hội / kênh đặt hàng (THAY BẰNG LINK THẬT) ---
  zalo: 'https://zalo.me/0909180098',
  messenger: 'https://m.me/cactus1739',
  facebook: 'https://facebook.com/cactus1739',
  instagram: 'https://instagram.com/kevindauto',
  tiktok: 'https://tiktok.com/@kevindauto',
  youtube: 'https://youtube.com/@kevindauto',

  // --- Giờ mở cửa ---
  hours: '24/7 — tất cả các ngày',

  // Google Maps embed (thay bằng địa chỉ thật nếu muốn hiển thị bản đồ)
  mapsQuery: '124 Lê Văn Chí, Phường Linh Xuân, TP.HCM',
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
