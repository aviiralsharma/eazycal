'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-black text-white hover:bg-gray-800',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700',
        outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full',
        ghost: 'text-gray-600 hover:bg-gray-50',
      },
      size: {
        default: 'py-4 px-4',
        sm: 'py-2 px-3 text-sm',
        lg: 'py-4 px-6 text-lg',
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

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (navigator.vibrate) {
        navigator.vibrate(30)
      }
      props.onClick?.(e)
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        onClick={handleClick}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants } 