'use client'

import { BookOpen, CheckCircle, Clock, Users, CreditCard, ChevronLeft, Target } from 'lucide-react'
import Link from 'next/link'

export default function MiddleSchoolProgramPage() {
    const curriculum = [
        { title: '내신 완벽 대비', period: '학기 중', desc: '학교별 기출 유형 분석을 통한 내신 100점 목표' },
        { title: '학년 별 선행 + 고등 과정', period: '방학 및 주말', desc: '학기 중 내신대비를 위한 학년별 선행 과정' },
        { title: '유형별 문제 해결', period: '상시', desc: '취약 유형 집중 공략을 통한 문제 해결 능력 배양' },
    ]

    const features = [
        '개인별 오답 노트 관리 시스템 (디지털 분석)',
        '서술형 대비 문항 및 첨삭 지도',
        '철저한 주간 테스트 및 재시험 제도',
        '자기주도 학습 능력을 키우는 수학프로그램 운영',
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-aurora-400/10 blur-[150px] -z-10" />
                    <span className="text-aurora-400 font-bold tracking-widest uppercase mb-4 block">Middle School Program</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">중등부 특화 교육 과정</h1>
                    <p className="text-xl text-mocha-300 max-w-3xl leading-relaxed">
                        수학의 뼈대를 세우는 가장 중요한 시기입니다.<br />
                        차수학(Cha Math Academy)만의 노하우로 개념의 정의부터 심화 문제 해결까지 체계적으로 관리합니다.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Curriculum Details */}
                        <div className="glass p-10 rounded-[32px] border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                                <Target className="mr-3 text-aurora-400" /> 중등부 커리큘럼
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
                                <CheckCircle className="mr-3 text-neon-cyan" /> 중등부 관리 강점
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {features.map((f, i) => (
                                    <div key={i} className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-aurora-400 shadow-[0_0_10px_rgba(204,255,0,0.8)]" />
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
                            <h3 className="text-xl font-bold text-white mb-6">수강 안내</h3>

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <div className="flex items-center text-mocha-400 text-sm mb-2">
                                        <Clock className="w-4 h-4 mr-2" /> 수업 횟수
                                    </div>
                                    <p className="text-2xl font-bold text-white">주 3회 (회당 3시간)</p>
                                    <p className="text-mocha-500 text-xs mt-1">* 2.5시간 강의 + 0.5시간 피드백</p>
                                </div>

                                <div>
                                    <div className="flex items-center text-mocha-400 text-sm mb-2">
                                        <CreditCard className="w-4 h-4 mr-2" /> 수강료 (4주 기준)
                                    </div>
                                    <p className="text-3xl font-black text-gradient-aurora">₩ 250,000</p>
                                    <p className="text-mocha-500 text-xs mt-1">* 교재비 별도</p>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <span className="text-mocha-400 text-sm block mb-2">대상 학년</span>
                                    <p className="text-white font-bold">중등부 1, 2, 3학년</p>
                                    <p className="text-mocha-500 text-xs mt-1">(예비고1 선행은 상담 문의)</p>
                                </div>
                            </div>

                            <button className="btn-primary w-full mt-10 py-5 text-lg shadow-[0_0_30px_rgba(204,255,0,0.3)]">
                                수강 상담 문의
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
