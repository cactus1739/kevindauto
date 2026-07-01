import { Plus, Check, Eye } from 'lucide-react'
import ProductImage from './ProductImage'
import StarRating from './StarRating'
import { useUI } from '../context/ui'
import { categoryLabel, type Product } from '../data/products'
import { formatVND } from '../data/site'

const badgeStyle: Record<NonNullable<Product['badge']>, string> = {
  'Best Seller': 'bg-gold-400 text-ink-950',
  Mới: 'bg-cyan2-400 text-ink-950',
  Limited: 'bg-violet2-500 text-white',
  'Pre-order': 'bg-white/15 text-white backdrop-blur',
}

export default function ProductCard({ product }: { product: Product }) {
  const { openProduct, addToQuote, inQuote } = useUI()
  const added = inQuote(product.id)

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-card lg:rounded-2xl">
      {/* Ảnh */}
      <button
        type="button"
        onClick={() => openProduct(product)}
        className="relative aspect-[4/5] w-full overflow-hidden text-left"
        aria-label={`Xem chi tiết ${product.name}`}
      >
        <ProductImage
          accent={product.accent}
          category={product.category}
          series={product.series}
          image={product.image}
          name={product.name}
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* Badge */}
        <div className="absolute left-1.5 top-1.5 flex flex-col gap-1 lg:left-3 lg:top-3 lg:gap-1.5">
          {product.badge && (
            <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold lg:px-2.5 lg:py-1 lg:text-[11px] ${badgeStyle[product.badge]}`}>
              {product.badge}
            </span>
          )}
        </div>

        {!product.inStock && (
          <span className="absolute right-1.5 top-1.5 hidden rounded-full bg-ink-950/80 px-2.5 py-1 text-[11px] font-semibold text-slate-200 backdrop-blur lg:block lg:right-3 lg:top-3">
            Hàng đặt trước
          </span>
        )}

        {/* Overlay nút xem nhanh */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center gap-1.5 bg-gradient-to-t from-ink-950/90 to-transparent pb-3 pt-8 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Eye className="h-4 w-4" /> Xem nhanh
        </span>
      </button>

      {/* Nội dung */}
      <div className="flex min-w-0 flex-1 flex-col p-2 lg:p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="chip min-w-0 max-w-full truncate px-1.5 py-0.5 text-[9px] lg:px-3 lg:py-1.5 lg:text-xs">{categoryLabel[product.category]}</span>
          <span className="hidden items-center gap-1 text-xs text-slate-400 lg:flex">
            <StarRating value={product.rating} size={12} />
            <span className="tabular">({product.reviews})</span>
          </span>
        </div>

        <h3 className="mt-1.5 line-clamp-2 min-h-8 text-xs font-semibold leading-4 text-white lg:mt-3 lg:min-h-0 lg:text-base lg:leading-snug">
          <button type="button" onClick={() => openProduct(product)} className="text-left hover:text-brand-200">
            {product.name}
          </button>
        </h3>
        <p className="mt-1 truncate text-[10px] text-slate-400 lg:text-xs">
          <span className="hidden lg:inline">{product.series} · </span>Mã {product.code}
        </p>

        {/* Giá */}
        <div className="mt-2 flex items-end gap-2 lg:mt-3">
          <span className="font-display text-sm font-bold text-white tabular lg:text-lg">{formatVND(product.price)}</span>
        </div>

        {/* Nút hành động */}
        <div className="mt-2 flex items-center gap-1.5 pt-0 lg:mt-4 lg:gap-2">
          <button
            type="button"
            onClick={() => addToQuote(product.id)}
            aria-pressed={added}
            aria-label={added ? `Đã thêm ${product.name}` : `Thêm ${product.name} vào list`}
            title={added ? 'Đã thêm' : 'Thêm vào list'}
            className={`flex h-8 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-1.5 text-xs font-semibold transition-colors lg:h-10 lg:px-3 lg:text-sm ${
              added
                ? 'bg-cyan2-400/15 text-cyan2-300 ring-1 ring-inset ring-cyan2-400/40'
                : 'bg-brand-500 text-white hover:bg-brand-400'
            }`}
          >
            {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            <span className="hidden lg:inline">{added ? 'Đã thêm' : 'Thêm vào list'}</span>
          </button>
          <button
            type="button"
            onClick={() => openProduct(product)}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 lg:h-10 lg:w-10"
            aria-label={`Xem chi tiết ${product.name}`}
            title="Xem chi tiết"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
