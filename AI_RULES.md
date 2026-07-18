# AI 协作规范（AI_RULES.md）

> **本文件仅记录本项目特定的 AI 协作约束。**
> 通用编码规则见 [.trae/rules/](.trae/rules/)（工作区规则，自动加载）：
> - [00-core.md](.trae/rules/00-core.md) — 核心编码规则（思考 / 简洁 / 外科手术 / 目标驱动）
> - [01-ai-collaboration.md](.trae/rules/01-ai-collaboration.md) — AI 代理协作（确定性逻辑 / Token 预算 / 冲突暴露）
> - [02-engineering.md](.trae/rules/02-engineering.md) — 工程实践（先读再写 / 测试 / 检查点 / 惯例 / 失败显性化）
> - [coding-style.md](.trae/rules/coding-style.md) — TypeScript 规范
> - [vue-coding-style.md](.trae/rules/vue-coding-style.md) — Vue 3 规范
> - [design-quality.md](.trae/rules/design-quality.md) — Web 设计质量
> - [performance.md](.trae/rules/performance.md) — Web 性能规范
> - [git-safety.md](.trae/rules/git-safety.md) — Git 安全操作
> - [workflow.md](.trae/rules/workflow.md) — Git 工作流
> - [privacy.md](.trae/rules/privacy.md) — 隐私与密钥安全
> - [environment.md](.trae/rules/environment.md) — 环境维护
>
> **本文件不重复 .trae/rules/ 的内容。** 如本文件与 .trae/rules/ 冲突，以 .trae/rules/ 为准。
>
> 最后更新：2026-07-18
> 当前版本：v3.5.0（已发布，维护模式）

---

## 1. 项目目标

构建一个面向**考研复试导师**与**校招面试官**的软件工程学生技术作品集网站。

**核心叙事**：每个项目展示「问题 → 方案对比 → 选择理由 → 实现 → 验证 → 复盘」的工程思维链条，而非"我做了什么"。

**三个展示项目**：
1. 江南出行智慧服务平台（Spring Boot 全栈，核心项目）
2. 两地书 Love（Taro + 微信云开发 + AI 工程化）
3. 医学考试刷题系统（Vanilla JS 单文件 + SM-2 算法）

**网站名称（三层信息）**：
- 浏览器 `<title>`：`赖睿轩 | 软件工程学生 · 技术成长档案`
- Header Logo：`lai.dev`
- 首页 H1：`从需求到系统的软件工程实践`

---

## 2. 网站定位

**不是个人主页，是技术成长档案。**

| 维度 | 普通简历网站 | 本网站 |
|---|---|---|
| 内容深度 | 一句话介绍项目 | 每个项目含：背景、架构、核心设计、代码片段、测试结果、复盘 |
| 技术展示 | "熟悉 Spring Boot" | 展示分布式锁实现、状态机转换图、压力测试数据 |
| 叙事方式 | "我做了什么" | "遇到什么问题→为什么这样解决→怎么验证→学到了什么" |
| 目标 | "给个面试机会" | "面试时有东西可以深聊 30 分钟" |

---

## 3. 技术栈

| 层级 | 选型 | 版本 |
|---|---|---|
| 框架 | Vue 3（`<script setup lang="ts">` + Composition API） | 3.5+ |
| 语言 | TypeScript（strict: true） | 5.6.3 |
| 构建 | Vite（含构建时内容插件） | 6.4.3 |
| 路由 | Vue Router（createWebHistory） | 4.5+ |
| CSS | CSS Custom Properties（设计令牌系统） | — |
| 图标 | Lucide Vue Next | 0.460+ |
| 字体 | Inter + JetBrains Mono（Google Fonts） | — |
| Markdown 解析 | markdown-it（仅构建时） | 14.3.0 |
| Frontmatter | gray-matter（仅构建时） | 4.0.3 |
| 代码高亮 | Shiki（仅构建时，深色主题不随主题切换） | 4.3.1 |
| E2E 测试 | Playwright | 1.48+ |
| 部署 | Vercel（SPA rewrites，master 自动部署） | — |

**运行时 bundle**：仅含 Vue 3 + Vue Router + Lucide Vue + CSS（gzip 主包约 42.26 KB）。

---

## 4. 技术边界与禁止事项

### 4.1 禁止引入

- ❌ Element Plus / Naive UI / 任何第三方 UI 库
- ❌ Tailwind CSS / UnoCSS / 任何 CSS 框架
- ❌ Pinia / Vuex / 任何状态管理库（路由 + props 足够）
- ❌ Nuxt / Next.js / 任何 SSR/SSG 框架
- ❌ GSAP / 任何动画库（CSS transition 够用）
- ❌ 后端服务 / 数据库 / 服务器
- ❌ 运行时 Markdown 解析（必须构建时处理）
- ❌ 未经确认的新依赖

### 4.2 禁止行为

- ❌ `as any` 绕过类型检查
- ❌ `@ts-ignore` 忽略错误
- ❌ 硬编码颜色值（必须用设计令牌）
- ❌ 修改 PATH / NODE_PATH / 环境变量
- ❌ 自动升级 Node / npm / 全局工具
- ❌ 修改 main / master / production 分支历史
- ❌ `git push --force` / `git reset --hard` / `git clean -fdx`（除非用户明确确认）
- ❌ 推送隐私内容（API Key / Token / 学号 / 手机号 / 实习材料）

> **注**：Git 操作的详细规范见 [.trae/rules/git-safety.md](.trae/rules/git-safety.md) 与 [.trae/rules/workflow.md](.trae/rules/workflow.md)。

### 4.3 替代原则

| 需要的能力 | 不用 | 用 |
|---|---|---|
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

**亮色模式（默认）**：
- 主色：Slate 系（`#f8f9fa` bg / `#ffffff` surface / `#e2e8f0` border）
- 文字：`#1a202c` primary / `#4a5568` secondary / `#a0aec0` muted
- 强调：Amber（`#d97706` accent / `#fef3c7` light / `#b45309` strong / `#ffffff` on-accent）

**暗色模式**：
- bg `#0f172a` / surface `#1e293b` / border `#334155`
- text `#f1f5f9` / `#94a3b8` / `#64748b`
- accent `#f59e0b` / on-accent `#ffffff`

**色彩使用规则**：
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

> **注**：详细设计质量标准见 [.trae/rules/design-quality.md](.trae/rules/design-quality.md)。

---

## 6. v3.5.0 维护模式约束

项目当前处于 **v3.5.0 已发布，维护模式**：

- ✅ 允许：修复 P0/P1 缺陷、安全问题
- ❌ 禁止：新增功能 / 新增组件 / 新增依赖 / 新增 Design Token / 新增颜色 / 新增字体
- ❌ 禁止：在 v3.5.0 之上增量堆叠未规划功能
- ⚠️ 如需新功能或大重构，需用户重新批准新 Roadmap

**v3.5.1 Maintenance Backlog**：3 项 P2（Footer CLS / Amber 对比度 / FCP 线上复测），详见 [ROADMAP.md §3](ROADMAP.md) + [TECHNICAL_DEBT.md §1](TECHNICAL_DEBT.md)。

**Signature 配额状态**（v3.5 已耗尽）：
- S3 Amber Accent Line：3/3 完成（DecisionSection / About 引言 / Resume callout）
- S4 Grid Pattern Underlay：2/2 完成（Hero / Footer）
- 后续不得新增第 4 处 Amber Accent Line 或第 3 处 Grid Pattern

---

## 7. 权威文档优先级

如遇冲突，按以下优先级判断：

1. [docs/架构确认文档-v1.2.md](docs/架构确认文档-v1.2.md)（架构锁定版，最高权威）
2. [Portfolio_v3.5_CREATIVE_DIRECTION.md](Portfolio_v3.5_CREATIVE_DIRECTION.md) / IMPLEMENTATION_PLAN / READINESS（v3.5 LOCKED）
3. [HANDOFF.md](HANDOFF.md)（交接文档）
4. 本文件 AI_RULES.md（项目特定约束）
5. [ARCHITECTURE.md](ARCHITECTURE.md) + [DEVELOPMENT_HISTORY.md](DEVELOPMENT_HISTORY.md)（历史决策参考）

> **注**：通用编码规则的优先级见 [.trae/rules/00-core.md](.trae/rules/00-core.md)。

---

## 8. 冲突处理

当发现以下冲突时，**暂停并报告，不自行融合**（详见 [.trae/rules/02-engineering.md §18](.trae/rules/02-engineering.md)）：

- AI_RULES.md 与架构确认文档冲突
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
