'use client'

import { useState } from 'react'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: '안녕하세요! 차세대 학원 AI 상담사입니다. 무엇을 도와드릴까요?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickQuestions = [
    '수강료가 궁금해요',
    '시간표를 알려주세요',
    '환불 정책은 어떻게 되나요?',
    '무료 체험이 가능한가요?',
  ]

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(messageText)
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes('수강료') || lowerQuestion.includes('가격')) {
      return '수강료는 과목과 기간에 따라 다릅니다.\n\n• 기본 강좌: 월 199,000원~\n• 프리미엄 강좌: 월 349,000원~\n• 종합 패키지: 6개월 1,800,000원\n\n첫 달 50% 할인 이벤트 진행 중입니다! 상담 신청하시겠어요?'
    }

    if (lowerQuestion.includes('시간표') || lowerQuestion.includes('일정')) {
      return '시간표는 다음과 같습니다:\n\n• 평일 오후반: 14:00~18:00\n• 평일 저녁반: 19:00~22:00\n• 주말 오전반: 09:00~13:00\n• 주말 오후반: 14:00~18:00\n\n원하시는 시간대를 말씀해주시면 맞춤 시간표를 제안해드리겠습니다.'
    }

    if (lowerQuestion.includes('환불') || lowerQuestion.includes('취소')) {
      return '환불 정책은 다음과 같습니다:\n\n• 수강 시작 전: 100% 환불\n• 첫 수업 후 7일 이내: 90% 환불\n• 수강 기간 1/3 이전: 2/3 환불\n• 수강 기간 1/2 이전: 1/2 환불\n\n불만족 시 첫 수업 후 전액 환불 보장 제도도 운영 중입니다!'
    }

    if (lowerQuestion.includes('무료') || lowerQuestion.includes('체험')) {
      return '네! 14일 무료 체험이 가능합니다.\n\n체험 기간 동안:\n✓ 모든 강의 무제한 시청\n✓ AI 튜터 전체 기능 이용\n✓ 학습 관리 시스템 체험\n✓ 1:1 상담 가능\n\n지금 바로 신청하시겠어요?'
    }

    if (lowerQuestion.includes('위치') || lowerQuestion.includes('주소')) {
      return '학원 위치는 다음과 같습니다:\n\n📍 서울특별시 강남구 테헤란로 123\n🚇 지하철 2호선 강남역 5번 출구에서 도보 3분\n🚌 버스 정류장: 강남역.강남역사거리 하차\n🅿️ 주차: 건물 지하 주차장 이용 가능\n\n오시는 길을 카카오맵으로 안내해드릴까요?'
    }

    // Default response
    return '좋은 질문이네요! 더 자세한 상담을 원하시면 전문 상담사와 연결해드릴게요. 실시간 상담을 원하시나요?'
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-aurora flex items-center justify-center aurora-glow hover:scale-110 transition-smooth shadow-xl z-50"
        aria-label="AI 챗봇 열기"
      >
        {isOpen ? (
          <span className="text-3xl">✕</span>
        ) : (
          <span className="text-3xl">💬</span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 w-96 h-[600px] glass rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-mocha-400/20">
          {/* Header */}
          <div className="bg-gradient-aurora p-4 flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-mocha-900 flex items-center justify-center text-2xl">
              🤖
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-mocha-900">AI 상담사</h3>
              <p className="text-xs text-mocha-700">24시간 실시간 상담</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-mocha-900/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-aurora text-mocha-900'
                      : 'bg-mocha-800/50 text-mocha-50'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </p>
                  <p className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-mocha-700' : 'text-mocha-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-mocha-800/50 text-mocha-50 rounded-2xl p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-aurora-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-aurora-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-aurora-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-mocha-400/20 bg-mocha-900/30">
              <p className="text-xs text-mocha-400 mb-2">자주 묻는 질문</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="text-xs px-3 py-2 rounded-lg bg-mocha-800/50 text-mocha-300 hover:bg-aurora-400/20 hover:text-aurora-400 transition-smooth text-left"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-mocha-400/20 bg-mocha-900/50">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-3 rounded-full bg-mocha-800/50 text-mocha-50 placeholder-mocha-500 focus:outline-none focus:ring-2 focus:ring-aurora-400 border border-mocha-400/20"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim()}
                className="w-12 h-12 rounded-full bg-gradient-aurora flex items-center justify-center hover:scale-110 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-2xl">➤</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
