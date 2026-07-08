# AI 协作规范（AI_RULES.md）

> 本文件是本项目所有 AI（Trae / Claude Code / Codex / ChatGPT 等）的统一协作规范。
> 所有开发默认遵守本文件。如本文件与《架构确认文档-v1.2.md》冲突，以 v1.2 为准并立即报告冲突。
> 最后更新：2026-07-09
> 当前 Baseline：master `2c57d64` · develop `6013367`（2026-07-09）

---

## 1. 项目目标

构建一个面向**考研复试导师**与**校招面试官**的软件工程学生技术作品集网站。

**核心叙事：** 每个项目展示「问题 → 方案对比 → 选择理由 → 实现 → 验证 → 复盘」的工程思维链条，而非"我做了什么"。

**三个展示项目：**
1. 江南出行智慧服务平台（Spring Boot 全栈，核心项目）
2. 两地书 Love（Taro + 微信云开发 + AI 工程化）
3. 医学考试刷题系统（Vanilla JS 单文件 + SM-2 算法）

---

## 2. 网站定位

**不是个人主页，是技术成长档案。**

| 维度 | 普通简历网站 | 本网站 |
|------|------------|--------|
| 内容深度 | 一句话介绍项目 | 每个项目含：背景、架构、核心设计、代码片段、测试结果、复盘 |
| 技术展示 | "熟悉 Spring Boot" | 展示分布式锁实现、状态机转换图、压力测试数据 |
| 叙事方式 | "我做了什么" | "遇到什么问题→为什么这样解决→怎么验证→学到了什么" |
| 目标 | "给个面试机会" | "面试时有东西可以深聊 30 分钟" |

**网站名称（三层信息）：**
- 浏览器 `<title>`：`赖睿轩 | 软件工程学生 · 技术成长档案`
- Header Logo：`lai.dev`
- 首页 H1：`从需求到系统的软件工程实践`

---

## 3. 技术栈

| 层级 | 选型 | 版本 |
|------|------|------|
| 框架 | Vue 3 | 3.5+ |
| 语言 | TypeScript（strict） | 5.5+ |
| 构建 | Vite | 6+ |
| 路由 | Vue Router（web history） | 4.x |
| CSS | CSS Custom Properties | — |
| 图标 | Lucide Vue | — |
| 字体 | Inter + JetBrains Mono（Google Fonts） | — |
| Markdown 解析 | markdown-it（仅构建时） | 14+ |
| Frontmatter | gray-matter（仅构建时） | — |
| 代码高亮 | Shiki（仅构建时） | 2+ |
| 部署 | Vercel（SPA rewrites） | — |

**运行时 bundle 仅含：Vue 3 + Vue Router + Lucide Vue + CSS。**

---

## 4. 技术边界与禁止事项

### 禁止引入

- ❌ Element Plus / Naive UI / 任何第三方 UI 库
- ❌ Tailwind CSS / UnoCSS / 任何 CSS 框架
- ❌ Pinia / Vuex / 任何状态管理库（路由 + props 足够）
- ❌ Nuxt / Next.js / 任何 SSR/SSG 框架
- ❌ GSAP / 任何动画库（CSS transition 够用）
- ❌ 后端服务 / 数据库 / 服务器
- ❌ 运行时 Markdown 解析（必须构建时处理）
- ❌ 未经确认的新依赖

### 禁止行为

- ❌ `as any` 绕过类型检查
- ❌ `@ts-ignore` 忽略错误
- ❌ 硬编码颜色值（必须用设计令牌）
- ❌ 修改 PATH / NODE_PATH / 环境变量
- ❌ 自动升级 Node / npm / 全局工具
- ❌ 修改 main / master / production 分支历史
- ❌ `git push --force` / `git reset --hard` / `git clean -fdx`（除非用户明确确认）
- ❌ 推送隐私内容（API Key / Token / 学号 / 手机号 / 实习材料）

### 替代原则

| 需要的能力 | 不用 | 用 |
|-----------|------|---|
| 折叠面板 | el-collapse | `<details>` + `<summary>`（原生 HTML） |
| 时间线 | el-timeline | `<ol>` + CSS `::before` |
| 卡片 | el-card | `<article>` + CSS |
| 标签 | el-tag | `<span>` + CSS |
| 按钮 | el-button | `<button>` + 设计令牌 |
| 图标 | el-icon | Lucide Vue |
| 暗色模式 | — | CSS 自定义属性 + `data-theme` |

---

## 5. 页面设计原则 — Developer Academic

### 5.1 风格定位

**克制、专业、有细节。** 不追暗黑炫酷，不走纯学术白底，不追花哨动画。

### 5.2 核心原则

1. **内容优先**：排版服务于阅读，不抢内容
2. **克制配色**：大面积中性色 + 小面积强调色
3. **呼吸感**：大量留白，段落间距充裕
4. **代码感点缀**：等宽字体标注技术术语
5. **微交互提质感**：hover 状态、平滑过渡，但不喧宾夺主

### 5.3 配色方案

**亮色模式（默认）：**
- 主色：Slate 系（`#f8f9fa` bg / `#ffffff` surface / `#e2e8f0` border）
- 文字：`#1a202c` primary / `#4a5568` secondary / `#a0aec0` muted
- 强调：Amber（`#d97706` accent / `#fef3c7` light / `#b45309` strong / `#ffffff` on-accent）

**暗色模式：**
- bg `#0f172a` / surface `#1e293b` / border `#334155`
- text `#f1f5f9` / `#94a3b8` / `#64748b`
- accent `#f59e0b` / on-accent `#ffffff`

**色彩使用规则：**
- 大面积只用 `bg` 和 `surface`
- 强调色只用于：链接、按钮、技术标签、关键数字
- 一页最多 3 处强调色
- 代码块独立配色（不随主题切换，始终深色）

### 5.4 字体

- 正文：`'Inter', 'Noto Sans SC', -apple-system, sans-serif`
- 等宽：`'JetBrains Mono', 'Fira Code', 'Consolas', monospace`
- 加载策略：Google Fonts + `preconnect` + `font-display: swap`，只加载必要字重

### 5.5 间距与圆角

- 间距阶梯：4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80px
- 圆角：4px（标签）/ 8px（卡片按钮）/ 12px（大卡片）
- 阴影：单层投影，不累加

### 5.6 反模板政策

禁止：
- 默认卡片网格（无层次的均匀间距）
- 通用 hero section（居中标题 + 渐变 blob + 通用 CTA）
- 库默认样式冒充完成设计
- 每处统一圆角、间距、阴影
- 灰色 + 装饰色安全配色

---

## 6. 修改原则

### 6.1 外科手术式修改

- 只触碰必须改的地方
- 不改无关代码、注释或格式
- 不重构没坏的东西
- 匹配现有代码风格

### 6.2 简洁优先（YAGNI）

- 只写能解决问题的最少代码
- 不写投机性功能
- 不为单次使用做抽象
- 标准库 / 原生平台特性优先

### 6.3 失败必须显性化

- 错误必须抛出、返回或上报
- 不能 100% 确认成功时必须明确说明
- 批处理跳过时展示跳过数量和原因

### 6.4 重大修改需确认

以下修改必须先报告、给出方案、等待确认：

- 修改技术栈
- 修改页面结构
- 修改目录结构
- 修改设计原则
- 新增第三方依赖
- 修改 .gitignore 排除规则
- 修改 Git 工作流

---

## 7. 开发流程（Task 000 ~ Task 007）

| Task | 名称 | 状态 |
|------|------|------|
| 000 | 项目内容资产整理 | ✅ 已完成 |
| 000.5 | 架构图、流程图、展示素材 | ✅ 已完成 |
| **001** | **项目初始化与基础设施** | **✅ 已完成（2026-07-08）** |
| **002** | **首页开发（Hero + 项目卡片 + 时间线 + 联系方式）** | **✅ 已完成（2026-07-08）** |
| **003** | **构建时内容插件 + 项目详情页 + Markdown 内容** | **⏸️ 待开始（下一阶段）** |
| 004 | 面试准备页 + AI 实践页 | 待开始 |
| 005 | 能力页 + 简历页 + 关于页 | 待开始 |
| 006 | 部署与上线（Vercel） | 待开始 |
| 007 | Release Audit | 待开始 |

### Task 交付要求

- 每个 Task 完成后输出：修改文件列表、目录结构、已完成功能、验证结果、Code Review、风险说明、下一阶段建议
- 每个 Task 完成后暂停，等待下一条指令
- **不得提前开发后续 Task 的内容**

### 当前已实现页面（Task 001 + Task 002）

| 路径 | 文件 | 状态 |
|------|------|------|
| `/` | [src/pages/Home.vue](src/pages/Home.vue) | ✅ 已实现（Task 002） |
| `/projects/:slug` | [src/pages/ProjectDetail.vue](src/pages/ProjectDetail.vue) | 占位（Task 003 替换） |
| `/skills` | [src/pages/Skills.vue](src/pages/Skills.vue) | 占位（Task 005 替换） |
| `/interview` | [src/pages/Interview.vue](src/pages/Interview.vue) | 占位（Task 004 替换） |
| `/ai-practice` | [src/pages/AiPractice.vue](src/pages/AiPractice.vue) | 占位（Task 004 替换） |
| `/resume` | [src/pages/Resume.vue](src/pages/Resume.vue) | 占位（Task 005 替换） |
| `/about` | [src/pages/About.vue](src/pages/About.vue) | 占位（Task 005 替换） |
| 404 | [src/pages/NotFound.vue](src/pages/NotFound.vue) | 最终版 |

---

## 8. 各 Task 范围边界

### Task 001
- Vite + Vue 3 + TS 工程骨架
- 路由（7 条 + 404，空白占位页）
- 样式系统（设计令牌 + 全局样式）
- 主题切换（亮/暗/系统三态）
- 通用布局（NavBar / Footer / ThemeToggle / BackToTop）
- Vercel SPA rewrites 配置

**不实现：** Markdown 解析、项目详情渲染、面试题、AI Practice 内容、技术图表、搜索、动画优化、内容填充。

### Task 002（已完成）
首页全部区域：Hero + 3 张项目卡片 + 技术成长时间线 + 联系方式。

### Task 003（当前）
Vite 构建时 Markdown 转换插件（virtual:content 虚拟模块）+ 项目详情页模板 + 3 个项目 Markdown 渲染。

### Task 004
`/interview` + `/ai-practice` 两个内容页。

### Task 005
`/skills` + `/resume` + `/about` 三个剩余页面。

### Task 006
Vercel 部署、SPA rewrites 验证、HTTPS、所有路由刷新不 404。

### Task 007 — Release Audit
发布前最终质量关卡，检查清单见《架构确认文档-v1.2.md》§6.2，涵盖：
- 内容审查（无夸大、无虚构、无隐私、无密钥）
- 技术审查（build / typecheck / Lighthouse > 90 / 路由 / 死链 / 响应式 / 暗色模式）
- 安全审查（.gitignore / CSP / font-display）
- 展示质量审查（架构图 / 代码高亮 / 折叠交互 / 分享预览）
- 交叉验证（外部用户浏览、导师视角、面试官视角）

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

## 10. 隐私与密钥安全（最高优先级）

**禁止推送到远程的内容：**
- 实习日志、实习材料
- PII（姓名外的学号、手机号、身份证号、证件照）
- API Key / JWT Secret / 数据库密码 / Token
- 第三方凭据（高德 Key、DeepSeek Key、AppID）
- 任何形式的密钥、密码、敏感配置

**凭据管理：**
- 通过环境变量注入
- 或存放 `.gitignore` 排除的本地配置
- 代码中用 `${ENV_VAR:}` 占位符

---

## 11. 冲突处理原则

当发现以下冲突时，**暂停并报告，不自行融合**：

- AI_RULES.md 与《架构确认文档-v1.2.md》冲突
- 不同文档版本冲突（如 v1.0 / v1.1 / v1.2 内容不一致）
- 现有代码与新规则冲突
- 两个 AI Agent 同时修改同一文件

报告格式：
```
冲突来源 A：xxx
冲突来源 B：xxx
具体冲突：xxx
建议方案：（可选）
等待决策。
```

---

## 12. 权威文档优先级

如遇冲突，按以下优先级判断：

1. 《架构确认文档-v1.2.md》（架构锁定版，最高权威）
2. 本文件 AI_RULES.md
3. 《开发设计规范-v1.0.md》（内容实际为 v1.1，作为参考）
4. 《个人能力分析与网站规划报告.md》（v1.0，背景资料）

---

## 13. 已知问题（Task 001 + Task 002 遗留）

以下问题不阻塞 Task 003，但需在后续 Task 关注：

| # | 问题 | 风险等级 | 处置 Task |
|---|------|---------|----------|
| 1 | `docs/开发设计规范-v1.0.md` 文件名 v1.0 / 内容 v1.1，版本号不一致 | 中 | 等待用户决策是否重命名 |
| 2 | `tokens.css` 预定义未使用令牌（`--color-java` 等、`--code-*` 高亮令牌） | 低 | Task 003 代码高亮实现时使用 |
| 3 | `src/assets/` 与 `src/utils/` 为空目录，Git 不追踪 | 低 | Task 003/004 添加首文件时自然解决 |
| 4 | Google Fonts CDN 国内访问较慢 | 中 | Task 007 评估是否自托管字体子集 |
| 5 | 未配置 ESLint / Prettier | 低 | Task 007 可选添加 |
| 6 | `src/content/personal/about.md` 中 Email 待补充 | 低 | Task 005 前补充 |
| 7 | Interface 类型跨组件重复（`ProjectSummary` / `TimelineStage` / `ContactInfo` 在 Home.vue 与子组件各定义一次，共约 34 行） | 中 | Task 003 统一（virtual:content 类型集中声明） |
| 8 | CSS `__eyebrow` 样式块跨 3 组件重复（TimelineSection / ContactSection / Home，共约 18 行） | 低 | 后续统一提取为 `.section__eyebrow` 全局类 |

**权威来源：** 详细处置方案见 [PROJECT_MEMORY.md](PROJECT_MEMORY.md)「遗留问题」与「Duplicate Review 结果」章节。

---

> 本文件随项目演进持续更新。任何修改需同步更新版本号与日期。
