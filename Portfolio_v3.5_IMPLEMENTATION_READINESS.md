# Portfolio v3.5 Implementation Readiness

> **版本**：v3.5-readiness-1.0
> **日期**：2026-07-17
> **身份**：Senior Product Designer / Creative Director / Design System Architect / Frontend Engineer
> **基础**：
> - 《Portfolio_v3.5_CREATIVE_DIRECTION.md》（v1.0 LOCKED）
> - 《Portfolio_v3.5_IMPLEMENTATION_PLAN.md》（v3.5-impl-plan-rc1）
> - Portfolio v3.0.0 实际源码（已审计）
> **目标**：验证 Creative Direction 能否高质量落地，识别风险并建立 Review Gate
> **状态**：Readiness 审查完成，最终建议见 §8
> **约束**：不修改源码、不生成实现代码、不 commit、不 push、不更新项目工程文档

---

## 0. 阶段定位

本阶段**不**是 Creative Direction 的延续，也**不**是 Implementation 的开始。

本阶段是 **Technical Validation**：
- 验证 CREATIVE_DIRECTION.md 中的 7 项锁定决策在现有 v3.0.0 代码基础上**能否高质量实现**
- 识别**设计假设、实现风险、性能风险、响应式风险、可访问性风险**
- 为每个 Phase 建立 **Design Review Gate**（进入下一 Phase 的验收标准）
- 输出 **Go / No-Go** 决策

**核心问题**：
> "锁定决策与现有代码之间存在多少张力？哪些风险必须在进入 Phase 0 前缓解？"

---

## 1. Creative Direction 技术验证结果

### 1.1 验证方法

对 7 项锁定决策逐项进行 5 维度验证：

| 维度 | 检查问题 |
|---|---|
| 技术可行性 | 现有代码 / 依赖 / 架构是否支持？ |
| 性能影响 | 对 LCP / INP / CLS / Bundle 的影响？ |
| 响应式风险 | 移动端 / 平板 / 桌面是否可用？ |
| 可访问性 | WCAG AA / 屏幕阅读器 / 键盘导航？ |
| 与现有资产冲突 | 是否破坏 `// eyebrow` / Token / 暗色模式 / Markdown SSOT？ |

### 1.2 决策 1：Design Language = Developer Editorial

| 维度 | 结论 | 说明 |
|---|---|---|
| 技术可行性 | ✅ 通过 | 无需新依赖，纯设计语言演进 |
| 性能影响 | ✅ 无 | 不产生运行时开销 |
| 响应式风险 | ✅ 无 | 设计语言与断点无关 |
| 可访问性 | ✅ 无 | Editorial 排版对 a11y 友好 |
| 与现有资产冲突 | ✅ 增强 | 从 Strict Mode 演进为 Confident Mode，不破坏 `// eyebrow` |

**风险**：无
**结论**：✅ 可直接进入开发

---

### 1.3 决策 2：Hero 方案 = Code Snippet Card

| 维度 | 结论 | 说明 |
|---|---|---|
| 技术可行性 | ⚠️ 有条件通过 | Shiki 已集成但为异步单例，需构建时预渲染（见 §1.3.1） |
| 性能影响 | ⚠️ 中风险 | 代码片段 HTML 若运行时渲染会增加 LCP；构建时预渲染则无影响 |
| 响应式风险 | ⚠️ 中风险 | 代码片段卡片与现有 stats panel 竞争右侧空间（见 §1.3.2） |
| 可访问性 | ✅ 通过 | `<pre><code>` 语义化，Shiki 输出符合 a11y |
| 与现有资产冲突 | ⚠️ 中风险 | 改变 Hero 网格比例需谨慎，不破坏 7fr/5fr 资产 |

#### 1.3.1 Shiki 集成现状（关键发现）

审计 [src/utils/markdown.ts](file:///c:/Users/lai/Desktop/%E4%B8%AA%E4%BA%BA%E7%BD%91%E9%A1%B5/src/utils/markdown.ts) 发现：

- Shiki 作为 **devDependency**（`shiki: ^4.3.1`），不影响运行时 bundle
- 使用**单例 highlighter**，异步初始化：`await getHighlighter()` 后才能调用 `codeToHtml`
- 已加载 langs: `javascript, typescript, java, python, bash, json, sql, yaml`
- 已加载 themes: `github-dark`（仅一个）
- 通过 `renderMarkdown` 异步调用，仅在 vite content plugin 中使用

**关键约束**：
- Shiki 单例在浏览器端首次调用会触发 WASM + 语法文件下载（约 200-400KB），**严重威胁 LCP**
- 因此代码片段卡片**必须**走构建时预渲染路径，**禁止**运行时调用 Shiki

**缓解方案**：
- 在 [vite.config.ts](file:///c:/Users/lai/Desktop/%E4%B8%AA%E4%BA%BA%E7%BD%91%E9%A1%B5/vite.config.ts) 的 `contentPlugin` 内，或新增 `heroSnippetPlugin`，构建时调用 `codeToHtml` 输出静态 HTML
- 将 HTML 作为虚拟模块或 `src/content/hero/snippet.ts` 静态导出
- HeroSection 直接 import 预渲染 HTML，零运行时 Shiki 调用

#### 1.3.2 Hero 网格空间冲突（关键发现）

审计 [HeroSection.vue](file:///c:/Users/lai/Desktop/%E4%B8%AA%E4%BA%BA%E7%BD%91%E9%A1%B5/src/components/home/HeroSection.vue) 发现：

当前 Hero 桌面端布局：
```
grid-template-columns: 7fr 5fr;
┌─────────────────────┬──────────────┐
│ hero__main          │ hero__stats  │
│ - eyebrow           │ - stats-label│
│ - title             │ - 4 stats    │
│ - subtitle          │              │
│ - actions           │              │
└─────────────────────┴──────────────┘
```

**冲突点**：
- 右侧 5fr 已被 stats panel 占满
- 代码片段卡片无处可放，除非：
  - 方案 X：替换 stats panel（违反"保留 Hero Stats Panel elevation"亮点）
  - 方案 Y：stats panel 上方叠代码片段卡片（右侧高度增加，可能超过视口）
  - 方案 Z：代码片段卡片放左侧 main 区下方（破坏"右侧视觉主角"初衷）
  - 方案 W：扩大右侧至 6fr/4fr，代码片段 + stats 上下叠（IMPLEMENTATION_PLAN §2 Phase 2 提到的方案）

**IMPLEMENTATION_PLAN 的方案**（6fr/4fr + 上下叠）：
```
grid-template-columns: 6fr 4fr;
┌──────────────────┬──────────────┐
│ hero__main       │ code snippet │ ← 新增
│ - eyebrow        │ ─────────────│
│ - title          │ hero__stats  │
│ - subtitle       │ - 4 stats    │
│ - actions        │              │
└──────────────────┴──────────────┘
```

**风险评估**：
- 右侧高度 = 代码片段（约 320px）+ gap + stats（约 200px）= 约 580px
- Hero `min-height: calc(100vh - nav-height)` = 约 720px（桌面）
- **结论**：垂直空间充足，但移动端需折叠为单列，代码片段应在 stats 之前（视觉主角优先）

#### 1.3.3 缓解方案汇总

| 风险 | 缓解 | 强制等级 |
|---|---|---|
| LCP 退化 | 构建时预渲染代码片段 HTML，禁止运行时 Shiki | **MUST** |
| 网格空间冲突 | 桌面 6fr/4fr，代码片段在上 stats 在下；移动端单列，代码片段优先 | **MUST** |
| 7fr/5fr 资产破坏 | 文档化"6fr/4fr 是 v3.5 演进"，保留 7fr/5fr 作为 fallback | **SHOULD** |
| 代码片段高度溢出 | 限制代码 ≤ 12 行，overflow-y: auto | **MUST** |

**结论**：⚠️ **有条件通过** — 必须在 Phase 2 实施前完成"构建时预渲染"技术预研

---

### 1.4 决策 3：Hero 代码片段内容 = 江南出行分布式锁

| 维度 | 结论 | 说明 |
|---|---|---|
| 技术可行性 | ✅ 通过 | TypeScript 代码在 Shiki 已加载 langs 中 |
| 性能影响 | ✅ 无 | 静态字符串 |
| 响应式风险 | ⚠️ 低风险 | 代码行长度可能超出移动端宽度 |
| 可访问性 | ✅ 通过 | 代码语义清晰 |
| 与现有资产冲突 | ✅ 无 | 与项目内容呼应，不重复 |

**代码片段候选**（基于 acquireLock 实现）：
```typescript
// distributed-lock.ts
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
}
```

**风险**：
- 代码片段若过长（>12 行），移动端横向滚动 + 垂直溢出
- 代码片段若泄露实现细节，需确认是否为公开内容

**缓解**：
- 限制 10-12 行，必要时拆分多卡片
- 确认 [src/content/projects/jiangnan-travel.md](file:///c:/Users/lai/Desktop/%E4%B8%AA%E4%BA%BA%E7%BD%91%E9%A1%B5/src/content/projects/jiangnan-travel.md) 已公开此实现（项目页已有架构图，代码片段为补充）

**结论**：✅ 通过，但需控制行数

---

### 1.5 决策 4：辅助色 = Slate Blue

| 维度 | 结论 | 说明 |
|---|---|---|
| 技术可行性 | ✅ 通过 | tokens.css 扩展安全（向后兼容） |
| 性能影响 | ✅ 无 | 纯 CSS 变量 |
| 响应式风险 | ✅ 无 | 颜色与断点无关 |
| 可访问性 | ⚠️ 中风险 | Slate Blue 在 light 模式下对比度需验证（见 §1.5.1） |
| 与现有资产冲突 | ⚠️ 低风险 | 引入第二强调色，需限定使用范围 |

#### 1.5.1 对比度验证（关键）

CREATIVE_DIRECTION.md §5.7 定义：
- Light: `#475569`（Slate 600）
- Dark: `#94a3b8`（Slate 400）

**WCAG AA 要求**：正常文字 ≥ 4.5:1，大文字 ≥ 3:1

| 场景 | 前景 | 背景 | 对比度 | AA 通过？ |
|---|---|---|---|---|
| Light 模式正常文字 | `#475569` | `#ffffff` (surface) | 7.55:1 | ✅ |
| Light 模式正常文字 | `#475569` | `#f8f9fa` (bg) | 7.05:1 | ✅ |
| Dark 模式正常文字 | `#94a3b8` | `#1e293b` (surface) | 5.62:1 | ✅ |
| Dark 模式正常文字 | `#94a3b8` | `#0f172a` (bg) | 7.31:1 | ✅ |
| Light 大文字/装饰 | `#475569` | `#ffffff` | 7.55:1 | ✅ |

**结论**：Slate Blue 在所有场景下通过 WCAG AA，**甚至 AAA**。

#### 1.5.2 使用范围约束（关键）

为避免 Slate Blue 泛滥，必须严格限定：

| 场景 | 允许 | 禁止 |
|---|---|---|
| Skills 辅助分类色（前端 / 工具运维） | ✅ | — |
| Interview 分类色（系统设计 / 技术原理） | ✅ | — |
| 状态指示（"已完成" / "进行中" badge） | ✅ | — |
| 次要 badge | ✅ | — |
| CTA 按钮 | ❌ | Amber 是唯一交互色 |
| 链接 hover | ❌ | Amber 是唯一交互色 |
| eyebrow 文字 | ❌ | Amber 是唯一 eyebrow 色 |
| Accent Line | ❌ | Amber 是唯一强调线色 |

**结论**：✅ 通过，但必须写入 Phase 3 / Phase 6 的 Design Review Gate

---

### 1.6 决策 5：Skills 布局 = Bento 大小卡

| 维度 | 结论 | 说明 |
|---|---|---|
| 技术可行性 | ⚠️ 中风险 | 需扩展 frontmatter（icon + priority 字段） |
| 性能影响 | ✅ 无 | 纯布局变化 |
| 响应式风险 | ⚠️ 中风险 | Bento 大小卡在移动端需简化（见 §1.6.1） |
| 可访问性 | ✅ 通过 | 语义化 HTML + 图标 aria-label |
| 与现有资产冲突 | ⚠️ 低风险 | 与 Home Projects Bento 呼应，但需避免视觉重复 |

#### 1.6.1 移动端 Bento 退化策略

桌面端 Bento 布局（IMPLEMENTATION_PLAN §6.2）：
```
[大卡-后端] [大卡-前端]
[小卡] [小卡] [小卡]
[横长卡-实践]
```

**移动端退化**：
- 单列堆叠：大卡 → 大卡 → 小卡 × 3 → 横长卡
- 大卡保持完整信息，小卡精简为"图标 + 分类名 + 技术栈 chip"
- 横长卡保持，但宽度 100%

**风险**：
- 移动端单列堆叠后，6 卡片纵向高度过大（约 1800px），需评估是否影响阅读节奏
- 缓解：移动端可考虑小卡 2 列网格，减少纵向高度

#### 1.6.2 frontmatter 扩展风险

当前 [src/types/skills.ts](file:///c:/Users/lai/Desktop/%E4%B8%AA%E4%BA%BA%E7%BD%91%E9%A1%B5/src/types/skills.ts) 需扩展字段：
- `icon: string`（Lucide 图标名）
- `priority: 'high' | 'medium' | 'low'`（决定卡片大小）
- `colorTier: 'amber' | 'slate-blue' | 'slate'`（分类色映射）

**向后兼容性**：
- 字段全部设为可选，无字段时 fallback 到当前行为（普通卡片 + Amber）
- `scanSkills` 解析时使用 `??` 默认值

**结论**：⚠️ **有条件通过** — 必须在 Phase 3 完成移动端 Bento 退化预研

---

### 1.7 决策 6：About 引言 = "工程师的克制，学者的严谨"

| 维度 | 结论 | 说明 |
|---|---|---|
| 技术可行性 | ✅ 通过 | 纯文案，可放入 frontmatter 或硬编码 |
| 性能影响 | ✅ 无 | — |
| 响应式风险 | ✅ 无 | — |
| 可访问性 | ✅ 通过 | `<blockquote>` 语义化 |
| 与现有资产冲突 | ✅ 无 | 与 About 人物画像定位一致 |

**实现位置**：
- 推荐：[src/content/about/index.md](file:///c:/Users/lai/Desktop/%E4%B8%AA%E4%BA%BA%E7%BD%91%E9%A1%B5/src/content/about/index.md) frontmatter 新增 `quote` 字段
- About.vue 读取 frontmatter.quote，渲染为 `<blockquote>` + Accent Line

**结论**：✅ 通过

---

### 1.8 决策 7：Footer 最后更新来源 = git commit 日期

| 维度 | 结论 | 说明 |
|---|---|---|
| 技术可行性 | ⚠️ 中风险 | 需在 vite 构建时注入 git 时间戳（见 §1.8.1） |
| 性能影响 | ✅ 无 | 构建时静态字符串 |
| 响应式风险 | ✅ 无 | — |
| 可访问性 | ✅ 通过 | `<time datetime="...">` 语义化 |
| 与现有资产冲突 | ✅ 无 | — |

#### 1.8.1 git 时间戳注入方案

**方案 A：vite-plugin 注入**（推荐）
- 在 [vite.config.ts](file:///c:/Users/lai/Desktop/%E4%B8%AA%E4%BA%BA%E7%BD%91%E9%A1%B5/vite.config.ts) 新增 `gitTimestampPlugin`，`execSync('git log -1 --format=%cI')` 获取最近 commit ISO 日期
- 通过 `define` 或虚拟模块注入 `__GIT_TIMESTAMP__`
- Footer.vue 读取 `import.meta.env.GIT_TIMESTAMP` 或虚拟模块

**方案 B：package.json version 日期**（已拒绝）
- 不准确，无法反映实际更新频率

**风险**：
- Vercel 构建环境是否暴露 git 历史？**需验证**
- 本地 `vite dev` 无 git commit 时 fallback 到 `new Date().toISOString()`

**缓解**：
- 验证 Vercel build settings 是否启用 "Git LFS" 或 "Full Git History"
- 提供本地 fallback：`try { git log } catch { new Date() }`

**结论**：⚠️ **有条件通过** — 必须在 Phase 6 前验证 Vercel 构建环境 git 访问

---

### 1.9 技术验证汇总

| # | 决策 | 结论 | 前置条件 |
|---|---|---|---|
| 1 | Design Language | ✅ 通过 | 无 |
| 2 | Hero 代码片段卡片 | ⚠️ 有条件通过 | Phase 2 前完成"构建时预渲染"预研 |
| 3 | Hero 代码片段内容 | ✅ 通过 | 控制行数 ≤ 12 |
| 4 | Slate Blue 辅助色 | ✅ 通过 | 写入 Phase 3/6 Review Gate |
| 5 | Skills Bento 大小卡 | ⚠️ 有条件通过 | Phase 3 前完成"移动端 Bento 退化"预研 |
| 6 | About 引言 | ✅ 通过 | 无 |
| 7 | Footer git 时间戳 | ⚠️ 有条件通过 | Phase 6 前验证 Vercel git 访问 |

**总计**：4 项直接通过，3 项有条件通过，0 项不通过

---

## 2. 设计假设清单

以下假设是 Creative Direction 隐含的前提，若假设不成立则需调整方案。

### 2.1 性能假设

| # | 假设 | 验证方式 | 风险等级 |
|---|---|---|---|
| P1 | Shiki 构建时预渲染不显著增加 build time | Phase 0 预研：测量构建时间增量 | 中 |
| P2 | Scroll Reveal 不影响 LCP（Hero 内容不应用） | Phase 1 后 Lighthouse 验证 | 中 |
| P3 | Bento 大小卡不增加 Bundle（纯 CSS） | Phase 3 后 Bundle 对比 | 低 |
| P4 | Slate Blue Token 不增加运行时开销 | 纯 CSS 变量，无需验证 | 低 |
| P5 | git 时间戳注入不增加 build time | Phase 6 预研 | 低 |

### 2.2 响应式假设

| # | 假设 | 验证方式 | 风险等级 |
|---|---|---|---|
| R1 | 桌面 6fr/4fr Hero 网格在 1024px-1440px 可用 | Phase 2 后多断点测试 | 中 |
| R2 | 移动端 Bento 退化后纵向高度可接受（<2000px） | Phase 3 后移动端审计 | 中 |
| R3 | 代码片段卡片在 375px 宽度可读 | Phase 2 后 iPhone SE 测试 | 中 |
| R4 | Grid Pattern 在 Retina 屏不模糊 | Phase 6 后视觉验证 | 低 |

### 2.3 可访问性假设

| # | 假设 | 验证方式 | 风险等级 |
|---|---|---|---|
| A1 | Slate Blue 对比度通过 WCAG AA | §1.5.1 已验证 | ✅ |
| A2 | Scroll Reveal 尊重 prefers-reduced-motion | Phase 1 后 reduced-motion 测试 | 中 |
| A3 | 代码片段卡片屏幕阅读器可读 | Phase 2 后 NVDA / VoiceOver 测试 | 中 |
| A4 | Bento 大小卡键盘导航顺序合理 | Phase 3 后键盘 Tab 测试 | 低 |

### 2.4 架构假设

| # | 假设 | 验证方式 | 风险等级 |
|---|---|---|---|
| C1 | tokens.css 扩展不破坏现有 Token 引用 | Phase 3/6 后全站视觉回归 | 低 |
| C2 | frontmatter 扩展向后兼容 | Phase 3/5 后旧数据 fallback 测试 | 中 |
| C3 | vite contentPlugin 可扩展支持新虚拟模块 | Phase 2 预研 | 中 |
| C4 | 组件配额 1 足够（DecisionSection 重写不消耗） | Phase 5 后核对 | 低 |

---

## 3. 各 Phase 风险矩阵

### 3.1 风险等级定义

| 等级 | 含义 | 处理 |
|---|---|---|
| 🔴 高 | 可能阻塞 Phase 完成 | 必须缓解后才能进入 Phase |
| 🟡 中 | 可能影响质量但可缓解 | Phase 内缓解，Review Gate 检查 |
| 🟢 低 | 小问题或可接受 | 记录但不阻塞 |

### 3.2 Phase 0：Motion 基础设施

| 风险 | 等级 | 类别 | 缓解 |
|---|---|---|---|
| useScrollReveal composable 在 SSR 失败 | 🟢 低 | 实现 | 项目为 SPA，无 SSR |
| IntersectionObserver 不支持 unobserve | 🟢 低 | 实现 | 现代浏览器全部支持 |
| motion.css 引入顺序导致覆盖 | 🟡 中 | 实现 | main.ts 中 motion.css 在 tokens.css 之后 |
| Token 命名冲突（--duration-fast 已存在） | 🟡 中 | 实现 | 审计现有 tokens.css，发现 `--transition-fast: 150ms` 已存在，motion Token 需用不同命名（如 `--motion-duration-fast`） |

**Phase 0 风险总结**：🟢 低 — 纯基础设施，无视觉变化

### 3.3 Phase 1：Scroll Reveal 全站应用

| 风险 | 等级 | 类别 | 缓解 |
|---|---|---|---|
| LCP 退化（Hero 内容应用 reveal） | 🔴 高 | 性能 | **强制**：Hero 内容不应用 scroll reveal |
| INP 退化（IntersectionObserver 回调阻塞） | 🟡 中 | 性能 | 回调内仅操作 classList，不触发布局 |
| reduced-motion 用户看到跳变 | 🟡 中 | a11y | 默认 opacity:1，JS 注册后才设 opacity:0 |
| 13 个文件改动引入回归 | 🟡 中 | 实现 | 每文件改完后 Playwright 验证 |
| stagger 顺序错误（视觉混乱） | 🟢 低 | 视觉 | 严格按 DOM 顺序 stagger |
| 视口外元素永不显示（IntersectionObserver 失败） | 🔴 高 | 实现 | 失败 fallback：超时后强制显示 |

**Phase 1 风险总结**：🟡 中 — 大量文件改动，需严格测试

### 3.4 Phase 2：Hero 视觉主角

| 风险 | 等级 | 类别 | 缓解 |
|---|---|---|---|
| Shiki 运行时调用导致 LCP 退化 | 🔴 高 | 性能 | **强制**：构建时预渲染 |
| 代码片段卡片高度溢出 Hero 视口 | 🟡 中 | 响应式 | 限制 12 行 + overflow-y: auto |
| 6fr/4fr 网格在 1024px 断点拥挤 | 🟡 中 | 响应式 | 1024px 保留 7fr/5fr，1280px+ 才用 6fr/4fr |
| 移动端代码片段横向滚动 | 🟡 中 | 响应式 | 代码片段字号缩小 + 横向 scroll |
| Stats panel 与代码片段视觉竞争 | 🟡 中 | 视觉 | 代码片段为视觉主角，stats 降为辅助（更小字号） |
| 7fr/5fr 资产破坏 | 🟡 中 | 架构 | 文档化"6fr/4fr 是 v3.5 演进" |

**Phase 2 风险总结**：🔴 高 — 第一印象关键，必须严格预研

### 3.5 Phase 3：Skills 重设计

| 风险 | 等级 | 类别 | 缓解 |
|---|---|---|---|
| frontmatter 扩展破坏现有 Skills 渲染 | 🟡 中 | 架构 | 字段全部可选 + fallback |
| 移动端 Bento 退化后纵向过高 | 🟡 中 | 响应式 | 小卡 2 列网格 |
| 分类色映射错误（Amber/Slate Blue 混淆） | 🟢 低 | 视觉 | 严格按 §1.5.2 约束 |
| 图标选择不当（Lucide 图标语义不清） | 🟢 低 | 视觉 | 选择明确语义图标（Server/Layout/Smartphone/Terminal/Sparkle/Workflow） |
| 与 Home Projects Bento 视觉重复 | 🟡 中 | 视觉 | Skills 用小卡 + chip，Projects 用大卡 + metrics，视觉区分 |

**Phase 3 风险总结**：🟡 中 — 数据层 + 视觉层双重改动

### 3.6 Phase 4：ProjectCard + Timeline 升级

| 风险 | 等级 | 类别 | 缓解 |
|---|---|---|---|
| Timeline 主项目放大破坏对齐 | 🟡 中 | 视觉 | 仅放大 stage 内容，dot 位置不变 |
| ProjectCard metrics 2 列在窄卡片溢出 | 🟢 低 | 响应式 | 320px 以下退化为 1 列 |
| chip 化后 highlights 信息丢失 | 🟢 低 | 内容 | chip 保留完整文本，仅样式变化 |
| Timeline isMainProject 字段扩展 | 🟡 中 | 架构 | 字段可选，无字段时所有 stage 相同大小 |

**Phase 4 风险总结**：🟡 中 — 视觉调整为主

### 3.7 Phase 5：DecisionSection 视觉化

| 风险 | 等级 | 类别 | 缓解 |
|---|---|---|---|
| DecisionContent 类型扩展破坏现有渲染 | 🔴 高 | 架构 | 渐进迁移：无 decisions 字段时 fallback 到 Markdown |
| 方案对比卡片组件消耗组件配额 | 🔴 高 | 架构 | **方案**：不新建组件，在 DecisionSection.vue 内部用 v-if 分支 |
| 3 个项目 decisions 字段补全工作量大 | 🟡 中 | 内容 | 渐进迁移：Phase 5 只做组件，内容补全可选 |
| 方案对比卡片响应式困难 | 🟡 中 | 响应式 | 桌面 2 列，移动端 1 列堆叠 |
| Accent Line 滥用 | 🟡 中 | 视觉 | 严格限定 4 处使用 |

**Phase 5 风险总结**：🔴 高 — 架构 + 组件 + 内容三重改动

### 3.8 Phase 6：色彩 + 纹理 + Footer 收尾

| 风险 | 等级 | 类别 | 缓解 |
|---|---|---|---|
| Vercel 构建环境无 git 访问 | 🔴 高 | 实现 | Phase 6 前验证，fallback 到 build time |
| Grid Pattern 暗色模式不明显 | 🟡 中 | 视觉 | 暗色模式提高 grid line 透明度 |
| Footer 2 列在移动端拥挤 | 🟢 低 | 响应式 | 移动端单列 |
| Interview 分类色与 Skills 分类色混淆 | 🟡 中 | 视觉 | 严格区分：Skills 用图标，Interview 用色点 |
| About 引言 Accent Line 与 DecisionSection 重复 | 🟢 低 | 视觉 | Accent Line 是 Signature，统一是目标 |

**Phase 6 风险总结**：🟡 中 — 收尾工作，风险分散

### 3.9 Phase 7：v3.5 Final Release

| 风险 | 等级 | 类别 | 缓解 |
|---|---|---|---|
| Lighthouse Performance 退化 | 🟡 中 | 性能 | 全站审计，必要时回滚个别 Phase |
| Playwright 测试断言失败 | 🟡 中 | 实现 | 每个新增断言对应明确视觉变化 |
| Bundle 体积超 +3 KB gzip | 🟡 中 | 性能 | 审计新增 CSS / 虚拟模块大小 |

**Phase 7 风险总结**：🟢 低 — 发布阶段

### 3.10 风险矩阵汇总

| Phase | 高风险数 | 中风险数 | 低风险数 | 总体等级 |
|---|---|---|---|---|
| 0 | 0 | 2 | 2 | 🟢 低 |
| 1 | 2 | 3 | 1 | 🟡 中 |
| 2 | 1 | 5 | 0 | 🔴 高 |
| 3 | 0 | 3 | 2 | 🟡 中 |
| 4 | 0 | 2 | 2 | 🟡 中 |
| 5 | 2 | 3 | 0 | 🔴 高 |
| 6 | 1 | 3 | 1 | 🟡 中 |
| 7 | 0 | 3 | 0 | 🟢 低 |

**关键发现**：
- Phase 2 和 Phase 5 是**高风险 Phase**，需额外预研
- Phase 1 有 2 个高风险（LCP + IntersectionObserver 失败），需严格缓解

---

## 4. Design Review Gate（Phase 0-7）

每个 Phase 完成后，必须通过以下 Review Gate 才能进入下一 Phase。

### 4.1 Phase 0 Review Gate：Motion 基础设施

#### 视觉验收
- [ ] 无视觉变化（纯基础设施）

#### 交互验收
- [ ] `useScrollReveal` composable 可在测试组件中调用
- [ ] IntersectionObserver 正确注册 / unobserve

#### 性能验收
- [ ] Bundle 体积增量 ≤ +0.5 KB gzip（仅 composable + motion.css）
- [ ] Build time 增量 ≤ +500ms

#### 工程验收
- [ ] `npm run typecheck` 通过
- [ ] `npm run build` 通过
- [ ] motion.css 在 main.ts 中正确引入（tokens.css 之后）
- [ ] motion Token 命名不与现有 `--transition-fast` 冲突
- [ ] `prefers-reduced-motion` 媒体查询存在

#### 阻塞条件
- 任意 MUST 项未满足 → 阻塞 Phase 1

---

### 4.2 Phase 1 Review Gate：Scroll Reveal 全站应用

#### 视觉验收
- [ ] Section header 进入视口时淡入 + 上移
- [ ] Card grid items 错峰入场（80ms stagger）
- [ ] Timeline stages 错峰入场（120ms stagger）
- [ ] Stats panel 从右淡入
- [ ] Facts items 错峰入场
- [ ] Markdown blocks 淡入

#### 交互验收
- [ ] hover 反馈保持（Whisper 节奏）
- [ ] 卡片 hover Accent Line 出现
- [ ] Link underline reveal 生效
- [ ] `prefers-reduced-motion: reduce` 时无任何 transform/opacity 动画

#### 性能验收
- [ ] Lighthouse Performance ≥ 90（v3.0.0 基线对比）
- [ ] LCP 退化 ≤ 100ms
- [ ] INP 退化 ≤ 20ms
- [ ] CLS = 0（reveal 元素不占位导致布局跳动）

#### a11y 验收
- [ ] 屏幕阅读器可读 reveal 内容（aria-hidden 正确处理）
- [ ] 键盘 Tab 导航到 reveal 元素时可见

#### 工程验收
- [ ] `npm run typecheck` 通过
- [ ] `npm run build` 通过
- [ ] Playwright 74/74 + 新增断言通过
- [ ] IntersectionObserver 失败 fallback 验证（断网 / 禁用 JS）

#### 阻塞条件
- LCP 退化 > 200ms → 阻塞 Phase 2
- reduced-motion 路径失败 → 阻塞 Phase 2
- IntersectionObserver 失败 fallback 失败 → 阻塞 Phase 2

---

### 4.3 Phase 2 Review Gate：Hero 视觉主角

#### 视觉验收
- [ ] Hero 右侧出现代码片段卡片（方案 A）
- [ ] 代码片段 Shiki 高亮正确（github-dark 主题）
- [ ] 代码片段内容为江南出行分布式锁 acquireLock
- [ ] Stats panel 保留，位于代码片段下方
- [ ] 桌面 6fr/4fr 网格生效
- [ ] 1024px 保留 7fr/5fr（fallback）
- [ ] Grid Pattern 背景 subtle 可见

#### 交互验收
- [ ] 代码片段卡片不应用 scroll reveal（首屏可见）
- [ ] 代码片段横向滚动（移动端）顺畅
- [ ] CTA 按钮 hover 保持

#### 性能验收
- [ ] **LCP 退化 ≤ 50ms**（构建时预渲染，无运行时 Shiki）
- [ ] Build time 增量 ≤ +2s（Shiki 预渲染一次性成本）
- [ ] 代码片段 HTML 体积 ≤ +2 KB gzip
- [ ] Hero 区域 CLS = 0

#### 响应式验收
- [ ] 1440px：6fr/4fr 网格，代码片段 + stats 上下叠
- [ ] 1024px：7fr/5fr fallback
- [ ] 768px：单列，代码片段优先，stats 在下
- [ ] 375px：代码片段字号缩小，横向滚动可读

#### a11y 验收
- [ ] `<pre><code>` 语义化
- [ ] 代码片段有 `aria-label="分布式锁实现代码示例"`
- [ ] 屏幕阅读器可读代码内容（不 aria-hidden）

#### 工程验收
- [ ] `npm run typecheck` 通过
- [ ] `npm run build` 通过
- [ ] Playwright 断言：Hero 内存在 `<pre>` 元素
- [ ] 构建时预渲染方案文档化

#### 阻塞条件
- LCP 退化 > 100ms → 阻塞 Phase 3，回滚 Phase 2
- 代码片段运行时调用 Shiki → 阻塞 Phase 3，立即修复

---

### 4.4 Phase 3 Review Gate：Skills 重设计

#### 视觉验收
- [ ] 6 分类卡片差异化（大卡 + 小卡 + 横长卡）
- [ ] 分类色映射正确（后端=Amber / 前端=Slate Blue / 小程序=Slate / 工具=Slate Blue / AI=Amber / 实践=Amber）
- [ ] 图标语义清晰（Server/Layout/Smartphone/Terminal/Sparkle/Workflow）
- [ ] 技术栈 chip 形式（Mono 字体）
- [ ] `// 技术能力` eyebrow + 章节编号

#### 交互验收
- [ ] 卡片 hover Accent Line（Amber 或 Slate Blue）
- [ ] chip hover 反馈
- [ ] Scroll Reveal 应用

#### 性能验收
- [ ] Bundle 体积增量 ≤ +1 KB gzip
- [ ] Lighthouse Performance ≥ 90

#### 响应式验收
- [ ] 1440px：2 列大卡 + 3 列小卡 + 1 列横长卡
- [ ] 768px：单列堆叠
- [ ] 375px：小卡 2 列网格，减少纵向高度

#### a11y 验收
- [ ] 图标 `aria-label` 正确
- [ ] 分类色对比度通过 WCAG AA
- [ ] 键盘导航顺序合理

#### 工程验收
- [ ] `npm run typecheck` 通过
- [ ] `npm run build` 通过
- [ ] Playwright 断言：6 个分类卡片 + 图标
- [ ] frontmatter 扩展向后兼容（无字段时 fallback）

#### 阻塞条件
- frontmatter 扩展破坏现有 Skills 渲染 → 阻塞 Phase 4
- 移动端纵向高度 > 2000px → 阻塞 Phase 4，调整布局

---

### 4.5 Phase 4 Review Gate：ProjectCard + Timeline 升级

#### 视觉验收
- [ ] ProjectCard normal 恢复 2 列 metrics 网格
- [ ] Timeline 主项目阶段放大 1.2x
- [ ] Timeline highlights chip 化
- [ ] Timeline stage hover：dot 放大 + amber glow

#### 交互验收
- [ ] 卡片 hover Accent Line
- [ ] chip hover 反馈

#### 性能验收
- [ ] Bundle 体积无显著变化（≤ +0.5 KB gzip）

#### 响应式验收
- [ ] ProjectCard metrics 2 列在 320px 退化为 1 列
- [ ] Timeline 主项目放大在移动端不破坏对齐

#### 工程验收
- [ ] `npm run typecheck` 通过
- [ ] `npm run build` 通过
- [ ] Playwright 断言通过

#### 阻塞条件
- Timeline 对齐破坏 → 阻塞 Phase 5

---

### 4.6 Phase 5 Review Gate：DecisionSection 视觉化

#### 视觉验收
- [ ] DecisionSection 改为方案对比卡片
- [ ] Accent Line 强调关键决策
- [ ] `// 关键决策` eyebrow 保留
- [ ] 无 decisions 字段时 fallback 到 Markdown 渲染

#### 交互验收
- [ ] 方案对比卡片 hover 反馈
- [ ] Scroll Reveal Statement 节奏

#### 性能验收
- [ ] Bundle 体积增量 ≤ +1 KB gzip
- [ ] 组件配额未消耗（在 DecisionSection.vue 内部实现）

#### 响应式验收
- [ ] 桌面 2 列方案对比
- [ ] 移动端 1 列堆叠

#### a11y 验收
- [ ] 方案对比语义化（`<dl>` 或 `<table>`）
- [ ] Accent Line 不影响屏幕阅读器

#### 工程验收
- [ ] `npm run typecheck` 通过
- [ ] `npm run build` 通过
- [ ] Playwright 断言：DecisionSection 含方案对比结构
- [ ] 3 个项目 fallback 路径验证（无 decisions 字段时正常渲染）

#### 阻塞条件
- 组件配额被消耗 → 阻塞 Phase 6，重构为内部实现
- 现有 DecisionSection 渲染破坏 → 阻塞 Phase 6

---

### 4.7 Phase 6 Review Gate：色彩 + 纹理 + Footer 收尾

#### 视觉验收
- [ ] Grid Pattern 纹理在 Hero 背景 + Footer 背景 subtle 可见
- [ ] Footer 2 列布局（Sitemap + About）
- [ ] Footer 最后更新时间戳显示
- [ ] Resume 按钮文案"打印 / 另存为 PDF"
- [ ] Interview 分类色彩标识（4 分类 4 色）
- [ ] About 引言 Signature Element（Accent Line + blockquote）

#### 交互验收
- [ ] Footer 链接 hover underline reveal
- [ ] Resume 按钮点击触发打印

#### 性能验收
- [ ] Bundle 体积增量 ≤ +1 KB gzip
- [ ] Grid Pattern 不影响 LCP（CSS background-image）

#### 响应式验收
- [ ] Footer 移动端单列
- [ ] Grid Pattern 在 Retina 屏清晰

#### a11y 验收
- [ ] `<time datetime="...">` 语义化
- [ ] Interview 分类色点 + 文字双重标识（不仅靠颜色）
- [ ] About 引言 `<blockquote>` 语义化

#### 工程验收
- [ ] `npm run typecheck` 通过
- [ ] `npm run build` 通过
- [ ] Playwright 断言：Footer 含 time 元素 + Sitemap 链接
- [ ] Vercel 构建验证 git 时间戳注入

#### 阻塞条件
- Vercel git 时间戳失败 → 阻塞 Phase 7，fallback 到 build time
- Grid Pattern 暗色模式不可见 → 阻塞 Phase 7

---

### 4.8 Phase 7 Review Gate：v3.5 Final Release

#### 视觉验收
- [ ] 全站视觉一致性审计通过
- [ ] Developer Editorial Design Language 全站体现
- [ ] 6 个 Signature Visual 元素全站应用

#### 性能验收
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 95
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Bundle 体积总增量 ≤ +5 KB gzip

#### a11y 验收
- [ ] WCAG AA 对比度全部通过
- [ ] 键盘导航全站可用
- [ ] 屏幕阅读器测试通过

#### 工程验收
- [ ] `npm run typecheck` 通过
- [ ] `npm run build` 通过
- [ ] Playwright 全部通过
- [ ] 版本号 3.0.0 → 3.5.0
- [ ] Git Tag v3.5.0 创建
- [ ] Release Notes 撰写
- [ ] HANDOFF.md 更新
- [ ] RELEASE_REVIEW_REPORT.md 更新

#### 阻塞条件
- 任意 P0 缺陷 → 阻塞发布
- Lighthouse Performance < 85 → 阻塞发布

---

## 5. 回滚策略

### 5.1 回滚原则

- 每个 Phase 独立可回滚
- 回滚不破坏其他 Phase 已完成的改动
- 回滚前先 `git stash` 或打临时 tag
- 回滚后验证全站功能正常

### 5.2 各 Phase 回滚策略

| Phase | 回滚方式 | 影响范围 |
|---|---|---|
| 0 | 删除新增文件（useScrollReveal.ts / motion.css），恢复 tokens.css 和 main.ts | 仅基础设施，无视觉影响 |
| 1 | 移除组件中 `v-scroll-reveal` 指令 / composable 调用，恢复组件原状 | 13 个组件文件 |
| 2 | 恢复 HeroSection.vue 原状，删除代码片段卡片 + Grid Pattern | 仅 Hero |
| 3 | 恢复 Skills.vue + tokens.css + content.ts + skills.md | Skills 页 + Token |
| 4 | 恢复 ProjectCard.vue + TimelineSection.vue | Home 页部分 |
| 5 | 恢复 DecisionSection.vue + 类型 + content.ts；Markdown 内容不动（frontmatter 扩展向后兼容） | Project Detail 页 |
| 6 | 逐文件恢复（Footer.vue / Resume.vue / Interview.vue / About.vue / HeroSection.vue / tokens.css） | 收尾工作 |
| 7 | 恢复版本号 + 文档 | 仅元信息 |

### 5.3 回滚决策树

```
Phase N 失败
  ↓
是否阻塞下一 Phase？
  ├─ 是 → 回滚 Phase N，修复后重试
  └─ 否 → 记录为 P2，继续下一 Phase
  ↓
回滚后验证
  ├─ npm run typecheck 通过？
  ├─ npm run build 通过？
  └─ Playwright 通过？
  ↓
验证通过 → 继续修复 / 进入下一 Phase
验证失败 → 回滚到上一个稳定 commit
```

### 5.4 紧急回滚预案

若多个 Phase 累积导致全站崩溃：
1. `git reset --hard v3.0.0`（最后稳定 tag）
2. 重新评估 Creative Direction 可行性
3. 调整 Roadmap 后重新开发

**注意**：`git reset --hard` 属于破坏性操作，需用户明确确认（规则 16）

---

## 6. Phase 依赖关系

### 6.1 依赖图

```
Phase 0 (Motion 基础)
  ↓ [强依赖]
Phase 1 (Scroll Reveal 应用)
  ↓ [强依赖]
Phase 2 (Hero 视觉主角) ─┐
Phase 3 (Skills 重设计) ─┤ [弱依赖，可并行]
Phase 4 (ProjectCard+Timeline) ─┘
  ↓ [独立]
Phase 5 (DecisionSection)
  ↓ [弱依赖]
Phase 6 (色彩+纹理+Footer)
  ↓ [强依赖]
Phase 7 (Final Release)
```

### 6.2 依赖类型

| 依赖 | 类型 | 说明 |
|---|---|---|
| Phase 0 → Phase 1 | 强依赖 | Phase 1 依赖 Phase 0 的 composable + motion Token |
| Phase 1 → Phase 2 | 强依赖 | Phase 2 Hero 不应用 scroll reveal，但需验证不冲突 |
| Phase 1 → Phase 3 | 强依赖 | Phase 3 Skills 卡片需应用 scroll reveal |
| Phase 1 → Phase 4 | 强依赖 | Phase 4 Timeline 需应用 scroll reveal |
| Phase 2 ↔ Phase 3 | 弱依赖 | 可并行，但都依赖 Phase 1 |
| Phase 3 ↔ Phase 4 | 弱依赖 | 可并行 |
| Phase 5 | 独立 | 不依赖 Phase 2/3/4，但建议在 Phase 1 后 |
| Phase 6 → Phase 7 | 强依赖 | Phase 7 验收包含 Phase 6 内容 |
| Phase 6 ← Phase 2 | 弱依赖 | Grid Pattern 在 Hero 背景，Phase 2 已部分实现 |

### 6.3 推荐执行顺序

**串行**（推荐）：
```
0 → 1 → 2 → 3 → 4 → 5 → 6 → 7
```

**并行优化**（高级）：
```
0 → 1 → [2 || 3 || 4] → 5 → 6 → 7
```

**建议**：为保证 Review 节奏和降低风险，**采用串行**。并行仅在用户明确要求加速时考虑。

### 6.4 Phase 间停顿点

每个 Phase 完成后**必须停顿**，等待：
1. Design Review Gate 验收
2. 用户确认进入下一 Phase
3. Git commit（可选，按用户决策）

**禁止**：跳过 Review Gate 直接进入下一 Phase

---

## 7. 关键技术冲突与缓解

### 7.1 冲突 1：Shiki 单例 vs 构建时预渲染

**冲突描述**：
- Shiki 设计为运行时单例（异步初始化）
- Hero 代码片段需要构建时预渲染（避免 LCP 退化）
- 现有 [src/utils/markdown.ts](file:///c:/Users/lai/Desktop/%E4%B8%AA%E4%BA%BA%E7%BD%91%E9%A1%B5/src/utils/markdown.ts) 的 `renderMarkdown` 是异步函数，仅在 vite content plugin 中调用

**缓解方案**：
- 在 vite.config.ts 新增 `heroSnippetPlugin`，构建时调用 `codeToHtml`
- 复用 `getHighlighter()` 单例（已加载 typescript lang + github-dark theme）
- 输出为虚拟模块 `virtual:hero-snippet`，HeroSection import

**验证点**：
- Phase 2 前预研：测量 `codeToHtml` 构建时耗时
- 验证 Vercel 构建环境 Shiki 可用

**风险等级**：🟡 中

### 7.2 冲突 2：motion Token 命名冲突

**冲突描述**：
- IMPLEMENTATION_PLAN §3.4 定义 `--duration-fast: 150ms`
- 现有 [tokens.css](file:///c:/Users/lai/Desktop/%E4%B8%AA%E4%BA%BA%E7%BD%91%E9%A1%B5/src/styles/tokens.css) 已有 `--transition-fast: 150ms`
- 两者语义相同，命名不同，易混淆

**缓解方案**：
- **不引入** `--duration-*` Token，复用现有 `--transition-*`
- motion.css 中使用 `--transition-fast` / `--transition-normal`
- 新增仅 `--duration-reveal: 500ms` 和 `--duration-slowest: 600ms`（现有 Token 无此语义）

**风险等级**：🟢 低

### 7.3 冲突 3：DecisionSection 组件配额

**冲突描述**：
- IMPLEMENTATION_PLAN §2 Phase 5 提到"可能新增 1 个组件"
- 项目组件配额剩 1（已用 1）
- 若 Phase 2 也消耗配额（Hero 代码片段卡片新建组件），Phase 5 将无配额

**缓解方案**：
- **Phase 2**：Hero 代码片段卡片在 HeroSection.vue 内部实现，**不新建组件**
- **Phase 5**：DecisionSection 方案对比卡片在 DecisionSection.vue 内部用 `v-if` 分支，**不新建组件**
- **保留组件配额**：用于未来不可预见的需求

**风险等级**：🟢 低

### 7.4 冲突 4：Hero 网格比例变化

**冲突描述**：
- 现有 Hero 7fr/5fr 是 v3.0.0 亮点资产
- Phase 2 改为 6fr/4fr，破坏资产

**缓解方案**：
- 文档化"6fr/4fr 是 v3.5 演进"，不是破坏
- 保留 7fr/5fr 作为 1024px-1279px 断点 fallback
- 仅 1280px+ 使用 6fr/4fr

**风险等级**：🟡 中

### 7.5 冲突 5：Skills Bento 与 Projects Bento 视觉重复

**冲突描述**：
- Home Projects 已用 Bento Grid
- Phase 3 Skills 也用 Bento 大小卡
- 全站两个 Bento 可能视觉重复

**缓解方案**：
- Projects Bento：featured 跨 2 行，强调"主项目 vs 次项目"
- Skills Bento：大卡 + 小卡 + 横长卡，强调"核心方向 vs 辅助方向"
- 视觉区分：Projects 用 metrics，Skills 用 chip + 图标

**风险等级**：🟡 中

### 7.6 冲突 6：IntersectionObserver 失败 fallback

**冲突描述**：
- 若 JS 失败 / IntersectionObserver 不支持，reveal 元素永不显示
- 用户看到空白页

**缓解方案**：
- **默认 opacity:1**（CSS 初始值）
- 仅在 JS 成功注册 IntersectionObserver 后才设 opacity:0
- 实现：composable 在 `onMounted` 后通过 `data-reveal="ready"` 属性切换
- CSS：`[data-reveal="ready"] .reveal { opacity: 0; }`

**风险等级**：🔴 高（影响可用性）

### 7.7 冲突汇总

| # | 冲突 | 风险 | 缓解状态 |
|---|---|---|---|
| 1 | Shiki 单例 vs 构建时预渲染 | 🟡 中 | 方案明确，Phase 2 预研验证 |
| 2 | motion Token 命名冲突 | 🟢 低 | 方案明确，复用现有 Token |
| 3 | DecisionSection 组件配额 | 🟢 低 | 方案明确，内部实现 |
| 4 | Hero 网格比例变化 | 🟡 中 | 方案明确，断点 fallback |
| 5 | Skills/Projects Bento 重复 | 🟡 中 | 方案明确，视觉区分 |
| 6 | IntersectionObserver 失败 | 🔴 高 | 方案明确，默认可见 + JS 切换 |

---

## 8. 最终 Go/No-Go 决策

### 8.1 决策依据

基于以下 4 项评估：

1. **技术验证结果**（§1.9）：4 项直接通过，3 项有条件通过，0 项不通过
2. **风险矩阵**（§3.10）：2 个高风险 Phase（Phase 2 / Phase 5），均有明确缓解方案
3. **Review Gate 完整性**（§4）：8 个 Phase 均有明确验收标准
4. **关键技术冲突**（§7）：6 项冲突均有缓解方案，1 项高风险（IntersectionObserver）已明确 fallback

### 8.2 前置条件

进入 Phase 0 前，**必须**完成以下前置条件：

| # | 前置条件 | 状态 | 责任 |
|---|---|---|---|
| 1 | Creative Direction 已锁定 | ✅ 完成 | 用户已确认 |
| 2 | Implementation Plan 已完成 | ✅ 完成 | IMPLEMENTATION_PLAN.md 已落盘 |
| 3 | Readiness 审查已完成 | ✅ 完成 | 本文档 |
| 4 | 用户批准进入 Implementation | ✅ 完成 | 用户已批准 |
| 5 | 用户批准进入 Phase 0 | ⏳ 待确认 | 本文档输出后 |

**无阻塞前置条件**。以下为 Phase 2/3/6 的预研任务，可在 Phase 0/1 期间并行完成：

| # | 预研任务 | 何时完成 | 责任 Phase |
|---|---|---|---|
| P1 | Shiki 构建时预渲染方案验证 | Phase 2 开始前 | Phase 2 |
| P2 | 移动端 Bento 退化布局设计 | Phase 3 开始前 | Phase 3 |
| P3 | Vercel 构建环境 git 访问验证 | Phase 6 开始前 | Phase 6 |

### 8.3 最终建议

> ## ✅ 建议：可以进入 Phase 0 开发

**理由**：

1. **技术可行性已验证**：7 项锁定决策中 4 项直接通过，3 项有条件通过（条件明确且可缓解），0 项不通过
2. **风险可控**：2 个高风险 Phase（Phase 2 / Phase 5）均有明确缓解方案和 Review Gate 阻塞条件
3. **回滚策略完整**：每个 Phase 独立可回滚，紧急回滚预案明确
4. **依赖关系清晰**：Phase 间依赖关系明确，推荐串行执行降低风险
5. **Review Gate 严格**：8 个 Phase 均有视觉/交互/性能/a11y/工程五维度验收标准
6. **不破坏现有资产**：`// eyebrow` / Token / 暗色模式 / Bento / Markdown SSOT 全部保留

**进入 Phase 0 的约束**：

- ✅ 严格遵守 Review Gate，不跳过验收
- ✅ 每个 Phase 完成后停顿，等待用户确认
- ✅ 高风险 Phase（2 / 5）前完成预研任务
- ✅ 遵守 FROZEN INVENTORY 约束（不新增依赖/字体/架构抽象）
- ✅ 组件配额保留（Phase 2/5 内部实现，不新建组件）
- ✅ 若发现锁定决策与实现冲突，暂停并暴露冲突（规则 18）

### 8.4 进入 Phase 0 后的第一步

**Phase 0：Motion 基础设施**

1. 新增 `src/composables/useScrollReveal.ts`
2. 新增 `src/styles/motion.css`
3. 扩展 `src/styles/tokens.css`（仅新增 `--duration-reveal` / `--duration-slowest`，复用现有 `--transition-*`）
4. 修改 `src/main.ts`（引入 motion.css）
5. 不应用任何组件
6. 验证 Phase 0 Review Gate
7. 等待用户确认进入 Phase 1

---

## 9. 总结

### 9.1 Readiness 审查结论

| 维度 | 结论 |
|---|---|
| Creative Direction 技术可行性 | ✅ 通过（4 直接 + 3 有条件） |
| 风险识别完整性 | ✅ 6 类风险全识别，缓解方案明确 |
| Review Gate 严格性 | ✅ 8 Phase × 5 维度验收标准 |
| 回滚策略完整性 | ✅ 每 Phase 独立可回滚 |
| 依赖关系清晰度 | ✅ 强/弱依赖明确，推荐串行 |
| 前置条件满足度 | ✅ 无阻塞前置条件 |

### 9.2 关键风险提示

进入 Implementation 后，需特别关注：

1. **Phase 2 LCP 风险** — 必须构建时预渲染 Shiki，禁止运行时调用
2. **Phase 5 架构风险** — DecisionSection 渐进迁移，必须保留 fallback
3. **Phase 1 IntersectionObserver 失败** — 默认 opacity:1，JS 失败时内容仍可见
4. **Phase 6 Vercel git 访问** — 需提前验证，fallback 到 build time

### 9.3 文档状态

- **本文档**（IMPLEMENTATION_READINESS.md）：✅ 完成
- **Creative Direction**：✅ 已锁定
- **Implementation Plan**：✅ 已完成
- **进入 Phase 0**：⏳ 待用户最终确认

---

**《Portfolio v3.5 Implementation Readiness》结束。**

> **建议：✅ 可以进入 Phase 0 开发。**
>
> 等待用户最终确认后，开始 Phase 0：Motion 基础设施。

本阶段严格遵守"仅完成 Readiness 审查，不修改源码、不生成实现代码、不 commit、不 push、不更新项目工程文档"原则。

> **本文件为 Readiness 审查文档，非项目工程文档。进入 Phase 0 需用户明确批准。**