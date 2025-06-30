import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-full p-6 relative">
      {/* Secondary Help Us Train Button - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <Link href="/prototype/voice-test-start">
          <button
            className="bg-black hover:bg-gray-800 text-white px-4 py-2.5 rounded-full font-medium text-sm transition-colors"
            style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            ⚙️ Help Us Train
          </button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to EazyCal
        </h1>
        <p className="text-xl text-gray-600">
          The Easiest Way to Track What You Eat
        </p>
        <Link href="/onboarding/goal" className="w-full max-w-sm">
          <button className="w-full bg-black hover:bg-gray-800 text-white py-4 px-4 rounded-full font-medium text-lg transition-colors">
            Let's Get Started
          </button>
        </Link>
      </div>
    </div>
  )
} 