import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '학원 소개 · 오시는 길',
  description:
    '부산 사상구 엄궁로 186 2층. 원장 경력 21년, 초·중·고 수학전문학원 엄궁차수학의 교육 철학과 찾아오시는 길을 안내합니다. 상담 051-311-0312.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: '학원 소개 · 오시는 길 | 엄궁차수학',
    description: '부산 사상구 엄궁로 186 2층. 원장 경력 21년 초·중·고 수학전문학원.',
    url: '/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
