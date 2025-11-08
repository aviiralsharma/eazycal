import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    console.log('=== Feedback API called ===')
    
    // Parse the JSON payload
    const body = await request.json()
    console.log('Received body:', body)
    
    const {
      mostAccurate,
      name,
      satisfaction,
      additionalFeedback,
      email,
      language
    } = body

    // Validate required fields
    if (!mostAccurate || !satisfaction || !language) {
      console.log('Validation failed - missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields: mostAccurate, satisfaction, and language are required' },
        { status: 400 }
      )
    }

    // Prepare the data for insertion
    const feedbackData = {
      most_accurate: mostAccurate,
      name: name || null,
      satisfaction,
      additional_feedback: additionalFeedback || null,
      email: email || null,
      language,
      created_at: new Date().toISOString()
    }

    console.log('Prepared data for insertion:', feedbackData)

    // Test Supabase connection
    console.log('Testing Supabase connection...')
    
    // First, try to insert the data
    const { data, error } = await supabase
      .from('feedback_tests')
      .insert([feedbackData])
      .select()

    console.log('Supabase insert result:', { data, error })

    if (error) {
      console.log('Insert error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })

      // If table doesn't exist, try to create it
      if (error.code === 'PGRST116' || error.message.includes('relation "feedback_tests" does not exist')) {
        console.log('Table does not exist, attempting to create it...')
        
        // Create the table
        const { error: createError } = await supabase.rpc('create_feedback_tests_table')
        
        if (createError) {
          // If the RPC doesn't exist, we'll log the error and provide SQL instructions
          console.error('Could not create table automatically:', createError)
          
          return NextResponse.json(
            { 
              error: 'Database table needs to be created. Please run the following SQL in your Supabase dashboard:',
              sql: `
                CREATE TABLE feedback_tests (
                  id BIGSERIAL PRIMARY KEY,
                  most_accurate TEXT NOT NULL,
                  name TEXT,
                  satisfaction TEXT NOT NULL,
                  additional_feedback TEXT,
                  email TEXT,
                  language TEXT NOT NULL,
                  created_at TIMESTAMPTZ DEFAULT NOW()
                );
                
                -- Enable Row Level Security
                ALTER TABLE feedback_tests ENABLE ROW LEVEL SECURITY;
                
                -- Allow inserts for everyone (adjust based on your security needs)
                CREATE POLICY "Allow feedback inserts" ON feedback_tests FOR INSERT WITH CHECK (true);
                
                -- Allow reads for authenticated users (optional)
                CREATE POLICY "Allow feedback reads" ON feedback_tests FOR SELECT USING (true);
              `
            },
            { status: 500 }
          )
        }

        // Try inserting again after table creation
        const { data: retryData, error: retryError } = await supabase
          .from('feedback_tests')
          .insert([feedbackData])
          .select()

        if (retryError) {
          console.error('Error inserting after table creation:', retryError)
          return NextResponse.json(
            { error: 'Failed to save feedback after creating table' },
            { status: 500 }
          )
        }

        return NextResponse.json({
          success: true,
          message: 'Feedback saved successfully (table created)',
          data: retryData
        })
      }

      // Handle other database errors
      console.error('Database error:', error)
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    // Success response
    console.log('Feedback saved successfully')
    return NextResponse.json({
      success: true,
      message: 'Feedback saved successfully',
      data: data
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 