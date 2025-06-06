'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-600 mb-8">
        {error.message || 'An unexpected error occurred'}
      </p>
      <Button onClick={reset}>
        Try again
      </Button>
    </div>
  )
} 