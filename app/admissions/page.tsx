'use client'

import { useState, useEffect, useMemo } from 'react'
import {
    CheckCircle, Clipboard, UserCheck, BarChart, ChevronDown, Send,
    Calendar, Clock, Phone, MapPin, Monitor, ChevronLeft, ChevronRight, Loader2
} from 'lucide-react'

type ConsultationType = 'visit' | 'phone' | 'online'

interface AvailableSlot {
    id: string
    date: string
    time: string
    status: 'open' | 'booked'
}

export default function AdmissionsPage() {
    const [activeStep, setActiveStep] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

    // 상담 예약 상태
    const [consultType, setConsultType] = useState<ConsultationType>('visit')
    const [selectedDate, setSelectedDate] = useState<string>('')
    const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null)
    const [currentMonth, setCurrentMonth] = useState(() => {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth(), 1)
    })

    // Firebase에서 가져온 열린 슬롯
    const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])
    const [slotsLoading, setSlotsLoading] = useState(true)

    // 슬롯 로드
    useEffect(() => {
        const fetchSlots = async () => {
            try {
                setSlotsLoading(true)
                const res = await fetch('/api/consultation-slots?mode=public')
                const data = await res.json()
                if (Array.isArray(data)) setAvailableSlots(data)
            } catch (error) {
                console.error('Failed to fetch slots:', error)
            } finally {
                setSlotsLoading(false)
            }
        }
        fetchSlots()
    }, [])

    // 날짜별 슬롯 그룹
    const slotsByDate = useMemo(() => {
        const map: Record<string, AvailableSlot[]> = {}
        for (const s of availableSlots) {
            if (!map[s.date]) map[s.date] = []
            map[s.date].push(s)
        }
        return map
    }, [availableSlots])

    // 슬롯이 있는 날짜 집합
    const datesWithSlots = useMemo(() => new Set(Object.keys(slotsByDate)), [slotsByDate])

    // 선택된 날짜의 시간 슬롯
    const timeSlotsForDate = useMemo(() => {
        return (slotsByDate[selectedDate] || []).sort((a, b) => a.time.localeCompare(b.time))
    }, [slotsByDate, selectedDate])

    const steps = [
        { title: '상담 예약', desc: '전화 또는 온라인으로 상담 일정을 예약합니다.', icon: <Clipboard className="w-5 h-5" /> },
        { title: '레벨 테스트', desc: '학생의 현재 실력을 객관적으로 파악하기 위한 테스트를 진행합니다.', icon: <UserCheck className="w-5 h-5" /> },
        { title: '결과 분석', desc: '테스트 결과를 바탕으로 취약점과 강점을 분석하여 상담을 진행합니다.', icon: <BarChart className="w-5 h-5" /> },
        { title: '반 배정 및 등록', desc: '학생에게 가장 적합한 수준의 교재와 학습방향을 정하고 수강 신청을 완료합니다.', icon: <CheckCircle className="w-5 h-5" /> },
    ]

    const consultTypes = [
        { id: 'visit' as ConsultationType, label: '방문 상담', desc: '학원에 직접 방문하여 상담', icon: <MapPin className="w-5 h-5" /> },
        { id: 'phone' as ConsultationType, label: '전화 상담', desc: '전화로 간편하게 상담', icon: <Phone className="w-5 h-5" /> },
        { id: 'online' as ConsultationType, label: '온라인 상담', desc: '화상 또는 채팅으로 상담', icon: <Monitor className="w-5 h-5" /> },
    ]

    const faqs = [
        { q: '입학 테스트는 필수인가요?', a: '네, 학생의 정확한 수준 파악과 효율적인 학습방향의 설정을 위해 입학 테스트는 필수적으로 진행됩니다.' },
        { q: '상담 예약은 언제 가능한가요?', a: '평일 오후 2시 30분부터 10시까지 상담예약 주시면 일정을 정해 연락드리겠습니다.' },
        { q: '셔틀버스가 운행되나요?', a: '학원 셔틀 버스는 운행하지 않습니다. 학원 앞 버스 정류장이 바로 있어서 등하원이 어렵지 않습니다.' },
    ]

    // 달력 생성
    const calendarDays = useMemo(() => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()
        const firstDay = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const days: { date: number; dateStr: string; isToday: boolean; isPast: boolean; isSunday: boolean; hasSlots: boolean }[] = []

        for (let i = 0; i < firstDay; i++) {
            days.push({ date: 0, dateStr: '', isToday: false, isPast: true, isSunday: false, hasSlots: false })
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(year, month, d)
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
            days.push({
                date: d,
                dateStr,
                isToday: dateObj.getTime() === today.getTime(),
                isPast: dateObj < today,
                isSunday: dateObj.getDay() === 0,
                hasSlots: datesWithSlots.has(dateStr),
            })
        }

        return days
    }, [currentMonth, datesWithSlots])

    const monthLabel = `${currentMonth.getFullYear()}년 ${currentMonth.getMonth() + 1}월`

    const formatTimeLabel = (time: string) => {
        const [h, m] = time.split(':').map(Number)
        const period = h < 12 ? '오전' : '오후'
        const displayH = h > 12 ? h - 12 : h
        return `${period} ${displayH}:${String(m).padStart(2, '0')}`
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!selectedSlot) {
            alert('상담 날짜와 시간을 선택해 주세요.')
            return
        }

        setIsSubmitting(true)
        try {
            const formData = new FormData(e.currentTarget)
            const admissionData = {
                name: formData.get('name') as string,
                school: formData.get('school') as string,
                phone: formData.get('phone') as string,
                consultType,
                consultDate: selectedSlot.date,
                consultTime: selectedSlot.time,
                slotId: selectedSlot.id,
                message: formData.get('message') as string || '',
            }

            // Firebase에 상담 신청 저장
            const { addDoc, collection } = await import('firebase/firestore')
            const { db } = await import('@/lib/firebase')

            await addDoc(collection(db, 'admissions'), {
                ...admissionData,
                status: 'pending',
                createdAt: new Date().toISOString()
            })

            // 슬롯을 booked로 변경
            await fetch('/api/consultation-slots', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slotId: selectedSlot.id,
                    status: 'booked',
                    bookedBy: {
                        name: admissionData.name,
                        phone: admissionData.phone,
                    },
                }),
            })

            // 이메일 알림
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
    }

    const consultTypeLabel = consultTypes.find(c => c.id === consultType)?.label || ''

    return (
        <div className="min-h-[100dvh] bg-void-950 pt-32 pb-20 px-6">
            <div className="container-main">
                {/* Hero Section */}
                <div className="text-center mb-24 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-mesh opacity-30 -z-10" />
                    <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass text-xs font-semibold tracking-widest text-accent-600 uppercase">
                        <span className="w-2 h-2 bg-accent-600 rounded-full" />
                        Admission Center
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 break-keep-all">입학 센터</h1>
                    <p className="text-lg text-void-300 max-w-3xl mx-auto break-keep-all">
                        차수학과 함께할 새로운 가족을 기다립니다.
                        엄궁 최고의 입학 프로세스를 통해 최적의 학습 환경을 제안합니다.
                    </p>
                </div>

                {/* Enrollment Process */}
                <section className="mb-32">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center break-keep-all">입학 절차</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`glass p-8 rounded-2xl border-l-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${activeStep === index ? 'border-l-accent-600 bg-accent-600/5' : 'border-l-void-700 hover:border-l-accent-600/50'}`}
                                onMouseEnter={() => setActiveStep(index)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 relative z-10 ${activeStep === index ? 'bg-accent-600 text-white' : 'bg-accent-600/10 text-accent-600 border border-accent-600/20'}`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-base font-bold text-white mb-2 relative z-10 break-keep-all">STEP {String(index + 1).padStart(2, '0')}. {step.title}</h3>
                                <p className="text-void-400 text-xs leading-relaxed relative z-10 break-keep-all">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ============ 상담 예약 시스템 ============ */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4 break-keep-all">상담 예약</h2>
                        <p className="text-void-400 break-keep-all">원하시는 상담 유형과 일정을 선택하세요</p>
                    </div>

                    {isSubmitted ? (
                        <div className="max-w-2xl mx-auto glass p-16 rounded-3xl text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-600/5 to-transparent" />
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-accent-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-accent-600/30">
                                    <CheckCircle className="w-10 h-10 text-accent-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 break-keep-all">상담 예약이 완료되었습니다!</h3>
                                <div className="glass rounded-2xl p-6 mb-8 text-left max-w-sm mx-auto">
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-void-400">상담 유형</span>
                                            <span className="text-white font-medium">{consultTypeLabel}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-void-400">예약 날짜</span>
                                            <span className="text-white font-medium">{selectedSlot?.date}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-void-400">예약 시간</span>
                                            <span className="text-white font-medium">{selectedSlot ? formatTimeLabel(selectedSlot.time) : ''}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-void-400 text-sm mb-8 break-keep-all">
                                    기입해주신 연락처로 확인 전화를 드리겠습니다.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsSubmitted(false)
                                        setSelectedDate('')
                                        setSelectedSlot(null)
                                    }}
                                    className="text-accent-600 font-semibold hover:text-accent-500 transition-colors text-sm"
                                >
                                    추가 예약하기
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* 왼쪽: 상담유형 + 학생 정보 */}
                                <div className="space-y-8">
                                    {/* 상담 유형 선택 */}
                                    <div className="glass p-8 rounded-3xl">
                                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                            <span className="w-7 h-7 rounded-lg bg-accent-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                                            상담 유형
                                        </h3>
                                        <div className="space-y-3">
                                            {consultTypes.map(type => (
                                                <button
                                                    key={type.id}
                                                    type="button"
                                                    onClick={() => setConsultType(type.id)}
                                                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left ${
                                                        consultType === type.id
                                                            ? 'border-accent-600 bg-accent-600/10 text-white'
                                                            : 'border-void-700/50 hover:border-void-600 text-void-300'
                                                    }`}
                                                >
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                                        consultType === type.id ? 'bg-accent-600 text-white' : 'bg-void-800 text-void-400'
                                                    }`}>{type.icon}</div>
                                                    <div>
                                                        <p className="font-semibold text-sm">{type.label}</p>
                                                        <p className="text-xs text-void-400">{type.desc}</p>
                                                    </div>
                                                    {consultType === type.id && <CheckCircle className="w-5 h-5 text-accent-600 ml-auto shrink-0" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 학생 정보 */}
                                    <div className="glass p-8 rounded-3xl">
                                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                            <span className="w-7 h-7 rounded-lg bg-accent-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                                            학생 정보
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-void-300 text-xs font-medium mb-2 uppercase tracking-widest">학생명 *</label>
                                                <input name="name" type="text" required className="w-full bg-white/5 border border-void-700/50 rounded-lg px-4 py-3 text-white text-sm focus:border-accent-600 focus:bg-white/8 outline-none transition-all placeholder-void-500" placeholder="학생 이름" />
                                            </div>
                                            <div>
                                                <label className="block text-void-300 text-xs font-medium mb-2 uppercase tracking-widest">학교 / 학년 *</label>
                                                <input name="school" type="text" required className="w-full bg-white/5 border border-void-700/50 rounded-lg px-4 py-3 text-white text-sm focus:border-accent-600 focus:bg-white/8 outline-none transition-all placeholder-void-500" placeholder="예: 엄궁중 2학년" />
                                            </div>
                                            <div>
                                                <label className="block text-void-300 text-xs font-medium mb-2 uppercase tracking-widest">연락처 *</label>
                                                <input name="phone" type="tel" required className="w-full bg-white/5 border border-void-700/50 rounded-lg px-4 py-3 text-white text-sm focus:border-accent-600 focus:bg-white/8 outline-none transition-all placeholder-void-500" placeholder="010-0000-0000" />
                                            </div>
                                            <div>
                                                <label className="block text-void-300 text-xs font-medium mb-2 uppercase tracking-widest">문의 사항</label>
                                                <textarea name="message" rows={3} className="w-full bg-white/5 border border-void-700/50 rounded-lg px-4 py-3 text-white text-sm focus:border-accent-600 focus:bg-white/8 outline-none transition-all resize-none placeholder-void-500" placeholder="궁금하신 점이 있으시면 자유롭게 적어주세요" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 가운데: 달력 */}
                                <div className="glass p-8 rounded-3xl">
                                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                        <span className="w-7 h-7 rounded-lg bg-accent-600 text-white flex items-center justify-center text-xs font-bold">3</span>
                                        <Calendar className="w-5 h-5 text-accent-600" />
                                        상담 날짜
                                    </h3>

                                    {slotsLoading ? (
                                        <div className="flex flex-col items-center justify-center py-20">
                                            <Loader2 className="w-8 h-8 text-accent-600 animate-spin mb-3" />
                                            <p className="text-void-500 text-sm">일정을 불러오는 중...</p>
                                        </div>
                                    ) : availableSlots.length === 0 ? (
                                        <div className="text-center py-16">
                                            <Calendar className="w-12 h-12 text-void-600 mx-auto mb-4" />
                                            <p className="text-void-400 text-sm break-keep-all">현재 예약 가능한 상담 일정이 없습니다.</p>
                                            <p className="text-void-500 text-xs mt-2 break-keep-all">전화로 문의해 주세요: 051-311-0312</p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* 월 네비게이션 */}
                                            <div className="flex items-center justify-between mb-6">
                                                <button type="button" onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))} className="w-8 h-8 rounded-lg bg-void-800 hover:bg-void-700 flex items-center justify-center text-void-300 transition-colors">
                                                    <ChevronLeft className="w-4 h-4" />
                                                </button>
                                                <span className="text-white font-bold text-sm">{monthLabel}</span>
                                                <button type="button" onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} className="w-8 h-8 rounded-lg bg-void-800 hover:bg-void-700 flex items-center justify-center text-void-300 transition-colors">
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* 요일 헤더 */}
                                            <div className="grid grid-cols-7 gap-1 mb-2">
                                                {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
                                                    <div key={day} className={`text-center text-xs font-semibold py-2 ${i === 0 ? 'text-red-400' : 'text-void-400'}`}>{day}</div>
                                                ))}
                                            </div>

                                            {/* 날짜 그리드 */}
                                            <div className="grid grid-cols-7 gap-1">
                                                {calendarDays.map((day, i) => {
                                                    if (day.date === 0) return <div key={`e-${i}`} className="aspect-square" />

                                                    const isDisabled = day.isPast || !day.hasSlots
                                                    const isSelected = day.dateStr === selectedDate

                                                    return (
                                                        <button
                                                            key={day.dateStr}
                                                            type="button"
                                                            disabled={isDisabled}
                                                            onClick={() => {
                                                                setSelectedDate(day.dateStr)
                                                                setSelectedSlot(null)
                                                            }}
                                                            className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all duration-200 relative ${
                                                                isSelected
                                                                    ? 'bg-accent-600 text-white shadow-lg shadow-accent-600/30'
                                                                    : isDisabled
                                                                        ? 'text-void-700 cursor-not-allowed'
                                                                        : day.isToday
                                                                            ? 'bg-accent-600/15 text-accent-600 border border-accent-600/30'
                                                                            : 'text-void-200 hover:bg-void-800'
                                                            }`}
                                                        >
                                                            <span>{day.date}</span>
                                                            {day.hasSlots && !isSelected && (
                                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-0.5" />
                                                            )}
                                                        </button>
                                                    )
                                                })}
                                            </div>

                                            <p className="text-void-500 text-xs mt-4 text-center break-keep-all">
                                                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1 align-middle" />
                                                초록 점이 있는 날짜만 예약 가능합니다
                                            </p>
                                        </>
                                    )}
                                </div>

                                {/* 오른쪽: 시간 선택 + 제출 */}
                                <div className="space-y-8">
                                    <div className="glass p-8 rounded-3xl">
                                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                            <span className="w-7 h-7 rounded-lg bg-accent-600 text-white flex items-center justify-center text-xs font-bold">4</span>
                                            <Clock className="w-5 h-5 text-accent-600" />
                                            상담 시간
                                        </h3>

                                        {!selectedDate ? (
                                            <div className="text-center py-12">
                                                <Calendar className="w-10 h-10 text-void-600 mx-auto mb-3" />
                                                <p className="text-void-500 text-sm break-keep-all">먼저 날짜를 선택해 주세요</p>
                                            </div>
                                        ) : timeSlotsForDate.length === 0 ? (
                                            <div className="text-center py-12">
                                                <Clock className="w-10 h-10 text-void-600 mx-auto mb-3" />
                                                <p className="text-void-500 text-sm break-keep-all">선택한 날짜에 가능한 시간이 없습니다</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                {timeSlotsForDate.map(slot => (
                                                    <button
                                                        key={slot.id}
                                                        type="button"
                                                        onClick={() => setSelectedSlot(slot)}
                                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                                            selectedSlot?.id === slot.id
                                                                ? 'border-accent-600 bg-accent-600/15 text-white'
                                                                : 'border-void-700/50 text-void-300 hover:border-void-600 hover:bg-void-800/50'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{formatTimeLabel(slot.time)}</span>
                                                        </div>
                                                        {selectedSlot?.id === slot.id && (
                                                            <CheckCircle className="w-4 h-4 text-accent-600" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* 예약 요약 + 제출 */}
                                    <div className="glass p-8 rounded-3xl border border-accent-600/20 bg-gradient-to-br from-accent-600/5 to-transparent">
                                        <h3 className="text-lg font-bold text-white mb-4 break-keep-all">예약 확인</h3>
                                        <div className="space-y-3 mb-6 text-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="text-void-400">상담 유형</span>
                                                <span className="text-white font-medium">{consultTypeLabel}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-void-400">날짜</span>
                                                <span className={selectedSlot ? 'text-white font-medium' : 'text-void-600'}>
                                                    {selectedSlot?.date || '미선택'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-void-400">시간</span>
                                                <span className={selectedSlot ? 'text-white font-medium' : 'text-void-600'}>
                                                    {selectedSlot ? formatTimeLabel(selectedSlot.time) : '미선택'}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !selectedSlot}
                                            className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>예약 처리 중...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    <span>상담 예약하기</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </section>

                {/* ============ FAQ ============ */}
                <section>
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-8 break-keep-all">자주 묻는 질문</h2>
                            <div className="space-y-3">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="glass rounded-2xl border border-void-700/30 overflow-hidden group">
                                        <button
                                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                            className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                                        >
                                            <span className="text-base font-semibold text-void-100 group-hover:text-accent-600 transition-colors break-keep-all pr-4">Q. {faq.q}</span>
                                            <ChevronDown className={`w-4 h-4 text-void-500 shrink-0 transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-40' : 'max-h-0'}`}>
                                            <div className="px-5 pb-5 text-void-400 text-sm bg-accent-600/5 border-t border-void-700/20 break-keep-all pt-4">{faq.a}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="glass p-8 rounded-3xl border border-accent-600/20 bg-gradient-to-br from-accent-600/8 to-transparent relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-600/10 rounded-full blur-3xl pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-accent-600/20 rounded-xl flex items-center justify-center mb-4">
                                        <Phone className="w-6 h-6 text-accent-600" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-3 break-keep-all">전화 상담 안내</h4>
                                    <p className="text-void-400 text-sm mb-6 break-keep-all">온라인 예약이 어려우시면 전화로 편하게 문의해 주세요.</p>
                                    <a href="tel:051-311-0312" className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-accent-600/15 border border-accent-600/30 text-accent-600 font-bold text-lg hover:bg-accent-600/25 transition-colors">
                                        <Phone className="w-5 h-5" />
                                        051-311-0312
                                    </a>
                                    <p className="text-void-500 text-xs mt-4">상담 시간: 평일 14:30 ~ 22:00</p>
                                </div>
                            </div>

                            <div className="glass p-8 rounded-3xl">
                                <div className="w-12 h-12 bg-accent-600/20 rounded-xl flex items-center justify-center mb-4">
                                    <MapPin className="w-6 h-6 text-accent-600" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3 break-keep-all">오시는 길</h4>
                                <p className="text-void-400 text-sm break-keep-all">부산 사상구 엄궁로 186</p>
                                <p className="text-void-500 text-xs mt-2 break-keep-all">학원 앞 버스 정류장에서 하차</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
