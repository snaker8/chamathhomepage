import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '입시정보 게시판',
  description:
    '엄궁차수학이 정리한 내신·입시 정보 게시판. 학교별 시험 일정과 학년 전환기에 챙겨야 할 내용을 학부모께 공유합니다.',
  alternates: { canonical: '/info-board' },
  openGraph: {
    title: '입시정보 게시판 | 엄궁차수학',
    description: '내신·입시 정보와 학교별 시험 일정 안내.',
    url: '/info-board',
  },
}

export default function InfoBoardLayout({ children }: { children: React.ReactNode }) {
  return children
}
