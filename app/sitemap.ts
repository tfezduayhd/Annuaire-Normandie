import type { MetadataRoute } from 'next'
import { MOCK_DESIGNERS } from '@/lib/mock-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://designlab-normandie.fr'

  const staticRoutes = [
    '', '/annuaire', '/rejoindre', '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const designerRoutes = MOCK_DESIGNERS.map((designer) => ({
    url: `${baseUrl}/annuaire/${designer.slug}`,
    lastModified: designer.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...designerRoutes]
}
