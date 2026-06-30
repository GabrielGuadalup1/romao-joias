import { WHATSAPP_NUMERO } from '@/lib/constants'

export function buildWhatsAppUrl(opts?: { nome?: string; ref?: string }): string {
  const texto = opts?.nome
    ? `Olá! Tenho interesse na peça ${opts.nome}${opts.ref ? ` (ref ${opts.ref})` : ''} da ROMÃO JOIAS. Poderiam me dar mais informações?`
    : 'Olá! Gostaria de saber mais sobre a ROMÃO JOIAS e agendar uma visita.'
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`
}
