'use client'

import { BookOpen, GraduationCap, Flame, Target, Zap, Clock, Users } from 'lucide-react'
import Link from 'next/link'

export default function ProgramsPage() {
    const elementarySchool = [
        { title: '연산 + 개념진도', desc: '빠르고 정확한 계산력의 기틀을 다지는 과정', time: '주 5회 (각 60분)', target: '초등 4~6학년', icon: <Zap className="w-5 h-5" /> },
        { title: '개념진도 + 개념심화반', desc: '창의적 문제 해결과 논리적 사고력을 키우는 심화 코스', time: '주 3~5회 (각 60~90분)', target: '초등 4~6학년', icon: <Target className="w-5 h-5" /> },
        { title: '중등 선행반', desc: '탄탄한 기초 위에 중등 수학 개념을 미리 완성', time: '주 3회 (각 90분)', target: '초등 5~6학년', icon: <BookOpen className="w-5 h-5" /> },
    ]

    const middleSchool = [
        { title: '정규반', desc: '탄탄한 기본기를 위한 핵심 과정', time: '주 3회 (각 90분)', target: '중1~중3 전학년', icon: <BookOpen className="w-5 h-5" /> },
        { title: '심화반 (Elite)', desc: '심화 유형 및 고난도 문제 완벽 정복', time: '주 3회 (각 90분)', target: '중1~중3 상위권', icon: <Target className="w-5 h-5" /> },
        { title: '예비고1 과정', desc: '고등 수학의 시작, 가장 중요한 시기', time: '주중 1회 + 주말 1회', target: '중1~중3 우수 학생', icon: <GraduationCap className="w-5 h-5" /> },
    ]

    const highSchool = [
        { title: '내신 기초반', desc: '개념 이해와 기본 내신 대비', time: '주 3회 (각 90분)', target: '고1~고2', icon: <Zap className="w-5 h-5" /> },
        { title: '내신 심화반', desc: '내신 1~2 등급을 위한 실전 전략 및 기출 분석', time: '주 1~2회 (각 90분)', target: '고1~고2 상위권', icon: <Flame className="w-5 h-5" /> },
        { title: '고3 수능대비', desc: '수능 대비 개념 + 기출분석', time: '주1회 + 주말 2회', target: '최상위권 목표', icon: <Target className="w-5 h-5" /> },
    ]

    const getSectionHref = (sectionColor: string) => {
        if (sectionColor === 'elementary') return '/programs/elementary'
        if (sectionColor === 'middle') return '/programs/middle'
        return '/programs/high'
    }

    const renderProgramGrid = (programs: any[], sectionColor: string) => (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Main featured card (larger) */}
            <Link
                href={getSectionHref(sectionColor)}
                className="md:col-span-1 lg:row-span-2 glass p-8 rounded-2xl group hover:border-accent-600/40 transition-all duration-300 relative overflow-hidden flex flex-col"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-lg bg-accent-600/10 flex items-center justify-center mb-4 text-accent-600 border border-accent-600/20">
                        {programs[0].icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 break-keep-all flex-1">{programs[0].title}</h3>
                    <p className="text-void-400 text-sm leading-relaxed break-keep-all mb-6">{programs[0].desc}</p>
                    <div className="space-y-2 mt-auto">
                        <div className="flex items-center space-x-2 text-void-400 text-xs break-keep-all">
                            <Clock className="w-3 h-3 shrink-0" />
                            <span>{programs[0].time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-void-400 text-xs break-keep-all">
                            <Users className="w-3 h-3 shrink-0" />
                            <span>{programs[0].target}</span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Smaller cards */}
            {programs.slice(1).map((p, i) => (
                <Link
                    key={i + 1}
                    href={getSectionHref(sectionColor)}
                    className="glass p-6 rounded-2xl group hover:border-accent-600/40 transition-all duration-300 relative overflow-hidden flex flex-col"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-9 h-9 rounded-lg bg-accent-600/10 flex items-center justify-center mb-3 text-accent-600 border border-accent-600/20 shrink-0">
                            {p.icon}
                        </div>
                        <h3 className="text-base font-bold text-white mb-2 break-keep-all">{p.title}</h3>
                        <p className="text-void-400 text-xs leading-relaxed break-keep-all mb-4 flex-1">{p.desc}</p>
                        <div className="space-y-1.5">
                            <div className="flex items-center space-x-2 text-void-500 text-xs break-keep-all">
                                <Clock className="w-3 h-3 shrink-0" />
                                <span>{p.time}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-void-500 text-xs break-keep-all">
                                <Users className="w-3 h-3 shrink-0" />
                                <span>{p.target}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )

    return (
        <div className="min-h-[100dvh] bg-void-950 pt-32 pb-20 px-6">
            <div className="container-main">
                {/* Header */}
                <div className="text-center mb-28 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mesh -z-10" />
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 break-keep-all">교육 프로그램</h1>
                    <p className="text-lg text-void-300 max-w-3xl mx-auto leading-relaxed break-keep-all">
                        차수학만의 입증된 커리큘럼으로 엄궁 캠퍼스 학생들에게 최적의 학습 로드맵을 제안합니다.
                    </p>
                </div>

                {/* Elementary School Section */}
                <section className="mb-32">
                    <div className="flex items-center space-x-3 mb-12">
                        <div className="h-1 w-8 bg-accent-600 rounded-full" />
                        <h2 className="text-3xl font-bold text-white break-keep-all">초등부 커리큘럼</h2>
                    </div>
                    {renderProgramGrid(elementarySchool, 'elementary')}
                </section>

                {/* Middle School Section */}
                <section className="mb-32">
                    <div className="flex items-center space-x-3 mb-12">
                        <div className="h-1 w-8 bg-accent-600 rounded-full" />
                        <h2 className="text-3xl font-bold text-white break-keep-all">중등부 커리큘럼</h2>
                    </div>
                    {renderProgramGrid(middleSchool, 'middle')}
                </section>

                {/* High School Section */}
                <section className="mb-32">
                    <div className="flex items-center space-x-3 mb-12">
                        <div className="h-1 w-8 bg-accent-600 rounded-full" />
                        <h2 className="text-3xl font-bold text-white break-keep-all">고등부 커리큘럼</h2>
                    </div>
                    {renderProgramGrid(highSchool, 'high')}
                </section>

                {/* Special Intensive Banner */}
                <div className="glass rounded-3xl p-16 md:p-20 text-center relative overflow-hidden border border-accent-600/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-600/8 to-transparent pointer-events-none" />
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10 leading-tight break-keep-all">
                        방학 집중 특강
                        <br />
                        <span className="text-accent-600">차수학의 압축 성장</span>
                    </h2>
                    <p className="text-lg text-void-300 mb-8 max-w-2xl mx-auto relative z-10 break-keep-all">
                        빈틈없는 관리와 몰입 환경을 통해 한 학기 진도를 4주 만에 완벽하게 소화합니다.
                    </p>
                    <Link href="/admissions" className="btn-primary relative z-10">
                        특강 상담 신청하기
                    </Link>
                </div>
            </div>
        </div>
    )
}
