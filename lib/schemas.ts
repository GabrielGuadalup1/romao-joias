import { z } from 'zod'

/** Schema do lead de contato. Compartilhado entre a Server Action e o formulário. */
export const leadSchema = z.object({
  nome: z.string().min(2, 'Informe seu nome.'),
  contato: z.string().min(5, 'Informe um WhatsApp ou e-mail.'),
  peca_interesse: z.string().optional(),
  mensagem: z.string().optional(),
  /** Honeypot: humanos deixam vazio; bots preenchem. */
  website: z.string().max(0, 'Campo inválido.').optional(),
})

export type LeadInput = z.infer<typeof leadSchema>
