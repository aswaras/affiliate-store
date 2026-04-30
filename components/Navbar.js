'use client'
import Link from 'next/link'
import { ShoppingBag, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'light'
    const isDarkMode = savedTheme === 'dark'
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  function toggleTheme() {
    const newTheme = isDark ? 'light' : 'dark'
    setIsDark(!isDark)
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  if (!mounted) return null

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg sticky top-0 z-20 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-base md:text-lg hover:opacity-90 transition">
          <ShoppingBag size={24} className="md:w-[28px]" />
          <span className="hidden sm:inline">TokoAfiliasi</span>
          <span className="sm:hidden font-extrabold">Toko</span>
        </Link>
        <button
          onClick={toggleTheme}
          className="hover:bg-white hover:bg-opacity-20 px-3 md:px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
          title={isDark ? 'Tema Terang' : 'Tema Gelap'}
        >
          {isDark ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
          <span className="hidden sm:inline text-sm font-medium">
            {isDark ? 'Terang' : 'Gelap'}
          </span>
        </button>
      </div>
    </nav>
  )
}