'use client'

import { FileText, CheckCircle, MapPin, CreditCard, ChevronRight, Calendar, Users } from 'lucide-react'
import Link from 'next/link'

export default function QuickLinks() {
    const links = [
        {
            title: '입학 안내',
            en: 'Admissions',
            icon: <FileText className="w-8 h-8 mb-4 text-neon-cyan" />,
            href: '/admissions',
            color: 'hover:border-neon-cyan'
        },
        {
            title: '입학 테스트',
            en: 'Level Test',
            icon: <CheckCircle className="w-8 h-8 mb-4 text-aurora-400" />,
            href: '/admissions',
            color: 'hover:border-aurora-400'
        },
        {
            title: '입시정보 게시판',
            en: 'Info Board',
            icon: <Calendar className="w-8 h-8 mb-4 text-neon-cyan" />,
            href: '/info-board',
            color: 'hover:border-neon-cyan'
        },
        {
            title: '학생 전용 페이지',
            en: 'Student Portal',
            icon: <Users className="w-8 h-8 mb-4 text-aurora-400" />,
            href: '/student',
            color: 'hover:border-aurora-400'
        }
    ]

    return (
        <div className="py-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className={`premium-glass p-10 rounded-[32px] transition-all duration-500 group ${link.color} border border-white/5 hover:border-aurora-400/30 hover:-translate-y-3 relative overflow-hidden flex flex-col items-center text-center`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-aurora-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10 flex flex-col h-full items-center">
                            <div className="bg-white/5 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-aurora-400/20 group-hover:border-aurora-400/30 transition-all duration-500">
                                {link.icon}
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2 group-hover:text-aurora-400 transition-colors duration-500 tracking-tight">
                                {link.title}
                            </h3>
                            <p className="text-mocha-500 font-black tracking-[0.2em] text-xs uppercase opacity-70 group-hover:opacity-100 group-hover:text-aurora-400 transition-all">
                                {link.en}
                            </p>

                            <div className="mt-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
