import type { Metadata } from 'next'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Equador } from '@/components/marca/Equador'
import { Eyebrow } from '@/components/marca/Eyebrow'
import { WhatsAppButton } from '@/components/marca/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Nossa história',
  description:
    'A história da ROMÃO JOIAS: fundada em 1962 na terra do Marco Zero, em Macapá–AP. Três gerações de uma família dedicada a joias que atravessam o tempo.',
  openGraph: {
    title: 'Nossa história — ROMÃO JOIAS',
    description:
      'Desde 1962, na linha do Equador, em Macapá–AP. Tradição de família em ouro, ao longo de três gerações.',
    locale: 'pt_BR',
    type: 'website',
  },
}

const SECTION = 'px-4 sm:px-6 lg:px-8'
const H2 = 'font-display leading-tight'
const PARAGRAFO = 'font-body text-base sm:text-lg leading-relaxed'
const BTN_SECUNDARIO =
  'inline-flex items-center justify-center font-body font-medium text-base px-8 py-4 rounded-lg border border-ouro/60 text-onix transition-all duration-200 hover:bg-ouro/8 hover:border-ouro active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2 focus-visible:ring-offset-marfim'

const linhaDoTempo = [
  {
    ano: '1962',
    titulo: 'O começo, no Marco Zero',
    texto:
      'A ROMÃO JOIAS abre as portas em Macapá, na terra onde a linha do Equador divide o mundo ao meio. Desde o primeiro dia, uma ideia simples: vender joias que merecem durar uma vida inteira.',
  },
  {
    ano: 'Décadas seguintes',
    titulo: 'Confiança que vira hábito',
    texto:
      'Aliança após aliança, presente após presente, a loja se torna parte das histórias de família de Macapá. O nome Romão passa a ser sinônimo de ouro de verdade e palavra cumprida.',
  },
  {
    ano: 'Três gerações',
    titulo: 'O ofício passa de mão em mão',
    texto:
      'O conhecimento sobre o metal, o olhar para as pedras e o atendimento atravessam pais, filhos e netos. Cada geração herda a mesma exigência: nada sai da loja sem estar à altura de quem confia na gente.',
  },
  {
    ano: 'Hoje',
    titulo: 'Referência que não envelhece',
    texto:
      'Mais de 60 anos depois, seguimos no coração de Macapá — agora também online. A mesma joalheria de família, pronta para celebrar os próximos "sim que duram para sempre".',
  },
]

const valores = [
  {
    titulo: 'Confiança',
    texto:
      'Mais de seis décadas atendendo as mesmas famílias. A relação importa tanto quanto a peça.',
  },
  {
    titulo: 'Atemporalidade',
    texto:
      'Fugimos de modismos. Buscamos o desenho que será tão bonito daqui a trinta anos quanto é hoje.',
  },
  {
    titulo: 'Ouro 18k',
    texto:
      'Trabalhamos com ouro legítimo e acabamento cuidadoso. Joia boa é aquela que se pode passar adiante.',
  },
]

export default function Historia() {
  return (
    <>
      {/* 1. HERO */}
      <section
        aria-labelledby="historia-titulo"
        className={cn('bg-onix text-marfim py-24 sm:py-28', SECTION)}
      >
        <div className="max-w-4xl mx-auto">
          <Eyebrow className="text-champanhe mb-8">Nossa história · desde 1962</Eyebrow>
          <h1
            id="historia-titulo"
            className="font-display text-marfim text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight"
          >
            Nascidos onde o mundo se divide ao meio.
          </h1>
          <Equador className="my-8 max-w-xs" />
          <p className="font-display text-marfim/90 text-xl sm:text-2xl max-w-2xl leading-snug italic">
            Na terra do Marco Zero, em Macapá, começam histórias feitas para durar para sempre.
          </p>
        </div>
      </section>

      {/* 2. ORIGEM */}
      <section aria-labelledby="origem-titulo" className={cn('bg-marfim text-onix py-24', SECTION)}>
        <div className="max-w-3xl mx-auto">
          <Eyebrow className="text-onix/70 mb-6">1962 · Marco Zero</Eyebrow>
          <h2 id="origem-titulo" className={cn('text-onix text-3xl sm:text-4xl mb-8', H2)}>
            Uma joalheria nascida na linha do Equador.
          </h2>
          <p className={cn('text-onix/80', PARAGRAFO)}>
            A ROMÃO JOIAS nasceu em 1962, em Macapá, na única capital do país cortada pela linha do
            Equador. Foi ali, no ponto exato em que o mundo se divide ao meio, que a nossa família
            escolheu fazer do ouro um ofício. Desde então, atravessamos gerações com a mesma
            convicção: uma joia não é apenas um objeto bonito — é um pedaço de história que se
            entrega de mãos dadas, para ser guardado e passado adiante.
          </p>
        </div>
      </section>

      {/* 3. FAMÍLIA / GERAÇÕES */}
      <section aria-labelledby="familia-titulo" className={cn('bg-onix text-marfim py-24', SECTION)}>
        <div className="max-w-3xl mx-auto">
          <Eyebrow className="text-champanhe mb-6">Três gerações</Eyebrow>
          <h2 id="familia-titulo" className={cn('text-marfim text-3xl sm:text-4xl mb-8', H2)}>
            O mesmo cuidado, de pais para filhos.
          </h2>
          <p className={cn('text-marfim/80', PARAGRAFO)}>
            O que aprendemos sobre joias não veio de pressa, e sim de tempo. O conhecimento do metal,
            o olhar para as pedras e, principalmente, a forma de receber cada cliente foram passados
            de uma geração à outra dentro de casa. É por isso que, ao entrar na ROMÃO, você não fala
            com um vendedor qualquer: fala com alguém que cresceu cuidando do que é importante para a
            sua família.
          </p>
        </div>
      </section>

      {/* 4. VALORES */}
      <section aria-labelledby="valores-titulo" className={cn('bg-marfim text-onix py-24', SECTION)}>
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-14">
            <Eyebrow className="text-onix/70 mb-6">O que nos guia</Eyebrow>
            <h2 id="valores-titulo" className={cn('text-onix text-3xl sm:text-4xl', H2)}>
              Valores que não saem de moda.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            {valores.map((v) => (
              <div key={v.titulo}>
                <Equador className="max-w-[3rem] mb-5" />
                <h3 className="font-display text-onix text-xl sm:text-2xl mb-3">{v.titulo}</h3>
                <p className="font-body text-onix/75 text-base leading-relaxed">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LINHA DO TEMPO — eixo dourado vertical */}
      <section aria-labelledby="linha-titulo" className={cn('bg-onix text-marfim py-24', SECTION)}>
        <div className="max-w-3xl mx-auto">
          <Eyebrow className="text-champanhe mb-6">Linha do tempo</Eyebrow>
          <h2 id="linha-titulo" className={cn('text-marfim text-3xl sm:text-4xl mb-14', H2)}>
            De 1962 até aqui.
          </h2>
          <ol className="relative">
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-ouro to-transparent"
            />
            {linhaDoTempo.map((item) => (
              <li key={item.ano} className="relative pl-10 pb-12 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-ouro bg-onix"
                />
                <p className="font-display text-champanhe text-lg sm:text-xl mb-1">{item.ano}</p>
                <h3 className="font-display text-marfim text-xl sm:text-2xl mb-2">{item.titulo}</h3>
                <p className="font-body text-marfim/75 text-base leading-relaxed">{item.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section
        aria-labelledby="cta-historia-titulo"
        className={cn('bg-marfim text-onix py-24', SECTION)}
      >
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow className="text-onix/70 mb-6">Faça parte da próxima página</Eyebrow>
          <h2
            id="cta-historia-titulo"
            className={cn('text-onix text-3xl sm:text-4xl lg:text-5xl mb-6', H2)}
          >
            Venha escrever a sua história com a gente.
          </h2>
          <p className="font-body text-onix/70 text-base leading-relaxed mb-10">
            Seja para uma aliança, um presente ou aquela peça que você guarda há tempos no
            pensamento — será um prazer receber você. Fale no WhatsApp ou agende uma visita à loja.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <WhatsAppButton className="text-base px-8 py-4" />
            <Link href="/contato" className={BTN_SECUNDARIO}>
              Agendar visita
            </Link>
          </div>
          <Equador className="mt-16 max-w-xs mx-auto" />
        </div>
      </section>
    </>
  )
}
