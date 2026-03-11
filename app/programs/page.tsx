'use client'

import { BookOpen, GraduationCap, Flame, Target, Zap, Clock, Users } from 'lucide-react'
import Link from 'next/link'

export default function ProgramsPage() {
    const elementarySchool = [
        { title: '연산 + 개념진도', desc: '빠르고 정확한 계산력의 기틀을 다지는 과정+기본 진도', time: '주 5회 (각 60분)', target: '초등 4 ~ 6학년', icon: <Zap className="w-6 h-6 text-neon-cyan" />, span: 'col-span-1' },
        { title: '개념진도 + 개념심화반', desc: '창의적 문제 해결과 논리적 사고력을 키우는 심화 코스', time: '주 3회 (각 90분) 또는 5회 (각 60분)', target: '초등 4 ~ 6학년', icon: <Target className="w-6 h-6 text-aurora-400" />, span: 'col-span-1 md:col-span-2' },
        { title: '중등 선행반', desc: '탄탄한 기초 위에 중등 수학 개념을 미리 완성', time: '주 3회 (각 90분)', target: '초등 5 ~ 6학년', icon: <BookOpen className="w-6 h-6 text-neon-pink" />, span: 'col-span-1 md:col-span-3' },
    ]

    const middleSchool = [
        { title: '정규반', desc: '탄탄한 기본기를 위한 핵심 과정', time: '주 3회 (각 90분)', target: '중1 ~ 중3 전학년', icon: <BookOpen className="w-6 h-6 text-neon-cyan" />, span: 'col-span-1' },
        { title: '심화반 (Elite)', desc: '심화 유형 및 고난도 문제 완벽 정복', time: '주 3회 (각 90분)', target: '중1 ~ 중3 상위권 학생 대상', icon: <Target className="w-6 h-6 text-aurora-400" />, span: 'col-span-1 md:col-span-2' },
        { title: '예비고1 과정', desc: '고등 수학의 시작, 가장 중요한 시기', time: '주중 1회 + 주말 1회 (각 90분)', target: '중1 ~ 중2 극상위권 학생 대상 & 중3 상위권 학생 대상', icon: <GraduationCap className="w-6 h-6 text-neon-pink" />, span: 'col-span-1 md:col-span-3' },
    ]

    const highSchool = [
        { title: '내신 기초반', desc: '개념 이해와 기본 내신 대비', time: '주 3회 (각 90분)', target: '고1 ~ 고2', icon: <Zap className="w-6 h-6 text-neon-cyan" />, span: 'col-span-1 md:col-span-2' },
        { title: '내신 심화반 & 수능 기초반', desc: '내신 1~2 등급을 위한 실전 전략 및 기출 분석', time: '주 1회 + 주말 1회 (각 90분)', target: '고1, 고2', icon: <Flame className="w-6 h-6 text-aurora-400" />, span: 'col-span-1' },
        { title: '고3 수능대비', desc: '수능 대비 개념 + 기출분석', time: '주1회 + 주말 2회 (각 90분)', target: '최상위권 목표', icon: <Target className="w-6 h-6 text-white" />, span: 'col-span-1 md:col-span-3' },
    ]

    return (
        <div className="min-h-screen bg-mocha-950 pt-32 pb-20 px-6">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-24 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neon-cyan/10 blur-[150px] -z-10" />
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">교육 프로그램</h1>
                    <p className="text-xl text-mocha-200 max-w-3xl mx-auto leading-relaxed">
                        차수학만의 입증된 커리큘럼으로<br />
                        엄궁 캠퍼스 학생들에게 최적의 학습 로드맵을 제안합니다.
                    </p>
                </div>

                {/* Elementary School Section */}
                <section className="mb-32">
                    <div className="flex items-center space-x-4 mb-12">
                        <div className="h-10 w-2 bg-neon-pink rounded-full shadow-[0_0_15px_rgba(255,0,255,0.6)]" />
                        <h2 className="text-4xl font-bold text-white">초등부 커리큘럼</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {elementarySchool.map((p, i) => (
                            <Link key={i} href="/programs/elementary" className={`glass p-8 rounded-3xl border border-white/10 hover:border-neon-pink/50 transition-all duration-500 group relative overflow-hidden ${p.span} hover:shadow-[0_0_40px_rgba(255,0,255,0.1)] block`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-neon-pink/20 transition-colors">
                                        {p.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-neon-pink transition-colors">{p.title}</h3>
                                    <p className="text-mocha-300 mb-8 font-medium">{p.desc}</p>

                                    <div className="flex flex-wrap gap-4 mt-auto">
                                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-mocha-900/50 border border-white/5 text-sm text-mocha-400">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{p.time}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-mocha-900/50 border border-white/5 text-sm text-mocha-400">
                                            <Users className="w-3.5 h-3.5" />
                                            <span>{p.target}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Middle School Section */}
                <section className="mb-32">
                    <div className="flex items-center space-x-4 mb-12">
                        <div className="h-10 w-2 bg-aurora-400 rounded-full shadow-[0_0_15px_rgba(204,255,0,0.6)]" />
                        <h2 className="text-4xl font-bold text-white">중등부 커리큘럼</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {middleSchool.map((p, i) => (
                            <Link key={i} href="/programs/middle" className={`glass p-8 rounded-3xl border border-white/10 hover:border-aurora-400/50 transition-all duration-500 group relative overflow-hidden ${p.span} hover:shadow-[0_0_40px_rgba(77,255,145,0.1)] block`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-aurora-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-aurora-400/20 transition-colors">
                                        {p.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-aurora-400 transition-colors">{p.title}</h3>
                                    <p className="text-mocha-300 mb-8 font-medium">{p.desc}</p>

                                    <div className="flex flex-wrap gap-4 mt-auto">
                                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-mocha-900/50 border border-white/5 text-sm text-mocha-400">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{p.time}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-mocha-900/50 border border-white/5 text-sm text-mocha-400">
                                            <Users className="w-3.5 h-3.5" />
                                            <span>{p.target}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>


                {/* High School Section */}
                <section className="mb-32">
                    <div className="flex items-center space-x-4 mb-12">
                        <div className="h-10 w-2 bg-neon-cyan rounded-full shadow-[0_0_15px_rgba(0,243,255,0.6)]" />
                        <h2 className="text-4xl font-bold text-white">고등부 커리큘럼</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {highSchool.map((p, i) => (
                            <Link key={i} href="/programs/high" className={`glass p-8 rounded-3xl border border-white/10 hover:border-neon-cyan/50 transition-all duration-500 group relative overflow-hidden ${p.span} hover:shadow-[0_0_40px_rgba(0,243,255,0.1)] block`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-neon-cyan/20 transition-colors">
                                        {p.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors">{p.title}</h3>
                                    <p className="text-mocha-300 mb-8 font-medium">{p.desc}</p>

                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-mocha-900/50 border border-white/5 text-sm text-mocha-400">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{p.time}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-mocha-900/50 border border-white/5 text-sm text-mocha-400">
                                            <Users className="w-3.5 h-3.5" />
                                            <span>{p.target}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Special Intensive Banner */}
                <div className="rounded-[40px] p-1 bg-gradient-to-r from-aurora-400 via-neon-cyan to-neon-pink">
                    <div className="bg-mocha-950 rounded-[38px] p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-aurora-400/10 to-transparent pointer-events-none" />
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 relative z-10 leading-tight">
                            방학 집중 특강<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-400 to-neon-cyan underline decoration-white/20">차수학의 압축 성장</span>
                        </h2>
                        <p className="text-xl text-mocha-200 mb-12 max-w-2xl mx-auto relative z-10">
                            빈틈없는 관리와 몰입 환경을 통해 한 학기 진도를 4주 만에 완벽하게 소화합니다. 기초부터 심화까지 빈틈없이 채우는 골든 타임입니다.
                        </p>
                        <button className="btn-primary px-12 py-5 text-xl relative z-10">
                            특강 시간표 확인하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
