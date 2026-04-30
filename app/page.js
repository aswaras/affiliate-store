'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import Navbar from '@/components/Navbar'
import { Search } from 'lucide-react'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('semua')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [activeCategory, search])

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*')
    setCategories(data || [])
  }

  async function fetchProducts() {
    setLoading(true)
    let query = supabase
      .from('products')
      .select('*, categories(name)')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (activeCategory !== 'semua') {
      const cat = categories.find(c => c.slug === activeCategory)
      if (cat) query = query.eq('category_id', cat.id)
    }
    if (search) {
      query = query.ilike('title', `%${search}%`)
    }

    const { data } = await query
    setProducts(data || [])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">🛍️ Produk Pilihan Terbaik</h1>
        <p className="text-orange-100">Harga terjangkau, kualitas terjamin</p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mt-6 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari produk..."
            className="w-full pl-10 pr-4 py-3 rounded-full text-gray-800 outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Kategori */}
      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Grid Produk */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-20 text-gray-400">Memuat produk...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">Produk tidak ditemukan</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}