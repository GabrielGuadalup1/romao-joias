import type { Metadata } from 'next'

import { Equador } from '@/components/marca/Equador'
import { Eyebrow } from '@/components/marca/Eyebrow'
import { WhatsAppButton } from '@/components/marca/WhatsAppButton'
import { FormularioContato } from '@/components/marca/FormularioContato'

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Fale com a ROMÃO JOIAS em Macapá–AP. WhatsApp, endereço, horário de atendimento e formulário para agendar sua visita.',
  openGraph: {
    title: 'Contato — ROMÃO JOIAS',
    description:
      'Estamos em Macapá–AP desde 1962. Fale no WhatsApp ou deixe seu contato: retornamos em breve.',
    locale: 'pt_BR',
    type: 'website',
  },
}

const SECTION = 'px-4 sm:px-6 lg:px-8'

// PLACEHOLDERS — trocar pelos dados reais da loja
const ENDERECO = ['[ENDEREÇO AQUI]', 'Centro — Macapá, AP']
const HORARIO = ['Segunda a sexta: [HORÁRIO AQUI]', 'Sábado: [HORÁRIO AQUI]', 'Domingo: fechado']

export default function ContatoPage() {
  return (
    <>
      {/* Hero — ônix */}
      <section className={`bg-onix text-marfim py-20 sm:py-28 ${SECTION}`}>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="text-champanhe">Contato</Eyebrow>
          <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Venha conhecer de perto.
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-marfim/80 sm:text-lg">
            Estamos em Macapá desde 1962. Fale conosco no WhatsApp, passe na loja ou deixe seu
            contato — retornamos em breve.
          </p>
        </div>
      </section>

      <Equador />

      {/* Dados + formulário — marfim */}
      <section className={`bg-marfim py-20 sm:py-24 ${SECTION}`}>
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Coluna A — dados da loja */}
          <div>
            <Eyebrow className="text-onix/70">A loja</Eyebrow>
            <h2 className="mt-4 font-display text-3xl text-onix sm:text-4xl">Onde nos encontrar</h2>

            <dl className="mt-10 space-y-8">
              <div>
                <dt className="font-body text-sm font-medium tracking-wide text-onix/70 uppercase">
                  Endereço
                </dt>
                <dd className="mt-2 font-body text-base leading-relaxed text-onix">
                  {ENDERECO.map((linha) => (
                    <span key={linha} className="block">
                      {linha}
                    </span>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="font-body text-sm font-medium tracking-wide text-onix/70 uppercase">
                  Horário de atendimento
                </dt>
                <dd className="mt-2 font-body text-base leading-relaxed text-onix">
                  {HORARIO.map((linha) => (
                    <span key={linha} className="block">
                      {linha}
                    </span>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="font-body text-sm font-medium tracking-wide text-onix/70 uppercase">
                  WhatsApp
                </dt>
                <dd className="mt-3">
                  <WhatsAppButton nome="Contato" ringOffset="marfim" />
                </dd>
              </div>
            </dl>

            {/* PLACEHOLDER — trocar pelo embed do Google Maps da loja */}
            <div
              role="img"
              aria-label="Mapa da localização da loja — imagem a ser inserida"
              className="mt-10 flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-onix/15 bg-onix/[0.04]"
            >
              <span className="font-body text-xs tracking-[0.2em] text-onix/70 uppercase">
                [MAPA AQUI]
              </span>
            </div>
          </div>

          {/* Coluna B — formulário */}
          <div>
            <Eyebrow className="text-onix/70">Fale conosco</Eyebrow>
            <h2 className="mt-4 font-display text-3xl text-onix sm:text-4xl">
              Deixe seu contato
            </h2>
            <p className="mt-4 mb-10 font-body text-base leading-relaxed text-onix/70">
              Conte o que você procura. Retornamos pelo canal que você preferir.
            </p>
            <FormularioContato />
          </div>
        </div>
      </section>
    </>
  )
}
