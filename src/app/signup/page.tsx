'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'IN'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
  }

  return (
    <div className="flex flex-col min-h-screen p-6 bg-[#F9FAFB]">
      {/* Header */}
      <div className="text-center pt-4 pb-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
        <p className="text-gray-600 text-lg">Let's get you started on your health journey</p>
      </div>

      {/* Form Container */}
      <div className="flex-1 max-w-md mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Field */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              What's your name?
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              required
            />
          </div>

          {/* Email Field */}
          <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              What's your email?
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              required
            />
          </div>

          {/* Phone & Country Field */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              What's your phone number?
            </label>
            <div className="flex space-x-3">
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="px-3 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white"
                style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                <option value="IN">🇮🇳 +91</option>
                <option value="US">🇺🇸 +1</option>
                <option value="GB">🇬🇧 +44</option>
                <option value="CA">🇨🇦 +1</option>
                <option value="AU">🇦🇺 +61</option>
              </select>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="flex-1 px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
            <Link href="/preferences-1" className="w-full block">
              <Button type="submit">
                Continue
              </Button>
            </Link>
          </div>

        </form>

        {/* Back Button */}
        <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <Link href="/" className="w-full block">
            <Button variant="outline">
              ← Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-8 pb-4 text-center animate-fade-in-up" style={{ animationDelay: '350ms' }}>
        <p className="text-sm text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
} 