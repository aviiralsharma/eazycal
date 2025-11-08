import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#16A34A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'EazyCal - Track What You Eat',
  description: 'The Easiest Way to Track What You Eat',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'EazyCal',
  },
  icons: {
    apple: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-gradient-to-br from-[#2a1810] via-[#3d2415] to-[#1f1408] relative`}>
        <div className="fixed inset-0 bg-gradient-to-tr from-[#fbe0e0]/5 via-transparent to-[#fbfbe0]/5 pointer-events-none"></div>
        <main className="min-h-screen w-full max-w-md mx-auto bg-white shadow-lg relative z-10 scroll-container">
          {children}
        </main>
      </body>
    </html>
  )
} 