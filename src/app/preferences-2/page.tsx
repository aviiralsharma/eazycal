'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Preferences2Page() {
  const [formData, setFormData] = useState({
    goal: '',
    activityLevel: '',
    dietaryRestrictions: [] as string[],
    notificationPreferences: {
      mealReminders: true,
      progressUpdates: true,
      weeklyReports: true
    }
  })

  const goalOptions = [
    { id: 'lose_weight', label: 'Lose Weight', emoji: '⬇️' },
    { id: 'maintain_weight', label: 'Maintain Weight', emoji: '➡️' },
    { id: 'gain_weight', label: 'Gain Weight', emoji: '⬆️' },
    { id: 'build_muscle', label: 'Build Muscle', emoji: '💪' },
    { id: 'improve_health', label: 'Improve Health', emoji: '❤️' }
  ]

  const activityLevels = [
    { id: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
    { id: 'lightly_active', label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
    { id: 'moderately_active', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
    { id: 'very_active', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
    { id: 'extra_active', label: 'Extra Active', description: 'Very hard exercise & physical job' }
  ]

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'pescatarian', label: 'Pescatarian' },
    { id: 'keto', label: 'Keto' },
    { id: 'paleo', label: 'Paleo' },
    { id: 'gluten_free', label: 'Gluten-Free' },
    { id: 'dairy_free', label: 'Dairy-Free' },
    { id: 'low_carb', label: 'Low Carb' },
    { id: 'mediterranean', label: 'Mediterranean' }
  ]

  const handleGoalSelect = (goalId: string) => {
    setFormData(prev => ({ ...prev, goal: goalId }))
  }

  const handleActivitySelect = (activityId: string) => {
    setFormData(prev => ({ ...prev, activityLevel: activityId }))
  }

  const handleDietaryToggle = (dietaryId: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(dietaryId)
        ? prev.dietaryRestrictions.filter(id => id !== dietaryId)
        : [...prev.dietaryRestrictions, dietaryId]
    }))
  }

  const handleNotificationToggle = (notificationKey: string) => {
    setFormData(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [notificationKey]: !prev.notificationPreferences[notificationKey as keyof typeof prev.notificationPreferences]
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Final form submission:', formData)
    // Handle final form submission here
  }

  return (
    <div className="flex flex-col min-h-full p-6 scroll-container">
      <div className="flex-1">
        
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 
            className="text-2xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Your Health Goals
          </h1>
          <p 
            className="text-gray-600"
            style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Help us customize your experience based on your goals and preferences
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Goal Selection */}
          <div className="animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            <label 
              className="block text-lg font-semibold text-gray-900 mb-4"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              What's your primary goal?
            </label>
            <div className="grid grid-cols-1 gap-3">
              {goalOptions.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => handleGoalSelect(goal.id)}
                  className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-200 ${
                    formData.goal === goal.id
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                  style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{goal.emoji}</span>
                    <span className="font-medium text-gray-900">{goal.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Activity Level */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <label 
              className="block text-lg font-semibold text-gray-900 mb-4"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              What's your activity level?
            </label>
            <div className="space-y-3">
              {activityLevels.map((activity) => (
                <button
                  key={activity.id}
                  type="button"
                  onClick={() => handleActivitySelect(activity.id)}
                  className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-200 ${
                    formData.activityLevel === activity.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                  style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900">{activity.label}</div>
                    <div className="text-sm text-gray-600">{activity.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <label 
              className="block text-lg font-semibold text-gray-900 mb-4"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Any dietary preferences? (Optional)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {dietaryOptions.map((dietary) => (
                <button
                  key={dietary.id}
                  type="button"
                  onClick={() => handleDietaryToggle(dietary.id)}
                  className={`w-full p-3 text-center border-2 rounded-xl transition-all duration-200 ${
                    formData.dietaryRestrictions.includes(dietary.id)
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                  style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  <span className="font-medium text-gray-900">{dietary.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Complete Setup Button */}
          <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Link href="/dashboard" className="w-full block">
              <Button>
                Complete Setup 🎉
              </Button>
            </Link>
          </div>

        </form>

        {/* Back Button */}
        <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
          <Link href="/preferences-1" className="w-full block">
            <Button variant="outline">
              ← Back
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
} 