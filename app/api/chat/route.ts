import { NextRequest, NextResponse } from 'next/server'

const ACADEMY_INFO = `차수학은 부산 사상구 엄궁에 위치한 중·고등 수학 전문학원입니다.
주소: 부산 사상구 엄궁로 186
전화: 051-311-0312
원장: 차수학 원장

프로그램:
- 초등부: 연산+개념진도, 개념심화반, 중등 선행반
- 중등부: 정규반, 심화반(Elite), 예비고1 과정
- 고등부: 내신 기초반, 내신 심화반, 고3 수능대비
- 방학 특강: 4주 집중 과정

운영 시간:
- 평일 오후반: 14:00~18:00
- 평일 저녁반: 19:00~22:00
- 주말 오전반: 09:00~13:00
- 주말 오후반: 14:00~18:00

특징: 데이터 기반 개별 관리, 원장 직접 클리닉, 소수 정예 수업`

const KEYWORD_RESPONSES: Record<string, string> = {
    '수강료|가격|비용|얼마': '수강료는 과목과 반에 따라 다릅니다. 정확한 수강료는 상담을 통해 안내드리고 있습니다.\n\n상담 예약: 051-311-0312\n또는 홈페이지 입학상담 페이지에서 신청해주세요.',
    '시간표|일정|시간': '운영 시간은 다음과 같습니다:\n\n- 평일 오후반: 14:00~18:00\n- 평일 저녁반: 19:00~22:00\n- 주말 오전반: 09:00~13:00\n- 주말 오후반: 14:00~18:00\n\n반별 세부 시간표는 상담 시 안내드립니다.',
    '환불|취소|반환': '환불 정책은 학원법에 따릅니다:\n\n- 수강 시작 전: 전액 환불\n- 수강 기간 1/3 경과 전: 2/3 환불\n- 수강 기간 1/2 경과 전: 1/2 환불\n- 수강 기간 1/2 경과 후: 환불 불가\n\n자세한 사항은 051-311-0312로 문의해주세요.',
    '체험|무료|테스트|레벨': '상담 시 레벨테스트를 진행하며, 학생의 수준에 맞는 반을 추천드립니다.\n\n상담 신청은 홈페이지 입학상담 페이지 또는 전화(051-311-0312)로 가능합니다.',
    '위치|주소|어디|찾아': '차수학 위치:\n\n주소: 부산 사상구 엄궁로 186\n전화: 051-311-0312\n\n학원안내 페이지에서 지도를 확인하실 수 있습니다.',
    '프로그램|과정|반|커리큘럼': '차수학 프로그램:\n\n[초등부]\n- 연산+개념진도, 개념심화반, 중등 선행반\n\n[중등부]\n- 정규반, 심화반(Elite), 예비고1 과정\n\n[고등부]\n- 내신 기초반, 내신 심화반, 고3 수능대비\n\n자세한 내용은 프로그램 페이지를 확인해주세요.',
    '상담|문의|연락': '상담 방법:\n\n- 전화: 051-311-0312\n- 방문: 부산 사상구 엄궁로 186\n- 온라인: 홈페이지 입학상담 페이지에서 신청\n\n방문, 전화, 온라인 상담 모두 가능합니다!',
    '원장|선생님|강사': '차수학 원장입니다.\n\n모든 학생을 데이터 기반으로 개별 관리하며, 원장이 직접 클리닉을 진행합니다.\n\n자세한 소개는 학원안내 페이지에서 확인하실 수 있습니다.',
}

function getKeywordResponse(question: string): string {
    const lower = question.toLowerCase()
    for (const [keywords, response] of Object.entries(KEYWORD_RESPONSES)) {
        const keywordList = keywords.split('|')
        if (keywordList.some(kw => lower.includes(kw))) {
            return response
        }
    }
    return '궁금하신 점을 더 구체적으로 말씀해주시면 정확한 답변을 드릴 수 있습니다.\n\n빠른 상담을 원하시면 051-311-0312로 전화해주세요!'
}

export async function POST(request: NextRequest) {
    try {
        const { message, history } = await request.json()

        if (!message || typeof message !== 'string') {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 })
        }

        // If Anthropic API key is configured, use Claude
        if (process.env.ANTHROPIC_API_KEY) {
            try {
                const response = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': process.env.ANTHROPIC_API_KEY,
                        'anthropic-version': '2023-06-01',
                    },
                    body: JSON.stringify({
                        model: 'claude-haiku-4-5-20251001',
                        max_tokens: 500,
                        system: `당신은 차수학(수학학원) AI 상담사입니다. 친절하고 정확하게 학원 정보를 안내합니다. 한국어로 답변하세요. 답변은 간결하게 해주세요.\n\n학원 정보:\n${ACADEMY_INFO}`,
                        messages: [
                            ...(history || []).slice(-6).map((m: any) => ({
                                role: m.role,
                                content: m.content,
                            })),
                            { role: 'user', content: message },
                        ],
                    }),
                })

                if (response.ok) {
                    const data = await response.json()
                    return NextResponse.json({
                        reply: data.content[0].text,
                        source: 'ai',
                    })
                }
            } catch (error) {
                console.error('Claude API error, falling back to keywords:', error)
            }
        }

        // Fallback to keyword-based responses
        return NextResponse.json({
            reply: getKeywordResponse(message),
            source: 'keyword',
        })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
