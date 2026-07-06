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
  "285": {"name":"Túi xách trưng bày","category":"phukien","tags":["phukien","phụ kiện diorama","túi xách trưng bày","285"],"price":30000},
  "300": {"name":"Nữ quần jean áo cổ cao","category":"nu","tags":["nữ","Jean","đứng"],"price":30000},
  "301": {"name":"Nữ tennis","category":"thethao","tags":["nữ","váy ôm","tạo dáng","thời trang","tennis","thể thao"],"price":30000},
  "302": {"name":"Nữ vest thời trang đeo kính","category":"nu","tags":["nữ","glasses","vest","kính"],"price":30000},
  "304": {"name":"Nữ vest công sở điện thoại","category":"nu","tags":["nữ","công sở","điện thoại","vest","túi xách"],"price":30000},
  "305": {"name":"Nữ quần jean sơ mi","category":"nu","tags":["nữ","jean"],"price":30000},
  "306": {"name":"Nữ áo khoác lông","category":"nu","tags":["nữ","áo khoác dài","thời trang","lông","mắt kính"],"price":30000},
  "1527": {"name":"Robot Buzz - Toy story","category":"movie","tags":["robot","phi hành","đồ chơi","toy","story","buzz"],"price":30000},
  "4405": {"name":"Nam bóng rổ đứng nghỉ","category":"thethao","tags":["thể thao","sport","nam","bóng rổ","basketball"],"price":30000},
  "4406": {"name":"Nam trọc đầu uống Coca","category":"nam","tags":["nam","đời thường","trọc","uống","coca","gangster","gang","ngồi"],"price":30000},
  "4407": {"name":"Cặp đôi yêu nhau","category":"giadinh","tags":["cặp đôi","tình yêu","couple","đi dạo","hạnh phúc"],"price":30000},
  "4408": {"name":"Nam cầm điếu cày","category":"nam","tags":["nam","đời thường","điếu cày","giang hồ","ngổ ngáo","đánh nhau"],"price":30000},
  "4409": {"name":"Nam máy ảnh ba lô du lịch","category":"nam","tags":["nam","du lịch","máy ảnh","ba lô","bước đi","walk","hat"],"price":30000},
  "4410": {"name":"Nữ đẹp cầm vô lăng","category":"nu","tags":["nữ","cá tính","nữ đẹp","gái đẹp","chân dài","vô lăng","tóc dài","beautiful"],"price":30000},
  "4411": {"name":"Nữ sexy sơ mi mỏng","category":"nu","tags":["nữ","gợi cảm","sexy","sơ mi","chân dài"],"price":30000},
  "4412": {"name":"Nữ vest bước đi","category":"nu","tags":["nữ","thanh lịch","vest","bodysuit","đồ bó sát","jacket","tóc ngắt"],"price":30000},
  "4413": {"name":"Bác Nguyễn Phú Trọng","category":"caotuoi","tags":["người già","người cao tuổi","bác Nguyễn Phú Trọng","vest","chính trị","chính khách","yêu nước","việt nam"],"price":30000},
  "4414": {"name":"Họa sĩ Nhật Bản","category":"caotuoi","tags":["người già","nghề nghiệp","họa sĩ","Nhật Bản","Anime","comic","tóc bạc","mắt kính","tạp dề"],"price":30000},
  "4415": {"name":"Nam vest túi xách điện thoại","category":"caotuoi","tags":["người già","người cao tuổi","vest","túi xách","điện thoại"],"price":30000},
  "4416": {"name":"Chú xe ôm ngồi chờ","category":"caotuoi","tags":["nam","đường phố","đời thường","xe ôm","ngồi","nghèo","khổ","nghỉ ngơi"],"price":30000},
  "4417": {"name":"Walter White  - Breaking Bad","category":"movie","tags":["Nam","đàn ông","phim","hóa học","Heisengerg","Bryan","Cranston"],"price":30000},
  "4418": {"name":"Đại gia Ả Rập","category":"nam","tags":["nam","độc đáo","đại gia","Ả Rập","gậy","giàu có","khoác lông"],"price":30000},
  "4419": {"name":"Cướp ngân hàng Money Heist","category":"movie","tags":["nam","ấn tượng","cướp","tội phạm","mặt nạ","phim"],"price":30000},
  "4420": {"name":"Họa sĩ Nhật cầm gấu","category":"caotuoi","tags":["người già","nghề nghiệp","họa sĩ Nhật"],"price":30000},
  "4449": {"name":"Thuyền camel động cơ","category":"phukien","tags":["phụ kiện","phụ kiện","thuyền cam động cơ","camel","xuồng","offroad"],"price":60000},
  "4451": {"name":"Cô gái cầm ly cà phê street style","category":"nu","tags":["nữ","streetwear","cô gái cầm ly cà phê street style"],"price":30000},
}
