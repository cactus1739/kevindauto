import { Star } from 'lucide-react'

export default function StarRating({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Đánh giá ${value} trên 5 sao`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i < Math.round(value) ? 'fill-gold-400 text-gold-400' : 'fill-ink-600 text-ink-600'}
        />
      ))}
    </span>
  )
}
