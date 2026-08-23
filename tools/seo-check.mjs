#!/usr/bin/env node
/**
 * 운영 사이트(chamath-site.vercel.app) 가용성·SEO 점검.
 *
 * 왜 있나: 2026-08-23 에 배포는 "성공"인데 사이트가 죽은 상태가 두 번 있었다.
 * 빌드 로그·배포 상태는 멀쩡해 보였고 실제 HTTP 를 찔러서야 드러났다.
 *
 * 사용:
 *   node tools/seo-check.mjs          # 사람이 읽는 출력
 *   node tools/seo-check.mjs --log    # 문제일 때만 tools/seo-check.log 에 기록 (스케줄러용)
 *
 * 종료코드: 0 = 이상 없음, 1 = 문제 발견
 *
 * ⚠️ .cmd 배치를 끼우지 마라. 경로에 한글이 있는데 cmd.exe 가 UTF-8 배치를 못 읽어
 * 결과코드 9009 로 조용히 실패한다. 스케줄러가 node.exe 를 직접 부르게 한다.
 */
import { appendFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const SITE = process.env.SEO_CHECK_SITE ?? 'https://chamath-site.vercel.app'
const TO_LOG = process.argv.includes('--log')
const LOG_PATH = join(dirname(fileURLToPath(import.meta.url)), 'seo-check.log')

/** 이 사이트는 한 장짜리다. 하위 경로를 넣으면 안 된다 — 원래 없다. */
const PATHS = [
  '/',
  '/favicon.ico',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/robots.txt',
  '/sitemap.xml',
  '/photos/og-cover.jpg',
]

const problems = []
const notes = []

async function get(path, ms = 20000) {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), ms)
  try {
    return await fetch(SITE + path, { signal: ctl.signal, redirect: 'follow' })
  } finally {
    clearTimeout(timer)
  }
}

function report(lines, failed) {
  const text = lines.join('\n')
  if (TO_LOG) {
    // 이상 없는 날까지 쌓으면 아무도 로그를 안 본다. 문제일 때만 남긴다.
    if (failed) appendFileSync(LOG_PATH, text + '\n\n', 'utf8')
    return
  }
  ;(failed ? console.error : console.log)(text)
}

let home = null
for (const p of PATHS) {
  try {
    const res = await get(p)
    if (res.status !== 200) problems.push(`${p} → HTTP ${res.status} (200 이어야 함)`)
    else if (p === '/') home = await res.text()
  } catch (err) {
    problems.push(`${p} → 요청 실패: ${err.message}`)
  }
}

if (home) {
  const must = [
    [/<title>[^<]+<\/title>/, '<title> 이 없다'],
    [/name="description"/, 'meta description 이 없다'],
    [/application\/ld\+json/, '구조화 데이터(JSON-LD)가 없다 — 검색엔진이 업체 정보를 못 읽는다'],
    [/"telephone"/, '구조화 데이터에 전화번호가 빠졌다'],
    [/rel="canonical"/, 'canonical 이 없다'],
    [/og:image/, 'og:image 가 없다 — 카톡·SNS 공유 썸네일이 안 뜬다'],
    // 검색결과에 지구본이 뜨던 원인. 다시 빠지면 바로 알아야 한다.
    [/href="\/favicon\.ico"/, '파비콘 링크가 없다 — 검색결과에 기본 지구본이 뜬다'],
    [/max-image-preview:large/, 'robots 메타가 빠졌다 — 구글이 썸네일을 작게 쓴다'],
    [/naver-site-verification/, '네이버 소유확인 태그가 사라졌다 — 지우면 소유확인이 풀린다'],
  ]
  for (const [re, msg] of must) if (!re.test(home)) problems.push(msg)

  const title = home.match(/<title>([^<]+)<\/title>/)
  if (title) notes.push(`제목: ${title[1]}`)

  // 라이브가 엉뚱한 프로젝트로 바뀌었는지 본다 (2026-08-23 에 실제로 그랬다).
  if (!/엄궁/.test(home)) {
    problems.push('본문에 「엄궁」이 없다 — 다른 사이트가 배포됐을 수 있다')
  }
}

const stamp = new Date().toLocaleString('ko-KR')
if (problems.length > 0) {
  report(
    [`[${stamp}] 엄궁차수학 홈페이지 — 문제 ${problems.length}건`, `대상: ${SITE}`, ...problems.map((p) => `  ✗ ${p}`)],
    true
  )
  process.exit(1)
}

report(
  [
    `[${stamp}] 엄궁차수학 홈페이지 — 이상 없음`,
    `대상: ${SITE}`,
    `  ✓ 경로 ${PATHS.length}개 정상`,
    `  ✓ 제목·설명·구조화 데이터·파비콘·og·네이버 소유확인 확인`,
    ...notes.map((n) => `  · ${n}`),
  ],
  false
)
