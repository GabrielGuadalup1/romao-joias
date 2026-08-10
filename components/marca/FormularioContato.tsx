'use client'

import { useActionState } from 'react'
import { criarLead, type LeadState } from '@/app/actions/criar-lead'
import { cn } from '@/lib/utils'

const ESTADO_INICIAL: LeadState = { ok: false }

/** Campo de formulário claro (fundo marfim), tokens da marca. */
const CAMPO_BASE = cn(
  'w-full rounded-lg border bg-white/60 px-4 py-3',
  'font-body text-base text-onix placeholder:text-onix/40',
  'transition-colors duration-200',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2 focus-visible:ring-offset-marfim',
)
const CAMPO_OK = 'border-onix/20 hover:border-onix/35'
const CAMPO_ERRO = 'border-[#8C2F1F] ring-1 ring-[#8C2F1F]/30'
const LABEL = 'block font-body text-sm font-medium text-onix mb-2'
const ERRO = 'mt-2 font-body text-sm text-[#8C2F1F]'

export function FormularioContato() {
  const [estado, formAction, pending] = useActionState(criarLead, ESTADO_INICIAL)
  if (estado.ok) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-ouro/40 bg-white/60 px-6 py-10 text-center"
      >
        <p className="font-display text-2xl text-onix">Obrigado pelo contato.</p>
        <p className="mt-3 font-body text-base text-onix/70">
          {estado.mensagem ?? 'Recebemos seu contato, retornaremos em breve.'}
        </p>
      </div>
    )
  }

  const erros = estado.erros ?? {}

  return (
    <form action={formAction} noValidate className="space-y-6">
      <div>
        <label htmlFor="nome" className={LABEL}>
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          autoComplete="name"
          placeholder="Como podemos chamar você"
          aria-invalid={erros.nome ? true : undefined}
          aria-describedby={erros.nome ? 'nome-erro' : undefined}
          className={cn(CAMPO_BASE, erros.nome ? CAMPO_ERRO : CAMPO_OK)}
        />
        {erros.nome && (
          <p id="nome-erro" className={ERRO}>
            {erros.nome}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contato" className={LABEL}>
          Contato (WhatsApp ou e-mail)
        </label>
        <input
          id="contato"
          name="contato"
          type="text"
          autoComplete="tel"
          placeholder="(96) 9 8111-0000"
          aria-invalid={erros.contato ? true : undefined}
          aria-describedby={erros.contato ? 'contato-erro' : undefined}
          className={cn(CAMPO_BASE, erros.contato ? CAMPO_ERRO : CAMPO_OK)}
        />
        {erros.contato && (
          <p id="contato-erro" className={ERRO}>
            {erros.contato}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="peca_interesse" className={LABEL}>
          Peça de interesse <span className="font-normal text-onix/70">(opcional)</span>
        </label>
        <input
          id="peca_interesse"
          name="peca_interesse"
          type="text"
          placeholder="Aliança, anel, relógio..."
          className={cn(CAMPO_BASE, CAMPO_OK)}
        />
      </div>

      <div>
        <label htmlFor="mensagem" className={LABEL}>
          Mensagem <span className="font-normal text-onix/70">(opcional)</span>
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          placeholder="Conte o que você procura."
          className={cn(CAMPO_BASE, CAMPO_OK, 'resize-y')}
        />
      </div>

      {/* Honeypot: invisível para humanos, tentador para bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite" className="min-h-0">
        {!estado.ok && estado.mensagem && <p className={ERRO}>{estado.mensagem}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className={cn(
          'inline-flex w-full items-center justify-center rounded-lg px-6 py-3.5 sm:w-auto',
          'bg-ouro font-body text-sm font-medium text-onix',
          'transition-all duration-200 hover:bg-ouro/85 active:scale-[0.98]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2 focus-visible:ring-offset-marfim',
          'disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100',
        )}
      >
        {pending ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
