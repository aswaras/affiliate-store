'use client'
import Link from 'next/link'

const PLATFORM_COLORS = {
  Shopee: 'bg-orange-500',
  Tokopedia: 'bg-green-500',
  Lazada: 'bg-blue-500',
  TikTok: 'bg-black',
}

export default function ProductCard({ product }) {
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null

  return (
    <Link href={`/produk/${product.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100">
        {/* Gambar */}
        <div className="relative overflow-hidden bg-gray-200 h-40 md:h-48">
          <img
            src={product.image_url || '/placeholder.jpg'}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          {discount && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              -{discount}%
            </span>
          )}
          {product.is_featured && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              ⭐ Unggulan
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 h-10 flex items-start">
            {product.title}
          </p>
          <p className="text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          {product.original_price && (
            <p className="text-gray-400 text-xs line-through mt-1">
              Rp {product.original_price.toLocaleString('id-ID')}
            </p>
          )}

          {/* Badge Platform */}
          <div className="mt-2">
            <span className={`text-white text-xs px-2 py-1 rounded-full ${PLATFORM_COLORS[product.platform] || 'bg-gray-500'}`}>
              {product.platform}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}