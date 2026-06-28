import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Product } from '../data/products'

interface UIContextValue {
  activeProduct: Product | null
  openProduct: (p: Product) => void
  closeProduct: () => void
}

const UIContext = createContext<UIContextValue | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)

  const openProduct = useCallback((p: Product) => setActiveProduct(p), [])
  const closeProduct = useCallback(() => setActiveProduct(null), [])

  return (
    <UIContext.Provider value={{ activeProduct, openProduct, closeProduct }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}
