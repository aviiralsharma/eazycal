'use client'

import React from 'react'
import Link from 'next/link'

export default function VoiceTestStartPage() {
  return (
    <div className="flex flex-col min-h-full p-6">
      <div className="flex-1">
        
        {/* Main Heading */}
        <h1 
          className="text-2xl font-bold text-gray-900 mb-4 animate-fade-in-up"
          style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          🧪 Help Train Our Voice AI
        </h1>

        {/* Title */}
        <p 
          className="text-gray-600 mb-12 animate-fade-in-up"
          style={{ 
            fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif',
            animationDelay: '50ms'
          }}
        >
          Choose your language
        </p>

        {/* Language Test Buttons */}
        <div className="space-y-6">
          
          {/* English Test Button */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            <Link href="/prototype/test-english/step-1" className="block w-full">
              <button
                className="w-full bg-black hover:bg-gray-800 text-white py-6 px-6 rounded-full font-medium text-lg transition-colors"
                style={{ 
                  fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                English
              </button>
            </Link>
          </div>

          {/* Hindi Test Button */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '150ms' }}
          >
            <Link href="/prototype/test-hindi/step-1" className="block w-full">
              <button
                className="w-full bg-black hover:bg-gray-800 text-white py-6 px-6 rounded-full font-medium text-lg transition-colors"
                style={{ 
                  fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                Hindi
              </button>
            </Link>
          </div>

        </div>

        {/* Back Button */}
        <div
          className="mt-12 animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          <Link href="/" className="inline-block">
            <button
              className="bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 py-3 px-6 rounded-full font-medium text-sm transition-all shadow-sm"
              style={{ 
                fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif'
              }}
            >
              ← Back
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
} 