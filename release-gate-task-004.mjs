/**
 * Task 004 Release Gate — Playwright 全量回归测试
 * 覆盖：首页 + 项目详情 + 面试页 + AI 实践页 + 导航 + 404 + 响应式
 */
import { chromium } from 'playwright'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const BASE = 'http://localhost:5175'
const SCREENSHOT_DIR = 'C:\\Users\\lai\\AppData\\Local\\Temp\\trae-task-004-screenshots'
mkdirSync(SCREENSHOT_DIR, { recursive: true })

const results = []
let passed = 0
let failed = 0

function log(msg) {
  console.log(msg)
}

function check(name, condition, detail = '') {
  if (condition) {
    passed++
    results.push({ name, status: 'PASS', detail })
    log(`  ✅ ${name}`)
  } else {
    failed++
    results.push({ name, status: 'FAIL', detail })
    log(`  ❌ ${name} ${detail}`)
  }
}

async function screenshot(page, name) {
  const path = resolve(SCREENSHOT_DIR, `${name}.png`)
  await page.screenshot({ path, fullPage: true })
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
})
const page = await context.newPage()

const consoleErrors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') {
    consoleErrors.push(msg.text())
  }
})
page.on('pageerror', (err) => {
  consoleErrors.push(err.message)
})

try {
  // ===== Test 1: 首页 =====
  log('\n=== Test 1: 首页渲染 ===')
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const h1 = await page.locator('h1').count()
  check('首页 h1 存在', h1 >= 1, `h1 count: ${h1}`)
  const projectCards = await page.locator('.card').count()
  check('首页项目卡片 >= 3', projectCards >= 3, `cards: ${projectCards}`)
  await screenshot(page, '01-home')

  // ===== Test 2: 江南出行详情页 =====
  log('\n=== Test 2: 江南出行详情页 ===')
  await page.goto(`${BASE}/projects/jiangnan-travel`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const detailH1 = await page.locator('h1').count()
  check('详情页 h1 存在', detailH1 >= 1)
  const detailH2 = await page.locator('h2').count()
  check('详情页 h2 存在', detailH2 >= 1, `h2 count: ${detailH2}`)
  const detailTable = await page.locator('table').count()
  check('详情页表格存在', detailTable >= 1)
  await screenshot(page, '02-project-detail')

  // ===== Test 3: 面试准备页 =====
  log('\n=== Test 3: 面试准备页 ===')
  await page.goto(`${BASE}/interview`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)

  const interviewH1 = await page.locator('h1').count()
  check('面试页 h1 存在', interviewH1 >= 1)

  const interviewH2 = await page.locator('.category__title').count()
  check('面试页分类数 = 4', interviewH2 === 4, `categories: ${interviewH2}`)

  const qaDetails = await page.locator('details').count()
  check('面试页 Q&A 数 >= 17', qaDetails >= 17, `details count: ${qaDetails}`)

  const chevronIcons = await page.locator('.qa__chevron').count()
  check('面试页 chevron 图标存在', chevronIcons >= 17, `chevrons: ${chevronIcons}`)

  await screenshot(page, '03-interview')

  // ===== Test 4: 面试页折叠面板展开/折叠 =====
  log('\n=== Test 4: 面试页折叠面板交互 ===')
  const firstDetails = page.locator('details').first()
  const isOpenBefore = await firstDetails.getAttribute('open')
  check('首个 Q&A 默认折叠', isOpenBefore === null, `open attr: ${isOpenBefore}`)

  await firstDetails.locator('summary').click()
  await page.waitForTimeout(300)
  const isOpenAfter = await firstDetails.getAttribute('open')
  check('点击 summary 后展开', isOpenAfter !== null, `open attr: ${isOpenAfter}`)

  const expandedHtml = await firstDetails.locator('.markdown').count()
  check('展开后渲染 Markdown 内容', expandedHtml >= 1, `markdown blocks: ${expandedHtml}`)

  await screenshot(page, '04-interview-expanded')

  await firstDetails.locator('summary').click()
  await page.waitForTimeout(300)
  const isOpenAfter2 = await firstDetails.getAttribute('open')
  check('再次点击折叠', isOpenAfter2 === null)

  // ===== Test 5: 面试页 Markdown 内容 =====
  log('\n=== Test 5: 面试页 Markdown 渲染 ===')
  await firstDetails.locator('summary').click()
  await page.waitForTimeout(300)

  const qaP = await firstDetails.locator('.markdown p').count()
  check('问答渲染段落', qaP >= 1, `p count: ${qaP}`)

  const qaStrong = await firstDetails.locator('.markdown strong').count()
  check('问答渲染加粗文本', qaStrong >= 1, `strong count: ${qaStrong}`)

  const qaOl = await firstDetails.locator('.markdown ol').count()
  check('问答渲染有序列表', qaOl >= 1, `ol count: ${qaOl}`)

  // ===== Test 6: AI 实践页 =====
  log('\n=== Test 6: AI 实践页 ===')
  await page.goto(`${BASE}/ai-practice`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)

  const aiH1 = await page.locator('h1').count()
  check('AI 实践页 h1 存在', aiH1 >= 1)

  const aiH2 = await page.locator('h2').count()
  check('AI 实践页 h2 >= 5', aiH2 >= 5, `h2 count: ${aiH2}`)

  const aiTable = await page.locator('table').count()
  check('AI 实践页表格存在', aiTable >= 1, `tables: ${aiTable}`)

  const aiPre = await page.locator('pre').count()
  check('AI 实践页代码块存在', aiPre >= 1, `pre count: ${aiPre}`)

  const aiH3 = await page.locator('h3').count()
  check('AI 实践页 h3（案例）存在', aiH3 >= 3, `h3 count: ${aiH3}`)

  await screenshot(page, '06-ai-practice')

  // ===== Test 7: AI 实践页 Markdown 元素 =====
  log('\n=== Test 7: AI 实践页 Markdown 渲染 ===')
  const aiP = await page.locator('.markdown p').count()
  check('AI 实践页段落存在', aiP >= 5, `p count: ${aiP}`)

  const aiStrong = await page.locator('.markdown strong').count()
  check('AI 实践页加粗文本存在', aiStrong >= 5, `strong count: ${aiStrong}`)

  const aiUl = await page.locator('.markdown ul').count()
  check('AI 实践页无序列表存在', aiUl >= 1, `ul count: ${aiUl}`)

  const aiHr = await page.locator('.markdown hr').count()
  check('AI 实践页分割线存在', aiHr >= 1, `hr count: ${aiHr}`)

  // ===== Test 8: 导航到面试页 =====
  log('\n=== Test 8: 导航测试 ===')
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const navInterview = page.locator('a[href="/interview"]')
  const navInterviewCount = await navInterview.count()
  check('导航栏有面试页链接', navInterviewCount >= 1, `links: ${navInterviewCount}`)

  const navAiPractice = page.locator('a[href="/ai-practice"]')
  const navAiPracticeCount = await navAiPractice.count()
  check('导航栏有 AI 实践页链接', navAiPracticeCount >= 1, `links: ${navAiPracticeCount}`)

  // ===== Test 9: 404 页面 =====
  log('\n=== Test 9: 404 页面 ===')
  await page.goto(`${BASE}/projects/nonexistent`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const notFoundH1 = await page.locator('h1').count()
  check('404 页面 h1 存在', notFoundH1 >= 1)

  // ===== Test 10: 响应式 — 桌面 1280x800 =====
  log('\n=== Test 10: 响应式桌面 ===')
  await page.goto(`${BASE}/interview`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.waitForTimeout(300)
  const desktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5
  })
  check('桌面无水平溢出', !desktopOverflow)

  // ===== Test 11: 响应式 — 平板 768x1024 =====
  log('\n=== Test 11: 响应式平板 ===')
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.waitForTimeout(300)
  const tabletOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5
  })
  check('平板无水平溢出', !tabletOverflow)
  await screenshot(page, '11-interview-tablet')

  // ===== Test 12: 响应式 — 移动 375x667 =====
  log('\n=== Test 12: 响应式移动 ===')
  await page.setViewportSize({ width: 375, height: 667 })
  await page.waitForTimeout(300)
  const mobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5
  })
  check('移动端无水平溢出', !mobileOverflow)
  await screenshot(page, '12-interview-mobile')

  // ===== Test 13: AI 实践页响应式移动 =====
  log('\n=== Test 13: AI 实践页移动端 ===')
  await page.goto(`${BASE}/ai-practice`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.setViewportSize({ width: 375, height: 667 })
  await page.waitForTimeout(300)
  const aiMobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5
  })
  check('AI 实践页移动端无水平溢出', !aiMobileOverflow)

  // ===== Test 14: 控制台错误扫描 =====
  log('\n=== Test 14: 控制台错误扫描 ===')
  const routes = ['/', '/projects/jiangnan-travel', '/interview', '/ai-practice']
  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
  }
  check('4 路由控制台 0 错误', consoleErrors.length === 0, `errors: ${consoleErrors.length}` + (consoleErrors.length > 0 ? ` — ${consoleErrors.slice(0, 3).join('; ')}` : ''))

} catch (err) {
  failed++
  results.push({ name: '测试执行异常', status: 'FAIL', detail: err.message })
  log(`\n❌ 测试执行异常: ${err.message}`)
} finally {
  await browser.close()
}

// ===== 结果汇总 =====
log('\n' + '='.repeat(60))
log(`\n📊 测试结果: ${passed} 通过 / ${failed} 失败 / ${passed + failed} 总计`)
log('='.repeat(60))

if (failed > 0) {
  log('\n❌ 失败项:')
  results.filter(r => r.status === 'FAIL').forEach(r => {
    log(`  - ${r.name}: ${r.detail}`)
  })
}

// 保存结果
writeFileSync(
  resolve(SCREENSHOT_DIR, 'results.json'),
  JSON.stringify({ passed, failed, total: passed + failed, results }, null, 2)
)

process.exit(failed > 0 ? 1 : 0)
