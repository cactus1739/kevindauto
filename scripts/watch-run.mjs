// Theo dõi lần chạy GitHub Actions mới nhất cho tới khi xong.
import { spawnSync, execSync } from 'node:child_process'

function getToken() {
  const res = spawnSync('git', ['credential', 'fill'], {
    input: 'protocol=https\nhost=github.com\n\n',
    encoding: 'utf8',
  })
  const m = res.stdout.match(/password=(.+)/)
  if (!m) throw new Error('Không lấy được token')
  return m[1].trim()
}
function getRepo() {
  const url = execSync('git remote get-url origin', { encoding: 'utf8' }).trim()
  const m = url.match(/github\.com[/:]([^/]+)\/(.+?)(?:\.git)?$/)
  return `${m[1]}/${m[2]}`
}

const token = getToken()
const repo = getRepo()
const headers = {
  Authorization: `token ${token}`,
  Accept: 'application/vnd.github+json',
  'User-Agent': 'kevindauto-deploy',
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let runId = null
for (let i = 0; i < 10 && !runId; i++) {
  const r = await fetch(`https://api.github.com/repos/${repo}/actions/runs?per_page=1`, { headers })
  const j = await r.json()
  if (j.workflow_runs && j.workflow_runs.length) runId = j.workflow_runs[0].id
  else await sleep(3000)
}
if (!runId) {
  console.error('Chưa thấy lần chạy nào.')
  process.exit(1)
}
console.log('Run ID:', runId, '| Xem:', `https://github.com/${repo}/actions/runs/${runId}`)

for (let i = 0; i < 80; i++) {
  const r = await fetch(`https://api.github.com/repos/${repo}/actions/runs/${runId}`, { headers })
  const j = await r.json()
  console.log(`[${new Date().toLocaleTimeString('vi-VN')}] status=${j.status} conclusion=${j.conclusion ?? '...'}`)
  if (j.status === 'completed') {
    console.log(j.conclusion === 'success' ? '✅ DEPLOY THÀNH CÔNG' : `❌ THẤT BẠI: ${j.conclusion}`)
    process.exit(j.conclusion === 'success' ? 0 : 2)
  }
  await sleep(7000)
}
console.log('Hết thời gian theo dõi — kiểm tra trên GitHub.')
