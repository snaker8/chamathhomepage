'use client'

import { BookOpen, CheckCircle, Clock, Users, CreditCard, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function HighSchoolProgramPage() {
    const curriculum = [
        { title: '수학 I/II 실전', period: '3개월 코스', desc: '수능 빈출 유형 분석 및 개념의 실전 적용' },
        { title: '미적분/기하 심화', period: '4개월 코스', desc: '고난도 킬러 문항 정복을 위한 사고력 확장' },
        { title: '확률과 통계 완결', period: '2개월 코스', desc: '완벽한 개념 정리와 실수 방지 훈련' },
    ]

    const features = [
        '엄궁 및 인근 지역 중/고교 10개년 기출 DB 완벽 분석',
        '자체 제작 고퀄리티 주간 테스트지 제공',
        '매수업 종료 후 1:1 개별 클리닉 의무 진행',
        '학부모님 대상 실시간 학습 리포트 발송',
    ]

    return (
        <div className="min-h-screen bg-mocha-950 pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <Link href="/programs" className="inline-flex items-center text-mocha-400 hover:text-aurora-400 mb-8 transition-colors group">
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>전체 프로그램 보기</span>
                </Link>

                {/* Hero Section */}
                <div className="relative mb-16">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/10 blur-[150px] -z-10" />
                    <span className="text-neon-cyan font-bold tracking-widest uppercase mb-4 block">High School Program</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">고등부 프리미엄 커리큘럼</h1>
                    <p className="text-xl text-mocha-300 max-w-3xl leading-relaxed">
                        단순한 문제 풀이를 넘어, 수능과 내신에서 흔들리지 않는<br />
                        압도적인 실력을 완성하는 차수학(Cha Math Academy)만의 고등부 맞춤형 시스템입니다.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Detailed Info Cards */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Curriculum Details */}
                        <div className="glass p-10 rounded-[32px] border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                                <BookOpen className="mr-3 text-aurora-400" /> 세부 커리큘럼
                            </h2>
                            <div className="space-y-6">
                                {curriculum.map((c, i) => (
                                    <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                                        <div className="w-12 h-12 rounded-xl bg-mocha-900 flex items-center justify-center shrink-0 group-hover:bg-aurora-400/20 transition-colors">
                                            <span className="text-aurora-400 font-bold">0{i + 1}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-3 mb-1">
                                                <h4 className="text-lg font-bold text-white">{c.title}</h4>
                                                <span className="text-[10px] px-2 py-0.5 rounded bg-mocha-800 text-mocha-400 font-bold">{c.period}</span>
                                            </div>
                                            <p className="text-mocha-400 text-sm leading-relaxed">{c.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Class Features */}
                        <div className="glass p-10 rounded-[32px] border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                                <CheckCircle className="mr-3 text-neon-cyan" /> 강의 핵심 강점
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {features.map((f, i) => (
                                    <div key={i} className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.8)]" />
                                        <span className="text-mocha-300 text-sm">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Pricing & Schedule */}
                    <div className="space-y-8">
                        {/* Tuition Box */}
                        <div className="glass p-8 rounded-[32px] border border-aurora-400/30 bg-aurora-400/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                                <CreditCard className="w-24 h-24 text-aurora-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-6">수강 안내</h3>

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <div className="flex items-center text-mocha-400 text-sm mb-2">
                                        <Clock className="w-4 h-4 mr-2" /> 수업 횟수
                                    </div>
                                    <p className="text-2xl font-bold text-white">주 3회 (회당 4시간)</p>
                                    <p className="text-mocha-500 text-xs mt-1">* 정규 시간 외 개별 클리닉 1시간 포함</p>
                                </div>

                                <div>
                                    <div className="flex items-center text-mocha-400 text-sm mb-2">
                                        <CreditCard className="w-4 h-4 mr-2" /> 수강료 (4주 기준)
                                    </div>
                                    <p className="text-3xl font-black text-gradient-aurora">₩ 350,000</p>
                                    <p className="text-mocha-500 text-xs mt-1">* 교재비 및 테스트비 별도</p>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex items-center text-mocha-400 text-sm mb-2">
                                        <Users className="w-4 h-4 mr-2" /> 모집 대상
                                    </div>
                                    <p className="text-white font-bold">고등 1학년 ~ 3학년 (남/녀)</p>
                                    <p className="text-mocha-500 text-xs mt-1">(심화반 상담문의)</p>
                                </div>
                            </div>

                            <button className="btn-primary w-full mt-10 py-5 text-lg shadow-[0_0_30px_rgba(204,255,0,0.3)]">
                                수강 신청 상담 예약
                            </button>
                        </div>

                        {/* Consultation Card */}
                        <div className="glass p-8 rounded-[32px] border border-white/5">
                            <h4 className="text-white font-bold mb-4">입학 테스트 안내</h4>
                            <p className="text-mocha-400 text-xs leading-relaxed mb-6">
                                고등부는 정확한 실력 진단을 위해 입학 테스트가 필수입니다. 예약 후 내원해 주시기 바랍니다.
                            </p>
                            <Link href="/admissions" className="btn-ghost w-full py-3 text-sm flex items-center justify-center">
                                테스트 바로 신청하기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
