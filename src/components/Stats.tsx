import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Stat {
  value: number
  suffix?: string
  label: string
}

const stats: Stat[] = [
  { value: 1200, suffix: '+', label: 'Khách hàng tin chọn' },
  { value: 500, suffix: '+', label: 'Mẫu mô hình đã bán' },
  { value: 8, suffix: ' năm', label: 'Kinh nghiệm sưu tầm' },
  { value: 49, label: 'Điểm hài lòng (/50)' },
]

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setN(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 1400
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  const display = value === 49 ? (n / 10).toFixed(1) : n.toLocaleString('vi-VN')

  return (
    <span ref={ref} className="tabular">
      {display}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section aria-label="Số liệu nổi bật" className="py-8">
      <div className="container-x">
        <div className="border-gradient grid grid-cols-2 gap-6 rounded-3xl bg-ink-900/50 p-8 sm:p-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-sm text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
