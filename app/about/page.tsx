'use client'

import { Star, Shield, Award, Target, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

export default function AboutPage() {
    const values = [
        { title: '수학적 뼈대 학습', desc: '공식 암기가 아닌 원리 이해를 통한 논리적 사고의 틀을 구축합니다.', icon: <Award className="w-8 h-8 text-aurora-400" /> },
        { title: '개별 진도 시스템', desc: '학생 개개인의 레벨에 맞는 교재와 학습의 설계를 통해 맞춤학습을 진행합니다.', icon: <Target className="w-8 h-8 text-neon-cyan" /> },
        { title: '밀착 관리 시스템', desc: '학생 개개인의 오답 패턴을 분석하여 빈틈없는 개별 관리를 진행합니다.', icon: <Star className="w-8 h-8 text-neon-pink" /> },
        { title: '혁신의 증명', desc: '엄궁 최고의 성적 향상 사례와 입시 결과로 증명합니다.', icon: <Shield className="w-8 h-8 text-aurora-400" /> },
    ]

    return (
        <div className="min-h-screen bg-mocha-950 pt-32 pb-20 px-6 overflow-hidden">
            <div className="container mx-auto">
                {/* Philosophy Hero */}
                <section className="text-center mb-32 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full bg-gradient-to-b from-aurora-400/5 to-transparent -z-10" />
                    <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
                        우리 아이의 <span className="text-gradient-aurora">수학 학원</span>
                    </h1>
                    <p className="text-2xl text-mocha-200 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
                        "단순히 문제를 푸는 기술이 아닌,<br />
                        세상을 논리적으로 바라보는 힘을 가르칩니다."
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {values.map((v, i) => (
                            <div key={i} className="glass p-10 rounded-3xl border border-white/10 hover:border-aurora-400/30 transition-all duration-300 group">
                                <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform">{v.icon}</div>
                                <h3 className="text-2xl font-bold text-white mb-3">{v.title}</h3>
                                <p className="text-mocha-400 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Founder Section - Kim Hyun-jung */}
                <section className="mb-32">
                    <div className="glass rounded-[40px] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-16 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-aurora-400/5 blur-[100px] -z-10" />
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-aurora p-1 relative shadow-[0_0_50px_rgba(204,255,0,0.2)] shrink-0">
                            <div className="w-full h-full rounded-full bg-mocha-950 flex items-center justify-center overflow-hidden">
                                {/* Placeholder for real photo */}
                                <span className="text-6xl font-black text-white/10 select-none">CHA</span>
                                <div className="absolute inset-0 bg-gradient-to-t from-mocha-950/80 to-transparent" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <span className="text-aurora-400 font-bold tracking-widest uppercase mb-4 block">Director Message</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                "노력의 <span className="text-neon-cyan">진정성</span>을 믿습니다."
                            </h2>
                            <div className="space-y-6 text-mocha-300 text-lg leading-relaxed font-light">
                                <p>반갑습니다. 차수학 엄궁 캠퍼스 원장입니다. 저는 수많은 학생들을 만나며 한 가지 진리를 깨달았습니다.</p>
                                <p>수학은 머리가 좋은 아이들만 잘하는 과목이 아닙니다. 개념의 뼈대를 어떻게 세우느냐, 그리고 얼마나 진심으로 그 과정을 함께 고민해주는 스승이 있느냐에 따라 아이의 미래는 바뀝니다.</p>
                                <p>우리 차수학은 단순히 점수만을 위한 기술을 가르치지 않습니다. 아이가 스스로 생각하고, 문제를 해결했을 때의 희열을 느끼게 하여 수학을 평생의 강점으로 만들어 드립니다.</p>
                            </div>
                            <div className="mt-10 pt-10 border-t border-white/5">
                                <span className="text-mocha-500 font-bold tracking-widest uppercase text-xs mb-6 block">Career Profile</span>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-mocha-400 text-sm">
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
                                            <div className="w-1 h-1 rounded-full bg-aurora-400" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 flex items-center space-x-6">
                                <div className="h-0.5 w-16 bg-aurora-400" />
                                <div>
                                    <span className="text-2xl font-black text-white block">원장 임세현</span>
                                    <span className="text-mocha-500 text-sm font-medium">수학교육 전문 디렉터 / 대입 입시 전문가</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Location & Map Section */}
                <section className="glass rounded-[40px] p-12 md:p-16 border border-white/10 overflow-hidden relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-10">찾아오시는 길</h2>
                            <div className="space-y-8">
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 rounded-2xl bg-aurora-400/10 flex items-center justify-center shrink-0">
                                        <MapPin className="text-aurora-400 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-xl mb-2">엄궁 캠퍼스</p>
                                        <p className="text-mocha-300 leading-relaxed">부산광역시 사상구 엄궁로 186 <br /> 2층 </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 rounded-2xl bg-neon-cyan/10 flex items-center justify-center shrink-0">
                                        <Phone className="text-neon-cyan w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-xl mb-1">대표 번호</p>
                                        <p className="text-mocha-300 text-2xl font-mono">051-311-0312</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 rounded-2xl bg-mocha-800 flex items-center justify-center shrink-0">
                                        <Clock className="text-mocha-400 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-xl mb-1">상담 가능 시간</p>
                                        <p className="text-mocha-300">평일 14:30 - 22:00 / 주말 15:00 - 20:00</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex flex-wrap gap-4">
                                <a
                                    href="https://naver.me/FjCLS5He"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary px-8 py-4 flex items-center space-x-2"
                                >
                                    <span>네이버지도 보기</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Enhanced Map Placeholder */}
                        <a
                            href="https://naver.me/FjCLS5He"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group cursor-pointer block"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-tr from-aurora-400/20 to-neon-cyan/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                            <div className="aspect-[4/3] bg-mocha-900 rounded-[32px] border border-white/10 overflow-hidden relative flex items-center justify-center group-hover:border-aurora-400/30 transition-all duration-500">
                                {/* Visual representation of a futuristic map */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3b3b3b 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                                </div>

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-20 h-20 bg-aurora-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(204,255,0,0.5)] group-hover:shadow-[0_0_50px_rgba(204,255,0,0.8)] animate-pulse mb-6 transition-all duration-500">
                                        <MapPin className="text-mocha-950 w-10 h-10" />
                                    </div>
                                    <span className="text-white font-bold bg-mocha-950/80 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 group-hover:border-aurora-400/50 transition-all duration-500">
                                        엄궁 캠퍼스
                                    </span>
                                    <span className="mt-4 text-xs text-mocha-500 font-bold tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-700 uppercase">
                                        Click to Open Naver Maps
                                    </span>
                                </div>

                                {/* HUD elements for tech look */}
                                <div className="absolute top-8 left-8 font-mono text-[10px] text-mocha-500 space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-aurora-400 animate-ping" />
                                        <span>LAT: 35.1226 N</span>
                                    </div>
                                    <div className="pl-3.5">LNG: 128.9719 E</div>
                                </div>
                                <div className="absolute bottom-8 right-8 font-mono text-[10px] text-aurora-400/30 group-hover:text-aurora-400 transition-colors">
                                    SECURE ACCESS GRANTED
                                </div>
                            </div>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    )
}
