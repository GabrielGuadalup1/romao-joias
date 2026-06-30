import { cn } from '@/lib/utils'
import { Equador } from '@/components/marca/Equador'
import { Eyebrow } from '@/components/marca/Eyebrow'

export function ProductPlaceholder({
  categoria,
  className,
}: {
  categoria?: string
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label="Foto da peça em breve"
      className={cn(
        'relative aspect-[4/5] w-full overflow-hidden rounded-lg',
        'border border-champanhe/50 bg-marfim',
        'flex items-center justify-center',
        className,
      )}
    >
      {/* Equador cruzando atrás do monograma */}
      <Equador className="absolute left-0 right-0 top-1/2 -translate-y-1/2" />

      {/* Monograma R */}
      <span
        aria-hidden="true"
        className="relative font-display text-ouro text-6xl sm:text-7xl leading-none"
      >
        R
      </span>

      {/* Rótulo [FOTO AQUI] */}
      <Eyebrow className="absolute bottom-4 left-0 right-0 text-center text-onix/70">
        {categoria ? `${categoria} · [FOTO AQUI]` : '[FOTO AQUI]'}
      </Eyebrow>
    </div>
  )
}
