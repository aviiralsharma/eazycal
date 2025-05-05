'use client'

import React from 'react'
import Link from 'next/link'
import { PageTransition } from '@/components/motion/page-transition'
import { Button } from '@/components/ui/button'
import { Mic, Camera, PenLine } from 'lucide-react'

const loggingMethods = [
  {
    id: 'voice',
    title: 'Voice Logging',
    description: 'Just speak what you ate - it\'s that simple!',
    icon: <Mic className="w-6 h-6" />,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: 'photo',
    title: 'Photo Recognition',
    description: 'Snap a photo and we\'ll identify your meal',
    icon: <Camera className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'manual',
    title: 'Manual Entry',
    description: 'Type and search from our extensive food database',
    icon: <PenLine className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600',
  },
]

export default function LoggingPage() {
  return (
    <PageTransition className="flex flex-col min-h-full p-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Multiple Ways to Log Calories
        </h1>
        <p className="text-gray-600 mb-8">
          We make calorie tracking effortless with these convenient methods
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          {loggingMethods.map((method) => (
            <div
              key={method.id}
              className="p-4 rounded-2xl border-2 border-gray-100 bg-white"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${method.color}`}>
                  {method.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {method.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Link href="/onboarding/activity" className="w-full block">
          <Button
            fullWidth
            size="lg"
          >
            Continue
          </Button>
        </Link>
      </div>
    </PageTransition>
  )
} 