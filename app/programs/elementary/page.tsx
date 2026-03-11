'use client'

import { BookOpen, CheckCircle, Clock, Users, CreditCard, ChevronLeft, Zap, Target, Star } from 'lucide-react'
import Link from 'next/link'

export default function ElementaryProgramPage() {
    const curriculum = [
        { title: '스마트 연산 + 개념 진도', period: '주 5회 또는 주 3회', desc: '수학의 자신감은 정확하고 빠른 연산에서 시작됩니다. 체계적인 연산 훈련으로 실수를 줄이고 속도를 높입니다.' },
        { title: '개념 진도 + 응용 문제', period: '주 5회 또는 주 3회', desc: '기본 개념을 넘어 문제의 핵심을 파악하는 사고력을 기릅니다. 다양한 문제를 통한 논리력 확장.' },
        { title: '중등 수학 입문', period: '선택 과정', desc: '초등 고학년을 대상으로 중등 수학의 핵심 개념을 쉽고 정확하게 전달하여 연계 학습의 기틀을 마련합니다.' },
    ]

    const features = [
        '자기주도 학습 습관 형성을 위한 개념필기 노트 및 오답노트 작성',
        '매주 진도 확인 테스트 및 개별 피드백 리포트 발송',
        '멀티미디어를 활용한 몰입감 있는 수학 개념 수업',
        '개별 맞춤 레벨 교재 및 컨텐츠 제공',
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-neon-pink/10 blur-[150px] -z-10" />
                    <span className="text-neon-pink font-bold tracking-widest uppercase mb-4 block">Elementary School Program</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">초등부 미래 인재 교육 과정</h1>
                    <p className="text-xl text-mocha-300 max-w-3xl leading-relaxed">
                        수학이 즐거워지는 마법, 차수학(Cha Math Academy) 초등부입니다.<br />
                        탄탄한 기초와 사고력의 뼈대를 세우는 가장 중요한 시기를 함께합니다.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Curriculum Details */}
                        <div className="glass p-10 rounded-[32px] border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                                <Star className="mr-3 text-neon-pink" /> 초등부 특화 커리큘럼
                            </h2>
                            <div className="space-y-6">
                                {curriculum.map((c, i) => (
                                    <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                                        <div className="w-12 h-12 rounded-xl bg-mocha-900 flex items-center justify-center shrink-0 group-hover:bg-neon-pink/20 transition-colors">
                                            <span className="text-neon-pink font-bold">0{i + 1}</span>
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
                                <CheckCircle className="mr-3 text-neon-cyan" /> 학습 관리 강점
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {features.map((f, i) => (
                                    <div key={i} className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_10px_rgba(255,0,255,0.8)]" />
                                        <span className="text-mocha-300 text-sm">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Pricing & Schedule */}
                    <div className="space-y-8">
                        {/* Tuition Box */}
                        <div className="glass p-8 rounded-[32px] border border-neon-pink/30 bg-neon-pink/5 relative overflow-hidden group">
                            <h3 className="text-xl font-bold text-white mb-6">수강 및 입학 안내</h3>

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <div className="flex items-center text-mocha-400 text-sm mb-2">
                                        <Clock className="w-4 h-4 mr-2" /> 수업 횟수
                                    </div>
                                    <p className="text-2xl font-bold text-white">주 2~5회 선택형</p>
                                    <p className="text-mocha-500 text-xs mt-1">* 학년 및 레벨별 수업 시간 상이</p>
                                </div>

                                <div>
                                    <div className="flex items-center text-mocha-400 text-sm mb-2">
                                        <Users className="w-4 h-4 mr-2" /> 모집 대상
                                    </div>
                                    <p className="text-2xl font-bold text-white">초등 4 ~ 6학년</p>
                                    <p className="text-mocha-500 text-xs mt-1">* 저학년은 별도 상담 문의 요망</p>
                                </div>

                                <div>
                                    <div className="flex items-center text-mocha-400 text-sm mb-2">
                                        <CreditCard className="w-4 h-4 mr-2" /> 수강료 (4주 기준)
                                    </div>
                                    <p className="text-3xl font-black text-gradient-aurora">₩ 170,000</p>
                                    <p className="text-mocha-500 text-xs mt-1">* 교재비 별도</p>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <span className="text-mocha-400 text-sm block mb-2">교육 위치</span>
                                    <p className="text-white font-bold">차수학 엄궁 캠퍼스 초등</p>
                                </div>
                            </div>

                            <button className="btn-primary w-full mt-10 py-5 text-lg shadow-[0_0_30px_rgba(255,0,255,0.3)] bg-neon-pink border-neon-pink text-white hover:bg-neon-pink/80">
                                초등부 상담 예약
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
