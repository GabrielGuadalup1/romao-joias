import type { Metadata } from 'next'
import Link from 'next/link'

import { getProdutos } from '@/lib/produtos'
import { Equador } from '@/components/marca/Equador'
import { Eyebrow } from '@/components/marca/Eyebrow'
import { WhatsAppButton } from '@/components/marca/WhatsAppButton'
import { ProductCard } from '@/components/marca/ProductCard'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Alianças — o sim que dura para sempre',
  description:
    'Alianças em ouro 18k legítimo, com gravação interna inclusa e ajuste de tamanho. Tradição de família em Macapá–AP desde 1962. Fale no WhatsApp e agende sua visita.',
  openGraph: {
    title: 'Alianças ROMÃO JOIAS — o sim que dura para sempre',
    description:
      'Ouro 18k legítimo, gravação inclusa e atendimento de família há mais de 60 anos. Escolha a aliança que vai atravessar a vida de vocês.',
    locale: 'pt_BR',
    type: 'website',
  },
}

const SECTION = 'px-4 sm:px-6 lg:px-8'
const BTN_ESCURO =
  'inline-flex items-center justify-center gap-2 font-body font-medium text-sm px-6 py-3.5 rounded-lg border border-champanhe/70 text-marfim transition-all duration-200 hover:bg-champanhe/10 hover:border-champanhe active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2 focus-visible:ring-offset-onix'

const argumentos = [
  {
    titulo: 'Ouro 18k legítimo',
    texto:
      'Cada aliança é feita em ouro 18k de verdade, com a pureza que você espera de uma joalheria com mais de seis décadas de nome.',
  },
  {
    titulo: 'Gravação inclusa',
    texto:
      'Nomes, a data do sim ou uma frase só de vocês: a gravação interna vai por nossa conta, feita com capricho.',
  },
  {
    titulo: 'Ajuste de tamanho',
    texto:
      'O dedo muda com o tempo — e a aliança acompanha. Ajustamos o tamanho para que ela continue perfeita por toda a vida.',
  },
  {
    titulo: 'Atendimento de família',
    texto:
      'Desde 1962, as mesmas famílias voltam à Romão. Você é atendido por quem entende de ouro e trata a sua escolha como se fosse a nossa.',
  },
]

const faq = [
  {
    pergunta: 'Vocês fazem gravação?',
    resposta:
      'Sim. A gravação interna é inclusa: pode ser os nomes do casal, a data do casamento ou uma frase especial. É só nos dizer o que você quer eternizar.',
  },
  {
    pergunta: 'É possível ajustar o tamanho depois?',
    resposta:
      'Sim. Fazemos o ajuste de tamanho da aliança para que ela continue confortável ao longo do tempo. Traga a peça à loja que cuidamos disso para você.',
  },
  {
    pergunta: 'Posso agendar uma visita?',
    resposta:
      'Claro. O melhor jeito de escolher uma aliança é experimentando. Agende uma visita à nossa loja em Macapá e receba atendimento sem pressa.',
  },
  {
    pergunta: 'Trabalham com encomenda?',
    resposta:
      'Sim. Se você tem um modelo em mente ou quer algo sob medida, conversamos sobre a encomenda e combinamos cada detalhe antes de começar.',
  },
]

export default async function AliancasLanding() {
  const aliancas = await getProdutos('Alianças')

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={`bg-onix text-marfim py-24 sm:py-32 ${SECTION}`}>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-5 text-champanhe">Coleção de alianças</Eyebrow>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
            O sim que dura para sempre.
          </h1>
          <Equador className="mx-auto my-8 max-w-xs" />
          <p className="mx-auto max-w-xl font-body text-base leading-relaxed text-marfim/80 sm:text-lg">
            Alianças em ouro 18k legítimo, com gravação interna inclusa. Escolha, ao lado de quem
            entende de ouro há mais de 60 anos, o par que vai atravessar a vida de vocês.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton variant="outline" ringOffset="onix">
              Falar sobre alianças
            </WhatsAppButton>
            <Link href="/contato" className={BTN_ESCURO}>
              Agendar visita
            </Link>
          </div>
        </div>
      </section>

      {/* ── Argumentos ────────────────────────────────────── */}
      <section className={`bg-marfim text-onix py-20 sm:py-24 ${SECTION}`}>
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <Eyebrow className="mb-4 text-onix/70">Por que a Romão</Eyebrow>
            <h2 className="font-display text-3xl leading-tight text-onix sm:text-4xl">
              Uma aliança feita para durar uma vida.
            </h2>
            <Equador className="mt-6 max-w-xs" />
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            {argumentos.map((a) => (
              <li key={a.titulo}>
                <h3 className="font-display text-xl text-onix">{a.titulo}</h3>
                <p className="mt-2 font-body text-base leading-relaxed text-onix/70">{a.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Grade de alianças ─────────────────────────────── */}
      <section className={`bg-marfim text-onix pb-20 sm:pb-24 ${SECTION}`}>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <Eyebrow className="mb-4 text-onix/70">Nossas alianças</Eyebrow>
            <h2 className="font-display text-3xl leading-tight text-onix sm:text-4xl">
              Modelos para o seu sim.
            </h2>
            <Equador className="mt-6 max-w-xs" />
          </div>

          {aliancas.length > 0 ? (
            <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {aliancas.map((p) => (
                <li key={p.id}>
                  <ProductCard produto={p} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-12 max-w-md">
              <p className="mb-4 font-display text-2xl text-onix">
                Novos modelos chegando à vitrine.
              </p>
              <p className="mb-8 font-body text-onix/70">
                Temos muito mais alianças na loja do que conseguimos mostrar aqui. Fale com a gente
                no WhatsApp e conte o que você procura.
              </p>
              <WhatsAppButton ringOffset="marfim">Ver alianças no WhatsApp</WhatsAppButton>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className={`bg-marfim text-onix pb-20 sm:pb-24 ${SECTION}`}>
        <div className="mx-auto max-w-3xl">
          <Eyebrow className="mb-4 text-onix/70">Dúvidas frequentes</Eyebrow>
          <h2 className="font-display text-3xl leading-tight text-onix sm:text-4xl">
            Antes de dizer sim.
          </h2>
          <Equador className="mt-6 mb-10 max-w-xs" />

          <Accordion className="border-t border-onix/10">
            {faq.map((f) => (
              <AccordionItem
                key={f.pergunta}
                value={f.pergunta}
                className="border-onix/10"
              >
                <AccordionTrigger className="py-5 font-display text-lg text-onix">
                  {f.pergunta}
                </AccordionTrigger>
                <AccordionContent className="font-body text-base leading-relaxed text-onix/70">
                  <p>{f.resposta}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────── */}
      <section className={`bg-onix text-marfim py-24 sm:py-28 ${SECTION}`}>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mb-5 text-champanhe">O próximo capítulo é de vocês</Eyebrow>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            Venha escolher a aliança que vai durar para sempre.
          </h2>
          <Equador className="mx-auto my-8 max-w-xs" />
          <p className="mx-auto max-w-xl font-body text-base leading-relaxed text-marfim/80 sm:text-lg">
            Fale com a gente no WhatsApp ou agende uma visita à nossa loja em Macapá. Atendimento de
            família, sem pressa, para o dia mais importante de vocês.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton variant="outline" ringOffset="onix">
              Falar sobre alianças
            </WhatsAppButton>
            <Link href="/contato" className={BTN_ESCURO}>
              Agendar visita
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
