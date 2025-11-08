'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { PageTransition } from '@/components/motion/page-transition'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'

export default function RemindersPage() {
  const [remindersEnabled, setRemindersEnabled] = useState(false)

  return (
    <PageTransition className="flex flex-col min-h-full p-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Daily Reminders
        </h1>
        <p className="text-gray-600 mb-8">
          Never forget to log your meals
        </p>
        
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <Bell className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Enable Reminders
                </h3>
                <p className="text-sm text-gray-600">
                  Get notified to log your meals
                </p>
              </div>
            </div>
            <button
              onClick={() => setRemindersEnabled(!remindersEnabled)}
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                ${remindersEnabled ? 'bg-indigo-600' : 'bg-gray-200'}
              `}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                  ${remindersEnabled ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/onboarding/account" className="w-full block">
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