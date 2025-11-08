'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mic, Camera, PenLine, BarChart, History, Settings } from 'lucide-react'

const quickActions = [
  {
    href: '/dashboard/log?method=voice',
    icon: Mic,
    label: 'Log by Voice',
    description: 'Quick voice recording',
    color: 'bg-indigo-100 text-indigo-600',
    featured: true,
  },
  {
    href: '/dashboard/log?method=photo',
    icon: Camera,
    label: 'Log by Photo',
    description: 'Take a photo of your meal',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    href: '/dashboard/log?method=manual',
    icon: PenLine,
    label: 'Manual Entry',
    description: 'Type in your meal details',
    color: 'bg-green-100 text-green-600',
  },
]

const menuItems = [
  {
    href: '/dashboard/insights',
    icon: BarChart,
    label: 'Health Insights',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    href: '/dashboard/history',
    icon: History,
    label: 'View History',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    href: '/dashboard/settings',
    icon: Settings,
    label: 'Settings',
    color: 'bg-gray-100 text-gray-600',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome Back 👋
        </h1>
        <p className="text-gray-600">
          Track your meals easily
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {quickActions.map((action) => (
          <motion.div key={action.href} variants={item}>
            <Link href={action.href}>
              <div
                className={`
                  p-4 rounded-2xl border-2 border-gray-100
                  ${action.featured ? 'bg-indigo-50 border-indigo-100' : 'bg-white'}
                `}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${action.color}`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {action.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Quick Menu
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center p-4 rounded-xl bg-white border-2 border-gray-100"
            >
              <div className={`p-3 rounded-xl ${item.color} mb-2`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-sm text-gray-600 text-center">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 