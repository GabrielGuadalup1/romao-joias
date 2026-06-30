import type { Produto } from '@/lib/database.types'
import { Equador } from '@/components/marca/Equador'
import { Eyebrow } from '@/components/marca/Eyebrow'
import { WhatsAppButton } from '@/components/marca/WhatsAppButton'
import { ProductPlaceholder } from '@/components/marca/ProductPlaceholder'

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function ProductCard({ produto }: { produto: Produto }) {
  return (
    <article className="group flex flex-col transition-transform duration-300 hover:-translate-y-1">
      <ProductPlaceholder categoria={produto.categoria} />

      {/* Filete dourado que aparece no hover */}
      <Equador className="mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex flex-1 flex-col pt-4">
        <Eyebrow className="mb-1 text-onix/70">REF {produto.ref}</Eyebrow>
        <h3 className="font-display text-lg leading-snug text-onix">{produto.nome}</h3>
        <p className="mt-1 font-display text-base font-medium text-onix">
          {brl.format(produto.preco)}
        </p>
        <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-onix/70">
          {produto.descricao}
        </p>

        <div className="mt-4">
          <WhatsAppButton
            nome={produto.nome}
            refProduto={produto.ref}
            ringOffset="marfim"
            className="w-full"
          />
        </div>
      </div>
    </article>
  )
}
