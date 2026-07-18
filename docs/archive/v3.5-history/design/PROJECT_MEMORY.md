# 项目记忆（PROJECT_MEMORY.md）

> **本文件记录项目长期有效的知识与决策，供未来 AI 接手时参考。**
> 不包含开发流水账（详见 [RELEASE_REVIEW_REPORT.md](RELEASE_REVIEW_REPORT.md)）。
> 不包含当前状态（详见 [HANDOFF.md](HANDOFF.md) §0 SNAPSHOT）。
>
> 最后更新：2026-07-18
> 当前版本：v3.5.0（已发布，维护模式）

---

## 1. 架构原则

### 1.1 Markdown SSOT（Single Source of Truth）

所有内容数据以 `src/content/*.md` 为唯一数据源，组件不硬编码内容。

**8 个虚拟模块**（构建时 Markdown → HTML，运行时零解析开销）：

| 虚拟模块 | 数据源 | 用途 |
|---|---|---|
| `virtual:content` | `src/content/projects/*.md` | 首页项目卡片 |
| `virtual:project-detail` | `src/content/projects/*.md` + `decisions/*.md` | 项目详情页 |
| `virtual:interview-content` | `src/content/interview/*.md` | 面试准备页 |
| `virtual:ai-practice-content` | `src/content/ai-practice/index.md` | AI 实践页 |
| `virtual:skills-content` | `src/content/skills/index.md` | 技术能力页 |
| `virtual:personal-content` | `src/content/personal/about.md` | 关于页 |
| `virtual:resume-content` | `src/content/resume/index.md` | 简历页 |
| `virtual:timeline-content` | `src/content/growth/timeline.md` | 首页时间线 |

**关键决策**：
- Timeline 数据必须以 `timeline.md` 为 SSOT；Home 页从 SSOT 读取，About 页保持独立内容**不共享 Timeline**（RC1 决策，避免双数据源同步问题）
- ProjectDetail 必须保持 Markdown 为唯一内容源，禁止创建第二个项目数据源
- Resume callout / About quote / ProjectDetail decisions 均从 frontmatter 读取，不硬编码到组件

### 1.2 构建时处理

- markdown-it + gray-matter 解析 Markdown（仅构建时）
- Shiki 代码高亮（仅构建时，深色主题**不随主题切换**）
- 运行时 bundle 不含 Markdown 解析库

### 1.3 组件配额制

- v3.0.0 新增组件上限：2 个（实际新增 1 个：`ArchitectureDiagram.vue`，剩余 1 个作废）
- v3.5.0 未消耗组件配额
- **原则**：强制在抽象与冗余之间做权衡，避免为单次使用做抽象

### 1.4 ArchitectureDiagram 组件方案（B1 方案，RC2 决策）

- 不修改 SVG 内容，只处理显示、响应式、暗黑模式兼容
- SVG 视为"亮色卡片"，用防御性样式适配 dark mode
- 通过 `import.meta.glob` lazy 加载（按需加载 SVG，非 eager）
- 无架构图时自动隐藏，不显示 placeholder

---

## 2. 技术选型

### 2.1 核心选型理由

| 选型 | 理由 |
|---|---|
| Vue 3 + `<script setup lang="ts">` | 组合式 API + 类型安全 |
| TypeScript strict: true | 类型安全，避免 `any` |
| Vite 构建时插件 | Markdown → HTML 在构建时完成，运行时零解析 |
| CSS Custom Properties | 设计令牌系统，支持暗色模式切换 |
| Lucide Vue Next | 轻量图标库，tree-shakeable |
| Playwright | E2E 测试，release-gate-task-005.mjs 为发布门禁 |
| Vercel SPA rewrites | 静态部署，master 分支自动部署 |

### 2.2 禁止引入的依赖

- ❌ Element Plus / Naive UI / 任何第三方 UI 库
- ❌ Tailwind CSS / UnoCSS / 任何 CSS 框架
- ❌ Pinia / Vuex / 任何状态管理库
- ❌ Nuxt / Next.js / 任何 SSR/SSG 框架
- ❌ GSAP / 任何动画库
- ❌ 后端服务 / 数据库 / 服务器
- ❌ 运行时 Markdown 解析

### 2.3 替代原则

| 需要的能力 | 不用 | 用 |
|---|---|---|
| 折叠面板 | el-collapse | `<details>` + `<summary>` |
| 时间线 | el-timeline | `<ol>` + CSS `::before` |
| 卡片 | el-card | `<article>` + CSS |
| 图标 | el-icon | Lucide Vue |
| 暗色模式 | — | CSS 自定义属性 + `data-theme` |

---

## 3. 设计约束

### 3.1 风格定位 — Developer Academic

克制、专业、有细节。Slate 灰色系 + Amber 强调色，Inter + JetBrains Mono。
个人品牌来自工程质量、内容质量、项目深度，**而非视觉装饰**。

### 3.2 Hero 信息层级

仅限 Who / What / Why / Next / Engineering Metrics，**无营销文案**。

### 3.3 ProjectCard 视觉层次

通过 Surface / Shadow / Whitespace / Typography 建立权重，**accent border 不用于权重**（颜色只负责品牌）。

### 3.4 Timeline stages 结构

必须包含：学习重点 / 能力变化 / 下一阶段（字段名英文 `learned` / `capability` / `nextStage`，页面渲染用中文标签）。

### 3.5 About 页定位

"人物画像"，**不是 Resume**。不重复 Hero / Timeline / Resume 的信息。`frontmatter.facts` 限 4 项以内，仅长期稳定信息（教育 / 方向 / 考研 / GitHub）。

### 3.6 Contact 风格

克制、名片式，无营销语言。Email 不公开（隐私考虑），仅保留 GitHub。

### 3.7 Interview 分类

按项目维度组织：`jiangnan-travel` / `love-letter` / `exam-system` / `general`。
颜色按项目分配：Amber / Slate Blue / Emerald-Teal / Slate Gray。
必须用**色点 + 文字**双重表达（无障碍要求）。

### 3.8 Event Sourcing 术语

技术实现 / 架构设计 / 决策记录 / 面试材料中保留 "Event Sourcing" 术语；
指标 / 宣传描述 / 能力摘要中使用更克制的"关键操作留痕"。

---

## 4. Signature Visual 配额（v3.5 已耗尽）

| Signature | 描述 | 应用位置 | 配额 |
|---|---|---|---|
| S1 | Number Prefix（`//` eyebrow） | 全站 section header | — |
| S2 | Mono Eyebrow（`.mono` class） | 6 个页面 eyebrow | — |
| S3 | Amber Accent Line | DecisionSection / About 引言 / Resume callout | **3/3 耗尽** |
| S4 | Grid Pattern Underlay | Hero / Footer | **2/2 耗尽** |
| S5 | Code Comment Style（`//` 注释） | 全站代码注释 | — |
| S9 | Underline Reveal（Footer link hover） | Footer link `::after` | — |

**后续不得新增第 4 处 Amber Accent Line 或第 3 处 Grid Pattern。**

---

## 5. 重要历史决策

### 5.1 Timeline SSOT 改造（RC1）

**问题**：Home.vue 静态数组维护 Timeline 数据，与 `timeline.md` 双数据源同步困难。
**决策**：将时间线数据迁移至 `timeline.md` frontmatter.stages，新增 `virtual:timeline-content` 虚拟模块（第 8 个）。Home 从 SSOT 读取，About 保持独立内容不共享。
**教训**：维护两个 Timeline 数据源导致同步问题；SSOT 实现是长期可维护性的必要投资。

### 5.2 ArchitectureDiagram 组件方案（RC2）

**问题**：项目架构图 SVG 如何在 Vue 中展示并适配暗色模式？
**决策**：采用 B1 方案 — 不修改 SVG 内容，只处理显示、响应式、暗黑模式兼容。SVG 视为"亮色卡片"，用防御性样式适配 dark mode。`import.meta.glob` lazy 加载。
**教训**：SVG 文件固定亮色背景需要防御性样式适配 dark mode。

### 5.3 About 页重构（RC3）

**问题**：About 页是"5 section 散乱内容"，与 Hero / Timeline / Resume 信息重复。
**决策**：重构为"人物画像"模型，`frontmatter.facts` 限 4 项长期稳定信息，body 精简为 3 section（工程定位 / 成长轨迹 / 关于本站），成长轨迹引导访问 Timeline 而非重复。
**教训**：About ≠ Resume；facts 不放易变数据（项目数 / API 数 / 文件数）。

### 5.4 CSS Cascade 冲突修复（Phase 4 Hotfix）

**问题**：`.card:hover` transform 被 stagger animation 的 `fill-mode: both` 覆盖。
**根因**：CSS Cascade 层级冲突 — animation（Animations level）覆盖 hover styles（Author level）。
**修复**：`animation-fill-mode` 从 `both` 改为 `backwards`，添加显式 `opacity: 1` 终态。
**教训**：`animation-fill-mode: both` 会与 hover transform 冲突；用 `backwards` + 显式终态解决。

### 5.5 Resume callout SSOT（Phase 7）

**决策**：callout 内容从 `resume/index.md` frontmatter.callout 读取，与 About quote / Timeline stages / ProjectDetail decisions 模式一致。
**教训**：SSOT 模式应全站统一，避免硬编码到组件。

### 5.6 Interview 分类按项目维度（Phase 6）

**问题**：CREATIVE_DIRECTION §7.7 规定按问题类型分类，但实际内容按项目组织。
**决策**：用户批准方案 B — 保持 Markdown SSOT，按项目维度分类（jiangnan-travel / love-letter / exam-system / general），颜色按项目分配。
**教训**：设计规范与实际内容冲突时，暴露冲突等待人类决策，不自行融合。

---

## 6. 长期维护注意事项

### 6.1 工程基础设施

- **行尾统一**：`.gitattributes` 配置 `* text=auto eol=lf`，避免 Windows CRLF 污染
- **TypeScript 增量缓存**：`*.tsbuildinfo` 已在 `.gitignore` 排除，不提交
- **E2E 测试**：`release-gate-task-005.mjs` 是发布门禁，`package.json` 必须包含 Playwright 依赖和 `test` 脚本
- **Vercel 部署**：master 分支自动部署，SPA rewrites 配置在 `vercel.json`

### 6.2 已知 Baseline 问题（v3.5.1 Maintenance Backlog）

| # | 问题 | 严重度 | 建议方案 |
|---|---|---|---|
| 1 | Footer 字体加载导致 CLS 0.375 | P2 | font preload 或 font subset |
| 2 | Amber accent (#d97706) + white 文字对比度 3.19:1 | P2 | 按钮文字 font-weight: 600 或字号 16px+ |
| 3 | FCP 线上复测（已通过，仅记录） | P2 | — |

详见 [MAINTENANCE_BACKLOG_v3.5.1.md](MAINTENANCE_BACKLOG_v3.5.1.md)。

### 6.3 Dark Mode 维护

- Amber 自动提亮：Light `#d97706` → Dark `#f59e0b`
- SVG 视为"亮色卡片"，需防御性样式
- Dark mode 可能导致分类颜色冲突，需独立调整颜色确保区分度

### 6.4 内容真实性维护

- 禁止夸大不存在的能力
- 所有技术标签必须有代码证据
- 隐私信息（手机号 / 学号 / 实习材料）禁止推送到远程
- 公司名已脱敏为"[已脱敏]网约车出行公司"

### 6.5 测试数据准确性

- 江南出行：81 个后端单元/集成测试（含 18 个状态机测试），非"18 个 JUnit 测试"
- 测试用例总数：236（非早期的 155）
- 项目页面数：Love 项目 17 页面（非 23）

---

## 7. 已接受的权衡（v3.5）

### 7.1 Phase 3 Skills Bundle 超预算

- **约束**：READINESS §4.4 规定 ≤ +1 KB gzip
- **实际**：+1.70 kB gzip（超 0.70 kB）
- **原因**：6 个 Lucide 图标是 Creative Direction 强制要求的核心设计元素
- **决策**：用户于 2026-07-17 批准接受
- **后续**：无需重复优化此指标，除非未来整体 Bundle 出现明显增长

### 7.2 v3.5 总 Bundle 增量

- **预算**：≤ +5 KB gzip
- **实际**：~ +5.0-5.5 kB gzip（预算边界附近）
- **主要增量**：Phase 3（Lucide 图标 +1.70 kB，已批准）+ Phase 6（Footer 视觉系统 +1.4-1.9 kB）
- **决策**：用户接受，不为单一指标牺牲代码可维护性或设计一致性

---

## 8. 权威文档优先级

如遇冲突，按以下优先级判断：

1. [docs/架构确认文档-v1.2.md](docs/架构确认文档-v1.2.md)（架构锁定版，最高权威）
2. [Portfolio_v3.5_CREATIVE_DIRECTION.md](Portfolio_v3.5_CREATIVE_DIRECTION.md) / IMPLEMENTATION_PLAN / READINESS（v3.5 LOCKED）
3. [HANDOFF.md](HANDOFF.md)（交接文档）
4. [AI_RULES.md](AI_RULES.md)（项目特定约束）
5. 本文件（历史决策参考）

---

## 9. 历史开发阶段概览

详细开发历史见 [HANDOFF.md](HANDOFF.md) §二开发历史 + [RELEASE_REVIEW_REPORT.md](RELEASE_REVIEW_REPORT.md)。

| 阶段 | 时间 | 交付 |
|---|---|---|
| Task 000-010 | 2026-07-08 ~ 2026-07-15 | 项目奠基（内容资产 / 工程骨架 / 8 页面 / Vercel 部署） |
| RC1-RC8 | 2026-07-15 ~ 2026-07-17 | v3.0.0 Final Release（Timeline SSOT / 视觉升级 / About 重构 / Resume 深化等） |
| Phase 0-7 | 2026-07-17 ~ 2026-07-18 | v3.5.0 Final Release（Motion 系统 / Signature Visual / 视觉层次深化） |
| 维护期 | 2026-07-18 ~ | v3.5.1 Backlog（3 项 P2，不阻塞） |

**历史文档归档**：Phase Reports / 早期工程文档见 [docs/archive/v3.5-history/](docs/archive/v3.5-history/)。
