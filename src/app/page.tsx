import React from 'react'
import Link from 'next/link'
import { PageTransition } from '@/components/motion/page-transition'
import { Button } from '@/components/ui/button'

export default function WelcomePage() {
  return (
    <PageTransition className="flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to EazyCal
        </h1>
        <p className="text-xl text-gray-600">
          The Easiest Way to Track What You Eat
        </p>
        <Link href="/onboarding/goal" className="w-full max-w-sm">
          <Button fullWidth size="lg">
            Let's Get Started
          </Button>
        </Link>
      </div>
    </PageTransition>
  )
} 