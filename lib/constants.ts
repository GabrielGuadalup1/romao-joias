// PLACEHOLDER — trocar pelo WhatsApp real da loja
export const WHATSAPP_NUMERO = '5596000000000'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}`

// PLACEHOLDER — trocar pelo domínio definitivo quando registrado
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://romaojoias.com.br'

/**
 * Dados da loja — fonte única para a página /contato e para o JSON-LD.
 * PLACEHOLDERS marcados com [ ] devem ser trocados pelos dados reais.
 */
export const LOJA = {
  nome: 'ROMÃO JOIAS',
  fundacao: '1962',
  rua: '[ENDEREÇO AQUI]',
  bairro: 'Centro',
  cidade: 'Macapá',
  uf: 'AP',
  cep: '[CEP AQUI]',
  pais: 'BR',
  /** Linhas exibidas na página de contato. */
  horario: ['Segunda a sexta: [HORÁRIO AQUI]', 'Sábado: [HORÁRIO AQUI]', 'Domingo: fechado'],
  /** Formato schema.org (trocar junto com `horario`). */
  horarioSchema: ['Mo-Fr 09:00-18:00', 'Sa 09:00-13:00'],
} as const
