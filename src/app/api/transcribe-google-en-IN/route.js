import { NextResponse } from 'next/server';
import { SpeechClient } from '@google-cloud/speech';
import fs from 'fs';

export const runtime = 'nodejs';

export async function POST(request) {
  console.log('=== GOOGLE STT API CALLED ===')
  console.log('Timestamp:', new Date().toISOString())
  
  try {
    // Parse multipart/form-data
    const formData = await request.formData();
    const file = formData.get('audio');
    if (!file) {
      console.log('❌ No audio file uploaded')
      return NextResponse.json({ transcript: '', error: 'No audio file uploaded.' }, { status: 400 });
    }

    console.log('📁 Audio file details:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    })

    // Read file as buffer
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);
    const audioBytes = audioBuffer.toString('base64');

    console.log('🔊 Audio buffer size:', audioBuffer.length)

    // Load Google credentials from project root
    const keyPath = 'keys/google-stt.json';
    if (!fs.existsSync(keyPath)) {
      console.log('❌ Google credentials not found')
      return NextResponse.json({ transcript: '', error: 'Google credentials not found.' }, { status: 500 });
    }
    
    console.log('✅ Google credentials found')
    const client = new SpeechClient({ keyFilename: keyPath });

    // Google STT config
    const audio = { content: audioBytes };
    const config = {
      encoding: 'WEBM_OPUS',
      sampleRateHertz: 48000,
      languageCode: 'en-IN',
    };
    const requestObj = { audio, config };

    console.log('🚀 Sending to Google STT API...')
    console.log('📊 Config:', config)

    // Transcribe
    const [response] = await client.recognize(requestObj);
    
    console.log('📥 Google Response:', JSON.stringify(response, null, 2))
    
    const transcript = response.results?.map(r => r.alternatives[0].transcript).join(' ') || '';
    
    console.log('✅ Final transcript:', transcript)
    console.log('📏 Transcript length:', transcript.length)
    
    return NextResponse.json({ transcript });
  } catch (error) {
    console.error('❌ Google STT Error:', error)
    return NextResponse.json({ transcript: '', error: error.message }, { status: 500 });
  }
} 