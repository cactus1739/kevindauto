import { motion } from 'framer-motion'
import { Star, ShieldCheck, Truck, Sparkles, ArrowRight, Play } from 'lucide-react'
import ProductImage from './ProductImage'
import { products } from '../data/products'
import { formatVND, site } from '../data/site'

const featured = products.find((p) => p.id === 'sp-4451')!

export default function Hero() {
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

      <div className="container-x relative grid items-center gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28">
        {/* Cột nội dung */}
        <div>
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

        {/* Cột hình ảnh nổi bật */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mx-auto max-w-md"
          >
            {/* Card sản phẩm chính */}
            <div className="border-gradient card-glass overflow-hidden rounded-[28px] shadow-card">
              <div className="aspect-[4/5] w-full animate-float">
                <ProductImage
                  accent={featured.accent}
                  category={featured.category}
                  series={featured.series}
                  name={featured.name}
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-ink-900/60 p-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{featured.name}</p>
                  <p className="text-xs text-slate-400">Mã {featured.code} · {featured.material}</p>
                </div>
                <span className="shrink-0 font-display text-lg font-bold text-gradient">{formatVND(featured.price)}</span>
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
