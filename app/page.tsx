'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  Bot, BarChart2, Target, Moon, Smartphone, Palette,
  BookOpen, Ruler, MessageCircle, Star, Phone, Mail,
  MapPin, Globe, MessageSquare, Menu, X
} from 'lucide-react'
import QuickLinks from '@/components/QuickLinks'
import NoticeBoard from '@/components/NoticeBoard'
import Features from '@/components/Features'

// Removed Scene component to transition to a high-end, premium non-3D aesthetic

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="min-h-screen">

      {/* Premium Hero Section */}
      <section className="relative pt-48 pb-40 px-6 overflow-hidden min-h-[90vh] flex items-center bg-gradient-mocha">
        {/* Abstract Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-aurora-400/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-cyan/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto relative z-10 text-center">
          <div className="inline-block mb-8 px-5 py-2 rounded-full premium-glass border border-white/10 animate-fadeIn">
            <span className="text-aurora-400 text-xs font-bold tracking-[0.3em] uppercase">The Standard of Mathematical Excellence</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 hero-heading animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            THE APEX<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-400 via-white to-neon-cyan neon-glow-text">OF MATH</span>
          </h1>

          <p className="text-xl md:text-2xl text-mocha-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            "엄궁 최고의 입시 명문, 수학의 새로운 기준을 제시합니다"<br />
            검증된 커리큘럼과 압도적인 실력 향상의 증명, 차수학 엄궁 캠퍼스
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <Link href="/admissions" className="btn-primary px-10 py-4 text-lg shadow-[0_0_30px_rgba(77,255,145,0.4)] hover:shadow-[0_0_50px_rgba(77,255,145,0.6)] transition-all duration-500">
              입학 상담 신청
            </Link>
            <Link href="/about" className="px-10 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all duration-500 font-semibold backdrop-blur-md">
              학원안내
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Sections - Premium Redesign */}
      <section className="relative py-24 px-6 bg-black overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_rgba(77,255,145,0.03)_0%,_transparent_70%)] pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="mb-24 text-center animate-fadeIn">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 hero-heading">THE PILLARS OF EXCELLENCE</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-aurora-400 to-neon-cyan mx-auto rounded-full" />
          </div>

          <Features />

          {/* Results & Hall of Fame Section [NEW] */}
          <div className="mt-48 mb-40">
            <div className="text-center mb-20">
              <span className="text-neon-cyan font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Proven Success</span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 hero-heading">HALL OF FAME</h2>
              <p className="text-mocha-400 max-w-2xl mx-auto">입시로 증명하는 차수학의 압도적 결과. 엄궁 캠퍼스만의 독보적인 성과입니다.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: '전교 1등 배출', value: '42', unit: '명', desc: '엄궁 및 주변 중고교' },
                { label: '수학 1등급 비율', value: '88', unit: '%', desc: '재원생 1년 이상 기준' },
                { label: '인서울 합격자', value: '150', unit: '+', desc: '최근 3개년 누적' },
                { label: '성적 향상도', value: '24', unit: '점', desc: '평균 점수 상승폭' },
              ].map((stat, i) => (
                <div key={i} className="premium-glass p-10 rounded-[32px] border border-white/5 text-center group hover:border-aurora-400/30 transition-all duration-500 hover:-translate-y-2">
                  <p className="text-mocha-500 text-xs font-bold tracking-widest uppercase mb-4">{stat.label}</p>
                  <p className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:text-aurora-400 transition-colors uppercase">
                    {stat.value}<span className="text-2xl ml-1">{stat.unit}</span>
                  </p>
                  <div className="w-12 h-0.5 bg-white/10 mx-auto my-4 group-hover:bg-aurora-400/50 transition-colors" />
                  <p className="text-mocha-500 text-xs">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <QuickLinks />

          <div className="mt-48">
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-white mb-2">NOTICE & INSIGHTS</h3>
              <div className="w-16 h-1 bg-aurora-400 rounded-full" />
            </div>
            <NoticeBoard />
          </div>
        </div>
      </section>

      {/* Multimedia / About (Placeholder for future expansion) */}
      <section className="py-20 px-6 bg-white/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-2">차수학 교육 철학</h2>
          <p className="text-mocha-400 mb-12">학생 한 명 한 명의 꿈을 소중히 여깁니다.</p>
          <div className="glass aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-cyan/20 to-aurora-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <span className="relative z-10 text-white font-bold text-xl border border-white/30 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-black transition-all">
              홍보 영상 보기 ▶
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-aurora-400/5 blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-mocha-50 mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl md:text-2xl text-mocha-300 mb-12">
            14일 무료 체험으로 차세대 학원의 모든 기능을 경험해보세요
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary text-lg px-10 py-5">
              무료로 시작하기
            </button>
            <button className="btn-ghost text-lg px-10 py-5">
              상담 신청하기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-mocha-400/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-aurora flex items-center justify-center">
                  <span className="text-xl font-bold text-mocha-900">차</span>
                </div>
                <span className="text-xl font-bold text-mocha-50">차수학 (Cha Math Academy)</span>
              </div>
              <p className="text-mocha-400 text-sm">
                엄궁 최고의 수학 명문<br />
                철저한 관리와 결과로 증명합니다.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-mocha-50 mb-4">학원 안내</h4>
              <ul className="space-y-2">
                {['원장 인사말', '강사진 소개', '오시는 길', '시설 안내'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-mocha-400 hover:text-aurora-400 text-sm transition-smooth">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-mocha-50 mb-4">프로그램</h4>
              <ul className="space-y-2">
                {['중등부 안내', '고등부 안내', '예비고1 관리', '방학 특강'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-mocha-400 hover:text-aurora-400 text-sm transition-smooth">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-mocha-50 mb-4">입학 상담</h4>
              <ul className="space-y-2 text-sm text-mocha-400">
                <li className="font-bold text-lg text-white">051-123-4567</li>
                <li>부산광역시 사상구 엄궁동 차수학 빌딩</li>
                <li>사업자: 123-45-67890 (대표: 차수학)</li>
                <li className="flex space-x-3 pt-2">
                  {[
                    <Globe key="web" className="w-5 h-5" />,
                    <Smartphone key="mobile" className="w-5 h-5" />,
                    <MessageSquare key="chat" className="w-5 h-5" />
                  ].map((icon, i) => (
                    <span key={i} className="cursor-pointer hover:scale-110 hover:text-aurora-400 transition-smooth">
                      {icon}
                    </span>
                  ))}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-mocha-400/20 text-center text-mocha-500 text-sm">
            <p>© 2026 Cha Mathematics Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Floating Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-aurora flex items-center justify-center aurora-glow hover:scale-110 transition-smooth shadow-xl z-50 group">
        <MessageSquare className="w-8 h-8 text-mocha-900 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  )
}
