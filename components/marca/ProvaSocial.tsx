import { Eyebrow } from '@/components/marca/Eyebrow'
import { Equador } from '@/components/marca/Equador'

interface Depoimento {
  texto: string
  nome: string
  contexto: string
}

// [DEPOIMENTOS PROVISÓRIOS — substituir pelos reais antes de publicar]
const depoimentos: Depoimento[] = [
  {
    texto:
      'Compramos nossas alianças na Romão e, anos depois, voltamos para o anel de aniversário. Sempre fui tratada como família, com toda a atenção que esse momento merece.',
    nome: 'Ana Paula M.',
    contexto: 'Cliente há 12 anos',
  },
  {
    texto:
      'A qualidade do ouro 18k e o acabamento impecável me surpreenderam. Minha filha usa o colar que ganhei da Romão até hoje — já tem mais de quinze anos.',
    nome: 'José Carlos F.',
    contexto: 'Macapá – AP',
  },
  {
    texto:
      'Atendimento próximo, sem pressa. Senti que minha escolha importava para eles tanto quanto importava para mim. Volto sempre.',
    nome: 'Mariana S.',
    contexto: 'Cliente há 8 anos',
  },
]

export function ProvaSocial() {
  return (
    <section
      aria-labelledby="prova-social-titulo"
      className="bg-onix text-marfim py-24 px-4 sm:px-6 lg:px-8"
    >
      <Equador className="mb-16" />

      <div className="max-w-6xl mx-auto">

        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <Eyebrow className="text-champanhe mb-4">
            Quem escolhe a Romão
          </Eyebrow>
          <h2
            id="prova-social-titulo"
            className="font-display text-marfim text-3xl sm:text-4xl lg:text-5xl"
          >
            Quem confia na ROMÃO
          </h2>
        </div>

        {/* Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {depoimentos.map((dep, i) => (
            <figure key={i} className="flex flex-col">
              {/* [DEPOIMENTO PROVISÓRIO — substituir pelos reais] */}

              {/* Aspas decorativas */}
              <div
                aria-hidden="true"
                className="font-display text-champanhe/40 text-5xl leading-none mb-4 select-none"
              >
                "
              </div>

              {/* Texto */}
              <blockquote className="font-body text-marfim/80 text-sm leading-relaxed flex-1 italic">
                {dep.texto}
              </blockquote>

              {/* Atribuição */}
              <figcaption className="mt-6 pt-4 border-t border-champanhe/20">
                <p className="font-body font-medium text-champanhe text-sm">{dep.nome}</p>
                <p className="font-body text-pedra text-xs mt-0.5">{dep.contexto}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Selo de legado */}
        <div className="flex justify-center">
          <div className="inline-flex flex-col items-center gap-3">
            <Equador className="w-24" />
            <p className="font-display text-champanhe text-lg tracking-wide">
              60+ anos · 3 gerações
            </p>
            <p className="font-body text-pedra text-xs uppercase tracking-eyebrow">
              Joalheria de família em Macapá desde 1962
            </p>
            <Equador className="w-24" />
          </div>
        </div>

      </div>

      <Equador className="mt-16" />
    </section>
  )
}
