import { Facebook } from 'lucide-react'

// Thay name, avatar va facebook tai day khi co danh sach hoa si chinh thuc.
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

const communities = [
  {
    name: 'Diorama - Vietnam 1:64',
    image: '/communities/diorama-vietnam-1-64.webp',
    facebook: 'https://www.facebook.com/groups/MUABANDAUGIAmohinh',
  },
  {
    name: '1:64 Scale - Diorama & Cars Việt Nam',
    image: '/communities/1-64-scale-diorama-car.webp',
    facebook: 'https://www.facebook.com/groups/1797613757406534',
  },
  {
    name: 'Hội mô hình xe phân khối nhỏ',
    image: '/communities/hoi-mo-hinh-phan-khoi-nho.webp',
    facebook: 'https://www.facebook.com/groups/667605220772791',
  },
  {
    name: 'Group mua bán 1:64',
    image: '/communities/group-mua-ban-164.webp',
    facebook: 'https://www.facebook.com/groups/778404172303735',
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

      <div className="container-x">
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
      </div>

      <div className="container-x mt-10">
        <div className="mb-5 text-center">
          <h2 className="font-display text-lg font-bold text-white sm:text-2xl">Các Cộng đồng Mô hình nổi bật</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {communities.map((community) => (
            <a
              key={community.name}
              href={community.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] transition-all duration-200 hover:border-brand-400/60 hover:bg-white/[0.07] hover:shadow-glow"
              title={`Mở Facebook của ${community.name}`}
            >
              <span className="block aspect-[4/3] overflow-hidden bg-ink-800">
                <img
                  src={community.image}
                  alt={community.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </span>
              <span className="flex min-h-16 items-center justify-between gap-3 px-4 py-3">
                <span className="text-sm font-bold leading-5 text-white">{community.name}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1877f2] text-white">
                  <Facebook className="h-4 w-4" />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
