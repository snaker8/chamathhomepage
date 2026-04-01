import { NextResponse } from 'next/server'
import { collection, getDocs, addDoc, deleteDoc, doc, query, where, updateDoc, orderBy } from 'firebase/firestore'

async function getDb() {
    const { db } = await import('@/lib/firebase')
    return db
}

// GET: 상담 가능 슬롯 목록 조회
// ?mode=admin → 전체 (마감 포함)
// ?mode=public → 예약 가능한 슬롯만
export async function GET(request: Request) {
    try {
        const db = await getDb()
        const { searchParams } = new URL(request.url)
        const mode = searchParams.get('mode') || 'public'

        const slotsRef = collection(db, 'consultation-slots')
        const q = query(slotsRef, orderBy('date', 'asc'))
        const snapshot = await getDocs(q)

        let slots = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))

        if (mode === 'public') {
            // 공개 모드: 오늘 이후 + 예약 안 된 슬롯만
            const today = new Date().toISOString().split('T')[0]
            slots = slots.filter((s: any) => s.date >= today && s.status === 'open')
        }

        return NextResponse.json(slots)
    } catch (error) {
        console.error('Fetch slots error:', error)
        return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 })
    }
}

// POST: 슬롯 추가 (관리자)
// body: { date: "2026-03-28", times: ["14:30", "15:30", "16:30"] }
export async function POST(request: Request) {
    try {
        const db = await getDb()
        const body = await request.json()
        const { date, times } = body

        if (!date || !times || !Array.isArray(times) || times.length === 0) {
            return NextResponse.json({ error: '날짜와 시간을 입력해 주세요.' }, { status: 400 })
        }

        // 해당 날짜에 이미 존재하는 시간 확인
        const slotsRef = collection(db, 'consultation-slots')
        const existing = query(slotsRef, where('date', '==', date))
        const snapshot = await getDocs(existing)
        const existingTimes = new Set(snapshot.docs.map(d => (d.data() as any).time))

        const added: any[] = []
        for (const time of times) {
            if (existingTimes.has(time)) continue // 중복 스킵

            const docRef = await addDoc(slotsRef, {
                date,
                time,
                status: 'open', // open | booked
                bookedBy: null,
                createdAt: new Date().toISOString(),
            })
            added.push({ id: docRef.id, date, time, status: 'open' })
        }

        return NextResponse.json({
            success: true,
            added: added.length,
            skipped: times.length - added.length,
            slots: added,
        })
    } catch (error) {
        console.error('Add slot error:', error)
        return NextResponse.json({ error: '슬롯 추가에 실패했습니다.' }, { status: 500 })
    }
}

// DELETE: 슬롯 삭제 (관리자)
// body: { slotId: "..." }
export async function DELETE(request: Request) {
    try {
        const db = await getDb()
        const body = await request.json()
        const { slotId } = body

        if (!slotId) {
            return NextResponse.json({ error: 'slotId가 필요합니다.' }, { status: 400 })
        }

        await deleteDoc(doc(db, 'consultation-slots', slotId))
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Delete slot error:', error)
        return NextResponse.json({ error: '슬롯 삭제에 실패했습니다.' }, { status: 500 })
    }
}

// PATCH: 슬롯 상태 변경 (예약 시 booked로 변경)
// body: { slotId: "...", status: "booked", bookedBy: { name, phone } }
export async function PATCH(request: Request) {
    try {
        const db = await getDb()
        const body = await request.json()
        const { slotId, status, bookedBy } = body

        if (!slotId || !status) {
            return NextResponse.json({ error: 'slotId와 status가 필요합니다.' }, { status: 400 })
        }

        const updateData: any = { status }
        if (bookedBy) updateData.bookedBy = bookedBy

        await updateDoc(doc(db, 'consultation-slots', slotId), updateData)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Update slot error:', error)
        return NextResponse.json({ error: '슬롯 업데이트에 실패했습니다.' }, { status: 500 })
    }
}
