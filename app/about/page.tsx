'use client'

import { Award, Target, Star, Shield, MapPin, Phone, Clock, ExternalLink } from 'lucide-react'

export default function AboutPage() {
    const values = [
        { title: '수학적 뼈대 학습', desc: '공식 암기가 아닌 원리 이해를 통한 논리적 사고의 틀을 구축합니다.', icon: <Award className="w-6 h-6" /> },
        { title: '개별 진도 시스템', desc: '학생 개개인의 레벨에 맞는 교재와 학습의 설계를 통해 맞춤학습을 진행합니다.', icon: <Target className="w-6 h-6" /> },
        { title: '밀착 관리 시스템', desc: '학생 개개인의 오답 패턴을 분석하여 빈틈없는 개별 관리를 진행합니다.', icon: <Star className="w-6 h-6" /> },
        { title: '혁신의 증명', desc: '엄궁 최고의 성적 향상 사례와 입시 결과로 증명합니다.', icon: <Shield className="w-6 h-6" /> },
    ]

    return (
        <div className="min-h-[100dvh] bg-void-950 pt-32 pb-20 px-6 overflow-hidden">
            <div className="container-main">
                {/* Philosophy Hero */}
                <section className="text-center mb-32 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-96 bg-mesh -z-10" />
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                        우리 아이의 <br />
                        <span className="text-accent-600">수학 학원</span>
                    </h1>
                    <p className="text-xl text-void-300 mb-16 max-w-3xl mx-auto font-light leading-relaxed break-keep-all">
                        "단순히 문제를 푸는 기술이 아닌,
                        세상을 논리적으로 바라보는 힘을 가르칩니다."
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {values.map((v, i) => (
                            <div key={i} className="glass p-8 rounded-2xl group hover:border-accent-600/30 transition-all duration-300">
                                <div className="mb-4 flex justify-center text-accent-600 group-hover:scale-110 transition-transform">{v.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-3 break-keep-all">{v.title}</h3>
                                <p className="text-void-400 text-sm leading-relaxed break-keep-all">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Founder Section */}
                <section className="mb-32">
                    <div className="glass rounded-3xl p-12 md:p-16 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-600/5 blur-[100px] -z-10" />
                        <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl bg-gradient-to-br from-accent-600/20 to-accent-600/5 p-1 relative shrink-0 border border-accent-600/10">
                            <div className="w-full h-full rounded-2xl bg-void-900 flex items-center justify-center overflow-hidden">
                                <span className="text-5xl font-black text-void-800">CHA</span>
                                <div className="absolute inset-0 bg-gradient-to-t from-void-900/60 to-transparent" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <span className="section-eyebrow">원장 인사말</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight break-keep-all">
                                "노력의 <span className="text-accent-600">진정성</span>을 믿습니다."
                            </h2>
                            <div className="space-y-5 text-void-300 text-base leading-relaxed font-light break-keep-all">
                                <p>반갑습니다. 차수학 엄궁 캠퍼스 원장입니다. 저는 수많은 학생들을 만나며 한 가지 진리를 깨달았습니다.</p>
                                <p>수학은 머리가 좋은 아이들만 잘하는 과목이 아닙니다. 개념의 뼈대를 어떻게 세우느냐, 그리고 얼마나 진심으로 그 과정을 함께 고민해주는 스승이 있느냐에 따라 아이의 미래는 바뀝니다.</p>
                                <p>우리 차수학은 단순히 점수만을 위한 기술을 가르치지 않습니다. 아이가 스스로 생각하고, 문제를 해결했을 때의 희열을 느끼게 하여 수학을 평생의 강점으로 만들어 드립니다.</p>
                            </div>
                            <div className="mt-10 pt-10 border-t border-void-800">
                                <span className="text-void-500 font-bold tracking-widest uppercase text-xs mb-6 block">경력 사항</span>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-void-400 text-sm break-keep-all">
                                    {[
                                        '한샘학원 수학강사 5년',
                                        '정일학원 수학부장 및 부원장 4년',
                                        '페르마 수학 원장 2년',
                                        '서전학원 수학 부원장 1년',
                                        '고등 이과 전문 강사 19년',
                                        '대입 상담 및 지도 13년',
                                        '수학 전문 학원 10년 운영중'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center space-x-3">
                                            <div className="w-1 h-1 rounded-full bg-accent-600 shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 flex items-center space-x-4">
                                <div className="h-0.5 w-12 bg-accent-600" />
                                <div>
                                    <span className="text-xl font-bold text-white block">차수학 원장</span>
                                    <span className="text-void-500 text-xs font-medium">수학교육 전문 디렉터 / 대입 입시 전문가</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Location & Map Section */}
                <section className="glass rounded-3xl p-12 md:p-16 relative overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-10 break-keep-all">찾아오시는 길</h2>
                            <div className="space-y-8">
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 rounded-xl bg-accent-600/10 flex items-center justify-center shrink-0 border border-accent-600/20">
                                        <MapPin className="text-accent-600 w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg mb-2 break-keep-all">엄궁 캠퍼스</p>
                                        <p className="text-void-300 text-sm leading-relaxed break-keep-all">부산광역시 사상구 엄궁로 186 2층</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 rounded-xl bg-accent-600/10 flex items-center justify-center shrink-0 border border-accent-600/20">
                                        <Phone className="text-accent-600 w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg mb-1">대표 번호</p>
                                        <p className="text-void-300 text-lg font-mono">051-311-0312</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 rounded-xl bg-accent-600/10 flex items-center justify-center shrink-0 border border-accent-600/20">
                                        <Clock className="text-accent-600 w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg mb-1">상담 가능 시간</p>
                                        <p className="text-void-300 text-sm break-keep-all">평일 14:30 - 22:00 / 주말 15:00 - 20:00</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <a
                                    href="https://naver.me/FjCLS5He"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex"
                                >
                                    <span>네이버지도 보기</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <a
                            href="https://naver.me/FjCLS5He"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group cursor-pointer block"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-tr from-accent-600/15 to-void-800/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                            <div className="aspect-[4/3] bg-void-900 rounded-2xl border border-void-700/50 overflow-hidden relative flex items-center justify-center group-hover:border-accent-600/30 transition-all duration-300">
                                <div className="absolute inset-0 opacity-10 pointer-events-none">
                                    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4b5563 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                                </div>

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-[0_0_24px_rgba(220,38,38,0.4)] mb-4 transition-all duration-300">
                                        <MapPin className="text-white w-8 h-8" />
                                    </div>
                                    <span className="text-white font-semibold bg-void-900/80 backdrop-blur px-5 py-2 rounded-lg border border-void-700/50 group-hover:border-accent-600/50 transition-all duration-300 break-keep-all">
                                        엄궁 캠퍼스
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    )
}
