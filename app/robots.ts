import type { MetadataRoute } from 'next'

const siteUrl = 'https://chamath-site.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/dashboard', '/api', '/student'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
