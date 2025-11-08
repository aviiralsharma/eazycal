'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="p-6">
          <h1 
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Good morning! 👋
          </h1>
          <p 
            className="text-gray-600 mt-1"
            style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Welcome to your calorie tracking journey
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        
        {/* Welcome Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🎯</div>
            <h2 
              className="text-xl font-bold text-gray-900 mb-3"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Ready to track your first meal?
            </h2>
            <p 
              className="text-gray-600 mb-6"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Start building healthy habits with simple calorie tracking
            </p>
            
            <Button>
              Log Your First Meal
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
} 