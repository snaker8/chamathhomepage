'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, BookOpen, Calendar, Clock, Trophy, Target, User, Loader2, CheckCircle, Video, Play, Download, FileText, Layout } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Student, LearningRecord } from '@/lib/types'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function StudentDetailPage() {
    const params = useParams()
    const id = params.id as string

    const [student, setStudent] = useState<Student | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('전체')

    // Mock records for UI demonstration
    const records: LearningRecord[] = [
        { id: '1', studentId: '1', date: '2023-10-25', subject: '수학(상)', title: '다항식의 연산', type: 'assignment', status: 'completed', score: 85, feedback: '계산 실수를 줄이는 연습이 필요함.' },
        { id: '2', studentId: '1', date: '2023-10-28', subject: '수학(상)', title: '인수분해', type: 'video', status: 'completed', duration: '45:00', score: 90, feedback: '공식 암기가 잘 되어 있음. 응용 문제 풀이 강화 필요.' },
        { id: '3', studentId: '1', date: '2023-11-02', subject: '수학(상)', title: '항등식과 나머지정리', type: 'material', status: 'in-progress', score: 75, feedback: '나머지정리에 대한 개념 이해 부족. 보충 학습 진행함.' },
        { id: '4', studentId: '1', date: '2023-11-05', subject: '수학(상)', title: '이차방정식', type: 'assignment', status: 'completed', score: 95, feedback: '매우 우수함.' },
    ]

    useEffect(() => {
        const fetchStudent = async () => {
            if (!id) return
            try {
                setLoading(true)
                // Direct Firestore Fetch
                const docRef = doc(db, 'students', id)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    setStudent({ id: docSnap.id, ...docSnap.data() } as Student)
                } else {
                    console.error('Student not found')
                }
            } catch (error) {
                console.error('Failed to fetch student:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStudent()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-mocha-950 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-aurora-400 animate-spin" />
            </div>
        )
    }

    if (!student) {
        return (
            <div className="min-h-screen bg-mocha-950 flex flex-col items-center justify-center text-white">
                <p className="text-xl mb-4">학생 정보를 찾을 수 없습니다.</p>
                <Link href="/admin/students" className="text-aurora-400 hover:underline">
                    학생 목록으로 돌아가기
                </Link>
            </div>
        )
    }

    const stats = [
        { label: '출석일수', value: `${student.attendanceDays}일`, icon: <Calendar className="w-5 h-5 text-neon-cyan" />, theme: 'cyan' },
        { label: '완료 과제', value: `${records.filter(r => r.status === 'completed' && r.type === 'assignment').length}건`, icon: <CheckCircle className="w-5 h-5 text-aurora-400" />, theme: 'aurora' },
        { label: '시청 영상', value: `${records.filter(r => r.type === 'video').length}개`, icon: <Video className="w-5 h-5 text-neon-pink" />, theme: 'pink' },
    ]

    return (
        <div className="min-h-screen bg-mocha-950 pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-7xl">
                <Link href="/admin/students" className="inline-flex items-center text-mocha-500 hover:text-aurora-400 transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    학생 전체 목록
                </Link>

                {/* Profile Header */}
                <div className="glass p-10 rounded-[40px] border border-white/10 mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12">
                        <User className="w-64 h-64 text-white" />
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
                        <div className="w-32 h-32 rounded-[32px] bg-gradient-aurora p-1 shadow-glow-lg">
                            <div className="w-full h-full rounded-[28px] bg-mocha-900 flex items-center justify-center text-4xl font-bold text-white">
                                {student.name.substring(0, 1)}
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                                <h1 className="text-4xl font-bold text-white">{student.name}</h1>
                                <span className="bg-aurora-400/10 text-aurora-400 px-4 py-1.5 rounded-full text-xs font-bold border border-aurora-400/20">
                                    {student.status === 'active' ? '재학 중' : '휴학'}
                                </span>
                                <span className="bg-white/5 text-mocha-400 px-4 py-1.5 rounded-full text-xs font-bold border border-white/10">
                                    {student.school} {student.grade}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-mocha-500 uppercase tracking-widest">연락처</p>
                                    <p className="text-white font-mono">{student.phone}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-mocha-500 uppercase tracking-widest">학부모 연락처</p>
                                    <p className="text-white font-mono">{student.parentPhone || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-mocha-500 uppercase tracking-widest">최초 등록일</p>
                                    <p className="text-white">{student.enrolledDate}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-mocha-500 uppercase tracking-widest">수강 과목</p>
                                    <div className="flex flex-wrap gap-1">
                                        {student.subjects?.map((s, i) => (
                                            <span key={i} className="text-[10px] text-neon-cyan px-2 py-0.5 rounded-md bg-neon-cyan/10">{s}</span>
                                        )) || <span className="text-mocha-500 text-sm">없음</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Stats Column */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glass p-8 rounded-[32px] border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                                <Target className="w-5 h-5 mr-3 text-neon-cyan" /> 학습 성취도
                            </h3>
                            <div className="space-y-8">
                                {stats.map((s, i) => (
                                    <div key={i} className="relative">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center">
                                                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mr-3`}>
                                                    {s.icon}
                                                </div>
                                                <span className="text-mocha-300 font-medium">{s.label}</span>
                                            </div>
                                            <span className="text-white font-bold">{s.value}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full transition-all duration-1000 ${s.theme === 'cyan' ? 'bg-neon-cyan' : s.theme === 'aurora' ? 'bg-aurora-400' : 'bg-neon-pink'
                                                }`} style={{ width: '70%' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass p-8 rounded-[32px] border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Trophy className="w-5 h-5 mr-3 text-amber-400" /> 담당 선생님 메모
                            </h3>
                            <p className="text-mocha-400 text-sm leading-relaxed">
                                학생의 학습 의지가 매우 높으며, 오답 정리에 특히 강점을 보입니다. 다음 주 테스트 결과에 따라 보충 수업 여부를 결정할 예정입니다.
                            </p>
                        </div>
                    </div>

                    {/* Right Activities Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                <BookOpen className="w-6 h-6 mr-3 text-aurora-400" /> 최근 학습 활동
                            </h2>
                            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                                {['전체', '영상', '자료', '과제'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? 'bg-aurora-400 text-mocha-950 shadow-glow' : 'text-mocha-400 hover:text-white'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {records.filter(r => activeTab === '전체' || (
                                activeTab === '영상' && r.type === 'video' ||
                                activeTab === '자료' && r.type === 'material' ||
                                activeTab === '과제' && r.type === 'assignment'
                            )).length === 0 ? (
                                <div className="glass p-12 rounded-3xl border border-dashed border-white/10 text-center">
                                    <Layout className="w-12 h-12 text-mocha-700 mx-auto mb-4" />
                                    <p className="text-mocha-500">아직 등록된 학습 활동이 없습니다.</p>
                                </div>
                            ) : (
                                records.filter(r => activeTab === '전체' || (
                                    activeTab === '영상' && r.type === 'video' ||
                                    activeTab === '자료' && r.type === 'material' ||
                                    activeTab === '과제' && r.type === 'assignment'
                                )).map((record, i) => (
                                    <div key={record.id} className="glass p-6 rounded-3xl border border-white/5 hover:border-aurora-400/20 transition-all group flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${record.type === 'video' ? 'bg-neon-cyan/10 text-neon-cyan' :
                                            record.type === 'material' ? 'bg-aurora-400/10 text-aurora-400' :
                                                'bg-neon-pink/10 text-neon-pink'
                                            }`}>
                                            {record.type === 'video' ? <Video className="w-7 h-7" /> :
                                                record.type === 'material' ? <FileText className="w-7 h-7" /> :
                                                    <CheckCircle className="w-7 h-7" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h4 className="text-lg font-bold text-white group-hover:text-aurora-400 transition-colors truncate">{record.title}</h4>
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold shrink-0 ${record.status === 'completed' ? 'bg-white/5 text-mocha-500' : 'bg-aurora-400/10 text-aurora-400 border border-aurora-400/20'
                                                    }`}>
                                                    {record.status === 'completed' ? '기록완료' : '진행중'}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-mocha-500 text-xs gap-4">
                                                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {record.duration || 'N/A'}</span>
                                                <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {record.date}</span>
                                            </div>
                                        </div>
                                        <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-mocha-300 hover:text-white transition-all shrink-0">
                                            {record.type === 'video' ? <Play className="w-5 h-5 fill-current" /> : <Download className="w-5 h-5" />}
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
