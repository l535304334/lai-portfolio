import { chromium } from 'playwright'
const B = 'http://localhost:4180'
let p = 0, f = 0
const ck = (n, c, d = '') => { c ? p++ : f++; console.log((c ? 'OK ' : 'FAIL ') + n + (d ? ' ' + d : '')) }
async function m(v) {
  const b = await chromium.launch({ headless: true })
  const c = await b.newContext({ viewport: v })
  const pg = await c.newPage()
  await pg.addInitScript(() => {
    window.__perf = { lcp: 0, cls: 0, el: null }
    const o = new PerformanceObserver(l => {
      for (const e of l.getEntries()) {
        if (e.entryType === 'largest-contentful-paint') { window.__perf.lcp = e.startTime; window.__perf.el = e.element?.tagName || '?' }
        if (e.entryType === 'layout-shift' && !e.hadRecentInput) window.__perf.cls += e.value
      }
    })
    o.observe({ type: 'largest-contentful-paint', buffered: true })
    o.observe({ type: 'layout-shift', buffered: true })
  })
  await pg.goto(B, { waitUntil: 'networkidle' })
  await pg.waitForTimeout(3000)
  const r = await pg.evaluate(() => window.__perf)
  await b.close()
  return r
}
async function rv(w, h, name, expectVisible, expectGrid) {
  const b = await chromium.launch({ headless: true })
  const c = await b.newContext({ viewport: { width: w, height: h } })
  const pg = await c.newPage()
  await pg.goto(B, { waitUntil: 'networkidle' })
  const vis = await pg.locator('.hero__snippet').isVisible()
  ck(name + ' snippet ' + (expectVisible ? 'visible' : 'hidden'), expectVisible ? vis : !vis, 'vis=' + vis)
  if (expectGrid) {
    const g = await pg.evaluate(() => {
      const cols = window.getComputedStyle(document.querySelector('.hero__grid')).gridTemplateColumns
      const px = cols.split(' ').map(s => parseFloat(s))
      const total = px.reduce((a, b) => a + b, 0)
      return { cols, ratio: total > 0 ? px[0] / total : 0 }
    })
    const [a, b2] = expectGrid.split('/').map(s => parseInt(s))
    const expected = a / (a + b2)
    ck(name + ' grid ' + expectGrid, Math.abs(g.ratio - expected) < 0.02, `ratio=${g.ratio.toFixed(3)} expected=${expected.toFixed(3)} cols=${g.cols}`)
  }
  await b.close()
}
console.log('=== Phase 2 Verify ===')
console.log('--- Desktop LCP/CLS ---')
const d = await m({ width: 1280, height: 800 })
ck('Desktop LCP<=2500', d.lcp <= 2500, d.lcp.toFixed(0) + 'ms')
ck('Desktop LCP<=2338 (50ms reg)', d.lcp <= 2338, d.lcp.toFixed(0) + 'ms (base 2288)')
ck('Desktop CLS<=0.1', d.cls <= 0.1, d.cls.toFixed(4))
ck('Desktop CLS~0', d.cls <= 0.01, d.cls.toFixed(4))
console.log('  LCP=' + d.lcp.toFixed(0) + 'ms CLS=' + d.cls.toFixed(4) + ' el=' + d.el)
console.log('--- Mobile LCP/CLS ---')
const mo = await m({ width: 375, height: 667 })
ck('Mobile LCP<=2500', mo.lcp <= 2500, mo.lcp.toFixed(0) + 'ms')
ck('Mobile LCP<=562 (50ms reg)', mo.lcp <= 562, mo.lcp.toFixed(0) + 'ms (base 512)')
ck('Mobile CLS<=0.1', mo.cls <= 0.1, mo.cls.toFixed(4))
console.log('  LCP=' + mo.lcp.toFixed(0) + 'ms CLS=' + mo.cls.toFixed(4) + ' el=' + mo.el)
console.log('--- Responsive ---')
await rv(1280, 800, 'Desktop 1280', true, '6fr/4fr')
await rv(800, 1024, 'Tablet 800', false, '7fr/5fr')
await rv(1023, 768, 'Tablet 1023', false)
await rv(1024, 768, 'Desktop 1024', true)
await rv(375, 667, 'Mobile 375', true)
console.log('--- Shiki & Semantic ---')
const b = await chromium.launch({ headless: true })
const c = await b.newContext({ viewport: { width: 1280, height: 800 } })
const pg = await c.newPage()
await pg.goto(B, { waitUntil: 'networkidle' })
ck('shiki rendered', (await pg.locator('.hero__snippet .shiki').count()) > 0)
ck('acquireLock present', ((await pg.locator('.hero__snippet').textContent()) || '').includes('acquireLock'))
ck('figcaption text', (await pg.locator('.hero__snippet-header').textContent())?.trim() === '// distributed-lock.ts')
ck('shiki tabindex=0', (await pg.locator('.hero__snippet .shiki').getAttribute('tabindex')) === '0')
ck('eyebrow no reveal', (await pg.locator('.hero__eyebrow').getAttribute('data-reveal')) === null)
ck('title no reveal', (await pg.locator('.hero__title').getAttribute('data-reveal')) === null)
ck('snippet no reveal', (await pg.locator('.hero__snippet').getAttribute('data-reveal')) === null)
ck('stats-grid has reveal', (await pg.locator('.hero__stats-grid').getAttribute('data-reveal')) !== null)
const mfs = await pg.evaluate(() => { const s = document.querySelector('.hero__snippet .shiki'); return s ? window.getComputedStyle(s).fontSize : 'nf' })
ck('Desktop font 14px', mfs === '14px', mfs)
await c.close()
const c2 = await b.newContext({ viewport: { width: 375, height: 667 } })
const pg2 = await c2.newPage()
await pg2.goto(B, { waitUntil: 'networkidle' })
const mfs2 = await pg2.evaluate(() => { const s = document.querySelector('.hero__snippet .shiki'); return s ? window.getComputedStyle(s).fontSize : 'nf' })
ck('Mobile font 12px', mfs2 === '12px', mfs2)
await c2.close()
await b.close()
console.log('\n' + '='.repeat(40))
console.log('Result: ' + p + ' passed / ' + f + ' failed')
if (f > 0) process.exit(1)
