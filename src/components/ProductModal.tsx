import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Check, ShieldCheck, Truck, Phone, ListPlus } from 'lucide-react'
import ProductImage from './ProductImage'
import StarRating from './StarRating'
import { useUI } from '../context/ui'
import { categoryLabel } from '../data/products'
import { formatVND, site } from '../data/site'

export default function ProductModal() {
  const { activeProduct, closeProduct, toggleQuote, inQuote } = useUI()

  // Đóng bằng phím ESC + khoá cuộn nền
  useEffect(() => {
    if (!activeProduct) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeProduct()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [activeProduct, closeProduct])

  return (
    <AnimatePresence>
      {activeProduct && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Chi tiết sản phẩm ${activeProduct.name}`}
        >
          {/* Scrim */}
          <button
            type="button"
            aria-label="Đóng"
            onClick={closeProduct}
            className="absolute inset-0 bg-ink-950/75 backdrop-blur-sm"
          />

          {/* Nội dung */}
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-white/10 bg-ink-900 shadow-card sm:rounded-3xl"
          >
            {/* Nút đóng */}
            <button
              type="button"
              onClick={closeProduct}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-ink-950/70 text-white backdrop-blur transition-colors hover:bg-white/10"
              aria-label="Đóng chi tiết"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-0 md:grid-cols-2">
              {/* Ảnh */}
              <div className="relative aspect-square w-full md:aspect-auto md:min-h-full">
                <ProductImage
                  accent={activeProduct.accent}
                  category={activeProduct.category}
                  series={activeProduct.series}
                  image={activeProduct.image}
                  name={activeProduct.name}
                />
                {activeProduct.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                    {activeProduct.badge}
                  </span>
                )}
              </div>

              {/* Thông tin */}
              <div className="flex flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip">{categoryLabel[activeProduct.category]}</span>
                  <span
                    className={`chip ${
                      activeProduct.inStock ? 'text-cyan2-400' : 'text-gold-400'
                    }`}
                  >
                    {activeProduct.inStock ? 'Còn hàng' : 'Đặt trước'}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-white">
                  {activeProduct.name}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{activeProduct.series}</p>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">
                  <StarRating value={activeProduct.rating} />
                  <span className="tabular">
                    {activeProduct.rating.toFixed(1)} · {activeProduct.reviews} đánh giá
                  </span>
                </div>

                {/* Giá */}
                <div className="mt-5 flex items-end gap-3">
                  <span className="font-display text-3xl font-extrabold text-gradient tabular">
                    {formatVND(activeProduct.price)}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">{activeProduct.description}</p>

                {/* Thông số */}
                <dl className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <dt className="text-xs text-slate-400">Mã sản phẩm</dt>
                    <dd className="font-semibold text-white tabular">{activeProduct.code}</dd>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <dt className="text-xs text-slate-400">Chất liệu</dt>
                    <dd className="font-semibold text-white">{activeProduct.material}</dd>
                  </div>
                </dl>

                {/* Điểm nổi bật */}
                <ul className="mt-5 grid gap-2">
                  {activeProduct.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-slate-200">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan2-400" /> {h}
                    </li>
                  ))}
                </ul>

                {/* Nút đặt hàng */}
                {/* Thêm vào danh sách báo giá */}
                <button
                  type="button"
                  onClick={() => {
                    toggleQuote(activeProduct.id)
                    closeProduct()
                  }}
                  className="btn-primary mt-6 w-full"
                >
                  {inQuote(activeProduct.id) ? (
                    <>
                      <X className="h-4 w-4" /> Hủy chọn khỏi list báo giá
                    </>
                  ) : (
                    <>
                      <ListPlus className="h-4 w-4" /> Thêm vào list báo giá
                    </>
                  )}
                </button>

                {/* Hoặc liên hệ trực tiếp */}
                <p className="mt-4 mb-2 text-center text-xs text-slate-500">Hoặc liên hệ trực tiếp</p>
                <div className="flex gap-2.5">
                  <a href={site.zalo} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1">
                    <MessageCircle className="h-4 w-4" /> Zalo
                  </a>
                  <a href={site.messenger} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1">
                    <MessageCircle className="h-4 w-4" /> Messenger
                  </a>
                  <a
                    href={`tel:+${site.phoneRaw}`}
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
                    aria-label="Gọi điện"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                </div>

                {/* Cam kết */}
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-cyan2-400" /> Bảo hành hư hỏng vận chuyển và đổi trả
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-4 w-4 text-gold-400" /> Giao toàn quốc qua Viettel Post
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
