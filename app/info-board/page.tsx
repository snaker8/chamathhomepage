'use client'

import { useState, useEffect } from 'react'
import { Search, Bell, BookOpen, TrendingUp, Calendar, Filter, ChevronRight, Share2, Eye, Loader2, Edit3, X, Save, Trash2, Settings } from 'lucide-react'

export default function InfoBoardPage() {
    const [activeCategory, setActiveCategory] = useState('전체')
    const [newsItems, setNewsItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isAdminMode, setIsAdminMode] = useState(false)
    const [editingItem, setEditingItem] = useState<any>(null)
    const [isUpdating, setIsUpdating] = useState(false)

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
        { label: '이번 주 새로운 정보', value: newsItems.length > 0 ? '1' : '0', icon: <Bell className="w-5 h-5 text-aurora-400" /> },
        { label: '누적 입시 리포트', value: '42', icon: <BookOpen className="w-5 h-5 text-neon-cyan" /> },
        { label: '조회수 급증 키워드', value: '고교학점제', icon: <TrendingUp className="w-5 h-5 text-neon-pink" /> },
    ]

    return (
        <div className="min-h-screen bg-mocha-950 pt-32 pb-20 px-6">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-4xl md:text-5xl font-bold text-white">입시정보 게시판</h1>
                            <button
                                onClick={() => setIsAdminMode(!isAdminMode)}
                                className={`p-2 rounded-lg transition-all ${isAdminMode ? 'bg-aurora-400/20 text-aurora-400' : 'text-mocha-700 hover:text-mocha-400'}`}
                                title="관리자 모드"
                            >
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-mocha-400 text-lg">최신 입시 데이터와 차수학 엄궁 캠퍼스만의 분석 리포트를 확인하세요.</p>
                    </div>
                    {/* Search Bar */}
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="관심 있는 키워드를 검색하세요..."
                            className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pl-12 text-white focus:border-aurora-400 outline-none transition-all placeholder:text-mocha-600"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mocha-400 w-5 h-5 group-hover:text-aurora-400 transition-colors" />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((s, i) => (
                        <div key={i} className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between group cursor-pointer hover:border-white/20 transition-all">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    {s.icon}
                                </div>
                                <div>
                                    <p className="text-mocha-500 text-sm font-medium">{s.label}</p>
                                    <p className="text-2xl font-bold text-white group-hover:text-aurora-400 transition-colors">{s.value}</p>
                                </div>
                            </div>
                            <ChevronRight className="text-mocha-700 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    ))}
                </div>

                {/* Categories & Filter */}
                <div className="flex flex-wrap items-center gap-3 mb-10">
                    <div className="p-1 glass rounded-2xl flex flex-wrap gap-1">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeCategory === cat ? 'bg-aurora-400 text-mocha-950 shadow-glow' : 'text-mocha-400 hover:text-mocha-100 hover:bg-white/5'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* List Center */}
                    <div className="lg:col-span-2 space-y-6">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 glass rounded-[32px] border border-white/5">
                                <Loader2 className="w-12 h-12 text-aurora-400 animate-spin mb-4" />
                                <p className="text-mocha-400 font-medium tracking-widest uppercase text-xs">Syncing Blog Posts...</p>
                            </div>
                        ) : newsItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 glass rounded-[32px] border border-white/5">
                                <p className="text-mocha-400">등록된 게시글이 없습니다.</p>
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
                                            className="glass p-5 rounded-[28px] border border-white/5 hover:border-aurora-400/30 transition-all cursor-pointer relative overflow-hidden flex flex-col md:flex-row gap-6 block"
                                        >
                                            <div className="w-full md:w-56 h-36 rounded-2xl overflow-hidden shrink-0 relative">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute top-3 left-3 px-3 py-1 bg-mocha-950/80 backdrop-blur-md rounded-lg text-[10px] font-bold text-aurora-400 border border-aurora-400/20 uppercase tracking-widest leading-none flex items-center justify-center text-center">
                                                    {item.category}
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        {item.isHot && <span className="bg-neon-pink/10 text-neon-pink text-[10px] font-black px-2 py-0.5 rounded border border-neon-pink/20">HOT</span>}
                                                        <span className="text-mocha-500 text-xs">{item.date}</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-aurora-400 transition-colors leading-snug">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-6 h-6 rounded-full bg-mocha-800 flex items-center justify-center text-[10px] text-mocha-400 font-bold uppercase">
                                                            {item.author?.[0] || 'C'}
                                                        </div>
                                                        <span className="text-mocha-400 text-sm">{item.author}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-4 text-mocha-600">
                                                        <div className="flex items-center space-x-1">
                                                            <Eye className="w-4 h-4" />
                                                            <span className="text-xs">{item.views}</span>
                                                        </div>
                                                        <Share2 className="w-4 h-4 hover:text-neon-cyan transition-colors" />
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        {isAdminMode && (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setEditingItem(item)
                                                }}
                                                className="absolute top-4 right-4 p-2 bg-aurora-400 text-mocha-950 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:scale-110"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))
                        )}
                    </div>

                    {/* Sidebar - Trending & Info */}
                    <div className="space-y-8">
                        {/* Upcoming Events */}
                        <div className="glass p-8 rounded-[32px] border border-white/5">
                            <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                                <Calendar className="mr-3 text-neon-cyan" /> 이번 주 주요 정보
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { title: '고2 3월 모의고사 대비 특강', date: '01.25(Sat)', time: '14:00' },
                                    { title: '예비고1 학부모 간담회', date: '01.27(Mon)', time: '11:00' },
                                    { title: '심화 수학 클리닉 데이', date: '01.28(Tue)', time: '17:00' },
                                ].map((event, i) => (
                                    <div key={i} className="flex space-x-4 items-center group cursor-pointer">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center shrink-0 group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/20 transition-all">
                                            <span className="text-[10px] text-mocha-500 uppercase font-black">{event.date.split('(')[1].replace(')', '')}</span>
                                            <span className="text-lg font-bold text-white group-hover:text-neon-cyan">{event.date.split('.')[1].split('(')[0]}</span>
                                        </div>
                                        <div>
                                            <p className="text-mocha-200 font-bold text-sm mb-1 group-hover:text-white transition-colors">{event.title}</p>
                                            <p className="text-mocha-500 text-xs">{event.time} @ 엄궁 캠퍼스</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-4 rounded-2xl bg-white/5 text-mocha-300 text-sm font-bold hover:bg-white/10 transition-colors">
                                설명회 전체 예약하기
                            </button>
                        </div>

                        {/* Newsletter Sub */}
                        <div className="rounded-[32px] p-1 bg-gradient-to-br from-aurora-400/20 via-transparent to-neon-cyan/20">
                            <div className="bg-mocha-900/40 backdrop-blur-xl p-8 rounded-[31px] text-center">
                                <h4 className="text-white font-bold mb-3">입시 레터 구독하기</h4>
                                <p className="text-mocha-500 text-xs mb-6">최신 입시 정보와 학원 뉴스레터를<br />가장 먼저 이메일로 받아보세요.</p>
                                <div className="space-y-3">
                                    <input type="email" placeholder="email@example.com" className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-aurora-400 outline-none" />
                                    <button className="btn-primary w-full py-3 text-sm">무료 구독 신청</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editingItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-mocha-950/80 backdrop-blur-md">
                    <div className="glass w-full max-w-lg p-8 rounded-[32px] border border-white/10 shadow-2xl relative">
                        <button onClick={() => setEditingItem(null)} className="absolute top-6 right-6 text-mocha-500 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Edit3 className="text-aurora-400" /> 게시글 편집
                        </h2>

                        <form onSubmit={handleUpdatePost} className="space-y-6">
                            <div>
                                <label className="block text-mocha-500 text-xs font-bold uppercase mb-2 tracking-widest">제목</label>
                                <input
                                    type="text"
                                    value={editingItem.title}
                                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-aurora-400 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-mocha-500 text-xs font-bold uppercase mb-2 tracking-widest">카테고리</label>
                                <select
                                    value={editingItem.category}
                                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-aurora-400 outline-none transition-all appearance-none"
                                >
                                    {categories.filter(c => c !== '전체').map(c => (
                                        <option key={c} value={c} className="bg-mocha-900">{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isHidden"
                                    checked={editingItem.isHidden || false}
                                    onChange={(e) => setEditingItem({ ...editingItem, isHidden: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-aurora-400 focus:ring-aurora-400"
                                />
                                <label htmlFor="isHidden" className="text-mocha-400 text-sm">홈페이지에서 보지 않기 (숨기기)</label>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingItem(null)}
                                    className="flex-1 py-4 rounded-2xl bg-white/5 text-mocha-400 font-bold hover:bg-white/10 transition-colors"
                                >
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="flex-1 py-4 rounded-2xl bg-aurora-400 text-mocha-950 font-bold hover:shadow-glow transition-all flex items-center justify-center gap-2"
                                >
                                    {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    저장하기
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
