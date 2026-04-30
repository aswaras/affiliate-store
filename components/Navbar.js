'use client'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-base md:text-lg hover:opacity-90 transition">
          <ShoppingBag size={24} className="md:w-[28px]" />
          <span className="hidden sm:inline">TokoAfiliasi</span>
          <span className="sm:hidden font-extrabold">Toko</span>
        </Link>
        <div className="flex items-center gap-1 md:gap-4 text-xs md:text-sm">
          <Link href="/" className="hover:bg-white hover:bg-opacity-20 px-3 md:px-4 py-2 rounded-lg transition duration-200">Beranda</Link>
          <Link href="/admin/login" className="hover:bg-white hover:bg-opacity-20 px-3 md:px-4 py-2 rounded-lg transition duration-200">Admin</Link>
        </div>
      </div>
    </nav>
  )
}