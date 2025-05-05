import { supabase } from '../../../lib/supabase.js';

export async function POST(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const data = await request.json();
    const { food, quantity, calories } = data;

    if (!food || typeof quantity !== 'number') {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: food (string) and quantity (number) are required.'
      }), {
        status: 400,
        headers,
      });
    }

    const insertData = {
      food,
      quantity,
      calories: typeof calories === 'number' ? calories : null,
    };

    const { error } = await supabase.from('food_logs').insert([insertData]);

    if (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers,
    });
  }
} 