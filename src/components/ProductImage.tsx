import { User, UserRound, Users, Baby, PersonStanding, Dumbbell, Bike, PawPrint, Sailboat } from 'lucide-react'
import type { Accent, Category } from '../data/products'

const accentGradient: Record<Accent, string> = {
  brand: 'from-brand-500/30 via-ink-850 to-ink-900',
  cyan: 'from-cyan2-400/25 via-ink-850 to-ink-900',
  gold: 'from-gold-400/25 via-ink-850 to-ink-900',
  violet: 'from-violet2-500/30 via-ink-850 to-ink-900',
}

const accentGlow: Record<Accent, string> = {
  brand: 'bg-brand-500/30',
  cyan: 'bg-cyan2-400/25',
  gold: 'bg-gold-400/25',
  violet: 'bg-violet2-500/30',
}

const categoryIcon: Record<Category, typeof User> = {
  nam: User,
  nu: UserRound,
  giadinh: Users,
  treem: Baby,
  caotuoi: PersonStanding,
  thethao: Dumbbell,
  dongvat: PawPrint,
  xe: Bike,
  phukien: Sailboat,
}

interface Props {
  accent: Accent
  category: Category
  series: string
  image?: string
  name: string
  className?: string
}

/**
 * Hiển thị ảnh sản phẩm. Nếu có `image` thật thì dùng ảnh,
 * nếu không sẽ render "poster" gradient theo tông màu sản phẩm.
 */
export default function ProductImage({ accent, category, series, image, name, className = '' }: Props) {
  const Icon = categoryIcon[category]

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${accentGradient[accent]} ${className}`}
      role="img"
      aria-label={`Ảnh minh hoạ ${name}`}
    >
      {/* Lưới nền */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />
      {/* Hào quang */}
      <div className={`absolute -top-10 h-44 w-44 rounded-full blur-3xl ${accentGlow[accent]}`} />

      {/* Icon nhân vật chính */}
      <Icon
        className="relative z-10 h-24 w-24 text-white/80 drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110 sm:h-28 sm:w-28"
        strokeWidth={1.4}
      />

      {/* Tên dòng sản phẩm */}
      <span className="absolute bottom-3 left-0 right-0 z-10 px-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
        {series}
      </span>

      {/* Watermark thương hiệu */}
      <span className="absolute right-3 top-3 z-10 font-display text-[10px] font-bold tracking-wider text-white/40">
        KEVIN ĐẦU TO
      </span>
    </div>
  )
}
