import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, PackageOpen } from 'lucide-react'
import ProductCard from './ProductCard'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { products, categories, type Category } from '../data/products'

type Filter = 'all' | Category
type Sort = 'featured' | 'price-asc' | 'price-desc' | 'rating'

const sortOptions: { id: Sort; label: string }[] = [
  { id: 'featured', label: 'Nổi bật' },
  { id: 'price-asc', label: 'Giá: Thấp → Cao' },
  { id: 'price-desc', label: 'Giá: Cao → Thấp' },
  { id: 'rating', label: 'Đánh giá cao' },
]

export default function Catalog() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('featured')

  const filtered = useMemo(() => {
    let list = products.filter((p) => (filter === 'all' ? true : p.category === filter))
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.series.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
        break
    }
    return list
  }, [filter, query, sort])

  const tabs: { id: Filter; label: string }[] = [
    { id: 'all', label: 'Tất cả' },
    ...categories.map((c) => ({ id: c.id as Filter, label: c.label })),
  ]

  return (
    <section id="catalog" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          label="Cửa hàng"
          title={<>Sản phẩm nổi bật</>}
          description="Lọc theo dòng sản phẩm, tìm theo tên hoặc series. Thấy mẫu ưng ý? Đặt ngay qua Zalo/Messenger trong 1 chạm."
        />

        {/* Thanh điều khiển */}
        <Reveal className="mt-10">
          <div className="flex flex-col gap-4">
            {/* Tabs danh mục */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Lọc theo danh mục">
              {tabs.map((t) => {
                const active = filter === t.id
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(t.id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      active
                        ? 'bg-brand-500 text-white shadow-glow'
                        : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>

            {/* Tìm kiếm + sắp xếp */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm mô hình, series..."
                  aria-label="Tìm kiếm sản phẩm"
                  className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan2-400/60 focus:bg-white/10"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-400">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Sắp xếp:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="rounded-full border border-white/10 bg-ink-800 py-2 pl-3 pr-8 text-sm font-semibold text-white outline-none focus:border-cyan2-400/60"
                >
                  {sortOptions.map((o) => (
                    <option key={o.id} value={o.id} className="bg-ink-800">
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <p className="text-sm text-slate-400" aria-live="polite">
              Hiển thị <span className="font-semibold text-white tabular">{filtered.length}</span> sản phẩm
            </p>
          </div>
        </Reveal>

        {/* Lưới sản phẩm */}
        {filtered.length > 0 ? (
          <motion.div layout className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] py-16 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/5">
              <PackageOpen className="h-8 w-8 text-slate-400" />
            </span>
            <p className="mt-4 font-semibold text-white">Không tìm thấy sản phẩm phù hợp</p>
            <p className="mt-1 text-sm text-slate-400">Thử từ khoá khác hoặc bỏ bộ lọc nhé.</p>
            <button
              onClick={() => {
                setQuery('')
                setFilter('all')
              }}
              className="btn-ghost mt-5 text-sm"
            >
              Xoá bộ lọc
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
