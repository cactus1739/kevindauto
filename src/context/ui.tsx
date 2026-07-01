import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { Product } from '../data/products'
import { productsById } from '../data/products'

export interface QuoteItem {
  id: string
  qty: number
}

interface UIContextValue {
  // Modal chi tiết sản phẩm
  activeProduct: Product | null
  openProduct: (p: Product) => void
  closeProduct: () => void

  // Danh sách báo giá (giống giỏ hàng)
  quote: QuoteItem[]
  quoteCount: number
  inQuote: (id: string) => boolean
  addToQuote: (id: string) => void
  toggleQuote: (id: string) => void
  removeFromQuote: (id: string) => void
  setQty: (id: string, qty: number) => void
  clearQuote: () => void
  quoteOpen: boolean
  openQuoteDrawer: () => void
  closeQuoteDrawer: () => void
}

const UIContext = createContext<UIContextValue | null>(null)
const STORAGE_KEY = 'kdt-quote'

function loadQuote(): QuoteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw) as QuoteItem[]
    // bỏ item không còn tồn tại / dữ liệu hỏng
    return arr.filter((i) => i && typeof i.id === 'string' && productsById[i.id]).map((i) => ({ id: i.id, qty: Math.max(1, i.qty || 1) }))
  } catch {
    return []
  }
}

export function UIProvider({ children }: { children: ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const [quote, setQuote] = useState<QuoteItem[]>(loadQuote)
  const [quoteOpen, setQuoteOpen] = useState(false)

  const openProduct = useCallback((p: Product) => setActiveProduct(p), [])
  const closeProduct = useCallback(() => setActiveProduct(null), [])

  // Lưu localStorage mỗi khi danh sách đổi
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quote))
    } catch {
      /* bỏ qua nếu localStorage bị chặn */
    }
  }, [quote])

  const inQuote = useCallback((id: string) => quote.some((i) => i.id === id), [quote])

  const addToQuote = useCallback((id: string) => {
    setQuote((prev) => {
      const found = prev.find((i) => i.id === id)
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
      return [...prev, { id, qty: 1 }]
    })
    // Không tự mở drawer để khách thêm nhiều mẫu liên tục; badge ở navbar sẽ tăng.
  }, [])

  const removeFromQuote = useCallback((id: string) => setQuote((prev) => prev.filter((i) => i.id !== id)), [])

  const toggleQuote = useCallback((id: string) => {
    setQuote((prev) => (
      prev.some((item) => item.id === id)
        ? prev.filter((item) => item.id !== id)
        : [...prev, { id, qty: 1 }]
    ))
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setQuote((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    )
  }, [])

  const clearQuote = useCallback(() => setQuote([]), [])
  const openQuoteDrawer = useCallback(() => setQuoteOpen(true), [])
  const closeQuoteDrawer = useCallback(() => setQuoteOpen(false), [])

  const quoteCount = quote.reduce((s, i) => s + i.qty, 0)

  return (
    <UIContext.Provider
      value={{
        activeProduct,
        openProduct,
        closeProduct,
        quote,
        quoteCount,
        inQuote,
        addToQuote,
        toggleQuote,
        removeFromQuote,
        setQty,
        clearQuote,
        quoteOpen,
        openQuoteDrawer,
        closeQuoteDrawer,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}
