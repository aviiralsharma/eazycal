'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen p-6 relative">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to EazyCal
        </h1>
        <p className="text-xl text-gray-600">
          The Easiest Way to Track What You Eat
        </p>
        <Link href="/signup" className="w-full max-w-sm">
          <Button>
            Let's Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
} 