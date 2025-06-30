'use client'

import React, { useState } from 'react'

export default function OnboardingTestPage() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [goal, setGoal] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      console.log('Sending request to /api/save-onboarding')
      const res = await fetch('/api/save-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age: Number(age), goal })
      })
      console.log('Response status:', res.status)
      const data = await res.json()
      console.log('Response data:', data)
      
      if (data.success) {
        alert('Success! Data saved.')
        // Clear form
        setName('')
        setAge('')
        setGoal('')
      } else {
        setError(data.error || 'An error occurred while saving the data')
      }
    } catch (err) {
      console.error('Network error details:', err)
      setError(`Network error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Onboarding Test</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
            min="1"
            max="120"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Goal</label>
          <input
            type="text"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded font-semibold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Submit'}
        </button>
      </form>
    </div>
  )
} 