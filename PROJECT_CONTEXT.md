# 项目上下文说明（PROJECT_CONTEXT.md）

> 本文件是项目上下文索引，任何 AI 接手本项目时应优先阅读此文件，而非重新分析整个项目。
> 最后更新：2026-07-09
> 当前阶段：Task 003 Ready（Task 002 已合并到 master）
> 当前 Baseline：master `a805869` · develop `a805869`（Task 002 Release, 2026-07-09）
> 默认开发分支：`develop`

---

## 1. 项目定位

**软件工程学生技术作品集网站**（非个人主页）。

面向**考研复试导师**与**校招面试官**两类受众，通过三个真实项目案例展示软件工程能力、系统设计能力、工程实践能力、AI 辅助开发能力。

**核心叙事：** 每个项目展示「问题 → 方案对比 → 选择理由 → 实现 → 验证 → 复盘」的工程思维链条。

---

## 2. 网站目标

- 让考研复试导师在 3 秒内识别网站定位，3 分钟内找到学术潜力证据
- 让校招面试官在浏览后愿意深聊 30 分钟
- 不堆砌技术名词，每个标签都有代码证据
- 内容真实，不夸大不存在的能力

**与普通简历网站的差异：** 网站是简历的"证据"，不是简历的 HTML 版。

---

## 3. 面向用户

| 用户 | 关注点 | 网站策略 |
|------|--------|----------|
| 考研复试导师 | 学术潜力、工程素养、独立思考 | 重点展示设计决策过程、方案对比、状态机/算法设计、文档规范 |
| 校招面试官 | 落地能力、代码质量、解决问题 | 重点展示项目架构、代码片段、测试体系、性能优化、安全意识 |

---

## 4. 当前技术栈

| 层级 | 选型 |
|------|------|
| 框架 | Vue 3.5+ |
| 语言 | TypeScript 5.5+（strict） |
| 构建 | Vite 6+ |
| 路由 | Vue Router 4.x（createWebHistory） |
| CSS | CSS Custom Properties（设计令牌系统） |
| 图标 | Lucide Vue |
| 字体 | Inter + JetBrains Mono（Google Fonts） |
| Markdown 解析 | markdown-it + gray-matter（仅构建时） |
| 代码高亮 | Shiki（仅构建时） |
| 部署 | Vercel（SPA rewrites） |

**运行时 bundle 仅含：** Vue 3 + Vue Router + Lucide Vue + CSS。

**禁止引入：** Element Plus / Tailwind / Pinia / 后端 / 数据库 / 运行时 Markdown 解析。

---

## 5. 页面结构

| 路径 | 页面 | 内容来源 | 优先级 |
|------|------|---------|--------|
| `/` | 首页 | `content/projects/*.md` (featured) + `content/growth/timeline.md` | P0 |
| `/projects/:slug` | 项目详情 | `content/projects/*.md` + `content/decisions/*.md` | P0 |
| `/skills` | 技术能力 | `content/skills/index.md` | P0 |
| `/interview` | 面试准备 | `content/interview/*.md` | P0 |
| `/ai-practice` | AI 工程实践 | `content/ai-practice/index.md` | P0 |
| `/resume` | 简历 | `public/resume.pdf` | P0 |
| `/about` | 关于我 | `content/personal/about.md` | P0 |
| 404 | 未找到 | — | P0 |

**网站名称（三层信息）：**
- 浏览器 `<title>`：`赖睿轩 | 软件工程学生 · 技术成长档案`
- Header Logo：`lai.dev`
- 首页 H1：`从需求到系统的软件工程实践`

---

## 6. 内容结构

```
src/content/
├── personal/           关于我（about.md）
├── projects/           3 个项目介绍（江南出行 / 两地书 / 题库）
├── decisions/          10 项技术决策（含候选方案对比表）
├── interview/          17 道面试题（4 个分类）
├── skills/             技术栈分类 + 学习路线
├── growth/             技术成长时间线
└── ai-practice/        AI 工程实践流程
```

所有 Markdown 文件统一 Frontmatter（slug / type / title / date / tags / metrics 等）。

构建时通过 Vite 自定义虚拟模块插件转为静态 HTML，运行时零解析开销（Task 003 实现）。

---

## 7. 设计方向

**Developer Academic — 克制、专业、有细节。**

- 不追暗黑炫酷、不走纯学术白底、不追花哨动画
- 配色：Slate 灰色系 + Amber 强调色
- 字体：Inter（正文）+ JetBrains Mono（代码/技术术语）
- 间距：大量留白，呼吸感
- 圆角：微圆角（4/8/12px）
- 阴影：单层投影
- 动画：仅 CSS transition，hover 微交互

详细规范见《架构确认文档-v1.2.md》§2。

---

## 8. 当前开发阶段

### Task 进度

| Task | 名称 | 状态 |
|------|------|------|
| 000 | 项目内容资产整理 | ✅ 已完成（14 个 Markdown 文件） |
| 000.5 | 架构图与展示素材 | ✅ 已完成（7 套 SVG + Mermaid 源码） |
| **001** | **项目初始化与基础设施** | **✅ 已完成（2026-07-08）** |
| **002** | **首页开发** | **✅ 已完成（2026-07-08）** |
| **003** | **构建时内容插件 + 项目详情页** | **⏸️ Task 003 Ready** |
| 004 | 面试准备页 + AI 实践页 | 待开始 |
| 005 | 能力页 + 简历页 + 关于页 | 待开始 |
| 006 | 部署与上线 | 待开始 |
| 007 | Release Audit | 待开始 |

---

## 9. 已完成内容

### 内容资产（Task 000）

14 个 Markdown 文件位于 [src/content/](src/content/)：

| 目录 | 文件数 | 内容 |
|------|--------|------|
| `projects/` | 3 | 江南出行 / 两地书 / 题库 项目介绍 |
| `decisions/` | 3 | 共 10 项技术决策（含候选方案对比表） |
| `interview/` | 4 | 共 17 道面试题（江南出行 5 + 两地书 5 + 题库 5 + 通用 4） |
| `skills/` | 1 | 技术栈分类 + 学习路线 |
| `growth/` | 1 | 技术成长时间线 |
| `ai-practice/` | 1 | AI 工程实践流程 |
| `personal/` | 1 | 关于我 |

### 架构图与素材（Task 000.5）

[docs/assets/architecture/](docs/assets/architecture/) 下 7 套 SVG + Mermaid 源码：

- `overall-tech-stack` — 个人技术栈全景
- `jiangnan-architecture` — 江南出行系统架构
- `exam-system-architecture` — 题库系统架构
- `love-letter-architecture` — 两地书系统架构
- `dispatch-flow` — 并发调度流程
- `sm2-flow` — SM-2 算法流程
- `ai-development-flow` — AI 开发流程

### 规划文档

- [docs/个人能力分析与网站规划报告.md](docs/个人能力分析与网站规划报告.md) — v1.0 规划报告
- [docs/开发设计规范-v1.0.md](docs/开发设计规范-v1.0.md) — v1.1 设计规范（文件名为 v1.0，内容为 v1.1）
- [docs/架构确认文档-v1.2.md](docs/架构确认文档-v1.2.md) — **v1.2 架构锁定版（权威）**
- [docs/task000-completion-report.md](docs/task000-completion-report.md) — Task 000 完成报告
- [docs/assets/screenshot-spec.md](docs/assets/screenshot-spec.md) — 截图规范（待执行）

### 协作规范

- [AI_RULES.md](AI_RULES.md) — 项目统一 AI 协作规范
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — 本文件

---

## 10. 下一阶段任务

### Task 001（✅ 已完成 — 2026-07-08）

**交付内容：**
- 工程配置：package.json / tsconfig / vite.config / index.html / vercel.json / favicon.svg
- 路由：7 条业务路由 + 404（createWebHistory，scrollBehavior 含 hash 锚点）
- 样式系统：tokens.css（v1.2 §2.2 全量设计令牌）+ global.css（reset + 全局 .page 样式 + 工具类）
- 主题切换：useTheme 组合式函数（单例状态，三态 system/light/dark，localStorage 持久化，FOUC 防御）
- 通用布局：DefaultLayout / NavBar / Footer / ThemeToggle / BackToTop
- 8 个占位页面（Home 含 #projects 锚点）
- AI 协作文档：AI_RULES.md + PROJECT_CONTEXT.md + PROJECT_MEMORY.md

**验收结果：**
- ✅ `npm run dev` 正常启动（localhost:5173，8 路由全部 200）
- ✅ `npm run build` 无错误（gzip 总量 ~45KB）
- ✅ `npm run typecheck` 通过（strict 全开）
- ✅ createWebHistory 生效（URL 无 `/#/`）
- ✅ 主题切换三态可用，暗色模式 CSS 变量正确切换
- ✅ 移动端汉堡菜单可用（768px 断点）
- ✅ Release Review 已执行（修复 1 CRITICAL + 5 WARNING）

### Task 002（✅ 已完成 — 2026-07-08）

**目标：** 首页全部区域开发

**范围：**
- Hero 区域（首屏 + CTA）
- 3 张项目卡片（精选项目展示）
- 技术成长时间线
- 联系方式

**交付内容：**
- 4 个首页组件：`src/components/home/HeroSection.vue` / `ProjectCard.vue` / `TimelineSection.vue` / `ContactSection.vue`
- 1 个页面更新：`src/pages/Home.vue`（组合上述组件，替换占位）
- Bento 网格布局，精选项目卡片 `grid-row: span 2` 建立层次
- 非对称 Hero（7fr/5fr 网格）避免通用居中 hero 模板
- Timeline 用 `<ol>` + CSS `::before` 实现（按 v1.2 §2.3）
- Contact 用 `<dl>` 语义化键值对
- 类型化静态数据（Home.vue 持有，Task 003 替换为 virtual:content）

**验收结果：**
- ✅ `npm run typecheck` 通过（strict 全开）
- ✅ `npm run build` 成功（gzip Home 4.46 KB，总 ~48KB）
- ✅ Self Review 修复 1 项响应式问题（ContactSection computed）
- ✅ 无 TODO / 无 FIXME / 无 console.log
- ✅ 未新增依赖
- ✅ 未修改架构

### Task 003（⏸️ Task 003 Ready）

**目标：** 构建时内容插件 + 项目详情页

**范围：**
- Vite 构建时 Markdown 转换插件（virtual:content 虚拟模块）
- 项目详情页模板（`ProjectDetail.vue` 替换占位）
- 3 个项目 Markdown 渲染
- Shiki 代码高亮（仅构建时）
- markdown-it + gray-matter（仅构建时）

**依赖确认：** Task 003 将引入 markdown-it / gray-matter / Shiki（仅构建时依赖，不进入运行时 bundle）。

---

## 11. 当前项目状态

### 环境就绪

- ✅ Node v22.19.0（满足 ≥18 要求）
- ✅ npm v11.18.0（满足 ≥9 要求）
- ✅ Git 已配置
- ✅ `.gitignore` 已正确配置（node_modules / dist / .env / .ai-backups）

### 工程骨架（Task 001 + Task 002 已完成）

- ✅ `package.json` — 3 运行时依赖 + 5 开发依赖（未新增）
- ✅ `src/` 完整代码骨架（25 个文件，Task 002 新增 4 个组件）
- ✅ `public/` 目录 + favicon.svg
- ✅ 路由、布局、主题系统、占位页面全部就绪
- ✅ 首页 4 区域组件已实现（Hero / ProjectCard / Timeline / Contact）
- ✅ Release Review 通过（Task 001：Self Review + Release Audit；Task 002：Self Review + Release Review）

**当前依赖清单：**

| 类型 | 包名 | 版本 |
|------|------|------|
| 运行时 | vue | ^3.5.13 |
| 运行时 | vue-router | ^4.5.0 |
| 运行时 | lucide-vue-next | ^0.460.0 |
| 开发时 | @types/node | ^22.10.0 |
| 开发时 | @vitejs/plugin-vue | ^5.2.1 |
| 开发时 | typescript | ~5.6.3 |
| 开发时 | vite | ^6.0.7 |
| 开发时 | vue-tsc | ^2.1.10 |

**禁止引入：** Element Plus / Tailwind / Pinia / 后端 / 数据库 / 运行时 Markdown 解析 / 未经确认的新依赖。

### 待补资产（不阻塞 Task 003）

- ❌ `public/resume.pdf` 简历 PDF 终稿（Task 005 需要）
- ❌ `docs/assets/screenshots/` 项目运行截图（Task 003 需要）
- ❌ `src/content/personal/about.md` 中 Email 待补充

### 风险提示

1. **文档版本号不一致**：`开发设计规范-v1.0.md` 文件名为 v1.0，内容首行标注 v1.1。**以《架构确认文档-v1.2.md》为权威**。
2. **虚拟模块类型声明位置**：v1.1 规范说 `src/env.d.ts`，v1.2 说 `src/utils/content.ts`。Task 001 先用 `src/env.d.ts` 统一管理 Vue SFC 类型，Task 003 实现插件时再决定是否拆分。
3. **Shiki 主题选择**：v1.2 §2.7 规定代码块始终深色不随主题切换，需在 Task 003 确定主题。
4. **Google Fonts CDN 国内访问**：Inter + JetBrains Mono 通过 Google Fonts CDN 加载，国内首次访问可能较慢。已用 `preconnect` + `display=swap` 优化。Task 007 评估是否自托管字体子集。
5. **未配置 ESLint / Prettier**：v1.2 未要求。当前依赖 TypeScript strict 模式保证代码质量。Task 007 可选添加。

---

## 12. 权威文档优先级

如遇冲突，按以下优先级判断：

1. 《架构确认文档-v1.2.md》（架构锁定版，最高权威）
2. [AI_RULES.md](AI_RULES.md)
3. 《开发设计规范-v1.0.md》（内容实际为 v1.1，参考用）
4. 《个人能力分析与网站规划报告.md》（v1.0，背景资料）

---

> 本文件随项目演进持续更新。每完成一个 Task 更新当前阶段与已完成内容章节。
