'use server'

import { leadSchema } from '@/lib/schemas'
import { getSupabaseServer } from '@/lib/supabase/server'

export type LeadState = {
  ok: boolean
  erros?: Record<string, string>
  mensagem?: string
}

const SUCESSO = 'Recebemos seu contato, retornaremos em breve.'
const FALHA = 'Não foi possível enviar agora. Tente pelo WhatsApp.'

export async function criarLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const dados = Object.fromEntries(formData)

  // Honeypot: bot preencheu o campo oculto. Finge sucesso e não grava.
  if (typeof dados.website === 'string' && dados.website.length > 0) {
    return { ok: true, mensagem: SUCESSO }
  }

  const parsed = leadSchema.safeParse(dados)
  if (!parsed.success) {
    const erros: Record<string, string> = {}
    for (const issue of parsed.error.issues) erros[String(issue.path[0])] = issue.message
    return { ok: false, erros }
  }

  const supabase = getSupabaseServer()
  const { error } = await supabase.from('leads').insert({
    nome: parsed.data.nome,
    contato: parsed.data.contato,
    peca_interesse: parsed.data.peca_interesse || null,
    mensagem: parsed.data.mensagem || null,
  })
  if (error) return { ok: false, mensagem: FALHA }

  return { ok: true, mensagem: SUCESSO }
}
