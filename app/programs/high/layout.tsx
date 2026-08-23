import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '고등부 수학 | 엄궁동 고등 내신·수능 수학학원',
  description:
    '엄궁차수학 고등부 교육 과정. 내신과 수능을 함께 준비하는 커리큘럼과 원장 직접 클리닉으로 관리합니다. 부산 사상구 엄궁동 고등 수학학원.',
  alternates: { canonical: '/programs/high' },
  openGraph: {
    title: '고등부 수학 | 엄궁차수학',
    description: '내신과 수능을 함께 준비하는 고등부 커리큘럼과 원장 직접 클리닉.',
    url: '/programs/high',
  },
}

export default function HighLayout({ children }: { children: React.ReactNode }) {
  return children
}
