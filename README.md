# KEVIN ĐẦU TO — Website Mô Hình Đồ Chơi Cao Cấp

Website thương hiệu cho cửa hàng mô hình & figure cao cấp **KEVIN ĐẦU TO**.
Trưng bày sản phẩm (Gunpla, action figure, mô hình anime, xe die-cast, limited edition) +
đặt hàng nhanh qua **Zalo / Messenger / Hotline**.

Xây dựng bằng **Vite + React + TypeScript + Tailwind CSS + Framer Motion**, build ra **web tĩnh**
chạy được trên **mọi gói Hostinger** (kể cả Shared Hosting rẻ nhất).

---

## 🚀 Tính năng chính

- 🎨 Giao diện năng động, đậm chất chơi, dark mode cao cấp (hồng điện · cyan · gold)
- 🧩 Danh mục sản phẩm có **lọc theo dòng**, **tìm kiếm**, **sắp xếp giá / đánh giá**
- 🔍 **Modal xem nhanh** chi tiết sản phẩm + đặt hàng 1 chạm qua Zalo/Messenger
- ✨ Hiệu ứng cuộn mượt (Framer Motion), tôn trọng `prefers-reduced-motion`
- 📱 Responsive mobile-first, không tràn ngang, menu mobile, nút liên hệ nổi
- ♿ Chuẩn truy cập: skip link, focus ring, aria-label, tương phản tốt
- ⚡ Tối ưu tốc độ: lazy-load ảnh, font swap, gzip + cache qua `.htaccess`

---

## 🛠️ Chạy ở máy (local)

> Yêu cầu: **Node.js 18+** (khuyến nghị 20/22 LTS). Kiểm tra: `node -v`

```bash
npm install      # cài thư viện
npm run dev      # chạy server phát triển → http://localhost:5173
npm run build    # build production ra thư mục dist/
npm run preview  # xem thử bản build production
```

---

## ✏️ Chỉnh sửa nội dung

| Muốn sửa gì | File |
|---|---|
| Số điện thoại, Zalo, Messenger, Facebook, địa chỉ, email | `src/data/site.ts` |
| Danh sách sản phẩm, giá, mô tả, ảnh | `src/data/products.ts` |
| Màu sắc, font, hiệu ứng | `tailwind.config.js` |
| Tiêu đề/SEO trang | `index.html` |

### Thêm ảnh sản phẩm thật
1. Đặt ảnh vào thư mục `public/products/` (vd: `public/products/rx78.jpg`).
2. Trong `src/data/products.ts`, điền field `image` của sản phẩm: `image: './products/rx78.jpg'`.
3. Nếu để trống `image`, web tự render ảnh nền gradient đẹp theo tông màu sản phẩm.

> ⚠️ Nhớ thay các thông tin liên hệ **placeholder** trong `src/data/site.ts`
> (số điện thoại `0900 000 000`, link Zalo/Messenger...) bằng thông tin **thật** của shop.

---

## 📦 Đẩy mã nguồn lên GitHub

```bash
git init
git add .
git commit -m "Khởi tạo website KEVIN ĐẦU TO"
git branch -M main
# Tạo repo trống trên github.com rồi thay URL bên dưới:
git remote add origin https://github.com/<tai-khoan>/kevin-dau-to.git
git push -u origin main
```

---

## 🌐 Deploy lên Hostinger

### Cách 1 — Upload thủ công (đơn giản, hợp Shared Hosting)

1. Chạy `npm run build` → tạo ra thư mục **`dist/`**.
2. Đăng nhập **hPanel** của Hostinger → **File Manager** (hoặc dùng FTP/FileZilla).
3. Vào thư mục **`public_html`** của tên miền.
4. **Upload toàn bộ nội dung BÊN TRONG `dist/`** vào `public_html`
   (bao gồm `index.html`, thư mục `assets/`, `favicon.svg`, `.htaccess`, `robots.txt`...).
   > Lưu ý: copy *nội dung bên trong* `dist`, **không** copy cả thư mục `dist`.
5. File `.htaccess` đã có sẵn (nén gzip + cache + bảo mật). Nếu File Manager ẩn file bắt đầu bằng dấu chấm, bật **Show hidden files**.
6. Vào Hostinger bật **SSL miễn phí** cho tên miền, sau đó mở `.htaccess` bỏ comment khối "Ép HTTPS" nếu muốn tự chuyển sang https.

### Cách 2 — Tự động deploy bằng GitHub Actions (FTP)

Repo đã có sẵn workflow `.github/workflows/deploy.yml`: mỗi lần `git push` lên nhánh `main`,
GitHub sẽ tự build và upload thư mục `dist/` lên Hostinger qua FTP.

**Cấu hình một lần** trong GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Giá trị (lấy trong hPanel → Files → FTP Accounts) |
|---|---|
| `FTP_SERVER` | Host FTP, vd: `ftp.tenmien.com` hoặc IP máy chủ |
| `FTP_USERNAME` | Tên đăng nhập FTP |
| `FTP_PASSWORD` | Mật khẩu FTP |

> Mặc định workflow upload vào thư mục `/public_html/`. Nếu tên miền của bạn nằm ở
> thư mục khác (vd addon domain), sửa `server-dir` trong file `deploy.yml`.

Sau khi thêm secrets, chỉ cần:

```bash
git push        # → tự động build & deploy
```

---

## 📁 Cấu trúc thư mục

```
.
├── public/              # asset tĩnh (favicon, .htaccess, robots.txt, products/)
├── src/
│   ├── components/      # các thành phần giao diện
│   ├── context/         # state chung (modal sản phẩm)
│   ├── data/            # site.ts (liên hệ) + products.ts (sản phẩm)
│   ├── App.tsx          # ghép các section
│   ├── main.tsx         # điểm khởi động React
│   └── index.css        # Tailwind + design system
├── index.html
├── tailwind.config.js   # màu, font, hiệu ứng
├── vite.config.ts
└── .github/workflows/deploy.yml   # CI/CD lên Hostinger
```

---

## 📝 Ghi chú

- Đây là website **tĩnh** (không cần Node.js chạy trên server) → tương thích mọi gói Hostinger.
- Giỏ hàng/thanh toán online **không** có theo yêu cầu — khách đặt qua Zalo/Messenger/Hotline.
- Muốn nâng cấp lên bán hàng đầy đủ (giỏ hàng, thanh toán) sau này: cân nhắc dùng VPS Hostinger + Next.js.

© KEVIN ĐẦU TO
