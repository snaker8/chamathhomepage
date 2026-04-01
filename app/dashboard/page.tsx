'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, TrendingUp, CheckCircle, BookOpen, Flame, Target, Zap, Loader2, LogIn } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'

interface Schedule {
    time: string
    subject: string
    teacher: string
    type: string
}

interface Grade {
    subject: string
    score: number
    date: string
}

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth()
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [grades, setGrades] = useState<Grade[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            setLoading(false)
            return
        }

        const fetchData = async () => {
            try {
                const [schedulesSnap, gradesSnap] = await Promise.all([
                    getDocs(query(
                        collection(db, 'schedules'),
                        where('studentId', '==', user.uid),
                        orderBy('date', 'desc'),
                        limit(5)
                    )),
                    getDocs(query(
                        collection(db, 'grades'),
                        where('studentId', '==', user.uid),
                        orderBy('date', 'desc'),
                        limit(5)
                    ))
                ])

                setSchedules(schedulesSnap.docs.map(d => d.data() as Schedule))
                setGrades(gradesSnap.docs.map(d => d.data() as Grade))
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user])

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
                    <p className="text-void-400 text-sm mb-8">대시보드는 로그인 후 이용할 수 있습니다.</p>
                    <Link href="/" className="btn-primary px-8 py-3 rounded-xl text-sm inline-block">
                        메인으로 돌아가기
                    </Link>
                </div>
            </div>
        )
    }

    const displayName = user.displayName || user.email?.split('@')[0] || '학생'

    return (
        <div className="min-h-[100dvh] bg-void-950 pt-28">
            <div className="container-main px-4 sm:px-6 lg:px-8 py-12">
                {/* Welcome Message */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 break-keep-all">
                        안녕하세요, {displayName}님!
                    </h1>
                    <p className="text-void-300 break-keep-all">
                        오늘도 목표를 향해 한 걸음 더 나아가세요
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-accent-600 animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Bento Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 auto-rows-max">
                            {/* Today's Schedule */}
                            <div className="md:col-span-2 md:row-span-2 glass p-8 rounded-2xl border border-void-700/30">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white break-keep-all">오늘의 일정</h2>
                                    {schedules.length > 0 && (
                                        <span className="text-accent-600 text-xs font-semibold bg-accent-600/10 px-3 py-1 rounded-full border border-accent-600/20">
                                            {schedules.length}개 수업
                                        </span>
                                    )}
                                </div>

                                {schedules.length > 0 ? (
                                    <div className="space-y-3">
                                        {schedules.map((schedule, index) => (
                                            <div
                                                key={index}
                                                className="p-4 rounded-lg bg-white/5 border border-void-700/30 hover:border-accent-600/30 transition-all group"
                                            >
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="text-accent-600 font-semibold text-sm">{schedule.time}</span>
                                                    <span className="px-2 py-0.5 text-xs rounded-full bg-accent-600/15 text-accent-600 border border-accent-600/30">
                                                        {schedule.type}
                                                    </span>
                                                </div>
                                                <h3 className="text-base font-bold text-white mb-0.5 break-keep-all">{schedule.subject}</h3>
                                                <p className="text-xs text-void-400 break-keep-all">{schedule.teacher}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <Clock className="w-10 h-10 text-void-700 mb-3" />
                                        <p className="text-void-500 text-sm break-keep-all">오늘 예정된 수업이 없습니다.</p>
                                    </div>
                                )}

                                <Link href="/student" className="btn-primary w-full mt-6 text-sm py-2.5 justify-center">
                                    학습 자료 보기
                                </Link>
                            </div>

                            {/* Stats Cards */}
                            <div className="glass p-6 rounded-2xl border border-void-700/30 flex flex-col items-center justify-center text-center">
                                <Flame className="w-8 h-8 text-accent-600 mb-3" />
                                <p className="text-void-400 text-xs break-keep-all mb-2">학습 현황</p>
                                <p className="text-lg font-bold text-white break-keep-all">꾸준히 학습 중</p>
                            </div>

                            <div className="glass p-6 rounded-2xl border border-void-700/30 flex flex-col items-center justify-center text-center">
                                <Target className="w-8 h-8 text-accent-600 mb-3" />
                                <p className="text-void-400 text-xs break-keep-all mb-2">목표</p>
                                <p className="text-lg font-bold text-white break-keep-all">매일 성장하기</p>
                            </div>

                            {/* Attendance */}
                            <div className="glass p-6 rounded-2xl border border-void-700/30">
                                <h3 className="text-sm font-bold text-white mb-4 break-keep-all">출석 현황</h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CheckCircle className="w-8 h-8 text-accent-600" />
                                    </div>
                                    <p className="text-void-400 text-sm break-keep-all">출석 데이터 준비 중</p>
                                </div>
                            </div>

                            {/* Assignments */}
                            <div className="glass p-6 rounded-2xl border border-void-700/30">
                                <h3 className="text-sm font-bold text-white mb-4 break-keep-all">과제</h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <BookOpen className="w-8 h-8 text-accent-600" />
                                    </div>
                                    <p className="text-void-400 text-sm break-keep-all">과제 데이터 준비 중</p>
                                </div>
                            </div>

                            {/* Recent Grades */}
                            <div className="md:col-span-2 glass p-8 rounded-2xl border border-void-700/30">
                                <h2 className="text-xl font-bold text-white mb-6 break-keep-all">최근 성적</h2>
                                {grades.length > 0 ? (
                                    <div className="space-y-4">
                                        {grades.map((grade, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-white text-sm mb-1 break-keep-all">{grade.subject}</h4>
                                                    <p className="text-xs text-void-400">{grade.date}</p>
                                                </div>
                                                <div className="flex items-center space-x-3 ml-4">
                                                    <div className="w-24 bg-void-800 rounded-full h-1.5 shrink-0">
                                                        <div
                                                            className="bg-accent-600 h-1.5 rounded-full transition-all duration-500"
                                                            style={{ width: `${grade.score}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-lg font-bold text-accent-600 text-right w-10">
                                                        {grade.score}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <TrendingUp className="w-10 h-10 text-void-700 mx-auto mb-3" />
                                        <p className="text-void-500 text-sm break-keep-all">아직 성적 데이터가 없습니다.</p>
                                    </div>
                                )}
                            </div>

                            {/* Info Card */}
                            <div className="md:col-span-2 glass p-8 rounded-2xl border border-void-700/30">
                                <h2 className="text-xl font-bold text-white mb-4 break-keep-all">차수학 안내</h2>
                                <p className="text-void-400 text-sm leading-relaxed break-keep-all mb-6">
                                    학습 자료, 과제, 성적 등의 데이터는 관리자가 등록하면 자동으로 표시됩니다.
                                    궁금한 점이 있으시면 상담을 신청해주세요.
                                </p>
                                <Link href="/admissions" className="text-accent-600 hover:text-accent-500 text-sm font-semibold transition-colors">
                                    상담 신청하기 &rarr;
                                </Link>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: <BookOpen className="w-6 h-6" />, label: '학습 자료', href: '/student' },
                                { icon: <TrendingUp className="w-6 h-6" />, label: '프로그램', href: '/programs' },
                                { icon: <Clock className="w-6 h-6" />, label: '상담 신청', href: '/admissions' },
                                { icon: <Target className="w-6 h-6" />, label: '입시정보', href: '/info-board' },
                            ].map((action, index) => (
                                <Link
                                    key={index}
                                    href={action.href}
                                    className="glass p-6 rounded-lg border border-void-700/30 hover:border-accent-600/30 hover:bg-white/[0.03] transition-all text-center group"
                                >
                                    <div className="text-void-500 group-hover:text-accent-600 transition-colors mb-3 flex justify-center">
                                        {action.icon}
                                    </div>
                                    <div className="text-void-200 font-semibold text-xs break-keep-all group-hover:text-white transition-colors">{action.label}</div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
