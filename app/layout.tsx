import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { AuthProvider } from '@/lib/auth-context'

const siteUrl = 'https://chamath-site.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '차수학 | 초·중·고 수학 전문 학원',
  description: '초중고 수학전문학원. 데이터 기반 개별 관리와 원장 직접 클리닉으로 학생의 수학 실력을 책임집니다. 부산 사상구 엄궁 차수학.',
  keywords: ['차수학', '엄궁차수학', '엄궁수학', '엄궁수학학원', '수학학원', '부산수학', '내신대비', '수능수학', '개별관리', '사상구', '엄궁'],
  authors: [{ name: '차수학' }],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: '차수학 | 초·중·고 수학전문학원',
    description: '초중고 수학전문학원. 데이터 기반 개별 관리와 원장 직접 클리닉. 부산 엄궁 차수학.',
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EducationalOrganization'],
  name: '엄궁차수학',
  alternateName: '차수학 엄궁캠퍼스',
  description: '부산 사상구 엄궁동 초·중·고 수학 전문 학원. 데이터 기반 개별 관리와 원장 직접 클리닉.',
  url: siteUrl,
  telephone: '+82-51-311-0312',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '엄궁로 186 2층',
    addressLocality: '사상구',
    addressRegion: '부산광역시',
    addressCountry: 'KR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '14:30',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '15:00',
      closes: '20:00',
    },
  ],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css"
        />
        <script
          src="https://code.iconify.design/iconify-icon/2.3.0/iconify-icon.min.js"
          defer
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="antialiased bg-void grain font-sans min-h-[100dvh]">
        <AuthProvider>
          <main className="relative">
            <Header />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
