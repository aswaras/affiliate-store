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

  if (!product) return <div className="text-center py-20">Memuat...</div>

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link href="/" className="flex items-center gap-2 p-4 text-gray-600">
          <ArrowLeft size={20} /> Kembali ke Toko
        </Link>

        {/* Gambar */}
        <img
          src={product.image_url}
          alt={product.title}
          className="w-full max-h-96 object-cover"
        />

        {/* Info Produk */}
        <div className="bg-white p-4 mt-2 rounded-xl mx-4">
          <h1 className="text-lg font-bold text-gray-800">{product.title}</h1>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl font-bold text-orange-500">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
            {discount && (
              <span className="bg-red-100 text-red-500 text-sm font-bold px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
          </div>
          {product.original_price && (
            <p className="text-gray-400 text-sm line-through">
              Rp {product.original_price.toLocaleString('id-ID')}
            </p>
          )}

          {product.description && (
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-600"
          >
            <Share2 size={18} /> Share
          </button>

          
            href={`https://wa.me/628xxxxxxxxxx?text=Halo, saya tertarik dengan produk: ${product.title}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl"
          >
            <MessageCircle size={18} /> Tanya
          </a>

          <button
            onClick={handleBeli}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-xl font-bold"
          >
            <ShoppingCart size={18} />
            Beli di {product.platform}
          </button>
        </div>
      </div>
    </div>
  )
}