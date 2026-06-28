import { spawnSync, execSync } from 'node:child_process'

function getToken() {
  const res = spawnSync('git', ['credential', 'fill'], { input: 'protocol=https\nhost=github.com\n\n', encoding: 'utf8' })
  return res.stdout.match(/password=(.+)/)[1].trim()
}
function getRepo() {
  const url = execSync('git remote get-url origin', { encoding: 'utf8' }).trim()
  const m = url.match(/github\.com[/:]([^/]+)\/(.+?)(?:\.git)?$/)
  return `${m[1]}/${m[2]}`
}
const token = getToken()
const repo = getRepo()
const headers = { Authorization: `token ${token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'kdt' }
const runId = process.argv[2]

const jr = await fetch(`https://api.github.com/repos/${repo}/actions/runs/${runId}/jobs`, { headers })
const jj = await jr.json()
for (const job of jj.jobs) {
  console.log(`\n# JOB: ${job.name} -> ${job.conclusion}`)
  for (const s of job.steps) console.log(`  - ${s.number}. ${s.name}: ${s.conclusion}`)
  if (job.conclusion === 'failure') {
    const lr = await fetch(`https://api.github.com/repos/${repo}/actions/jobs/${job.id}/logs`, { headers, redirect: 'follow' })
    const txt = await lr.text()
    const lines = txt.split('\n')
    console.log('\n--- LOG (40 dòng cuối) ---')
    console.log(lines.slice(-40).join('\n'))
  }
}
