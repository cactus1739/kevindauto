const VISITOR_ID_KEY = 'kevindauto_visitor_id'

export interface VisitorCount {
  total: number
}

function visitorId() {
  const existing = window.localStorage.getItem(VISITOR_ID_KEY)
  if (existing) return existing

  const value =
    typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`

  window.localStorage.setItem(VISITOR_ID_KEY, value)
  return value
}

function deviceType() {
  const width = window.innerWidth
  if (width < 640) return 'Điện thoại'
  if (width < 1024) return 'Máy tính bảng'
  return 'Máy tính'
}

function referrerHost() {
  if (!document.referrer) return 'Truy cập trực tiếp'

  try {
    const host = new URL(document.referrer).hostname.replace(/^www\./, '')
    return host === window.location.hostname.replace(/^www\./, '') ? 'Nội bộ website' : host
  } catch {
    return 'Không xác định'
  }
}

export async function trackVisit(): Promise<number | null> {
  try {
    const response = await fetch('/api/analytics.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: visitorId(),
        path: `${window.location.pathname}${window.location.hash}`,
        referrer: referrerHost(),
        device: deviceType(),
      }),
    })

    if (!response.ok) return null
    const data = (await response.json()) as VisitorCount
    return Number.isFinite(data.total) ? data.total : null
  } catch {
    return null
  }
}
