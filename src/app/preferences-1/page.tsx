'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Preferences1Page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
    weight: '',
    height: '',
    heightFeet: '',
    heightInches: '',
    country: ''
  })

  const [units, setUnits] = useState({
    weight: 'kg', // kg or lbs
    height: 'cm'  // cm or ft
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const toggleWeightUnit = () => {
    setUnits(prev => {
      const newWeightUnit = prev.weight === 'kg' ? 'lbs' : 'kg'
      
      // Convert existing weight value
      if (formData.weight) {
        const currentWeight = parseFloat(formData.weight)
        if (!isNaN(currentWeight)) {
          const convertedWeight = newWeightUnit === 'lbs' 
            ? Math.round(currentWeight * 2.205 * 10) / 10
            : Math.round(currentWeight / 2.205 * 10) / 10
          
          setFormData(prev => ({
            ...prev,
            weight: convertedWeight.toString()
          }))
        }
      }
      
      return {
        ...prev,
        weight: newWeightUnit
      }
    })
  }

  const toggleHeightUnit = () => {
    setUnits(prev => {
      const newHeightUnit = prev.height === 'cm' ? 'ft' : 'cm'
      
      if (newHeightUnit === 'ft') {
        // Converting from cm to ft+inches
        if (formData.height) {
          const currentHeightCm = parseFloat(formData.height)
          if (!isNaN(currentHeightCm)) {
            const totalInches = currentHeightCm / 2.54
            const feet = Math.floor(totalInches / 12)
            const inches = Math.round(totalInches % 12)
            
            setFormData(prev => ({
              ...prev,
              heightFeet: feet.toString(),
              heightInches: inches.toString(),
              height: '' // Clear cm value
            }))
          }
        }
      } else {
        // Converting from ft+inches to cm
        if (formData.heightFeet || formData.heightInches) {
          const feet = parseFloat(formData.heightFeet) || 0
          const inches = parseFloat(formData.heightInches) || 0
          const totalInches = (feet * 12) + inches
          const heightCm = Math.round(totalInches * 2.54)
          
          setFormData(prev => ({
            ...prev,
            height: heightCm.toString(),
            heightFeet: '', // Clear ft values
            heightInches: ''
          }))
        }
      }
      
      return {
        ...prev,
        height: newHeightUnit
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData, units)
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
            Let's Get Started
          </h1>
          <p 
            className="text-gray-600"
            style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Tell us about yourself to personalize your experience
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Name Field */}
          <div className="animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            <label 
              className="block text-lg font-semibold text-gray-900 mb-3"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-lg transition-shadow duration-200 ease-in-out"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <label 
              className="block text-lg font-semibold text-gray-900 mb-3"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-lg transition-shadow duration-200 ease-in-out"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Gender and Age Row */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <div>
              <label 
                className="block text-lg font-semibold text-gray-900 mb-3"
                style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-lg transition-shadow duration-200 ease-in-out"
                style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label 
                className="block text-lg font-semibold text-gray-900 mb-3"
                style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-lg transition-shadow duration-200 ease-in-out"
                style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                placeholder="Age"
                min="13"
                max="120"
                required
              />
            </div>
          </div>

          {/* Weight Field with Unit Toggle */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <label 
              className="block text-lg font-semibold text-gray-900 mb-3"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Weight
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="w-full px-4 py-3 pr-20 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-lg transition-shadow duration-200 ease-in-out"
                style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                placeholder={units.weight === 'kg' ? 'Weight in kg' : 'Weight in lbs'}
                step="0.1"
                required
              />
              <button
                type="button"
                onClick={toggleWeightUnit}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                {units.weight}
              </button>
            </div>
          </div>

          {/* Height Field with Unit Toggle */}
          <div className="animate-fade-in-up" style={{ animationDelay: '250ms' }}>
            <label 
              className="block text-lg font-semibold text-gray-900 mb-3"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Height
            </label>
            {units.height === 'cm' ? (
              <div className="relative">
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-4 py-3 pr-20 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-lg transition-shadow duration-200 ease-in-out"
                  style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                  placeholder="Height in cm"
                  step="1"
                  required
                />
                <button
                  type="button"
                  onClick={toggleHeightUnit}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                  style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  cm
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.heightFeet}
                      onChange={(e) => handleInputChange('heightFeet', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-lg transition-shadow duration-200 ease-in-out"
                      style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                      placeholder="Feet"
                      min="0"
                      max="8"
                      step="1"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.heightInches}
                      onChange={(e) => handleInputChange('heightInches', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-lg transition-shadow duration-200 ease-in-out"
                      style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                      placeholder="Inches"
                      min="0"
                      max="11"
                      step="1"
                      required
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleHeightUnit}
                  className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                  style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Switch to cm
                </button>
              </div>
            )}
          </div>

          {/* Country Field */}
          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <label 
              className="block text-lg font-semibold text-gray-900 mb-3"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Country
            </label>
            <select
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-lg transition-shadow duration-200 ease-in-out"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              required
            >
              <option value="">Select your country</option>
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="BR">Brazil</option>
              <option value="MX">Mexico</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Continue Button */}
          <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
            <Link href="/preferences-2" className="w-full block">
              <Button>
                Let's Continue 🚀
              </Button>
            </Link>
          </div>

        </form>

        {/* Back Button */}
        <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <Link href="/signup" className="w-full block">
            <Button variant="outline">
              ← Back
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
} 