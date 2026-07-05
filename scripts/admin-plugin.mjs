// Plugin Vite CHỈ chạy khi `npm run dev` (apply: 'serve') — cho phép trang /admin sửa
// tên sản phẩm và ghi thẳng vào file dữ liệu trên máy. Không có trong bản build production
// (kevindauto.com là hosting tĩnh, không có backend để ghi dữ liệu).
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const productsPath = path.join(root, 'src/data/products.ts')
const overridesPath = path.join(root, 'src/data/productNameOverrides.ts')

const GENDER_TAG = {
  nam: 'nam',
  nu: 'nữ',
  caotuoi: 'người già',
  treem: 'trẻ em',
  thethao: 'thể thao',
  dongvat: 'động vật',
  xe: 'xe cộ',
  phukien: 'phụ kiện',
  duongpho: 'đường phố',
  giadinh: 'gia đình',
}

function lowerFirst(name) {
  return name.charAt(0).toLocaleLowerCase('vi') + name.slice(1)
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

function renameStaticProduct(code, newName) {
  let src = fs.readFileSync(productsPath, 'utf8')
  const re = new RegExp("p\\(" + code + ", '([^']*)', '([^']*)', '([^']*)', \\[[^\\]]*\\],\\r?\\n\\s*'([^']*)'\\)")
  const m = src.match(re)
  if (!m) return { ok: false, error: 'Không tìm thấy mã ' + code + ' trong products.ts (dạng có opts riêng, cần sửa tay).' }

  const [full, , category, series] = m
  const lowerName = lowerFirst(newName)
  const gTag = GENDER_TAG[category] || category
  const newTags = JSON.stringify([gTag, series.toLocaleLowerCase('vi'), lowerName]).replace(/"/g, "'")
  const newDescription = `Mô hình ${lowerName} với tạo hình rõ nét, phù hợp trưng bày và dựng diorama.`
  const escapedName = newName.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  const escapedDesc = newDescription.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  const replacement =
    "p(" + code + ", '" + escapedName + "', '" + category + "', '" + series.replace(/'/g, "\\'") + "', " +
    newTags + ",\r\n    '" + escapedDesc + "')"

  src = src.slice(0, m.index) + replacement + src.slice(m.index + full.length)
  fs.writeFileSync(productsPath, src)
  return { ok: true, via: 'static' }
}

function renameImportedProduct(code, newName) {
  let src = fs.readFileSync(overridesPath, 'utf8')
  const escapedName = newName.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  const existingRe = new RegExp('  "' + code + '": \\[[^\\]]*\\],\\r?\\n')

  if (existingRe.test(src)) {
    src = src.replace(existingRe, '  "' + code + '": ["' + escapedName + '"],\r\n')
    fs.writeFileSync(overridesPath, src)
    return { ok: true, via: 'override-update' }
  }

  // Chèn mới theo đúng thứ tự số tăng dần, tìm mã kế tiếp lớn hơn để chèn phía trước.
  const lines = src.split(/\r?\n/)
  const codeNum = Number(code)
  let insertLine = -1
  for (let i = 0; i < lines.length; i++) {
    const km = lines[i].match(/^\s*"(\d+)":/)
    if (km && Number(km[1]) > codeNum) {
      insertLine = i
      break
    }
  }
  const newLine = '  "' + code + '": ["' + escapedName + '"],'
  if (insertLine === -1) {
    // không tìm thấy mã lớn hơn — chèn trước dòng "}" đóng object cuối file
    const closeIdx = lines.map((l, i) => (l.trim() === '}' ? i : -1)).filter((i) => i >= 0).pop()
    lines.splice(closeIdx, 0, newLine)
  } else {
    lines.splice(insertLine, 0, newLine)
  }
  fs.writeFileSync(overridesPath, lines.join('\r\n'))
  return { ok: true, via: 'override-insert' }
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
            const mod = await server.ssrLoadModule('/src/data/products.ts')
            const list = mod.products
              .filter((p) => !q || p.code.includes(q) || p.name.toLowerCase().includes(q))
              .slice(0, 40)
              .map((p) => ({ id: p.id, code: p.code, name: p.name, category: p.category, image: p.image }))
            res.end(JSON.stringify({ ok: true, results: list }))
            return
          }

          if (req.url === '/api/admin/rename' && req.method === 'POST') {
            const body = JSON.parse((await readBody(req)) || '{}')
            const code = String(Number(body.code))
            const newName = String(body.name || '').trim()
            if (!code || !newName) {
              res.statusCode = 400
              res.end(JSON.stringify({ ok: false, error: 'Thiếu mã hoặc tên mới' }))
              return
            }

            const staticSrc = fs.readFileSync(productsPath, 'utf8')
            const isStatic = new RegExp("p\\(" + code + ",").test(staticSrc)
            const result = isStatic ? renameStaticProduct(code, newName) : renameImportedProduct(code, newName)

            server.moduleGraph.invalidateAll()
            res.end(JSON.stringify(result))
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
