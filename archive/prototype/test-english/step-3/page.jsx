'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Mic, MicOff } from 'lucide-react'

export default function TestEnglishStep3() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [recordingProgress, setRecordingProgress] = useState(0)
  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)
  const progressIntervalRef = useRef(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      const audioChunks = []
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
        await sendAudioForTranscription(audioBlob)
        
        // Clean up stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
        }
      }
      
      setIsRecording(true)
      setRecordingProgress(0)
      mediaRecorder.start()
      
      // Start progress animation (15 seconds total)
      progressIntervalRef.current = setInterval(() => {
        setRecordingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressIntervalRef.current)
            mediaRecorder.stop()
            setIsRecording(false)
            return 100
          }
          return prev + 0.67 // 150 intervals of 100ms = 15 seconds
        })
      }, 100)
      
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Please allow microphone access to continue')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      clearInterval(progressIntervalRef.current)
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setRecordingProgress(100)
    }
  }

  const sendAudioForTranscription = async (audioBlob) => {
    setIsProcessing(true)
    
    try {
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.webm')
      
      const response = await fetch('/api/transcribe-google-en-IN', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      
      // Debug logging
      console.log('API Response:', data)
      console.log('Response status:', response.status)
      
      if (data.transcript && data.transcript.trim()) {
        setTranscript(data.transcript)
      } else if (data.error) {
        console.error('API Error:', data.error)
        setTranscript(`Error: ${data.error}`)
      } else {
        console.log('Empty transcript received')
        setTranscript('Sorry, we couldn\'t understand that. Please try speaking more clearly.')
      }
    } catch (error) {
      console.error('Transcription error:', error)
      setTranscript('There was an error processing your audio. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording()
    } else if (!isProcessing) {
      startRecording()
    }
  }

  const resetTest = () => {
    setTranscript('')
    setRecordingProgress(0)
  }

  return (
    <div className="flex flex-col min-h-full p-6">
      <div className="flex-1">
        
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <h1 
            className="text-2xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
             English Voice Test (3/3)
          </h1>
        </div>

        {/* Instructions Section */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 
              className="text-gray-900 font-semibold mb-4 text-base flex items-center"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              <span className="mr-2">📋</span>
              Instructions
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 mr-3 shadow-sm" style={{ backgroundColor: '#ffba26' }}>
                  <span className="text-black text-xs font-bold">🌍</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Talk in English — as selected earlier.
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 mr-3 shadow-sm" style={{ backgroundColor: '#7cb071' }}>
                  <span className="text-white text-xs font-bold">💭</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Think before you press the mic — answer in one clear go.
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 mr-3 shadow-sm" style={{ backgroundColor: '#c89af5' }}>
                  <span className="text-black text-xs font-bold">🍽️</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Include all food items — be as specific as possible.
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 mr-3 shadow-sm" style={{ backgroundColor: '#e6b885' }}>
                  <span className="text-black text-xs font-bold">🚫</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Avoid using fillers like 'umm', 'hmm', etc.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Status */}
        <div className="text-center mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <p 
            className="text-gray-600 text-base font-medium px-4 mb-2"
            style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            {isRecording 
              ? `Recording... ${Math.ceil((100 - recordingProgress) * 15 / 100)}s remaining` 
              : isProcessing 
                ? 'Processing with Google Speech-to-Text (English)...'
                : 'Tap the microphone to start recording (max 15 seconds)'
            }
          </p>
          {/* Show API attribution only when idle */}
          {!isRecording && !isProcessing && (
            <p 
              className="text-gray-400 text-xs"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Powered by Google Speech-to-Text API (en-IN)
            </p>
          )}
        </div>

        {/* Mic Button */}
        <div className="flex justify-center mb-8 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <div className="relative">
            {/* Outer Ring for Recording State */}
            {isRecording && (
              <div className="absolute -inset-4 rounded-full border-4 border-red-200 animate-ping opacity-75"></div>
            )}
            {isRecording && (
              <div className="absolute -inset-2 rounded-full border-2 border-red-300"></div>
            )}
            
            <button
              onClick={handleMicClick}
              disabled={isProcessing}
              className={`
                relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
                ${isRecording 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : isProcessing
                    ? 'bg-gray-500 cursor-not-allowed opacity-70'
                    : 'bg-black hover:bg-gray-800 hover:scale-105'
                }
                ${!isProcessing ? 'cursor-pointer active:scale-95' : ''}
              `}
            >
              {/* Progress Ring - Simplified */}
              {isRecording && (
                <div className="absolute -inset-1 rounded-full">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray={`${recordingProgress * 3.02}, 302`}
                      className="transition-all duration-100"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
              
              {/* Mic Icon */}
              <div className={`z-10 ${isRecording ? 'animate-pulse' : ''}`}>
                {isRecording ? (
                  <MicOff size={32} className="text-white" />
                ) : (
                  <Mic size={32} className="text-white" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Transcript Card */}
        {transcript && (
          <div className="mb-8 animate-fade-in-up">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h3 
                  className="text-sm font-medium text-gray-700"
                  style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Transcription:
                </h3>
                <button
                  onClick={resetTest}
                  className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
                  style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Try again
                </button>
              </div>
              <p
                className="text-gray-900 text-base leading-relaxed"
                style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                "{transcript}"
              </p>
            </div>
          </div>
        )}

        {/* Next Button */}
        <div className="flex justify-between mt-8">
          <Link href="/prototype/test-english/step-2" className="inline-block">
            <button
              className="bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 py-3 px-6 rounded-full font-medium text-sm transition-all shadow-sm"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              ← Back
            </button>
          </Link>
          <Link href="/prototype/test-english/step-4" className="inline-block">
            <button
              className="bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 py-3 px-6 rounded-full font-medium text-sm transition-all shadow-sm"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Next →
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
} 