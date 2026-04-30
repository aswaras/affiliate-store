'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ShoppingCart, Share2, MessageCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DetailProduk({ params }) {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetchProduct()
  }, [])

  async function fetchProduct() {
    const { data } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('id', params.id)
      .single()
    setProduct(data)
  }

  async function handleBeli() {
    // Track klik
    await supabase.from('click_logs').insert({ product_id: product.id })
    await supabase.from('products').update({ click_count: product.click_count + 1 }).eq('id', product.id)
    // Buka link afiliasi
    window.open(product.affiliate_link, '_blank')
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: product.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link disalin!')
    }
  }

  if (!product) return (
    <div className="text-center py-20">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      <p className="text-gray-400 mt-4">Memuat produk...</p>
    </div>
  )

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <div className="max-w-2xl mx-auto md:bg-white md:rounded-2xl md:shadow-lg md:mt-4 md:overflow-hidden">
        {/* Header dengan Back Button */}
        <div className="bg-white sticky top-0 z-10 border-b flex items-center gap-3 p-4 md:relative md:border-b-0">
          <Link href="/" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition font-semibold">
            <ArrowLeft size={22} /> Kembali
          </Link>
        </div>

        {/* Gambar Produk */}
        <div className="relative bg-gray-200 overflow-hidden">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-auto max-h-96 object-cover"
          />
          {discount && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-4 py-2 rounded-full shadow-lg text-sm">
              -{discount}% Hemat
            </span>
          )}
        </div>

        {/* Info Produk */}
        <div className="bg-white p-4 md:p-6 space-y-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{product.title}</h1>
            
            {/* Harga */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
              {product.original_price && (
                <span className="text-lg text-gray-400 line-through">
                  Rp {product.original_price.toLocaleString('id-ID')}
                </span>
              )}
            </div>

            {/* Platform Badge */}
            <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              Platform: {product.platform}
            </div>
          </div>

          {/* Deskripsi */}
          {product.description && (
            <div className="pt-4 border-t">
              <h3 className="font-semibold text-gray-900 mb-2">Deskripsi Produk</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}
        </div>

        {/* CTA Buttons - Sticky untuk Mobile */}
        <div className="fixed md:static bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 gap-3 flex md:rounded-b-2xl shadow-2xl md:shadow-none">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-3 md:px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition"
            title="Bagikan produk"
          >
            <Share2 size={20} />
            <span className="hidden sm:inline">Bagikan</span>
          </button>

          <a
            href={`https://wa.me/628xxxxxxxxxx?text=Halo, saya tertarik dengan produk: ${product.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 px-3 md:px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition shadow-lg"
          >
            <MessageCircle size={20} />
            <span className="hidden sm:inline">Tanya</span>
          </a>

          <button
            onClick={handleBeli}
            className="flex items-center justify-center gap-2 flex-1 px-3 md:px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold transition shadow-lg"
          >
            <ShoppingCart size={20} />
            <span>Beli Sekarang</span>
          </button>
        </div>
      </div>
    </div>
  )
}