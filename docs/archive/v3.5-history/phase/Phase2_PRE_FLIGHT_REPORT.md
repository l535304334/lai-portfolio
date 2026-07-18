# Portfolio v3.5 Phase 2 Pre-Flight Report

**Phase**: 2 — Hero 视觉主角（Code Snippet Card）
**日期**: 2026-07-17
**前置**: Phase 1 Review Gate PASS
**遵循文档**:
- 《Portfolio_v3.5_CREATIVE_DIRECTION.md》§3 方案 A / §6 锁定决策
- 《Portfolio_v3.5_IMPLEMENTATION_PLAN.md》§2 Phase 2 / §4.2 方案 A
- 《Portfolio_v3.5_IMPLEMENTATION_READINESS.md》§1.3 / §4.3 Phase 2 Review Gate

---

## 1. Pre-Flight Check 任务确认

| # | 任务 | 状态 |
|---|------|------|
| 1 | 再次确认 Hero 首屏 LCP 元素未应用 Scroll Reveal | ✅ 已确认 |
| 2 | 检查 HeroSection 当前 DOM、CSS、响应式布局，为 Code Snippet Card 预留空间 | ✅ 已完成 |
| 3 | 确认 1024–1279px 断点布局、Stats Panel 挤压、Hero 高度、移动端首屏 | ✅ 已分析 |
| 4 | 禁止编写 Hero 代码、禁止修改源码 | ✅ 仅技术确认 |

---

## 2. Hero 当前结构分析

### 2.1 Phase 1 后的 LCP 元素确认

审查 [HeroSection.vue](file:///c:/Users/lai/Desktop/个人网页/src/components/home/HeroSection.vue) 第 17-19 行：

```typescript
// Phase 1: 仅 stats grid 应用 Scroll Reveal（stagger group）
// Hero 首屏核心内容（eyebrow / title / subtitle / actions）不应用，避免影响 LCP
const { target: statsGrid } = useScrollReveal()
```

**LCP 元素状态确认**：

| 元素 | 是否应用 Scroll Reveal | 是否影响 LCP |
|------|----------------------|--------------|
| `.hero__eyebrow`（// 赖睿轩 · 软件工程学生） | ❌ 未应用 | LCP 候选 |
| `.hero__title`（h1，客户端 · Serverless · 分布式系统） | ❌ 未应用 | **LCP 主元素** |
| `.hero__subtitle` | ❌ 未应用 | LCP 候选 |
| `.hero__actions`（CTA 按钮） | ❌ 未应用 | — |
| `.hero__stats-label`（// 工程规模） | ❌ 未应用 | — |
| `.hero__stats-grid`（4 stats） | ✅ 应用（stagger group） | 首屏内但非 LCP |
| `.hero__scroll`（滚动提示） | ❌ 未应用 | — |

**结论**：✅ Hero 首屏所有 LCP 候选元素（eyebrow / title / subtitle）**均未应用 Scroll Reveal**，不会因 `opacity:0` 或 `transform` 延迟 LCP 渲染。Phase 1 仅对 `.hero__stats-grid`（首屏内但非 LCP 元素）应用 stagger，且该元素进入视口即立即触发 `ready → visible`（首屏内）。

### 2.2 当前 DOM 结构

```
<section class="hero">  min-height: calc(100vh - nav-height), flex column, justify-center
├── <div class="container hero__grid">  grid: 1fr (mobile) / 7fr 5fr (≥768px)
│   ├── <div class="hero__main">  左列 7fr
│   │   ├── <p class="hero__eyebrow mono">// 赖睿轩 · 软件工程学生</p>
│   │   ├── <h1 class="hero__title">客户端 · Serverless · 分布式系统<span>三类工程实践</span></h1>
│   │   ├── <p class="hero__subtitle">三个完整项目...</p>
│   │   └── <div class="hero__actions">
│   │       ├── <a class="hero__cta--primary">浏览项目</a>
│   │       └── <a class="hero__cta--ghost">GitHub</a>
│   └── <aside class="hero__stats">  右列 5fr, padding 24px, surface bg, border, radius-lg, shadow-md
│       ├── <p class="hero__stats-label mono">// 工程规模</p>
│       └── <dl class="hero__stats-grid" data-stagger-group>  grid 2x2
│           └── 4 × <div class="hero__stat"> (value + label)
└── <a class="hero__scroll">↓</a>  absolute, bottom center
```

### 2.3 当前 CSS 关键值

| 属性 | 值 | 说明 |
|------|-----|------|
| `.hero` padding | `var(--space-20) 0 var(--space-16)` | 上 80px / 下 64px |
| `.hero` min-height | `calc(100vh - var(--nav-height))` | 桌面 ≈ 720px |
| `.hero__grid` grid-template-columns | `1fr` (mobile) / `7fr 5fr` (≥768px) | 当前双列比例 |
| `.hero__grid` gap | `var(--space-12)` (48px) / `var(--space-16)` (64px) | 移动 / 桌面 |
| `.hero__stats` padding | `var(--space-6)` (24px) | stats panel 内边距 |
| `.hero__stats` 背景 | `var(--color-surface)` + `border` + `radius-lg` + `shadow-md` | code-style aside |

### 2.4 响应式断点（当前）

| 断点 | grid-template-columns | title 字号 | stats-grid 列数 |
|------|----------------------|-----------|----------------|
| < 768px | `1fr`（单列） | `--text-4xl` (36px) | `repeat(2, 1fr)` |
| ≥ 768px | `7fr 5fr`（双列） | `--text-5xl` (48px) | `repeat(2, 1fr)` |

**关键观察**：当前仅一个断点（768px），无双列中间态。1024–1279px 区间当前使用 7fr/5fr。

---

## 3. Code Snippet Card 推荐放置位置

### 3.1 设计文档要求

依据《IMPLEMENTATION_PLAN》§2 Phase 2 + §4.2 + 《READINESS》§1.3.2：

**推荐方案 W（文档锁定）**：桌面 6fr/4fr，代码片段在上 + Stats Panel 在下（垂直堆叠）

```
桌面 ≥1024px:
grid-template-columns: 6fr 4fr;
┌──────────────────┬──────────────┐
│ hero__main       │ code snippet │ ← 新增（视觉主角）
│ - eyebrow        │ ─────────────│
│ - title          │ hero__stats  │
│ - subtitle       │ - 4 stats    │
│ - actions        │              │
└──────────────────┴──────────────┘
```

### 3.2 垂直空间计算（桌面）

依据《READINESS》§1.3.2：

| 元素 | 预估高度 |
|------|----------|
| 代码片段卡片（10-12 行 + padding + header） | ≈ 320px |
| gap（代码片段 ↔ stats） | ≈ 16-24px |
| Stats Panel（label + 2x2 grid + padding） | ≈ 200px |
| **右侧总高度** | **≈ 536-544px** |
| Hero min-height（桌面） | ≈ 720px |
| **剩余空间** | **≈ 176px**（充足） |

**结论**：桌面端垂直空间充足，6fr/4fr + 上下叠方案可行。

### 3.3 移动端策略

依据《READINESS》§1.3.2 + §4.3：

```
移动端 <768px: 单列，代码片段优先（视觉主角优先）
┌──────────────────┐
│ hero__main       │
│ - eyebrow        │
│ - title          │
│ - subtitle       │
│ - actions        │
├──────────────────┤
│ code snippet     │ ← 视觉主角
├──────────────────┤
│ hero__stats      │
└──────────────────┘
```

---

## 4. 需要修改的文件列表

### 4.1 必须修改

| 文件 | 修改内容 | 风险 |
|------|----------|------|
| `src/components/home/HeroSection.vue` | 新增代码片段卡片 DOM + CSS；调整 grid 7fr/5fr → 6fr/4fr；新增 1024px 断点 | 中（核心改动） |
| `src/utils/content.ts` | 扩展 contentPlugin，新增 `virtual:hero-snippet` 虚拟模块，构建时调用 `codeToHtml` 预渲染 | 低（扩展已有插件） |

### 4.2 可能修改

| 文件 | 修改内容 | 触发条件 |
|------|----------|----------|
| `src/styles/code-theme.css` | 若 Hero 代码片段需要特殊样式（如 mac-style window dots、文件名 header） | 若设计需要装饰元素 |
| `src/styles/tokens.css` | 若需要新增 `--code-snippet-*` Token | 不推荐，应复用现有 `--code-bg` / `--color-surface` / `--color-border` |

### 4.3 不修改

| 文件 | 原因 |
|------|------|
| `vite.config.ts` | contentPlugin 已注册，扩展在 content.ts 内完成，无需修改 config |
| `src/utils/markdown.ts` | getHighlighter 已支持 typescript，无需扩展 |
| `src/styles/motion.css` | 代码片段不应用 Scroll Reveal（首屏可见），无需修改 |
| `src/composables/useScrollReveal.ts` | 同上 |
| 任何 Markdown SSOT 文件 | 代码片段是静态字符串，不从 Markdown 读取 |

---

## 5. 是否需要新增组件

### 5.1 分析

**《IMPLEMENTATION_PLAN》§4.2 明确说明**：
> 可消耗 0 个组件配额（直接在 HeroSection 内实现）

**《IMPLEMENTATION_PLAN》§2 Phase 2 提到**：
> 可能新增 1 个组件（消耗配额，待方案确认）

**两种实现路径**：

| 路径 | 实现 | 优点 | 缺点 |
|------|------|------|------|
| A. 内联实现 | 代码片段卡片直接在 HeroSection.vue 内用 `<figure><pre v-html="...">` | 0 组件配额；Hero 专属无复用需求；与 HeroSection 强耦合合理 | HeroSection.vue 行数增加 |
| B. 新增 `HeroCodeSnippet.vue` | 封装代码片段卡片样式 + 接收预渲染 HTML | 关注点分离；HeroSection 更简洁 | 消耗 1 组件配额；无复用场景；props 传递增加复杂度 |

### 5.2 推荐

**推荐路径 A（内联实现）**。理由：

1. 《IMPLEMENTATION_PLAN》§4.2 明确说"可消耗 0 个组件配额"
2. 代码片段是 Hero 专属视觉元素，无复用场景
3. 组件配额仅剩 1 个，应预留给 Phase 5 DecisionSection 重设计（依据《READINESS》风险矩阵）
4. HeroSection.vue 当前仅 254 行，内联后预计 320-360 行，仍在合理范围
5. 预渲染 HTML 通过虚拟模块导入，HeroSection 只需 `v-html` 渲染，逻辑简单

---

## 6. 是否消耗组件配额

**不消耗**。

| 项目 | 配额 |
|------|------|
| 总配额（v3.5 起始） | 2 |
| Phase 0-1 已用 | 0（ArchitectureDiagram / DecisionSection 为 Phase 0 前已存在） |
| Phase 2 预计 | 0（内联实现） |
| **剩余** | **2**（其中 1 个预留给 Phase 5） |

---

## 7. 响应式风险分析

### 7.1 断点策略设计

依据《READINESS》§4.3 验收要求 + 当前仅 768px 单断点的现实：

**推荐三断点策略**：

| 断点 | grid-template-columns | 代码片段位置 | Stats Panel 位置 |
|------|----------------------|--------------|------------------|
| < 768px（移动） | `1fr`（单列） | main 下方，stats 上方 | 代码片段下方 |
| 768px–1023px（平板） | `7fr 5fr`（保留当前） | **不显示** ⚠️ | 右侧（当前布局） |
| ≥ 1024px（桌面） | `6fr 4fr`（新） | 右侧上方 | 右侧下方（垂直堆叠） |

**关键决策点**：768-1023px 区间是否显示代码片段？

- **选项 A**：不显示（仅 ≥1024px 显示）— 简单，但平板用户看不到视觉主角
- **选项 B**：显示在 main 下方（单列堆叠）— 平板用户可见，但破坏双列布局
- **选项 C**：768px 起就用 6fr/4fr + 上下叠 — 统一，但 768px 时 4fr ≈ 280px 可能太窄

**推荐选项 A**（不显示），理由：
1. 《READINESS》§4.3 明确要求"1024px：7fr/5fr fallback"
2. 平板用户占比较小，且 stats panel 仍提供视觉支撑
3. 移动端单列时显示，保证移动用户体验
4. 实现最简单，风险最低

### 7.2 用户关注的四个风险点分析

#### 风险 1：1024–1279px 断点布局破坏 ⚠️

**当前状态**：1024-1279px 使用 7fr/5fr
**Phase 2 后**：1024px+ 切换到 6fr/4fr

**计算**（1024px viewport）：
- container max-width: 1200px，但 1024px < 1200px，所以容器宽度 ≈ 1024 - 48*2 = 928px
- 6fr/4fr 比例下：
  - hero__main: 928 × 6/10 = 557px ✅（充足）
  - 右侧（代码片段 + stats）: 928 × 4/10 = 371px ✅（≥ 320px 最低要求）

**计算**（1279px viewport）：
- 容器宽度 ≈ 1279 - 96 = 1183px
- 6fr/4fr：右侧 = 1183 × 4/10 = 473px ✅

**结论**：✅ 1024-1279px 区间 6fr/4fr 布局可行，右侧 ≥ 371px，代码片段可读。

#### 风险 2：Stats Panel 挤压

**当前**（7fr/5fr @ 1280px）：stats panel 宽度 ≈ 1280 × 5/12 = 533px
**Phase 2 后**（6fr/4fr @ 1280px）：stats panel 宽度 ≈ 1280 × 4/10 = 512px

**差异**：-21px（约 -4%）

**stats-grid 内部**：
- 2x2 grid，每个 stat cell 当前 ≈ 240px，Phase 2 后 ≈ 220px
- stat 内容：value（text-2xl 24px）+ label（text-xs 12px）
- 220px 宽度完全可容纳

**结论**：✅ Stats Panel 轻微缩小（-4%），不影响可读性。

#### 风险 3：Hero 高度异常增加

**桌面端**：
- 右侧总高度 ≈ 536-544px（代码片段 320px + gap 24px + stats 200px）
- Hero min-height ≈ 720px
- 左侧 main 高度 ≈ 400-500px
- **结论**：右侧 < min-height，不会撑高 Hero ✅

**移动端**：
- main（400px）+ 代码片段（320px）+ stats（200px）+ gap = ≈ 960px
- Hero min-height = 100vh - nav（移动端 ≈ 600px）
- **风险**：移动端 Hero 可能达 960px，超过一屏

**缓解**：
- 移动端代码片段限制 ≤ 10 行（减少高度至 ≈ 280px）
- 移动端 stats grid 保持 2x2（不改为 4x1）
- 接受移动端 Hero 略高于一屏（用户可滚动查看 stats）

#### 风险 4：移动端首屏超过合理高度

**计算**（375px viewport）：
- main（eyebrow + title + subtitle + actions）≈ 380px
- 代码片段（10 行 + header + padding）≈ 280px
- stats panel（2x2 + label + padding）≈ 200px
- 总高度 ≈ 860px + gap

**合理高度参考**：移动端首屏 ≈ 667px（iPhone SE）- nav(60px) = 607px

**结论**：⚠️ 移动端 Hero 总高度（≈ 860px）会超过首屏，但这是可接受的——用户滚动后可看到代码片段和 stats。

**缓解措施**：
- 移动端代码片段字号略小（`--text-xs` 12px 而非 `--text-sm` 14px）
- 移动端代码片段 `overflow-x: auto`，避免长行换行
- Hero `min-height` 在移动端可考虑移除（让内容自然撑开），但需评估视觉影响

---

## 8. Performance 风险分析

### 8.1 关键风险：Shiki 运行时调用导致 LCP 退化

**《READINESS》§1.3.1 明确警告**：
> Shiki 单例在浏览器端首次调用会触发 WASM + 语法文件下载（约 200-400KB），严重威胁 LCP

**MUST 级别要求**：构建时预渲染代码片段 HTML，禁止运行时 Shiki

### 8.2 现有 Shiki 基建审计

审查 [src/utils/markdown.ts](file:///c:/Users/lai/Desktop/个人网页/src/utils/markdown.ts)：

```typescript
// 已有 Shiki highlighter 单例
let highlighter: Highlighter | null = null

async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-dark'],
      langs: ['javascript', 'typescript', 'java', 'python', 'bash', 'json', 'sql', 'yaml'],
    })
  }
  return highlighter
}
```

**审计结论**：
- ✅ Shiki 已在构建时使用（`renderMarkdown` 在 contentPlugin 内调用）
- ✅ `typescript` 语言已加载
- ✅ `github-dark` 主题已加载
- ✅ `codeToHtml` 已封装在 `highlight()` 函数内
- ✅ [code-theme.css](file:///c:/Users/lai/Desktop/个人网页/src/styles/code-theme.css) 已定义 `.shiki` 样式（背景、行号、字体）

### 8.3 推荐预渲染实现路径

**方案 A（推荐）**：扩展 contentPlugin，新增 `virtual:hero-snippet` 虚拟模块

```typescript
// 在 src/utils/content.ts 内新增：
const VIRTUAL_HERO_SNIPPET_ID = 'virtual:hero-snippet'
const RESOLVED_HERO_SNIPPET_ID = '\0' + VIRTUAL_HERO_SNIPPET_ID

// 代码片段静态字符串（江南出行分布式锁 acquireLock）
const HERO_SNIPPET_CODE = `// distributed-lock.ts
async function acquireLock(
  key: string,
  ttl: number
): Promise<boolean> {
  const token = uuid()
  const ok = await redis.set(
    key, token,
    'PX', ttl, 'NX'
  )
  return ok === 'OK'
}`

// 在 resolveId / load 钩子中处理：
async load(id) {
  if (id === RESOLVED_HERO_SNIPPET_ID) {
    const highlighter = await getHighlighter()
    const html = highlighter.codeToHtml(HERO_SNIPPET_CODE, {
      lang: 'typescript',
      theme: 'github-dark',
    })
    return `export default ${JSON.stringify(html)}`
  }
  // ... 其他虚拟模块
}
```

**HeroSection.vue 使用**：
```typescript
import heroSnippetHtml from 'virtual:hero-snippet'
// template: <pre v-html="heroSnippetHtml" />
```

**优点**：
- 复用现有 Shiki 基建，零新依赖
- 零运行时 Shiki 调用（构建时预渲染）
- 零新文件（扩展 content.ts）
- HTML 作为虚拟模块，不增加 dist 文件数
- 与现有 `virtual:*` 模式一致

**缺点**：
- content.ts 增加 ≈ 30 行

### 8.4 性能验收目标

依据《READINESS》§4.3：

| 指标 | 目标 | 预期达成 |
|------|------|----------|
| LCP 退化 | ≤ 50ms | ✅ 构建时预渲染，零运行时 Shiki |
| Build time 增量 | ≤ +2s | ✅ Shiki 单例已初始化，额外一次 codeToHtml < 100ms |
| 代码片段 HTML 体积 | ≤ +2 KB gzip | ✅ 10 行 TypeScript 代码 + Shiki span 标签 ≈ 1-1.5 KB gzip |
| Hero 区域 CLS | = 0 | ⚠️ 需为代码片段容器预留高度（见 §7.2 风险 3） |

### 8.5 CLS 风险与缓解

**风险**：代码片段 HTML 异步加载（虚拟模块在 JS bundle 内，需 JS 执行后渲染）可能导致 Hero 右侧高度从 0 → 320px，引起 CLS。

**缓解方案**：
1. **为代码片段容器预留 min-height**：`.hero__snippet { min-height: 320px; }`（桌面）
2. **虚拟模块同步导入**：`import heroSnippetHtml from 'virtual:hero-snippet'` 是同步导入，HTML 字符串在 JS bundle 内，首次渲染即可用
3. **Hero min-height 保护**：Hero 本身有 `min-height: calc(100vh - nav-height)`，整体高度稳定

**结论**：通过预留 min-height + 同步导入，CLS = 0 可达成。

---

## 9. 是否存在阻塞 Phase 2 的问题

### 9.1 阻塞项检查

| # | 检查项 | 状态 | 说明 |
|---|--------|------|------|
| 1 | Hero 首屏 LCP 元素是否应用 Scroll Reveal | ✅ 无阻塞 | Phase 1 仅对 stats-grid 应用，LCP 元素未应用 |
| 2 | Shiki 构建时基建是否就绪 | ✅ 无阻塞 | markdown.ts 已有 highlighter 单例 + codeToHtml，typescript 已加载 |
| 3 | contentPlugin 是否可扩展 | ✅ 无阻塞 | content.ts 已有 8 个虚拟模块，新增 1 个模式成熟 |
| 4 | code-theme.css 是否覆盖 Hero 代码片段样式 | ✅ 无阻塞 | `.shiki` 类样式已定义，可直接复用 |
| 5 | 组件配额是否充足 | ✅ 无阻塞 | 内联实现，不消耗配额 |
| 6 | 1024-1279px 布局是否可行 | ✅ 无阻塞 | 6fr/4fr 下右侧 ≥ 371px，代码片段可读 |
| 7 | 移动端高度是否可接受 | ⚠️ 需设计决策 | 移动端 Hero ≈ 860px 超首屏，但可接受（用户滚动） |
| 8 | 代码片段内容是否已确认 | ✅ 无阻塞 | 江南出行分布式锁 acquireLock，10-12 行 |

### 9.2 待用户确认的设计决策

| # | 决策项 | 推荐方案 | 备选 |
|---|--------|----------|------|
| 1 | 768-1023px 平板是否显示代码片段 | **不显示**（仅 ≥1024px 显示，移动端单列显示） | 显示在 main 下方 / 768px 起就用 6fr/4fr |
| 2 | 代码片段卡片视觉装饰 | **简洁**（仅 `// distributed-lock.ts` 文件名 header + Shiki 代码） | mac-style window dots / 行号 / 复制按钮 |
| 3 | 移动端代码片段字号 | **`--text-xs` (12px)** | `--text-sm` (14px) |
| 4 | 代码片段是否应用 Scroll Reveal | **不应用**（首屏可见，保护 LCP） | 应用（但违反《READINESS》§4.3 交互验收） |

### 9.3 阻塞结论

**无阻塞项**。

所有技术基建已就绪：
- Shiki 构建时预渲染路径清晰（扩展 contentPlugin + `virtual:hero-snippet`）
- 响应式断点策略明确（三断点：移动单列 / 平板 7fr 5fr / 桌面 6fr 4fr）
- 组件配额不消耗（内联实现）
- 性能风险可控（构建时预渲染 + min-height 预留）

4 个设计决策项已给出推荐方案，可在 Phase 2 开发时按推荐执行，或等待用户调整。

---

## 10. Pre-Flight 结论

### 10.1 技术就绪度

| 维度 | 状态 |
|------|------|
| Hero LCP 元素未应用 Scroll Reveal | ✅ 已确认 |
| Shiki 构建时基建 | ✅ 就绪 |
| contentPlugin 可扩展性 | ✅ 已验证 |
| 响应式布局可行性 | ✅ 已计算（1024-1279px 可行） |
| 组件配额 | ✅ 不消耗 |
| 性能风险缓解方案 | ✅ 已设计（构建时预渲染 + min-height） |
| 代码片段内容 | ✅ 已确认 |

### 10.2 建议

**建议进入 Phase 2 开发**。

Pre-Flight Check 所有检查项通过，无阻塞问题。4 个设计决策项已给出推荐方案，可在 Phase 2 开发时按推荐执行：

1. 768-1023px 平板不显示代码片段（仅 ≥1024px 桌面 + <768px 移动显示）
2. 代码片段卡片简洁设计（文件名 header + Shiki 代码，无 mac dots）
3. 移动端字号 `--text-xs` (12px)
4. 代码片段不应用 Scroll Reveal（首屏可见）

### 10.3 Phase 2 开发预告

依据《IMPLEMENTATION_PLAN》§2 Phase 2：

1. 扩展 `src/utils/content.ts`：新增 `virtual:hero-snippet` 虚拟模块
2. 修改 `src/components/home/HeroSection.vue`：
   - 新增代码片段卡片 DOM（`<figure class="hero__snippet">`）
   - 调整 grid：`7fr 5fr` → `6fr 4fr`（≥1024px）
   - 新增 1024px 断点（介于 768px 和 1024px 之间）
   - 移动端单列：代码片段在 main 下方、stats 上方
3. 验证：typecheck / build / Playwright / LCP / CLS / Bundle Size

**预期修改文件**：2 个（content.ts + HeroSection.vue）
**预期新增组件**：0
**预期组件配额消耗**：0

---

## 11. 完成确认

- ✅ Hero 首屏 LCP 元素未应用 Scroll Reveal（已确认）
- ✅ HeroSection 当前 DOM、CSS、响应式布局已分析
- ✅ Code Snippet Card 推荐放置位置已确定（右侧上方，6fr/4fr）
- ✅ 需要修改的文件列表已列出（2 个文件）
- ✅ 不需要新增组件（内联实现）
- ✅ 不消耗组件配额
- ✅ 响应式风险已分析（1024-1279px 可行，移动端可接受）
- ✅ Performance 风险已分析（构建时预渲染方案就绪）
- ✅ 无阻塞 Phase 2 的问题
- ✅ 未编写任何 Hero 代码
- ✅ 未修改任何源码

**Pre-Flight Check 完成，等待人工批准进入 Phase 2 开发。**

---

*报告生成时间: 2026-07-17*
*Portfolio v3.5 Phase 2 Pre-Flight Check — Hero 视觉主角（Code Snippet Card）*
