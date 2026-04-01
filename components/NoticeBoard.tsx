'use client'

import { useState } from 'react'
import { Bell, Calendar, BookOpen, ChevronRight, ArrowRight } from 'lucide-react'
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
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Notice Area (2/3 width) */}
            <div className="lg:col-span-2 card p-8 lg:p-10 border-l-4 border-l-accent-600 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-accent-600/5 blur-[100px] pointer-events-none" />

                <div className="flex items-center justify-between mb-8 relative z-10">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center tracking-tight">
                        <span className="w-1 h-8 bg-accent-600 mr-4 rounded-full" />
                        공지사항
                    </h2>
                    <Link href="/news" className="flex items-center text-void-400 hover:text-accent-600 transition-all group/link text-xs font-semibold tracking-widest uppercase">
                        <span className="mr-2">전체보기</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-8 relative z-10 border-b border-void-800">
                    {[
                        { id: 'news', label: '공지사항', icon: Bell },
                        { id: 'events', label: '행사', icon: Calendar },
                        { id: 'exams', label: '시험정보', icon: BookOpen },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as Tab)}
                            className={`flex items-center gap-2 pb-4 px-4 transition-all duration-300 relative text-sm font-semibold tracking-wide ${
                                activeTab === tab.id
                                    ? 'text-accent-600 border-b-2 border-b-accent-600'
                                    : 'text-void-400 hover:text-white'
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Notice List */}
                <div className="space-y-1 min-h-[300px] relative z-10">
                    {notices[activeTab].map((item) => (
                        <div key={item.id} className="group flex items-center justify-between p-4 rounded-lg hover:bg-accent-600/5 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center gap-4 overflow-hidden flex-1">
                                <span className="text-[10px] px-3 py-1 rounded-md bg-void-800 text-void-400 font-semibold tracking-wider uppercase whitespace-nowrap">
                                    {item.tag}
                                </span>
                                <p className="text-void-300 truncate group-hover:text-white transition-colors font-medium break-keep-all">
                                    {item.title}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pl-4 min-w-fit">
                                <span className="text-void-500 text-xs font-medium whitespace-nowrap">{item.date}</span>
                                <div className="w-8 h-8 rounded-full border border-void-700 flex items-center justify-center group-hover:bg-accent-600 group-hover:border-accent-600 group-hover:text-white transition-all duration-300">
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Side Banner */}
            <div className="card p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden group cursor-pointer border-t-4 border-t-accent-600 hover:border-t-accent-700 transition-all duration-500 h-full min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-accent-600/20 text-accent-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                        Cha Methodology
                    </span>

                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight break-keep-all">
                        수학의 새로운
                        <br />
                        <span className="text-accent-600">기준</span>
                    </h3>

                    <p className="text-void-400 text-sm leading-relaxed break-keep-all">
                        차수학만의 독보적인 교수법과 성적 향상의 핵심 비법을 경험해보세요.
                    </p>
                </div>

                <div className="relative z-10 w-full rounded-lg border border-void-700 py-3 flex items-center justify-center mt-8 group-hover:bg-accent-600 group-hover:text-white group-hover:border-accent-600 transition-all duration-500 font-semibold text-sm tracking-wide">
                    더 알아보기
                </div>

                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-accent-600/10 rounded-full blur-3xl pointer-events-none" />
            </div>
        </div>
    )
}
