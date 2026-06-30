import Link from 'next/link'
import { Eyebrow } from '@/components/marca/Eyebrow'
import { Equador } from '@/components/marca/Equador'

interface ColecaoCard {
  href: string
  titulo: string
  eyebrow: string
  tagline: string
  inicial: string
}

const colecoes: ColecaoCard[] = [
  {
    href: '/colecao/aliancas',
    titulo: 'Alianças',
    eyebrow: 'Para os que se escolhem',
    tagline: 'O sim que dura para sempre.',
    inicial: 'A',
  },
  {
    href: '/colecao?cat=Joias',
    titulo: 'Joias',
    eyebrow: 'Ouro 18k selecionado',
    tagline: 'Peças que atravessam gerações com elegância.',
    inicial: 'J',
  },
  {
    href: '/colecao?cat=Rel%C3%B3gios',
    titulo: 'Relógios',
    eyebrow: 'Precisão e distinção',
    tagline: 'O tempo, guardado com arte.',
    inicial: 'R',
  },
]

export function SecaoColecoes() {
  return (
    <section
      aria-labelledby="colecoes-titulo"
      className="bg-marfim py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">

        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <Eyebrow className="text-onix/70 mb-4">Coleções</Eyebrow>
          <h2
            id="colecoes-titulo"
            className="font-display text-onix text-3xl sm:text-4xl lg:text-5xl"
          >
            Nossas coleções
          </h2>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {colecoes.map((col) => (
            <Link
              key={col.href}
              href={col.href}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-4 focus-visible:ring-offset-marfim rounded-lg"
              aria-label={`Ver coleção ${col.titulo}`}
            >
              <article className="bg-onix rounded-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">

                {/* Filete equador no topo do card */}
                <Equador />

                {/* Corpo do card */}
                <div className="p-8 flex flex-col min-h-[18rem]">

                  {/* Eyebrow */}
                  <p className="font-body uppercase text-pedra text-xs tracking-eyebrow mb-6">
                    {col.eyebrow}
                  </p>

                  {/* Inicial decorativa */}
                  <div
                    aria-hidden="true"
                    className="font-display text-champanhe/30 text-[6rem] leading-none select-none mb-auto"
                  >
                    {col.inicial}
                  </div>

                  {/* Nome e tagline */}
                  <div className="mt-8">
                    <h3 className="font-display text-marfim text-2xl mb-2 group-hover:text-champanhe transition-colors duration-200">
                      {col.titulo}
                    </h3>
                    <p className="font-body text-pedra text-sm leading-relaxed">
                      {col.tagline}
                    </p>

                    {/* Seta discreta de navegação */}
                    <div
                      aria-hidden="true"
                      className="mt-6 flex items-center gap-2 text-champanhe/80 group-hover:text-champanhe transition-colors duration-200"
                    >
                      <span className="font-body text-xs uppercase tracking-eyebrow">
                        Ver coleção
                      </span>
                      <span className="text-sm">→</span>
                    </div>
                  </div>
                </div>

                {/* Filete inferior */}
                <Equador />
              </article>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
