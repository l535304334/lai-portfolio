/**
 * Task 005 Release Gate — Playwright 全量回归测试
 * 覆盖：Task 001~004 全部功能 + Task 005 新增 Skills / Resume / About 三页
 *
 * 测试矩阵：
 *   1. 首页（Task 001）
 *   2. 项目详情页（Task 001）
 *   3. 面试页 + 折叠面板交互（Task 003）
 *   4. AI 实践页（Task 004）
 *   5. Skills 页（Task 005.1）★
 *   6. Resume 页（Task 005.2）★
 *   7. About 页（Task 005.3）★
 *   8. 导航栏链接（Task 005.5）
 *   9. 404 页面（Task 001）
 *  10. 响应式：桌面 / 平板 / 移动三断点
 *  11. 控制台错误扫描（全 7 路由）
 */
import { chromium } from 'playwright'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const BASE = 'http://localhost:4180'
const SCREENSHOT_DIR = 'C:\\Users\\lai\\AppData\\Local\\Temp\\trae-task-005-screenshots'
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
  // ===== Test 1: 首页（Task 001 回归）=====
  log('\n=== Test 1: 首页渲染 ===')
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const h1 = await page.locator('h1').count()
  check('首页 h1 存在', h1 >= 1, `h1 count: ${h1}`)
  const projectCards = await page.locator('.card').count()
  check('首页项目卡片 >= 3', projectCards >= 3, `cards: ${projectCards}`)
  await screenshot(page, '01-home')

  // ===== Test 2: 项目详情页（Task 001 回归）=====
  log('\n=== Test 2: 项目详情页 ===')
  await page.goto(`${BASE}/projects/jiangnan-travel`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const detailH1 = await page.locator('h1').count()
  check('详情页 h1 存在', detailH1 >= 1)
  const detailH2 = await page.locator('h2').count()
  check('详情页 h2 存在', detailH2 >= 1, `h2 count: ${detailH2}`)
  const detailTable = await page.locator('table').count()
  check('详情页表格存在', detailTable >= 1)
  await screenshot(page, '02-project-detail')

  // ===== Test 3: 面试页（Task 003 回归）=====
  log('\n=== Test 3: 面试准备页 ===')
  await page.goto(`${BASE}/interview`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)

  const interviewH1 = await page.locator('h1').count()
  check('面试页 h1 存在', interviewH1 >= 1)

  const interviewH2 = await page.locator('.category__title').count()
  check('面试页分类数 = 4', interviewH2 === 4, `categories: ${interviewH2}`)

  const qaDetails = await page.locator('details').count()
  check('面试页 Q&A 数 >= 17', qaDetails >= 17, `details count: ${qaDetails}`)
  await screenshot(page, '03-interview')

  // ===== Test 4: 面试页折叠面板交互（Task 003 回归）=====
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

  await firstDetails.locator('summary').click()
  await page.waitForTimeout(300)
  const isOpenAfter2 = await firstDetails.getAttribute('open')
  check('再次点击折叠', isOpenAfter2 === null)

  // ===== Test 5: AI 实践页（Task 004 回归）=====
  log('\n=== Test 5: AI 实践页 ===')
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
  await screenshot(page, '05-ai-practice')

  // ===== Test 6: Skills 页（Task 005.1 ★）=====
  log('\n=== Test 6: Skills 页（新增）===')
  await page.goto(`${BASE}/skills`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  const skillsH1 = await page.locator('h1').count()
  check('Skills 页 h1 存在', skillsH1 >= 1)

  const skillsTitle = await page.locator('h1').textContent()
  check('Skills 页 h1 文本 = 技术能力', skillsTitle?.trim() === '技术能力', `actual: ${skillsTitle}`)

  const skillsEyebrow = await page.locator('.page__eyebrow').count()
  check('Skills 页 eyebrow 存在', skillsEyebrow >= 1)

  const skillsH2 = await page.locator('h2').count()
  check('Skills 页 h2 >= 3（技术栈/学习路线/当前学习）', skillsH2 >= 3, `h2 count: ${skillsH2}`)

  const skillsH3 = await page.locator('h3').count()
  check('Skills 页 h3 >= 5（分类）', skillsH3 >= 5, `h3 count: ${skillsH3}`)

  // Markdown 渲染验证
  const skillsP = await page.locator('.markdown p').count()
  check('Skills 页段落存在', skillsP >= 5, `p count: ${skillsP}`)

  const skillsUl = await page.locator('.markdown ul').count()
  check('Skills 页无序列表存在', skillsUl >= 1, `ul count: ${skillsUl}`)

  await screenshot(page, '06-skills')

  // ===== Test 7: Resume 页（Task 005.2 ★）=====
  log('\n=== Test 7: Resume 页（新增）===')
  await page.goto(`${BASE}/resume`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)

  const resumeH1 = await page.locator('h1').count()
  check('Resume 页 h1 唯一', resumeH1 === 1, `h1 count: ${resumeH1}`)

  const resumeTitle = await page.locator('h1').textContent()
  check('Resume 页 h1 文本 = 赖睿轩 · 简历', resumeTitle?.trim() === '赖睿轩 · 简历', `actual: ${resumeTitle}`)

  // Markdown 内容渲染
  const resumeContent = await page.locator('.resume__content .markdown').count()
  check('Resume 页 Markdown 内容存在', resumeContent >= 1)

  // 下载 PDF 按钮存在
  const resumeDownloadBtn = await page.locator('.resume__download-btn').count()
  check('Resume 页下载按钮存在', resumeDownloadBtn === 1, `download buttons: ${resumeDownloadBtn}`)

  // 验证未引入 iframe
  const resumeIframe = await page.locator('iframe').count()
  check('Resume 页无 iframe', resumeIframe === 0, `iframes: ${resumeIframe}`)

  await screenshot(page, '07-resume')

  // ===== Test 8: About 页（Task 005.3 ★）=====
  log('\n=== Test 8: About 页（新增）===')
  await page.goto(`${BASE}/about`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  const aboutH1 = await page.locator('h1').count()
  check('About 页 h1 存在', aboutH1 >= 1)

  const aboutTitle = await page.locator('h1').textContent()
  check('About 页 h1 文本 = 关于我', aboutTitle?.trim() === '关于我', `actual: ${aboutTitle}`)

  const aboutH2 = await page.locator('h2').count()
  check('About 页 h2 >= 4（个人简介/教育/方向/关于本站）', aboutH2 >= 4, `h2 count: ${aboutH2}`)

  // Markdown 渲染验证
  const aboutP = await page.locator('.markdown p').count()
  check('About 页段落存在', aboutP >= 3, `p count: ${aboutP}`)

  const aboutUl = await page.locator('.markdown ul').count()
  check('About 页无序列表存在（联系方式）', aboutUl >= 1, `ul count: ${aboutUl}`)

  // GitHub 链接验证
  const aboutGithub = await page.locator('.markdown a[href*="github.com"]').count()
  check('About 页 GitHub 链接存在', aboutGithub >= 1, `github links: ${aboutGithub}`)

  await screenshot(page, '08-about')

  // ===== Test 9: 导航栏链接（Task 005.5 集成验证）=====
  log('\n=== Test 9: 导航栏链接 ===')
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)

  const navSkills = page.locator('a[href="/skills"]')
  const navSkillsCount = await navSkills.count()
  check('导航栏有 Skills 链接', navSkillsCount >= 1, `links: ${navSkillsCount}`)

  const navResume = page.locator('a[href="/resume"]')
  const navResumeCount = await navResume.count()
  check('导航栏有 Resume 链接', navResumeCount >= 1, `links: ${navResumeCount}`)

  const navAbout = page.locator('a[href="/about"]')
  const navAboutCount = await navAbout.count()
  check('导航栏有 About 链接', navAboutCount >= 1, `links: ${navAboutCount}`)

  const navInterview = page.locator('a[href="/interview"]')
  const navInterviewCount = await navInterview.count()
  check('导航栏有面试页链接', navInterviewCount >= 1, `links: ${navInterviewCount}`)

  const navAiPractice = page.locator('a[href="/ai-practice"]')
  const navAiPracticeCount = await navAiPractice.count()
  check('导航栏有 AI 实践页链接', navAiPracticeCount >= 1, `links: ${navAiPracticeCount}`)

  // ===== Test 10: 404 页面（Task 001 回归）=====
  log('\n=== Test 10: 404 页面 ===')
  await page.goto(`${BASE}/projects/nonexistent`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const notFoundH1 = await page.locator('h1').count()
  check('404 页面 h1 存在', notFoundH1 >= 1)

  // ===== Test 11: 响应式 — 桌面 1280x800 =====
  log('\n=== Test 11: 响应式桌面 1280x800 ===')
  await page.goto(`${BASE}/skills`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.waitForTimeout(300)
  const desktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5
  })
  check('Skills 桌面无水平溢出', !desktopOverflow)

  // ===== Test 12: 响应式 — 平板 768x1024 =====
  log('\n=== Test 12: 响应式平板 768x1024 ===')
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.waitForTimeout(300)
  const tabletOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5
  })
  check('Skills 平板无水平溢出', !tabletOverflow)
  await screenshot(page, '12-skills-tablet')

  // ===== Test 13: 响应式 — 移动 375x667 =====
  log('\n=== Test 13: 响应式移动 375x667 ===')
  await page.setViewportSize({ width: 375, height: 667 })
  await page.waitForTimeout(300)
  const mobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5
  })
  check('Skills 移动端无水平溢出', !mobileOverflow)
  await screenshot(page, '13-skills-mobile')

  // ===== Test 14: Resume 页响应式移动 =====
  log('\n=== Test 14: Resume 页响应式移动 ===')
  await page.goto(`${BASE}/resume`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.setViewportSize({ width: 375, height: 667 })
  await page.waitForTimeout(300)
  const resumeMobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5
  })
  check('Resume 移动端无水平溢出', !resumeMobileOverflow)

  // ===== Test 15: About 页响应式移动 =====
  log('\n=== Test 15: About 页响应式移动 ===')
  await page.goto(`${BASE}/about`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.setViewportSize({ width: 375, height: 667 })
  await page.waitForTimeout(300)
  const aboutMobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5
  })
  check('About 移动端无水平溢出', !aboutMobileOverflow)

  // ===== Test 16: 控制台错误扫描（全 7 路由）=====
  log('\n=== Test 16: 控制台错误扫描（全 7 路由）===')
  consoleErrors.length = 0
  const routes = [
    '/',
    '/projects/jiangnan-travel',
    '/interview',
    '/ai-practice',
    '/skills',
    '/resume',
    '/about',
  ]
  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
  }
  // 过滤掉 Shiki singleton 警告（构建时已知问题，非运行时错误）
  const runtimeErrors = consoleErrors.filter((e) => !e.includes('Shiki'))
  check('7 路由控制台 0 运行时错误', runtimeErrors.length === 0, `errors: ${runtimeErrors.length}` + (runtimeErrors.length > 0 ? ` — ${runtimeErrors.slice(0, 3).join('; ')}` : ''))

  // ===== Test 17: 主题切换（Task 002 回归）=====
  // cycleMode 顺序：system → light → dark → system
  // 默认 prefers-color-scheme=light 在 headless 下，system 解析为 light
  // 所以需要点击两次（system→light→dark）才能看到 data-theme 从 light 变成 dark
  log('\n=== Test 17: 主题切换 ===')
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.waitForTimeout(300)

  const htmlEl = page.locator('html')
  const themeBefore = await htmlEl.getAttribute('data-theme')
  // 精确选择 .theme-toggle 类（NavBar.vue 中 ThemeToggle 组件的根元素）
  const themeToggleBtn = page.locator('button.theme-toggle').first()
  const toggleCount = await themeToggleBtn.count()
  check('主题切换按钮存在', toggleCount >= 1, `buttons: ${toggleCount}`)

  if (toggleCount >= 1) {
    // 第一次点击：system → light（两者都解析为 light，data-theme 不变）
    await themeToggleBtn.click()
    await page.waitForTimeout(300)
    // 第二次点击：light → dark（data-theme 应该变为 dark）
    await themeToggleBtn.click()
    await page.waitForTimeout(300)
    const themeAfter = await htmlEl.getAttribute('data-theme')
    check('点击两次后 data-theme = dark', themeAfter === 'dark', `before: ${themeBefore}, after: ${themeAfter}`)
  }

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
  resolve(SCREENSHOT_DIR, 'results-task-005.json'),
  JSON.stringify({ passed, failed, total: passed + failed, results }, null, 2)
)

process.exit(failed > 0 ? 1 : 0)
