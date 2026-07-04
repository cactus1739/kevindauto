import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle, ClipboardList } from 'lucide-react'
import Logo from './Logo'
import { site } from '../data/site'
import { useUI } from '../context/ui'

const links = [
  { href: '/gallery', label: 'Thư viện ảnh' },
  { href: '#catalog', label: 'Sản phẩm' },
  { href: '#about', label: 'Về chúng tôi' },
  { href: '#reviews', label: 'Đánh giá' },
  { href: '#faq', label: 'Hỏi đáp' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { quoteCount, openQuoteDrawer } = useUI()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Khoá cuộn khi mở menu mobile
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between lg:h-[72px]">
        <Logo />

        {/* Menu desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:+${site.phoneRaw}`} className="text-sm font-semibold text-slate-300 transition-colors hover:text-white">
            {site.phone}
          </a>
          <a href={site.zalo} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
            <MessageCircle className="h-4 w-4" /> Zalo
          </a>
          <button type="button" onClick={openQuoteDrawer} className="btn-primary relative text-sm">
            <ClipboardList className="h-4 w-4" /> List báo giá
            {quoteCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold-400 px-1 text-[11px] font-bold text-ink-950">
                {quoteCount}
              </span>
            )}
          </button>
        </div>

        {/* Nút mobile: list + menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={openQuoteDrawer}
            className="relative grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white"
            aria-label="Danh sách báo giá"
          >
            <ClipboardList className="h-5 w-5" />
            {quoteCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold-400 px-1 text-[11px] font-bold text-ink-950">
                {quoteCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white"
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Drawer mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/10 bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex flex-col gap-2">
                <a
                  href={site.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  <MessageCircle className="h-4 w-4" /> Đặt hàng qua Zalo
                </a>
                <a href={`tel:+${site.phoneRaw}`} className="btn-ghost w-full">
                  Gọi {site.phone}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
