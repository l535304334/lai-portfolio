# 项目交接文档（HANDOFF.md）

> 本文件是 AI 接手入口。任何 AI（Trae / GLM / Claude Code / Codex / ChatGPT 等）接手本项目时，**优先阅读本文件**，无需重新分析整个项目。
> 最后更新：2026-07-15

---

## 1. 项目定位

**面向考研复试导师与校招面试官的软件工程学生技术作品集网站** — 通过三个真实项目案例展示「问题 → 方案对比 → 选择理由 → 实现 → 验证 → 复盘」的工程思维链条。

---

## 2. 当前状态

| 项 | 值 |
|----|-----|
| Task 001 | ✅ 已完成 |
| Task 002 | ✅ 已完成 |
| Task 003 | ✅ 已完成（含 Release Gate 14/14 Playwright 测试 + 合并 master + Tag v0.3.0） |
| Task 004 | ✅ 已完成（含 Release Gate 33/33 Playwright 测试 + 合并 master + Tag v0.4.0） |
| Task 005 | ✅ 已完成（含 Release Gate 50/50 Playwright 测试 + 合并 master + Tag v0.5.0） |
| Task 006 | ✅ 已完成（含 GitHub MCP 核对 + 4 Markdown 同步 + Playwright 50/50 + 仓库清理） |
| Task 007 | ✅ 已完成（Final Portfolio Review，7 部分评审 + 4 类事实修正，Commit `5c58f58`） |
| Task 008 | ✅ 已完成（Resume 系统完善，第 7 虚拟模块 + Resume.vue 重写 + PDF 打印 + Playwright 49/49） |
| Release Review | ✅ Task 001~008 全部通过 |
| **Master Baseline** | Task 008 commit（master，待推送） |
| **Tag** | `v0.5.0`（Task 005 Release，未移动） |
| **远程 Baseline** | 待推送（Task 005 + 006 + 007 + 008 共多个 commit + Tag v0.5.0） |
| **当前分支** | `master` |
| **Develop HEAD** | 与 master 同步 |
| **工作区状态** | Task 008 待 commit，不 push（含隐私内容，详见下方警告） |
| 验证 | ✅ build 成功（1657 模块，2.29s）/ typecheck 通过 / Playwright 49/49 / 人工 8/8 |
| **当前进度** | Task 008 完成，等待 Task 009 启动（Vercel 部署） |
| **⚠️ 隐私警告** | 简历 Markdown（`src/content/resume/index.md`）含电话号码 18279755182，GitHub 仓库 `l535304334/lai-portfolio` 为**公开仓库**。**禁止 push 到远程**，除非先脱敏电话号码或将仓库转为私有。 |

---

## 3. 当前技术栈

| 层级 | 选型 | 版本 |
|------|------|------|
| 框架 | Vue 3 | 3.5+ |
| 语言 | TypeScript（strict） | 5.5+ |
| 构建 | Vite | 6+ |
| 路由 | Vue Router（web history） | 4.x |
| CSS | CSS Custom Properties | — |
| 图标 | Lucide Vue | — |
| 字体 | Inter + JetBrains Mono（Google Fonts） | — |
| 部署 | Vercel（SPA rewrites） | — |

**运行时 bundle 仅含：** Vue 3 + Vue Router + Lucide Vue + CSS（gzip ~52KB）。

**运行时依赖（3 项）：** vue@^3.5.13 / vue-router@^4.5.0 / lucide-vue-next@^0.460.0
**开发时依赖（9 项）：** @types/node / @vitejs/plugin-vue / typescript / vite / vue-tsc / markdown-it / gray-matter / shiki / @types/markdown-it

**Task 003 已引入（仅构建时，不进运行时 bundle）：** markdown-it ^14.3.0 / gray-matter ^4.0.3 / shiki ^4.3.1 / @types/markdown-it ^14.1.2

---

## 4. 当前目录

```
个人网页/
├── AI_RULES.md                    # AI 协作规范（必读）
├── PROJECT_CONTEXT.md              # 项目上下文索引（必读）
├── PROJECT_MEMORY.md              # 项目记忆档案（必读）
├── HANDOFF.md                     # 本文件
├── ai-workspace.yaml              # AI 工作区配置
├── index.html                     # 入口 HTML（含 FOUC 防御脚本）
├── package.json
├── tsconfig.json / tsconfig.node.json
├── vite.config.ts
├── vercel.json                    # SPA rewrites
│
├── docs/
│   ├── 架构确认文档-v1.2.md        # ⭐ 权威架构文档（最高优先级）
│   ├── 开发设计规范-v1.0.md        # v1.1 内容（文件名 v1.0，参考）
│   ├── 个人能力分析与网站规划报告.md  # v1.0 背景资料
│   ├── task000-completion-report.md
│   ├── assets/
│   │   ├── architecture/          # 7 套 SVG + Mermaid 源码
│   │   └── screenshots/           # 江南出行项目截图
│   └── ...
│
├── public/
│   └── favicon.svg                # Amber 方块 + "L" 字母
│
└── src/
    ├── main.ts / App.vue / env.d.ts
    ├── router/index.ts            # 7 业务路由 + 404，scrollBehavior 含 hash
    ├── composables/useTheme.ts    # 单例主题（system/light/dark 三态）
    ├── layouts/DefaultLayout.vue
    ├── components/common/         # NavBar / Footer / ThemeToggle / BackToTop
    ├── components/home/           # HeroSection / ProjectCard / TimelineSection / ContactSection
    ├── components/project/        # ProjectHeader / MetricCard / MarkdownContent / DecisionSection / ProjectNav
    ├── pages/                     # 8 个页面（见 §5）
    ├── styles/
    │   ├── tokens.css             # v1.2 §2.2 全量设计令牌
    │   └── global.css             # reset + .page 全局样式 + 工具类
    ├── types/                     # 类型定义（按域拆分，5 文件 + personal.ts）
    │   ├── content.ts             # ContentMeta / Metric
    │   ├── project.ts             # ProjectSummary / ProjectContent
    │   ├── decision.ts            # DecisionContent
    │   ├── timeline.ts            # TimelineStage
    │   ├── contact.ts             # ContactInfo
    │   ├── interview.ts           # InterviewQAPair / InterviewCategory（Task 004）
    │   ├── ai-practice.ts         # AiPracticeContent（Task 004）
    │   └── personal.ts            # PersonalContent（Task 005，4 行）
    │   └── resume.ts              # ResumeContent（Task 008，4 行）
    ├── content/                   # 15 个 Markdown 内容文件（Task 003 + 008 渲染）
    │   ├── personal/  projects/  decisions/
    │   ├── interview/  skills/  growth/  ai-practice/  resume/
    ├── assets/                    # 空（Task 004 SVG 图表）
    └── utils/
        └── content.ts             # Vite 虚拟模块插件（7 虚拟模块，Task 003~005 + 008 累积）
```

**虚拟模块清单（7 个，src/utils/content.ts）：**
- `virtual:content` — 项目摘要（Task 003）
- `virtual:project-detail` — 项目详情 HTML（Task 003）
- `virtual:interview-content` — 面试问答 HTML（Task 004）
- `virtual:ai-practice-content` — AI 实践 HTML（Task 004）
- `virtual:skills-content` — 技能页 HTML（Task 005.1）
- `virtual:personal-content` — 关于我 HTML（Task 005.3）
- `virtual:resume-content` — 简历页 HTML（Task 008）

---

## 5. 当前页面

| 路径 | 文件 | 状态 |
|------|------|------|
| `/` | `src/pages/Home.vue` | ✅ 已实现（Task 002，4 个组件组合） |
| `/projects/:slug` | `src/pages/ProjectDetail.vue` | ✅ 已实现（Task 003，5 个组件 + DecisionSection） |
| `/skills` | `src/pages/Skills.vue` | ✅ 已实现（Task 005，virtual:skills-content + MarkdownContent） |
| `/interview` | `src/pages/Interview.vue` | ✅ 已实现（Task 004，4 分类 17 题 + 折叠面板） |
| `/ai-practice` | `src/pages/AiPractice.vue` | ✅ 已实现（Task 004，MarkdownContent 渲染） |
| `/resume` | `src/pages/Resume.vue` | ✅ 已实现（Task 008，virtual:resume-content + MarkdownContent + window.print PDF） |
| `/about` | `src/pages/About.vue` | ✅ 已实现（Task 005，virtual:personal-content + MarkdownContent） |
| 404 | `src/pages/NotFound.vue` | ✅ 最终版 |

---

## 6. 当前阶段 — Task 007（待开始）

### 目标

部署与上线（Vercel）— 将本地构建产物部署到 Vercel，配置生产环境。

### 上一任务 — Task 006（✅ 已完成）

**Master Baseline：** Commit `f5563ac`（Task 006 项目同步）
**Tag：** `v0.5.0`（未移动，Task 006 仅内容同步无代码功能变更）

#### Task 006 完成内容

- ✅ 使用 GitHub MCP 核对 3 个项目 GitHub 仓库（jiangnan-travel / Love / interactive-quiz-system）
- ✅ 更新 4 个 Markdown 文件（jiangnan-travel.md / love-letter.md / exam-system.md / timeline.md）
  - 添加 3 个项目的 GitHub 链接（frontmatter `github` 字段）
  - 添加 3 个项目的发布状态（Release 1.0 / v1.0.0）
  - 修正 jiangnan-travel.md 测试数据（18→81）和 RELEASE 路径
  - timeline.md 添加 3 个项目发布状态时间戳
- ✅ typecheck + build 通过（1654 模块，2.39s）
- ✅ Playwright 50/50 PASS（端口 4180）
- ✅ 人工页面验证 18/18 PASS（3 个 GitHub 链接 + 0 console error + Markdown 渲染正常）
- ✅ Repository Cleanup：.gitignore 添加 debug.log + release-gate-test.mjs
- ✅ 17 张项目截图入库（8 题库 + 9 两地书）
- ✅ 文档同步更新（PROJECT_MEMORY.md / HANDOFF.md / RELEASE_REVIEW_REPORT.md）

#### Task 006 验证结果

| 验证项 | 结果 |
|--------|------|------|
| `npm run typecheck` | ✅ 通过（0 错误） |
| `npm run build` | ✅ 成功（1654 模块，2.39s） |
| Playwright 全量回归 | ✅ 50/50 PASS（17 测试组） |
| 人工页面验证 | ✅ 18/18 PASS |
| 隐私扫描 | ✅ 0 匹配 |
| Git commit | ✅ `f5563ac`（24 files, +285 -5） |

**等待推送：** Task 006 commit `f5563ac` 待推送到 origin/master

### Task 007 待开始

- Vercel 部署上线
- 生产环境配置（`vercel.json` 已存在 SPA rewrites）
- 域名配置（可选）
- 首次部署验证

### 上一任务 — Task 005（✅ 已完成）

**Master Baseline：** Tag `v0.5.0`

#### Task 005 Release Gate 结果

- ✅ Playwright 全量回归测试 50/50 通过（17 测试组，覆盖 Task 001~005 全部功能）
- ✅ Skills 页：virtual:skills-content + MarkdownContent 全文渲染
- ✅ Resume 页：静态占位卡片（Task 005 阶段，**Task 008 已升级为正式简历页**）
- ✅ About 页：virtual:personal-content + MarkdownContent 全文渲染
- ✅ 导航栏 7 个链接全部存在（首页 / 项目 / 能力 / 面试 / AI 实践 / 简历 / 关于）
- ✅ 7 路由控制台 0 运行时错误
- ✅ 响应式桌面/平板/移动 3 断点无水平溢出
- ✅ 主题切换（Task 002 回归）
- ✅ typecheck + build 通过（1654 模块，2.39s）
- ✅ Bundle Size：初始加载 51.18 KB gzip（+0.39 KB vs Task 004），新增内容全部懒加载

#### Task 005 交付物

**005.1 — Skills 页面**
- `src/utils/content.ts` — 新增 `virtual:skills-content`（`scanSkills` + resolveId/load + HMR）
- `src/env.d.ts` — 新增 `virtual:skills-content` 模块声明
- `src/pages/Skills.vue` — 替换占位页，MarkdownContent 全文渲染（gzip 1.32 KB）

**005.2 — Resume 页面（静态占位，Task 008 已升级为正式简历页）**
- `src/pages/Resume.vue` — 静态占位卡片（gzip 0.44 KB）→ **Task 008 重写为 virtual:resume-content + MarkdownContent + window.print PDF**

**005.3 — About 页面**
- `src/types/personal.ts` — `PersonalContent` 接口（4 行）
- `src/utils/content.ts` — 新增 `virtual:personal-content`（`scanPersonal` + resolveId/load + HMR）
- `src/env.d.ts` — 新增 `virtual:personal-content` 模块声明
- `src/pages/About.vue` — 替换占位页，MarkdownContent 全文渲染（gzip 1.26 KB）

**005.7 — Playwright 全量回归测试**
- `release-gate-task-005.mjs` — 50 测试用例（17 测试组，覆盖 7 路由 + 3 新页 + 导航 + 响应式 + 主题切换 + 控制台错误扫描）

**005.8 — Release Gate**
- typecheck + build 通过
- Bundle Size 对比（Task 004 → Task 005）
- FF 合并 feature → develop → master
- Tag `v0.5.0` 创建
- 文档更新（PROJECT_MEMORY.md / HANDOFF.md / RELEASE_REVIEW_REPORT.md）

#### Task 005 架构冲突（Rule 7）

架构文档 §8 指定 Skills 页使用 `SkillCategory.vue` + `TimelineItem.vue` 自定义组件，Resume 页使用 iframe + PDF 检测。Plan v2 经用户批准偏离 §8，遵循 §2.3（原生 HTML 优先 + KISS/YAGNI）。3 页全部使用 MarkdownContent 全文渲染，Resume 在 Task 005 为静态占位（**Task 008 已升级为正式简历页**）。详见 PROJECT_MEMORY.md「Task 005 — 架构冲突记录」。

### Task 006~008 已完成

- Task 006：项目同步 + 仓库清理（Commit `f5563ac`）
- Task 007：Final Portfolio Review（Commit `5c58f58`）
- Task 008：Resume 系统完善（第 7 虚拟模块 + PDF 打印 + Playwright 49/49，待 commit）

- Vercel 部署上线
- 生产环境配置（`vercel.json` 已存在 SPA rewrites）
- 域名配置（可选）
- 首次部署验证

---

### 上一任务 — Task 003（✅ 已完成）

**Master Baseline：** Tag `v0.3.0`

#### Task 003 Release Gate 结果

- ✅ Playwright 端到端测试 14/14 通过
- ✅ 3 个项目详情页 + Markdown + Shiki + DecisionSection + 导航 + 404 + 响应式 全部验收
- ✅ 修复 1 项代码 bug（MarkdownContent 表格 overflow-x: auto，commit `02e79f8`）
- ✅ Tag `v0.3.0` 已创建并推送 GitHub

### Task 003 范围

- Vite 构建时 Markdown 转换插件（virtual:content + virtual:project-detail 双虚拟模块）
- 项目详情页模板（`ProjectDetail.vue` 替换占位）
- 3 个项目 Markdown 渲染（江南出行 / 两地书 / 题库）
- Shiki 代码高亮（仅构建时，深色主题不随主题切换）
- markdown-it + gray-matter（仅构建时依赖）
- Decision 内容仅 Markdown → HTML 渲染，无结构化解析（用户决定，偏离 v1.2 §8）

### Task 003 已引入的依赖（仅构建时，不进运行时 bundle）

| 类型 | 包名 | 用途 |
|------|------|------|
| 构建时 | markdown-it ^14.3.0 | Markdown → HTML |
| 构建时 | gray-matter ^4.0.3 | Frontmatter 解析 |
| 构建时 | shiki ^4.3.1 | 代码高亮（v1.2 §2.7 规定） |
| 构建时 | @types/markdown-it ^14.1.2 | TS 类型声明 |

### Task 003 边界

✅ **允许：** virtual:content / virtual:project-detail 插件 / ProjectDetail.vue / Shiki / markdown-it / gray-matter
❌ **禁止：** 提前实现 Task 004 内容（`/interview` + `/ai-practice` 页面）

### Task 002 完成回顾

Task 002 已完成以下 5 个文件开发（Git Commit `df83559` on feature/task-002-homepage）：

| 类型 | 文件 | 说明 |
|------|------|------|
| 组件 | `src/components/home/HeroSection.vue` | 非对称 7fr/5fr 网格 Hero |
| 组件 | `src/components/home/ProjectCard.vue` | Bento 卡片（featured/normal 两态） |
| 组件 | `src/components/home/TimelineSection.vue` | `<ol>` + CSS `::before` 时间线 |
| 组件 | `src/components/home/ContactSection.vue` | `<dl>` 语义化联系方式 |
| 页面 | `src/pages/Home.vue` | 组合 4 组件，持有类型化静态数据 |

**注意：** Home.vue 当前持有静态数据（projects / timelineStages / contact），Task 003 实现后应替换为 `import { projects } from 'virtual:content'`。

---

## 7. 禁止事项

### 禁止引入

- ❌ Element Plus / Naive UI / 任何第三方 UI 库
- ❌ Tailwind CSS / UnoCSS / 任何 CSS 框架
- ❌ Pinia / Vuex / 任何状态管理库
- ❌ Nuxt / Next.js / 任何 SSR/SSG 框架
- ❌ GSAP / 任何动画库（CSS transition 够用）
- ❌ 后端服务 / 数据库 / 服务器
- ❌ 运行时 Markdown 解析（必须构建时处理，Task 003）
- ❌ **未经确认的新依赖**（Task 003 需引入 markdown-it / gray-matter / Shiki，须经用户确认）

### 禁止行为

- ❌ `as any` 绕过类型检查
- ❌ `@ts-ignore` 忽略错误
- ❌ 硬编码颜色值（必须用设计令牌 `var(--*)`）
- ❌ 修改 PATH / NODE_PATH / 环境变量
- ❌ 自动升级 Node / npm / 全局工具
- ❌ 修改 main / master / production 分支历史
- ❌ `git push --force` / `git reset --hard` / `git clean -fdx`（除非用户明确确认）
- ❌ 推送隐私内容（API Key / Token / 学号 / 手机号 / 实习材料）
- ❌ **提前开发后续 Task 的内容**
- ❌ **修改架构**（架构以《架构确认文档-v1.2.md》为准，已锁定）
- ❌ **修改设计规范**

---

## 8. AI 接手说明

### 接手流程

任何 AI 接手本项目后：

1. **无需重新分析项目** — 本文件 + 三份协作文档已包含全部上下文
2. **默认遵守以下文档**（按优先级）：
   - [《架构确认文档-v1.2.md》](docs/架构确认文档-v1.2.md) — 架构锁定版，最高权威
   - [AI_RULES.md](AI_RULES.md) — 项目 AI 协作规范
   - [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — 项目上下文索引
   - [PROJECT_MEMORY.md](PROJECT_MEMORY.md) — Task 执行历史与决策
   - 《开发设计规范-v1.0.md》（内容为 v1.1，参考用）
3. **直接从 Task 004 开始** — Master Baseline 为 Task 003 Release（Tag `v0.3.0`），develop 与 master 同步

### 接手后第一步

```bash
# 1. 确认环境
node --version   # 需 ≥18（当前 v22.19.0）
npm --version    # 需 ≥9（当前 v11.18.0）

# 2. 确认 Baseline（master 与 develop 同步，Task 003 已合并）
git branch --show-current   # develop（默认开发分支）
git rev-parse master        # Task 003 Release（Tag v0.3.0）
git rev-parse develop       # 与 master 同步
git status                  # 应为 clean

# 3. 验证可运行
npm install            # 恢复依赖
npm run typecheck      # 应通过
npm run build          # 应成功（gzip ~51KB 初始 + 12.54KB 懒加载）
npm run dev            # 启动 localhost:5173 或 5174
```

### 关键约束

- **每个 Task 完成后暂停**，输出报告，等待用户确认，不得自动进入下一 Task
- **不得提前开发后续 Task 内容**（Task 003 不实现 `/interview` + `/ai-practice`）
- **重大修改需先报告并等待确认**（技术栈 / 页面结构 / 目录结构 / 设计原则 / 新增依赖 / .gitignore / Git 工作流）
- **冲突必须暴露，不自行折中** — 发现文档冲突或代码矛盾时，暂停并报告

### 已知问题（不阻塞 Task 003）

详见 [AI_RULES.md §13](AI_RULES.md) 与 [PROJECT_MEMORY.md](PROJECT_MEMORY.md)「遗留问题」与「Duplicate Review 结果」章节。核心 8 项：

1. 文档版本号不一致（v1.0 文件名 / v1.1 内容）— 以 v1.2 为准
2. tokens.css 预定义未使用令牌（`--color-java` 等、`--code-*` 高亮令牌）— Task 003 使用
3. 空目录 `src/assets/` 与 `src/utils/` 未进 Git — Task 003/004 添加首文件时自然解决
4. Google Fonts CDN 国内访问 — Task 007 评估是否自托管字体子集
5. 未配置 ESLint / Prettier — Task 007 可选添加
6. `src/content/personal/about.md` 中 Email 待补充 — Task 005 前补充
7. Interface 类型跨组件重复（`ProjectSummary` / `TimelineStage` / `ContactInfo` 在 Home.vue 与子组件各定义一次，共约 34 行）— Task 003 统一（virtual:content 类型集中声明）
8. CSS `__eyebrow` 样式块跨 3 组件重复（TimelineSection / ContactSection / Home，共约 18 行）— 后续统一提取为 `.section__eyebrow` 全局类

---

## 9. Git 提交规范

```
<type>: <description>

<optional body>
```

| Type | 说明 |
|------|------|
| feat | 新功能 |
| fix | Bug 修复 |
| refactor | 重构 |
| docs | 文档 |
| style | 样式 |
| test | 测试 |
| chore | 构建/工具 |
| perf | 性能优化 |

**禁止：** 自动 push、自动 force、自动 reset、自动 clean、跳过 hooks。

---

> 本文件随项目演进持续更新。每完成一个 Task 更新当前状态与下一阶段章节。
