import { Bot, Swords, Sparkles, Car, Crown, ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { products, type Category } from '../data/products'

const cards: {
  id: Category
  label: string
  desc: string
  icon: typeof Bot
  accentText: string
  accentBg: string
  ring: string
}[] = [
  {
    id: 'gunpla',
    label: 'Gunpla',
    desc: 'RG · MG · PG · Perfect Grade chính hãng Bandai',
    icon: Bot,
    accentText: 'text-brand-300',
    accentBg: 'bg-brand-500/15',
    ring: 'hover:shadow-glow',
  },
  {
    id: 'figure',
    label: 'Action Figure',
    desc: 'S.H.Figuarts, Figuarts ZERO khớp động linh hoạt',
    icon: Swords,
    accentText: 'text-cyan2-400',
    accentBg: 'bg-cyan2-400/15',
    ring: 'hover:shadow-glow-cyan',
  },
  {
    id: 'anime',
    label: 'Mô hình Anime',
    desc: 'Scale figure 1/7 · 1/6 sơn phủ tinh xảo',
    icon: Sparkles,
    accentText: 'text-violet2-400',
    accentBg: 'bg-violet2-500/15',
    ring: 'hover:shadow-[0_0_40px_-8px_rgba(139,92,246,0.45)]',
  },
  {
    id: 'xe',
    label: 'Xe mô hình',
    desc: 'Die-cast 1/18 kim loại, mở cửa, chi tiết thật',
    icon: Car,
    accentText: 'text-gold-400',
    accentBg: 'bg-gold-400/15',
    ring: 'hover:shadow-glow-gold',
  },
  {
    id: 'limited',
    label: 'Limited Edition',
    desc: 'Statue & phiên bản giới hạn, đánh số sưu tầm',
    icon: Crown,
    accentText: 'text-brand-300',
    accentBg: 'bg-brand-500/15',
    ring: 'hover:shadow-glow',
  },
]

export default function Collections() {
  const countByCat = (c: Category) => products.filter((p) => p.category === c).length

  return (
    <section id="collections" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          label="Bộ sưu tập"
          title={<>Chọn “gu” của bạn</>}
          description="Năm dòng sản phẩm tuyển chọn — từ Gunpla huyền thoại đến statue giới hạn cho dân chơi thứ thiệt."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <a
                href="#catalog"
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${c.ring}`}
              >
                <div>
                  <span className={`inline-grid h-14 w-14 place-items-center rounded-2xl ${c.accentBg}`}>
                    <c.icon className={`h-7 w-7 ${c.accentText}`} strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-white">{c.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.desc}</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="chip">{countByCat(c.id)} sản phẩm</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white transition-all group-hover:bg-white group-hover:text-ink-950">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}

          {/* Card CTA cuối */}
          <Reveal delay={cards.length * 0.06}>
            <a
              href="#catalog"
              className="border-gradient group relative flex h-full min-h-[210px] flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600/30 via-ink-850 to-ink-900 p-6 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="font-display text-2xl font-extrabold text-white">Xem tất cả</p>
              <p className="mt-2 text-sm text-slate-300">Hơn {products.length} mẫu đang có sẵn &amp; pre-order</p>
              <span className="mx-auto mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-300">
                Vào cửa hàng <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
