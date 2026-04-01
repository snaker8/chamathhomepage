'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Phone, Mail, MapPin, Globe, MessageSquare,
  ArrowRight, BarChart3, Target, Trophy, Users
} from 'lucide-react'
import QuickLinks from '@/components/QuickLinks'
import NoticeBoard from '@/components/NoticeBoard'
import Features from '@/components/Features'
import AIChatbot from '@/components/AIChatbot'

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] bg-void-950">
      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-void">
        {/* Mesh Background */}
        <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />

        {/* Glow Effects */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent-600/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-main relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content (Left) */}
            <div className="animate-fade-in-up space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass">
                  <div className="w-2 h-2 bg-accent-600 rounded-full" />
                  <span className="text-xs font-semibold tracking-widest text-accent-600 uppercase">Premium Mathematics Academy</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight break-keep-all">
                  엄궁 최고의
                  <br />
                  <span className="text-accent-600">수학 전문학원</span>
                </h1>

                <p className="text-lg text-void-300 leading-relaxed break-keep-all max-w-md">
                  검증된 커리큘럼과 압도적인 성적 향상의 증명. 차수학이 만드는 수학의 새로운 기준입니다.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/admissions" className="btn-primary text-base">
                  입학 상담 신청
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/about" className="btn-secondary text-base">
                  학원안내
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex gap-8 pt-8 border-t border-void-800">
                {[
                  { value: '42명', label: '전교 1등 배출' },
                  { value: '150+', label: '인서울 합격' }
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-void-400 break-keep-all">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element (Right) */}
            <div className="relative h-[500px] hidden lg:flex items-center justify-center">
              <div className="absolute inset-0 glass rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-600/20 to-void-900/50" />
                <div className="absolute top-10 right-10 w-32 h-32 bg-accent-600/10 rounded-2xl blur-2xl" />
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent-600/5 rounded-full blur-3xl" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-accent-600 mb-4">차수학</div>
                    <p className="text-void-300 text-sm">Premium Platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section className="py-20 lg:py-32 relative overflow-hidden bg-void-950">
        <div className="container-main relative z-10">
          <div className="mb-20">
            <span className="section-eyebrow">Our Strengths</span>
            <h2 className="section-title text-white mb-4">차수학만의 5가지 강점</h2>
            <div className="w-12 h-1 bg-accent-600 rounded-full" />
          </div>

          <Features />
        </div>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-main relative z-10">
          <div className="mb-16 text-center">
            <span className="section-eyebrow justify-center">Proven Results</span>
            <h2 className="section-title text-white mb-2 text-center">차수학의 성과</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Trophy, label: '전교 1등 배출', value: '42명', desc: '최근 3년간' },
              { icon: Users, label: '인서울 합격자', value: '150+', desc: '누적 성과' },
              { icon: BarChart3, label: '평균 성적 향상', value: '24점', desc: '점수 상승폭' }
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="card p-8 group hover:bg-accent-600/10 duration-500">
                  <Icon className="w-8 h-8 text-accent-600 mb-4" />
                  <p className="text-void-400 text-sm font-semibold mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-void-500">{stat.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ QUICK LINKS ============ */}
      <section className="py-20 lg:py-32 bg-void-950 relative overflow-hidden">
        <div className="container-main relative z-10">
          <div className="mb-16">
            <span className="section-eyebrow">Quick Access</span>
            <h2 className="section-title text-white">자주 찾는 서비스</h2>
          </div>
          <QuickLinks />
        </div>
      </section>

      {/* ============ NOTICE BOARD ============ */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-main relative z-10">
          <div className="mb-16">
            <span className="section-eyebrow">Updates</span>
            <h2 className="section-title text-white">공지사항</h2>
          </div>
          <NoticeBoard />
        </div>
      </section>

      {/* ============ PHILOSOPHY SECTION ============ */}
      <section className="py-20 lg:py-32 bg-void-950 relative overflow-hidden">
        <div className="container-main relative z-10">
          <div className="card p-12 lg:p-20 bg-gradient-to-br from-void-900 to-void-950 group">
            <div className="max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight break-keep-all">
                차수학의 교육 철학
              </h2>
              <p className="text-lg text-void-300 leading-relaxed mb-8 break-keep-all">
                학생 한 명 한 명의 꿈을 소중히 여기며, 검증된 교육방식과 철저한 관리로
                최고의 결과를 만들어냅니다. 부산 엄궁에서 시작된 차수학은 이제
                수학 교육의 새로운 기준이 되었습니다.
              </p>
              <Link href="/about" className="btn-primary">
                더 알아보기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-main relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 break-keep-all">
            지금 바로 시작하세요
          </h2>
          <p className="text-lg text-void-300 mb-12 break-keep-all max-w-2xl mx-auto">
            14일 무료 체험으로 차수학의 모든 기능을 경험해보세요.
            진정한 프리미엄 교육 경험이 기다리고 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissions" className="btn-primary text-base">
              무료 상담 신청
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="btn-secondary text-base">
              학원 둘러보기
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="py-16 lg:py-20 border-t border-void-800 bg-void-950/50">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">차</span>
                </div>
                <div>
                  <h4 className="text-white font-bold">차수학</h4>
                  <p className="text-xs text-void-400">Premium Math Academy</p>
                </div>
              </div>
              <p className="text-void-400 text-sm leading-relaxed break-keep-all">
                엄궁 최고의 수학 전문학원입니다. 철저한 관리와 검증된 성과로 신뢰받고 있습니다.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wider">학원 안내</h4>
              <ul className="space-y-3">
                {[
                  { name: '원장 인사말', href: '/about' },
                  { name: '개별관리 시스템', href: '/management' },
                  { name: '오시는 길', href: '/about' },
                  { name: '입시정보', href: '/info-board' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-void-400 hover:text-accent-600 text-sm transition-colors duration-300 break-keep-all">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wider">프로그램</h4>
              <ul className="space-y-3">
                {[
                  { name: '초등부 안내', href: '/programs/elementary' },
                  { name: '중등부 안내', href: '/programs/middle' },
                  { name: '고등부 안내', href: '/programs/high' },
                  { name: '전체 프로그램', href: '/programs' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-void-400 hover:text-accent-600 text-sm transition-colors duration-300 break-keep-all">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wider">입학 상담</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-accent-600 mt-1 flex-shrink-0" />
                  <span className="text-white font-semibold text-lg">051-311-0312</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent-600 mt-1 flex-shrink-0" />
                  <span className="text-void-400 text-sm break-keep-all">부산 사상구 엄궁로 186</span>
                </li>
                <li className="flex items-center gap-3 pt-2">
                  <Link href="https://blog.naver.com/snaker8" target="_blank" rel="noopener noreferrer" className="text-void-400 hover:text-accent-600 transition-colors">
                    <Globe className="w-4 h-4" />
                  </Link>
                  <Link href="/admissions" className="text-void-400 hover:text-accent-600 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="divider-subtle mb-8" />

          <div className="text-center">
            <p className="text-void-500 text-sm">
              © 2026 Cha Mathematics Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}
