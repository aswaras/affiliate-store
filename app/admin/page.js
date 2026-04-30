'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, MousePointer, PlusCircle, LogOut } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, clicks: 0, categories: 0 })
  const [products, setProducts] = useState([])
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchStats()
    fetchProducts()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) router.push('/admin/login')
  }

  async function fetchStats() {
    const [{ count: prodCount }, { count: clickCount }, { count: catCount }] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('click_logs').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
    ])
    setStats({ products: prodCount, clicks: clickCount, categories: catCount })
  }

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)
    setProducts(data || [])
  }

  async function toggleActive(id, current) {
    await supabase.from('products').update({ is_active: !current }).eq('id', id)
    fetchProducts()
  }

  async function deleteProduct(id) {
    if (!confirm('Hapus produk ini?')) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
    fetchStats()
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">⚙️ Admin Panel</h1>
        <div className="flex gap-3">
          <Link href="/" className="text-sm text-gray-500">Lihat Toko →</Link>
          <button onClick={handleLogout} className="text-red-500 flex items-center gap-1 text-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Produk', value: stats.products, icon: <Package />, color: 'bg-blue-500' },
            { label: 'Total Klik', value: stats.clicks, icon: <MousePointer />, color: 'bg-green-500' },
            { label: 'Kategori', value: stats.categories, icon: '📂', color: 'bg-purple-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tombol Tambah */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Daftar Produk</h2>
          <Link
            href="/admin/produk/tambah"
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold"
          >
            <PlusCircle size={16} /> Tambah Produk
          </Link>
        </div>

        {/* Tabel Produk */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3">Produk</th>
                <th className="text-left p-3">Harga</th>
                <th className="text-left p-3">Platform</th>
                <th className="text-left p-3">Klik</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {p.image_url && (
                        <img src={p.image_url} className="w-10 h-10 rounded object-cover" />
                      )}
                      <span className="font-medium line-clamp-1 max-w-xs">{p.title}</span>
                    </div>
                  </td>
                  <td className="p-3">Rp {p.price.toLocaleString('id-ID')}</td>
                  <td className="p-3">{p.platform}</td>
                  <td className="p-3">{p.click_count}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleActive(p.id, p.is_active)}
                      className={`px-2 py-1 rounded-full text-xs font-bold ${p.is_active ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}
                    >
                      {p.is_active ? 'Aktif' : 'Nonaktif'}
                    </button>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/produk/${p.id}/edit`}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="text-red-500 hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}