import type { MetadataRoute } from 'next'

const siteUrl = 'https://chamath-site.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/admissions',
    '/programs',
    '/programs/elementary',
    '/programs/middle',
    '/programs/high',
    '/management',
    '/info-board',
  ]

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
