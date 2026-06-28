const items = [
  'Bandai',
  'Gundam',
  'One Piece',
  'Dragon Ball',
  'Jujutsu Kaisen',
  'Demon Slayer',
  'Good Smile',
  'S.H.Figuarts',
  'Hot Toys',
  'Ferrari',
  'Lamborghini',
  'Evangelion',
]

export default function BrandMarquee() {
  return (
    <section aria-label="Các thương hiệu phân phối" className="border-y border-white/10 bg-ink-900/40 py-6">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-12 pr-12">
          {[...items, ...items].map((label, i) => (
            <span
              key={i}
              className="font-display text-lg font-bold uppercase tracking-wide text-slate-500/80 transition-colors hover:text-slate-300"
              aria-hidden={i >= items.length}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
