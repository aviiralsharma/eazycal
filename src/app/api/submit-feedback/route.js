import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      mostAccurate,
      improvements,
      additionalComments
    } = body

    // Prepare the data for insertion
    const feedbackData = {
      name,
      email,
      most_accurate: mostAccurate,
      satisfaction: improvements || '',
      additional_feedback: additionalComments,
      language: body.language || 'en'
    }

    const { error } = await supabase
      .from('feedback_tests')
      .insert([feedbackData])

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
} 