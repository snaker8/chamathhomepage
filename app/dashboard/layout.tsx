import type { Metadata } from 'next'

// 대시보드는 검색결과에 나오면 안 된다.
// robots.txt 로 크롤링을 막고, 여기서 noindex 로 색인까지 이중으로 막는다.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children
}
