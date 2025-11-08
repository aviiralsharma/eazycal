'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { PageTransition } from '@/components/motion/page-transition'
import { SelectCard } from '@/components/ui/card'

const dietaryPreferences = [
  {
    id: 'vegan',
    title: 'Vegan',
    description: 'Plant-based diet excluding all animal products',
  },
  {
    id: 'vegetarian',
    title: 'Vegetarian',
    description: 'Plant-based diet with dairy and eggs',
  },
  {
    id: 'keto',
    title: 'Keto',
    description: 'High-fat, low-carb diet',
  },
  {
    id: 'diabetic',
    title: 'Diabetic-Friendly',
    description: 'Low glycemic index foods',
  },
  {
    id: 'none',
    title: 'No Preference',
    description: 'All types of food',
  },
]

export default function DietaryPage() {
  const router = useRouter()

  return (
    <PageTransition className="flex flex-col min-h-full p-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dietary Preferences
        </h1>
        <p className="text-gray-600 mb-8">
          Select your dietary preference
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          {dietaryPreferences.map((pref) => (
            <SelectCard
              key={pref.id}
              onClick={() => router.push('/onboarding/logging')}
              title={pref.title}
              description={pref.description}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  )
} 