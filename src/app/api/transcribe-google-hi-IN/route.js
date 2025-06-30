import { NextResponse } from 'next/server';
import { SpeechClient } from '@google-cloud/speech';
import fs from 'fs';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    // Parse multipart/form-data
    const formData = await request.formData();
    const file = formData.get('audio');
    if (!file) {
      return NextResponse.json({ transcript: '', error: 'No audio file uploaded.' }, { status: 400 });
    }

    // Read file as buffer
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);
    const audioBytes = audioBuffer.toString('base64');

    // Load Google credentials from project root
    const keyPath = 'keys/google-stt.json';
    if (!fs.existsSync(keyPath)) {
      return NextResponse.json({ transcript: '', error: 'Google credentials not found.' }, { status: 500 });
    }
    const client = new SpeechClient({ keyFilename: keyPath });

    // Google STT config for Hindi
    const audio = { content: audioBytes };
    const config = {
      encoding: 'WEBM_OPUS',
      sampleRateHertz: 48000,
      languageCode: 'hi-IN',
    };
    const requestObj = { audio, config };

    // Transcribe
    const [response] = await client.recognize(requestObj);
    const transcript = response.results?.map(r => r.alternatives[0].transcript).join(' ') || '';
    return NextResponse.json({ transcript });
  } catch (error) {
    return NextResponse.json({ transcript: '', error: error.message }, { status: 500 });
  }
} 