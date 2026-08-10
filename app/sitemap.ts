import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/constants'

const ROTAS = [
  { path: '', changeFrequency: 'monthly' as const, priority: 1 },
  { path: '/colecao', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/colecao/aliancas', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/historia', changeFrequency: 'yearly' as const, priority: 0.6 },
  { path: '/contato', changeFrequency: 'yearly' as const, priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROTAS.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
