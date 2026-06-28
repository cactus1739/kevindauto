import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, ArrowUp } from 'lucide-react'
import { site } from '../data/site'

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-ink-800/90 text-white shadow-card backdrop-blur transition-colors hover:bg-ink-700"
            aria-label="Lên đầu trang"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Gọi điện */}
      <a
        href={`tel:+${site.phoneRaw}`}
        className="grid h-12 w-12 place-items-center rounded-full bg-gold-500 text-ink-950 shadow-glow-gold transition-transform hover:scale-105"
        aria-label="Gọi điện"
      >
        <Phone className="h-5 w-5" />
      </a>

      {/* Zalo / chat — có nhãn */}
      <a
        href={site.zalo}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-full bg-brand-500 py-3 pl-3.5 pr-4 font-semibold text-white shadow-glow transition-all hover:bg-brand-400"
        aria-label="Chat Zalo đặt hàng"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-75" />
          <MessageCircle className="relative h-6 w-6" />
        </span>
        <span className="hidden text-sm sm:inline">Chat đặt hàng</span>
      </a>
    </div>
  )
}
