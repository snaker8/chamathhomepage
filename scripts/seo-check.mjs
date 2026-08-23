#!/usr/bin/env node
/**
 * 라이브 사이트 SEO·가용성 점검.
 *
 * 왜 있나: 2026-08-23 에 배포는 "성공"인데 모든 페이지가 404 인 상태로
 * 사이트가 두 번 죽었다. 빌드 로그만 보면 멀쩡해 보였고, 실제 HTTP 응답을
 * 확인하고 나서야 드러났다. 그래서 빌드가 아니라 **살아있는 사이트**를 찌른다.
 *
 * 사용:
 *   node scripts/seo-check.mjs            # 사람이 읽는 출력
 *   node scripts/seo-check.mjs --quiet    # 문제 있을 때만 출력 (스케줄러용)
 *
 * 종료코드: 0 = 이상 없음, 1 = 문제 발견 (스케줄러가 이걸로 판단한다)
 */

const SITE = process.env.SEO_CHECK_SITE ?? 'https://chamath-site.vercel.app'
const QUIET = process.argv.includes('--quiet')

/** 살아 있어야 하는 공개 페이지. 하나라도 404 면 사이트가 깨진 것이다. */
const PUBLIC_PAGES = [
  '/',
  '/about',
  '/admissions',
  '/programs',
  '/programs/elementary',
  '/programs/middle',
  '/programs/high',
  '/management',
  '/info-board',
]

/** 검색엔진이 읽는 파일들. */
const SEO_ASSETS = ['/favicon.ico', '/icon', '/apple-icon', '/sitemap.xml', '/robots.txt']

const problems = []
const notes = []

async function fetchWithTimeout(url, ms = 20000) {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), ms)
  try {
    return await fetch(url, { signal: ctl.signal, redirect: 'follow' })
  } finally {
    clearTimeout(timer)
  }
}

async function checkStatus(path) {
  try {
    const res = await fetchWithTimeout(SITE + path)
    if (res.status !== 200) {
      problems.push(`${path} → HTTP ${res.status} (200 이어야 함)`)
      return null
    }
    return res
  } catch (err) {
    problems.push(`${path} → 요청 실패: ${err.message}`)
    return null
  }
}

async function main() {
  // 1) 공개 페이지가 전부 살아 있는가
  for (const path of PUBLIC_PAGES) {
    await checkStatus(path)
  }

  // 2) 검색엔진용 파일이 살아 있는가
  for (const path of SEO_ASSETS) {
    await checkStatus(path)
  }

  // 3) 홈페이지에 SEO 핵심 요소가 실제로 박혀 있는가
  const home = await checkStatus('/')
  if (home) {
    const html = await home.text()

    if (!/<title>[^<]+<\/title>/.test(html)) {
      problems.push('홈페이지에 <title> 이 없다')
    }
    if (!/name="description"/.test(html)) {
      problems.push('홈페이지에 meta description 이 없다')
    }
    if (!/application\/ld\+json/.test(html)) {
      problems.push('홈페이지에 구조화 데이터(JSON-LD)가 없다 — 검색엔진이 업체 정보를 못 읽는다')
    }
    if (!/"telephone"/.test(html)) {
      problems.push('구조화 데이터에 전화번호가 빠졌다')
    }
    // 검색결과에 지구본이 뜨던 원인. 다시 빠지면 바로 알아야 한다.
    if (!/rel="icon"|favicon\.ico/.test(html)) {
      problems.push('홈페이지에 파비콘 링크가 없다 — 검색결과에 기본 지구본이 뜬다')
    }
  }

  // 4) 페이지마다 제목이 다른가 (전부 같으면 구글이 중복 페이지로 본다)
  const titles = new Map()
  for (const path of ['/', '/about', '/admissions', '/programs', '/management', '/info-board']) {
    try {
      const res = await fetchWithTimeout(SITE + path)
      if (!res.ok) continue
      const html = await res.text()
      const m = html.match(/<title>([^<]+)<\/title>/)
      if (m) titles.set(path, m[1])
    } catch {
      // 위에서 이미 상태코드로 잡힌다
    }
  }
  const unique = new Set(titles.values())
  if (titles.size > 1 && unique.size === 1) {
    problems.push(`페이지 ${titles.size}개의 <title> 이 전부 같다 — 구글이 중복 페이지로 본다`)
  } else if (titles.size > 1 && unique.size < titles.size) {
    notes.push(`제목 중복 있음: ${titles.size}개 중 고유 ${unique.size}개`)
  }

  // 5) sitemap 에 적힌 주소가 실제로 살아 있는가 (죽은 주소를 구글에 알리면 안 된다)
  try {
    const res = await fetchWithTimeout(SITE + '/sitemap.xml')
    if (res.ok) {
      const xml = await res.text()
      const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
      for (const loc of locs) {
        const r = await fetchWithTimeout(loc).catch(() => null)
        if (!r || r.status !== 200) {
          problems.push(`sitemap 에 있는 ${loc} 가 죽어 있다 (HTTP ${r ? r.status : '요청실패'})`)
        }
      }
      if (locs.length === 0) problems.push('sitemap.xml 에 주소가 하나도 없다')
      else notes.push(`sitemap 주소 ${locs.length}개 전부 확인`)
    }
  } catch (err) {
    problems.push(`sitemap 확인 실패: ${err.message}`)
  }

  const stamp = new Date().toLocaleString('ko-KR')

  if (problems.length > 0) {
    console.error(`[${stamp}] 엄궁차수학 홈페이지 점검 — 문제 ${problems.length}건`)
    console.error(`대상: ${SITE}`)
    for (const p of problems) console.error(`  ✗ ${p}`)
    process.exit(1)
  }

  if (!QUIET) {
    console.log(`[${stamp}] 엄궁차수학 홈페이지 점검 — 이상 없음`)
    console.log(`대상: ${SITE}`)
    console.log(`  ✓ 공개 페이지 ${PUBLIC_PAGES.length}개 정상`)
    console.log(`  ✓ 검색엔진 파일 ${SEO_ASSETS.length}개 정상`)
    console.log(`  ✓ 제목·설명·구조화 데이터·파비콘 확인`)
    for (const n of notes) console.log(`  · ${n}`)
  }
}

main().catch((err) => {
  console.error(`점검 스크립트 자체가 실패했다: ${err.stack ?? err.message}`)
  process.exit(1)
})
