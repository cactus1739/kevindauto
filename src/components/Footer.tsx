import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail } from 'lucide-react'
import Logo from './Logo'
import { site } from '../data/site'
import { categories } from '../data/products'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Cửa hàng mô hình &amp; figure cao cấp chính hãng. Sưu tầm chất — chơi tới bến.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: Facebook, href: site.facebook, label: 'Facebook' },
                { icon: Instagram, href: site.instagram, label: 'Instagram' },
                { icon: Youtube, href: site.youtube, label: 'YouTube' },
                { icon: MessageCircle, href: site.zalo, label: 'Zalo' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-brand-500/40 hover:bg-brand-500/10 hover:text-white"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Danh mục */}
          <nav aria-label="Danh mục sản phẩm">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Danh mục</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((c) => (
                <li key={c.id}>
                  <a href="#catalog" className="text-slate-400 transition-colors hover:text-brand-300">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Liên kết */}
          <nav aria-label="Liên kết nhanh">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Khám phá</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: '#collections', label: 'Bộ sưu tập' },
                { href: '#about', label: 'Về chúng tôi' },
                { href: '#reviews', label: 'Đánh giá' },
                { href: '#faq', label: 'Hỏi đáp' },
                { href: '#contact', label: 'Liên hệ' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-slate-400 transition-colors hover:text-brand-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Liên hệ */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Liên hệ</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" /> {site.address}
              </li>
              <li>
                <a href={`tel:+${site.phoneRaw}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-brand-300" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-brand-300" /> {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>© {year} KEVIN ĐẦU TO. Bảo lưu mọi quyền.</p>
          <p>
            Thiết kế &amp; phát triển bởi <span className="font-semibold text-slate-300">KEVIN ĐẦU TO Team</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
