import { MessageCircle, Eye } from 'lucide-react'
import ProductImage from './ProductImage'
import StarRating from './StarRating'
import { useUI } from '../context/ui'
import { categoryLabel, type Product } from '../data/products'
import { formatVND, site } from '../data/site'

const badgeStyle: Record<NonNullable<Product['badge']>, string> = {
  'Best Seller': 'bg-gold-400 text-ink-950',
  Mới: 'bg-cyan2-400 text-ink-950',
  Limited: 'bg-violet2-500 text-white',
  'Pre-order': 'bg-white/15 text-white backdrop-blur',
  Sale: 'bg-brand-500 text-white',
}

export default function ProductCard({ product }: { product: Product }) {
  const { openProduct } = useUI()
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-card">
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
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${badgeStyle[product.badge]}`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-bold text-white">-{discount}%</span>
          )}
        </div>

        {!product.inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-ink-950/80 px-2.5 py-1 text-[11px] font-semibold text-slate-200 backdrop-blur">
            Hàng đặt trước
          </span>
        )}

        {/* Overlay nút xem nhanh */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center gap-1.5 bg-gradient-to-t from-ink-950/90 to-transparent pb-3 pt-8 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Eye className="h-4 w-4" /> Xem nhanh
        </span>
      </button>

      {/* Nội dung */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="chip">{categoryLabel[product.category]}</span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <StarRating value={product.rating} size={12} />
            <span className="tabular">({product.reviews})</span>
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 font-semibold leading-snug text-white">
          <button type="button" onClick={() => openProduct(product)} className="text-left hover:text-brand-200">
            {product.name}
          </button>
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          {product.series} · Tỉ lệ {product.scale}
        </p>

        {/* Giá */}
        <div className="mt-3 flex items-end gap-2">
          <span className="font-display text-lg font-bold text-white tabular">{formatVND(product.price)}</span>
          {product.oldPrice && (
            <span className="mb-0.5 text-sm text-slate-500 line-through tabular">{formatVND(product.oldPrice)}</span>
          )}
        </div>

        {/* Nút hành động */}
        <div className="mt-4 flex items-center gap-2 pt-0">
          <a
            href={site.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-500 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400"
          >
            <MessageCircle className="h-4 w-4" /> Đặt ngay
          </a>
          <button
            type="button"
            onClick={() => openProduct(product)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            aria-label={`Xem chi tiết ${product.name}`}
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
