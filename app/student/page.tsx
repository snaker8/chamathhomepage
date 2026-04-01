'use client'

import { useState, useEffect } from 'react'
import { Play, FileText, Clock, BookOpen, Download, Search, Layout, Video, Loader2, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { LearningRecord } from '@/lib/types'

export default function StudentPortalPage() {
    const { user, loading: authLoading } = useAuth()
    const [activeTab, setActiveTab] = useState('영상')
    const [records, setRecords] = useState<LearningRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        if (!user) {
            setLoading(false)
            return
        }

        const fetchRecords = async () => {
            try {
                const q = query(
                    collection(db, 'learning-records'),
                    where('studentId', '==', user.uid),
                    orderBy('date', 'desc')
                )
                const snapshot = await getDocs(q)
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LearningRecord))
                setRecords(data)
            } catch (error) {
                console.error('Failed to fetch learning records:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchRecords()
    }, [user])

    const typeMap: Record<string, string> = { '영상': 'video', '자료': 'material', '과제': 'assignment' }

    const filteredRecords = records.filter(r => {
        const matchesTab = activeTab === '즐겨찾기' || r.type === typeMap[activeTab]
        const matchesSearch = !searchQuery || r.title?.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesTab && matchesSearch
    })

    const videoCount = records.filter(r => r.type === 'video' && r.status === 'completed').length
    const completedCount = records.filter(r => r.status === 'completed').length
    const totalDuration = records.reduce((acc, r) => acc + (parseInt(r.duration || '0') || 0), 0)

    const stats = [
        { label: '완료 영상', value: String(videoCount), limit: String(Math.max(videoCount + 3, 15)), icon: <Video className="w-4 h-4 text-accent-600" /> },
        { label: '완료한 과제', value: String(completedCount), limit: String(Math.max(completedCount + 2, 10)), icon: <FileText className="w-4 h-4 text-accent-600" /> },
        { label: '학습 시간', value: `${Math.round(totalDuration / 60)}h`, limit: '50h', icon: <Clock className="w-4 h-4 text-accent-600" /> },
    ]

    if (authLoading) {
        return (
            <div className="min-h-[100dvh] bg-void-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-accent-600 animate-spin" />
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-[100dvh] bg-void-950 pt-32 pb-20 px-6 flex items-center justify-center">
                <div className="glass rounded-3xl p-12 max-w-md w-full text-center">
                    <LogIn className="w-16 h-16 text-accent-600 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold text-white mb-3">로그인이 필요합니다</h1>
                    <p className="text-void-400 text-sm mb-8">학생 전용 페이지입니다. 로그인 후 이용해주세요.</p>
                    <Link href="/" className="btn-primary px-8 py-3 rounded-xl text-sm inline-block">
                        메인으로 돌아가기
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-[100dvh] bg-void-950 pt-32 pb-20 px-6">
            <div className="container-main max-w-6xl">
                {/* Welcome Banner */}
                <div className="glass p-10 rounded-2xl border border-void-700/30 mb-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                        <BookOpen className="w-40 h-40 text-accent-600" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 break-keep-all">
                                안녕하세요, <span className="text-accent-600">{user.displayName || user.email?.split('@')[0]}</span>님!
                            </h1>
                            <p className="text-void-400 text-sm break-keep-all">오늘도 어제보다 더 성장하는 하루가 되길 차수학이 응원합니다.</p>
                        </div>
                        <div className="flex items-center space-x-4 shrink-0">
                            <div className="w-14 h-14 rounded-full bg-accent-600/15 border border-accent-600/30 flex items-center justify-center font-bold text-accent-600 text-lg">
                                {(user.displayName || user.email || '학')[0]}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
                    {stats.map((s, i) => (
                        <div key={i} className="glass p-6 rounded-2xl border border-void-700/30 relative overflow-hidden group hover:border-accent-600/30 transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-9 h-9 rounded-lg bg-accent-600/10 flex items-center justify-center border border-accent-600/20 group-hover:bg-accent-600/15 transition-colors">
                                    {s.icon}
                                </div>
                                <span className="text-void-500 text-[10px] font-bold uppercase tracking-widest break-keep-all text-right">{s.label}</span>
                            </div>
                            <div className="flex items-end justify-between mb-3">
                                <p className="text-2xl font-bold text-white">{s.value}</p>
                                <p className="text-void-500 text-xs mb-1">/ {s.limit}</p>
                            </div>
                            <div className="h-1 w-full bg-void-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-accent-600 rounded-full transition-all duration-1000"
                                    style={{ width: `${Math.min((parseInt(s.value) / parseInt(s.limit)) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Section */}
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Filter */}
                    <div className="lg:col-span-1">
                        <h3 className="text-void-100 font-bold mb-4 px-2 flex items-center text-sm break-keep-all">
                            <Layout className="w-4 h-4 mr-2 text-accent-600" /> 필터 관리
                        </h3>
                        <div className="space-y-2">
                            {['영상', '자료', '과제', '즐겨찾기'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all text-sm font-medium break-keep-all ${activeTab === tab ? 'bg-accent-600 text-white shadow-md' : 'text-void-400 hover:bg-white/5 border border-void-700/30'}`}
                                >
                                    <span>{tab}</span>
                                    <div className={`w-2 h-2 rounded-full ${activeTab === tab ? 'bg-white' : 'bg-void-700'}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white break-keep-all">{activeTab} 목록</h2>
                            <div className="relative w-full md:w-64">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="자료 검색..."
                                    className="w-full bg-white/5 border border-void-700/50 rounded-lg px-3 py-2 pl-9 text-xs text-white focus:border-accent-600 focus:bg-white/8 outline-none transition-all placeholder:text-void-600"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-void-600" />
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 text-accent-600 animate-spin" />
                            </div>
                        ) : filteredRecords.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-5">
                                {filteredRecords.map((r, i) => (
                                    <div key={r.id || i} className="glass p-6 rounded-2xl border border-void-700/30 hover:border-accent-600/40 transition-all group cursor-pointer relative overflow-hidden">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${r.type === 'video' ? 'bg-accent-600/10 text-accent-600 border-accent-600/20' : 'bg-void-700/30 text-void-400 border-void-700/50'}`}>
                                                {r.type === 'video' ? <Play className="w-5 h-5 fill-current" /> : <FileText className="w-5 h-5" />}
                                            </div>
                                            <span className={`text-[9px] font-bold px-2 py-1 rounded border break-keep-all ${r.status === 'completed' ? 'text-void-500 bg-void-800/50 border-void-700/50' : 'text-accent-600 bg-accent-600/10 border-accent-600/30'}`}>
                                                {r.status === 'completed' ? '완료' : r.status === 'in-progress' ? '학습중' : '대기'}
                                            </span>
                                        </div>
                                        <h4 className="text-base font-bold text-white mb-3 group-hover:text-accent-600 transition-colors leading-snug break-keep-all">{r.title}</h4>
                                        <div className="flex items-center justify-between text-void-500 text-xs">
                                            <div className="flex items-center space-x-3">
                                                <span className="flex items-center break-keep-all"><Clock className="w-3 h-3 mr-1" /> {r.duration || r.subject}</span>
                                                <span>{r.date}</span>
                                            </div>
                                            <button className="p-2 rounded-lg bg-void-800/30 hover:bg-white/10 group-hover:text-white transition-all hover:text-accent-600">
                                                {r.type === 'video' ? <Play className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-void-700/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 rounded-full bg-void-800/30 flex items-center justify-center mb-3">
                                    <Layout className="text-void-700 w-6 h-6" />
                                </div>
                                <p className="text-void-500 text-sm break-keep-all">
                                    {records.length === 0 ? '아직 등록된 학습 자료가 없습니다.' : '검색 결과가 없습니다.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
