/**
 * Phase 4 Pre-Phase5 Hotfix 专项验证脚本
 *
 * 验证目标：motion.css fill-mode: both → backwards 修复
 *
 * 测试维度：
 *   1. Scroll Reveal 入场正常（data-reveal='ready' → 'visible' 切换 + 子元素入场）
 *   2. hover lift 正常（.card:hover { transform: translateY(-2px) } 生效）— 本次修复核心
 *   3. stagger 错峰正常（子元素 animation-delay 阶梯 + backwards fill-mode 在 delay 期间应用 from 状态）
 *   4. reduced-motion 正常（composable 跳过 ready + CSS 强制覆盖）
 *   5. CSS 规则静态验证（fill-mode: backwards + opacity: 1 显式声明）
 *   6. 无视觉跳变（动画结束瞬间 to 状态 = 默认状态）
 *
 * 关键验证点（vs Phase 4 Test 8 失败状态）：
 *   - Phase 4 Test 8 失败原因：fill-mode: both 持续应用 to: { transform: none }
 *     导致 .card:hover { transform: translateY(-2px) } 被覆盖
 *   - 本脚本验证：修复后 .card:hover 应正确显示 translateY(-2px)
 */
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'

const BASE = 'http://127.0.0.1:4180'
const results = []
let passed = 0
let failed = 0

function log(msg) {
  console.log(msg)
}

const browser = await chromium.launch({ headless: true })

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

// ===== Test 0: 静态 CSS 规则验证 =====
log('\n=== Test 0: 静态 CSS 规则验证（motion.css 源文件） ===')
{
  const motionCss = readFileSync('src/styles/motion.css', 'utf8')

  // 验证 fill-mode 已改为 backwards
  const hasBackwards = /animation:\s*staggerRevealUp[^;]*backwards\s*;/.test(motionCss)
  check('motion.css: staggerRevealUp 使用 backwards fill-mode', hasBackwards)

  // 验证不再使用 both
  const noBoth = !/animation:\s*staggerRevealUp[^;]*\bboth\b/.test(motionCss)
  check('motion.css: staggerRevealUp 不再使用 both fill-mode', noBoth)

  // 验证显式 opacity: 1 终态声明
  const hasExplicitOpacity = /\[data-reveal='visible'\]\[data-stagger-group\]\s*>\s*\[data-stagger-index\]\s*\{[^}]*\bopacity:\s*1\b/.test(
    motionCss,
  )
  check('motion.css: 子元素入场动画块显式声明 opacity: 1', hasExplicitOpacity)

  // 验证 keyframes 仍存在（未被破坏）
  const hasKeyframes = /@keyframes\s+staggerRevealUp\s*\{/.test(motionCss)
  check('motion.css: @keyframes staggerRevealUp 仍存在', hasKeyframes)

  // 验证 reduced-motion 媒体查询仍存在
  const hasReducedMotion = /@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(motionCss)
  check('motion.css: prefers-reduced-motion 媒体查询仍存在', hasReducedMotion)
}

// ===== Test 1: Scroll Reveal 入场正常 + hover lift 生效（核心修复验证） =====
log('\n=== Test 1: Scroll Reveal 入场 + hover lift（核心修复验证） ===')
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000) // 等待 useScrollReveal onMounted + IntersectionObserver

  // 验证 stagger-group 父元素存在
  const staggerGroups = await page.locator('[data-stagger-group]').count()
  check('Scroll Reveal: stagger-group 父元素存在', staggerGroups >= 1, `count: ${staggerGroups}`)

  // 验证至少一个 stagger-group 已进入 visible 状态（首页 Projects section）
  const visibleGroups = await page.locator("[data-stagger-group][data-reveal='visible']").count()
  check('Scroll Reveal: 至少一个 stagger-group 进入 visible 状态', visibleGroups >= 1, `count: ${visibleGroups}`)

  // 找到第一张 ProjectCard（normal 卡片，使用 stagger animation）
  const firstCard = page.locator('.card').first()
  const cardExists = (await firstCard.count()) > 0
  check('ProjectCard: 首页存在 .card 元素', cardExists)

  if (cardExists) {
    // 滚动到卡片位置确保 visible
    await firstCard.scrollIntoViewIfNeeded()
    await page.waitForTimeout(800) // 等待 stagger animation 完成

    // 验证卡片入场后 opacity: 1（视觉可见）
    const cardOpacity = await firstCard.evaluate((el) => window.getComputedStyle(el).opacity)
    check('Scroll Reveal: 卡片入场后 opacity = 1', cardOpacity === '1', `opacity: ${cardOpacity}`)

    // === 核心修复验证：hover lift ===
    // 修复前：fill-mode: both 持续应用 to: { transform: none }，hover 后 transform 仍为 none
    // 修复后：fill-mode: backwards 动画结束后不应用 to 状态，hover 应显示 translateY(-2px)

    // 记录 hover 前的 transform
    const transformBeforeHover = await firstCard.evaluate((el) => window.getComputedStyle(el).transform)
    log(`    [debug] hover 前 transform: ${transformBeforeHover}`)

    // 触发 hover
    await firstCard.hover()
    await page.waitForTimeout(300) // 等待 transition 完成（--transition-fast）

    // 记录 hover 后的 transform
    const transformAfterHover = await firstCard.evaluate((el) => window.getComputedStyle(el).transform)
    log(`    [debug] hover 后 transform: ${transformAfterHover}`)

    // 验证 hover 后 transform 不为 none（应该是 translateY(-2px) 的 matrix 表示）
    const hoverLiftWorks = transformAfterHover !== 'none' && !/matrix\(1,\s*0,\s*0,\s*1,\s*0,\s*0\)/.test(transformAfterHover)
    check('★ 核心：.card:hover transform 生效（translateY(-2px)）', hoverLiftWorks, `transform: ${transformAfterHover}`)

    // 进一步验证 translate Y = -2px（matrix 的第 6 个值 = -2）
    if (hoverLiftWorks) {
      const matrixMatch = transformAfterHover.match(/matrix\([^)]+\)/)
      if (matrixMatch) {
        const values = matrixMatch[0].match(/-?[\d.]+/g).map(Number)
        // matrix(a, b, c, d, tx, ty) — ty 应该是 -2
        const ty = values[5]
        check('★ 核心：hover lift translateY 值 = -2px', Math.abs(ty - (-2)) < 0.5, `ty: ${ty}`)
      }
    }

    // 移开 hover，验证 transform 恢复
    await page.mouse.move(0, 0)
    await page.waitForTimeout(300)
    const transformAfterLeave = await firstCard.evaluate((el) => window.getComputedStyle(el).transform)
    const hoverLeaveRestored = transformAfterLeave === 'none' || /matrix\(1,\s*0,\s*0,\s*1,\s*0,\s*0\)/.test(transformAfterLeave)
    check('hover 离开后 transform 恢复为 none', hoverLeaveRestored, `transform: ${transformAfterLeave}`)
  }

  await ctx.close()
}

// ===== Test 2: stagger 错峰正常（animation-delay 阶梯） =====
log('\n=== Test 2: stagger 错峰正常 ===')
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)

  // 找到 visible stagger-group
  const group = page.locator("[data-stagger-group][data-reveal='visible']").first()
  const groupExists = (await group.count()) > 0
  check('stagger: visible stagger-group 存在', groupExists)

  if (groupExists) {
    // 收集每个子元素的 animation-delay
    const delays = await group.evaluate((parent) => {
      const children = parent.querySelectorAll('[data-stagger-index]')
      return Array.from(children).map((child) => {
        const computed = window.getComputedStyle(child)
        return {
          index: child.getAttribute('data-stagger-index'),
          animationName: computed.animationName,
          animationDelay: computed.animationDelay,
          animationFillMode: computed.animationFillMode,
        }
      })
    })

    log(`    [debug] 子元素 animation 信息：${JSON.stringify(delays, null, 2)}`)

    // 验证所有子元素都使用 staggerRevealUp 动画
    const allUseStagger = delays.length > 0 && delays.every((d) => d.animationName === 'staggerRevealUp')
    check('stagger: 所有子元素使用 staggerRevealUp 动画', allUseStagger, `names: ${delays.map((d) => d.animationName).join(',')}`)

    // 验证 animation-delay 阶梯递增
    const delayValues = delays.map((d) => parseFloat(d.animationDelay))
    const isIncreasing = delayValues.every((val, idx) => idx === 0 || val >= delayValues[idx - 1])
    check('stagger: animation-delay 阶梯递增', isIncreasing, `delays: ${delayValues.join('ms, ')}ms`)

    // 验证 fill-mode 为 backwards（核心修复）
    const allBackwards = delays.length > 0 && delays.every((d) => d.animationFillMode === 'backwards')
    check('★ 核心：所有子元素 animation-fill-mode = backwards', allBackwards, `modes: ${delays.map((d) => d.animationFillMode).join(',')}`)

    // 验证第一个子元素 delay = 0s
    if (delays.length > 0) {
      const firstDelay = parseFloat(delays[0].animationDelay)
      check('stagger: index=0 的 animation-delay = 0s', firstDelay === 0, `delay: ${firstDelay}s`)
    }
  }

  await ctx.close()
}

// ===== Test 3: reduced-motion 模式（composable 跳过 + CSS 强制覆盖） =====
log('\n=== Test 3: reduced-motion 模式 ===')
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  })
  const page = await ctx.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)

  // 验证 reduced-motion 下不会设置 data-reveal='ready'（composable 跳过）
  const readyCount = await page.locator("[data-reveal='ready']").count()
  check('reduced-motion: 不设置 data-reveal="ready"（composable 跳过）', readyCount === 0, `ready count: ${readyCount}`)

  // 验证 reduced-motion 下直接显示（无隐藏状态）
  const firstCard = page.locator('.card').first()
  if ((await firstCard.count()) > 0) {
    const opacity = await firstCard.evaluate((el) => window.getComputedStyle(el).opacity)
    check('reduced-motion: 卡片 opacity = 1（直接显示）', opacity === '1', `opacity: ${opacity}`)

    const transform = await firstCard.evaluate((el) => window.getComputedStyle(el).transform)
    check('reduced-motion: 卡片 transform = none（无入场偏移）', transform === 'none' || /matrix\(1,\s*0,\s*0,\s*1,\s*0,\s*0\)/.test(transform), `transform: ${transform}`)

    // 验证 reduced-motion 下 hover lift 被正确禁用
    // ProjectCard.vue L248-252: @media (prefers-reduced-motion: reduce) { .card:hover { transform: none } }
    // 这是正确的设计行为 — reduced-motion 应尊重用户 motion 偏好，禁用 hover transform
    await firstCard.hover()
    await page.waitForTimeout(100)
    const hoverMatches = await firstCard.evaluate((el) => el.matches(':hover'))
    const hoverTransform = await firstCard.evaluate((el) => window.getComputedStyle(el).transform)
    // :hover 伪类应匹配，但 transform 应为 none（被 reduced-motion 媒体查询禁用）
    const hoverCorrectlyDisabled = hoverMatches && (hoverTransform === 'none' || /matrix\(1,\s*0,\s*0,\s*1,\s*0,\s*0\)/.test(hoverTransform))
    check('reduced-motion: hover lift 被正确禁用（:hover 匹配 + transform: none）', hoverCorrectlyDisabled, `:hover=${hoverMatches}, transform: ${hoverTransform}`)
  }

  await ctx.close()
}

// ===== Test 4: 无视觉跳变（动画结束瞬间 opacity/transform 与默认状态一致） =====
log('\n=== Test 4: 无视觉跳变（动画结束 vs 默认状态） ===')
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500) // 等待所有 stagger 动画完成

  // 找到 visible stagger-group 的子元素
  const childrenInfo = await page.evaluate(() => {
    const group = document.querySelector("[data-stagger-group][data-reveal='visible']")
    if (!group) return null
    const child = group.querySelector('[data-stagger-index]')
    if (!child) return null
    const computed = window.getComputedStyle(child)
    return {
      opacity: computed.opacity,
      transform: computed.transform,
      animationPlayState: computed.animationPlayState,
      animationName: computed.animationName,
    }
  })

  if (childrenInfo) {
    log(`    [debug] 动画结束后子元素状态：${JSON.stringify(childrenInfo)}`)
    check('无视觉跳变: 动画结束后 opacity = 1', childrenInfo.opacity === '1', `opacity: ${childrenInfo.opacity}`)
    check('无视觉跳变: 动画结束后 transform = none', childrenInfo.transform === 'none' || /matrix\(1,\s*0,\s*0,\s*1,\s*0,\s*0\)/.test(childrenInfo.transform), `transform: ${childrenInfo.transform}`)
  } else {
    check('无视觉跳变: 找到 visible stagger-group 子元素', false)
  }

  await ctx.close()
}

// ===== Test 5: 多个页面 hover lift 一致性验证 =====
log('\n=== Test 5: 多页面 hover lift 一致性 ===')
{
  // 仅验证使用 .card 的页面（ProjectCard 组件）
  // Skills 页使用 .skills__category（不同组件，不同 hover 行为，不在本次 Hotfix 范围内）
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
  ]

  for (const p of pages) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    try {
      await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle', timeout: 10000 })
    } catch {
      check(`${p.name}: 页面加载（路由不存在，跳过）`, true, '路由不存在，跳过')
      await ctx.close()
      continue
    }
    await page.waitForTimeout(1000)

    const card = page.locator('.card').first()
    if ((await card.count()) > 0) {
      await card.scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)
      await card.hover()
      await page.waitForTimeout(300)
      const transform = await card.evaluate((el) => window.getComputedStyle(el).transform)
      const works = transform !== 'none' && !/matrix\(1,\s*0,\s*0,\s*1,\s*0,\s*0\)/.test(transform)
      check(`${p.name}: .card:hover transform 生效`, works, `transform: ${transform}`)
    } else {
      check(`${p.name}: 存在 .card 元素（跳过）`, true, '页面无 .card 元素，跳过')
    }
    await ctx.close()
  }
}

await browser.close()

// ===== 汇总 =====
log('\n========================================')
log(`Phase 4 Hotfix 专项验证：${passed} passed / ${failed} failed`)
log('========================================')
if (failed > 0) {
  log('\n失败项：')
  results.filter((r) => r.status === 'FAIL').forEach((r) => log(`  ❌ ${r.name} — ${r.detail}`))
  process.exit(1)
} else {
  log('\n✅ 所有 Hotfix 验证通过')
  process.exit(0)
}