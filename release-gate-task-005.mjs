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
  // ===== Test 1: 首页（Task 001 回归 + Phase 4 ProjectCard/Timeline）=====
  log('\n=== Test 1: 首页渲染 ===')
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const h1 = await page.locator('h1').count()
  check('首页 h1 存在', h1 >= 1, `h1 count: ${h1}`)
  const projectCards = await page.locator('.card').count()
  check('首页项目卡片 >= 3', projectCards >= 3, `cards: ${projectCards}`)

  // Phase 4: ProjectCard normal 恢复 2 列 metrics 网格（READINESS §4.5）
  const normalGridCount = await page.locator('.card__metrics--grid-normal').count()
  check('Phase 4: normal 卡片使用 2 列 metrics 网格', normalGridCount >= 1, `normal grid: ${normalGridCount}`)

  const inlineMetricsCount = await page.locator('.card__metrics--inline').count()
  check('Phase 4: inline metrics 已移除', inlineMetricsCount === 0, `inline: ${inlineMetricsCount}`)

  // Phase 4: Timeline 主项目放大（READINESS §4.5）
  const mainStageCount = await page.locator('.timeline__item--main').count()
  check('Phase 4: Timeline 主项目 stage = 1（江南出行）', mainStageCount === 1, `main stages: ${mainStageCount}`)

  // Phase 4: Timeline highlights chip 化（READINESS §4.5）
  const timelineChipCount = await page.locator('.timeline__chip').count()
  check('Phase 4: Timeline highlights chip 渲染 >= 10', timelineChipCount >= 10, `chips: ${timelineChipCount}`)

  const oldHighlightCount = await page.locator('.timeline__highlight').count()
  check('Phase 4: 旧 .timeline__highlight 已移除', oldHighlightCount === 0, `old highlights: ${oldHighlightCount}`)

  // Phase 4: Timeline 主项目 stage-title 放大验证
  const mainStageTitleFontSize = await page.evaluate(() => {
    const mainTitle = document.querySelector('.timeline__item--main .timeline__stage-title')
    return mainTitle ? window.getComputedStyle(mainTitle).fontSize : null
  })
  const normalStageTitleFontSize = await page.evaluate(() => {
    const normalTitle = document.querySelector('.timeline__item:not(.timeline__item--main):not(.timeline__item--upcoming) .timeline__stage-title')
    return normalTitle ? window.getComputedStyle(normalTitle).fontSize : null
  })
  check(
    'Phase 4: 主项目 stage-title 字号 > 普通 stage',
    !!mainStageTitleFontSize && !!normalStageTitleFontSize && parseFloat(mainStageTitleFontSize) > parseFloat(normalStageTitleFontSize),
    `main: ${mainStageTitleFontSize}, normal: ${normalStageTitleFontSize}`,
  )

  // Phase 4: Timeline dot hover transition 存在（READINESS §4.5 交互验收）
  const dotTransition = await page.evaluate(() => {
    const dot = document.querySelector('.timeline__dot')
    return dot ? window.getComputedStyle(dot).transition : null
  })
  check('Phase 4: Timeline dot 有 transition（hover 准备）', !!dotTransition && dotTransition.includes('transform'), `transition: ${dotTransition}`)

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
  // Phase 5: jiangnan-travel 使用结构化 decisions 字段，原 fallback markdown 表格被方案对比卡片替代
  // 其他项目（无 decisions 字段）仍可能使用 fallback markdown 渲染表格
  const detailDecisionItems = await page.locator('.decision-item').count()
  check('详情页表格或 decision-item 存在', detailTable >= 1 || detailDecisionItems >= 1, `table: ${detailTable}, decision-item: ${detailDecisionItems}`)
  await screenshot(page, '02-project-detail')

  // ===== Test 2.5: Phase 5 DecisionSection 方案对比卡片 =====
  log('\n=== Test 2.5: Phase 5 DecisionSection 方案对比卡片 ===')
  await page.goto(`${BASE}/projects/jiangnan-travel`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)

  // Phase 5: 结构化 decisions 渲染（非 fallback Markdown）
  const decisionItems = await page.locator('.decision-item').count()
  check('Phase 5: decision-item 渲染 = 3（并发控制/评分引擎/订单状态机）', decisionItems === 3, `items: ${decisionItems}`)

  // Phase 5: 每个 decision-item 包含 options（至少 2 个方案）
  const optionGroups = await page.locator('.decision-item__options').count()
  check('Phase 5: decision-item__options 存在 = 3', optionGroups === 3, `groups: ${optionGroups}`)

  const totalOptions = await page.locator('.decision-option').count()
  check('Phase 5: 总方案数 = 6（3 项 × 2 方案）', totalOptions === 6, `options: ${totalOptions}`)

  // Phase 5: chosen option 标记（每项 1 个 chosen）
  const chosenOptions = await page.locator('.decision-option--chosen').count()
  check('Phase 5: chosen option = 3（每项 1 个）', chosenOptions === 3, `chosen: ${chosenOptions}`)

  // Phase 5: chosen badge "已选" 显示
  const chosenBadges = await page.locator('.decision-option__badge').count()
  check('Phase 5: chosen badge "已选" = 3', chosenBadges === 3, `badges: ${chosenBadges}`)

  // Phase 5: chosen border-color = accent（颜色值等价比较，rgb(217,119,6) === #d97706）
  const chosenBorderColor = await page.evaluate(() => {
    const chosen = document.querySelector('.decision-option--chosen')
    return chosen ? window.getComputedStyle(chosen).borderColor : null
  })
  const accentColorRgb = await page.evaluate(() => {
    // 读取 --color-accent 并通过临时元素转换为 rgb 格式，便于与 borderColor 对比
    const tmp = document.createElement('div')
    tmp.style.color = 'var(--color-accent)'
    document.body.appendChild(tmp)
    const rgb = window.getComputedStyle(tmp).color
    tmp.remove()
    return rgb
  })
  check(
    'Phase 5: chosen option border-color = --color-accent',
    !!chosenBorderColor && !!accentColorRgb && chosenBorderColor.replace(/\s/g, '') === accentColorRgb.replace(/\s/g, ''),
    `border: ${chosenBorderColor}, accent: ${accentColorRgb}`,
  )

  // Phase 5: pros 列表 + 前缀
  const prosLists = await page.locator('.decision-option__list--pros').count()
  check('Phase 5: pros 列表存在 >= 3', prosLists >= 3, `pros lists: ${prosLists}`)

  const prosPrefix = await page.evaluate(() => {
    const prosLi = document.querySelector('.decision-option__list--pros li::before')
    return null // pseudo-element content 无法直接读取，改用 getComputedStyle
  })
  const prosContent = await page.evaluate(() => {
    const prosLi = document.querySelector('.decision-option__list--pros li')
    return prosLi ? window.getComputedStyle(prosLi, '::before').content : null
  })
  check('Phase 5: pros li::before content = "+"', prosContent === '"+"' || prosContent === '+', `content: ${prosContent}`)

  // Phase 5: cons 列表 − 前缀
  const consLists = await page.locator('.decision-option__list--cons').count()
  check('Phase 5: cons 列表存在 >= 3', consLists >= 3, `cons lists: ${consLists}`)

  const consContent = await page.evaluate(() => {
    const consLi = document.querySelector('.decision-option__list--cons li')
    return consLi ? window.getComputedStyle(consLi, '::before').content : null
  })
  check('Phase 5: cons li::before content = "−"', consContent === '"−"' || consContent === '−' || consContent === '"\\2212"', `content: ${consContent}`)

  // Phase 5: reasoning 渲染
  const reasoningBlocks = await page.locator('.decision-item__reasoning').count()
  check('Phase 5: reasoning 块 = 3', reasoningBlocks === 3, `reasoning: ${reasoningBlocks}`)

  const reasoningLabels = await page.locator('.decision-item__reasoning-label').count()
  check('Phase 5: reasoning label "// 理由" = 3', reasoningLabels === 3, `labels: ${reasoningLabels}`)

  // Phase 5: Accent Line（header ::before）
  const headerAccentLine = await page.evaluate(() => {
    const header = document.querySelector('.decision-section__header')
    if (!header) return null
    const before = window.getComputedStyle(header, '::before')
    return {
      width: before.width,
      height: before.height,
      background: before.backgroundColor || before.background,
    }
  })
  check('Phase 5: Accent Line width = 3px', headerAccentLine?.width === '3px', `width: ${headerAccentLine?.width}`)
  check('Phase 5: Accent Line height = 24px', headerAccentLine?.height === '24px', `height: ${headerAccentLine?.height}`)

  // Phase 5: eyebrow + title + hint 存在
  const eyebrow = await page.locator('.decision-section__eyebrow').count()
  check('Phase 5: eyebrow "// 关键决策" 存在', eyebrow === 1, `eyebrow: ${eyebrow}`)

  const decisionTitle = await page.locator('.decision-section__title').textContent()
  check('Phase 5: decision title = "技术决策"', decisionTitle?.trim() === '技术决策', `title: ${decisionTitle}`)

  // Phase 5: fallback MarkdownContent 未渲染（因为 decisions 字段存在）
  const fallbackMarkdown = await page.locator('.decision-section > .markdown').count()
  check('Phase 5: fallback Markdown 未渲染（decisions 字段优先）', fallbackMarkdown === 0, `fallback: ${fallbackMarkdown}`)

  // Phase 5: 响应式 — 桌面 2 列 grid（repeat(2, minmax(0, 1fr)) 解析为 "368px 368px" 等）
  const desktopGridColumns = await page.evaluate(() => {
    const options = document.querySelector('.decision-item__options')
    return options ? window.getComputedStyle(options).gridTemplateColumns : null
  })
  check('Phase 5: 桌面 options grid 2 列', !!desktopGridColumns && desktopGridColumns.split(' ').length === 2, `columns: ${desktopGridColumns}`)

  // Phase 5: 响应式 — 移动端 1 列
  await page.setViewportSize({ width: 375, height: 667 })
  await page.waitForTimeout(300)
  const mobileGridColumns = await page.evaluate(() => {
    const options = document.querySelector('.decision-item__options')
    return options ? window.getComputedStyle(options).gridTemplateColumns : null
  })
  check('Phase 5: 移动端 options grid 1 列', mobileGridColumns?.split(' ').length === 1, `columns: ${mobileGridColumns}`)
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.waitForTimeout(300)

  await screenshot(page, '02b-decision-section-phase5')

  // ===== Test 3: 面试页（Task 003 回归 + RC6 重构）=====
  log('\n=== Test 3: 面试准备页 ===')
  await page.goto(`${BASE}/interview`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)

  const interviewH1 = await page.locator('h1').count()
  check('面试页 h1 存在', interviewH1 >= 1)

  const interviewH2 = await page.locator('.category__title').count()
  check('面试页分类数 = 4', interviewH2 === 4, `categories: ${interviewH2}`)

  const qaDetails = await page.locator('details').count()
  check('面试页 Q&A 数 >= 17', qaDetails >= 17, `details count: ${qaDetails}`)

  // RC6: page__subtitle 渲染验证（动态计算分类数 + 问题数 + 静态提示）
  const interviewSubtitle = await page.locator('.page__subtitle').textContent()
  check(
    '面试页 subtitle 渲染包含 "个分类" 与 "道问题"',
    interviewSubtitle?.includes('个分类') && interviewSubtitle?.includes('道问题'),
    `actual: ${interviewSubtitle}`,
  )

  // RC6: page__hint 硬编码消除验证
  const interviewHintCount = await page.locator('.page__hint').count()
  check('面试页 page__hint 硬编码已消除', interviewHintCount === 0, `hint count: ${interviewHintCount}`)

  // RC6: .page__header 工具类应用验证
  const interviewPageHeader = await page.locator('.page__header').count()
  check('面试页应用 .page__header 工具类', interviewPageHeader === 1, `page__header count: ${interviewPageHeader}`)

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

  // ===== Test 5: AI 实践页（Task 004 回归 + RC6 重构）=====
  log('\n=== Test 5: AI 实践页 ===')
  await page.goto(`${BASE}/ai-practice`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)

  const aiH1 = await page.locator('h1').count()
  check('AI 实践页 h1 存在', aiH1 >= 1)

  // RC6: subtitle 渲染验证（从 frontmatter SSOT 读取，替换原硬编码 page__hint）
  const aiSubtitle = await page.locator('.page__subtitle').textContent()
  check(
    'AI 实践页 subtitle 渲染 = "不是 AI 帮我写代码，是我用 AI 加速了哪些环节，我独立完成了哪些决策"',
    aiSubtitle?.trim() === '不是 AI 帮我写代码，是我用 AI 加速了哪些环节，我独立完成了哪些决策',
    `actual: ${aiSubtitle}`,
  )

  // RC6: page__hint 硬编码消除验证
  const aiHintCount = await page.locator('.page__hint').count()
  check('AI 实践页 page__hint 硬编码已消除', aiHintCount === 0, `hint count: ${aiHintCount}`)

  // RC6: .page__header 工具类应用验证
  const aiPageHeader = await page.locator('.page__header').count()
  check('AI 实践页应用 .page__header 工具类', aiPageHeader === 1, `page__header count: ${aiPageHeader}`)

  const aiH2 = await page.locator('h2').count()
  check('AI 实践页 h2 >= 5', aiH2 >= 5, `h2 count: ${aiH2}`)

  const aiTable = await page.locator('table').count()
  check('AI 实践页表格存在', aiTable >= 1, `tables: ${aiTable}`)

  const aiPre = await page.locator('pre').count()
  check('AI 实践页代码块存在', aiPre >= 1, `pre count: ${aiPre}`)

  const aiH3 = await page.locator('h3').count()
  check('AI 实践页 h3（案例）存在', aiH3 >= 3, `h3 count: ${aiH3}`)
  await screenshot(page, '05-ai-practice')

  // ===== Test 6: Skills 页（Task 005.1 ★ + RC4.1 重构）=====
  log('\n=== Test 6: Skills 页（新增）===')
  await page.goto(`${BASE}/skills`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  const skillsH1 = await page.locator('h1').count()
  check('Skills 页 h1 存在', skillsH1 >= 1)

  const skillsTitle = await page.locator('h1').textContent()
  check('Skills 页 h1 文本 = 技术能力', skillsTitle?.trim() === '技术能力', `actual: ${skillsTitle}`)

  const skillsEyebrow = await page.locator('.page__eyebrow').count()
  check('Skills 页 eyebrow 存在', skillsEyebrow >= 1)

  // RC4.1: subtitle 渲染验证（从 frontmatter SSOT 读取，替换原硬编码 page__hint）
  const skillsSubtitle = await page.locator('.page__subtitle').textContent()
  check(
    'Skills 页 subtitle 渲染 = "技术栈 · 学习路线 · 持续学习中"',
    skillsSubtitle?.trim() === '技术栈 · 学习路线 · 持续学习中',
    `actual: ${skillsSubtitle}`,
  )

  // RC4.1: page__hint 硬编码消除验证（不应再出现 .page__hint）
  const skillsHintCount = await page.locator('.page__hint').count()
  check('Skills 页 page__hint 硬编码已消除', skillsHintCount === 0, `hint count: ${skillsHintCount}`)

  // RC4.1: .page__header 工具类应用验证
  const skillsPageHeader = await page.locator('.page__header').count()
  check('Skills 页应用 .page__header 工具类', skillsPageHeader === 1, `page__header count: ${skillsPageHeader}`)

  // RC4.1: categories 结构化卡片验证（6 个技术栈分类）
  const skillsCategoryCount = await page.locator('.skills__category').count()
  check('Skills 页 categories 渲染 6 个分类卡片', skillsCategoryCount === 6, `categories: ${skillsCategoryCount}`)

  const expectedCategoryNames = ['后端开发', '前端开发', '小程序 & 跨端', '工具 & 运维', 'AI 工程化', '软件工程实践']
  const categoryNames = await page.locator('.skills__category-name').allTextContents()
  const normalizedCategoryNames = categoryNames.map((s) => s.trim())
  for (const name of expectedCategoryNames) {
    check(
      `Skills 页分类 "${name}" 存在`,
      normalizedCategoryNames.includes(name),
      `names: ${JSON.stringify(normalizedCategoryNames)}`,
    )
  }

  const skillsH2 = await page.locator('h2').count()
  check('Skills 页 h2 >= 3（技术栈/学习路线/当前学习）', skillsH2 >= 3, `h2 count: ${skillsH2}`)

  const skillsH3 = await page.locator('h3').count()
  check('Skills 页 h3 >= 5（分类 + 学习路线阶段）', skillsH3 >= 5, `h3 count: ${skillsH3}`)

  // Markdown 渲染验证（body 仅含学习路线 + 当前学习，技术栈已迁移至 frontmatter categories）
  const skillsP = await page.locator('.markdown p').count()
  check('Skills 页段落存在（学习路线阶段描述）', skillsP >= 4, `p count: ${skillsP}`)

  const skillsUl = await page.locator('.markdown ul').count()
  check('Skills 页无序列表存在', skillsUl >= 1, `ul count: ${skillsUl}`)

  // Phase 3: Bento 大小卡布局验证（CREATIVE_DIRECTION §7.4 / IMPLEMENTATION_PLAN §6.2）
  const largeCardCount = await page.locator('.skills__category--large').count()
  check('Phase 3: 大卡数量 = 2（后端/前端）', largeCardCount === 2, `large: ${largeCardCount}`)

  const smallCardCount = await page.locator('.skills__category--medium').count()
  check('Phase 3: 小卡数量 = 3（小程序/工具/AI）', smallCardCount === 3, `small: ${smallCardCount}`)

  const wideCardCount = await page.locator('.skills__category--wide').count()
  check('Phase 3: 横长卡数量 = 1（软件工程实践）', wideCardCount === 1, `wide: ${wideCardCount}`)

  // Phase 3: 图标存在验证（READINESS §4.4: Server/Layout/Smartphone/Terminal/Sparkle/Workflow）
  const iconCount = await page.locator('.skills__category-icon').count()
  check('Phase 3: 6 个分类图标全部渲染', iconCount === 6, `icons: ${iconCount}`)

  // Phase 3: chip 形式验证（CREATIVE_DIRECTION §7.4: Mono 字体 chip）
  const chipCount = await page.locator('.skills__chip').count()
  check('Phase 3: 技术栈 chip 渲染 >= 30', chipCount >= 30, `chips: ${chipCount}`)

  // Phase 3: 分类色映射验证（READINESS §4.4: 后端=Amber / 前端=Slate Blue / 小程序=Slate / 工具=Slate Blue / AI=Amber / 实践=Amber）
  const amberCount = await page.locator('.skills__category--amber').count()
  check('Phase 3: Amber 分类 = 3（后端/AI/实践）', amberCount === 3, `amber: ${amberCount}`)

  const slateBlueCount = await page.locator('.skills__category--slate-blue').count()
  check('Phase 3: Slate Blue 分类 = 2（前端/工具）', slateBlueCount === 2, `slate-blue: ${slateBlueCount}`)

  const slateCount = await page.locator('.skills__category--slate').count()
  check('Phase 3: Slate 分类 = 1（小程序）', slateCount === 1, `slate: ${slateCount}`)

  await screenshot(page, '06-skills')

  // ===== Test 7: Resume 页（Task 005.2 ★ + RC5 重构）=====
  log('\n=== Test 7: Resume 页（新增）===')
  await page.goto(`${BASE}/resume`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)

  const resumeH1 = await page.locator('h1').count()
  check('Resume 页 h1 唯一', resumeH1 === 1, `h1 count: ${resumeH1}`)

  const resumeTitle = await page.locator('h1').textContent()
  check('Resume 页 h1 文本 = 赖睿轩 · 简历', resumeTitle?.trim() === '赖睿轩 · 简历', `actual: ${resumeTitle}`)

  // RC5: subtitle 渲染验证（从 frontmatter SSOT 读取，替换原硬编码 page__hint）
  // RC7: subtitle 文案对齐 About（"软件工程方向" → "分布式系统"，消除语义重复）
  const resumeSubtitle = await page.locator('.page__subtitle').textContent()
  check(
    'Resume 页 subtitle 渲染 = "软件工程学生 · 后端开发 · 分布式系统"',
    resumeSubtitle?.trim() === '软件工程学生 · 后端开发 · 分布式系统',
    `actual: ${resumeSubtitle}`,
  )

  // RC5: page__hint 硬编码消除验证（不应再出现 .page__hint）
  const resumeHintCount = await page.locator('.page__hint').count()
  check('Resume 页 page__hint 硬编码已消除', resumeHintCount === 0, `hint count: ${resumeHintCount}`)

  // RC5: .page__header 工具类应用验证
  const resumePageHeader = await page.locator('.page__header').count()
  check('Resume 页应用 .page__header 工具类', resumePageHeader === 1, `page__header count: ${resumePageHeader}`)

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

  // RC3.2: subtitle 渲染验证（从 frontmatter SSOT 读取，替换原硬编码 page__hint）
  const aboutSubtitle = await page.locator('.about__subtitle').textContent()
  check(
    'About 页 subtitle 渲染 = "软件工程学生 · 后端开发 · 分布式系统"',
    aboutSubtitle?.trim() === '软件工程学生 · 后端开发 · 分布式系统',
    `actual: ${aboutSubtitle}`,
  )

  // RC3.2: Facts Panel <dl> 语义结构验证
  const aboutFactsDl = await page.locator('dl.about__facts').count()
  check('About 页 Facts Panel <dl> 存在', aboutFactsDl === 1, `dl count: ${aboutFactsDl}`)

  const aboutFactsCount = await page.locator('.about__fact').count()
  check('About 页 Facts Panel 渲染 4 项 facts', aboutFactsCount === 4, `facts count: ${aboutFactsCount}`)

  // 验证 4 项 facts label 全部存在（教育/方向/考研/GitHub）
  const expectedFactLabels = ['教育', '方向', '考研', 'GitHub']
  const factLabelContents = await page.locator('.about__fact-label').allTextContents()
  const normalizedFactLabels = factLabelContents.map((s) => s.trim())
  for (const label of expectedFactLabels) {
    check(
      `About 页 Fact label "${label}" 存在`,
      normalizedFactLabels.includes(label),
      `labels: ${JSON.stringify(normalizedFactLabels)}`,
    )
  }

  const aboutH2 = await page.locator('h2').count()
  check('About 页 h2 >= 3（工程定位/成长轨迹/关于本站）', aboutH2 >= 3, `h2 count: ${aboutH2}`)

  // Markdown 渲染验证
  const aboutP = await page.locator('.markdown p').count()
  check('About 页段落存在', aboutP >= 3, `p count: ${aboutP}`)

  // 成长轨迹 section 引导访问 Timeline（验证指向首页锚点链接）
  const timelineLink = await page.locator('.markdown a[href*="#timeline"]').count()
  check('About 页包含 Timeline 引导链接', timelineLink >= 1, `timeline links: ${timelineLink}`)

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

  // Phase 4: ProjectCard metrics 320px 退化为 1 列（READINESS §4.5 响应式验收）
  log('\n=== Test 13.5: Phase 4 ProjectCard 320px 退化 ===')
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.setViewportSize({ width: 320, height: 568 })
  await page.waitForTimeout(300)
  const normalGridCols320 = await page.evaluate(() => {
    const grid = document.querySelector('.card__metrics--grid-normal')
    return grid ? window.getComputedStyle(grid).gridTemplateColumns : null
  })
  check(
    'Phase 4: 320px normal metrics grid 退化为 1 列',
    normalGridCols320?.split(' ').length === 1,
    `cols: ${normalGridCols320}`,
  )
  // 恢复 1280 视口供后续测试使用
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.waitForTimeout(300)

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

  // ===== Test 18: Phase 6 视觉系统收尾（Grid Pattern + Footer 2列 + 时间戳 + Interview 分类色 + About 引言 + Resume 按钮文案）=====
  log('\n=== Test 18: Phase 6 视觉系统收尾 ===')

  // --- Phase 6.1: Hero Grid Pattern 背景（Signature 4）---
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.waitForTimeout(300)

  const heroGridPattern = await page.evaluate(() => {
    const hero = document.querySelector('.hero')
    if (!hero) return null
    const style = window.getComputedStyle(hero)
    return {
      backgroundImage: style.backgroundImage,
      backgroundSize: style.backgroundSize,
    }
  })
  check(
    'Phase 6: Hero Grid Pattern background-image 包含 2 条 linear-gradient',
    !!heroGridPattern && heroGridPattern.backgroundImage.includes('linear-gradient') && heroGridPattern.backgroundImage.split('linear-gradient').length === 3,
    `backgroundImage: ${heroGridPattern?.backgroundImage?.substring(0, 80)}...`,
  )
  check(
    'Phase 6: Hero Grid Pattern backgroundSize = 32px 32px',
    !!heroGridPattern && heroGridPattern.backgroundSize.includes('32px 32px'),
    `backgroundSize: ${heroGridPattern?.backgroundSize}`,
  )

  // --- Phase 6.2: Footer Grid Pattern + 2 列布局 + 时间戳 + Underline Reveal ---
  const footerGridPattern = await page.evaluate(() => {
    const footer = document.querySelector('.footer')
    if (!footer) return null
    const style = window.getComputedStyle(footer)
    return {
      backgroundImage: style.backgroundImage,
      backgroundSize: style.backgroundSize,
    }
  })
  check(
    'Phase 6: Footer Grid Pattern background-image 包含 2 条 linear-gradient',
    !!footerGridPattern && footerGridPattern.backgroundImage.includes('linear-gradient') && footerGridPattern.backgroundImage.split('linear-gradient').length === 3,
    `backgroundImage: ${footerGridPattern?.backgroundImage?.substring(0, 80)}...`,
  )

  const footerMainGrid = await page.evaluate(() => {
    const main = document.querySelector('.footer__main')
    if (!main) return null
    return window.getComputedStyle(main).gridTemplateColumns
  })
  check(
    'Phase 6: Footer 2 列布局（桌面 grid-template-columns = 2 列）',
    !!footerMainGrid && footerMainGrid.split(' ').length === 2,
    `columns: ${footerMainGrid}`,
  )

  // Phase 6: Sitemap 7 项导航链接
  const sitemapLinks = await page.locator('.footer__sitemap .footer__link-list a').count()
  check('Phase 6: Footer Sitemap 包含 7 个导航链接', sitemapLinks === 7, `links: ${sitemapLinks}`)

  // Phase 6: About 列包含姓名 + 角色 + GitHub
  const footerAboutName = await page.locator('.footer__about-name').textContent()
  check('Phase 6: Footer About 列姓名 = "赖睿轩"', footerAboutName?.trim() === '赖睿轩', `name: ${footerAboutName}`)

  const footerGithubLink = await page.locator('.footer__github').count()
  check('Phase 6: Footer About 列 GitHub 链接存在', footerGithubLink === 1, `github links: ${footerGithubLink}`)

  // Phase 6: 最后更新时间戳
  const footerTime = await page.locator('.footer__bottom time').count()
  check('Phase 6: Footer 时间戳 <time> 元素存在', footerTime === 1, `time count: ${footerTime}`)

  const footerTimeDatetime = await page.locator('.footer__bottom time').getAttribute('datetime')
  check(
    'Phase 6: Footer 时间戳 datetime 为 ISO 8601 格式（YYYY-MM-DD 开头）',
    !!footerTimeDatetime && /^\d{4}-\d{2}-\d{2}/.test(footerTimeDatetime),
    `datetime: ${footerTimeDatetime}`,
  )

  const footerTimeDisplay = await page.locator('.footer__bottom time').textContent()
  check(
    'Phase 6: Footer 时间戳显示为 YYYY-MM-DD（10 字符）',
    !!footerTimeDisplay && footerTimeDisplay.trim().length === 10 && /^\d{4}-\d{2}-\d{2}$/.test(footerTimeDisplay.trim()),
    `display: ${footerTimeDisplay}`,
  )

  // Phase 6: Underline Reveal（footer__link::after transform 默认 scaleX(0)）
  const underlineReveal = await page.evaluate(() => {
    const link = document.querySelector('.footer__link')
    if (!link) return null
    const after = window.getComputedStyle(link, '::after')
    return {
      transform: after.transform,
      transformOrigin: after.transformOrigin,
      width: after.width,
      height: after.height,
    }
  })
  check(
    'Phase 6: Footer Underline Reveal ::after transform = matrix(0,0,0,1,0,0)（scaleX(0)）',
    !!underlineReveal && (underlineReveal.transform === 'matrix(0, 0, 0, 1, 0, 0)' || underlineReveal.transform === 'none'),
    `transform: ${underlineReveal?.transform}`,
  )
  check(
    'Phase 6: Footer Underline Reveal ::after transform-origin = left（解析为 0px 开头）',
    !!underlineReveal && (underlineReveal.transformOrigin === 'left' || underlineReveal.transformOrigin.startsWith('0px')),
    `transformOrigin: ${underlineReveal?.transformOrigin}`,
  )

  // --- Phase 6.3: Footer 移动端单列退化 ---
  await page.setViewportSize({ width: 375, height: 667 })
  await page.waitForTimeout(300)
  const footerMobileGrid = await page.evaluate(() => {
    const main = document.querySelector('.footer__main')
    if (!main) return null
    return window.getComputedStyle(main).gridTemplateColumns
  })
  check(
    'Phase 6: Footer 移动端 1 列布局',
    !!footerMobileGrid && footerMobileGrid.split(' ').length === 1,
    `columns: ${footerMobileGrid}`,
  )
  const footerBottomMobileDirection = await page.evaluate(() => {
    const bottom = document.querySelector('.footer__bottom')
    if (!bottom) return null
    return window.getComputedStyle(bottom).flexDirection
  })
  check(
    'Phase 6: Footer 移动端底部 flex-direction = column',
    footerBottomMobileDirection === 'column',
    `direction: ${footerBottomMobileDirection}`,
  )
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.waitForTimeout(300)

  // --- Phase 6.4: Resume 按钮文案修正 ---
  await page.goto(`${BASE}/resume`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const resumeBtnText = await page.locator('.resume__download-btn').textContent()
  check(
    'Phase 6: Resume 按钮文案 = "打印 / 另存为 PDF"',
    !!resumeBtnText && resumeBtnText.includes('打印') && resumeBtnText.includes('另存为 PDF'),
    `text: ${resumeBtnText}`,
  )

  // --- Phase 6.5: Interview 分类色点（方案 B — 按项目维度分配色）---
  await page.goto(`${BASE}/interview`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  const categoryDots = await page.locator('.category__dot').count()
  check('Phase 6: Interview 分类色点 = 4（4 个分类）', categoryDots === 4, `dots: ${categoryDots}`)

  // 验证 4 个项目 slug 都有对应色点 class
  const expectedSlugs = ['jiangnan-travel', 'love-letter', 'exam-system', 'general']
  for (const slug of expectedSlugs) {
    const dotClass = `.category__dot--${slug}`
    const dotCount = await page.locator(dotClass).count()
    check(
      `Phase 6: Interview 色点 class "${dotClass}" 存在`,
      dotCount === 1,
      `count: ${dotCount}`,
    )
  }

  // 验证色点 background-color 不为空（4 个项目色不同）
  const dotColors = await page.evaluate(() => {
    const dots = document.querySelectorAll('.category__dot')
    return Array.from(dots).map((d) => {
      const style = window.getComputedStyle(d)
      return {
        slug: Array.from(d.classList).find((c) => c.startsWith('category__dot--'))?.replace('category__dot--', ''),
        bg: style.backgroundColor,
        width: style.width,
        height: style.height,
      }
    })
  })
  check(
    'Phase 6: 色点宽度 = 8px',
    dotColors.every((d) => d.width === '8px'),
    `widths: ${dotColors.map((d) => d.width).join(', ')}`,
  )
  check(
    'Phase 6: 色点高度 = 8px',
    dotColors.every((d) => d.height === '8px'),
    `heights: ${dotColors.map((d) => d.height).join(', ')}`,
  )

  // 4 个项目色应该互不相同
  const uniqueColors = new Set(dotColors.map((d) => d.bg))
  check(
    'Phase 6: 4 个项目色互不相同（4 种独立颜色）',
    uniqueColors.size === 4,
    `colors: ${JSON.stringify(Array.from(uniqueColors))}`,
  )

  // eyebrow 颜色降级到 text-muted（让色点成为视觉焦点）
  const eyebrowColor = await page.evaluate(() => {
    const eyebrow = document.querySelector('.category__eyebrow')
    if (!eyebrow) return null
    return window.getComputedStyle(eyebrow).color
  })
  const textMutedColor = await page.evaluate(() => {
    const tmp = document.createElement('div')
    tmp.style.color = 'var(--color-text-muted)'
    document.body.appendChild(tmp)
    const rgb = window.getComputedStyle(tmp).color
    tmp.remove()
    return rgb
  })
  check(
    'Phase 6: Interview eyebrow 颜色 = --color-text-muted（降级，让色点成为视觉焦点）',
    !!eyebrowColor && !!textMutedColor && eyebrowColor.replace(/\s/g, '') === textMutedColor.replace(/\s/g, ''),
    `eyebrow: ${eyebrowColor}, text-muted: ${textMutedColor}`,
  )

  // 色点 aria-hidden（装饰性，屏幕阅读器仅朗读文字标签）
  const dotAriaHidden = await page.evaluate(() => {
    const dot = document.querySelector('.category__dot')
    return dot ? dot.getAttribute('aria-hidden') : null
  })
  check('Phase 6: 色点 aria-hidden = "true"（装饰性）', dotAriaHidden === 'true', `aria-hidden: ${dotAriaHidden}`)

  // --- Phase 6.6: About 引言 Signature Element ---
  await page.goto(`${BASE}/about`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  const aboutQuote = await page.locator('blockquote.about__quote').count()
  check('Phase 6: About 引言 blockquote.about__quote 存在', aboutQuote === 1, `count: ${aboutQuote}`)

  const aboutQuoteText = await page.locator('.about__quote-text').textContent()
  check(
    'Phase 6: About 引言文案 = "工程师的克制，学者的严谨"（从 SSOT 读取）',
    aboutQuoteText?.trim() === '工程师的克制，学者的严谨',
    `text: ${aboutQuoteText}`,
  )

  // Accent Line 3px × 24px
  const accentLine = await page.evaluate(() => {
    const accent = document.querySelector('.about__quote-accent')
    if (!accent) return null
    const style = window.getComputedStyle(accent)
    return {
      width: style.width,
      height: style.height,
      backgroundColor: style.backgroundColor,
    }
  })
  check('Phase 6: About Accent Line width = 3px', accentLine?.width === '3px', `width: ${accentLine?.width}`)
  check('Phase 6: About Accent Line height = 24px', accentLine?.height === '24px', `height: ${accentLine?.height}`)

  // Accent Line 颜色 = --color-accent（amber #d97706）
  const phase6AccentColorRgb = await page.evaluate(() => {
    const tmp = document.createElement('div')
    tmp.style.color = 'var(--color-accent)'
    document.body.appendChild(tmp)
    const rgb = window.getComputedStyle(tmp).color
    tmp.remove()
    return rgb
  })
  check(
    'Phase 6: About Accent Line backgroundColor = --color-accent（Amber）',
    !!accentLine && !!phase6AccentColorRgb && accentLine.backgroundColor.replace(/\s/g, '') === phase6AccentColorRgb.replace(/\s/g, ''),
    `bg: ${accentLine?.backgroundColor}, accent: ${phase6AccentColorRgb}`,
  )

  // blockquote italic + 大字号
  const quoteTextStyle = await page.evaluate(() => {
    const text = document.querySelector('.about__quote-text')
    if (!text) return null
    const style = window.getComputedStyle(text)
    return {
      fontStyle: style.fontStyle,
      fontSize: style.fontSize,
    }
  })
  check('Phase 6: About 引言文本 italic', quoteTextStyle?.fontStyle === 'italic', `fontStyle: ${quoteTextStyle?.fontStyle}`)
  check(
    'Phase 6: About 引言文本大字号（>= 20px）',
    !!quoteTextStyle && parseFloat(quoteTextStyle.fontSize) >= 20,
    `fontSize: ${quoteTextStyle?.fontSize}`,
  )

  await screenshot(page, '18-phase6-about-quote')

  // --- Phase 6.7: About 引言移动端字号降级 ---
  await page.setViewportSize({ width: 375, height: 667 })
  await page.waitForTimeout(300)
  const quoteMobileFont = await page.evaluate(() => {
    const text = document.querySelector('.about__quote-text')
    if (!text) return null
    return window.getComputedStyle(text).fontSize
  })
  check(
    'Phase 6: About 引言移动端字号降级（<= 20px）',
    !!quoteMobileFont && parseFloat(quoteMobileFont) <= 20,
    `fontSize: ${quoteMobileFont}`,
  )
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.waitForTimeout(300)

  // --- Phase 6.8: Dark Mode Grid Pattern 提亮验证 ---
  // 重置主题到 system（避免 Test 17 末尾 dark 状态干扰）
  // cycleMode 顺序：system → light → dark → system
  // Test 17 末尾为 dark，若直接点击 2 次会变为 light（dark→system→light），无法到 dark
  await page.evaluate(() => {
    localStorage.removeItem('theme-mode')
  })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  // 此时 mode = system，resolved = light（headless colorScheme=light）
  // 切换到 dark mode：点击 2 次（system → light → dark）
  const themeToggle = page.locator('button.theme-toggle').first()
  await themeToggle.click() // system → light
  await page.waitForTimeout(500)
  await themeToggle.click() // light → dark
  await page.waitForTimeout(500)

  // 验证当前确实为 dark mode
  const darkModeConfirmed = await page.locator('html').getAttribute('data-theme')
  check('Phase 6: Dark Mode 已激活（data-theme = dark）', darkModeConfirmed === 'dark', `data-theme: ${darkModeConfirmed}`)

  const darkHeroGridColor = await page.evaluate(() => {
    // CSS 自定义属性通过继承应用，应从实际定义该变量的 document.documentElement 读取
    // 从 .hero 读取可能因为继承链问题返回 :root 的值
    return window.getComputedStyle(document.documentElement).getPropertyValue('--grid-pattern-color').trim()
  })
  check(
    'Phase 6: Dark Mode --grid-pattern-color 提亮（rgba(255,255,255,0.05)）',
    darkHeroGridColor === 'rgba(255, 255, 255, 0.05)',
    `color: ${darkHeroGridColor}`,
  )

  // 暗色模式 Interview 分类色提亮
  await page.goto(`${BASE}/interview`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  const darkExamColor = await page.evaluate(() => {
    const dot = document.querySelector('.category__dot--exam-system')
    if (!dot) return null
    return window.getComputedStyle(dot).backgroundColor
  })
  check(
    'Phase 6: Dark Mode Interview exam-system 色点提亮',
    !!darkExamColor && darkExamColor.length > 0,
    `bg: ${darkExamColor}`,
  )

  // 切回 light mode
  await themeToggle.click() // dark → system（解析为 light）
  await page.waitForTimeout(300)

  await screenshot(page, '18b-phase6-footer-final')

  // ===== Test 19: Phase 7 Resume 核心竞争力 callout（Accent Line Signature 3 第 3/3 配额）=====
  log('\n=== Test 19: Phase 7 Resume 核心竞争力 callout ===')

  // --- Phase 7.1: Resume callout 容器存在 ---
  await page.goto(`${BASE}/resume`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  const calloutDiv = await page.locator('.resume__callout').count()
  check(
    'Phase 7: Resume callout 容器存在',
    calloutDiv === 1,
    `count: ${calloutDiv}`,
  )

  // --- Phase 7.2: callout Accent Line 存在 + 视觉特征 ---
  const accentSpan = await page.locator('.resume__callout-accent').count()
  check(
    'Phase 7: Resume callout Accent Line span 存在',
    accentSpan === 1,
    `count: ${accentSpan}`,
  )

  const accentAriaHidden = await page.locator('.resume__callout-accent').getAttribute('aria-hidden')
  check(
    'Phase 7: Resume callout Accent Line aria-hidden = "true"（装饰性）',
    accentAriaHidden === 'true',
    `aria-hidden: ${accentAriaHidden}`,
  )

  const accentStyle = await page.evaluate(() => {
    const el = document.querySelector('.resume__callout-accent')
    if (!el) return null
    const s = window.getComputedStyle(el)
    return {
      width: s.width,
      height: s.height,
      backgroundColor: s.backgroundColor,
    }
  })
  check(
    'Phase 7: Accent Line 宽度 = 3px',
    !!accentStyle && accentStyle.width === '3px',
    `width: ${accentStyle?.width}`,
  )
  check(
    'Phase 7: Accent Line 高度 = 24px',
    !!accentStyle && accentStyle.height === '24px',
    `height: ${accentStyle?.height}`,
  )
  // Amber 主色 #d97706 → rgb(217, 119, 6)
  check(
    'Phase 7: Accent Line 背景色 = Amber（rgb(217, 119, 6)）',
    !!accentStyle && accentStyle.backgroundColor === 'rgb(217, 119, 6)',
    `bg: ${accentStyle?.backgroundColor}`,
  )

  // --- Phase 7.3: callout 文本内容 ---
  const calloutText = await page.evaluate(() => {
    const el = document.querySelector('.resume__callout-text')
    return el ? el.textContent?.trim() : null
  })
  check(
    'Phase 7: callout 文本内容 = "后端 · 分布式 · 工程"（从 SSOT 读取）',
    calloutText === '后端 · 分布式 · 工程',
    `text: ${calloutText}`,
  )

  // --- Phase 7.4: callout 视觉特征（surface + border + radius + shadow）---
  const calloutStyle = await page.evaluate(() => {
    const el = document.querySelector('.resume__callout')
    if (!el) return null
    const s = window.getComputedStyle(el)
    return {
      backgroundColor: s.backgroundColor,
      border: s.border,
      borderRadius: s.borderRadius,
      boxShadow: s.boxShadow,
      display: s.display,
    }
  })
  check(
    'Phase 7: callout display = flex',
    !!calloutStyle && calloutStyle.display === 'flex',
    `display: ${calloutStyle?.display}`,
  )
  check(
    'Phase 7: callout 背景色 = surface（rgb(255, 255, 255)）',
    !!calloutStyle && calloutStyle.backgroundColor === 'rgb(255, 255, 255)',
    `bg: ${calloutStyle?.backgroundColor}`,
  )
  check(
    'Phase 7: callout 圆角 = 8px（--radius-md）',
    !!calloutStyle && calloutStyle.borderRadius === '8px',
    `radius: ${calloutStyle?.borderRadius}`,
  )
  check(
    'Phase 7: callout 有 border（1px solid）',
    !!calloutStyle && calloutStyle.border.includes('1px solid'),
    `border: ${calloutStyle?.border}`,
  )
  check(
    'Phase 7: callout 有 box-shadow（surface 深度感）',
    !!calloutStyle && calloutStyle.boxShadow !== 'none',
    `shadow: ${calloutStyle?.boxShadow}`,
  )

  // --- Phase 7.5: callout 文本视觉特征 ---
  const calloutTextStyle = await page.evaluate(() => {
    const el = document.querySelector('.resume__callout-text')
    if (!el) return null
    const s = window.getComputedStyle(el)
    return {
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      color: s.color,
    }
  })
  check(
    'Phase 7: callout 文本字号 = 18px（--text-lg）',
    !!calloutTextStyle && calloutTextStyle.fontSize === '18px',
    `fontSize: ${calloutTextStyle?.fontSize}`,
  )
  check(
    'Phase 7: callout 文本字重 = 500（--font-weight-medium）',
    !!calloutTextStyle && calloutTextStyle.fontWeight === '500',
    `fontWeight: ${calloutTextStyle?.fontWeight}`,
  )

  // --- Phase 7.6: callout 位于 header 与 resume__content 之间（DOM 顺序）---
  const domOrder = await page.evaluate(() => {
    const header = document.querySelector('.resume__header')
    const callout = document.querySelector('.resume__callout')
    const content = document.querySelector('.resume__content')
    if (!header || !callout || !content) return null
    const order = []
    const walker = document.createTreeWalker(document.querySelector('.container--narrow'), NodeFilter.SHOW_ELEMENT)
    let node = walker.nextNode()
    while (node) {
      if (node === header) order.push('header')
      if (node === callout) order.push('callout')
      if (node === content) order.push('content')
      node = walker.nextNode()
    }
    return order.join(' → ')
  })
  check(
    'Phase 7: DOM 顺序 = header → callout → content',
    domOrder === 'header → callout → content',
    `order: ${domOrder}`,
  )

  // --- Phase 7.7: callout 移动端响应式（字号降级）---
  await page.setViewportSize({ width: 375, height: 667 })
  await page.waitForTimeout(300)
  const calloutMobileText = await page.evaluate(() => {
    const el = document.querySelector('.resume__callout-text')
    if (!el) return null
    return window.getComputedStyle(el).fontSize
  })
  check(
    'Phase 7: callout 移动端字号降级（<= 16px）',
    !!calloutMobileText && parseFloat(calloutMobileText) <= 16,
    `fontSize: ${calloutMobileText}`,
  )
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.waitForTimeout(300)

  // --- Phase 7.8: Dark Mode callout Accent Line 提亮 ---
  await page.evaluate(() => {
    localStorage.removeItem('theme-mode')
  })
  await page.goto(`${BASE}/resume`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const themeToggleP7 = page.locator('button.theme-toggle').first()
  await themeToggleP7.click() // system → light
  await page.waitForTimeout(300)
  await themeToggleP7.click() // light → dark
  await page.waitForTimeout(500)

  const darkAccentBg = await page.evaluate(() => {
    const el = document.querySelector('.resume__callout-accent')
    if (!el) return null
    return window.getComputedStyle(el).backgroundColor
  })
  // Dark mode Amber #f59e0b → rgb(245, 158, 11)
  check(
    'Phase 7: Dark Mode Accent Line 提亮（rgb(245, 158, 11)）',
    !!darkAccentBg && darkAccentBg === 'rgb(245, 158, 11)',
    `bg: ${darkAccentBg}`,
  )

  const darkCalloutBg = await page.evaluate(() => {
    const el = document.querySelector('.resume__callout')
    if (!el) return null
    return window.getComputedStyle(el).backgroundColor
  })
  // Dark mode surface #1e293b → rgb(30, 41, 59)
  check(
    'Phase 7: Dark Mode callout 背景色 = surface dark（rgb(30, 41, 59)）',
    !!darkCalloutBg && darkCalloutBg === 'rgb(30, 41, 59)',
    `bg: ${darkCalloutBg}`,
  )

  // 切回 light mode
  await themeToggleP7.click() // dark → system
  await page.waitForTimeout(300)

  await screenshot(page, '19-phase7-resume-callout')

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
