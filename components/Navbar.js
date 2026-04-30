'use client'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-3 md:px-4 py-2 md:py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-orange-500 text-base md:text-lg">
          <ShoppingBag size={20} className="md:w-[22px]" />
          <span className="hidden sm:inline">TokoAfiliasi</span>
          <span className="sm:hidden">Toko</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-500 px-2 py-1">Beranda</Link>
          <Link href="/admin/login" className="hover:text-orange-500 px-2 py-1">Admin</Link>
        </div>
      </div>
    </nav>
  )
}