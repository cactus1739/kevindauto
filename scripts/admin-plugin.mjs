// Plugin Vite CHỈ chạy khi `npm run dev` (apply: 'serve') — cho phép trang /admin sửa
// tên/danh mục/tag sản phẩm và ghi thẳng vào src/data/adminOverrides.ts trên máy. Không có
// trong bản build production (kevindauto.com là hosting tĩnh, không có backend để ghi dữ liệu).
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const overridesPath = path.join(root, 'src/data/adminOverrides.ts')

// Cache-bust để ssrLoadModule luôn đọc lại nội dung mới nhất trên đĩa, thay vì gọi
// server.moduleGraph.invalidateAll() — cách đó lan HMR/reload lên cả trang /admin đang mở,
// làm mất trạng thái form đang sửa dở.
function freshProductsUrl() {
  return '/src/data/products.ts?t=' + Date.now()
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

function saveOverride(code, override) {
  let src = fs.readFileSync(overridesPath, 'utf8')
  const value = JSON.stringify(override)
  const existingRe = new RegExp('  "' + code + '": \\{[\\s\\S]*?\\},\\r?\\n')

  if (existingRe.test(src)) {
    src = src.replace(existingRe, '  "' + code + '": ' + value + ',\r\n')
    fs.writeFileSync(overridesPath, src)
    return
  }

  // Object rỗng viết gọn trên 1 dòng "= {}" — mở rộng ra nhiều dòng trước khi chèn.
  src = src.replace(
    /export const adminOverrides: Record<string, AdminOverride> = \{\}\r?\n?/,
    'export const adminOverrides: Record<string, AdminOverride> = {\r\n}\r\n',
  )

  const lines = src.split(/\r?\n/)
  const objectStart = lines.findIndex((l) => l.includes('export const adminOverrides'))
  const objectEnd = lines.findIndex((l, i) => i > objectStart && l.trim() === '}')
  const codeNum = Number(code)
  let insertLine = -1
  for (let i = objectStart + 1; i < objectEnd; i++) {
    const km = lines[i].match(/^\s*"(\d+)":/)
    if (km && Number(km[1]) > codeNum) {
      insertLine = i
      break
    }
  }
  const newLine = '  "' + code + '": ' + value + ','
  lines.splice(insertLine === -1 ? objectEnd : insertLine, 0, newLine)
  fs.writeFileSync(overridesPath, lines.join('\r\n'))
}

export default function adminPlugin() {
  return {
    name: 'kevindauto-admin',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/admin/')) return next()
        res.setHeader('Content-Type', 'application/json; charset=utf-8')

        try {
          if (req.url.startsWith('/api/admin/search') && req.method === 'GET') {
            const url = new URL(req.url, 'http://localhost')
            const q = (url.searchParams.get('q') || '').trim().toLowerCase()
            const from = url.searchParams.get('from')
            const to = url.searchParams.get('to')
            const mod = await server.ssrLoadModule(freshProductsUrl())

            let list = mod.products
            if (from !== null && to !== null) {
              const lo = Number(from)
              const hi = Number(to)
              list = list
                .filter((p) => Number(p.code) >= lo && Number(p.code) <= hi)
                .sort((a, b) => Number(a.code) - Number(b.code))
            } else {
              list = list.filter((p) => !q || p.code.includes(q) || p.name.toLowerCase().includes(q)).slice(0, 100)
            }

            const results = list.map((p) => ({
              id: p.id,
              code: p.code,
              name: p.name,
              category: p.category,
              tags: p.tags,
              price: p.price,
              image: p.image,
            }))
            res.end(JSON.stringify({ ok: true, results }))
            return
          }

          if (req.url === '/api/admin/categories' && req.method === 'GET') {
            const mod = await server.ssrLoadModule(freshProductsUrl())
            res.end(JSON.stringify({ ok: true, categories: mod.categories }))
            return
          }

          if (req.url === '/api/admin/save' && req.method === 'POST') {
            const body = JSON.parse((await readBody(req)) || '{}')
            const code = String(Number(body.code))
            const name = String(body.name || '').trim()
            const category = String(body.category || '').trim()
            const tags = Array.isArray(body.tags) ? body.tags.map((t) => String(t).trim()).filter(Boolean) : []
            const price = Number(body.price)

            if (!code || !name || !category || !Number.isFinite(price) || price <= 0) {
              res.statusCode = 400
              res.end(JSON.stringify({ ok: false, error: 'Thiếu mã, tên, danh mục hoặc giá không hợp lệ' }))
              return
            }

            saveOverride(code, { name, category, tags, price })
            // adminOverrides.ts bị bỏ qua khỏi watcher (xem vite.config.ts) nên Vite không tự
            // biết file vừa đổi — chỉ báo lại riêng module này để lần đọc kế tiếp lấy dữ liệu
            // mới, KHÔNG dùng invalidateAll() vì nó lan HMR/reload lên cả trang đang mở.
            const overrideMod = await server.moduleGraph.getModuleByUrl('/src/data/adminOverrides.ts')
            if (overrideMod) server.moduleGraph.invalidateModule(overrideMod)
            res.end(JSON.stringify({ ok: true }))
            return
          }

          next()
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ ok: false, error: String(err?.message || err) }))
        }
      })
    },
  }
}
