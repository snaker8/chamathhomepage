import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, school, phone } = body

        if (!name || !school || !phone) {
            return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 })
        }

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
            subject: `[차수학] 새로운 입학 상담 신청: ${name} 학생`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #4dff91;">새로운 입학 상담 신청이 도착했습니다.</h2>
                    <p><strong>학생명:</strong> ${name}</p>
                    <p><strong>학교/학년:</strong> ${school}</p>
                    <p><strong>연락처:</strong> ${phone}</p>
                    <p><strong>신청일시:</strong> ${new Date().toISOString()}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #666;">본 메일은 차수학 홈페이지에서 자동으로 발송되었습니다.</p>
                </div>
            `
        }

        // Only attempt email if credentials are provided
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions)
        }

        return NextResponse.json({ success: true, message: 'Email sent successfully' })
    } catch (error) {
        console.error('Admission API error:', error)
        return NextResponse.json({ error: '데이터 처리 중 오류가 발생했습니다.' }, { status: 500 })
    }
}
