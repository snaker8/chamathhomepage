'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [streak, setStreak] = useState(7) // 연속 학습일

  return (
    <div className="min-h-screen bg-gradient-mocha">

      <div className="container mx-auto px-6 py-12">
        {/* Welcome Message */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-mocha-50 mb-4">
            안녕하세요, 김학생님! 👋
          </h1>
          <p className="text-xl text-mocha-300">
            오늘도 목표를 향해 한 걸음 더 나아가세요
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Today's Schedule - Large Box */}
          <div className="md:col-span-2 md:row-span-2 bento-item">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-mocha-50">오늘의 일정</h2>
              <span className="text-aurora-400 text-sm font-semibold">3개 수업</span>
            </div>

            <div className="space-y-4">
              {[
                { time: '14:00 - 15:30', subject: '수능 국어', teacher: '김국어 선생님', type: '실시간' },
                { time: '16:00 - 17:30', subject: '미적분', teacher: '박수학 선생님', type: '실시간' },
                { time: '19:00 - 20:30', subject: '영어 회화', teacher: 'John Smith', type: '녹화' },
              ].map((schedule, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-mocha-800/30 border border-mocha-400/10 hover:border-aurora-400/30 transition-smooth cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-aurora-400 font-semibold">{schedule.time}</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-aurora-400/20 text-aurora-400">
                      {schedule.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-mocha-50 mb-1">{schedule.subject}</h3>
                  <p className="text-sm text-mocha-400">{schedule.teacher}</p>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full btn-primary">
              전체 시간표 보기
            </button>
          </div>

          {/* Learning Streak - Medium Box */}
          <div className="bento-item text-center">
            <div className="text-6xl mb-4">🔥</div>
            <div className="text-5xl font-bold text-gradient-aurora mb-2">{streak}일</div>
            <p className="text-mocha-300 text-sm">연속 학습 중</p>
            <div className="mt-4 w-full bg-mocha-800/50 rounded-full h-2">
              <div
                className="bg-gradient-aurora h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(streak * 10, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Total Study Time - Medium Box */}
          <div className="bento-item text-center">
            <div className="text-6xl mb-4">⏱️</div>
            <div className="text-5xl font-bold text-mocha-50 mb-2">24.5</div>
            <p className="text-mocha-300 text-sm">이번 주 학습 시간</p>
            <p className="text-aurora-400 text-xs mt-2">+3.2h (지난주 대비)</p>
          </div>

          {/* Attendance Rate - Small Box */}
          <div className="bento-item">
            <h3 className="text-lg font-bold text-mocha-50 mb-4">출석률</h3>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gradient-aurora">98%</div>
              <div className="text-4xl">✅</div>
            </div>
            <p className="text-xs text-mocha-400 mt-2">이번 달 30일 중 29일 출석</p>
          </div>

          {/* Assignments - Small Box */}
          <div className="bento-item">
            <h3 className="text-lg font-bold text-mocha-50 mb-4">과제</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-mocha-50">2</div>
                <p className="text-xs text-mocha-400 mt-1">제출 대기 중</p>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </div>

          {/* Recent Grades - Medium Box */}
          <div className="md:col-span-2 bento-item">
            <h2 className="text-2xl font-bold text-mocha-50 mb-6">최근 성적</h2>
            <div className="space-y-4">
              {[
                { subject: '수능 국어 모의고사', score: 92, date: '2026.01.20' },
                { subject: '미적분 단원평가', score: 88, date: '2026.01.18' },
                { subject: '영어 회화 테스트', score: 95, date: '2026.01.15' },
              ].map((grade, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-mocha-50 mb-1">{grade.subject}</h4>
                    <p className="text-xs text-mocha-400">{grade.date}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-mocha-800/50 rounded-full h-2">
                      <div
                        className="bg-gradient-aurora h-2 rounded-full"
                        style={{ width: `${grade.score}%` }}
                      ></div>
                    </div>
                    <span className="text-2xl font-bold text-aurora-400 w-12 text-right">
                      {grade.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations - Large Box */}
          <div className="md:col-span-2 bento-item">
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-3xl">🤖</div>
              <h2 className="text-2xl font-bold text-mocha-50">AI 추천 학습</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: '미적분 약점 보충',
                  description: '지수함수 파트에서 정답률이 낮습니다. 추가 학습을 권장합니다.',
                  priority: 'high',
                  time: '30분'
                },
                {
                  title: '국어 비문학 독해 연습',
                  description: '과학 지문 독해 속도를 높이면 성적 향상에 도움이 됩니다.',
                  priority: 'medium',
                  time: '45분'
                },
              ].map((recommendation, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-mocha-800/30 border border-mocha-400/10 hover:border-aurora-400/30 transition-smooth cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-mocha-50">{recommendation.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${recommendation.priority === 'high'
                        ? 'bg-aurora-400/20 text-aurora-400'
                        : 'bg-mocha-400/20 text-mocha-300'
                      }`}>
                      {recommendation.priority === 'high' ? '긴급' : '권장'}
                    </span>
                  </div>
                  <p className="text-sm text-mocha-400 mb-3">{recommendation.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-mocha-500">예상 소요 시간: {recommendation.time}</span>
                    <button className="text-aurora-400 hover:text-aurora-300 text-sm font-semibold">
                      시작하기 →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements - Medium Box */}
          <div className="md:col-span-2 bento-item">
            <h2 className="text-2xl font-bold text-mocha-50 mb-6">획득한 배지</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                { emoji: '🏆', name: '완벽 출석', desc: '한 달 개근' },
                { emoji: '📚', name: '독서왕', desc: '100권 완독' },
                { emoji: '⭐', name: '모범생', desc: '과제 10회 만점' },
                { emoji: '🎯', name: '목표 달성', desc: '월간 목표 달성' },
                { emoji: '💪', name: '끈기왕', desc: '30일 연속 학습' },
                { emoji: '🚀', name: '급성장', desc: '성적 20% 향상' },
                { emoji: '👑', name: 'VIP', desc: '프리미엄 회원' },
                { emoji: '🌟', name: '올라운더', desc: '전과목 우수' },
              ].map((badge, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-3 rounded-xl bg-mocha-800/30 hover:bg-mocha-700/30 transition-smooth cursor-pointer group"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-smooth">{badge.emoji}</div>
                  <p className="text-xs text-mocha-300 text-center font-semibold">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '📅', label: '시간표 보기', color: 'aurora' },
            { icon: '📊', label: '성적 분석', color: 'aurora' },
            { icon: '💬', label: '상담 신청', color: 'mocha' },
            { icon: '📖', label: '학습 자료', color: 'mocha' },
          ].map((action, index) => (
            <button
              key={index}
              className={`p-6 rounded-xl glass hover:scale-105 transition-smooth ${action.color === 'aurora' ? 'border-aurora-400/30' : 'border-mocha-400/30'
                }`}
            >
              <div className="text-4xl mb-2">{action.icon}</div>
              <div className="text-mocha-50 font-semibold">{action.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Chatbot Floating Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-aurora flex items-center justify-center aurora-glow hover:scale-110 transition-smooth shadow-xl z-50">
        <span className="text-3xl">💬</span>
      </button>
    </div>
  )
}
