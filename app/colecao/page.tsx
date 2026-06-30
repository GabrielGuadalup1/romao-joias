import type { Metadata } from 'next'
import Link from 'next/link'

import { getProdutos } from '@/lib/produtos'
import type { Categoria } from '@/lib/database.types'
import { cn } from '@/lib/utils'
import { Equador } from '@/components/marca/Equador'
import { Eyebrow } from '@/components/marca/Eyebrow'
import { WhatsAppButton } from '@/components/marca/WhatsAppButton'
import { ProductCard } from '@/components/marca/ProductCard'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Coleção',
  description:
    'Conheça a coleção da ROMÃO JOIAS: alianças, joias e relógios em ouro 18k. Fale no WhatsApp e agende sua visita à loja em Macapá–AP.',
  openGraph: {
    title: 'Coleção — ROMÃO JOIAS',
    description: 'Alianças, joias e relógios em ouro 18k. Tradição de família desde 1962.',
    locale: 'pt_BR',
    type: 'website',
  },
}

const CATEGORIAS: Categoria[] = ['Alianças', 'Joias', 'Relógios']

const FILTROS: { label: string; cat?: Categoria }[] = [
  { label: 'Todas' },
  { label: 'Alianças', cat: 'Alianças' },
  { label: 'Joias', cat: 'Joias' },
  { label: 'Relógios', cat: 'Relógios' },
]

export default async function Colecao({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams
  const categoria = CATEGORIAS.includes(cat as Categoria) ? (cat as Categoria) : undefined
  const produtos = await getProdutos(categoria)

  return (
    <section className="bg-marfim text-onix py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Eyebrow className="mb-4 text-onix/70">Nossa vitrine</Eyebrow>
        <h1 className="font-display text-4xl leading-tight text-onix sm:text-5xl">Coleção</h1>
        <Equador className="mb-10 mt-6 max-w-xs" />

        <nav aria-label="Filtrar por categoria" className="mb-12 flex flex-wrap gap-2">
          {FILTROS.map((f) => {
            const ativo = f.cat === categoria
            return (
              <Link
                key={f.label}
                href={f.cat ? `/colecao?cat=${encodeURIComponent(f.cat)}` : '/colecao'}
                aria-current={ativo ? 'page' : undefined}
                className={cn(
                  'rounded-full border px-4 py-2 font-body text-sm transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2 focus-visible:ring-offset-marfim',
                  ativo
                    ? 'border-ouro bg-ouro/10 font-medium text-onix'
                    : 'border-onix/15 text-onix/80 hover:border-ouro/60 hover:text-onix',
                )}
              >
                {f.label}
              </Link>
            )
          })}
        </nav>

        {produtos.length > 0 ? (
          <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produtos.map((p) => (
              <li key={p.id}>
                <ProductCard produto={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto max-w-md py-16 text-center">
            <p className="mb-4 font-display text-2xl text-onix">Em breve, novas peças aqui.</p>
            <p className="mb-8 font-body text-onix/70">
              Ainda não temos peças desta categoria no site. Fale com a gente no WhatsApp — temos
              muito mais na loja.
            </p>
            <WhatsAppButton ringOffset="marfim" />
          </div>
        )}
      </div>
    </section>
  )
}
