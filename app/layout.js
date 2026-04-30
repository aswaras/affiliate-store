import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Toko Afiliasi — Produk Pilihan Terbaik',
  description: 'Temukan produk terbaik dengan harga terjangkau',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  )
}