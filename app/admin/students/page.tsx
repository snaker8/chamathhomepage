'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, User, School, Phone, Calendar, Loader2, ArrowLeft, Trash2, Edit2, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { Student } from '@/lib/types'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, query, orderBy, deleteDoc, doc } from 'firebase/firestore'

export default function AdminStudentsPage() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState<Partial<Student>>({
        name: '',
        school: '',
        grade: '',
        phone: '',
        status: 'active',
        subjects: [],
        attendanceDays: 0,
        enrolledDate: new Date().toISOString().split('T')[0]
    })

    const fetchStudents = async () => {
        try {
            setLoading(true)
            const q = query(collection(db, 'students'), orderBy('enrolledDate', 'desc'))
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student))
            setStudents(data)
        } catch (error) {
            console.error('Failed to fetch students:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    const handleSumbit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, 'students'), {
                ...formData,
                createdAt: new Date().toISOString()
            })

            setIsModalOpen(false)
            fetchStudents()
            setFormData({
                name: '',
                school: '',
                grade: '',
                phone: '',
                status: 'active',
                subjects: [],
                attendanceDays: 0,
                enrolledDate: new Date().toISOString().split('T')[0]
            })
        } catch (error) {
            console.error('Failed to save student:', error)
            alert('학생 등록 중 오류가 발생했습니다.')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            try {
                await deleteDoc(doc(db, 'students', id))
                fetchStudents()
            } catch (error) {
                console.error('Failed to delete student:', error)
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
                            <span className="text-aurora-400 mr-4">Students</span>
                            학생 관리
                        </h1>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-aurora-400 hover:bg-aurora-300 text-mocha-950 px-6 py-3 rounded-2xl font-bold flex items-center justify-center transition-all shadow-glow"
                    >
                        <Plus className="w-5 h-5 mr-2" /> 새 학생 등록
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="학생 이름 또는 학교 검색..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pl-12 text-white outline-none focus:border-aurora-400 transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mocha-500 w-5 h-5" />
                    </div>
                </div>

                {/* Table */}
                <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10 text-mocha-500 text-xs font-bold uppercase tracking-widest text-center">
                                    <th className="px-8 py-6">상태</th>
                                    <th className="px-8 py-6">학생명</th>
                                    <th className="px-8 py-6">학교 / 학년</th>
                                    <th className="px-8 py-6">연락처</th>
                                    <th className="px-8 py-6">등록일</th>
                                    <th className="px-8 py-6">기능</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <Loader2 className="w-10 h-10 text-aurora-400 animate-spin mb-4" />
                                                <p className="text-mocha-400">데이터를 불러오는 중입니다...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : students.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center text-mocha-400">
                                            등록된 학생이 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    students.map((student) => (
                                        <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group text-center">
                                            <td className="px-8 py-6">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold ${student.status === 'active' ? 'bg-aurora-400/10 text-aurora-400 border border-aurora-400/20' : 'bg-mocha-800 text-mocha-500'
                                                    }`}>
                                                    {student.status === 'active' ? '재학' : '비활성'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <Link href={`/student/${student.id}`} className="text-white font-bold hover:underline">
                                                    {student.name}
                                                </Link>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-mocha-300">{student.school} / {student.grade}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-mocha-400 font-mono text-sm">{student.phone}</span>
                                            </td>
                                            <td className="px-8 py-6 text-mocha-500 text-sm">
                                                {student.enrolledDate}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center justify-center space-x-3">
                                                    <button className="p-2 text-mocha-500 hover:text-white transition-colors">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(student.id)}
                                                        className="p-2 text-mocha-500 hover:text-neon-pink transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-mocha-950/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                        <div className="glass w-full max-w-xl p-10 rounded-[40px] border border-white/20 relative z-10 animate-in fade-in zoom-in duration-300">
                            <h2 className="text-3xl font-bold text-white mb-8">새 학생 등록</h2>
                            <form onSubmit={handleSumbit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-mocha-400 uppercase tracking-widest pl-1">이름</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-aurora-400 transition-all"
                                            placeholder="홍길동"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-mocha-400 uppercase tracking-widest pl-1">등록일</label>
                                        <input
                                            type="date"
                                            value={formData.enrolledDate}
                                            onChange={(e) => setFormData({ ...formData, enrolledDate: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-aurora-400 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-mocha-400 uppercase tracking-widest pl-1">학교</label>
                                        <input
                                            value={formData.school}
                                            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-aurora-400 transition-all"
                                            placeholder="차수학고등학교"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-mocha-400 uppercase tracking-widest pl-1">학년</label>
                                        <input
                                            value={formData.grade}
                                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-aurora-400 transition-all"
                                            placeholder="2학년"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-mocha-400 uppercase tracking-widest pl-1">연락처</label>
                                    <input
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-aurora-400 transition-all"
                                        placeholder="010-0000-0000"
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
