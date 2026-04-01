'use client'

import { FileText, CheckCircle, Calendar, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function QuickLinks() {
    const links = [
        {
            title: '입학 안내',
            en: 'Admissions',
            icon: FileText,
            href: '/admissions',
        },
        {
            title: '입학 테스트',
            en: 'Level Test',
            icon: CheckCircle,
            href: '/admissions',
        },
        {
            title: '입시정보 게시판',
            en: 'Info Board',
            icon: Calendar,
            href: '/info-board',
        },
        {
            title: '학생 전용 페이지',
            en: 'Student Portal',
            icon: Users,
            href: '/student',
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {links.map((link, index) => {
                const Icon = link.icon
                return (
                    <Link
                        key={index}
                        href={link.href}
                        className="card p-8 group hover:border-accent-600/50 hover:bg-accent-600/5 transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex flex-col h-full items-center justify-between w-full">
                            <div className="w-12 h-12 rounded-lg bg-accent-600/10 flex items-center justify-center mb-6 group-hover:bg-accent-600/20 transition-all duration-500">
                                <Icon className="w-6 h-6 text-accent-600" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-600 transition-colors duration-500 tracking-tight break-keep-all">
                                    {link.title}
                                </h3>
                                <p className="text-void-400 font-semibold tracking-[0.15em] text-xs uppercase opacity-70 group-hover:opacity-100 group-hover:text-accent-600 transition-all">
                                    {link.en}
                                </p>
                            </div>

                            <div className="mt-6 w-10 h-10 rounded-full border border-void-700 flex items-center justify-center group-hover:bg-accent-600 group-hover:border-accent-600 group-hover:text-white transition-all duration-500">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
