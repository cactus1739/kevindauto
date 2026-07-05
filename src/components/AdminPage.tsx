import { useEffect, useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, Save, Search } from 'lucide-react'
import { categories, categoryLabel, type Category } from '../data/products'

interface AdminResult {
  id: string
  code: string
  name: string
  category: Category
  tags: string[]
  price: number
  image?: string
}

const BLOCK_SIZE = 100
const MAX_CODE = 4500
const BLOCKS = Array.from({ length: Math.ceil(MAX_CODE / BLOCK_SIZE) }, (_, i) => i * BLOCK_SIZE)

export default function AdminPage() {
  const [query, setQuery] = useState('')
  const [rangeStart, setRangeStart] = useState<number | null>(null)
  const [results, setResults] = useState<AdminResult[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<AdminResult | null>(null)
  const [editName, setEditName] = useState('')
  const [editCategory, setEditCategory] = useState<Category>('nam')
  const [editTags, setEditTags] = useState('')
  const [editPrice, setEditPrice] = useState('')
  const [saving, setSaving] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const params =
          rangeStart !== null
            ? `from=${rangeStart}&to=${rangeStart + BLOCK_SIZE - 1}`
            : `q=${encodeURIComponent(query)}`
        const res = await fetch(`/api/admin/search?${params}`)
        const data = await res.json()
        setResults(data.results ?? [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 250)
    return () => clearTimeout(timer)
  }, [query, rangeStart])

  const selectBlock = (start: number) => {
    setQuery('')
    setRangeStart(start)
  }

  const selectProduct = (product: AdminResult) => {
    setSelected(product)
    setEditName(product.name)
    setEditCategory(product.category)
    setEditTags(product.tags.join(', '))
    setEditPrice(String(product.price))
    setSaving('idle')
    setErrorMsg('')
  }

  const save = async () => {
    if (!selected || !editName.trim()) return
    const price = Number(editPrice)
    if (!Number.isFinite(price) || price <= 0) {
      setSaving('error')
      setErrorMsg('Giá không hợp lệ')
      return
    }
    setSaving('saving')
    setErrorMsg('')
    const tags = editTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: selected.code, name: editName.trim(), category: editCategory, tags, price }),
      })
      const data = await res.json()
      if (data.ok) {
        setSaving('saved')
        const updated = { ...selected, name: editName.trim(), category: editCategory, tags, price }
        setSelected(updated)
        setResults((prev) => prev.map((r) => (r.id === selected.id ? updated : r)))
      } else {
        setSaving('error')
        setErrorMsg(data.error || 'Có lỗi xảy ra')
      }
    } catch (err) {
      setSaving('error')
      setErrorMsg(String(err))
    }
  }

  return (
    <main className="min-h-screen bg-ink-950 text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-ink-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-4">
          <a
            href="/"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/5 hover:bg-white/10"
            aria-label="Về trang chủ"
          >
            <ArrowLeft className="h-5 w-5" />
          </a>
          <div>
            <h1 className="font-display text-lg font-bold">Quản trị sản phẩm</h1>
            <p className="text-xs text-slate-400">
              Chỉ hoạt động khi chạy <code className="text-brand-300">npm run dev</code> trên máy — không có trên bản
              web thật.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-6">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setRangeStart(null)
              setQuery(e.target.value)
            }}
            placeholder="Tìm theo mã hoặc tên sản phẩm..."
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-sm font-medium outline-none focus:border-brand-400"
          />
        </label>

        <div className="mt-3">
          <span className="mb-1.5 block text-xs font-semibold text-slate-400">Duyệt theo nhóm mã:</span>
          <div className="flex flex-wrap gap-1.5">
            {BLOCKS.map((start) => (
              <button
                key={start}
                type="button"
                onClick={() => selectBlock(start)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold tabular transition ${
                  rangeStart === start ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {String(start).padStart(4, '0')}
              </button>
            ))}
          </div>
        </div>

        {rangeStart !== null && (
          <div className="mt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => selectBlock(Math.max(0, rangeStart - BLOCK_SIZE))}
              disabled={rangeStart === 0}
              className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" /> Nhóm trước
            </button>
            <span className="text-xs text-slate-500">
              Đang xem {String(rangeStart).padStart(4, '0')} - {String(rangeStart + BLOCK_SIZE - 1).padStart(4, '0')}
            </span>
            <button
              type="button"
              onClick={() => selectBlock(rangeStart + BLOCK_SIZE)}
              className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Nhóm sau <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="max-h-[65vh] overflow-y-auto rounded-2xl border border-white/10">
            {loading && <p className="p-4 text-sm text-slate-400">Đang tìm...</p>}
            {!loading && results.length === 0 && (
              <p className="p-4 text-sm text-slate-400">Gõ mã/tên hoặc chọn 1 nhóm mã bên trên để bắt đầu.</p>
            )}
            <ul>
              {results.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => selectProduct(r)}
                    className={`flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left transition hover:bg-white/5 ${
                      selected?.id === r.id ? 'bg-brand-500/10' : ''
                    }`}
                  >
                    <span className="h-14 w-11 shrink-0 overflow-hidden rounded-lg bg-white/10">
                      {r.image && <img src={r.image} alt="" className="h-full w-full object-cover" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{r.name}</span>
                      <span className="block text-xs text-slate-400">
                        #{r.code} · {categoryLabel[r.category]}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 p-5">
            {!selected ? (
              <p className="text-sm text-slate-400">Chọn 1 sản phẩm bên trái để sửa.</p>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <span className="mx-auto block aspect-[3/4] max-h-[294px] w-full max-w-[224px] overflow-hidden rounded-2xl bg-white/10">
                    {selected.image && (
                      <img src={selected.image} alt="" className="h-full w-full object-contain" />
                    )}
                  </span>
                  <p className="mt-2 text-center text-xs text-slate-400">Mã {selected.code}</p>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-300">Tên sản phẩm</span>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm outline-none focus:border-brand-400"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-300">Danh mục</span>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as Category)}
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm outline-none focus:border-brand-400"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id} className="bg-ink-900">
                        {c.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-300">
                    Tag (cách nhau bằng dấu phẩy)
                  </span>
                  <input
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="vd: nữ, streetwear, cô gái đội mũ"
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm outline-none focus:border-brand-400"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-300">Giá (₫)</span>
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm outline-none focus:border-brand-400"
                  />
                </label>

                <button
                  type="button"
                  onClick={save}
                  disabled={saving === 'saving' || !editName.trim()}
                  className="btn-primary justify-center disabled:opacity-60"
                >
                  {saving === 'saving' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Lưu thay đổi
                </button>

                {saving === 'saved' && (
                  <p className="text-sm text-cyan2-400">Đã lưu vào file dữ liệu.</p>
                )}
                {saving === 'error' && <p className="text-sm text-brand-300">Lỗi: {errorMsg}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
