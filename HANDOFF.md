# 项目交接文档（HANDOFF.md）

> 本文件是 AI 接手入口。任何 AI（Trae / GLM / Claude Code / Codex / ChatGPT 等）接手本项目时，**优先阅读本文件**，无需重新分析整个项目。
> 最后更新：2026-07-08

---

## 1. 项目定位

**面向考研复试导师与校招面试官的软件工程学生技术作品集网站** — 通过三个真实项目案例展示「问题 → 方案对比 → 选择理由 → 实现 → 验证 → 复盘」的工程思维链条。

---

## 2. 当前状态

| 项 | 值 |
|----|-----|
| Task 001 | ✅ 已完成 |
| Release Review | ✅ 已通过（Self Review 修复 1 CRITICAL + 5 WARNING） |
| Git Baseline | ✅ 已建立 |
| **Git Commit** | `483a9e1` |
| **当前分支** | `master` |
| **工作区状态** | clean |
| 验证 | ✅ build 成功（gzip ~45KB）/ typecheck 通过 / 无 TODO / 无 FIXME / 无 console.log |

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

**运行时 bundle 仅含：** Vue 3 + Vue Router + Lucide Vue + CSS（gzip ~45KB）。

**运行时依赖（3 项）：** vue@^3.5.13 / vue-router@^4.5.0 / lucide-vue-next@^0.460.0
**开发时依赖（5 项）：** @types/node / @vitejs/plugin-vue / typescript / vite / vue-tsc

**Task 003 将引入（仅构建时）：** markdown-it / gray-matter / Shiki — **Task 002 不引入。**

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
    ├── pages/                     # 8 个页面（见 §5）
    ├── styles/
    │   ├── tokens.css             # v1.2 §2.2 全量设计令牌
    │   └── global.css             # reset + .page 全局样式 + 工具类
    ├── content/                   # 14 个 Markdown 内容文件（Task 003 渲染）
    │   ├── personal/  projects/  decisions/
    │   ├── interview/  skills/  growth/  ai-practice/
    ├── assets/                    # 空（Task 004 SVG 图表）
    └── utils/                     # 空（Task 003 content 工具）
```

---

## 5. 当前页面

| 路径 | 文件 | 状态 |
|------|------|------|
| `/` | `src/pages/Home.vue` | 占位（Task 002 替换） |
| `/projects/:slug` | `src/pages/ProjectDetail.vue` | 占位（Task 003 替换） |
| `/skills` | `src/pages/Skills.vue` | 占位（Task 005 替换） |
| `/interview` | `src/pages/Interview.vue` | 占位（Task 004 替换） |
| `/ai-practice` | `src/pages/AiPractice.vue` | 占位（Task 004 替换） |
| `/resume` | `src/pages/Resume.vue` | 占位（Task 005 替换） |
| `/about` | `src/pages/About.vue` | 占位（Task 005 替换） |
| 404 | `src/pages/NotFound.vue` | ✅ 最终版 |

---

## 6. 下一阶段 — Task 002

### 目标

首页全部区域开发。

### 需要开发的组件与文件

| 类型 | 文件 | 说明 |
|------|------|------|
| 组件 | `src/components/home/HeroSection.vue` | 首屏 + CTA |
| 组件 | `src/components/home/ProjectCard.vue` | 精选项目卡片（3 张） |
| 组件 | `src/components/home/TimelineSection.vue` | 技术成长时间线 |
| 组件 | `src/components/home/ContactSection.vue` | 联系方式 |
| 页面 | `src/pages/Home.vue` | 组合上述组件（替换占位页） |

### 可直接使用的内容

- `src/content/projects/*.md`（3 个项目的 frontmatter：title / subtitle / tags / metrics / github）
- `src/content/growth/timeline.md`（3 阶段 + 下一步）
- `src/content/personal/about.md`（GitHub 链接；Email 待补充，先用 GitHub 占位）
- `docs/assets/architecture/*.svg`（如需在卡片中展示架构缩略图）

### Task 002 边界

✅ **允许：** Hero / ProjectCard / Timeline / Contact / Home.vue 开发
❌ **禁止：** 提前实现 Task 003 内容（Markdown 解析插件、virtual:content、项目详情页渲染、Shiki 代码高亮）

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
- ❌ **未经确认的新依赖**（Task 002 不需要新增任何依赖）

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
3. **直接从 Task 002 开始** — 当前 Baseline `483a9e1` 已稳定

### 接手后第一步

```bash
# 1. 确认环境
node --version   # 需 ≥18（当前 v22.19.0）
npm --version    # 需 ≥9（当前 v11.18.0）

# 2. 确认 Baseline
git log -1 --oneline   # 应显示 483a9e1
git status             # 应为 clean

# 3. 验证可运行
npm install            # 恢复依赖
npm run typecheck      # 应通过
npm run build          # 应成功
npm run dev            # 启动 localhost:5173
```

### 关键约束

- **每个 Task 完成后暂停**，输出报告，等待用户确认，不得自动进入下一 Task
- **不得提前开发后续 Task 内容**（Task 002 不实现 Markdown 解析）
- **重大修改需先报告并等待确认**（技术栈 / 页面结构 / 目录结构 / 设计原则 / 新增依赖 / .gitignore / Git 工作流）
- **冲突必须暴露，不自行折中** — 发现文档冲突或代码矛盾时，暂停并报告

### 已知问题（不阻塞 Task 002）

详见 [AI_RULES.md §13](AI_RULES.md) 与 [PROJECT_MEMORY.md](PROJECT_MEMORY.md)「遗留问题」章节。核心 6 项：

1. 文档版本号不一致（v1.0 文件名 / v1.1 内容）— 以 v1.2 为准
2. tokens.css 预定义未使用令牌 — Task 003 使用
3. 空目录未进 Git — Task 003/004 自然解决
4. Google Fonts CDN 国内访问 — Task 007 评估
5. 未配置 ESLint / Prettier — Task 007 可选
6. about.md 中 Email 待补充 — Task 005 前补充

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
