'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-indigo-600 text-white hover:bg-indigo-700',
        secondary: 'bg-indigo-100 text-indigo-900 hover:bg-indigo-200',
        outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
        ghost: 'text-indigo-600 hover:bg-indigo-50',
      },
      size: {
        default: 'h-14 px-6',
        sm: 'h-10 px-4',
        lg: 'h-16 px-8 text-lg',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
)

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & VariantProps<typeof buttonVariants>

// Utility to omit known conflicting props
const omitMotionConflicts = (props: Record<string, any>) => {
  const {
    onAnimationStart,
    onDrag,
    onDragEnd,
    onDragStart,
    onDragTransitionEnd,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    ...rest
  } = props
  return rest
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (navigator.vibrate) {
        navigator.vibrate(30)
      }
      props.onClick?.(e)
    }

    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        onClick={handleClick}
        {...omitMotionConflicts(props)}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants } 