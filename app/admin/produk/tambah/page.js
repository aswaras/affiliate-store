'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function TambahProduk() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', price: '', original_price: '',
    image_url: '', affiliate_link: '', platform: 'Shopee',
    category_id: '', is_featured: false, is_active: true
  })
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchCategories()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) router.push('/admin/login')
  }

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').neq('slug', 'semua')
    setCategories(data || [])
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('products').insert({
      ...form,
      price: parseInt(form.price),
      original_price: form.original_price ? parseInt(form.original_price) : null,
      category_id: form.category_id || null,
    })

    if (error) {
      alert('Gagal menyimpan: ' + error.message)
    } else {
      alert('Produk berhasil ditambahkan!')
      router.push('/admin')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-xl font-bold mb-6">➕ Tambah Produk</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Nama Produk *</label>
            <input name="title" value={form.title} onChange={handleChange} required
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:border-orange-400"
              placeholder="Nama produk lengkap" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3}
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:border-orange-400"
              placeholder="Deskripsi singkat produk" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Harga Jual (Rp) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} required
                className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:border-orange-400"
                placeholder="50000" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Harga Asli (Rp)</label>
              <input name="original_price" type="number" value={form.original_price} onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:border-orange-400"
                placeholder="75000 (opsional)" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">URL Gambar *</label>
            <input name="image_url" value={form.image_url} onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:border-orange-400"
              placeholder="https://..." />
            {form.image_url && (
              <img src={form.image_url} className="mt-2 h-32 object-cover rounded-lg" alt="preview" />
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Link Afiliasi *</label>
            <input name="affiliate_link" value={form.affiliate_link} onChange={handleChange} required
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:border-orange-400"
              placeholder="https://shopee.co.id/..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Platform</label>
              <select name="platform" value={form.platform} onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:border-orange-400">
                {['Shopee', 'Tokopedia', 'Lazada', 'TikTok', 'Lainnya'].map(p => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Kategori</label>
              <select name="category_id" value={form.category_id} onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:border-orange-400">
                <option value="">-- Pilih Kategori --</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} />
              <span className="text-sm">⭐ Produk Unggulan</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
              <span className="text-sm">✅ Aktifkan Produk</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => router.push('/admin')}
              className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl">
              Batal
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold disabled:opacity-50">
              {loading ? 'Menyimpan...' : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}