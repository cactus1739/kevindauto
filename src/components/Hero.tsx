import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, ShieldCheck, Truck, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { site } from '../data/site'

// Ảnh banner riêng, KHÔNG lấy từ ảnh sản phẩm — đặt file vào public/banners/,
// kích thước & tỷ lệ chuẩn: xem ghi chú cuối file.
interface BannerSlide {
  id: string
  image: string
  label: string
  title: string
}

const slides: BannerSlide[] = [
  { id: 'b1', image: '/banners/slide-1.webp', label: 'Phong cách', title: 'Lịch lãm với blazer xanh navy' },
  { id: 'b2', image: '/banners/slide-2.webp', label: 'Streetwear', title: 'Bụi bặm phong cách oversize' },
  { id: 'b3', image: '/banners/slide-3.webp', label: 'Cá tính', title: 'Năng động sắc màu đường phố' },
  { id: 'b4', image: '/banners/slide-4.webp', label: 'Đời thường', title: 'Giản dị mà cuốn hút' },
  { id: 'b5', image: '/banners/slide-5.webp', label: 'Năng động', title: 'Trẻ trung tràn đầy sức sống' },
  { id: 'b6', image: '/banners/slide-6.webp', label: 'Cổ điển', title: 'Da nâu phong trần lịch lãm' },
  { id: 'b7', image: '/banners/slide-7.webp', label: 'Gợi cảm', title: 'Quyến rũ trong từng dáng đứng' },
  { id: 'b8', image: '/banners/slide-8.webp', label: 'Cá tính', title: 'Graffiti đậm chất nổi loạn' },
]

const AUTOPLAY_MS = 5000

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const dir = useRef(1)

  const go = useCallback((next: number) => {
    dir.current = next > index || (index === slides.length - 1 && next === 0) ? 1 : -1
    setIndex(((next % slides.length) + slides.length) % slides.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  useEffect(() => {
    if (paused || slides.length < 2) return
    const t = setInterval(() => go(index + 1), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [index, paused, go])

  const current = slides[index]

  return (
    <section id="home" className="relative overflow-hidden pt-28 lg:pt-36">
      {/* Nền hào quang */}
      <div className="pointer-events-none absolute inset-0 bg-grid-glow" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at 50% 30%, #000, transparent 75%)',
        }}
      />

      <div className="container-x relative grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28">
        {/* Cột nội dung */}
        <div className="min-w-0">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="chip mb-5 border-brand-500/30 bg-brand-500/10 text-brand-200"
          >
            <Sparkles className="h-3.5 w-3.5" /> Hàng chính hãng · Tuyển chọn từng sản phẩm
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Mô hình đỉnh cao
            <br />
            cho dân <span className="text-gradient">sưu tầm thứ thiệt</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-xl text-base text-slate-300 sm:text-lg"
          >
            <span className="font-semibold text-white">KEVIN ĐẦU TO</span> — thế giới mô hình figure người &amp;
            phụ kiện diorama cao cấp. Hàng thật, chi tiết thật, đặt nhanh qua Zalo &amp; Messenger.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#catalog" className="btn-primary">
              Khám phá bộ sưu tập <ArrowRight className="h-4 w-4" />
            </a>
            <a href={site.zalo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Play className="h-4 w-4" /> Tư vấn miễn phí
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300"
          >
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-cyan2-400" /> Bảo hành đổi trả 7 ngày
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-gold-400" /> Giao toàn quốc, đóng gói chống sốc
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-brand-400 text-brand-400" /> 4.9/5 từ 1.200+ khách
            </li>
          </motion.ul>
        </div>

        {/* Cột banner slide */}
        <div className="relative min-w-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mx-auto w-full min-w-0 max-w-md"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Card banner trượt */}
            <div className="border-gradient card-glass overflow-hidden rounded-[28px] shadow-card">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <AnimatePresence initial={false} custom={dir.current} mode="popLayout">
                  <motion.div
                    key={current.id}
                    custom={dir.current}
                    initial={{ opacity: 0, x: dir.current * 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir.current * -50 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <img
                      src={current.image}
                      alt={current.title}
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Nút điều hướng */}
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Ảnh trước"
                  className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/15 bg-ink-950/50 p-2 text-white backdrop-blur transition hover:bg-ink-950/80 sm:grid sm:place-items-center"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Ảnh tiếp theo"
                  className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/15 bg-ink-950/50 p-2 text-white backdrop-blur transition hover:bg-ink-950/80 sm:grid sm:place-items-center"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-ink-900/60 p-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-300">{current.label}</p>
                  <p className="truncate font-semibold text-white">{current.title}</p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Chuyển đến ảnh ${i + 1}`}
                      aria-current={i === index}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Chip nổi floating */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="card-glass absolute -left-5 top-16 hidden items-center gap-2 rounded-2xl px-3 py-2 shadow-glow-cyan sm:flex"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan2-400/15">
                <ShieldCheck className="h-5 w-5 text-cyan2-400" />
              </span>
              <div className="leading-tight">
                <p className="text-xs font-bold text-white">Chính hãng 100%</p>
                <p className="text-[10px] text-slate-400">Kiểm hàng khi nhận</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="card-glass absolute -right-4 bottom-24 hidden items-center gap-2 rounded-2xl px-3 py-2 shadow-glow-gold sm:flex"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-400/15">
                <Star className="h-5 w-5 fill-gold-400 text-gold-400" />
              </span>
              <div className="leading-tight">
                <p className="text-xs font-bold text-white">Best Seller</p>
                <p className="text-[10px] text-slate-400">214 lượt mua</p>
              </div>
            </motion.div>

            {/* Glow nền sau card */}
            <div className="absolute inset-0 -z-10 mx-auto h-3/4 w-3/4 translate-y-10 rounded-full bg-brand-500/20 blur-[80px]" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
//  QUY CÁCH ẢNH BANNER (đặt file vào public/banners/slide-1.jpg ... slide-6.jpg)
//  - Tỷ lệ: 4:5 (dọc, khớp khung thẻ ở Hero) — VD 1200×1500px, nén JPG/WebP ~80%.
//  - "Vùng an toàn chữ": mép DƯỚI ảnh có lớp gradient tối nhẹ + thanh chú thích
//    (nhãn + tiêu đề) nằm NGAY DƯỚI ảnh (ngoài ảnh, nền riêng) — không đè chữ
//    lên ảnh, nên không cần chừa khoảng trống đặc biệt, chỉ cần chủ thể rõ nét,
//    căn giữa khung dọc.
// ============================================================================
