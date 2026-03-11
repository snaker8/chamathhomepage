'use client'

import { BookOpen, Calendar, Award, LineChart, Target, PenTool } from 'lucide-react'

export default function Features() {
    const features = [
        {
            id: 1,
            title: '뼈대 학습법',
            desc: '철저한 개념 위주 학습',
            detail: '백지테스트, 목차테스트, 모개념테스트로 이어지는 완벽한 개념 체화 시스템',
            icon: <BookOpen className="w-8 h-8 text-neon-cyan" />,
            colSpan: 'md:col-span-2',
            bg: 'bg-gradient-to-br from-mocha-900/50 to-mocha-800/30'
        },
        {
            id: 2,
            title: '주말 테스트',
            desc: '매주 1회 누적 테스트',
            detail: '결과 부족 시 의무 보강 진행 (PASS제)',
            icon: <Calendar className="w-8 h-8 text-aurora-400" />,
            colSpan: 'md:col-span-1',
            bg: 'bg-mocha-900/40'
        },
        {
            id: 3,
            title: '진도 계획표',
            desc: '체계적인 판서식 수업',
            detail: '매일 정해진 범위의 진도와 과제를 빈틈없이 관리',
            icon: <Target className="w-8 h-8 text-neon-pink" />,
            colSpan: 'md:col-span-1',
            bg: 'bg-mocha-900/40'
        },
        {
            id: 4,
            title: '내신 완벽 대비',
            desc: '지역별 기출 3~5개년 분석',
            detail: '엄궁 지역 학교별/유형별 기출 문제 완벽 분석 및 적중 예상 문제 제공',
            icon: <LineChart className="w-8 h-8 text-aurora-400" />,
            colSpan: 'md:col-span-2',
            bg: 'bg-gradient-to-br from-mocha-800/30 to-aurora-400/5'
        },
        {
            id: 5,
            title: '동기부여 시스템',
            desc: '장학금 및 상점 시상',
            detail: '서울대상, 상점 우수상, 기프티콘 지급으로 학습 의욕 고취',
            icon: <Award className="w-8 h-8 text-neon-cyan" />,
            colSpan: 'md:col-span-3',
            bg: 'bg-gradient-to-r from-mocha-900/50 via-neon-cyan/5 to-mocha-900/50'
        }
    ]

    return (
        <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className={`premium-glass rounded-[32px] p-10 hover:translate-y-[-8px] transition-all duration-500 border border-white/5 hover:border-aurora-400/30 group ${feature.colSpan} relative overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-aurora-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10">
                            <div className="mb-8 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-aurora-400/20 transition-all duration-500">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-wider">
                                {feature.title}
                            </h3>
                            <p className="text-aurora-400 font-bold mb-4 text-sm tracking-widest uppercase">
                                {feature.desc}
                            </p>
                            <p className="text-mocha-400 text-sm leading-relaxed font-light">
                                {feature.detail}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
