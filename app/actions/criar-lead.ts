'use server'

import { headers } from 'next/headers'

import { leadSchema } from '@/lib/schemas'
import { getSupabaseServer } from '@/lib/supabase/server'
import { checarRateLimit } from '@/lib/rate-limit'

export type LeadState = {
  ok: boolean
  erros?: Record<string, string>
  mensagem?: string
}

const SUCESSO = 'Recebemos seu contato, retornaremos em breve.'
const FALHA = 'Não foi possível enviar agora. Tente pelo WhatsApp.'
const EXCESSO = 'Você já enviou várias mensagens. Aguarde um pouco ou fale direto no WhatsApp.'

/**
 * IP de origem para o rate limit. Em produção (Vercel) vem de `x-forwarded-for`;
 * o primeiro item é o cliente real. Sem header (dev/local) cai num balde único.
 */
async function ipDaRequisicao(): Promise<string> {
  const h = await headers()
  const encaminhado = h.get('x-forwarded-for')
  if (encaminhado) return encaminhado.split(',')[0].trim()
  return h.get('x-real-ip')?.trim() || 'desconhecido'
}

export async function criarLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const dados = Object.fromEntries(formData)

  // Honeypot: bot preencheu o campo oculto. Finge sucesso e não grava.
  // Vem antes do rate limit para não gastar a cota de um IP legítimo compartilhado.
  if (typeof dados.website === 'string' && dados.website.length > 0) {
    return { ok: true, mensagem: SUCESSO }
  }

  const parsed = leadSchema.safeParse(dados)
  if (!parsed.success) {
    const erros: Record<string, string> = {}
    for (const issue of parsed.error.issues) erros[String(issue.path[0])] = issue.message
    return { ok: false, erros }
  }

  // Rate limit só depois da validação: conta tentativas reais de gravação,
  // não formulários incompletos de quem está preenchendo.
  const { permitido } = checarRateLimit(await ipDaRequisicao())
  if (!permitido) return { ok: false, mensagem: EXCESSO }

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
