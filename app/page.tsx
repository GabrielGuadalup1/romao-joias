import type { Metadata } from 'next'
import Link from 'next/link'

import { Equador } from '@/components/marca/Equador'
import { Eyebrow } from '@/components/marca/Eyebrow'
import { WhatsAppButton } from '@/components/marca/WhatsAppButton'
import { SecaoColecoes } from '@/components/marca/SecaoColecoes'
import { ProvaSocial } from '@/components/marca/ProvaSocial'

export const metadata: Metadata = {
  title: 'Joalheria em Macapá desde 1962',
  description:
    'ROMÃO JOIAS — joalheria de família em Macapá–AP desde 1962. Alianças, joias e relógios em ouro 18k. Fale no WhatsApp ou agende sua visita.',
  openGraph: {
    title: 'ROMÃO JOIAS — Joalheria em Macapá desde 1962',
    description:
      'Tradição de família em ouro. Alianças, joias e relógios. Agende sua visita.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function Home() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          1. HERO "Marco Zero" — bg-onix
      ───────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-titulo"
        className="bg-onix text-marfim min-h-[90svh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="max-w-6xl mx-auto w-full">

          <Eyebrow className="text-champanhe mb-8">
            Macapá · Amapá · desde 1962
          </Eyebrow>

          {/* Marca tipográfica principal */}
          <div className="mb-6">
            <h1
              id="hero-titulo"
              className="font-display text-marfim text-[clamp(3.5rem,12vw,9rem)] leading-[0.9] tracking-tight"
            >
              ROMÃO
            </h1>
            <p
              aria-hidden="true"
              className="font-body uppercase tracking-joias text-champanhe text-sm sm:text-base mt-3 ml-1"
            >
              JOIAS
            </p>
          </div>

          {/* Filete equador — assinatura visual */}
          <Equador className="my-8 max-w-xs" />

          {/* Subtítulo / conceito Marco Zero */}
          <p className="font-display text-marfim/90 text-xl sm:text-2xl lg:text-3xl max-w-2xl leading-snug italic">
            Onde o mundo se divide ao meio, começam as histórias que duram para sempre.
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-wrap gap-4 items-center">
            <WhatsAppButton />

            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 font-body font-medium text-sm px-6 py-3.5 rounded-lg border border-champanhe/70 text-marfim transition-all duration-200 hover:bg-champanhe/10 hover:border-champanhe active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2 focus-visible:ring-offset-onix"
            >
              Agendar visita
            </Link>
          </div>

        </div>

        {/* Filete de transição para a próxima seção */}
        <Equador className="mt-24" />
      </section>

      {/* ─────────────────────────────────────────────────────────
          2. MANIFESTO — bg-marfim
      ───────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="manifesto-titulo"
        className="bg-marfim text-onix py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto text-center">

          <h2
            id="manifesto-titulo"
            className="font-display text-onix text-3xl sm:text-4xl lg:text-5xl mb-8 leading-tight"
          >
            Tradição de família em ouro.
          </h2>

          <Equador className="max-w-[4rem] mx-auto mb-8" />

          <p className="font-body text-onix/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Há mais de 60 anos e ao longo de três gerações, a ROMÃO JOIAS é referência no
            coração de Macapá. Nascemos na linha do Equador — onde o mundo se divide ao meio
            — e cada peça que entregamos carrega essa história: ouro 18k selecionado, mãos
            que conhecem o ofício e um atendimento próximo, como o de quem recebe amigos.
            Porque joia boa é aquela que atravessa gerações.
          </p>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          3. COLEÇÕES — SecaoColecoes
      ───────────────────────────────────────────────────────── */}
      <SecaoColecoes />

      {/* ─────────────────────────────────────────────────────────
          4. PROVA SOCIAL — ProvaSocial
      ───────────────────────────────────────────────────────── */}
      <ProvaSocial />

      {/* ─────────────────────────────────────────────────────────
          5. CTA FINAL — bg-marfim
      ───────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="cta-final-titulo"
        className="bg-marfim text-onix py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl mx-auto text-center">

          <Eyebrow className="mb-6">Venha nos conhecer</Eyebrow>

          <h2
            id="cta-final-titulo"
            className="font-display text-onix text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight"
          >
            Encontre a peça que conta a sua história.
          </h2>

          <p className="font-body text-onix/70 text-base leading-relaxed mb-10">
            Nossa equipe está pronta para receber você com toda a atenção que o momento
            merece. Fale com a gente pelo WhatsApp ou agende uma visita à loja.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <WhatsAppButton className="text-base px-8 py-4" />

            <Link
              href="/contato"
              className="inline-flex items-center justify-center font-body font-medium text-base px-8 py-4 rounded-lg border border-ouro/60 text-onix transition-all duration-200 hover:bg-ouro/8 hover:border-ouro active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2 focus-visible:ring-offset-marfim"
            >
              Agendar visita
            </Link>
          </div>

          <Equador className="mt-16 max-w-xs mx-auto" />

        </div>
      </section>
    </>
  )
}
