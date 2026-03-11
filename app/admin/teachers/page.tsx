'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Trash2, Edit2, Loader2, BookOpen, GraduationCap, Mail, Phone, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Teacher } from '@/lib/types'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, query, orderBy, deleteDoc, doc } from 'firebase/firestore'

export default function AdminTeachersPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState<Partial<Teacher>>({
        name: '',
        role: 'Teacher',
        subject: '',
        email: '',
        phone: '',
        bio: ''
    })

    const fetchTeachers = async () => {
        try {
            setLoading(true)
            const q = query(collection(db, 'teachers'), orderBy('createdAt', 'desc'))
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Teacher))
            setTeachers(data)
        } catch (error) {
            console.error('Failed to fetch teachers:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTeachers()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, 'teachers'), {
                ...formData,
                createdAt: new Date().toISOString()
            })

            setIsModalOpen(false)
            fetchTeachers()
            setFormData({
                name: '',
                role: 'Teacher',
                subject: '',
                email: '',
                phone: '',
                bio: ''
            })
        } catch (error) {
            console.error('Failed to save teacher:', error)
            alert('선생님 등록 중 오류가 발생했습니다.')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            try {
                await deleteDoc(doc(db, 'teachers', id))
                fetchTeachers()
            } catch (error) {
                console.error('Failed to delete teacher:', error)
                alert('삭제 중 오류가 발생했습니다.')
            }
        }
    }

    return (
        <div className="min-h-screen bg-mocha-950 pt-32 pb-20 px-6">
            <div className="container mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <Link href="/" className="flex items-center text-mocha-500 hover:text-aurora-400 transition-colors mb-4 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            메인으로 돌아가기
                        </Link>
                        <h1 className="text-4xl font-bold text-white flex items-center">
                            <span className="text-aurora-400 mr-4">Teachers</span>
                            선생님 관리
                        </h1>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-aurora-400 hover:bg-aurora-300 text-mocha-950 px-6 py-3 rounded-2xl font-bold flex items-center justify-center transition-all shadow-glow"
                    >
                        <Plus className="w-5 h-5 mr-2" /> 선생님 등록
                    </button>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-aurora-400 animate-spin mb-4" />
                        <p className="text-mocha-400">데이터를 불러오는 중입니다...</p>
                    </div>
                ) : teachers.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <p className="text-mocha-400">등록된 선생님이 없습니다.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teachers.map((teacher) => (
                            <div key={teacher.id} className="glass p-8 rounded-3xl border border-white/10 relative group hover:border-aurora-400/50 transition-colors">
                                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 bg-mocha-900/80 rounded-full text-mocha-400 hover:text-white transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(teacher.id)}
                                        className="p-2 bg-mocha-900/80 rounded-full text-mocha-400 hover:text-neon-pink transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="w-20 h-20 bg-gradient-to-br from-aurora-400 to-neon-cyan rounded-2xl mb-6 flex items-center justify-center text-mocha-950 font-bold text-3xl shadow-lg">
                                    {teacher.name[0]}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{teacher.name}</h3>
                                <p className="text-aurora-400 font-medium mb-6">{teacher.subject} 담당</p>

                                <div className="space-y-3">
                                    <div className="flex items-center text-mocha-400 text-sm">
                                        <GraduationCap className="w-4 h-4 mr-3 text-mocha-500" />
                                        {teacher.role}
                                    </div>
                                    <div className="flex items-center text-mocha-400 text-sm">
                                        <Phone className="w-4 h-4 mr-3 text-mocha-500" />
                                        {teacher.phone}
                                    </div>
                                    <div className="flex items-center text-mocha-400 text-sm">
                                        <Mail className="w-4 h-4 mr-3 text-mocha-500" />
                                        {teacher.email}
                                    </div>
                                </div>

                                {teacher.bio && (
                                    <p className="mt-6 pt-6 border-t border-white/10 text-mocha-400 text-sm leading-relaxed line-clamp-2">
                                        {teacher.bio}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}


                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-mocha-950/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                        <div className="glass w-full max-w-xl p-10 rounded-[40px] border border-white/20 relative z-10 animate-in fade-in zoom-in duration-300">
                            <h2 className="text-3xl font-bold text-white mb-8">선생님 등록</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-mocha-400 uppercase tracking-widest pl-1">이름</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-aurora-400 transition-all"
                                            placeholder="선생님 성함"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-mocha-400 uppercase tracking-widest pl-1">과목</label>
                                        <input
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-aurora-400 transition-all"
                                            placeholder="예: 중등 수학"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-mocha-400 uppercase tracking-widest pl-1">직책</label>
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'Teacher' | 'Admin' })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-aurora-400 transition-all"
                                        >
                                            <option value="Teacher" className="bg-mocha-900">Teacher</option>
                                            <option value="Admin" className="bg-mocha-900">Admin</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-mocha-400 uppercase tracking-widest pl-1">연락처</label>
                                        <input
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-aurora-400 transition-all"
                                            placeholder="010-0000-0000"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-mocha-400 uppercase tracking-widest pl-1">이메일</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-aurora-400 transition-all"
                                        placeholder="teacher@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-mocha-400 uppercase tracking-widest pl-1">소개글</label>
                                    <textarea
                                        rows={3}
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-aurora-400 transition-all resize-none"
                                        placeholder="간단한 소개글을 입력하세요"
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-8 py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-8 py-4 rounded-2xl bg-gradient-to-r from-aurora-400 to-neon-cyan text-mocha-950 font-bold shadow-glow hover:scale-[1.02] transition-all"
                                    >
                                        저장하기
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
