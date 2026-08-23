import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '중등부 수학 | 엄궁동 중등 내신 수학학원',
  description:
    '엄궁차수학 중등부 교육 과정. 학교 기출 분석과 내신 대비, 단원별 취약점 클리닉으로 중학 수학을 관리합니다. 엄궁중·학장중 내신 대비.',
  alternates: { canonical: '/programs/middle' },
  openGraph: {
    title: '중등부 수학 | 엄궁차수학',
    description: '학교 기출 분석과 내신 대비, 단원별 취약점 클리닉. 부산 사상구 엄궁동.',
    url: '/programs/middle',
  },
}

export default function MiddleLayout({ children }: { children: React.ReactNode }) {
  return children
}
