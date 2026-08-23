import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '초등부 수학 | 엄궁동 초등 수학학원',
  description:
    '엄궁차수학 초등부 교육 과정. 연산 습관과 개념 이해를 함께 잡아 중등 수학으로 넘어갈 기초를 만듭니다. 부산 사상구 엄궁동 초등 수학학원.',
  alternates: { canonical: '/programs/elementary' },
  openGraph: {
    title: '초등부 수학 | 엄궁차수학',
    description: '연산 습관과 개념 이해를 함께 잡는 초등부 과정. 부산 사상구 엄궁동.',
    url: '/programs/elementary',
  },
}

export default function ElementaryLayout({ children }: { children: React.ReactNode }) {
  return children
}
