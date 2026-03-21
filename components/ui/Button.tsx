import { cn } from '@/lib/utils'

const variantStyles = {
  primary:
    'bg-slate text-white hover:bg-earth hover:text-white',
  secondary:
    'border border-slate bg-transparent text-slate hover:bg-slate hover:text-white',
  moss: 'bg-moss text-white hover:bg-ink hover:text-colza',
  ghost: 'bg-transparent text-slate hover:bg-slate/10',
  earth: 'bg-earth text-white hover:bg-slate hover:text-colza',
} as const

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs uppercase tracking-[0.1em]',
  md: 'px-5 py-2.5 text-xs uppercase tracking-[0.1em]',
  lg: 'px-7 py-3.5 text-sm uppercase tracking-[0.08em]',
} as const

type ButtonBaseProps = {
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
  children: React.ReactNode
  className?: string
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined
  }

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-mono font-medium transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth',
    'disabled:pointer-events-none disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  const buttonProps = props as Omit<ButtonAsButton, keyof ButtonBaseProps>
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
