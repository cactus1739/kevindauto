import { Facebook } from 'lucide-react'

// Thay name, avatar và facebook tại đây khi có danh sách họa sĩ chính thức.
const artists = [
  {
    name: 'Nguyễn Dương',
    avatar: '/artists/nguyen-duong.webp',
    facebook: 'https://www.facebook.com/nguyen.duong.739386',
  },
  {
    name: 'Lê Ngọc Hân',
    avatar: '/artists/le-ngoc-han.webp',
    facebook: 'https://www.facebook.com/LeengocHan88',
  },
  {
    name: 'Bboy Dinosmall',
    avatar: '/artists/bboy-dsmall.webp',
    facebook: 'https://www.facebook.com/bboy.dinosmall',
  },
  {
    name: 'Nguyễn Hoàng Linh',
    avatar: '/artists/nguyen-hoang-linh.webp',
    facebook: 'https://www.facebook.com/linhoang2608',
  },
  {
    name: 'Nhật Nam',
    avatar: '/artists/nhat-nam.webp',
    facebook: 'https://www.facebook.com/gi.ma.96995',
  },
  {
    name: 'Lê Trân',
    avatar: '/artists/le-tran.webp',
    facebook: 'https://www.facebook.com/le.tran.268032',
  },
  {
    name: 'Mai Trinh',
    avatar: '/artists/mai-trinh.webp',
    facebook: 'https://www.facebook.com/lam.decem',
  },
]

const marqueeArtists = Array.from({ length: 6 }, () => artists).flat()

export default function BrandMarquee() {
  return (
    <section aria-labelledby="collaborating-artists-title" className="border-y border-white/10 bg-ink-900/40 py-5">
      <div className="container-x mb-5 text-center">
        <h2 id="collaborating-artists-title" className="font-display text-sm font-bold text-white sm:text-base">
          Top họa sĩ tham khảo để đặt lên màu
        </h2>
      </div>

      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-start gap-8 pr-8 [animation-duration:90s] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
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
