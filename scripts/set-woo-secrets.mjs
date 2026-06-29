// Đẩy WOO_URL / WOO_KEY / WOO_SECRET lên GitHub Actions secrets (đọc từ .env).
// Dùng token GitHub đã lưu trên máy (git credential). Repo lấy từ remote origin.
//   node scripts/set-woo-secrets.mjs
import { spawnSync, execSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import _sodium from 'libsodium-wrappers'

// Nạp .env
if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

function getToken() {
  const res = spawnSync('git', ['credential', 'fill'], {
    input: 'protocol=https\nhost=github.com\n\n',
    encoding: 'utf8',
  })
  if (res.status !== 0) throw new Error('git credential fill lỗi: ' + res.stderr)
  const m = res.stdout.match(/password=(.+)/)
  if (!m) throw new Error('Không lấy được token từ git credential (chưa đăng nhập GitHub?)')
  return m[1].trim()
}

function getRepo() {
  const url = execSync('git remote get-url origin', { encoding: 'utf8' }).trim()
  const m = url.match(/github\.com[/:]([^/]+)\/(.+?)(?:\.git)?$/)
  if (!m) throw new Error('Không phân tích được repo từ remote: ' + url)
  return `${m[1]}/${m[2]}`
}

const secrets = {
  WOO_URL: process.env.WOO_URL,
  WOO_KEY: process.env.WOO_KEY,
  WOO_SECRET: process.env.WOO_SECRET,
}
for (const [k, v] of Object.entries(secrets)) {
  if (!v) { console.error('Thiếu env', k, '(điền trong .env)'); process.exit(1) }
}

const token = getToken()
const repo = getRepo()
const api = `https://api.github.com/repos/${repo}`
const headers = {
  Authorization: `token ${token}`,
  Accept: 'application/vnd.github+json',
  'User-Agent': 'kevindauto-deploy',
  'X-GitHub-Api-Version': '2022-11-28',
}
console.log('Repo:', repo)

const pkRes = await fetch(`${api}/actions/secrets/public-key`, { headers })
if (!pkRes.ok) { console.error('❌ Không lấy được public key:', pkRes.status, await pkRes.text()); process.exit(1) }
const { key, key_id } = await pkRes.json()

await _sodium.ready
const sodium = _sodium
function encrypt(secretValue) {
  const binkey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL)
  const binsec = sodium.from_string(secretValue)
  return sodium.to_base64(sodium.crypto_box_seal(binsec, binkey), sodium.base64_variants.ORIGINAL)
}

for (const [name, value] of Object.entries(secrets)) {
  const r = await fetch(`${api}/actions/secrets/${name}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ encrypted_value: encrypt(value), key_id }),
  })
  if (r.status === 201 || r.status === 204) {
    console.log(`✅ ${name}: ${r.status === 201 ? 'đã tạo' : 'đã cập nhật'}`)
  } else {
    console.error(`❌ ${name}: lỗi ${r.status}`, await r.text())
    process.exitCode = 1
  }
}
