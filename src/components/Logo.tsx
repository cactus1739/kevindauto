interface Props {
  className?: string
  showText?: boolean
}

/** Logo thương hiệu KEVIN ĐẦU TO */
export default function Logo({ className = '', showText = true }: Props) {
  return (
    <a href="#home" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="KEVIN ĐẦU TO — về đầu trang">
      <span className="relative grid h-10 w-10 place-items-center">
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff7aae" />
              <stop offset="55%" stopColor="#ff2d78" />
              <stop offset="100%" stopColor="#ffb020" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="42" height="42" rx="13" fill="url(#lg)" />
          <rect x="3" y="3" width="42" height="42" rx="13" fill="black" opacity="0.12" />
          {/* Chữ K cách điệu */}
          <path
            d="M17 13v22M17 24l9-11M17 24l10 11"
            stroke="white"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span className="absolute inset-0 rounded-[13px] bg-brand-500/40 blur-lg transition-opacity duration-300 group-hover:opacity-100 opacity-0 -z-10" />
      </span>
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-extrabold tracking-tight text-white">
            KEVIN <span className="text-gradient">ĐẦU TO</span>
          </span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            3D Resin model figure store
          </span>
        </span>
      )}
    </a>
  )
}
