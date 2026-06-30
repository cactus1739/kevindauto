// Liệt kê cây thư mục FTP để tìm chỗ cài WordPress (wp-config.php / wp-content/mu-plugins).
// Chạy trên GitHub Actions (có sẵn FTP secrets). Đọc env: FTP_SERVER/USERNAME/PASSWORD.
import { Client } from 'basic-ftp'

const host = process.env.FTP_SERVER
const user = process.env.FTP_USERNAME
const password = process.env.FTP_PASSWORD
const c = new Client(30000)
c.ftp.verbose = false

async function walk(dir, depth) {
  if (depth > 3) return
  let list
  try { list = await c.list(dir) } catch { return }
  const names = list.map((f) => f.name)
  if (names.includes('wp-config.php')) console.log('>>> WP ROOT:', dir)
  if (names.includes('wp-content')) console.log('>>> wp-content:', dir + '/wp-content/mu-plugins')
  for (const f of list) {
    if (f.isDirectory && !f.name.startsWith('.')) await walk(dir + '/' + f.name, depth + 1)
  }
}

try {
  await c.access({ host, user, password, secure: true, secureOptions: { rejectUnauthorized: false } })
  for (const root of ['/', '/public_html', '/domains']) {
    console.log('\n===== Liệt kê', root, '=====')
    try {
      const l = await c.list(root)
      console.log(l.map((f) => (f.isDirectory ? '[D] ' : '    ') + f.name).join('\n'))
    } catch (e) { console.log('  (không liệt kê được:', e.message, ')') }
  }
  console.log('\n===== Dò tìm WordPress (sâu tối đa 3 cấp dưới /public_html và /domains) =====')
  await walk('/public_html', 0)
  await walk('/domains', 0)
} catch (e) {
  console.error('LỖI FTP:', e.message)
  process.exitCode = 1
} finally {
  c.close()
}
