import { cn } from '@/lib/utils'

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn('font-body uppercase text-pedra text-xs tracking-eyebrow', className)}>
      {children}
    </p>
  )
}
