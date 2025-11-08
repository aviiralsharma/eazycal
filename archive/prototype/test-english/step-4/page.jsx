'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function TestEnglishStep4() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    mostAccurate: '',
    improvements: '',
    additionalComments: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: feedback.name,
          email: feedback.email,
          mostAccurate: feedback.mostAccurate,
          improvements: feedback.improvements,
          additionalComments: feedback.additionalComments
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        const errorData = await response.json()
        console.error('Error submitting feedback:', errorData)
        alert('There was an error submitting your feedback. Please try again later.')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('There was an error submitting your feedback. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFeedback(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-full p-6">
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <div>
            <h1 
              className="text-2xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Thanks for helping us improve Eazycal ✨
            </h1>
            <p 
              className="text-gray-600"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Your feedback means the world to us and will help make voice logging even better.
            </p>
          </div>
          
          <Link href="/" className="w-full max-w-sm">
            <button
              className="w-full bg-black hover:bg-gray-800 text-white py-4 px-4 rounded-full font-medium text-lg transition-colors"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full p-6">
      <div className="flex-1">
        
        {/* Header */}
        <div className="mb-8">
          <h1 
            className="text-2xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            🎤 Give Feedback
          </h1>
          <p 
            className="text-gray-600"
            style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Tell us which test felt most accurate — it'll help us improve.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Field */}
          <div>
            <label 
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Name
            </label>
            <input
              type="text"
              value={feedback.name}
              onChange={e => handleInputChange('name', e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label 
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Email
            </label>
            <input
              type="email"
              value={feedback.email}
              onChange={e => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              required
            />
          </div>

          {/* Most Accurate Test */}
          <div>
            <label 
              className="block text-sm font-medium text-gray-700 mb-3"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Which test transcribed your voice most accurately?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { label: 'Test 1: OpenAI Whisper API', value: 'Test 1' },
                { label: 'Test 2: Google STT API', value: 'Test 2' },
                { label: 'Test 3: Google STT API 2', value: 'Test 3' }
              ].map((test) => (
                <label key={test.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="mostAccurate"
                    value={test.value}
                    checked={feedback.mostAccurate === test.value}
                    onChange={(e) => handleInputChange('mostAccurate', e.target.value)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span 
                    className="text-gray-800 font-medium"
                    style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    {test.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div>
            <label 
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              What could we improve about voice logging? (Optional)
            </label>
            <textarea
              value={feedback.improvements}
              onChange={(e) => handleInputChange('improvements', e.target.value)}
              placeholder="Tell us what didn't work well..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              rows={3}
            />
          </div>

          {/* Additional Comments */}
          <div>
            <label 
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Any additional feedback? (Optional)
            </label>
            <textarea
              value={feedback.additionalComments}
              onChange={(e) => handleInputChange('additionalComments', e.target.value)}
              placeholder="Your thoughts on the overall experience..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !feedback.name.trim() ||
              !feedback.email.trim() ||
              !feedback.mostAccurate
            }
            className="w-full bg-black hover:bg-gray-800 text-white py-4 px-4 rounded-full font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>

        </form>

        {/* Back Link */}
        <div className="mt-8">
          <Link href="/prototype/test-english/step-3" className="text-gray-500 hover:text-gray-700 transition-colors text-sm">
            ← Back to Step 3
          </Link>
        </div>

      </div>
    </div>
  )
} 