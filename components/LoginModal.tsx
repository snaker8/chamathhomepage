'use client'

import { useState } from 'react'
import { X, Mail, Lock, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { signInWithEmail, signInWithGoogle } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    if (!isOpen) return null

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await signInWithEmail(email, password)
            onClose()
            setEmail('')
            setPassword('')
        } catch (err: any) {
            const code = err?.code || ''
            if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
                setError('이메일 또는 비밀번호가 올바르지 않습니다.')
            } else if (code === 'auth/too-many-requests') {
                setError('너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.')
            } else {
                setError('로그인에 실패했습니다. 다시 시도해주세요.')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setError('')
        setLoading(true)
        try {
            await signInWithGoogle()
            onClose()
        } catch (err: any) {
            if (err?.code !== 'auth/popup-closed-by-user') {
                setError('Google 로그인에 실패했습니다.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-void-950/80 backdrop-blur-md" onClick={onClose} />
            <div className="glass w-full max-w-md p-8 rounded-3xl border border-white/10 relative z-10">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-void-500 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">로그인</h2>
                <p className="text-void-400 text-sm mb-8">차수학 계정으로 로그인하세요</p>

                {error && (
                    <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-void-500" />
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="이메일"
                            required
                            className="w-full bg-white/5 border border-void-700/50 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:border-accent-600 outline-none transition-all placeholder-void-500"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-void-500" />
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="비밀번호"
                            required
                            className="w-full bg-white/5 border border-void-700/50 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:border-accent-600 outline-none transition-all placeholder-void-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        로그인
                    </button>
                </form>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-void-700/50" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-void-900 px-3 text-void-500">또는</span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full bg-white/5 hover:bg-white/10 border border-void-700/50 text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-sm"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google 계정으로 로그인
                </button>
            </div>
        </div>
    )
}
