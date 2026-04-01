'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronRight, LogOut, Settings } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import LoginModal from '@/components/LoginModal'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const { user, isAdmin, signOut } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: '학원안내', href: '/about' },
        { name: '개별관리', href: '/management' },
        { name: '입학안내', href: '/admissions' },
        { name: '프로그램', href: '/programs' },
        { name: '입시정보', href: '/info-board' },
        { name: '학생페이지', href: '/student' },
    ]

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
                <nav className="container-main">
                    <div className={`mx-auto flex items-center justify-between glass rounded-full px-6 py-2.5 transition-all duration-500 ${scrolled ? 'bg-void-950/60 shadow-lg' : ''}`}>
                        {/* Logo */}
                        <Link href="/" className="flex items-center group">
                            <span className="text-base font-bold tracking-tight text-white group-hover:text-accent-400 transition-colors">
                                엄궁 차수학
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-void-400 hover:text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {user ? (
                                <div className="hidden md:flex items-center gap-2">
                                    {isAdmin && (
                                        <Link
                                            href="/admin/admissions"
                                            className="text-xs font-medium text-accent-400 hover:text-accent-300 transition-colors px-3 py-2 flex items-center gap-1"
                                        >
                                            <Settings className="w-3.5 h-3.5" />
                                            관리자
                                        </Link>
                                    )}
                                    <span className="text-xs text-void-500 max-w-[120px] truncate">
                                        {user.displayName || user.email?.split('@')[0]}
                                    </span>
                                    <button
                                        onClick={() => signOut()}
                                        className="text-xs font-medium text-void-500 hover:text-white transition-colors p-2"
                                        title="로그아웃"
                                    >
                                        <LogOut className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setLoginOpen(true)}
                                    className="hidden md:block text-xs font-medium text-void-500 hover:text-white transition-colors px-3 py-2"
                                >
                                    로그인
                                </button>
                            )}
                            <Link
                                href="/admissions"
                                className="hidden md:flex items-center gap-1.5 bg-accent-600 hover:bg-accent-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                입학상담
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden p-2 text-void-300 hover:text-white transition-colors"
                                aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
                            >
                                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Drawer */}
                <div className={`md:hidden absolute top-full left-4 right-4 mt-2 transition-all duration-300 origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
                    <div className="glass rounded-2xl overflow-hidden">
                        <div className="flex flex-col p-3 gap-0.5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between p-3.5 text-void-200 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
                                >
                                    <span className="text-sm font-medium">{link.name}</span>
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-void-500" />
                                </Link>
                            ))}
                            {isAdmin && (
                                <Link
                                    href="/admin/admissions"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between p-3.5 text-accent-400 hover:text-accent-300 hover:bg-white/5 rounded-xl transition-all group"
                                >
                                    <span className="text-sm font-medium flex items-center gap-2">
                                        <Settings className="w-4 h-4" />
                                        관리자 페이지
                                    </span>
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-void-500" />
                                </Link>
                            )}
                            <div className="pt-3 mt-2 border-t border-white/5 grid grid-cols-2 gap-2">
                                {user ? (
                                    <button
                                        onClick={() => { signOut(); setIsOpen(false) }}
                                        className="btn-ghost py-3 rounded-xl text-xs"
                                    >
                                        로그아웃
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => { setLoginOpen(true); setIsOpen(false) }}
                                        className="btn-ghost py-3 rounded-xl text-xs"
                                    >
                                        로그인
                                    </button>
                                )}
                                <Link href="/admissions" className="btn-primary py-3 rounded-xl text-xs justify-center">입학상담</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        </>
    )
}
