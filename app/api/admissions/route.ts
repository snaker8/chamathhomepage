import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const CONSULT_TYPE_LABELS: Record<string, string> = {
    visit: '방문 상담',
    phone: '전화 상담',
    online: '온라인 상담',
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, school, phone, consultType, consultDate, consultTime, message } = body

        if (!name || !school || !phone) {
            return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 })
        }

        const typeLabel = CONSULT_TYPE_LABELS[consultType] || consultType || '미지정'
        const dateDisplay = consultDate || '미정'
        const timeDisplay = consultTime || '미정'

        // Send Email
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'snaker@hanmail.net',
            subject: `[차수학] 상담 예약: ${name} 학생 (${dateDisplay} ${timeDisplay})`,
            html: `
                <div style="font-family: 'Pretendard', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #18181b; border-radius: 16px; overflow: hidden; border: 1px solid #27272a;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 32px; text-align: center;">
                        <h1 style="color: white; font-size: 24px; font-weight: 800; margin: 0 0 8px 0; letter-spacing: -0.5px;">새로운 상담 예약</h1>
                        <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;">차수학 입학 센터</p>
                    </div>

                    <!-- Body -->
                    <div style="padding: 32px;">
                        <!-- 예약 정보 카드 -->
                        <div style="background: #27272a; border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #dc2626;">
                            <h2 style="color: #fafafa; font-size: 16px; font-weight: 700; margin: 0 0 16px 0;">📅 예약 정보</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #a1a1aa; font-size: 13px; width: 100px;">상담 유형</td>
                                    <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 600;">${typeLabel}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #a1a1aa; font-size: 13px;">예약 날짜</td>
                                    <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 600;">${dateDisplay}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #a1a1aa; font-size: 13px;">예약 시간</td>
                                    <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 600;">${timeDisplay}</td>
                                </tr>
                            </table>
                        </div>

                        <!-- 학생 정보 카드 -->
                        <div style="background: #27272a; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                            <h2 style="color: #fafafa; font-size: 16px; font-weight: 700; margin: 0 0 16px 0;">👤 학생 정보</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #a1a1aa; font-size: 13px; width: 100px;">학생명</td>
                                    <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 600;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #a1a1aa; font-size: 13px;">학교/학년</td>
                                    <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 600;">${school}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #a1a1aa; font-size: 13px;">연락처</td>
                                    <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 600;">${phone}</td>
                                </tr>
                            </table>
                        </div>

                        ${message ? `
                        <!-- 문의 사항 -->
                        <div style="background: #27272a; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                            <h2 style="color: #fafafa; font-size: 16px; font-weight: 700; margin: 0 0 12px 0;">💬 문의 사항</h2>
                            <p style="color: #d4d4d8; font-size: 14px; line-height: 1.6; margin: 0;">${message}</p>
                        </div>
                        ` : ''}

                        <p style="color: #71717a; font-size: 12px; text-align: center; margin: 24px 0 0 0;">
                            신청일시: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
                        </p>
                    </div>

                    <!-- Footer -->
                    <div style="background: #0f0f11; padding: 20px; text-align: center; border-top: 1px solid #27272a;">
                        <p style="color: #52525b; font-size: 11px; margin: 0;">차수학 홈페이지에서 자동 발송된 메일입니다</p>
                    </div>
                </div>
            `
        }

        // Only attempt email if credentials are provided
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions)
        }

        return NextResponse.json({ success: true, message: 'Consultation booked successfully' })
    } catch (error) {
        console.error('Admission API error:', error)
        return NextResponse.json({ error: '데이터 처리 중 오류가 발생했습니다.' }, { status: 500 })
    }
}

// GET: 관리자 페이지에서 상담 예약 목록 조회
export async function GET() {
    try {
        const { collection, getDocs, orderBy, query } = await import('firebase/firestore')
        const { db } = await import('@/lib/firebase')

        const q = query(collection(db, 'admissions'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)

        const admissions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        return NextResponse.json(admissions)
    } catch (error) {
        console.error('Fetch admissions error:', error)
        return NextResponse.json({ error: 'Failed to fetch admissions' }, { status: 500 })
    }
}
