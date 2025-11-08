'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageTransition } from '@/components/motion/page-transition'
import { Button } from '@/components/ui/button'

interface HeightUnit {
  ft: number
  in: number
  cm: number
}

interface WeightUnit {
  lb: number
  kg: number
}

export default function PersonalPage() {
  const router = useRouter()
  const [isMetric, setIsMetric] = useState(false)
  const [height, setHeight] = useState<HeightUnit>({ ft: 5, in: 6, cm: 168 })
  const [weight, setWeight] = useState<WeightUnit>({ lb: 120, kg: 54 })

  // Generate height options
  const ftOptions = Array.from({ length: 8 }, (_, i) => i + 2) // 2ft to 9ft
  const inOptions = Array.from({ length: 12 }, (_, i) => i) // 0in to 11in
  const cmOptions = Array.from({ length: 121 }, (_, i) => i + 120) // 120cm to 240cm
  const lbOptions = Array.from({ length: 201 }, (_, i) => i + 50) // 50lb to 250lb
  const kgOptions = Array.from({ length: 91 }, (_, i) => i + 23) // 23kg to 113kg

  // Convert between units
  const convertToMetric = (ft: number, inches: number) => {
    return Math.round((ft * 30.48) + (inches * 2.54))
  }

  const convertToImperial = (cm: number) => {
    const totalInches = cm / 2.54
    const ft = Math.floor(totalInches / 12)
    const inches = Math.round(totalInches % 12)
    return { ft, in: inches }
  }

  const convertLbToKg = (lb: number) => {
    return Math.round(lb * 0.45359237)
  }

  const convertKgToLb = (kg: number) => {
    return Math.round(kg * 2.20462262)
  }

  // Handle unit changes
  const handleUnitChange = () => {
    const newIsMetric = !isMetric
    setIsMetric(newIsMetric)
    
    if (newIsMetric) {
      setHeight(prev => ({ ...prev, cm: convertToMetric(prev.ft, prev.in) }))
      setWeight(prev => ({ ...prev, kg: convertLbToKg(prev.lb) }))
    } else {
      const imperial = convertToImperial(height.cm)
      setHeight(prev => ({ ...prev, ft: imperial.ft, in: imperial.in }))
      setWeight(prev => ({ ...prev, lb: convertKgToLb(prev.kg) }))
    }
  }

  return (
    <PageTransition className="flex flex-col min-h-full p-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Height & weight
        </h1>
        <p className="text-gray-600 mb-12">
          This will be used to calibrate your custom plan.
        </p>

        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-lg ${!isMetric ? 'font-semibold text-gray-900' : 'text-gray-400'}`}>
            Imperial
          </span>
          <button
            onClick={handleUnitChange}
            className={`
              relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
              ${isMetric ? 'bg-gray-200' : 'bg-indigo-600'}
            `}
          >
            <span
              className={`
                pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                ${isMetric ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </button>
          <span className={`text-lg ${isMetric ? 'font-semibold text-gray-900' : 'text-gray-400'}`}>
            Metric
          </span>
        </div>

        <div className="space-y-12">
          {/* Height Selection */}
          <div>
            <label className="block text-xl font-semibold text-gray-900 mb-6">
              Height
            </label>
            {isMetric ? (
              <div className="flex justify-center bg-gray-50 rounded-2xl py-6">
                <select
                  value={height.cm}
                  onChange={(e) => setHeight(prev => ({ ...prev, cm: parseInt(e.target.value) }))}
                  className="bg-transparent text-center text-2xl font-medium focus:outline-none appearance-none"
                >
                  {cmOptions.map(cm => (
                    <option key={cm} value={cm}>{cm} cm</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="flex justify-center gap-6 bg-gray-50 rounded-2xl py-6">
                <select
                  value={height.ft}
                  onChange={(e) => setHeight(prev => ({ ...prev, ft: parseInt(e.target.value) }))}
                  className="bg-transparent text-center text-2xl font-medium focus:outline-none appearance-none"
                >
                  {ftOptions.map(ft => (
                    <option key={ft} value={ft}>{ft} ft</option>
                  ))}
                </select>
                <select
                  value={height.in}
                  onChange={(e) => setHeight(prev => ({ ...prev, in: parseInt(e.target.value) }))}
                  className="bg-transparent text-center text-2xl font-medium focus:outline-none appearance-none"
                >
                  {inOptions.map(inch => (
                    <option key={inch} value={inch}>{inch} in</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Weight Selection */}
          <div>
            <label className="block text-xl font-semibold text-gray-900 mb-6">
              Weight
            </label>
            <div className="flex justify-center bg-gray-50 rounded-2xl py-6">
              <select
                value={isMetric ? weight.kg : weight.lb}
                onChange={(e) => {
                  const value = parseInt(e.target.value)
                  if (isMetric) {
                    setWeight(prev => ({ ...prev, kg: value, lb: convertKgToLb(value) }))
                  } else {
                    setWeight(prev => ({ ...prev, lb: value, kg: convertLbToKg(value) }))
                  }
                }}
                className="bg-transparent text-center text-2xl font-medium focus:outline-none appearance-none"
              >
                {(isMetric ? kgOptions : lbOptions).map(value => (
                  <option key={value} value={value}>
                    {value} {isMetric ? 'kg' : 'lb'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button
          onClick={() => router.push('/onboarding/age-gender')}
          className="w-full bg-black text-white py-4 rounded-full text-lg font-medium"
        >
          Continue
        </Button>
      </div>
    </PageTransition>
  )
} 