'use client'

import { useState, useEffect, useMemo } from 'react'
import {
    ArrowLeft, Calendar, Clock, Plus, Trash2, Loader2,
    ChevronLeft, ChevronRight, CheckCircle, AlertCircle
} from 'lucide-react'
import Link from 'next/link'

interface Slot {
    id: string
    date: string
    time: string
    status: 'open' | 'booked'
    bookedBy?: { name: string; phone: string } | null
}

const ALL_TIMES = [
    { time: '14:30', label: '오후 2:30' },
    { time: '15:00', label: '오후 3:00' },
    { time: '15:30', label: '오후 3:30' },
    { time: '16:00', label: '오후 4:00' },
    { time: '16:30', label: '오후 4:30' },
    { time: '17:00', label: '오후 5:00' },
    { time: '17:30', label: '오후 5:30' },
    { time: '18:00', label: '오후 6:00' },
    { time: '18:30', label: '오후 6:30' },
    { time: '19:00', label: '오후 7:00' },
    { time: '19:30', label: '오후 7:30' },
    { time: '20:00', label: '오후 8:00' },
    { time: '20:30', label: '오후 8:30' },
    { time: '21:00', label: '오후 9:00' },
]

export default function AdminSlotsPage() {
    const [slots, setSlots] = useState<Slot[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // 날짜 선택용 달력
    const [currentMonth, setCurrentMonth] = useState(() => {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth(), 1)
    })
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set())
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    // 슬롯 로드
    const fetchSlots = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/consultation-slots?mode=admin')
            const data = await res.json()
            if (Array.isArray(data)) setSlots(data)
        } catch (error) {
            console.error('Failed to fetch slots:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchSlots() }, [])

    // 선택한 날짜의 기존 슬롯
    const slotsForSelectedDate = useMemo(() => {
        return slots.filter(s => s.date === selectedDate)
    }, [slots, selectedDate])

    const existingTimesForDate = useMemo(() => {
        return new Set(slotsForSelectedDate.map(s => s.time))
    }, [slotsForSelectedDate])

    // 날짜별 슬롯 카운트 (달력에 표시용)
    const slotCountByDate = useMemo(() => {
        const map: Record<string, { open: number; booked: number }> = {}
        for (const s of slots) {
            if (!map[s.date]) map[s.date] = { open: 0, booked: 0 }
            if (s.status === 'open') map[s.date].open++
            else map[s.date].booked++
        }
        return map
    }, [slots])

    // 달력 생성
    const calendarDays = useMemo(() => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()
        const firstDay = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const days: { date: number; dateStr: string; isToday: boolean; isPast: boolean; isSunday: boolean }[] = []

        for (let i = 0; i < firstDay; i++) {
            days.push({ date: 0, dateStr: '', isToday: false, isPast: true, isSunday: false })
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
            })
        }
        return days
    }, [currentMonth])

    const monthLabel = `${currentMonth.getFullYear()}년 ${currentMonth.getMonth() + 1}월`

    // 시간 토글
    const toggleTime = (time: string) => {
        // 이미 등록된 슬롯이면 토글하지 않음
        if (existingTimesForDate.has(time)) return

        setSelectedTimes(prev => {
            const next = new Set(prev)
            if (next.has(time)) next.delete(time)
            else next.add(time)
            return next
        })
    }

    // 전체 선택/해제
    const selectAllAvailable = () => {
        const available = ALL_TIMES.filter(t => !existingTimesForDate.has(t.time)).map(t => t.time)
        if (selectedTimes.size === available.length) {
            setSelectedTimes(new Set())
        } else {
            setSelectedTimes(new Set(available))
        }
    }

    // 슬롯 저장
    const handleSaveSlots = async () => {
        if (!selectedDate || selectedTimes.size === 0) return

        setSaving(true)
        setMessage(null)
        try {
            const res = await fetch('/api/consultation-slots', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: selectedDate,
                    times: Array.from(selectedTimes).sort(),
                }),
            })
            const data = await res.json()
            if (data.success) {
                setMessage({ type: 'success', text: `${data.added}개 슬롯이 추가되었습니다.${data.skipped > 0 ? ` (${data.skipped}개 중복 스킵)` : ''}` })
                setSelectedTimes(new Set())
                fetchSlots()
            } else {
                setMessage({ type: 'error', text: data.error || '추가 실패' })
            }
        } catch {
            setMessage({ type: 'error', text: '서버 오류가 발생했습니다.' })
        } finally {
            setSaving(false)
        }
    }

    // 슬롯 삭제
    const handleDeleteSlot = async (slotId: string) => {
        if (!confirm('이 슬롯을 삭제하시겠습니까?')) return

        try {
            const res = await fetch('/api/consultation-slots', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slotId }),
            })
            const data = await res.json()
            if (data.success) {
                setSlots(prev => prev.filter(s => s.id !== slotId))
            }
        } catch {
            alert('삭제에 실패했습니다.')
        }
    }

    // 날짜 선택 시 기존 선택 초기화
    const handleDateSelect = (dateStr: string) => {
        setSelectedDate(dateStr)
        setSelectedTimes(new Set())
        setMessage(null)
    }

    return (
        <div className="min-h-screen bg-void-950 pt-32 pb-20 px-6">
            <div className="container-main">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <Link href="/admin/admissions" className="flex items-center text-void-500 hover:text-accent-600 transition-colors group text-sm">
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                예약 관리
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold text-white">상담 일정 관리</h1>
                        <p className="text-void-400 text-sm mt-2">상담 가능한 날짜와 시간을 설정합니다. 학부모는 열린 슬롯만 예약할 수 있습니다.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-400" />
                            <span className="text-void-300 text-xs">열림 {slots.filter(s => s.status === 'open').length}</span>
                        </div>
                        <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-accent-600" />
                            <span className="text-void-300 text-xs">예약됨 {slots.filter(s => s.status === 'booked').length}</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* 왼쪽: 달력 */}
                    <div className="glass p-8 rounded-3xl">
                        <div className="flex items-center justify-between mb-6">
                            <button onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))} className="w-9 h-9 rounded-lg bg-void-800 hover:bg-void-700 flex items-center justify-center text-void-300 transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-white font-bold">{monthLabel}</span>
                            <button onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} className="w-9 h-9 rounded-lg bg-void-800 hover:bg-void-700 flex items-center justify-center text-void-300 transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
                                <div key={day} className={`text-center text-xs font-semibold py-2 ${i === 0 ? 'text-red-400' : 'text-void-400'}`}>{day}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((day, i) => {
                                if (day.date === 0) return <div key={`e-${i}`} className="aspect-square" />

                                const isSelected = day.dateStr === selectedDate
                                const counts = slotCountByDate[day.dateStr]
                                const hasSlots = !!counts

                                return (
                                    <button
                                        key={day.dateStr}
                                        onClick={() => handleDateSelect(day.dateStr)}
                                        className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all duration-200 relative ${
                                            isSelected
                                                ? 'bg-accent-600 text-white shadow-lg shadow-accent-600/30'
                                                : day.isPast
                                                    ? 'text-void-600'
                                                    : day.isToday
                                                        ? 'bg-accent-600/15 text-accent-600 border border-accent-600/30'
                                                        : 'text-void-200 hover:bg-void-800'
                                        }`}
                                    >
                                        <span>{day.date}</span>
                                        {hasSlots && (
                                            <div className="flex gap-0.5 mt-0.5">
                                                {counts.open > 0 && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                                                {counts.booked > 0 && <div className="w-1.5 h-1.5 rounded-full bg-accent-600" />}
                                            </div>
                                        )}
                                    </button>
                                )
                            })}
                        </div>

                        {/* 날짜별 기존 슬롯 목록 */}
                        {selectedDate && slotsForSelectedDate.length > 0 && (
                            <div className="mt-8 border-t border-void-800 pt-6">
                                <h4 className="text-white text-sm font-bold mb-4">{selectedDate} 등록된 슬롯</h4>
                                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                    {slotsForSelectedDate.sort((a, b) => a.time.localeCompare(b.time)).map(slot => (
                                        <div key={slot.id} className="flex items-center justify-between p-3 rounded-xl bg-void-800/50">
                                            <div className="flex items-center gap-3">
                                                <Clock className="w-4 h-4 text-void-500" />
                                                <span className="text-white text-sm font-medium">{slot.time}</span>
                                                {slot.status === 'booked' ? (
                                                    <span className="text-xs px-2 py-0.5 rounded bg-accent-600/15 text-accent-600 font-semibold">
                                                        예약됨 {slot.bookedBy ? `(${slot.bookedBy.name})` : ''}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-400/15 text-emerald-400 font-semibold">열림</span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleDeleteSlot(slot.id)}
                                                disabled={slot.status === 'booked'}
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                                    slot.status === 'booked'
                                                        ? 'text-void-600 cursor-not-allowed'
                                                        : 'text-void-500 hover:bg-red-500/10 hover:text-red-400'
                                                }`}
                                                title={slot.status === 'booked' ? '예약된 슬롯은 삭제할 수 없습니다' : '슬롯 삭제'}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 오른쪽: 시간 추가 */}
                    <div className="glass p-8 rounded-3xl">
                        {!selectedDate ? (
                            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                                <Calendar className="w-16 h-16 text-void-700 mb-4" />
                                <h3 className="text-white text-lg font-bold mb-2">날짜를 선택해 주세요</h3>
                                <p className="text-void-500 text-sm">달력에서 상담을 열고 싶은 날짜를 클릭하세요</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-white text-lg font-bold">{selectedDate}</h3>
                                        <p className="text-void-400 text-xs mt-1">상담 가능 시간을 선택하세요</p>
                                    </div>
                                    <button
                                        onClick={selectAllAvailable}
                                        className="text-xs text-accent-600 hover:text-accent-500 font-semibold transition-colors"
                                    >
                                        {selectedTimes.size === ALL_TIMES.filter(t => !existingTimesForDate.has(t.time)).length ? '전체 해제' : '전체 선택'}
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mb-8">
                                    {ALL_TIMES.map(({ time, label }) => {
                                        const isExisting = existingTimesForDate.has(time)
                                        const isSelected = selectedTimes.has(time)
                                        const existingSlot = slotsForSelectedDate.find(s => s.time === time)
                                        const isBooked = existingSlot?.status === 'booked'

                                        return (
                                            <button
                                                key={time}
                                                onClick={() => toggleTime(time)}
                                                disabled={isExisting}
                                                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                                    isBooked
                                                        ? 'border-accent-600/30 bg-accent-600/10 text-accent-600/60 cursor-not-allowed'
                                                        : isExisting
                                                            ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400/60 cursor-not-allowed'
                                                            : isSelected
                                                                ? 'border-accent-600 bg-accent-600/15 text-white'
                                                                : 'border-void-700/50 text-void-300 hover:border-void-600 hover:bg-void-800/50'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>{label}</span>
                                                </div>
                                                {isBooked && <span className="text-[10px]">예약됨</span>}
                                                {isExisting && !isBooked && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                                                {isSelected && <Plus className="w-3.5 h-3.5 text-accent-600" />}
                                            </button>
                                        )
                                    })}
                                </div>

                                {/* 메시지 */}
                                {message && (
                                    <div className={`flex items-center gap-2 p-4 rounded-xl mb-4 ${
                                        message.type === 'success'
                                            ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                                            : 'bg-red-400/10 text-red-400 border border-red-400/20'
                                    }`}>
                                        {message.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                                        <span className="text-sm">{message.text}</span>
                                    </div>
                                )}

                                {/* 저장 버튼 */}
                                <button
                                    onClick={handleSaveSlots}
                                    disabled={saving || selectedTimes.size === 0}
                                    className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>저장 중...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4" />
                                            <span>{selectedTimes.size}개 슬롯 추가하기</span>
                                        </>
                                    )}
                                </button>

                                <p className="text-void-500 text-xs mt-4 text-center">
                                    초록색 = 이미 등록됨 · 빨간색 = 예약 완료 · 선택 = 새로 추가할 시간
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* 전체 슬롯 요약 (향후 7일) */}
                {!loading && (
                    <div className="mt-12">
                        <h3 className="text-white text-lg font-bold mb-6">향후 예약 가능 일정</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.entries(slotCountByDate)
                                .filter(([date]) => date >= new Date().toISOString().split('T')[0])
                                .sort(([a], [b]) => a.localeCompare(b))
                                .slice(0, 8)
                                .map(([date, counts]) => {
                                    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][new Date(date).getDay()]
                                    return (
                                        <button
                                            key={date}
                                            onClick={() => handleDateSelect(date)}
                                            className={`glass p-5 rounded-2xl text-left transition-all hover:bg-white/[0.03] ${
                                                selectedDate === date ? 'border border-accent-600/40' : ''
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-white font-bold text-sm">{date}</span>
                                                <span className="text-void-500 text-xs">({dayOfWeek})</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                                    <span className="text-emerald-400 text-xs font-semibold">{counts.open} 열림</span>
                                                </div>
                                                {counts.booked > 0 && (
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-2 h-2 rounded-full bg-accent-600" />
                                                        <span className="text-accent-600 text-xs font-semibold">{counts.booked} 예약</span>
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    )
                                })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
