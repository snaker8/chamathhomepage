import type { Metadata, Viewport } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '차수학 (Cha Math Academy) - Full Restoration (Official)',
  description: '최상의 수학 교육, 최적의 학습 로드맵. 차수학이 학생의 미래를 바꿉니다.',
  keywords: ['차수학', 'Cha Math Academy', '수학학원', '입사정보', '내신대비', '수능수학'],
  authors: [{ name: '차수학' }],
  openGraph: {
    title: '차수학 (Cha Math Academy) - Official Platform',
    description: '검증된 커리큘럼과 압도적인 실력 향상. 차수학 공식 홈페이지입니다.',
    type: 'website',
    locale: 'ko_KR',
  },
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
    <html lang="ko" suppressHydrationWarning className={lexend.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-gradient-mocha min-h-screen font-sans">
        {/* Main Content */}
        <main className="relative">
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
