'use client'

import React, { useState, useRef } from 'react';

export default function AudioUploadPage() {
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
        const res = await fetch('/api/transcribe-audio', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        setTranscript(data.transcript || '');
      } catch (err) {
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
      <h1 className="text-2xl font-bold mb-4">Audio Upload & Transcription</h1>
      <div className="mb-4">
        {!recording ? (
          <button
            onClick={startRecording}
            className="w-full bg-indigo-600 text-white py-2 rounded font-semibold disabled:opacity-50"
            disabled={loading}
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecordingAndTranscribe}
            className="w-full bg-red-600 text-white py-2 rounded font-semibold disabled:opacity-50"
            disabled={loading}
          >
            Stop Recording & Transcribe
          </button>
        )}
      </div>
      {loading && (
        <div className="mb-4 text-indigo-600 font-medium">Transcribing...</div>
      )}
      {transcript && (
        <div className="mt-4">
          <label className="block mb-1 font-medium">Transcript</label>
          <div className="w-full border px-3 py-2 rounded bg-gray-50 min-h-[40px]">
            {transcript}
          </div>
        </div>
      )}
    </div>
  );
} 