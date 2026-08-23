/**
 * 파비콘 생성기. `src/` 에 favicon.ico · favicon.svg · apple-touch-icon.png 를 만든다.
 *
 * 왜 있나: 파비콘이 없어서 네이버·구글 검색결과 주소 앞에 기본 지구본이 떴다.
 *
 * 색은 사이트 디자인 규칙을 따른다 — 다크(#191D20) 바탕에 골드(#B8A06A) 글자.
 * ⚠️ 브랜드 노랑(#FFC400)은 1차 CTA 버튼 한 곳 전용이라 여기 쓰지 않는다.
 *
 * 실행:
 *   node tools/make-favicon.mjs
 *
 * 이 사이트는 정적 HTML 이라 의존성이 없다. sharp 는 옆 프로젝트
 * (academy-platform)의 것을 빌려 쓴다. 여기에 node_modules 를 만들지 않으려는 것이다.
 * 옆 프로젝트가 없어지면 SHARP_PATH 로 다른 경로를 넘기면 된다.
 */
import { createRequire } from 'node:module'
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const SRC = join(ROOT, 'src')

const sharpHome = process.env.SHARP_PATH ?? join(dirname(ROOT), 'academy-platform')
if (!existsSync(join(sharpHome, 'node_modules', 'sharp'))) {
  console.error(`sharp 를 못 찾았다: ${sharpHome}/node_modules/sharp`)
  console.error('SHARP_PATH 환경변수로 sharp 가 설치된 프로젝트 경로를 넘겨라.')
  process.exit(1)
}
const require = createRequire(join(sharpHome, 'noop.js'))
const sharp = require('sharp')
const BG = '#191D20'
const FG = '#B8A06A'

/** 글자가 너무 크면 16px 로 줄었을 때 획이 뭉갠다. 여백을 넉넉히 준다. */
const svgFor = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="${BG}"/>
  <text x="${size / 2}" y="${size / 2}" font-family="Malgun Gothic, Pretendard, sans-serif"
        font-size="${Math.round(size * 0.62)}" font-weight="700" fill="${FG}"
        text-anchor="middle" dominant-baseline="central">차</text>
</svg>`

const png = (size) => sharp(Buffer.from(svgFor(size))).png().toBuffer()

/** ICO 컨테이너. PNG 를 그대로 품는 형식(Vista 이후 표준). */
function wrapIco(entries) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(entries.length, 4)

  let offset = 6 + entries.length * 16
  const dir = []
  for (const e of entries) {
    const b = Buffer.alloc(16)
    b.writeUInt8(e.size >= 256 ? 0 : e.size, 0)
    b.writeUInt8(e.size >= 256 ? 0 : e.size, 1)
    b.writeUInt8(0, 2)
    b.writeUInt8(0, 3)
    b.writeUInt16LE(1, 4)
    b.writeUInt16LE(32, 6)
    b.writeUInt32LE(e.data.length, 8)
    b.writeUInt32LE(offset, 12)
    dir.push(b)
    offset += e.data.length
  }
  return Buffer.concat([header, ...dir, ...entries.map((e) => e.data)])
}

mkdirSync(SRC, { recursive: true })

// 1) favicon.ico — 크롤러와 구형 브라우저는 /favicon.ico 를 그냥 찍어본다.
//    16·32·48 을 함께 담아 어느 크기로 쓰이든 뭉개지지 않게 한다.
const icoSizes = [16, 32, 48]
const icoEntries = []
for (const size of icoSizes) {
  icoEntries.push({ size, data: await png(size) })
}
const ico = wrapIco(icoEntries)
writeFileSync(join(SRC, 'favicon.ico'), ico)
console.log(`favicon.ico  ${ico.length} bytes (${icoSizes.join('·')}px)`)

// 2) apple-touch-icon.png — iOS 홈 화면 추가용.
const apple = await png(180)
writeFileSync(join(SRC, 'apple-touch-icon.png'), apple)
console.log(`apple-touch-icon.png  ${apple.length} bytes (180px)`)

// 3) favicon.svg — 고해상도 화면에서 선명하다.
//    ⚠️ text 그대로 두면 보는 사람 PC 에 그 폰트가 없을 때 다른 글꼴로 나온다.
//    sharp 로 만든 512px PNG 를 그대로 품어서 렌더링 결과를 고정한다.
const big = await png(512)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
<image width="512" height="512" xlink:href="data:image/png;base64,${big.toString('base64')}"/>
</svg>`
writeFileSync(join(SRC, 'favicon.svg'), svg)
console.log(`favicon.svg  ${svg.length} bytes`)

console.log('완료 →', SRC)
