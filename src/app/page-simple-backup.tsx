import React from 'react'
import Link from 'next/link'

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-4">
        Welcome to EazyCal
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        The Easiest Way to Track What You Eat
      </p>
      
      <div className="space-y-4">
        <Link 
          href="/prototype/voice-test-start"
          className="block bg-[#FF6A3D] text-white px-6 py-3 rounded-full text-center font-medium"
        >
          ⚙️ Help Us Train
        </Link>
        
        <Link 
          href="/onboarding/goal"
          className="block bg-indigo-600 text-white px-6 py-3 rounded-full text-center font-medium"
        >
          Let's Get Started
        </Link>
      </div>
    </div>
  )
} 