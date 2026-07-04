import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, MessageCircle, Check, ClipboardList, Download, LoaderCircle } from 'lucide-react'
import ProductImage from './ProductImage'
import { useUI } from '../context/ui'
import { productsById } from '../data/products'
import { formatVND, site } from '../data/site'
import { quoteText, quoteTotal, quoteSubtotal, quotePhoiNguoiDiscount } from '../lib/quote'

export default function QuoteDrawer() {
  const { quote, quoteOpen, closeQuoteDrawer, setQty, removeFromQuote, clearQuote, quoteCount } = useUI()
  const [pdfState, setPdfState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (!quoteOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeQuoteDrawer()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [quoteOpen, closeQuoteDrawer])

  const items = quote.map((it) => ({ ...it, product: productsById[it.id] })).filter((i) => i.product)
  const subtotal = quoteSubtotal(quote)
  const { freeQty, discountAmount } = quotePhoiNguoiDiscount(quote)
  const total = quoteTotal(quote)

  const copyList = async () => {
    try {
      await navigator.clipboard.writeText(quoteText(quote))
    } catch {
      /* bỏ qua nếu trình duyệt chặn clipboard */
    }
  }

  // Copy nội dung rồi mở Zalo/Messenger để khách dán gửi shop
  const sendVia = async (url: string) => {
    await copyList()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const downloadPdf = async () => {
    if (pdfState === 'loading') return
    setPdfState('loading')

    try {
      const { downloadQuotePdf } = await import('../lib/quotePdf')
      await downloadQuotePdf(quote)
      setPdfState('success')
      setTimeout(() => setPdfState('idle'), 2500)
    } catch {
      setPdfState('error')
    }
  }

  return (
    <AnimatePresence>
      {quoteOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Danh sách báo giá"
        >
          {/* Scrim */}
          <button aria-label="Đóng" onClick={closeQuoteDrawer} className="absolute inset-0 bg-ink-950/75 backdrop-blur-sm" />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ink-900 shadow-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500/15">
                  <ClipboardList className="h-5 w-5 text-brand-300" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold text-white">Danh sách báo giá</h2>
                  <p className="text-xs text-slate-400">{quoteCount} sản phẩm</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearQuote}
                    className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-brand-300"
                    aria-label="Xoá tất cả"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Xoá tất cả
                  </button>
                )}
                <button
                  onClick={closeQuoteDrawer}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/10"
                  aria-label="Đóng"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/5">
                  <ClipboardList className="h-8 w-8 text-slate-400" />
                </span>
                <p className="mt-4 font-semibold text-white">Chưa có sản phẩm nào</p>
                <p className="mt-1 text-sm text-slate-400">Bấm “Thêm vào list” ở sản phẩm bạn thích để tạo danh sách báo giá.</p>
                <button onClick={closeQuoteDrawer} className="btn-ghost mt-6 text-sm">
                  Tiếp tục xem sản phẩm
                </button>
              </div>
            ) : (
              <>
                {/* Danh sách */}
                <div className="flex-1 overflow-y-auto p-4">
                  <ul className="flex flex-col gap-3">
                    {items.map(({ product, qty }) => (
                      <li key={product!.id} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                        <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl">
                          <ProductImage
                            accent={product!.accent}
                            category={product!.category}
                            series={product!.series}
                            image={product!.image}
                            name={product!.name}
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="truncate text-sm font-semibold text-white">{product!.name}</p>
                          <p className="text-xs text-slate-400">Mã {product!.code}</p>
                          <p className="mt-0.5 text-sm font-bold text-brand-300 tabular">{formatVND(product!.price)}</p>
                          <div className="mt-auto flex items-center justify-between pt-1.5">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setQty(product!.id, qty - 1)}
                                className="grid h-7 w-7 place-items-center rounded-lg border border-white/15 text-white hover:bg-white/10"
                                aria-label="Giảm"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold text-white tabular">{qty}</span>
                              <button
                                onClick={() => setQty(product!.id, qty + 1)}
                                className="grid h-7 w-7 place-items-center rounded-lg border border-white/15 text-white hover:bg-white/10"
                                aria-label="Tăng"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromQuote(product!.id)}
                              className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-brand-300"
                              aria-label="Xoá"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 p-5">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-slate-400">Tạm tính</span>
                    <span className="text-sm text-slate-300 tabular">{formatVND(subtotal)}</span>
                  </div>
                  {freeQty > 0 && (
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm text-cyan2-400">🎁 Ưu đãi phôi người (cứ 11 tặng 1)</span>
                      <span className="text-sm font-semibold text-cyan2-400 tabular">
                        -{freeQty} phôi (-{formatVND(discountAmount)})
                      </span>
                    </div>
                  )}
                  <div className="mb-3 flex items-center justify-between border-t border-white/10 pt-2">
                    <span className="text-sm font-semibold text-white">Thành tiền</span>
                    <span className="font-display text-xl font-extrabold text-gradient tabular">{formatVND(total)}</span>
                  </div>
                  <p className="mb-3 text-xs text-slate-400">
                    Bấm gửi → nội dung danh sách tự được sao chép, bạn chỉ cần <span className="text-slate-200">dán vào khung chat</span> gửi shop để được chốt đơn.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex gap-2.5">
                      <button
                        onClick={downloadPdf}
                        disabled={pdfState === 'loading'}
                        className="btn-ghost flex-1 disabled:cursor-wait disabled:opacity-70"
                      >
                        {pdfState === 'loading' ? (
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : pdfState === 'success' ? (
                          <Check className="h-4 w-4 text-cyan2-400" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                        {pdfState === 'loading' ? 'Đang tạo...' : pdfState === 'success' ? 'Đã tải PDF' : 'Tải PDF'}
                      </button>
                      <button onClick={() => sendVia(site.zalo)} className="btn-ghost flex-1">
                        <MessageCircle className="h-4 w-4" /> Zalo
                      </button>
                    </div>
                    {pdfState === 'error' && (
                      <p className="text-center text-xs text-brand-300">
                        Chưa tạo được PDF. Vui lòng thử lại hoặc dùng trình duyệt khác.
                      </p>
                    )}
                    <button onClick={() => sendVia(site.messenger)} className="btn-primary w-full">
                      <MessageCircle className="h-4 w-4" /> Gửi báo giá qua Messenger
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
