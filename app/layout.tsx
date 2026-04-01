import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { AuthProvider } from '@/lib/auth-context'

export const metadata: Metadata = {
  title: '차수학 | 중·고등 수학 전문 학원',
  description: '데이터 기반 개별 관리와 원장 직접 클리닉으로 학생의 수학 실력을 책임집니다. 부산 사상구 차수학.',
  keywords: ['차수학', '수학학원', '부산수학', '내신대비', '수능수학', '개별관리', '사상구'],
  authors: [{ name: '차수학' }],
  openGraph: {
    title: '차수학 | 중·고등 수학 전문',
    description: '데이터 기반 개별 관리와 원장 직접 클리닉. 차수학 공식 홈페이지.',
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
