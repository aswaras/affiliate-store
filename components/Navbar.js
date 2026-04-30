'use client'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-orange-500 text-lg">
          <ShoppingBag size={22} />
          <span>TokoAfiliasi</span>
        </Link>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-500">Beranda</Link>
          <Link href="/admin/login" className="hover:text-orange-500">Admin</Link>
        </div>
      </div>
    </nav>
  )
}