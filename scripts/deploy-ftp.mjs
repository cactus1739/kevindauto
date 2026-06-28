// Upload thư mục dist/ lên Hostinger qua FTP.
// Đọc thông tin từ biến môi trường (KHÔNG hardcode mật khẩu):
//   FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_DIR (mặc định /public_html), FTP_SECURE (true/false)
import { Client } from 'basic-ftp'
import { existsSync } from 'node:fs'

const host = process.env.FTP_SERVER
const user = process.env.FTP_USERNAME
const password = process.env.FTP_PASSWORD
const remoteDir = process.env.FTP_DIR || '/public_html'
const secure = process.env.FTP_SECURE === 'true'

if (!host || !user || !password) {
  console.error('Thiếu FTP_SERVER / FTP_USERNAME / FTP_PASSWORD')
  process.exit(1)
}
if (!existsSync('dist')) {
  console.error('Chưa có thư mục dist/. Chạy "npm run build" trước.')
  process.exit(1)
}

const client = new Client(30000)
client.ftp.verbose = false

try {
  console.log(`Kết nối ${host} (secure=${secure})...`)
  await client.access({ host, user, password, secure, secureOptions: { rejectUnauthorized: false } })
  console.log('Đã kết nối. Đang tải dist/ lên', remoteDir, '...')
  await client.ensureDir(remoteDir)
  // Tải toàn bộ nội dung dist/ vào thư mục đích
  await client.uploadFromDir('dist', remoteDir)
  console.log('✅ Deploy xong! Toàn bộ dist/ đã lên', remoteDir)
} catch (err) {
  console.error('❌ Lỗi deploy:', err.message)
  process.exitCode = 1
} finally {
  client.close()
}
