import { User, UserRound, Users, PersonStanding, Dumbbell, Landmark, PawPrint, Sailboat, ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { products, type Category } from '../data/products'

const cards: {
  id: Category
  label: string
  desc: string
  icon: typeof User
  accentText: string
  accentBg: string
  ring: string
}[] = [
  {
    id: 'nam',
    label: 'Nam giới',
    desc: 'Figure nam đa phong cách: công sở, streetwear, đời thường',
    icon: User,
    accentText: 'text-cyan2-400',
    accentBg: 'bg-cyan2-400/15',
    ring: 'hover:shadow-glow-cyan',
  },
  {
    id: 'nu',
    label: 'Nữ giới',
    desc: 'Figure nữ thanh lịch, cá tính, gợi cảm và năng động',
    icon: UserRound,
    accentText: 'text-brand-300',
    accentBg: 'bg-brand-500/15',
    ring: 'hover:shadow-glow',
  },
  {
    id: 'giadinh',
    label: 'Cặp đôi & Gia đình',
    desc: 'Cặp đôi, trẻ em — khoảnh khắc gia đình ấm áp',
    icon: Users,
    accentText: 'text-gold-400',
    accentBg: 'bg-gold-400/15',
    ring: 'hover:shadow-glow-gold',
  },
  {
    id: 'caotuoi',
    label: 'Người cao tuổi',
    desc: 'Hình mẫu ông bà, người thợ lành nghề đáng kính',
    icon: PersonStanding,
    accentText: 'text-violet2-400',
    accentBg: 'bg-violet2-500/15',
    ring: 'hover:shadow-[0_0_40px_-8px_rgba(139,92,246,0.45)]',
  },
  {
    id: 'thethao',
    label: 'Thể thao',
    desc: 'Cầu thủ, vận động viên đầy năng lượng',
    icon: Dumbbell,
    accentText: 'text-cyan2-400',
    accentBg: 'bg-cyan2-400/15',
    ring: 'hover:shadow-glow-cyan',
  },
  {
    id: 'tuong',
    label: 'Tượng & Nghệ thuật',
    desc: 'Tượng điêu khắc, thiên thần — tác phẩm trưng bày',
    icon: Landmark,
    accentText: 'text-gold-400',
    accentBg: 'bg-gold-400/15',
    ring: 'hover:shadow-glow-gold',
  },
  {
    id: 'dongvat',
    label: 'Động vật & Chibi',
    desc: 'Gấu, khủng long, mascot dễ thương cho mọi lứa tuổi',
    icon: PawPrint,
    accentText: 'text-brand-300',
    accentBg: 'bg-brand-500/15',
    ring: 'hover:shadow-glow',
  },
  {
    id: 'phukien',
    label: 'Phụ kiện & Bối cảnh',
    desc: 'Thuyền, đạo cụ tạo bối cảnh diorama sống động',
    icon: Sailboat,
    accentText: 'text-violet2-400',
    accentBg: 'bg-violet2-500/15',
    ring: 'hover:shadow-[0_0_40px_-8px_rgba(139,92,246,0.45)]',
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
          description="Tám nhóm figure tuyển chọn — từ nhân vật đời thường, thể thao đến tượng nghệ thuật và phụ kiện diorama."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
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
        </div>
      </div>
    </section>
  )
}
