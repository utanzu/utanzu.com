import { clsx } from 'clsx'
import type { CSSProperties } from 'react'

export function GrowingUnderline({
  as: Component = 'span',
  children,
  active,
  className,
  duration,
  ...rest
}: {
  children: React.ReactNode
  as?: React.ElementType
  active?: boolean
  className?: string
  duration?: number
  [key: string]: unknown
}) {
  return (
    <Component
      className={clsx([
        'bg-gradient-to-r bg-left-bottom bg-no-repeat',
        'transition-[background-size] duration-[var(--duration,300ms)]',
        'from-orange-200 to-orange-100',
        'dark:from-orange-400 dark:to-orange-700',
        active
          ? 'bg-[length:100%_20%] hover:bg-[length:100%_100%]'
          : 'bg-[length:0px_20%] hover:bg-[length:100%_20%]',
        className,
      ])}
      style={{ '--duration': `${duration || 300}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Component>
  )
}
