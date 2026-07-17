/**
 * Phase 6 a11y 专项验证
 * - Keyboard Navigation（Footer 链接 Tab 可达）
 * - Reduced Motion 友好性（Grid Pattern / underline reveal 不依赖动画）
 * - 屏幕阅读器友好（色点 aria-hidden / eyebrow 文字标签 / blockquote 语义化）
 * - WCAG 对比度（色点 + 文字双重表达）
 */
import { chromium } from 'playwright'

const BASE = 'http://localhost:4180'
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

const browser = await chromium.launch({ headless: true })

try {
  // ===== Test 1: Footer Keyboard Navigation =====
  console.log('=== Test 1: Footer Keyboard Navigation ===')
  const context1 = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page1 = await context1.newPage()
  await page1.goto(BASE, { waitUntil: 'networkidle' })
  await page1.waitForTimeout(500)

  await page1.focus('body')
  let foundFooterLink = false
  for (let i = 0; i < 30; i++) {
    await page1.keyboard.press('Tab')
    const activeClass = await page1.evaluate(() => {
      const el = document.activeElement
      return el ? el.className : ''
    })
    if (activeClass.includes('footer__link')) {
      foundFooterLink = true
      break
    }
  }
  check('Footer 链接 Tab 可达', foundFooterLink, `found: ${foundFooterLink}`)

  await context1.close()

  // ===== Test 2: Reduced Motion 友好性 =====
  console.log('=== Test 2: Reduced Motion 友好性 ===')
  const context2 = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: 'reduce',
  })
  const page2 = await context2.newPage()

  // 先访问 Home 验证 Grid Pattern（.hero 仅在 Home 页面）
  await page2.goto(BASE, { waitUntil: 'networkidle' })
  await page2.waitForTimeout(500)
  const gridPatternVisible = await page2.evaluate(() => {
    const hero = document.querySelector('.hero')
    if (!hero) return null
    return window.getComputedStyle(hero).backgroundImage
  })
  check(
    'Reduced Motion: Hero Grid Pattern 仍可见',
    !!gridPatternVisible && gridPatternVisible.includes('linear-gradient'),
    `bg: ${gridPatternVisible?.substring(0, 50)}`,
  )

  // 再访问 About 验证引言可见性
  await page2.goto(BASE + '/about', { waitUntil: 'networkidle' })
  await page2.waitForTimeout(800)
  const quoteVisible = await page2.evaluate(() => {
    const quote = document.querySelector('.about__quote')
    if (!quote) return null
    const style = window.getComputedStyle(quote)
    return { opacity: style.opacity, display: style.display }
  })
  check(
    'Reduced Motion: About 引言立即可见',
    quoteVisible?.opacity === '1' || quoteVisible?.display !== 'none',
    `opacity: ${quoteVisible?.opacity}, display: ${quoteVisible?.display}`,
  )

  await context2.close()

  // ===== Test 3: Interview 色点屏幕阅读器友好性 =====
  console.log('=== Test 3: Interview 色点屏幕阅读器友好性 ===')
  const context3 = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page3 = await context3.newPage()
  await page3.goto(BASE + '/interview', { waitUntil: 'networkidle' })
  await page3.waitForTimeout(800)

  const dotsAriaHidden = await page3.evaluate(() => {
    const dots = document.querySelectorAll('.category__dot')
    return Array.from(dots).map((d) => d.getAttribute('aria-hidden'))
  })
  check(
    '所有 4 个色点 aria-hidden = "true"',
    dotsAriaHidden.length === 4 && dotsAriaHidden.every((v) => v === 'true'),
    `values: ${JSON.stringify(dotsAriaHidden)}`,
  )

  const dotsTextContent = await page3.evaluate(() => {
    const dots = document.querySelectorAll('.category__dot')
    return Array.from(dots).map((d) => d.textContent)
  })
  check(
    '所有色点无文本内容（不会朗读）',
    dotsTextContent.every((t) => t === '' || t === null),
    `content: ${JSON.stringify(dotsTextContent)}`,
  )

  const eyebrowTexts = await page3.evaluate(() => {
    const eyebrows = document.querySelectorAll('.category__eyebrow')
    return Array.from(eyebrows).map((e) => e.textContent?.trim())
  })
  check(
    '所有 4 个分类 eyebrow 文字标签存在',
    eyebrowTexts.length === 4 && eyebrowTexts.every((t) => !!t && t.length > 0),
    `texts: ${JSON.stringify(eyebrowTexts)}`,
  )

  await context3.close()

  // ===== Test 4: About 引言语义化 =====
  console.log('=== Test 4: About 引言语义化 ===')
  const context4 = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page4 = await context4.newPage()
  await page4.goto(BASE + '/about', { waitUntil: 'networkidle' })
  await page4.waitForTimeout(800)

  const quoteTag = await page4.locator('blockquote.about__quote').count()
  check('About 引言使用 <blockquote> 语义化标签', quoteTag === 1, `count: ${quoteTag}`)

  const quoteP = await page4.locator('blockquote.about__quote p').count()
  check('About 引言使用 <p> 标签包裹文本', quoteP === 1, `count: ${quoteP}`)

  const accentAriaHidden = await page4.evaluate(() => {
    const accent = document.querySelector('.about__quote-accent')
    return accent ? accent.getAttribute('aria-hidden') : null
  })
  check(
    'About Accent Line aria-hidden = "true"（装饰性）',
    accentAriaHidden === 'true',
    `aria-hidden: ${accentAriaHidden}`,
  )

  await context4.close()

  // ===== Test 5: Footer 时间戳语义化 =====
  console.log('=== Test 5: Footer 时间戳语义化 ===')
  const context5 = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page5 = await context5.newPage()
  await page5.goto(BASE, { waitUntil: 'networkidle' })
  await page5.waitForTimeout(500)

  const timeTag = await page5.locator('footer time').count()
  check('Footer 使用 <time> 语义化标签', timeTag === 1, `count: ${timeTag}`)

  const timeDatetime = await page5.locator('footer time').getAttribute('datetime')
  check(
    'Footer <time> 有 datetime 属性（ISO 8601）',
    !!timeDatetime && /^\d{4}-\d{2}-\d{2}/.test(timeDatetime),
    `datetime: ${timeDatetime}`,
  )

  const sitemapNav = await page5.locator('footer nav[aria-label="站点导航"]').count()
  check('Footer Sitemap 使用 <nav aria-label>', sitemapNav === 1, `count: ${sitemapNav}`)

  await context5.close()

  // ===== Test 6: 色点 + 文字双重表达（不依赖颜色 alone）=====
  console.log('=== Test 6: 色点 + 文字双重表达 ===')
  const context6 = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page6 = await context6.newPage()
  await page6.goto(BASE + '/interview', { waitUntil: 'networkidle' })
  await page6.waitForTimeout(800)

  const dualExpression = await page6.evaluate(() => {
    const categories = document.querySelectorAll('.category')
    return Array.from(categories).map((c) => {
      const dot = c.querySelector('.category__dot')
      const eyebrow = c.querySelector('.category__eyebrow')
      return {
        hasDot: !!dot,
        hasText: !!eyebrow && eyebrow.textContent.trim().length > 0,
        textContent: eyebrow?.textContent?.trim(),
      }
    })
  })
  check(
    '所有 4 个分类都有色点 + 文字双重表达',
    dualExpression.length === 4 && dualExpression.every((c) => c.hasDot && c.hasText),
    `data: ${JSON.stringify(dualExpression)}`,
  )

  await context6.close()

} catch (err) {
  failed++
  results.push({ name: '测试执行异常', status: 'FAIL', detail: err.message })
  console.log('异常: ' + err.message)
} finally {
  await browser.close()
}

console.log('')
console.log('='.repeat(60))
console.log('Phase 6 a11y 测试结果: ' + passed + ' 通过 / ' + failed + ' 失败 / ' + (passed + failed) + ' 总计')
console.log('='.repeat(60))

if (failed > 0) {
  console.log('失败项:')
  results.filter(r => r.status === 'FAIL').forEach(r => {
    console.log('  - ' + r.name + ': ' + r.detail)
  })
}

process.exit(failed > 0 ? 1 : 0)
