'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/motion/page-transition'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export default function CompletionPage() {
  return (
    <PageTransition className="flex flex-col min-h-full p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8"
        >
          <Check className="w-10 h-10 text-green-600" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          You're all set!
        </h1>
        <p className="text-gray-600 mb-12">
          Start tracking with your voice
        </p>

        <Link href="/dashboard" className="w-full max-w-sm">
          <Button
            fullWidth
            size="lg"
          >
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </PageTransition>
  )
} 