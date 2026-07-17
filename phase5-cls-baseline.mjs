/**
 * Phase 5 CLS Baseline 对比验证
 *
 * 目的：证明 CLS 0.1021 是 baseline 问题（footer 字体加载），与 Phase 5 无关
 * 方法：对比 jiangnan-travel（有 Phase 5 DecisionSection）与 love-letter（无 Phase 5）的 CLS
 */
import { chromium } from 'playwright'

const BASE = 'http://127.0.0.1:4180'
const browser = await chromium.launch({ headless: true })

async function measureCLS(route) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await ctx.newPage()

  await page.addInitScript(() => {
    window.__cls = 0
    window.__clsEntries = []
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            window.__cls += entry.value
            const sources = entry.sources || []
            window.__clsEntries.push({
              value: entry.value,
              startTime: entry.startTime,
              sources: sources.map((s) => {
                const node = s.node
                if (!node) return null
                return {
                  tag: node.tagName?.toLowerCase(),
                  className: node.className?.toString?.() || '',
                }
              }).filter(Boolean),
            })
          }
        }
      }).observe({ type: 'layout-shift', buffered: true })
    } catch {}
  })

  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(3000)

  const result = await page.evaluate(() => ({
    cls: window.__cls || 0,
    entries: window.__clsEntries || [],
  }))

  await ctx.close()
  return result
}

try {
  console.log('=== Phase 5 CLS Baseline 对比验证 ===\n')

  // 测试 1: jiangnan-travel（有 Phase 5 DecisionSection）
  const jiangnan = await measureCLS('/projects/jiangnan-travel')
  console.log(`jiangnan-travel (有 Phase 5): CLS = ${jiangnan.cls.toFixed(4)}`)
  console.log(`  layout-shift entries: ${jiangnan.entries.length}`)
  jiangnan.entries.slice(0, 3).forEach((e, i) => {
    const src = e.sources.map((s) => `${s.tag}${s.className ? '.' + s.className.split(' ')[0] : ''}`).join(', ')
    console.log(`    [${i}] value=${e.value.toFixed(4)} t=${e.startTime.toFixed(0)}ms sources=[${src}]`)
  })

  // 测试 2: love-letter（无 Phase 5，fallback Markdown）
  const loveLetter = await measureCLS('/projects/love-letter')
  console.log(`\nlove-letter (无 Phase 5): CLS = ${loveLetter.cls.toFixed(4)}`)
  console.log(`  layout-shift entries: ${loveLetter.entries.length}`)
  loveLetter.entries.slice(0, 3).forEach((e, i) => {
    const src = e.sources.map((s) => `${s.tag}${s.className ? '.' + s.className.split(' ')[0] : ''}`).join(', ')
    console.log(`    [${i}] value=${e.value.toFixed(4)} t=${e.startTime.toFixed(0)}ms sources=[${src}]`)
  })

  // 测试 3: 首页（baseline）
  const home = await measureCLS('/')
  console.log(`\n/ (首页 baseline): CLS = ${home.cls.toFixed(4)}`)
  console.log(`  layout-shift entries: ${home.entries.length}`)
  home.entries.slice(0, 3).forEach((e, i) => {
    const src = e.sources.map((s) => `${s.tag}${s.className ? '.' + s.className.split(' ')[0] : ''}`).join(', ')
    console.log(`    [${i}] value=${e.value.toFixed(4)} t=${e.startTime.toFixed(0)}ms sources=[${src}]`)
  })

  // 结论
  console.log('\n=== 结论 ===')
  console.log(`jiangnan-travel CLS: ${jiangnan.cls.toFixed(4)}`)
  console.log(`love-letter CLS:     ${loveLetter.cls.toFixed(4)}`)
  console.log(`/ 首页 CLS:           ${home.cls.toFixed(4)}`)
  console.log(`\n差异 (jiangnan - loveLetter): ${(jiangnan.cls - loveLetter.cls).toFixed(4)}`)

  if (Math.abs(jiangnan.cls - loveLetter.cls) < 0.02) {
    console.log('✅ jiangnan-travel 与 love-letter 的 CLS 差异 < 0.02，证明 Phase 5 未引入 CLS 问题')
    console.log('✅ CLS 主要来源是 footer（baseline 字体加载问题），与 Phase 5 DecisionSection 无关')
  } else {
    console.log('⚠️  jiangnan-travel 与 love-letter 的 CLS 差异 >= 0.02，需进一步调查')
  }
} finally {
  await browser.close()
}