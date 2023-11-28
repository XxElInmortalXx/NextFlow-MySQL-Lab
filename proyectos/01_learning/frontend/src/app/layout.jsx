'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import HeaderHome from '@/components/HeaderHome'
import { AuthProvider } from '@/context/auth.context'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <AuthProvider>
        <body className={inter.className}>
          <HeaderHome />
          {children}
        </body>
      </AuthProvider>
    </html>
  )
}
