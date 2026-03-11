'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Clipboard, UserCheck, BarChart, ChevronDown, Send } from 'lucide-react'

export default function AdmissionsPage() {
    const [activeStep, setActiveStep] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const steps = [
        { title: '상담 예약', desc: '전화 또는 온라인으로 상담 일정을 예약합니다.', icon: <Clipboard className="w-6 h-6" /> },
        { title: '레벨 테스트', desc: '학생의 현재 실력을 객관적으로 파악하기 위한 테스트를 진행합니다.', icon: <UserCheck className="w-6 h-6" /> },
        { title: '결과 분석', desc: '테스트 결과를 바탕으로 취약점과 강점을 분석하여 상담을 진행합니다.', icon: <BarChart className="w-6 h-6" /> },
        { title: '반 배정 및 등록', desc: '학생에게 가장 적합한 수준의 교재와 학습방향을 정하고 수강 신청을 완료합니다.', icon: <CheckCircle className="w-6 h-6" /> },
    ]

    const faqs = [
        { q: '입학 테스트는 필수인가요?', a: '네, 학생의 정확한 수준 파악과 효율적인 학습방향의 설정을 위해 입학 테스트는 필수적으로 진행됩니다.' },
        { q: '상담 예약은 언제 가능한가요?', a: '평일 오후 2시 30부터 10시까지 상담예약 주시면,일정을 정해 연락드리겠습니다.' },
        { q: '셔틀버스가 운행되나요?', a: '학원 셔틀 버스는 운행하지 않습니다. 학원 앞 버스 정류장이 바로 있어서 등,하원 어렵지 않습니다.' },
    ]

    return (
        <div className="min-h-screen bg-mocha-950 pt-32 pb-20 px-6">
            <div className="container mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-aurora-400/20 blur-[120px] -z-10" />
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">입학 센터</h1>
                    <p className="text-xl text-mocha-300 max-w-2xl mx-auto">
                        차수학(Cha Math Academy)과 함께할 새로운 가족을 기다립니다.<br />
                        엄궁 최고의 입학 프로세스를 통해 최적의 학습 환경을 제안합니다.
                    </p>
                </div>

                {/* Enrollment Process */}
                <section className="mb-32">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">입학 절차</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`glass p-8 rounded-2xl border-t-4 transition-all duration-500 ${activeStep === index ? 'border-t-aurora-400 border-l-white/10' : 'border-t-mocha-800'}`}
                                onMouseEnter={() => setActiveStep(index)}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${activeStep === index ? 'bg-aurora-400 text-mocha-950 shadow-[0_0_20px_rgba(204,255,0,0.5)]' : 'bg-mocha-800 text-mocha-400'}`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">STEP 0{index + 1}. {step.title}</h3>
                                <p className="text-mocha-400 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Registration Form & FAQ */}
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Level Test Registration */}
                    <div className="glass p-10 rounded-3xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <UserCheck className="w-32 h-32 text-aurora-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-8 relative z-10">레벨 테스트 신청</h2>

                        {isSubmitted ? (
                            <div className="text-center py-10 animate-fadeIn relative z-10">
                                <div className="w-20 h-20 bg-aurora-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-aurora-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">신청이 완료되었습니다!</h3>
                                <p className="text-mocha-400 mb-8">기입해주신 연락처로 곧 상담 전화를 드리겠습니다.</p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-aurora-400 font-bold hover:underline"
                                >
                                    추가 신청하기
                                </button>
                            </div>
                        ) : (
                            <form
                                className="space-y-6 relative z-10"
                                onSubmit={async (e) => {
                                    e.preventDefault()
                                    setIsSubmitting(true)
                                    try {
                                        const formData = new FormData(e.currentTarget)
                                        const admissionData = {
                                            name: formData.get('name') as string,
                                            school: formData.get('school') as string,
                                            phone: formData.get('phone') as string,
                                        }

                                        // 1. Save to Firestore (Client Side)
                                        const { addDoc, collection } = await import('firebase/firestore')
                                        const { db } = await import('@/lib/firebase')

                                        await addDoc(collection(db, 'admissions'), {
                                            ...admissionData,
                                            status: 'Pending',
                                            createdAt: new Date().toISOString()
                                        })

                                        // 2. Send Email Notification (Server Side)
                                        await fetch('/api/admissions', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(admissionData),
                                        })

                                        setIsSubmitted(true)
                                    } catch (error) {
                                        console.error('Submission error:', error)
                                        alert('신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
                                    } finally {
                                        setIsSubmitting(false)
                                    }
                                }}
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-mocha-300 text-sm mb-2">학생명</label>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-aurora-400 outline-none transition-colors"
                                            placeholder="성함을 입력하세요"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-mocha-300 text-sm mb-2">학교/학년</label>
                                        <input
                                            name="school"
                                            type="text"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-aurora-400 outline-none transition-colors"
                                            placeholder="예: 엄궁중 2학년"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-mocha-300 text-sm mb-2">연락처</label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-aurora-400 outline-none transition-colors"
                                        placeholder="010-0000-0000"
                                    />
                                </div>
                                <button
                                    disabled={isSubmitting}
                                    className="btn-primary w-full py-4 flex items-center justify-center space-x-2 text-lg disabled:opacity-50"
                                >
                                    <span>{isSubmitting ? '처리 중...' : '신청하기'}</span>
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        )}
                    </div>

                    {/* FAQ */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-8">자주 묻는 질문</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="glass rounded-2xl border border-white/5 overflow-hidden group">
                                    <button className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors">
                                        <span className="text-lg font-semibold text-mocha-50 group-hover:text-aurora-400 transition-colors">Q. {faq.q}</span>
                                        <ChevronDown className="w-5 h-5 text-mocha-500 group-hover:rotate-180 transition-transform" />
                                    </button>
                                    <div className="p-6 pt-0 text-mocha-400 bg-black/20 border-t border-white/5">
                                        {faq.a}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-mocha-900 to-mocha-800 border-l-4 border-l-neon-cyan">
                            <h4 className="text-white font-bold mb-2">전화 상담 안내</h4>
                            <p className="text-mocha-400 text-sm">궁금하신 사항은 051-311-0312로 문의해 주시면 친절히 안내해 드립니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
