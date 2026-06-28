# 📸 Hướng dẫn thêm sản phẩm mới (cho KEVIN ĐẦU TO)

Quy trình của bạn rất đơn giản — **chỉ cần làm 2 việc**, phần còn lại để Claude lo:

## Bước 1 — Bỏ ảnh vào thư mục này

Đặt ảnh sản phẩm vào chính thư mục `public/products/` này.

- Định dạng: `.jpg`, `.png` hoặc `.webp` (khuyến nghị `.webp` cho nhẹ).
- Đặt tên file dễ hiểu, **không dấu, không khoảng trắng**. Ví dụ:
  - `rx78-pg.jpg`
  - `goku-ultra.jpg`
  - `ferrari-f40.webp`
- Mỗi sản phẩm 1 ảnh đại diện là đủ (nếu có nhiều ảnh cứ đưa hết, Claude sẽ xử lý).
- Ảnh nền trong suốt hoặc nền tối sẽ đẹp nhất với giao diện.

## Bước 2 — Gửi thông tin cho Claude trong chat

Mở chat và dán thông tin theo mẫu dưới đây (chỉ cần điền những gì bạn có,
thiếu mục nào Claude sẽ hỏi hoặc tự gợi ý):

```
TÊN: RX-78-2 Gundam Perfect Grade
DANH MỤC: Gunpla        (Gunpla / Action Figure / Mô hình Anime / Xe mô hình / Limited Edition)
SERIES: Mobile Suit Gundam
GIÁ: 4290000
GIÁ CŨ (nếu giảm giá): 4990000
TỈ LỆ: 1/60
KÍCH THƯỚC: 30 cm
NHÃN (nếu có): Best Seller   (Mới / Best Seller / Limited / Pre-order / Sale)
CÒN HÀNG: có            (có / đặt trước)
ẢNH: rx78-pg.jpg        (tên file bạn vừa bỏ vào thư mục)
MÔ TẢ: Bản Perfect Grade huyền thoại, khung trong chi tiết, có LED...
ĐIỂM NỔI BẬT:
- Hơn 800 chi tiết
- Khung trong full chuyển động
- Tặng kèm LED
```

> 💡 Bạn có thể gửi **nhiều sản phẩm một lúc** — cứ liệt kê lần lượt.

## Sau đó Claude sẽ tự động:

1. Thêm sản phẩm vào `src/data/products.ts` và gắn đúng ảnh.
2. Chạy build kiểm tra (`npm run build`).
3. Commit và push lên GitHub.
4. Báo bạn deploy (hoặc CI tự deploy nếu đã bật).

---

**Lưu ý:** Nếu chưa có ảnh, cứ gửi thông tin — website sẽ tự hiển thị ảnh nền gradient
đẹp theo tông màu cho tới khi bạn bổ sung ảnh thật.
