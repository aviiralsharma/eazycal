'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageTransition } from '@/components/motion/page-transition'

const genders = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' },
]

export default function AgeGenderPage() {
  const router = useRouter()
  const [age, setAge] = useState('')
  const [gender, setGender] = useState<string | null>(null)

  const isValid = age.trim() !== '' && !isNaN(Number(age)) &&
    Number(age) > 0 && Number(age) < 120 && gender !== null

  return (
    <PageTransition className="flex flex-col min-h-full p-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Age & Gender
        </h1>
        <p className="text-gray-600 mb-8">
          For personalized recommendations
        </p>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:outline-none"
              placeholder="25"
              min="1"
              max="120"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="grid grid-cols-3 gap-3">
              {genders.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGender(g.id)}
                  className={`
                    rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors
                    ${gender === g.id
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-gray-200 text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          className="mt-8 w-full rounded-xl bg-indigo-600 text-white py-3 font-semibold disabled:opacity-50"
          disabled={!isValid}
          onClick={() => router.push('/onboarding/reminders')}
        >
          Next
        </button>
      </div>
    </PageTransition>
  )
} 