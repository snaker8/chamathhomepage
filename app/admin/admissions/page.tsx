'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Clock, Trash2, User, School, Phone, Calendar, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminAdmissionsPage() {
    const [admissions, setAdmissions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

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

    useEffect(() => {
        fetchAdmissions()
    }, [])

    return (
        <div className="min-h-screen bg-mocha-950 pt-32 pb-20 px-6">
            <div className="container mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <Link href="/" className="flex items-center text-mocha-500 hover:text-aurora-400 transition-colors mb-4 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            메인으로 돌아가기
                        </Link>
                        <h1 className="text-4xl font-bold text-white flex items-center">
                            <span className="text-aurora-400 mr-4">Management</span>
                            입학 신청 현황
                        </h1>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                        <span className="text-mocha-500 text-sm font-medium mr-3">총 신청건수:</span>
                        <span className="text-white font-bold text-2xl">{admissions.length}</span>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glass p-6 rounded-2xl border border-white/5">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-aurora-400/10 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-aurora-400" />
                            </div>
                            <div>
                                <p className="text-mocha-500 text-sm">대기 중</p>
                                <p className="text-2xl font-bold text-white">{admissions.filter(a => a.status === 'Pending').length}</p>
                            </div>
                        </div>
                    </div>
                    {/* Additional stats could go here */}
                </div>

                {/* Applications List */}
                <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="px-8 py-6 text-mocha-500 text-xs font-bold uppercase tracking-widest text-center">신청일</th>
                                    <th className="px-8 py-6 text-mocha-500 text-xs font-bold uppercase tracking-widest text-center">학생명</th>
                                    <th className="px-8 py-6 text-mocha-500 text-xs font-bold uppercase tracking-widest text-center">학교/학년</th>
                                    <th className="px-8 py-6 text-mocha-500 text-xs font-bold uppercase tracking-widest text-center">연락처</th>
                                    <th className="px-8 py-6 text-mocha-500 text-xs font-bold uppercase tracking-widest text-center">상태</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <Loader2 className="w-10 h-10 text-aurora-400 animate-spin mb-4" />
                                                <p className="text-mocha-400">데이터를 불러오는 중입니다...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : admissions.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center text-mocha-400">
                                            신청 내역이 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    admissions.map((admission) => (
                                        <tr key={admission.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-8 py-6 text-center">
                                                <span className="text-mocha-400 text-sm font-mono">
                                                    {new Date(admission.createdAt).toLocaleDateString('ko-KR')}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="text-white font-bold">{admission.name}</span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="text-mocha-300">{admission.school}</span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="text-neon-cyan font-mono">{admission.phone}</span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${admission.status === 'Pending'
                                                        ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                                                        : 'bg-aurora-400/10 text-aurora-400 border border-aurora-400/20'
                                                    }`}>
                                                    {admission.status === 'Pending' ? '상담대기' : '완료'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
