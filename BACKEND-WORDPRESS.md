# Backend headless cho kevindauto.com (WordPress + WooCommerce)

Mục tiêu: có **trang quản trị** để tự thêm/sửa/xoá sản phẩm mà **không đụng tới code**, trong khi
**giao diện React giữ nguyên 100%**. Web React chỉ "đọc" sản phẩm từ WooCommerce qua REST API.

> Toàn bộ việc này làm trên nhánh git `feature/woocommerce-backend`. Web thật (`main`) không đổi
> cho tới khi chốt. Không thích → bỏ nhánh, web thật chưa từng bị động vào.

---

## Bước 1 — Tạo subdomain + cài WordPress (làm trong hPanel Hostinger)

1. hPanel → **Tên miền** (hoặc **Trang web**) → **Tên miền phụ / Subdomains**.
2. Tạo subdomain: gõ `admin` → thành **`admin.kevindauto.com`**.
3. Vào **Tự động cài đặt / Auto Installer** → chọn **WordPress** → cài vào `admin.kevindauto.com`.
4. Đặt **user + mật khẩu admin WordPress** (tự lưu lại).

## Bước 2 — Cài & cấu hình WooCommerce

1. Đăng nhập `admin.kevindauto.com/wp-admin`.
2. **Gói giao diện (Plugins) → Cài mới → "WooCommerce" → Kích hoạt.**
3. Chạy trình thiết lập nhanh (địa chỉ, tiền tệ **VND**). Bỏ qua phần thanh toán nếu chỉ làm catalog.
4. (Tuỳ chọn) Vì web React tự hiển thị, có thể tắt giỏ hàng/thanh toán sau.

## Bước 3 — Tạo khoá REST API (để script và web React kết nối)

1. WooCommerce → **Cài đặt → Nâng cao → REST API → Thêm khoá**.
2. Quyền: **Đọc/Ghi (Read/Write)**. Bấm tạo.
3. Copy **Consumer key** (`ck_...`) và **Consumer secret** (`cs_...`).
4. Ở máy: sao chép `.env.example` → `.env`, điền:
   ```
   WOO_URL=https://admin.kevindauto.com
   WOO_KEY=ck_xxxxxxxx
   WOO_SECRET=cs_xxxxxxxx
   ```

## Bước 4 — Import toàn bộ sản phẩm hiện có

```bash
npx -y tsx scripts/woo-import.ts --dry   # xem trước, không gửi gì
npx -y tsx scripts/woo-import.ts         # import thật (chạy lại được, không tạo trùng)
```

Ảnh sản phẩm được WooCommerce **tự kéo về** từ `https://kevindauto.com/products/sp-<mã>.webp`
(các trường riêng như series, chất liệu, badge, accent, highlights lưu trong "meta" của sản phẩm).

## Bước 5 — Web React đọc từ WooCommerce ✅ (đã làm)

Cơ chế **"đồng bộ lúc build"** — giữ nguyên 13 file dùng dữ liệu, không sửa giao diện:

- `src/data/products.generated.ts` — dữ liệu kéo từ WooCommerce (tự sinh).
- `src/data/products.ts` — có **công tắc**: nếu file generated có dữ liệu thì dùng,
  không thì quay về dữ liệu tĩnh viết tay (bản dự phòng). → luôn đảo ngược được.

**Quy trình xuất bản (sau khi sửa sản phẩm trên trang admin):**
```bash
npm run woo:sync     # kéo sản phẩm mới nhất từ WooCommerce -> products.generated.ts
npm run build        # dựng lại web
npm run deploy       # đẩy lên kevindauto.com (hoặc push để GitHub Actions tự deploy)
```

> ⚠️ Web KHÔNG cập nhật tức thì khi sửa admin — cần chạy `woo:sync` + deploy.
> Có thể tự động hoá: cho GitHub Actions chạy `woo:sync` trước khi build (đặt
> WOO_URL/WOO_KEY/WOO_SECRET vào GitHub Secrets), kích hoạt bằng lịch/nút bấm/webhook.

**Quay lại nguồn tĩnh bất cứ lúc nào:** để `generatedProducts = []` trong
`products.generated.ts` (hoặc xoá file), web tự dùng lại dữ liệu trong `products.ts`.

## Bước 6 — Xem thử & quyết định

Chạy `npm run dev`, kiểm tra web hiển thị đúng từ WooCommerce. Ưng → gộp nhánh vào `main`.
Không ưng → `git checkout main` là web trở lại y như cũ.

---

## Thêm batch sản phẩm mới về sau (giữ quy trình cắt ảnh như cũ)

1. Cắt ảnh lưới như trước: `node scripts/slice.mjs ...` → ra `public/products/sp-<mã>.webp`.
2. Deploy ảnh lên kevindauto.com như thường (ảnh thành công khai).
3. Thêm sản phẩm: nhập tay trên WooCommerce, **hoặc** dùng lại `woo-import.ts` cho cả batch.
