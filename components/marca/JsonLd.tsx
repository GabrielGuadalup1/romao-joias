import { LOJA, SITE_URL, WHATSAPP_NUMERO } from '@/lib/constants'

/**
 * Dados estruturados da joalheria (schema.org JewelryStore).
 * Renderizado no servidor; ajuda o Google a mostrar endereço, horário e telefone.
 */
const dados = {
  '@context': 'https://schema.org',
  '@type': 'JewelryStore',
  name: LOJA.nome,
  description:
    'Joalheria de família em Macapá–AP desde 1962. Alianças, joias e relógios em ouro 18k.',
  url: SITE_URL,
  image: `${SITE_URL}/logo-clara.png`,
  foundingDate: LOJA.fundacao,
  telephone: `+${WHATSAPP_NUMERO}`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: LOJA.rua,
    addressLocality: LOJA.cidade,
    addressRegion: LOJA.uf,
    postalCode: LOJA.cep,
    addressCountry: LOJA.pais,
  },
  openingHours: LOJA.horarioSchema,
  areaServed: `${LOJA.cidade}, ${LOJA.uf}`,
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  )
}
