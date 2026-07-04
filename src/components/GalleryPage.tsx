import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, Check, ClipboardPlus, Hash, Image, Search, X } from 'lucide-react'
import { categories, categoryLabel, products, type Category } from '../data/products'
import { useUI } from '../context/ui'

const PAGE_SIZE = 60
const CODE_JUMPS = Array.from({ length: 45 }, (_, index) => 4400 - index * 100)

export default function GalleryPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [pendingJumpIndex, setPendingJumpIndex] = useState<number | null>(null)
  const [codeRailOpen, setCodeRailOpen] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const { openProduct, toggleQuote, inQuote } = useUI()

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('vi')
    return products
      .filter((product) => {
        if (category !== 'all' && product.category !== category) return false
        if (!normalizedQuery) return true
        return [product.name, product.code, product.series, ...product.tags]
          .join(' ')
          .toLocaleLowerCase('vi')
          .includes(normalizedQuery)
      })
      .sort((a, b) => Number(b.code) - Number(a.code))
  }, [category, query])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
    setPendingJumpIndex(null)
  }, [category, query])

  useEffect(() => {
    const target = loadMoreRef.current
    if (!target || visibleCount >= filteredProducts.length) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((count) => Math.min(count + PAGE_SIZE, filteredProducts.length))
        }
      },
      { rootMargin: '700px 0px' },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [filteredProducts.length, visibleCount])

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  useEffect(() => {
    if (pendingJumpIndex === null || pendingJumpIndex >= visibleCount) return

    const frame = requestAnimationFrame(() => {
      document.getElementById(`gallery-product-${pendingJumpIndex}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      setPendingJumpIndex(null)
      setCodeRailOpen(false)
    })

    return () => cancelAnimationFrame(frame)
  }, [pendingJumpIndex, visibleCount])

  const jumpToCode = (code: number) => {
    if (filteredProducts.length === 0) return

    const matchingIndex = filteredProducts.findIndex((product) => Number(product.code) <= code)
    const targetIndex = matchingIndex >= 0 ? matchingIndex : filteredProducts.length - 1
    setVisibleCount((count) => Math.max(count, targetIndex + 1))
    setPendingJumpIndex(targetIndex)
  }

  return (
    <main className="min-h-screen bg-[#f6f5f2] text-ink-950">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f6f5f2]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1720px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="/"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink-950 shadow-sm transition hover:-translate-x-0.5 hover:shadow-md"
            aria-label="Về trang chủ"
          >
            <ArrowLeft className="h-5 w-5" />
          </a>
          <a href="/" className="hidden shrink-0 font-display text-sm font-extrabold tracking-tight sm:block">
            KEVIN <span className="text-brand-500">ĐẦU TO</span>
          </a>
          <label className="relative mx-auto block w-full max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Tìm mẫu, mã sản phẩm, phong cách..."
              className="h-12 w-full rounded-full border border-black/5 bg-white pl-12 pr-11 text-sm font-medium text-ink-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-300 focus:ring-4 focus:ring-brand-500/10"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                aria-label="Xóa tìm kiếm"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
          <span className="hidden shrink-0 text-xs font-bold text-slate-500 md:block">
            {filteredProducts.length.toLocaleString('vi-VN')} mẫu
          </span>
        </div>

        <div className="no-scrollbar mx-auto flex max-w-[1720px] gap-2 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8">
          <FilterButton active={category === 'all'} onClick={() => setCategory('all')}>
            Tất cả
          </FilterButton>
          {categories.map((item) => (
            <FilterButton key={item.id} active={category === item.id} onClick={() => setCategory(item.id)}>
              {item.label}
            </FilterButton>
          ))}
        </div>
      </header>

      <CodeRail onJump={jumpToCode} open={codeRailOpen} />
      <button
        type="button"
        onClick={() => setCodeRailOpen((open) => !open)}
        className="fixed bottom-20 right-3 z-50 grid h-12 w-12 place-items-center rounded-full bg-ink-950 text-white shadow-xl md:hidden"
        aria-label={codeRailOpen ? 'Đóng thanh chọn mã' : 'Mở thanh chọn mã'}
        aria-expanded={codeRailOpen}
      >
        {codeRailOpen ? <X className="h-5 w-5" /> : <Hash className="h-5 w-5" />}
      </button>

      <section className="mx-auto max-w-[1720px] px-3 pb-20 pt-7 sm:px-5 lg:px-7" aria-label="Thư viện sản phẩm">
        <div className="mb-7 px-1 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Khám phá bằng hình ảnh</p>
          <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-4xl">
            Một thế giới mô hình, trong một cú cuộn
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Chạm vào ảnh để xem chi tiết. Lưu những mẫu bạn thích vào danh sách báo giá.
          </p>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {visibleProducts.map((product, index) => {
              const selected = inQuote(product.id)
              return (
                <article
                  key={`${product.id}-${index}`}
                  id={`gallery-product-${index}`}
                  className="group min-w-0 scroll-mt-36"
                >
                  <div className="relative overflow-hidden rounded-[18px] bg-[#deddda] shadow-[0_2px_10px_rgba(20,20,30,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,20,30,0.18)] sm:rounded-[22px]">
                    <button
                      type="button"
                      onClick={() => openProduct(product)}
                      className="block aspect-[3/4] w-full overflow-hidden"
                      aria-label={`Xem ${product.name}`}
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center bg-slate-200 text-slate-400">
                          <Image className="h-10 w-10" />
                        </div>
                      )}
                    </button>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/5 opacity-0 transition duration-300 group-hover:opacity-100" />
                    <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                      #{product.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleQuote(product.id)}
                      className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full shadow-lg backdrop-blur-md transition ${
                        selected
                          ? 'bg-brand-500 text-white'
                          : 'bg-white/90 text-ink-950 opacity-100 hover:scale-105 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100'
                      }`}
                      aria-label={selected ? 'Bỏ khỏi danh sách báo giá' : 'Thêm vào danh sách báo giá'}
                      aria-pressed={selected}
                    >
                      {selected ? <Check className="h-5 w-5" /> : <ClipboardPlus className="h-5 w-5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => openProduct(product)}
                      className="absolute inset-x-0 bottom-0 hidden px-4 pb-4 pt-12 text-left text-white opacity-0 transition duration-300 group-hover:opacity-100 sm:block"
                    >
                      <span className="line-clamp-2 block text-sm font-bold leading-snug">{product.name}</span>
                      <span className="mt-1 block text-[11px] font-medium text-white/70">
                        {categoryLabel[product.category]} · {product.series}
                      </span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => openProduct(product)}
                    className="w-full px-1.5 pb-1 pt-2 text-left sm:hidden"
                  >
                    <span className="line-clamp-2 block text-xs font-bold leading-snug">{product.name}</span>
                  </button>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="mx-auto grid min-h-[45vh] max-w-lg place-items-center text-center">
            <div>
              <Search className="mx-auto h-10 w-10 text-slate-300" />
              <h2 className="mt-4 text-xl font-bold">Chưa tìm thấy mẫu phù hợp</h2>
              <p className="mt-2 text-sm text-slate-500">Thử từ khóa ngắn hơn hoặc chọn một danh mục khác nhé.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setCategory('all')
                }}
                className="mt-5 rounded-full bg-ink-950 px-5 py-2.5 text-sm font-bold text-white"
              >
                Xem tất cả sản phẩm
              </button>
            </div>
          </div>
        )}

        <div ref={loadMoreRef} className="h-8" aria-hidden="true" />
        {visibleCount < filteredProducts.length && (
          <p className="text-center text-sm font-semibold text-slate-400">Đang tải thêm hình ảnh…</p>
        )}
      </section>
    </main>
  )
}

function CodeRail({ onJump, open }: { onJump: (code: number) => void; open: boolean }) {
  return (
    <aside
      className={`fixed bottom-36 right-3 top-36 z-30 w-[58px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/90 py-2 shadow-xl backdrop-blur-xl md:flex ${
        open ? 'flex' : 'hidden'
      }`}
      aria-label="Chọn nhanh theo mã sản phẩm"
    >
      <span className="mb-1 px-1 text-center text-[9px] font-extrabold uppercase tracking-wider text-brand-600">
        Mã
      </span>
      <div className="no-scrollbar flex flex-1 flex-col gap-1 overflow-y-auto px-1.5">
        {CODE_JUMPS.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => onJump(code)}
            className="h-7 shrink-0 rounded-lg text-[10px] font-extrabold tabular text-slate-500 transition hover:bg-ink-950 hover:text-white focus:bg-ink-950 focus:text-white"
            aria-label={`Đi tới mã ${String(code).padStart(4, '0')}`}
          >
            {String(code).padStart(4, '0')}
          </button>
        ))}
      </div>
    </aside>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
        active
          ? 'bg-ink-950 text-white shadow-md'
          : 'border border-black/5 bg-white text-slate-600 shadow-sm hover:text-ink-950'
      }`}
    >
      {children}
    </button>
  )
}
