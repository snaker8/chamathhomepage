import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '입학 안내 · 상담 예약',
  description:
    '엄궁차수학 입학 절차와 상담 예약 안내. 자체 진단 테스트로 실력을 먼저 재고 학생별로 교재를 지정합니다. 부산 사상구 엄궁동, 상담 051-311-0312.',
  alternates: { canonical: '/admissions' },
  openGraph: {
    title: '입학 안내 · 상담 예약 | 엄궁차수학',
    description: '진단 테스트 후 학생별 맞춤 교재 지정. 입학 절차와 상담 예약 안내.',
    url: '/admissions',
  },
}

export default function AdmissionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
