'use client'

import { useAuth } from '@/lib/auth-context'
import { Loader2, ShieldX } from 'lucide-react'
import Link from 'next/link'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const { user, loading, isAdmin } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen bg-void-950 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-accent-600 animate-spin mx-auto mb-4" />
                    <p className="text-void-400 text-sm">인증 확인 중...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-void-950 flex items-center justify-center px-6">
                <div className="glass rounded-3xl p-12 max-w-md w-full text-center">
                    <ShieldX className="w-16 h-16 text-red-400 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold text-white mb-3">로그인이 필요합니다</h1>
                    <p className="text-void-400 text-sm mb-8">관리자 페이지에 접근하려면 먼저 로그인해주세요.</p>
                    <Link
                        href="/"
                        className="btn-primary px-8 py-3 rounded-xl text-sm inline-block"
                    >
                        메인으로 돌아가기
                    </Link>
                </div>
            </div>
        )
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-void-950 flex items-center justify-center px-6">
                <div className="glass rounded-3xl p-12 max-w-md w-full text-center">
                    <ShieldX className="w-16 h-16 text-amber-400 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold text-white mb-3">접근 권한이 없습니다</h1>
                    <p className="text-void-400 text-sm mb-2">관리자만 접근할 수 있는 페이지입니다.</p>
                    <p className="text-void-500 text-xs mb-8">현재 계정: {user.email}</p>
                    <Link
                        href="/"
                        className="btn-primary px-8 py-3 rounded-xl text-sm inline-block"
                    >
                        메인으로 돌아가기
                    </Link>
                </div>
            </div>
        )
    }

    return <>{children}</>
}
