'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, FileText, BarChart2, ClipboardList,
  UserCheck, CalendarCheck, Users, Target, X
} from 'lucide-react'

/* ── Image Data ── */
const screenshots = [
  {
    src: '/images/management/01-unit-analysis.png',
    alt: '단원분석',
    title: '단원별 성취도 컬러맵',
    desc: '각 소단원별 이해도를 컬러맵으로 시각화합니다. 난이도(기본/실력/심화)별 분석으로 학생이 어느 수준에서 막히는지 정확히 파악합니다.',
    tag: '핵심 분석',
    tagColor: 'text-blue-400 bg-blue-500/10',
    span: 'md:col-span-4',
  },
  {
    src: '/images/management/02-student-report.png',
    alt: '리포트',
    title: '학생별 학습 리포트',
    desc: '일자별 교재·단원·확인학습 점수, 오답유사학습 결과까지 상세 기록',
    tag: '리포트',
    tagColor: 'text-purple-400 bg-purple-500/10',
    span: 'md:col-span-2',
  },
  {
    src: '/images/management/03-daily-tracking.png',
    alt: '일일학습',
    title: '일일 학습 이력 모니터링',
    desc: '매일의 정답률을 컬러 도트로 추적하여 학습 패턴과 취약 시점을 파악합니다',
    tag: '학습 추적',
    tagColor: 'text-emerald-400 bg-emerald-500/10',
    span: 'md:col-span-3',
  },
  {
    src: '/images/management/04-problem-analysis.png',
    alt: '풀이분석',
    title: '문제별 풀이 과정 분석',
    desc: '맞은 문제도 풀이 키 포인트를 확인하고, 틀린 문제는 원인을 정확히 분석합니다',
    tag: '풀이 분석',
    tagColor: 'text-amber-400 bg-amber-500/10',
    span: 'md:col-span-3',
  },
  {
    src: '/images/management/05-class-management.png',
    alt: '수업관리',
    title: '체계적 수업 및 교재 관리',
    desc: '수업 진도, 교재 진행 상황, 과제 현황 통합 관리',
    tag: '수업 관리',
    tagColor: 'text-zinc-400 bg-zinc-500/10',
    span: 'md:col-span-3',
  },
  {
    src: '/images/management/06-weekly-clinic.png',
    alt: '주간클리닉',
    title: '주간 클리닉 시스템',
    desc: '분석 데이터 기반 학생별 취약 문제 자동 재구성, 정밀 타겟 보충 학습',
    tag: '클리닉',
    tagColor: 'text-blue-400 bg-blue-500/10',
    span: 'md:col-span-3',
  },
]

const processSteps = [
  { icon: FileText, title: '데이터 수집', desc: '단원별 문제 풀이, 정답·오답·풀이 시간 실시간 기록' },
  { icon: BarChart2, title: '다각도 분석', desc: '단원·유형·서술형·고난도 분석으로 취약점 자동 진단' },
  { icon: ClipboardList, title: '리포트 생성', desc: '학생별 학습 이력·성취도 리포트 자동 생성' },
  { icon: UserCheck, title: '원장 클리닉', desc: '분석 기반 원장 직접 1:1 맞춤 클리닉' },
]

const clinicFeatures = [
  { icon: CalendarCheck, title: '시험 4주 전부터 매주 주말', desc: '시험대비 기간에 집중적으로 진행하며, 시간은 개별 통보드립니다' },
  { icon: Users, title: '원장 직접 1:1 진행', desc: '학생별 분석 데이터를 기반으로 한 맞춤형 개인 클리닉' },
  { icon: Target, title: '핵심 포인트 및 실전 팁', desc: '틀린 문제는 물론, 맞은 문제의 풀이 키 포인트까지 정리해드립니다' },
]

/* ── Scroll Reveal Hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, className: visible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8' }
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, className: revealCls } = useReveal()
  return (
    <div ref={ref} className={`${revealCls} ${className} transition-all duration-700`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ── Lightbox ── */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center cursor-zoom-out" onClick={onClose}>
      <button className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors" onClick={onClose}>
        <X className="w-8 h-8" />
      </button>
      <img src={src} alt={alt} className="max-w-[94%] max-h-[92vh] rounded-lg" />
    </div>
  )
}

/* ── Main Page ── */
export default function ManagementPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <div className="min-h-[100dvh] bg-void-950 text-white">
      {/* ═══ Section Nav (right-aligned, fixed) ═══ */}
      <nav className="fixed top-20 right-4 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-30 glass rounded-full px-4 sm:px-6 py-2 flex items-center gap-3 sm:gap-5">
        <a href="#system" className="text-[10px] sm:text-xs text-void-400 hover:text-white transition-colors whitespace-nowrap">관리 시스템</a>
        <a href="#analysis" className="text-[10px] sm:text-xs text-void-400 hover:text-white transition-colors whitespace-nowrap">분석 기능</a>
        <a href="#clinic" className="text-[10px] sm:text-xs text-void-400 hover:text-white transition-colors whitespace-nowrap">클리닉 안내</a>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="system" className="min-h-[100dvh] relative flex items-center overflow-hidden">
        {/* Gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-accent-900/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-void-800/40 rounded-full blur-[100px]" />
        </div>

        <div className="container-main relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center py-24 lg:py-0">
            {/* Left: Text (3/5) */}
            <div className="lg:col-span-3 space-y-8">
              <Reveal>
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-600 animate-pulse" />
                  <span className="text-xs font-medium text-void-400">2026 중·고등 수학 개별 관리</span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight break-keep-all">
                  데이터로 분석하고<br />
                  <span className="text-accent-600">원장이 직접</span> 책임집니다
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-base md:text-lg text-void-400 leading-relaxed max-w-[52ch] break-keep-all">
                  학생 한 명 한 명의 학습 데이터를 정밀 분석하여 취약 단원과 유형을 진단하고,
                  시험대비 기간에는 원장이 직접 맞춤형 개인 클리닉을 진행합니다.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-wrap gap-4">
                  <a href="#clinic" className="btn-primary text-base">
                    클리닉 안내 보기
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#analysis" className="btn-secondary text-base">
                    분석 기능 살펴보기
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right: Process Cards (2/5) */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {processSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <Reveal key={i} delay={100 * (i + 1)}>
                    <div className="card p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent-600/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-accent-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-0.5">{step.title}</h4>
                        <p className="text-xs text-void-500 break-keep-all">{step.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ANALYSIS: Bento Grid ═══ */}
      <section id="analysis" className="py-24 lg:py-32 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-void-700 to-transparent" />

        <div className="container-main">
          <div className="mb-16">
            <Reveal>
              <span className="section-eyebrow">Analysis Features</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight break-keep-all mt-4">
                실제 프로그램으로 확인하는<br />관리 시스템
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-void-500 text-sm mt-3 break-keep-all">
                학생 개인정보 보호를 위해 이름은 모자이크 처리하였습니다
              </p>
            </Reveal>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {screenshots.map((item, i) => (
              <Reveal key={i} className={item.span} delay={100 * i}>
                <div className="card rounded-2xl overflow-hidden group h-full">
                  <div className="p-6 pb-4">
                    <div className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${item.tagColor} px-2.5 py-1 rounded-md tracking-wide uppercase mb-3`}>
                      {item.tag}
                    </div>
                    <h3 className="text-base font-semibold break-keep-all">{item.title}</h3>
                    <p className="text-xs text-void-500 mt-1 break-keep-all">{item.desc}</p>
                  </div>
                  <div className="border-t border-white/5 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full cursor-zoom-in hover:opacity-90 transition-opacity"
                      onClick={() => setLightbox({ src: item.src, alt: item.alt })}
                      loading="lazy"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLINIC ANNOUNCEMENT ═══ */}
      <section id="clinic" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-accent-900/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-void-800/30 rounded-full blur-[100px]" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-600/30 to-transparent" />

        <div className="container-main relative z-10">
          <div className="text-center mb-16">
            <Reveal>
              <span className="section-eyebrow justify-center">시험대비 특별 프로그램</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight break-keep-all mt-4">
                원장 개인 클리닉 안내
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div className="space-y-4">
                <p className="text-base md:text-lg text-void-400 leading-loose break-keep-all">
                  <strong className="text-white font-semibold">시험 4주 전부터</strong> 매주 주말,
                  원장이 직접 진행하는 개인 클리닉을 시행합니다.
                </p>
                <p className="text-base md:text-lg text-void-400 leading-loose break-keep-all">
                  프로그램에서 분석된 학생별 데이터를 바탕으로{' '}
                  <strong className="text-white font-semibold">틀린 문제의 유형과 원인</strong>을 정밀 분석하고,
                  맞았더라도 <strong className="text-white font-semibold">풀이 과정의 키 포인트와 실전 팁</strong>을 짚어드립니다.
                </p>
                <p className="text-base md:text-lg text-void-400 leading-loose break-keep-all">
                  단순 문제 풀이가 아닌, 시험에서 실수를 줄이고 점수를 올리는{' '}
                  <strong className="text-white font-semibold">전략적 클리닉</strong>입니다.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col gap-4">
              {clinicFeatures.map((item, i) => {
                const Icon = item.icon
                return (
                  <Reveal key={i} delay={100 * (i + 1)}>
                    <div className="card p-7 flex items-start gap-5">
                      <div className="w-12 h-12 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-accent-600" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-void-500 break-keep-all">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-void-700 to-transparent" />
        <div className="container-main text-center">
          <Reveal>
            <div className="card rounded-3xl px-8 py-14 md:px-16 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-accent-600/40 to-transparent" />
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight break-keep-all mb-4">
                차수학은 <span className="text-accent-600">데이터</span>로 관리하고<br />
                <span className="text-accent-600">원장</span>이 직접 책임집니다
              </h3>
              <p className="text-void-500 text-sm break-keep-all mb-8">
                궁금하신 점은 학원으로 편하게 문의해 주세요
              </p>
              <Link href="/admissions" className="btn-primary text-base inline-flex">
                입학 상담 신청
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Privacy Note ═══ */}
      <div className="container-main pb-8">
        <p className="text-xs text-void-600 text-center break-keep-all">
          학생 개인정보 보호를 위해 이름은 모자이크 처리하였습니다
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </div>
  )
}
