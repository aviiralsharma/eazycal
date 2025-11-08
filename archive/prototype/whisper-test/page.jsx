'use client'

import React, { useState, useRef } from 'react';

export default function WhisperTestPage() {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    setTranscript('');
    setLoading(false);
    setRecording(true);
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorder.start();
    } catch (err) {
      alert('Could not access microphone: ' + err.message);
      setRecording(false);
    }
  };

  const stopRecordingAndTranscribe = async () => {
    setRecording(false);
    setLoading(true);
    setTranscript('');
    const mediaRecorder = mediaRecorderRef.current;
    if (!mediaRecorder) return;
    
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      
      try {
        const res = await fetch('/api/transcribe-whisper', {
          method: 'POST',
          body: formData,
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setTranscript(data.transcription || '');
      } catch (err) {
        console.error('Transcription error:', err);
        alert('Transcription failed: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    mediaRecorder.stop();
    // Stop all tracks
    if (mediaRecorder.stream) {
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Whisper Test</h1>
      <p className="text-gray-600 mb-6">Test OpenAI's Whisper API for audio transcription</p>
      
      <div className="mb-4">
        {!recording ? (
          <button
            onClick={startRecording}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loading}
          >
            🎤 Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecordingAndTranscribe}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors animate-pulse"
            disabled={loading}
          >
            ⏹️ Stop Recording & Transcribe
          </button>
        )}
      </div>
      
      {loading && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-blue-700 font-medium">Processing with Whisper...</span>
          </div>
        </div>
      )}
      
      {transcript && (
        <div className="mt-4">
          <label className="block mb-2 font-medium text-gray-700">Transcription Result:</label>
          <div className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 min-h-[60px] whitespace-pre-wrap">
            {transcript}
          </div>
        </div>
      )}
    </div>
  );
} 