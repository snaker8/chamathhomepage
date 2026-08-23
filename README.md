# 엄궁차수학 운영 홈페이지 (chamath-site.vercel.app)

**지금 실제로 서비스 중인 사이트.** `src/index.html` 한 장짜리 정적 사이트다.

## 🔴 옆의 `academy-platform` 과 헷갈리지 마라

같은 상위 폴더에 `academy-platform` (Next.js 앱)이 있는데 **그건 라이브가 아니다.**
전혀 다른 프로젝트이고, GitHub `snaker8/chamathhomepage` 의 `main` 브랜치가 그 코드다.

2026-08-23 에 그걸 라이브인 줄 알고 배포했다가 **운영 사이트를 통째로 갈아치웠다.**
하위 페이지(`/about`, `/programs` …)가 404 나던 것도 여기서 비롯됐다 —
이 사이트는 원래 한 장짜리라 그런 경로가 존재하지 않는다.

| | 이 폴더 (`운영사이트`) | 옆 폴더 (`academy-platform`) |
|---|---|---|
| 정체 | 정적 HTML 한 장 | Next.js 16 앱 |
| 라이브 | ✅ chamath-site.vercel.app | ❌ 배포된 적 없음 |
| git | `운영중` 브랜치 | `main` 브랜치 |

## 이 코드는 어디서 왔나

로컬에도 저장소에도 없었다. Vercel 배포(`dpl_9cTLM7FcXwm2yxUrWRQY5SAxsgVN`,
커밋 `b80b330`, 브랜치 `회사역량업데이트`)에 업로드돼 있던 원본을 API 로 받아왔다.
그 브랜치는 GitHub 어디에도 푸시된 적이 없어서, **Vercel 이 유일한 사본이었다.**
그래서 여기에 남긴다.

## 구조

```
src/
  index.html          한 장짜리 본문 (49KB)
  robots.txt          네이버 Yeti · 다음 Daumoa 명시
  sitemap.xml
  photos/
    og-cover.jpg      1200x630 공유 커버
    det/f1-hall.jpg   1400x1400
    det/f3-board-a.jpg
    det/f4-board-b.jpg
```

Vercel 은 `src/` 를 루트로 서빙한다. 프로젝트 설정의 `framework` 는 **null 이 맞다**
(정적 사이트라 Next.js 프리셋을 넣으면 안 된다).

## 이미 되어 있는 SEO

meta description · JSON-LD LocalBusiness(상호·주소·전화) · og:title/og:image ·
canonical · robots.txt · sitemap.xml.

**빠진 것: 파비콘.** 그래서 검색결과 주소 앞에 기본 지구본이 뜬다.

## 배포

⚠️ **자동배포는 꺼져 있다** (2026-08-23, 사고 후 `vercel git disconnect`).
`main` 에 push 해도 라이브는 안 바뀐다 — 의도된 상태다.

되돌릴 일이 생기면:

```bash
vercel alias set chamath-site-5qjvg5aui-chamath.vercel.app chamath-site.vercel.app
```
