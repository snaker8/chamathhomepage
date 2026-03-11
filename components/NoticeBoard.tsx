'use client'

import { useState } from 'react'
import { Bell, Calendar, BookOpen, ChevronRight, Plus } from 'lucide-react'
import Link from 'next/link'

type Tab = 'news' | 'events' | 'exams'

export default function NoticeBoard() {
    const [activeTab, setActiveTab] = useState<Tab>('news')

    const notices = {
        news: [
            { id: 1, title: '[필독] 12월 12일 금요일 수업 없음 (학원 행사)', date: '2025.12.01', tag: '공지' },
            { id: 2, title: '12월 25일 성탄절 휴강 안내', date: '2025.12.10', tag: '휴강' },
            { id: 3, title: '2026학년도 1학기 시간표 안내', date: '2025.11.30', tag: '안내' },
            { id: 4, title: '겨울방학 셔틀버스 노선 안내', date: '2025.11.20', tag: '교통' },
        ],
        events: [
            { id: 1, title: '예비고1 & 예비중1 온라인 설명회 예약', date: '2025.11.24', tag: '설명회' },
            { id: 2, title: '2027학년도 수능 미리보기 신청', date: '2025.11.24', tag: '설명회' },
            { id: 3, title: '친구소개 이벤트 (문화상품권 지급)', date: '2025.10.15', tag: '이벤트' },
        ],
        exams: [
            { id: 1, title: '상점 우수자 기프티콘 시상 안내', date: '2025.10.18', tag: '시상' },
            { id: 2, title: '11월 정기 주말 테스트 결과 발표', date: '2025.11.28', tag: '결과' },
            { id: 3, title: '엄궁 지역 기출 분석 자료 배포', date: '2025.11.01', tag: '자료' },
        ]
    }

    return (
        <div className="py-12">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Notice Area (2/3 width) */}
                <div className="lg:col-span-2 premium-glass rounded-[40px] p-10 border-l-4 border-l-aurora-400 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-aurora-400/5 blur-[100px] pointer-events-none" />
                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <h2 className="text-3xl font-black text-white flex items-center tracking-tight uppercase">
                            <span className="w-1.5 h-8 bg-aurora-400 mr-4 rounded-full" />
                            ACADEMY INSIGHTS
                        </h2>
                        <Link href="/news" className="flex items-center text-mocha-500 hover:text-aurora-400 transition-all group/link text-xs font-bold tracking-widest uppercase">
                            <span className="mr-2">View All</span>
                            <Plus className="w-4 h-4 group-hover/link:rotate-90 transition-transform" />
                        </Link>
                    </div>

                    <div className="flex space-x-6 mb-10 border-b border-white/5 relative z-10">
                        {[
                            { id: 'news', label: 'ANNOUNCEMENTS', icon: Bell },
                            { id: 'events', label: 'EVENTS', icon: Calendar },
                            { id: 'exams', label: 'INSIGHTS', icon: BookOpen },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as Tab)}
                                className={`flex items-center pb-5 px-1 transition-all duration-300 relative text-[10px] font-black tracking-[0.2em] ${activeTab === tab.id ? 'text-aurora-400' : 'text-mocha-500 hover:text-white'
                                    }`}
                            >
                                <tab.icon className="w-3.5 h-3.5 mr-2" />
                                <span>{tab.label}</span>
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-aurora-400 shadow-[0_0_20px_#4dff91]" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-2 min-h-[300px] relative z-10">
                        {notices[activeTab].map((item) => (
                            <div key={item.id} className="group flex items-center justify-between p-5 rounded-2xl hover:bg-white/[0.03] transition-all duration-300 border border-transparent hover:border-white/5 cursor-pointer">
                                <div className="flex items-center space-x-6 overflow-hidden">
                                    <span className="text-[10px] px-3 py-1 rounded bg-mocha-900 text-mocha-500 font-bold tracking-widest uppercase border border-white/5">
                                        {item.tag}
                                    </span>
                                    <p className="text-mocha-100 truncate group-hover:text-white transition-colors font-medium">
                                        {item.title}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-6 pl-4 min-w-fit">
                                    <span className="text-mocha-600 text-[10px] font-bold">{item.date}</span>
                                    <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Side Banners (1/3 width) */}
                <div className="space-y-8">
                    <div className="premium-glass h-full min-h-[400px] rounded-[40px] p-10 flex flex-col justify-between relative overflow-hidden group cursor-pointer border-t-4 border-t-neon-cyan hover:border-neon-cyan/50 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10 text-center">
                            <span className="inline-block px-4 py-1.5 bg-neon-cyan/10 text-neon-cyan text-[10px] font-black tracking-[0.2em] uppercase rounded-full mb-8">
                                CHA METHODOLOGY
                            </span>
                            <h3 className="text-4xl font-black text-white mb-6 leading-tight hero-heading">
                                MATH<br />
                                <span className="text-neon-cyan neon-glow-text">BEYOND</span><br />
                                LIMITS
                            </h3>
                            <p className="text-mocha-400 text-sm leading-relaxed font-light">
                                차수학만의 독보적인 교수법과<br />
                                성적 향상의 핵심 비법을 확인하세요.
                            </p>
                        </div>

                        <div className="relative z-10 w-full rounded-2xl border border-white/10 py-4 flex items-center justify-center mt-10 group-hover:bg-neon-cyan group-hover:text-mocha-950 group-hover:border-neon-cyan group-hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all duration-500 font-black text-xs tracking-[0.2em]">
                            ENTER PLATFORM
                        </div>

                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-neon-cyan/10 rounded-full blur-[80px] pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    )
}
