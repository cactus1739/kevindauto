# Hướng dẫn tự thêm sản phẩm + làm chủ Bộ lọc & Tìm kiếm

> Dành cho chủ shop tự quản lý trên WooCommerce (admin.kevindauto.com), KHÔNG cần Claude.

---

## ⚠️ ĐỌC TRƯỚC: thêm sản phẩm xong, web KHÔNG đổi ngay lập tức

WooCommerce và web kevindauto.com là **2 hệ thống tách rời** (kiểu "headless"). Sau khi bạn
thêm/sửa sản phẩm trên admin, **web chính cần một bước "xuất bản" mới thấy thay đổi** — đây
không phải lỗi, mà là cách hệ thống được thiết kế (để web tải nhanh, không cần kết nối trực
tiếp tới WooCommerce mỗi lần khách vào xem).

Có 2 cách để thay đổi lên web:

| Cách | Tốc độ | Cần làm gì |
|---|---|---|
| **Tự động** | Tối đa **15 phút** | Không cần làm gì — cứ thêm SP xong, đợi |
| **Lên ngay (~2 phút)** | Ngay lập tức | Vào link dưới đây, bấm nút xanh **"Run workflow"** |

👉 **Bấm để xuất bản ngay:** https://github.com/cactus1739/kevindauto/actions/workflows/deploy.yml
(cần đăng nhập GitHub bằng tài khoản chủ repo) → bấm nút **"Run workflow"** (góc phải, có thể cần
mở dropdown trước) → bấm tiếp **"Run workflow"** màu xanh lá để xác nhận. Web sẽ cập nhật sau ~2 phút.

---

## PHẦN 1 — Up sản phẩm HÀNG LOẠT bằng file CSV (Excel)

WooCommerce có sẵn công cụ nhập hàng loạt. Cách làm:

### Bước 1: Chuẩn bị ảnh (cho ảnh thành URL công khai)
CSV cần **đường link ảnh**, nên ảnh phải nằm ở nơi truy cập được. 2 cách:
- **Cách A (khuyên dùng):** vào WooCommerce → **Thư viện (Media)** → kéo-thả nhiều ảnh lên cùng lúc.
  Bấm vào từng ảnh để copy **"Đường dẫn tập tin" (URL)**.
- **Cách B:** dùng ảnh đã có sẵn trên web chính: `https://kevindauto.com/products/sp-<mã>.webp`

### Bước 2: Tạo file Excel với các cột sau (lưu dạng .csv UTF-8)

| Cột (tiêu đề) | Ý nghĩa | Ví dụ |
|---|---|---|
| `Name` | Tên sản phẩm | Chàng trai hút thuốc |
| `SKU` | Mã (duy nhất) | 4500 |
| `Regular price` | Giá (số, không dấu chấm) | 30000 |
| `Categories` | Danh mục | Nam giới |
| `Tags` | Thẻ, cách nhau bằng dấu phẩy | nam, streetwear, hút thuốc |
| `Short description` | Mô tả ngắn | Chàng trai ngồi hút thuốc, chất chơi. |
| `Description` | Mô tả đầy đủ | ... |
| `Images` | URL ảnh (1 hoặc nhiều, cách nhau dấu phẩy) | https://kevindauto.com/products/sp-4500.webp |
| `Published` | 1 = hiện, 0 = nháp | 1 |
| `In stock?` | 1 = còn hàng | 1 |

### Bước 3: Nhập vào WooCommerce
1. **Sản phẩm → Tất cả sản phẩm → nút "Nhập vào" (Import)** (trên cùng).
2. Chọn file CSV → **Tiếp tục**.
3. WooCommerce tự ánh xạ cột (kiểm tra cột Images, Tags đúng) → **Chạy trình nhập**.
4. Xong! Ảnh sẽ được tự tải về, sản phẩm hiện trên web sau khi đồng bộ + deploy (xem [BACKEND-WORDPRESS.md](BACKEND-WORDPRESS.md)).

> 💡 Mẹo: muốn sửa hàng loạt sản phẩm đã có → dùng **"Xuất ra" (Export)** ra CSV, sửa trong Excel, rồi **Nhập vào** lại (trùng SKU sẽ cập nhật).

---

## PHẦN 2 — Làm sao biết sản phẩm vào BỘ LỌC nào & TÌM bằng từ khoá nào?

Web có **2 hệ thống khác nhau**, cả hai đều dựa vào **THẺ (tags) + tên + chủ đề**:

### A. Ô TÌM KIẾM (search)
- Khớp với: **Tên + Chủ đề (series) + Thẻ + Danh mục + Mã**. (KHÔNG khớp phần Mô tả.)
- CỘNG **từ điển đồng nghĩa** (cài trong code, áp dụng tự động):
  - Tiếng Việt lóng: "ngầu"→streetwear/cá tính, "sếp"→công sở, "cute"→dễ thương, "đám cưới"→cô dâu...
  - **Tiếng Anh:** smoking→hút thuốc, wedding→cô dâu, businessman→vest, basketball→bóng rổ, dinosaur→khủng long...
- 👉 Vì vậy "ngầu" tìm ra dù không sản phẩm nào gắn thẻ "ngầu" — nó được hiểu là streetwear/cá tính.
- **Muốn thêm từ đồng nghĩa mới (VN hoặc EN) → nhờ Claude thêm vào code** (file `src/data/facets.ts`). Bạn không sửa được phần này từ admin.

### B. BỘ LỌC (Phong cách / Tư thế / Chủ đề / Màu / Kèm theo)
- Mỗi bộ lọc có một **danh sách từ khoá định sẵn**. Sản phẩm vào bộ lọc nếu Tên/Chủ đề/Thẻ/**Mô tả** chứa MỘT trong các từ đó.
- 👉 Muốn sản phẩm vào đúng bộ lọc → **gắn thẻ bằng đúng "từ khoá phép thuật"** dưới đây:

#### BẢNG TỪ KHOÁ ĐỂ GẮN THẺ (gắn từ nào → vào lọc đó + tìm được)

**PHONG CÁCH**
- Công sở / Vest → `công sở, vest, suit, doanh nhân, thuyết trình`
- Streetwear → `streetwear, denim, jean, hoodie, cá tính`
- Áo khoác → `áo khoác, parka, măng tô, trench, choàng`
- Váy & Đầm → `váy, đầm, dạ hội`
- Cô dâu / Cưới → `cô dâu, cưới, voan`
- Gợi cảm → `gợi cảm, bikini, nội y`
- Đồ thể thao → `thể thao, bóng đá, bóng rổ, jersey, vận động`

**TƯ THẾ**
- Ngồi → `ngồi`
- Đi / Di chuyển → `đi bộ, dạo bước, phượt, sải bước`
- Năng động → `năng động, ăn mừng, dẫn bóng, tung`
- Thư giãn / Thiền → `thiền, nghỉ, thư giãn, tĩnh lặng`

**CHỦ ĐỀ**
- Du lịch / Phượt → `du lịch, phượt, ba lô`
- Nghề nghiệp → `shipper, giao hàng, đầu bếp, thợ, doanh nhân, nghề nghiệp`
- Học đường → `học sinh, sinh viên, gile`
- Anime / Cosplay → `anime, kiếm, katana, sát thủ`
- Nghệ thuật → `tượng, nghệ thuật, điêu khắc, thiên thần, cổ điển`
- Dễ thương → `chibi, dễ thương, gấu, teddy, kumamon, khủng long`

**MÀU CHỦ ĐẠO**
- Đỏ→`đỏ` · Đen→`đen` · Trắng→`trắng` · Xanh→`xanh` · Vàng/Đồng→`vàng, gold, đồng, vương miện`

**KÈM THEO**
- Điện thoại→`điện thoại` · Máy ảnh→`máy ảnh, nhiếp ảnh` · Ba lô→`ba lô`
- Đồ uống→`ly nước, trà sữa, ly` · Vũ khí→`kiếm, katana` · Hoa→`hoa`

### Quy tắc vàng khi thêm/sửa sản phẩm
1. **Gắn thẻ thật đầy đủ** bằng các từ khoá ở bảng trên → tự động vào đúng bộ lọc + tìm được.
2. Thêm cả từ khoá khách hay gõ (kể cả mô tả đặc điểm: "hút thuốc", "kính", "tattoo"...).
3. Muốn thêm bộ lọc mới hoặc từ đồng nghĩa mới → nhờ Claude (sửa code).
