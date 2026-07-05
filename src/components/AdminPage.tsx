import { useEffect, useState } from 'react'
import { ArrowLeft, Loader2, Save, Search } from 'lucide-react'
import { categoryLabel, type Category } from '../data/products'

interface AdminResult {
  id: string
  code: string
  name: string
  category: Category
  image?: string
}

export default function AdminPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<AdminResult[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<AdminResult | null>(null)
  const [editName, setEditName] = useState('')
  const [saving, setSaving] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results ?? [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 250)
    return () => clearTimeout(timer)
  }, [query])

  const selectProduct = (product: AdminResult) => {
    setSelected(product)
    setEditName(product.name)
    setSaving('idle')
    setErrorMsg('')
  }

  const save = async () => {
    if (!selected || !editName.trim()) return
    setSaving('saving')
    setErrorMsg('')
    try {
      const res = await fetch('/api/admin/rename', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: selected.code, name: editName.trim() }),
      })
      const data = await res.json()
      if (data.ok) {
        setSaving('saved')
        setSelected({ ...selected, name: editName.trim() })
        setResults((prev) => prev.map((r) => (r.id === selected.id ? { ...r, name: editName.trim() } : r)))
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo mã hoặc tên sản phẩm..."
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-sm font-medium outline-none focus:border-brand-400"
          />
        </label>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="max-h-[65vh] overflow-y-auto rounded-2xl border border-white/10">
            {loading && <p className="p-4 text-sm text-slate-400">Đang tìm...</p>}
            {!loading && results.length === 0 && (
              <p className="p-4 text-sm text-slate-400">Gõ mã hoặc tên để tìm sản phẩm.</p>
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
              <p className="text-sm text-slate-400">Chọn 1 sản phẩm bên trái để sửa tên.</p>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-white/10">
                    {selected.image && (
                      <img src={selected.image} alt="" className="h-full w-full object-cover" />
                    )}
                  </span>
                  <div>
                    <p className="text-xs text-slate-400">Mã {selected.code}</p>
                    <p className="text-xs text-slate-400">{categoryLabel[selected.category]}</p>
                  </div>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-300">Tên sản phẩm</span>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
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
                  <p className="text-sm text-cyan2-400">
                    Đã lưu vào file dữ liệu. Tag/mô tả cũng được tự cập nhật khớp tên mới.
                  </p>
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
