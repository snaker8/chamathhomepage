'use client'

import { BookOpen, Calendar, Target, LineChart, Award } from 'lucide-react'

export default function Features() {
    const features = [
        {
            id: 1,
            title: '뼈대 학습법',
            desc: '철저한 개념 위주 학습',
            detail: '백지테스트, 목차테스트, 모개념테스트로 이어지는 완벽한 개념 체화 시스템',
            icon: BookOpen,
            colSpan: 'md:col-span-2',
        },
        {
            id: 2,
            title: '주말 테스트',
            desc: '매주 1회 누적 테스트',
            detail: '결과 부족 시 의무 보강 진행 (PASS제)',
            icon: Calendar,
            colSpan: 'md:col-span-1',
        },
        {
            id: 3,
            title: '진도 계획표',
            desc: '체계적인 판서식 수업',
            detail: '매일 정해진 범위의 진도와 과제를 빈틈없이 관리',
            icon: Target,
            colSpan: 'md:col-span-1',
        },
        {
            id: 4,
            title: '내신 완벽 대비',
            desc: '지역별 기출 3~5개년 분석',
            detail: '엄궁 지역 학교별/유형별 기출 문제 완벽 분석 및 적중 예상 문제 제공',
            icon: LineChart,
            colSpan: 'md:col-span-2',
        },
        {
            id: 5,
            title: '동기부여 시스템',
            desc: '장학금 및 상점 시상',
            detail: '서울대상, 상점 우수상, 기프티콘 지급으로 학습 의욕 고취',
            icon: Award,
            colSpan: 'md:col-span-3',
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => {
                const Icon = feature.icon
                return (
                    <div
                        key={feature.id}
                        className={`card p-8 lg:p-10 group hover:border-accent-600/50 transition-all duration-500 ${feature.colSpan} relative overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <div className="mb-6 w-12 h-12 rounded-lg bg-accent-600/10 flex items-center justify-center group-hover:bg-accent-600/20 transition-all duration-500">
                                <Icon className="w-6 h-6 text-accent-600" />
                            </div>

                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 tracking-tight break-keep-all">
                                {feature.title}
                            </h3>

                            <p className="text-accent-600 font-semibold mb-4 text-xs tracking-widest uppercase">
                                {feature.desc}
                            </p>

                            <p className="text-void-400 text-sm leading-relaxed break-keep-all">
                                {feature.detail}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
