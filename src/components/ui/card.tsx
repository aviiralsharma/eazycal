'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SelectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean
  icon?: React.ReactNode
  title: string
  description?: string
}

export const SelectCard = React.forwardRef<HTMLDivElement, SelectCardProps>(
  ({ className, selected, icon, title, description, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-2xl p-6 text-center transition-colors',
          selected
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-900 hover:bg-gray-50',
          'border-2',
          selected ? 'border-indigo-600' : 'border-gray-200',
          className
        )}
        {...(props as any)}
      >
        {icon && <div className="mb-4 text-3xl">{icon}</div>}
        <h3 className="text-lg font-medium">{title}</h3>
        {description && (
          <p className={cn('mt-2 text-sm', selected ? 'text-indigo-100' : 'text-gray-500')}>
            {description}
          </p>
        )}
      </motion.div>
    )
  }
)

SelectCard.displayName = 'SelectCard'
