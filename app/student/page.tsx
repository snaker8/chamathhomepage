'use client'

import { useState } from 'react'
import { Play, FileText, CheckCircle, Clock, BookOpen, Download, Search, Layout, Video } from 'lucide-react'

export default function StudentPortalPage() {
    const [activeTab, setActiveTab] = useState('영상')

    const subjects = [
        { title: '미적분 핵심 정리 01', type: '영상', duration: '45min', date: '2024.01.20', status: '학습완료' },
        { title: '수능 기출 분석 (삼각함수)', type: '영상', duration: '60min', date: '2024.01.18', status: '학습중' },
        { title: '주간 오답 정복 가이드', type: '자료', format: 'PDF', date: '2024.01.15', status: '다운로드 가능' },
        { title: '고난도 킬러 문항 50선', type: '자료', format: 'PDF', date: '2024.01.10', status: '열람완료' },
    ]

    const stats = [
        { label: '이번 달 수강 영상', value: '12', limit: '15', icon: <Video className="w-5 h-5 text-neon-cyan" /> },
        { label: '완료한 과제', value: '8', limit: '10', icon: <FileText className="w-5 h-5 text-aurora-400" /> },
        { label: '학습 시간', value: '32h', limit: '50h', icon: <Clock className="w-5 h-5 text-neon-pink" /> },
    ]

    return (
        <div className="min-h-screen bg-mocha-950 pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-7xl">
                {/* Welcome Banner */}
                <div className="glass p-10 rounded-[40px] border border-white/10 mb-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                        <BookOpen className="w-48 h-48 text-aurora-400" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">안녕하세요, <span className="text-gradient-aurora">차학생</span>님! 👋</h1>
                            <p className="text-mocha-400">오늘도 어제보다 더 성장하는 하루가 되길 차수학이 응원합니다.</p>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="text-right">
                                <p className="text-mocha-500 text-sm">연속 출석일</p>
                                <p className="text-2xl font-bold text-white">15일 🔥</p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-gradient-aurora p-1">
                                <div className="w-full h-full rounded-full bg-mocha-950 flex items-center justify-center font-bold text-white">학</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((s, i) => (
                        <div key={i} className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                    {s.icon}
                                </div>
                                <span className="text-mocha-500 text-[10px] font-bold uppercase tracking-widest">{s.label}</span>
                            </div>
                            <div className="flex items-end justify-between">
                                <p className="text-3xl font-bold text-white">{s.value}</p>
                                <p className="text-mocha-500 text-sm mb-1">/ {s.limit}</p>
                            </div>
                            <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-aurora-400 to-neon-cyan rounded-full transition-all duration-1000"
                                    style={{ width: `${(parseInt(s.value) / parseInt(s.limit)) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Section */}
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Filter */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className="text-mocha-100 font-bold mb-6 px-2 flex items-center">
                            <Layout className="w-4 h-4 mr-2 text-neon-cyan" /> 필터 관리
                        </h3>
                        {['영상', '자료', '과제', '즐겨찾기'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all ${activeTab === tab ? 'bg-aurora-400 text-mocha-950 font-bold shadow-glow' : 'text-mocha-400 hover:bg-white/5'}`}
                            >
                                <span>{tab}</span>
                                <div className={`w-2 h-2 rounded-full ${activeTab === tab ? 'bg-mocha-950' : 'bg-mocha-800'}`} />
                            </button>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex items-center justify-between mb-8 px-2">
                            <h2 className="text-2xl font-bold text-white">{activeTab} 목록</h2>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="자료 검색..."
                                    className="bg-white/5 border border-white/5 rounded-xl px-4 py-2 pl-10 text-sm text-white focus:border-aurora-400 outline-none w-64 transition-all"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mocha-500" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {subjects.filter(s => activeTab === '전체' || s.type === activeTab).map((s, i) => (
                                <div key={i} className="glass p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group cursor-pointer relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${s.type === '영상' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-aurora-400/20 text-aurora-400'}`}>
                                            {s.type === '영상' ? <Play className="w-6 h-6 fill-current" /> : <FileText className="w-6 h-6" />}
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded bg-white/5 border border-white/5 ${s.status === '학습완료' ? 'text-mocha-500' : 'text-aurora-400 border-aurora-400/20'}`}>
                                            {s.status}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-aurora-400 transition-colors leading-snug">{s.title}</h4>
                                    <div className="flex items-center justify-between text-mocha-500 text-xs">
                                        <div className="flex items-center space-x-4">
                                            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {s.duration || s.format}</span>
                                            <span>{s.date}</span>
                                        </div>
                                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 group-hover:text-white transition-all">
                                            {s.type === '영상' ? '시청하기' : <Download className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Empty State Mockup */}
                            <div className="md:col-span-2 border-2 border-dashed border-white/5 rounded-3xl p-16 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <Layout className="text-mocha-700 w-8 h-8" />
                                </div>
                                <p className="text-mocha-600">등록된 최신 자료가 더 이상 없습니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
