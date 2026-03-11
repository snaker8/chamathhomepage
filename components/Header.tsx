'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronRight } from 'lucide-react'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: '학원안내', href: '/about' },
        { name: '입학안내', href: '/admissions' },
        { name: '프로그램', href: '/programs' },
        { name: '입시정보', href: '/info-board' },
        { name: '학생페이지', href: '/student' },
    ]

    return (
        <header className={`fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-[95%] z-50 transition-all duration-700 ${scrolled ? 'top-4' : 'top-6'}`}>
            <nav className={`mx-auto px-8 py-4 flex items-center justify-between premium-glass border border-white/5 backdrop-blur-2xl rounded-[32px] transition-all duration-700 ${scrolled ? 'py-3 bg-black/40' : 'py-5 bg-transparent'}`}>
                {/* Logo Section */}
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-aurora-400 to-neon-cyan flex items-center justify-center shadow-[0_0_30px_rgba(77,255,145,0.3)] group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                        <span className="text-2xl font-black text-mocha-950">차</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tighter text-white group-hover:text-aurora-400 transition-colors duration-500 uppercase">
                            CHA MATH
                        </span>
                        <span className="text-xs font-bold tracking-[0.3em] text-mocha-500 uppercase">Academy</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-mocha-400 hover:text-white text-sm font-black tracking-[0.2em] transition-all relative group py-2 uppercase"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aurora-400 transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_15px_#4dff91]" />
                        </Link>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-6">
                    <button className="hidden md:block text-xs font-black tracking-[0.2em] text-mocha-500 hover:text-white transition-all uppercase">
                        LOGIN
                    </button>
                    <Link href="/admissions" className="bg-white text-black text-xs font-black tracking-[0.2em] px-8 py-3.5 rounded-full hover:bg-aurora-400 hover:shadow-[0_0_30px_rgba(77,255,145,0.5)] transition-all duration-500 uppercase">
                        ADMISSION
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-white hover:text-aurora-400 transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            <div className={`md:hidden absolute top-full left-0 right-0 mt-4 mx-0 transition-all duration-500 origin-top transform ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
                <div className="glass border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
                    <div className="flex flex-col p-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between p-4 text-mocha-100 hover:text-aurora-400 hover:bg-white/5 rounded-xl transition-all group"
                            >
                                <span className="font-medium text-lg">{link.name}</span>
                                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </Link>
                        ))}
                        <div className="pt-4 mt-2 border-t border-white/5 grid grid-cols-2 gap-4">
                            <button className="btn-ghost py-3 rounded-xl border border-white/10">로그인</button>
                            <button className="btn-primary py-3 rounded-xl">회원가입</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
