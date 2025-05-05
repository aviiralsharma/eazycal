import React from 'react'
import Link from 'next/link'
import { Home, PlusCircle, History, User } from 'lucide-react'

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard/log', icon: PlusCircle, label: 'Log' },
  { href: '/dashboard/history', icon: History, label: 'History' },
  { href: '/dashboard/profile', icon: User, label: 'Profile' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      <nav className="flex items-center justify-around border-t border-gray-200 bg-white py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center p-2 text-gray-600 hover:text-indigo-600"
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
} 