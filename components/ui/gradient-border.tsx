import { clsx } from 'clsx'

export function GradientBorder({
  children,
  offset = 16,
  className,
}: {
  children: React.ReactNode
  offset?: number
  className?: string
}) {
  return (
    <div
      className={clsx([
        'relative h-full w-full',
        'border border-gray-200 dark:border-zinc-800',
        className,
      ])}
      style={{ '--offset': offset + 'px' } as React.CSSProperties}
    >
      <span
        className={clsx([
          'absolute -top-px right-[--offset] h-px w-[40%]',
          'bg-gradient-to-r from-blue-500/0 via-secondary-500/40 to-secondary-500/0',
          'dark:from-secondary-400/0 dark:via-secondary-400/40 dark:to-secondary-400/0',
        ])}
      />
      <span
        className={clsx([
          'absolute -left-px top-[--offset] h-[40%] w-px',
          'bg-gradient-to-b from-secondary-500/0 via-secondary-500/40 to-secondary-500/0',
          'dark:from-secondary-400/0 dark:via-secondary-400/40 dark:to-secondary-400/0',
        ])}
      />
      {children}
    </div>
  )
}
