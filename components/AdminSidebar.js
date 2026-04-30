'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, PlusCircle, Tag } from 'lucide-react'

export default function AdminSidebar() {
  const pathname = usePathname()

  const menus = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: '/admin/produk/tambah', label: 'Tambah Produk', icon: <PlusCircle size={18} /> },
  ]

  return (
    <aside className="w-48 bg-white shadow-sm min-h-screen p-4">
      <div className="font-bold text-orange-500 mb-6 text-lg">⚙️ Admin</div>
      <nav className="space-y-1">
        {menus.map(m => (
          <Link
            key={m.href}
            href={m.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition
              ${pathname === m.href
                ? 'bg-orange-50 text-orange-500 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            {m.icon}
            {m.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}