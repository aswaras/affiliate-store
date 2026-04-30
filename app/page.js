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
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-pink-600 text-white py-10 md:py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-lg">🛍️ Produk Pilihan Terbaik</h1>
        <p className="text-base md:text-lg text-orange-100 drop-shadow-md">Harga terjangkau, kualitas terjamin</p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mt-6 md:mt-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari produk..."
            className="w-full pl-12 pr-4 py-3 md:py-4 rounded-full text-gray-800 outline-none text-sm md:text-base font-medium shadow-lg focus:ring-4 focus:ring-orange-300 transition"
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
      <div className="max-w-6xl mx-auto px-3 md:px-4 py-8 md:py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="text-gray-400 mt-4">Memuat produk...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">😕 Produk tidak ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}