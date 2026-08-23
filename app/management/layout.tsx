import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개별 관리 시스템 | 학생별 학습 리포트',
  description:
    '엄궁차수학의 데이터 기반 개별 관리. 단원별 성취도 컬러맵, 일일 학습 이력, 문제별 풀이 분석, 주간 클리닉으로 학생이 어디서 막히는지 정확히 짚습니다.',
  alternates: { canonical: '/management' },
  openGraph: {
    title: '개별 관리 시스템 | 엄궁차수학',
    description: '단원별 성취도 컬러맵, 일일 학습 이력, 문제별 풀이 분석, 주간 클리닉.',
    url: '/management',
  },
}

export default function ManagementLayout({ children }: { children: React.ReactNode }) {
  return children
}
