'use client'

import { useState, useEffect } from 'react'
import {
    CheckCircle, Clock, User, Phone, Calendar, Loader2, ArrowLeft,
    MapPin, Monitor, Filter, Search, ChevronDown
} from 'lucide-react'
import Link from 'next/link'

const CONSULT_TYPE_LABELS: Record<string, string> = {
    visit: '방문',
    phone: '전화',
    online: '온라인',
}

const CONSULT_TYPE_ICONS: Record<string, any> = {
    visit: MapPin,
    phone: Phone,
    online: Monitor,
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
    pending: { label: '상담대기', bg: 'bg-amber-400/10', text: 'text-amber-400', border: 'border-amber-400/20' },
    confirmed: { label: '확정', bg: 'bg-blue-400/10', text: 'text-blue-400', border: 'border-blue-400/20' },
    completed: { label: '완료', bg: 'bg-emerald-400/10', text: 'text-emerald-400', border: 'border-emerald-400/20' },
    cancelled: { label: '취소', bg: 'bg-void-600/10', text: 'text-void-400', border: 'border-void-600/20' },
    // 기존 데이터 호환
    Pending: { label: '상담대기', bg: 'bg-amber-400/10', text: 'text-amber-400', border: 'border-amber-400/20' },
}

export default function AdminAdmissionsPage() {
    const [admissions, setAdmissions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const fetchAdmissions = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/admissions')
            const data = await res.json()
            if (Array.isArray(data)) {
                setAdmissions(data)
            }
        } catch (error) {
            console.error('Failed to fetch admissions:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const { doc, updateDoc } = await import('firebase/firestore')
            const { db } = await import('@/lib/firebase')
            await updateDoc(doc(db, 'admissions', id), { status: newStatus })
            setAdmissions(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a))
        } catch (error) {
            console.error('Status update error:', error)
            alert('상태 변경에 실패했습니다.')
        }
    }

    useEffect(() => {
        fetchAdmissions()
    }, [])

    const filteredAdmissions = admissions.filter(a => {
        const matchesStatus = filterStatus === 'all' || a.status === filterStatus
        const matchesSearch = !searchQuery ||
            a.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.school?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.phone?.includes(searchQuery)
        return matchesStatus && matchesSearch
    })

    const pendingCount = admissions.filter(a => a.status === 'pending' || a.status === 'Pending').length
    const confirmedCount = admissions.filter(a => a.status === 'confirmed').length
    const completedCount = admissions.filter(a => a.status === 'completed').length

    return (
        <div className="min-h-screen bg-void-950 pt-32 pb-20 px-6">
            <div className="container-main">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <Link href="/" className="flex items-center text-void-500 hover:text-accent-600 transition-colors mb-4 group text-sm">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            메인으로 돌아가기
                        </Link>
                        <h1 className="text-3xl font-bold text-white">
                            상담 예약 관리
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/admin/slots" className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            일정 관리
                        </Link>
                        <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4">
                            <span className="text-void-400 text-sm">총 신청</span>
                            <span className="text-white font-bold text-2xl">{admissions.length}</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="glass p-6 rounded-2xl border-l-4 border-l-amber-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-void-400 text-xs font-semibold uppercase tracking-widest mb-1">상담 대기</p>
                                <p className="text-3xl font-bold text-white">{pendingCount}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-amber-400" />
                            </div>
                        </div>
                    </div>
                    <div className="glass p-6 rounded-2xl border-l-4 border-l-blue-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-void-400 text-xs font-semibold uppercase tracking-widest mb-1">확정</p>
                                <p className="text-3xl font-bold text-white">{confirmedCount}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-400" />
                            </div>
                        </div>
                    </div>
                    <div className="glass p-6 rounded-2xl border-l-4 border-l-emerald-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-void-400 text-xs font-semibold uppercase tracking-widest mb-1">완료</p>
                                <p className="text-3xl font-bold text-white">{completedCount}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-emerald-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-void-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="이름, 학교, 연락처 검색..."
                            className="w-full bg-white/5 border border-void-700/50 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:border-accent-600 outline-none transition-all placeholder-void-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        {[
                            { key: 'all', label: '전체' },
                            { key: 'pending', label: '대기' },
                            { key: 'confirmed', label: '확정' },
                            { key: 'completed', label: '완료' },
                        ].map(f => (
                            <button
                                key={f.key}
                                onClick={() => setFilterStatus(f.key)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                    filterStatus === f.key
                                        ? 'bg-accent-600 text-white'
                                        : 'bg-void-800 text-void-400 hover:bg-void-700'
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Applications List */}
                <div className="space-y-3">
                    {loading ? (
                        <div className="glass rounded-2xl p-20 text-center">
                            <Loader2 className="w-10 h-10 text-accent-600 animate-spin mx-auto mb-4" />
                            <p className="text-void-400">데이터를 불러오는 중입니다...</p>
                        </div>
                    ) : filteredAdmissions.length === 0 ? (
                        <div className="glass rounded-2xl p-20 text-center">
                            <p className="text-void-400">
                                {searchQuery ? '검색 결과가 없습니다.' : '신청 내역이 없습니다.'}
                            </p>
                        </div>
                    ) : (
                        filteredAdmissions.map((admission) => {
                            const statusConf = STATUS_CONFIG[admission.status] || STATUS_CONFIG.pending
                            const ConsultIcon = CONSULT_TYPE_ICONS[admission.consultType] || User
                            const isExpanded = expandedId === admission.id

                            return (
                                <div
                                    key={admission.id}
                                    className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.02]"
                                >
                                    {/* Main Row */}
                                    <button
                                        onClick={() => setExpandedId(isExpanded ? null : admission.id)}
                                        className="w-full flex items-center gap-4 p-6 text-left"
                                    >
                                        {/* 상담 유형 아이콘 */}
                                        <div className="w-10 h-10 rounded-xl bg-accent-600/10 flex items-center justify-center shrink-0">
                                            <ConsultIcon className="w-5 h-5 text-accent-600" />
                                        </div>

                                        {/* 학생명 */}
                                        <div className="min-w-[80px]">
                                            <p className="text-white font-bold text-sm">{admission.name}</p>
                                            <p className="text-void-500 text-xs">{admission.school}</p>
                                        </div>

                                        {/* 예약 정보 */}
                                        <div className="flex-1 flex items-center gap-6 text-sm">
                                            {admission.consultDate && (
                                                <div className="flex items-center gap-2 text-void-300">
                                                    <Calendar className="w-3.5 h-3.5 text-void-500" />
                                                    <span>{admission.consultDate}</span>
                                                    {admission.consultTime && (
                                                        <span className="text-accent-600 font-medium">{admission.consultTime}</span>
                                                    )}
                                                </div>
                                            )}
                                            {admission.consultType && (
                                                <span className="text-void-500 text-xs px-2 py-0.5 rounded bg-void-800">
                                                    {CONSULT_TYPE_LABELS[admission.consultType] || admission.consultType}
                                                </span>
                                            )}
                                        </div>

                                        {/* 상태 */}
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusConf.bg} ${statusConf.text} border ${statusConf.border}`}>
                                            {statusConf.label}
                                        </span>

                                        <ChevronDown className={`w-4 h-4 text-void-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Expanded Details */}
                                    {isExpanded && (
                                        <div className="px-6 pb-6 border-t border-void-800 pt-4">
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                                <div>
                                                    <p className="text-void-500 text-xs mb-1">연락처</p>
                                                    <p className="text-white text-sm font-mono">{admission.phone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-void-500 text-xs mb-1">신청일</p>
                                                    <p className="text-void-300 text-sm">
                                                        {admission.createdAt ? new Date(admission.createdAt).toLocaleString('ko-KR') : '-'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-void-500 text-xs mb-1">상담 유형</p>
                                                    <p className="text-void-300 text-sm">
                                                        {CONSULT_TYPE_LABELS[admission.consultType] || '레벨테스트 (기존)'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-void-500 text-xs mb-1">예약 일시</p>
                                                    <p className="text-void-300 text-sm">
                                                        {admission.consultDate ? `${admission.consultDate} ${admission.consultTime || ''}` : '-'}
                                                    </p>
                                                </div>
                                            </div>

                                            {admission.message && (
                                                <div className="mb-6 p-4 rounded-xl bg-void-800/50">
                                                    <p className="text-void-500 text-xs mb-1">문의 사항</p>
                                                    <p className="text-void-200 text-sm">{admission.message}</p>
                                                </div>
                                            )}

                                            {/* 상태 변경 버튼 */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-void-500 text-xs mr-2">상태 변경:</span>
                                                {['pending', 'confirmed', 'completed', 'cancelled'].map(status => {
                                                    const conf = STATUS_CONFIG[status]
                                                    const isCurrent = admission.status === status
                                                    return (
                                                        <button
                                                            key={status}
                                                            onClick={() => updateStatus(admission.id, status)}
                                                            disabled={isCurrent}
                                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                                                isCurrent
                                                                    ? `${conf.bg} ${conf.text} border ${conf.border}`
                                                                    : 'bg-void-800 text-void-400 hover:bg-void-700'
                                                            }`}
                                                        >
                                                            {conf.label}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}
