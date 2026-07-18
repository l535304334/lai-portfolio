/**
 * Phase 7 线上性能验证（Vercel Production）
 *
 * 验证内容：
 * 1. 7 个路由全部可访问（HTTP 200）
 * 2. Core Web Vitals — Home（LCP/CLS/FCP/控制台错误）
 * 3. Core Web Vitals — Resume（含 callout 验证）
 * 4. Resume callout 渲染验证（Phase 7 核心交付）
 * 5. 全路由控制台错误扫描
 */
import { chromium } from 'playwright'

const BASE = 'https://lai-portfolio-xi.vercel.app'
const results = []
let passed = 0, failed = 0

function check(name, condition, detail = '') {
  if (condition) {
    passed++
    results.push({ name, status: 'PASS', detail })
    console.log('  PASS ' + name)
  } else {
    failed++
    results.push({ name, status: 'FAIL', detail })
    console.log('  FAIL ' + name + ' ' + detail)
  }
}

const THRESHOLDS = {
  LCP: 2500,
  CLS: 0.1,
  FCP: 1500,
}

const browser = await chromium.launch({ headless: true })

try {
  // ===== Test 1: 7 个路由全部可访问 =====
  console.log('=== Test 1: 7 个路由全部可访问（线上）===')
  const routes = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/skills', name: 'Skills' },
    { path: '/interview', name: 'Interview' },
    { path: '/ai-practice', name: 'AI Practice' },
    { path: '/resume', name: 'Resume' },
    { path: '/projects/jiangnan-travel', name: 'Project Detail' },
  ]

  const context1 = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  for (const r of routes) {
    const page = await context1.newPage()
    try {
      const response = await page.goto(BASE + r.path, { waitUntil: 'networkidle', timeout: 30000 })
      const status = response?.status() ?? 0
      check(`路由可访问: ${r.name} (${r.path}) HTTP 200`, status === 200, `status: ${status}`)
    } catch (err) {
      check(`路由可访问: ${r.name} (${r.path})`, false, `error: ${err.message}`)
    }
    await page.close()
  }
  await context1.close()

  // ===== Test 2: Core Web Vitals — Home =====
  console.log('\n=== Test 2: Core Web Vitals — Home（线上）===')

  const context2 = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page2 = await context2.newPage()

  await page2.addInitScript(() => {
    window.__perfMetrics = { lcp: [], cls: [], fcp: [] }
    new PerformanceObserver((list) => {
      list.getEntries().forEach((e) => window.__perfMetrics.lcp.push(e.startTime))
    }).observe({ type: 'largest-contentful-paint', buffered: true })
    new PerformanceObserver((list) => {
      list.getEntries().forEach((e) => {
        if (!e.hadRecentInput) window.__perfMetrics.cls.push(e.value)
      })
    }).observe({ type: 'layout-shift', buffered: true })
    new PerformanceObserver((list) => {
      list.getEntries().forEach((e) => window.__perfMetrics.fcp.push(e.startTime))
    }).observe({ type: 'paint', buffered: true })
  })

  const homeErrors = []
  page2.on('console', (msg) => {
    if (msg.type() === 'error') homeErrors.push(msg.text())
  })

  await page2.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 })
  await page2.waitForTimeout(3000)

  const homeMetrics = await page2.evaluate(() => {
    const m = window.__perfMetrics
    return {
      lcp: m.lcp.length > 0 ? Math.max(...m.lcp) : null,
      cls: m.cls.length > 0 ? m.cls.reduce((a, b) => a + b, 0) : 0,
      fcp: m.fcp.length > 0 ? m.fcp[0] : null,
    }
  })

  check(`Home LCP < 2.5s`, homeMetrics.lcp !== null && homeMetrics.lcp < THRESHOLDS.LCP, `LCP: ${homeMetrics.lcp?.toFixed(0)}ms`)
  check(`Home CLS < 0.1`, homeMetrics.cls < THRESHOLDS.CLS, `CLS: ${homeMetrics.cls.toFixed(4)}`)
  if (homeMetrics.fcp !== null) {
    check(`Home FCP < 1.5s`, homeMetrics.fcp < THRESHOLDS.FCP, `FCP: ${homeMetrics.fcp.toFixed(0)}ms`)
  }
  check(`Home 无控制台错误`, homeErrors.length === 0, `errors: ${homeErrors.length} ${JSON.stringify(homeErrors.slice(0, 3))}`)

  await context2.close()

  // ===== Test 3: Core Web Vitals — Resume + callout 验证 =====
  console.log('\n=== Test 3: Core Web Vitals — Resume + callout 验证（线上）===')

  const context3 = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page3 = await context3.newPage()

  await page3.addInitScript(() => {
    window.__perfMetrics = { lcp: [], cls: [], fcp: [] }
    new PerformanceObserver((list) => {
      list.getEntries().forEach((e) => window.__perfMetrics.lcp.push(e.startTime))
    }).observe({ type: 'largest-contentful-paint', buffered: true })
    new PerformanceObserver((list) => {
      list.getEntries().forEach((e) => {
        if (!e.hadRecentInput) window.__perfMetrics.cls.push(e.value)
      })
    }).observe({ type: 'layout-shift', buffered: true })
    new PerformanceObserver((list) => {
      list.getEntries().forEach((e) => window.__perfMetrics.fcp.push(e.startTime))
    }).observe({ type: 'paint', buffered: true })
  })

  const resumeErrors = []
  page3.on('console', (msg) => {
    if (msg.type() === 'error') resumeErrors.push(msg.text())
  })

  await page3.goto(BASE + '/resume', { waitUntil: 'networkidle', timeout: 30000 })
  await page3.waitForTimeout(3000)

  const resumeMetrics = await page3.evaluate(() => {
    const m = window.__perfMetrics
    return {
      lcp: m.lcp.length > 0 ? Math.max(...m.lcp) : null,
      cls: m.cls.length > 0 ? m.cls.reduce((a, b) => a + b, 0) : 0,
      fcp: m.fcp.length > 0 ? m.fcp[0] : null,
    }
  })

  check(`Resume LCP < 2.5s`, resumeMetrics.lcp !== null && resumeMetrics.lcp < THRESHOLDS.LCP, `LCP: ${resumeMetrics.lcp?.toFixed(0)}ms`)
  check(`Resume CLS < 0.1`, resumeMetrics.cls < THRESHOLDS.CLS, `CLS: ${resumeMetrics.cls.toFixed(4)}`)
  check(`Resume 无控制台错误`, resumeErrors.length === 0, `errors: ${resumeErrors.length} ${JSON.stringify(resumeErrors.slice(0, 3))}`)

  // ===== Test 4: Resume callout 渲染验证（Phase 7 核心交付）=====
  console.log('\n=== Test 4: Resume callout 渲染验证（Phase 7 核心交付）===')

  const calloutCheck = await page3.evaluate(() => {
    const callout = document.querySelector('.resume__callout')
    if (!callout) return { exists: false }
    const accent = callout.querySelector('.resume__callout-accent')
    const text = callout.querySelector('.resume__callout-text')
    const cs = window.getComputedStyle(callout)
    const accentCs = accent ? window.getComputedStyle(accent) : null
    return {
      exists: true,
      accentExists: !!accent,
      textExists: !!text,
      textContent: text?.textContent?.trim() || '',
      display: cs.display,
      backgroundColor: cs.backgroundColor,
      accentWidth: accentCs?.width || '',
      accentHeight: accentCs?.height || '',
      accentBackgroundColor: accentCs?.backgroundColor || '',
    }
  })

  check('callout 容器存在', calloutCheck.exists, '')
  check('Accent Line span 存在', calloutCheck.accentExists, '')
  check('callout 文本存在', calloutCheck.textExists, '')
  check('callout 文本内容正确', calloutCheck.textContent === '后端 · 分布式 · 工程', `actual: "${calloutCheck.textContent}"`)
  check('callout display = flex', calloutCheck.display === 'flex', `display: ${calloutCheck.display}`)
  check('Accent Line 宽度 = 3px', calloutCheck.accentWidth === '3px', `width: ${calloutCheck.accentWidth}`)
  check('Accent Line 高度 = 24px', calloutCheck.accentHeight === '24px', `height: ${calloutCheck.accentHeight}`)
  check('Accent Line 颜色 = Amber', calloutCheck.accentBackgroundColor === 'rgb(217, 119, 6)', `color: ${calloutCheck.accentBackgroundColor}`)

  await context3.close()

  // ===== Test 5: 全路由控制台错误扫描 =====
  console.log('\n=== Test 5: 全路由控制台错误扫描（线上）===')

  const context5 = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const allRouteErrors = []

  for (const r of routes) {
    const page = await context5.newPage()
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        allRouteErrors.push({ route: r.path, error: msg.text() })
      }
    })
    await page.goto(BASE + r.path, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(500)
    await page.close()
  }

  check(`全路由无控制台错误（7 个路由）`, allRouteErrors.length === 0, `errors: ${allRouteErrors.length} ${JSON.stringify(allRouteErrors.slice(0, 3))}`)

  await context5.close()

} catch (err) {
  failed++
  results.push({ name: '测试执行异常', status: 'FAIL', detail: err.message })
  console.log('异常: ' + err.message)
} finally {
  await browser.close()
}

console.log('')
console.log('='.repeat(60))
console.log('Phase 7 线上性能验证结果: ' + passed + ' 通过 / ' + failed + ' 失败 / ' + (passed + failed) + ' 总计')
console.log('='.repeat(60))

if (failed > 0) {
  console.log('\n失败项:')
  results.filter(r => r.status === 'FAIL').forEach(r => {
    console.log('  - ' + r.name + ': ' + r.detail)
  })
}

// 输出 Core Web Vitals 汇总
console.log('\n=== Core Web Vitals 汇总（线上 Vercel Production）===')
const homeLcp = results.find(r => r.name === 'Home LCP < 2.5s')
const homeCls = results.find(r => r.name === 'Home CLS < 0.1')
const resumeLcp = results.find(r => r.name === 'Resume LCP < 2.5s')
const resumeCls = results.find(r => r.name === 'Resume CLS < 0.1')
console.log('Home LCP:  ' + (homeLcp?.detail || 'N/A'))
console.log('Home CLS:  ' + (homeCls?.detail || 'N/A'))
console.log('Resume LCP: ' + (resumeLcp?.detail || 'N/A'))
console.log('Resume CLS: ' + (resumeCls?.detail || 'N/A'))

process.exit(failed > 0 ? 1 : 0)