import { Facebook } from 'lucide-react'

// Thay name, avatar và facebook tại đây khi có danh sách họa sĩ chính thức.
const artists = [
  {
    name: 'Nguyễn Dương',
    avatar: '/banners/slide-1.webp',
    facebook: 'https://www.facebook.com/nguyen.duong.739386',
  },
  {
    name: 'Lê Ngọc Hân',
    avatar: '/banners/slide-2.webp',
    facebook: 'https://www.facebook.com/LeengocHan88',
  },
  {
    name: 'Bboy Dinosmall',
    avatar: '/banners/slide-3.webp',
    facebook: 'https://www.facebook.com/bboy.dinosmall',
  },
]

const marqueeArtists = Array.from({ length: 6 }, () => artists).flat()

export default function BrandMarquee() {
  return (
    <section aria-labelledby="collaborating-artists-title" className="border-y border-white/10 bg-ink-900/40 py-5">
      <h2 id="collaborating-artists-title" className="sr-only">
        Họa sĩ hợp tác
      </h2>

      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-start gap-8 pr-8 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {[...marqueeArtists, ...marqueeArtists].map((artist, index) => {
            const duplicate = index >= artists.length

            return (
              <a
                key={`${artist.name}-${index}`}
                href={artist.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={duplicate || undefined}
                tabIndex={duplicate ? -1 : undefined}
                className="group flex w-20 shrink-0 flex-col items-center gap-2 text-center"
                title={`Mở Facebook của ${artist.name}`}
              >
                <span className="relative block h-16 w-16 rounded-full border border-white/15 bg-ink-800 p-0.5 transition-all duration-200 group-hover:border-brand-400 group-hover:shadow-glow">
                  <img
                    src={artist.avatar}
                    alt=""
                    className="h-full w-full rounded-full object-cover object-top"
                    loading="eager"
                  />
                  <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border-2 border-ink-900 bg-[#1877f2] text-white">
                    <Facebook className="h-3.5 w-3.5" />
                  </span>
                </span>

                <span className="line-clamp-2 min-h-8 text-xs font-semibold leading-4 text-slate-300 transition-colors group-hover:text-white">
                  {artist.name}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
