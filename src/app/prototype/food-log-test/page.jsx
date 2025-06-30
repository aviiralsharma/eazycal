'use client'

import React, { useState } from 'react';

export default function FoodLogTestPage() {
  const [food, setFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const [calories, setCalories] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/log-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          food,
          quantity: Number(quantity),
          calories: calories ? Number(calories) : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Success! Food log saved.');
        setFood('');
        setQuantity('');
        setCalories('');
      } else {
        alert('Error: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Food Log Test</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Food</label>
          <input
            type="text"
            value={food}
            onChange={e => setFood(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
            min="1"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Calories (optional)</label>
          <input
            type="number"
            value={calories}
            onChange={e => setCalories(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            min="0"
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
  );
} 