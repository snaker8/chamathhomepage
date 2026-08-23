import type { Metadata } from 'next'
import AdminGuard from '@/components/AdminGuard'

// 관리자 화면은 검색결과에 절대 나오면 안 된다.
// robots.txt 로 크롤링을 막고, 여기서 noindex 로 색인까지 이중으로 막는다.
export const metadata: Metadata = {
    robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdminGuard>{children}</AdminGuard>
}
