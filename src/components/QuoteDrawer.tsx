import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, MessageCircle, Copy, Check, ClipboardList, Send, Loader2 } from 'lucide-react'
import ProductImage from './ProductImage'
import { useUI } from '../context/ui'
import { productsById } from '../data/products'
import { formatVND, site } from '../data/site'
import { quoteText, quoteTotal, submitQuote } from '../lib/quote'

export default function QuoteDrawer() {
  const { quote, quoteOpen, closeQuoteDrawer, setQty, removeFromQuote, clearQuote, quoteCount } = useUI()
  const [copied, setCopied] = useState(false)

  // Gửi báo giá thẳng về shop
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [website, setWebsite] = useState('') // honeypot chống bot
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null)

  const phoneValid = /^[0-9 +().-]{8,}$/.test(phone.trim())
  const canSend = name.trim().length >= 2 && phoneValid && quote.length > 0 && !sending

  const handleSubmit = async () => {
    if (website || !canSend) return
    setSending(true)
    setResult(null)
    const r = await submitQuote(quote, { name, phone, note })
    setSending(false)
    if (r.ok) {
      setResult({ ok: true, msg: '' })
      clearQuote()
      setName(''); setPhone(''); setNote('')
    } else {
      setResult({ ok: false, msg: r.error || 'Gửi thất bại, vui lòng thử lại.' })
    }
  }

  const inputCls =
    'w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none'

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
  const total = quoteTotal(quote)

  const copyList = async () => {
    try {
      await navigator.clipboard.writeText(quoteText(quote))
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  // Copy nội dung rồi mở Zalo/Messenger để khách dán gửi shop
  const sendVia = async (url: string) => {
    await copyList()
    window.open(url, '_blank', 'noopener,noreferrer')
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
              <button
                onClick={closeQuoteDrawer}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/10"
                aria-label="Đóng"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {result?.ok ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-cyan2-400/15">
                  <Check className="h-8 w-8 text-cyan2-400" />
                </span>
                <p className="mt-4 font-semibold text-white">Đã gửi báo giá! 🎉</p>
                <p className="mt-1 text-sm text-slate-400">
                  Shop đã nhận được và sẽ liên hệ bạn sớm qua số điện thoại bạn nhập. Cảm ơn bạn!
                </p>
                <button onClick={() => { setResult(null); closeQuoteDrawer() }} className="btn-primary mt-6 text-sm">
                  Đóng
                </button>
              </div>
            ) : items.length === 0 ? (
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
                  <button onClick={clearQuote} className="mt-4 text-xs font-semibold text-slate-400 hover:text-brand-300">
                    Xoá toàn bộ danh sách
                  </button>
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-slate-400">Tạm tính</span>
                    <span className="font-display text-xl font-extrabold text-gradient tabular">{formatVND(total)}</span>
                  </div>

                  {/* Gửi thẳng về shop — shop nhận ngay, gọi lại cho khách */}
                  <div className="mb-2 grid grid-cols-2 gap-2">
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên của bạn" className={inputCls} />
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại" inputMode="tel" className={inputCls} />
                  </div>
                  <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ghi chú (tuỳ chọn)" className={`${inputCls} mb-2`} />
                  {/* honeypot ẩn chống bot */}
                  <input value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                  {result && !result.ok && <p className="mb-2 text-xs text-red-400">{result.msg}</p>}
                  <button onClick={handleSubmit} disabled={!canSend} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {sending ? 'Đang gửi...' : 'Gửi báo giá về shop'}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-slate-500">Shop nhận ngay & gọi lại cho bạn — không cần tự nhắn.</p>

                  <div className="my-3 flex items-center gap-3 text-[11px] uppercase tracking-wide text-slate-500">
                    <span className="h-px flex-1 bg-white/10" /> hoặc gửi qua chat <span className="h-px flex-1 bg-white/10" />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <button onClick={() => sendVia(site.zalo)} className="btn-ghost w-full">
                      <MessageCircle className="h-4 w-4" /> Gửi qua Zalo (tự copy)
                    </button>
                    <div className="flex gap-2.5">
                      <button onClick={() => sendVia(site.messenger)} className="btn-ghost flex-1">
                        <MessageCircle className="h-4 w-4" /> Messenger
                      </button>
                      <button onClick={copyList} className="btn-ghost flex-1">
                        {copied ? <Check className="h-4 w-4 text-cyan2-400" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'Đã copy' : 'Copy list'}
                      </button>
                    </div>
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
