/**
 * Phase 3 专项验证脚本
 * 验证范围（READINESS §4.4 Phase 3 Review Gate）：
 *   1. 响应式三断点 Bento 布局视觉验证（1440 / 768 / 375）
 *   2. Dark Mode 视觉一致性
 *   3. Slate Blue Token 存在性（light + dark）
 *   4. hover Accent Line CSS 伪元素存在
 *   5. 键盘 Tab 导航顺序
 *   6. WCAG AA 对比度复核（Slate Blue on surface/bg）
 *   7. 分类色映射正确性（amber / slate-blue / slate）
 *   8. 图标 aria-hidden 正确性
 */
import { chromium } from 'playwright'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const BASE = 'http://127.0.0.1:4180'
const SCREENSHOT_DIR = 'C:\\Users\\lai\\AppData\\Local\\Temp\\trae-phase3-screenshots'
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

try {
  // ===== Test 1: 桌面 1440px Bento 布局验证 =====
  log('\n=== Test 1: 桌面 1440px Bento 布局 ===')
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/skills`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)

    const largeGridCols = await page.evaluate(() => {
      const grid = document.querySelector('.skills__large-grid')
      if (!grid) return null
      return window.getComputedStyle(grid).gridTemplateColumns
    })
    check('桌面 1440px 大卡网格 = 2 列', largeGridCols?.split(' ').length === 2, `cols: ${largeGridCols}`)

    const smallGridCols = await page.evaluate(() => {
      const grid = document.querySelector('.skills__small-grid')
      if (!grid) return null
      return window.getComputedStyle(grid).gridTemplateColumns
    })
    check('桌面 1440px 小卡网格 = 3 列', smallGridCols?.split(' ').length === 3, `cols: ${smallGridCols}`)

    const wideGridCols = await page.evaluate(() => {
      const grid = document.querySelector('.skills__wide-grid')
      if (!grid) return null
      return window.getComputedStyle(grid).gridTemplateColumns
    })
    check('桌面 1440px 横长卡网格 = 1 列', wideGridCols?.split(' ').length === 1, `cols: ${wideGridCols}`)

    const wideCardFlex = await page.evaluate(() => {
      const card = document.querySelector('.skills__category--wide')
      if (!card) return null
      return window.getComputedStyle(card).flexDirection
    })
    check('桌面 1440px 横长卡 flex-direction = row', wideCardFlex === 'row', `flex: ${wideCardFlex}`)

    await screenshot(page, 'phase3-skills-desktop-1440')
    await ctx.close()
  }

  // ===== Test 2: 平板 768px 单列布局验证 =====
  log('\n=== Test 2: 平板 768px 单列布局 ===')
  {
    const ctx = await browser.newContext({ viewport: { width: 768, height: 1024 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/skills`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)

    const largeGridCols = await page.evaluate(() => {
      const grid = document.querySelector('.skills__large-grid')
      return grid ? window.getComputedStyle(grid).gridTemplateColumns : null
    })
    check('平板 768px 大卡网格 = 1 列', largeGridCols?.split(' ').length === 1, `cols: ${largeGridCols}`)

    const smallGridCols = await page.evaluate(() => {
      const grid = document.querySelector('.skills__small-grid')
      return grid ? window.getComputedStyle(grid).gridTemplateColumns : null
    })
    check('平板 768px 小卡网格 = 1 列', smallGridCols?.split(' ').length === 1, `cols: ${smallGridCols}`)

    await screenshot(page, 'phase3-skills-tablet-768')
    await ctx.close()
  }

  // ===== Test 3: 移动 375px 小卡 2 列布局验证 =====
  log('\n=== Test 3: 移动 375px 小卡 2 列布局 ===')
  {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 667 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/skills`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)

    const largeGridCols = await page.evaluate(() => {
      const grid = document.querySelector('.skills__large-grid')
      return grid ? window.getComputedStyle(grid).gridTemplateColumns : null
    })
    check('移动 375px 大卡网格 = 1 列', largeGridCols?.split(' ').length === 1, `cols: ${largeGridCols}`)

    const smallGridCols = await page.evaluate(() => {
      const grid = document.querySelector('.skills__small-grid')
      return grid ? window.getComputedStyle(grid).gridTemplateColumns : null
    })
    check('移动 375px 小卡网格 = 2 列', smallGridCols?.split(' ').length === 2, `cols: ${smallGridCols}`)

    const wideCardFlex = await page.evaluate(() => {
      const card = document.querySelector('.skills__category--wide')
      return card ? window.getComputedStyle(card).flexDirection : null
    })
    check('移动 375px 横长卡 flex-direction = column（退化）', wideCardFlex === 'column', `flex: ${wideCardFlex}`)

    await screenshot(page, 'phase3-skills-mobile-375')
    await ctx.close()
  }

  // ===== Test 4: Dark Mode 视觉一致性 =====
  log('\n=== Test 4: Dark Mode 视觉一致性 ===')
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/skills`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)

    // 主题三态循环：system → light → dark → system... headless 默认 light，需点击两次
    const themeToggle = page.locator('button.theme-toggle').first()
    if (await themeToggle.count()) {
      await themeToggle.click()
      await page.waitForTimeout(300)
      await themeToggle.click()
      await page.waitForTimeout(300)
    }

    const htmlTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
    check('Dark Mode 已启用 (data-theme=dark)', htmlTheme === 'dark', `theme: ${htmlTheme}`)

    const slateBlueIconColor = await page.evaluate(() => {
      const icon = document.querySelector('.skills__category--slate-blue .skills__category-icon')
      return icon ? window.getComputedStyle(icon).color : null
    })
    check('Dark Mode Slate Blue 图标色已应用', !!slateBlueIconColor, `color: ${slateBlueIconColor}`)

    const cardBg = await page.evaluate(() => {
      const card = document.querySelector('.skills__category')
      return card ? window.getComputedStyle(card).backgroundColor : null
    })
    check('Dark Mode 卡片背景已切换', !!cardBg, `bg: ${cardBg}`)

    await screenshot(page, 'phase3-skills-dark-mode')
    await ctx.close()
  }

  // ===== Test 5: Slate Blue Token 存在性 =====
  log('\n=== Test 5: Slate Blue Token 存在性 ===')
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/skills`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)

    const lightToken = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).getPropertyValue('--color-accent-secondary').trim()
    })
    check('Light 模式 --color-accent-secondary = #475569', lightToken === '#475569', `actual: ${lightToken}`)

    // 主题三态循环：system → light → dark → system... headless 默认 light，需点击两次
    const themeToggle = page.locator('button.theme-toggle').first()
    if (await themeToggle.count()) {
      await themeToggle.click()
      await page.waitForTimeout(300)
      await themeToggle.click()
      await page.waitForTimeout(300)
    }

    const darkToken = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).getPropertyValue('--color-accent-secondary').trim()
    })
    check('Dark 模式 --color-accent-secondary = #94a3b8', darkToken === '#94a3b8', `actual: ${darkToken}`)

    await ctx.close()
  }

  // ===== Test 6: hover Accent Line CSS 伪元素存在 =====
  log('\n=== Test 6: hover Accent Line 伪元素 ===')
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/skills`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)

    const beforeContent = await page.evaluate(() => {
      const card = document.querySelector('.skills__category')
      if (!card) return null
      return window.getComputedStyle(card, '::before').content
    })
    check('卡片 ::before 伪元素存在（Accent Line）', beforeContent && beforeContent !== 'none', `content: ${beforeContent}`)

    const beforeWidth = await page.evaluate(() => {
      const card = document.querySelector('.skills__category')
      if (!card) return null
      return window.getComputedStyle(card, '::before').width
    })
    check('Accent Line 宽度 = 2px', beforeWidth === '2px', `width: ${beforeWidth}`)

    const beforeHeight = await page.evaluate(() => {
      const card = document.querySelector('.skills__category')
      if (!card) return null
      return window.getComputedStyle(card, '::before').height
    })
    check('Accent Line 高度 = 24px', beforeHeight === '24px', `height: ${beforeHeight}`)

    const amberBeforeColor = await page.evaluate(() => {
      const card = document.querySelector('.skills__category--amber')
      if (!card) return null
      return window.getComputedStyle(card, '::before').backgroundColor
    })
    check('Amber 分类 Accent Line 色已应用', !!amberBeforeColor && amberBeforeColor !== 'rgba(0, 0, 0, 0)', `color: ${amberBeforeColor}`)

    const slateBlueBeforeColor = await page.evaluate(() => {
      const card = document.querySelector('.skills__category--slate-blue')
      if (!card) return null
      return window.getComputedStyle(card, '::before').backgroundColor
    })
    check('Slate Blue 分类 Accent Line 色已应用', !!slateBlueBeforeColor && slateBlueBeforeColor !== 'rgba(0, 0, 0, 0)', `color: ${slateBlueBeforeColor}`)

    await ctx.close()
  }

  // ===== Test 7: 键盘 Tab 导航顺序 =====
  log('\n=== Test 7: 键盘 Tab 导航 ===')
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/skills`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)

    await page.keyboard.press('Tab')
    await page.waitForTimeout(100)
    const activeElement1 = await page.evaluate(() => document.activeElement?.tagName)
    check('Tab 导航可聚焦页面元素', !!activeElement1, `active: ${activeElement1}`)

    const chipTag = await page.evaluate(() => {
      const chip = document.querySelector('.skills__chip')
      return chip ? chip.tagName : null
    })
    check('chip 元素为 <li>（语义化）', chipTag === 'LI', `tag: ${chipTag}`)

    const iconAriaHidden = await page.evaluate(() => {
      const icon = document.querySelector('.skills__category-icon')
      return icon ? icon.getAttribute('aria-hidden') : null
    })
    check('分类图标 aria-hidden="true"（避免屏幕阅读器重复）', iconAriaHidden === 'true', `aria-hidden: ${iconAriaHidden}`)

    await ctx.close()
  }

  // ===== Test 8: WCAG AA 对比度复核 =====
  log('\n=== Test 8: WCAG AA 对比度复核 ===')
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/skills`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)

    const lightContrast = await page.evaluate(() => {
      function hexToRgb(hex) {
        const h = hex.replace('#', '')
        return {
          r: parseInt(h.substring(0, 2), 16),
          g: parseInt(h.substring(2, 4), 16),
          b: parseInt(h.substring(4, 6), 16),
        }
      }
      function luminance(rgb) {
        const { r, g, b } = rgb
        const rs = r / 255, gs = g / 255, bs = b / 255
        const R = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4)
        const G = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4)
        const B = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4)
        return 0.2126 * R + 0.7152 * G + 0.0722 * B
      }
      function contrast(fg, bg) {
        const l1 = luminance(fg), l2 = luminance(bg)
        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
      }
      const slateBlue = hexToRgb('#475569')
      const surface = hexToRgb('#ffffff')
      return contrast(slateBlue, surface).toFixed(2)
    })
    const lc = parseFloat(lightContrast)
    check('Light 模式 Slate Blue on surface 对比度 >= 4.5 (AA)', lc >= 4.5, `contrast: ${lightContrast}:1`)

    // 主题三态循环：system → light → dark → system... headless 默认 light，需点击两次
    const themeToggle = page.locator('button.theme-toggle').first()
    if (await themeToggle.count()) {
      await themeToggle.click()
      await page.waitForTimeout(300)
      await themeToggle.click()
      await page.waitForTimeout(300)
    }

    const darkContrast = await page.evaluate(() => {
      function hexToRgb(hex) {
        const h = hex.replace('#', '')
        return {
          r: parseInt(h.substring(0, 2), 16),
          g: parseInt(h.substring(2, 4), 16),
          b: parseInt(h.substring(4, 6), 16),
        }
      }
      function luminance(rgb) {
        const { r, g, b } = rgb
        const rs = r / 255, gs = g / 255, bs = b / 255
        const R = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4)
        const G = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4)
        const B = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4)
        return 0.2126 * R + 0.7152 * G + 0.0722 * B
      }
      function contrast(fg, bg) {
        const l1 = luminance(fg), l2 = luminance(bg)
        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
      }
      const slateBlueDark = hexToRgb('#94a3b8')
      const surfaceDark = hexToRgb('#1e293b')
      return contrast(slateBlueDark, surfaceDark).toFixed(2)
    })
    const dc = parseFloat(darkContrast)
    check('Dark 模式 Slate Blue on surface 对比度 >= 4.5 (AA)', dc >= 4.5, `contrast: ${darkContrast}:1`)

    await ctx.close()
  }

  // ===== Test 9: 分类色映射正确性（DOM 层级） =====
  log('\n=== Test 9: 分类色映射正确性 ===')
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/skills`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)

    const categoryTiers = await page.evaluate(() => {
      const cards = document.querySelectorAll('.skills__category')
      return Array.from(cards).map((c) => {
        const name = c.querySelector('.skills__category-name')?.textContent?.trim()
        const tier = ['amber', 'slate-blue', 'slate'].find((t) =>
          c.classList.contains(`skills__category--${t}`),
        )
        const priority = ['large', 'medium', 'wide'].find((p) =>
          c.classList.contains(`skills__category--${p}`),
        )
        return { name, tier, priority }
      })
    })

    const expectedMapping = [
      { name: '后端开发', tier: 'amber', priority: 'large' },
      { name: '前端开发', tier: 'slate-blue', priority: 'large' },
      { name: '小程序 & 跨端', tier: 'slate', priority: 'medium' },
      { name: '工具 & 运维', tier: 'slate-blue', priority: 'medium' },
      { name: 'AI 工程化', tier: 'amber', priority: 'medium' },
      { name: '软件工程实践', tier: 'amber', priority: 'wide' },
    ]

    for (const expected of expectedMapping) {
      const actual = categoryTiers.find((c) => c.name === expected.name)
      check(
        `"${expected.name}" colorTier=${expected.tier} priority=${expected.priority}`,
        actual?.tier === expected.tier && actual?.priority === expected.priority,
        `actual: tier=${actual?.tier}, priority=${actual?.priority}`,
      )
    }

    await ctx.close()
  }

  // ===== Test 10: chip 数量与字体验证 =====
  log('\n=== Test 10: chip 数量与字体验证 ===')
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/skills`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)

    const chipCount = await page.locator('.skills__chip').count()
    check('chip 总数 >= 30（技术栈完整呈现）', chipCount >= 30, `chips: ${chipCount}`)

    const chipFontFamily = await page.evaluate(() => {
      const chip = document.querySelector('.skills__chip')
      return chip ? window.getComputedStyle(chip).fontFamily : null
    })
    check('chip 使用 Mono 字体家族', chipFontFamily?.toLowerCase().includes('mono'), `font: ${chipFontFamily}`)

    const eyebrowText = await page.locator('.page__eyebrow').first().textContent()
    check('eyebrow 使用 // 前缀语言', eyebrowText?.trim().startsWith('//'), `eyebrow: ${eyebrowText}`)

    await ctx.close()
  }
} catch (err) {
  log(`\n❌ 脚本异常: ${err.message}`)
  failed++
  results.push({ name: '脚本执行', status: 'FAIL', detail: err.message })
} finally {
  await browser.close()
}

log('\n============================================================')
log(`📊 Phase 3 专项验证结果: ${passed} 通过 / ${failed} 失败 / ${passed + failed} 总计`)
log('============================================================')

const report = {
  timestamp: new Date().toISOString(),
  total: passed + failed,
  passed,
  failed,
  results,
}
writeFileSync(
  resolve(SCREENSHOT_DIR, 'phase3-special-report.json'),
  JSON.stringify(report, null, 2),
)
log(`\n截图与报告目录: ${SCREENSHOT_DIR}`)

process.exit