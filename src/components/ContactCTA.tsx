import { MessageCircle, Phone, MapPin, Clock, Mail } from 'lucide-react'
import Reveal from './Reveal'
import { site } from '../data/site'

export default function ContactCTA() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <div className="border-gradient relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-600/25 via-ink-850 to-ink-900 p-8 sm:p-12 lg:p-16">
            {/* Glow nền */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-cyan2-400/15 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="section-label">Sẵn sàng sưu tầm?</span>
                <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                  Nhắn tin ngay — <span className="text-gradient">chốt đơn trong 5 phút</span>
                </h2>
                <p className="mt-4 max-w-md text-base text-slate-300">
                  Đội ngũ KEVIN ĐẦU TO luôn sẵn sàng tư vấn mẫu phù hợp, báo giá &amp; phí ship, giữ hàng và
                  chốt đơn nhanh gọn qua Zalo hoặc Messenger.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={site.zalo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <MessageCircle className="h-4 w-4" /> Chat Zalo
                  </a>
                  <a href={site.messenger} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <MessageCircle className="h-4 w-4" /> Messenger
                  </a>
                  <a href={`tel:+${site.phoneRaw}`} className="btn-gold">
                    <Phone className="h-4 w-4" /> {site.phone}
                  </a>
                </div>
              </div>

              {/* Thông tin liên hệ */}
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard icon={MapPin} title="Địa chỉ" value={site.address} />
                <InfoCard icon={Clock} title="Giờ mở cửa" value={site.hours} />
                <InfoCard icon={Phone} title="Hotline" value={site.phone} href={`tel:+${site.phoneRaw}`} />
                <InfoCard icon={Mail} title="Email" value={site.email} href={`mailto:${site.email}`} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function InfoCard({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: typeof MapPin
  title: string
  value: string
  href?: string
}) {
  const inner = (
    <div className="flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-ink-950/40 p-4 transition-colors hover:border-white/20">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5">
        <Icon className="h-5 w-5 text-brand-300" />
      </span>
      <span>
        <span className="block text-xs text-slate-400">{title}</span>
        <span className="block text-sm font-semibold text-white">{value}</span>
      </span>
    </div>
  )
  return href ? (
    <a href={href} className="block">
      {inner}
    </a>
  ) : (
    inner
  )
}
