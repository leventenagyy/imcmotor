import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'ghostLight' | 'link'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-medium select-none cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none'

const variantClasses: Record<Variant, string> = {
  primary: 'rounded-md bg-accent text-accent-ink hover:bg-accent-hover',
  secondary: 'rounded-md bg-ink text-paper hover:bg-ink-soft',
  ghost: 'rounded-md border border-hairline text-ink hover:border-ink bg-transparent',
  ghostLight: 'rounded-md border border-paper/30 text-paper hover:border-paper hover:bg-paper/5 bg-transparent',
  link: 'text-ink underline underline-offset-4 decoration-1 hover:text-accent p-0',
}

// Sizes keep primary/secondary/ghost ≥44px tall (touch target, a11y gate).
const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-4 py-2.5',
  md: 'text-sm px-6 py-3.5',
  lg: 'text-base px-8 py-4',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    to?: string
    href?: string
  }

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  to,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(
    base,
    variantClasses[variant],
    variant !== 'link' && sizeClasses[size],
    fullWidth && 'w-full',
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
