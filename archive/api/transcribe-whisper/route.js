import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    console.log('=== WHISPER API CALLED ===');
    console.log('Timestamp:', new Date().toISOString());
    
    // Environment debugging
    console.log('Environment Debug:', {
      nodeEnv: process.env.NODE_ENV,
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      keyLength: process.env.OPENAI_API_KEY?.length || 0,
      keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 7) + '...' || 'MISSING',
      allEnvKeys: Object.keys(process.env).filter(key => key.includes('OPENAI'))
    });

    // Parse the multipart form data
    const formData = await request.formData();
    const audioFile = formData.get('audio');
    
    if (!audioFile) {
      console.log('❌ No audio file in request');
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log('❌ OPENAI_API_KEY not found in environment');
      console.log('Available environment variables:', Object.keys(process.env).filter(key => key.includes('OPENAI')));
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please check your .env.local file.' },
        { status: 500 }
      );
    }

    // Validate API key format
    if (!process.env.OPENAI_API_KEY.startsWith('sk-')) {
      console.log('❌ Invalid API key format');
      return NextResponse.json(
        { error: 'Invalid OpenAI API key format. Key should start with sk-' },
        { status: 500 }
      );
    }

    // Log file details
    console.log('📁 Audio file details:', {
      name: audioFile.name,
      size: audioFile.size,
      type: audioFile.type,
      lastModified: audioFile.lastModified
    });

    // Validate file size (OpenAI has a 25MB limit)
    if (audioFile.size > 25 * 1024 * 1024) {
      console.log('❌ File too large:', audioFile.size);
      return NextResponse.json(
        { error: 'Audio file too large. Maximum size is 25MB.' },
        { status: 413 }
      );
    }

    // Create FormData for OpenAI
    const openaiFormData = new FormData();
    
    // Convert blob to file
    const audioBuffer = await audioFile.arrayBuffer();
    const audioBlob = new Blob([audioBuffer], { type: audioFile.type });
    const file = new File([audioBlob], audioFile.name || 'recording.webm', {
      type: audioFile.type || 'audio/webm'
    });
    
    openaiFormData.append('file', file);
    openaiFormData.append('model', 'whisper-1');
    openaiFormData.append('response_format', 'json');

    console.log('🚀 Sending to OpenAI Whisper API...');
    const requestStart = Date.now();

    // Make the request to OpenAI
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: openaiFormData,
    });

    const requestEnd = Date.now();
    const responseTime = requestEnd - requestStart;

    console.log('📥 OpenAI Response:', {
      status: response.status,
      statusText: response.statusText,
      responseTime: `${responseTime}ms`,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        responseTime: `${responseTime}ms`
      });

      // Specific error handling
      let userMessage = 'OpenAI API error occurred';
      
      switch (response.status) {
        case 401:
          userMessage = 'Invalid OpenAI API key. Please check your .env.local file.';
          break;
        case 429:
          userMessage = 'Rate limit exceeded. Please wait a moment and try again.';
          break;
        case 413:
          userMessage = 'Audio file too large. Please use a shorter recording.';
          break;
        case 400:
          userMessage = 'Invalid audio format. Please try recording again.';
          break;
        case 500:
        case 502:
        case 503:
          userMessage = 'OpenAI service temporarily unavailable. Please try again.';
          break;
        default:
          userMessage = `OpenAI API error (${response.status}). Please try again.`;
      }

      return NextResponse.json(
        { 
          error: userMessage,
          details: `HTTP ${response.status}: ${response.statusText}`,
          debugInfo: errorText
        },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('✅ Success:', {
      hasTranscription: !!result.text,
      transcriptionLength: result.text?.length || 0,
      responseTime: `${responseTime}ms`
    });
    
    return NextResponse.json({
      transcription: result.text || '',
      success: true,
      responseTime: `${responseTime}ms`
    });

  } catch (error) {
    console.error('💥 Unexpected error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    return NextResponse.json(
      { 
        error: 'Internal server error occurred during transcription',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 