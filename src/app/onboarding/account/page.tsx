'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { PageTransition } from '@/components/motion/page-transition'
import { Button } from '@/components/ui/button'

export default function AccountPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isValid = email.includes('@') && password.length >= 6

  return (
    <PageTransition className="flex flex-col min-h-full p-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Create Account
        </h1>
        <p className="text-gray-600 mb-8">
          Save your progress and preferences
        </p>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:outline-none"
              placeholder="••••••"
              minLength={6}
            />
            <p className="mt-2 text-sm text-gray-500">
              Must be at least 6 characters
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Link href="/onboarding/completion" className="w-full block">
            <Button
              fullWidth
              size="lg"
              disabled={!isValid}
            >
              Create Account
            </Button>
          </Link>

          <Link href="/onboarding/completion" className="w-full block">
            <Button
              fullWidth
              size="lg"
              variant="outline"
            >
              Continue as Guest
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  )
} 