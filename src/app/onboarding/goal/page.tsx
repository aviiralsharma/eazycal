'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { PageTransition } from '@/components/motion/page-transition'
import { SelectCard } from '@/components/ui/card'

const goals = [
  {
    id: 'weight-loss',
    title: 'Weight Loss',
    description: 'Track calories to achieve your weight loss goals',
  },
  {
    id: 'muscle-gain',
    title: 'Muscle Gain',
    description: 'Monitor protein and calories for muscle building',
  },
  {
    id: 'stay-fit',
    title: 'Stay Fit',
    description: 'Maintain a balanced and healthy diet',
  },
  {
    id: 'track-calories',
    title: 'Just Track Calories',
    description: 'Simple calorie tracking without specific goals',
  },
]

export default function GoalPage() {
  const router = useRouter()

  return (
    <PageTransition className="flex flex-col min-h-full p-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          What's your primary goal?
        </h1>
        <p className="text-gray-600 mb-8">
          This helps us personalize your experience
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          {goals.map((goal) => (
            <SelectCard
              key={goal.id}
              onClick={() => router.push('/onboarding/dietary')}
              title={goal.title}
              description={goal.description}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  )
} 