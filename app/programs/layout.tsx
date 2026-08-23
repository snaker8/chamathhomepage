import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '교육 프로그램 | 초등·중등·고등 수학 커리큘럼',
  description:
    '엄궁차수학의 초등부·중등부·고등부 수학 커리큘럼. 학년별 진도가 아니라 학생별 진도로, 진단 결과에 맞춘 교재와 클리닉을 운영합니다. 부산 사상구 엄궁동.',
  alternates: { canonical: '/programs' },
  openGraph: {
    title: '교육 프로그램 | 엄궁차수학',
    description: '초등·중등·고등 수학 커리큘럼. 학생별 진도와 맞춤 교재 운영.',
    url: '/programs',
  },
}

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return children
}
