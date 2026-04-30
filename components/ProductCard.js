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
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden">
        {/* Gambar */}
        <div className="relative">
          <img
            src={product.image_url || '/placeholder.jpg'}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          {discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {product.is_featured && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
              ⭐ Unggulan
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
            {product.title}
          </p>
          <p className="text-orange-500 font-bold">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          {product.original_price && (
            <p className="text-gray-400 text-xs line-through">
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