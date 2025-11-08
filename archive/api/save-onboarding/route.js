import { supabase } from '../../../lib/supabase.js'

export async function POST(request) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers })
  }

  try {
    const data = await request.json();
    console.log('API: Received data:', data);
    
    if (!data.name || !data.age || !data.goal) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields' 
      }), {
        status: 400,
        headers,
      });
    }

    // First check if the table exists
    const { data: tableInfo, error: tableError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
      
    if (tableError) {
      console.error('API: Table check error:', tableError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Database table error: ${tableError.message}` 
      }), {
        status: 500,
        headers,
      });
    }

    const { error } = await supabase.from('users').insert([{ 
      name: data.name, 
      age: Number(data.age), 
      goal: data.goal,
      created_at: new Date().toISOString()
    }]);

    if (error) {
      console.error('API: Supabase insert error:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Database error: ${error.message}` 
      }), {
        status: 500,
        headers,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('API: Route error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: `Server error: ${error.message}` 
    }), {
      status: 400,
      headers,
    });
  }
} 