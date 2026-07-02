import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, PackageOpen, X, Check, ChevronDown } from 'lucide-react'
import ProductCard from './ProductCard'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { products, categories, type Category } from '../data/products'
import { facetGroups, productMatchesFacet } from '../data/facets'
import { searchProducts } from '../lib/search'

type Filter = 'all' | Category
type Sort = 'featured' | 'price-asc' | 'price-desc' | 'rating'
const PAGE_SIZE = 48

const sortOptions: { id: Sort; label: string }[] = [
  { id: 'featured', label: 'Liên quan / Nổi bật' },
  { id: 'price-asc', label: 'Giá: Thấp → Cao' },
  { id: 'price-desc', label: 'Giá: Cao → Thấp' },
  { id: 'rating', label: 'Đánh giá cao' },
]

// Tra cứu nhanh facet theo id + nhóm
const facetById = new Map(
  facetGroups.flatMap((g) => g.facets.map((f) => [f.id, { facet: f, groupId: g.id }] as const)),
)
// Đếm số sản phẩm cho mỗi facet (toàn bộ kho)
const facetCount = new Map(
  facetGroups.flatMap((g) =>
    g.facets.map((f) => [f.id, products.filter((p) => productMatchesFacet(p, f)).length] as const),
  ),
)

const categoryCount = new Map<Filter, number>([
  ['all', products.length],
  ...categories.map((c) => [c.id as Filter, products.filter((p) => p.category === c.id).length] as const),
])

export default function Catalog() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('featured')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const toggleFacet = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const clearAll = () => {
    setQuery('')
    setFilter('all')
    setSelected(new Set())
  }

  const filtered = useMemo(() => {
    // 1) Search mờ (giữ thứ tự độ liên quan) hoặc toàn bộ
    let list = query.trim() ? searchProducts(query) : products.slice()

    // 2) Danh mục chính
    if (filter !== 'all') list = list.filter((p) => p.category === filter)

    // 3) Facet: trong cùng nhóm = HOẶC, khác nhóm = VÀ (chồng lấn)
    if (selected.size) {
      const byGroup = new Map<string, string[]>()
      for (const id of selected) {
        const info = facetById.get(id)
        if (!info) continue
        const arr = byGroup.get(info.groupId) ?? []
        arr.push(id)
        byGroup.set(info.groupId, arr)
      }
      for (const ids of byGroup.values()) {
        list = list.filter((p) => ids.some((id) => productMatchesFacet(p, facetById.get(id)!.facet)))
      }
    }

    // 4) Sắp xếp (nếu không phải "liên quan")
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)

    return list
  }, [filter, query, sort, selected])

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'Tất cả', count: categoryCount.get('all') ?? 0 },
    ...categories.map((c) => {
      const id = c.id as Filter
      return { id, label: c.label, count: categoryCount.get(id) ?? 0 }
    }),
  ]

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [filter, query, sort, selected])

  const visibleProducts = filtered.slice(0, visibleCount)
  const remainingCount = filtered.length - visibleProducts.length
  const activeCount = selected.size + (query.trim() ? 1 : 0) + (filter !== 'all' ? 1 : 0)

  return (
    <section id="catalog" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          label="Cửa hàng"
          title={<>Tìm figure theo “gu” của bạn</>}
          description="Gõ từ khoá kiểu gì cũng được (kể cả không dấu, sai chính tả, vu vơ) — web tự tìm sản phẩm tương đồng. Lọc sâu theo phong cách, tư thế, chủ đề, màu sắc…"
        />

        <Reveal className="mt-10">
          <div className="flex flex-col gap-4">
            {/* Tabs danh mục chính */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Lọc theo danh mục">
              {tabs.map((t) => {
                const active = filter === t.id
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(t.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      active
                        ? 'bg-brand-500 text-white shadow-glow'
                        : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <span>{t.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold tabular-nums ${
                        active ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {t.count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Tìm kiếm + nút lọc nâng cao + sắp xếp */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-sm">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Thử: đi làm, cute... hoặc 4100, 4212, 2866"
                  aria-label="Tìm kiếm sản phẩm"
                  className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan2-400/60 focus:bg-white/10"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters((v) => !v)}
                  aria-expanded={showFilters}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    showFilters || selected.size
                      ? 'border-cyan2-400/50 bg-cyan2-400/10 text-cyan2-300'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Bộ lọc{selected.size ? ` (${selected.size})` : ''}
                </button>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  aria-label="Sắp xếp"
                  className="rounded-full border border-white/10 bg-ink-800 py-2 pl-3 pr-8 text-sm font-semibold text-white outline-none focus:border-cyan2-400/60"
                >
                  {sortOptions.map((o) => (
                    <option key={o.id} value={o.id} className="bg-ink-800">
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Panel facet nâng cao */}
            <AnimatePresence initial={false}>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex flex-col gap-5">
                      {facetGroups.map((g) => (
                        <div key={g.id}>
                          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">{g.label}</p>
                          <div className="flex flex-wrap gap-2">
                            {g.facets.map((f) => {
                              const on = selected.has(f.id)
                              const count = facetCount.get(f.id) ?? 0
                              if (count === 0) return null
                              return (
                                <button
                                  key={f.id}
                                  onClick={() => toggleFacet(f.id)}
                                  aria-pressed={on}
                                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
                                    on
                                      ? 'border-brand-500 bg-brand-500/15 text-brand-200'
                                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white'
                                  }`}
                                >
                                  {on && <Check className="h-3.5 w-3.5" />}
                                  {f.label}
                                  <span className="text-xs text-slate-500">{count}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dòng kết quả + xoá lọc */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-400" aria-live="polite">
                Hiển thị <span className="font-semibold text-white tabular">{filtered.length}</span> sản phẩm
              </p>
              {activeCount > 0 && (
                <button onClick={clearAll} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 hover:text-brand-200">
                  <X className="h-4 w-4" /> Xoá tất cả bộ lọc
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Lưới sản phẩm */}
        {filtered.length > 0 ? (
          <motion.div layout className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5 lg:gap-4">
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((p) => (
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
            <p className="mt-1 text-sm text-slate-400">Thử từ khoá khác hoặc bỏ bớt bộ lọc nhé.</p>
            <button onClick={clearAll} className="btn-ghost mt-5 text-sm">
              Xoá bộ lọc
            </button>
          </div>
        )}

        {remainingCount > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <ChevronDown className="h-4 w-4" />
              Xem thêm {Math.min(PAGE_SIZE, remainingCount)} sản phẩm
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
