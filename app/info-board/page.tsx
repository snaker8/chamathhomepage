'use client'

import { useState, useEffect } from 'react'
import { Search, Bell, BookOpen, TrendingUp, Calendar, Filter, ChevronRight, Share2, Eye, Loader2, Edit3, X, Save, Trash2, Settings, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'

export default function InfoBoardPage() {
    const [activeCategory, setActiveCategory] = useState('전체')
    const [newsItems, setNewsItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isAdminMode, setIsAdminMode] = useState(false)
    const [editingItem, setEditingItem] = useState<any>(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [newsletterEmail, setNewsletterEmail] = useState('')
    const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleNewsletterSubmit = async () => {
        if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return
        setNewsletterStatus('loading')
        try {
            await addDoc(collection(db, 'newsletter-subscribers'), {
                email: newsletterEmail.trim(),
                subscribedAt: new Date().toISOString(),
            })
            setNewsletterStatus('success')
            setNewsletterEmail('')
            setTimeout(() => setNewsletterStatus('idle'), 3000)
        } catch {
            setNewsletterStatus('error')
            setTimeout(() => setNewsletterStatus('idle'), 3000)
        }
    }

    const categories = ['전체', '입시정보', '학습 전략', '학원 소식', '자료실']

    const fetchBlogPosts = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/blog')
            const data = await response.json()
            if (Array.isArray(data)) {
                setNewsItems(data)
            }
        } catch (error) {
            console.error('Failed to fetch blog posts:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogPosts()
    }, [])

    const handleUpdatePost = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingItem) return

        setIsUpdating(true)
        try {
            const response = await fetch('/api/blog/manage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: editingItem.url,
                    title: editingItem.title,
                    category: editingItem.category,
                    isHidden: editingItem.isHidden
                })
            })

            if (response.ok) {
                setEditingItem(null)
                await fetchBlogPosts()
            }
        } catch (error) {
            console.error('Failed to update post:', error)
        } finally {
            setIsUpdating(false)
        }
    }

    const stats = [
        { label: '이번 주 새로운 정보', value: newsItems.length > 0 ? '1' : '0', icon: <Bell className="w-4 h-4 text-accent-600" /> },
        { label: '누적 입시 리포트', value: '42', icon: <BookOpen className="w-4 h-4 text-accent-600" /> },
        { label: '조회수 급증 키워드', value: '고교학점제', icon: <TrendingUp className="w-4 h-4 text-accent-600" /> },
    ]

    return (
        <div className="min-h-[100dvh] bg-void-950 pt-32 pb-20 px-6">
            <div className="container-main">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <h1 className="text-4xl md:text-5xl font-bold text-white break-keep-all">입시정보 게시판</h1>
                            <button
                                onClick={() => setIsAdminMode(!isAdminMode)}
                                className={`p-2 rounded-lg transition-all shrink-0 ${isAdminMode ? 'bg-accent-600/20 text-accent-600' : 'text-void-600 hover:text-void-400'}`}
                                title="관리자 모드"
                            >
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-void-400 text-sm break-keep-all">최신 입시 데이터와 차수학 엄궁 캠퍼스만의 분석 리포트를 확인하세요.</p>
                    </div>
                    <div className="relative group w-full md:w-80">
                        <input
                            type="text"
                            placeholder="키워드를 검색하세요..."
                            className="w-full bg-white/5 border border-void-700/50 rounded-lg px-4 py-2.5 pl-10 text-sm text-white focus:border-accent-600 focus:bg-white/8 outline-none transition-all placeholder:text-void-600"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-void-500 w-4 h-4 group-hover:text-void-400 transition-colors" />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    {stats.map((s, i) => (
                        <div key={i} className="glass p-5 rounded-2xl border border-void-700/30 flex items-center justify-between group cursor-pointer hover:border-accent-600/30 transition-all">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-lg bg-accent-600/10 flex items-center justify-center border border-accent-600/20 group-hover:bg-accent-600/15 transition-colors">
                                    {s.icon}
                                </div>
                                <div>
                                    <p className="text-void-500 text-xs font-medium">{s.label}</p>
                                    <p className="text-lg font-bold text-white group-hover:text-accent-600 transition-colors">{s.value}</p>
                                </div>
                            </div>
                            <ChevronRight className="text-void-600 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    ))}
                </div>

                {/* Categories & Filter */}
                <div className="flex flex-wrap items-center gap-2 mb-10">
                    <div className="glass p-1.5 rounded-xl flex flex-wrap gap-1">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${activeCategory === cat ? 'bg-accent-600 text-white shadow-lg' : 'text-void-400 hover:text-void-200 hover:bg-white/5'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* List Center */}
                    <div className="lg:col-span-2 space-y-5">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 glass rounded-2xl border border-void-700/30">
                                <Loader2 className="w-10 h-10 text-accent-600 animate-spin mb-3" />
                                <p className="text-void-400 font-medium text-xs uppercase tracking-widest">블로그 동기화 중...</p>
                            </div>
                        ) : newsItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 glass rounded-2xl border border-void-700/30">
                                <p className="text-void-400 text-sm">등록된 게시글이 없습니다.</p>
                            </div>
                        ) : (
                            newsItems
                                .filter(item => activeCategory === '전체' || item.category.includes(activeCategory))
                                .map((item) => (
                                    <div key={item.id} className="relative group">
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="glass p-5 rounded-2xl border border-void-700/30 hover:border-accent-600/40 transition-all cursor-pointer relative overflow-hidden flex flex-col md:flex-row gap-5 block group-hover:bg-white/8"
                                        >
                                            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 relative">
                                                <img src={item.image} alt={item.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'; }} />
                                                <div className="absolute top-2 left-2 px-2 py-1 bg-void-900/80 backdrop-blur rounded-md text-[10px] font-bold text-accent-600 border border-accent-600/20 uppercase tracking-widest">
                                                    {item.category}
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        {item.isHot && <span className="bg-accent-600/20 text-accent-600 text-[9px] font-black px-2 py-0.5 rounded border border-accent-600/40">HOT</span>}
                                                        <span className="text-void-500 text-xs">{item.date}</span>
                                                    </div>
                                                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-accent-600 transition-colors leading-snug break-keep-all">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-5 h-5 rounded-full bg-void-800 flex items-center justify-center text-[8px] text-void-400 font-bold">
                                                            {item.author?.[0] || 'C'}
                                                        </div>
                                                        <span className="text-void-400 text-xs break-keep-all">{item.author}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-3 text-void-600 text-xs">
                                                        <div className="flex items-center space-x-1">
                                                            <Eye className="w-3 h-3" />
                                                            <span>{item.views}</span>
                                                        </div>
                                                        <Share2 className="w-3 h-3 hover:text-accent-600 transition-colors cursor-pointer" />
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        {isAdminMode && (
                                            <button
                                                onClick={() => setEditingItem(item)}
                                                className="absolute top-4 right-4 p-2 bg-accent-600 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-accent-700"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))
                        )}
                    </div>

                    {/* Sidebar - Events & Newsletter */}
                    <div className="space-y-6">
                        {/* Upcoming Events */}
                        <div className="glass p-6 rounded-2xl border border-void-700/30">
                            <h4 className="text-base font-bold text-white mb-5 flex items-center break-keep-all">
                                <Calendar className="w-4 h-4 mr-2 text-accent-600" /> 이번 주 주요 정보
                            </h4>
                            <div className="space-y-4">
                                {[
                                    { title: '고2 3월 모의고사 대비 특강', date: '01.25(Sat)', time: '14:00' },
                                    { title: '예비고1 학부모 간담회', date: '01.27(Mon)', time: '11:00' },
                                    { title: '심화 수학 클리닉 데이', date: '01.28(Tue)', time: '17:00' },
                                ].map((event, i) => (
                                    <div key={i} className="flex space-x-3 items-center group cursor-pointer">
                                        <div className="w-12 h-12 rounded-lg bg-white/5 border border-void-700/50 flex flex-col items-center justify-center shrink-0 group-hover:bg-accent-600/10 group-hover:border-accent-600/30 transition-all">
                                            <span className="text-[8px] text-void-500 uppercase font-bold">{event.date.split('(')[1].replace(')', '')}</span>
                                            <span className="text-xs font-bold text-white group-hover:text-accent-600">{event.date.split('.')[1].split('(')[0]}</span>
                                        </div>
                                        <div>
                                            <p className="text-void-200 font-semibold text-xs mb-0.5 group-hover:text-white transition-colors break-keep-all">{event.title}</p>
                                            <p className="text-void-500 text-xs">{event.time} @ 엄궁</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link href="/admissions" className="block w-full mt-6 py-3 rounded-lg bg-white/5 text-void-400 text-xs font-semibold hover:bg-white/8 transition-colors text-center">
                                상담 예약하기
                            </Link>
                        </div>

                        {/* Newsletter Sub */}
                        <div className="glass p-6 rounded-2xl border border-accent-600/20 bg-accent-600/5">
                            <h4 className="text-base font-bold text-white mb-3 break-keep-all">입시 레터 구독</h4>
                            <p className="text-void-500 text-xs mb-4 break-keep-all">최신 입시 정보와 학원 뉴스레터를 이메일로 받으세요.</p>
                            {newsletterStatus === 'success' ? (
                                <div className="flex items-center gap-2 text-accent-600 text-xs font-semibold py-2">
                                    <CheckCircle className="w-4 h-4" />
                                    구독 신청이 완료되었습니다!
                                </div>
                            ) : (
                                <div className="space-y-2.5">
                                    <input
                                        type="email"
                                        value={newsletterEmail}
                                        onChange={e => setNewsletterEmail(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleNewsletterSubmit()}
                                        placeholder="email@example.com"
                                        className="w-full bg-white/5 border border-void-700/50 rounded-lg px-3 py-2 text-xs text-white focus:border-accent-600 focus:bg-white/8 outline-none transition-all placeholder:text-void-600"
                                    />
                                    <button
                                        onClick={handleNewsletterSubmit}
                                        disabled={newsletterStatus === 'loading' || !newsletterEmail.includes('@')}
                                        className="btn-primary w-full py-2 text-xs disabled:opacity-50"
                                    >
                                        {newsletterStatus === 'loading' ? '처리 중...' : newsletterStatus === 'error' ? '오류 발생 - 다시 시도' : '무료 구독 신청'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editingItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-void-950/80 backdrop-blur-sm">
                    <div className="glass w-full max-w-md p-8 rounded-2xl border border-void-700/50 shadow-2xl relative">
                        <button onClick={() => setEditingItem(null)} className="absolute top-5 right-5 text-void-500 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Edit3 className="w-4 h-4 text-accent-600" /> 게시글 편집
                        </h2>

                        <form onSubmit={handleUpdatePost} className="space-y-5">
                            <div>
                                <label className="block text-void-400 text-xs font-semibold mb-2 uppercase tracking-widest">제목</label>
                                <input
                                    type="text"
                                    value={editingItem.title}
                                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                    className="w-full bg-white/5 border border-void-700/50 rounded-lg px-4 py-2.5 text-sm text-white focus:border-accent-600 focus:bg-white/8 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-void-400 text-xs font-semibold mb-2 uppercase tracking-widest">카테고리</label>
                                <select
                                    value={editingItem.category}
                                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                    className="w-full bg-white/5 border border-void-700/50 rounded-lg px-4 py-2.5 text-sm text-white focus:border-accent-600 focus:bg-white/8 outline-none transition-all appearance-none"
                                >
                                    {categories.filter(c => c !== '전체').map(c => (
                                        <option key={c} value={c} className="bg-void-900">{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isHidden"
                                    checked={editingItem.isHidden || false}
                                    onChange={(e) => setEditingItem({ ...editingItem, isHidden: e.target.checked })}
                                    className="w-4 h-4 rounded border-void-700/50 bg-white/5 text-accent-600 focus:ring-accent-600"
                                />
                                <label htmlFor="isHidden" className="text-void-400 text-xs">홈페이지에서 숨기기</label>
                            </div>

                            <div className="pt-2 flex gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setEditingItem(null)}
                                    className="flex-1 py-2.5 rounded-lg bg-white/5 text-void-400 font-semibold text-sm hover:bg-white/8 transition-colors"
                                >
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="flex-1 py-2.5 rounded-lg bg-accent-600 text-white font-semibold text-sm hover:bg-accent-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    저장
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
