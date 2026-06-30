import { cn } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

/**
 * Botão/link de contato WhatsApp reutilizável.
 *
 * Variante primary  → bg-ouro text-onix  (contraste ≈ 5:1, passa AA)
 * Variante outline  → border-champanhe text-marfim (contraste > 14:1 sobre onix)
 *
 * Nota: o prop `refProduto` corresponde ao parâmetro `ref` de buildWhatsAppUrl
 * (referência numérica de produto). O nome foi ajustado para evitar conflito
 * com o prop `ref` reservado pelo React 19.
 */
interface WhatsAppButtonProps {
  nome?: string
  /** Referência do produto, ex: "ALI-001" */
  refProduto?: string
  children?: React.ReactNode
  className?: string
  variant?: 'primary' | 'outline'
}

export function WhatsAppButton({
  nome,
  refProduto,
  children,
  className,
  variant = 'primary',
}: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl({ nome, ref: refProduto })

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        // Base
        'inline-flex items-center justify-center gap-2.5',
        'font-body font-medium text-sm',
        'px-6 py-3.5 rounded-lg',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2',
        // Variantes
        variant === 'primary'
          ? 'bg-ouro text-onix hover:bg-ouro/85 active:scale-[0.98] focus-visible:ring-offset-onix'
          : 'border border-champanhe/70 text-marfim hover:bg-champanhe/10 hover:border-champanhe active:scale-[0.98] focus-visible:ring-offset-onix',
        className,
      )}
    >
      {/* WhatsApp icon — aria-hidden pois o contexto do link já descreve a ação */}
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[1.125rem] h-[1.125rem] shrink-0"
      >
        <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.853.498 3.588 1.371 5.079L2 22l5.09-1.34A9.974 9.974 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.66 0-3.21-.47-4.53-1.28l-.32-.19-3.02.79.82-2.97-.21-.33A8.007 8.007 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.39-5.93c-.24-.12-1.41-.69-1.63-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.1-.49.1-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.4-.54-.41H8.5c-.14 0-.38.05-.58.27s-.76.74-.76 1.8.78 2.1.89 2.24c.11.14 1.54 2.35 3.73 3.3.52.22.93.35 1.25.45.52.16 1 .14 1.37.09.42-.06 1.29-.53 1.47-1.04.18-.51.18-.95.13-1.04-.05-.09-.19-.14-.4-.25z" />
      </svg>

      {children ?? 'Falar no WhatsApp'}
    </a>
  )
}
