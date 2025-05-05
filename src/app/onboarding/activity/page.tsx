'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { PageTransition } from '@/components/motion/page-transition'
import { SelectCard } from '@/components/ui/card'

const activityLevels = [
  {
    id: 'sedentary',
    title: 'Sedentary',
    description: 'Little to no exercise, desk job',
  },
  {
    id: 'light',
    title: 'Light',
    description: '1-3 days/week of exercise',
  },
  {
    id: 'moderate',
    title: 'Moderate',
    description: '3-5 days/week of exercise',
  },
  {
    id: 'active',
    title: 'Active',
    description: '6-7 days/week of exercise',
  },
  {
    id: 'athlete',
    title: 'Athlete',
    description: 'Professional athlete or very intense training',
  },
]

export default function ActivityPage() {
  const router = useRouter()

  return (
    <PageTransition className="flex flex-col min-h-full p-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          What's your activity level?
        </h1>
        <p className="text-gray-600 mb-8">
          This helps us calculate your daily calorie needs
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          {activityLevels.map((level) => (
            <SelectCard
              key={level.id}
              onClick={() => router.push('/onboarding/personal')}
              title={level.title}
              description={level.description}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  )
} 