import React, { ButtonHTMLAttributes } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { Slot } from '@radix-ui/react-slot'

const button = tv({
  base: [
    'rounded-md px-4 py-2 text-sm outline-none shadow-sm',
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500',
    'active:opacity-80',
  ],
  variants: {
    variant: {
      ghost: 'rounded-md px-2 shadow-none dark:hover:bg-white/5',
      primary: 'bg-blue-primary text-white hover:bg-blue-hover w-[200px]',
      outline:
        'border border-blue-primary text-blue-primary hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, variant, className, ...props }, ref) => {
    const Component = asChild ? Slot : 'button'

    return (
      <Component
        {...props}
        ref={ref}
        className={button({ variant, className })}
      />
    )
  },
)
