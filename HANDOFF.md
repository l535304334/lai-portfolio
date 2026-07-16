# 项目交接文档（HANDOFF.md）

> **本文件是整个项目的最终交接文档。**
>
> 任何 AI（Trae / GLM / Claude Code / Codex / ChatGPT 等）接手本项目时，**仅阅读本文件即可获得全部上下文**，无需重新分析整个项目，无需翻阅历史对话。
>
> 以后所有开发均以本文件作为唯一项目上下文。
>
> 最后更新：2026-07-17
> 当前阶段：**RC4.1 Completed（本地未 commit），等待用户批准进入 RC4.2**
> **开发计划**：《Portfolio v3 Roadmap》已由用户批准为 RC4~RC8 唯一开发计划（详见 §七）

---

## 0. PROJECT STATUS SNAPSHOT（快速恢复上下文）

> 新会话开始时，**只需阅读本节即可快速恢复上下文**。详细内容见后续章节。

| 项 | 值 |
|---|---|
| **项目名称** | 软件工程学生技术作品集（Portfolio v2.0） |
| **当前阶段** | **RC4.1 Completed**（本地未 commit，等待批准进入 RC4.2） |
| **下一阶段** | RC4.2 — Skills 页 Final Review（Code/Design/Performance 局部审计 + 文档同步） |
| **项目版本** | `2.0.0`（[package.json](package.json)）— RC4~RC7 不发新版本，RC8 统一发 v3.0.0 |
| **最新 Commit** | `bfb070e` — `docs: append RC3 Release Summary (Section 19)`（origin/master HEAD，已推送） |
| **最新 Tag** | `v2.0.0`（RC2 Release，commit `20598ae`，已推送 origin） |
| **本地 vs 远程** | **同步**（origin/master = `bfb070e`）；RC4.1 改动尚未 commit |
| **工作区状态** | dirty（7 个文件改动：1 新建 + 6 修改，等待 commit） |
| **当前分支** | `master`（受保护，禁止直接 push 历史） |
| **组件配额** | 已用 **1**（ArchitectureDiagram.vue）/ 剩余 **1** / 上限 **2**（RC4.1 未消耗） |
| **虚拟模块数** | 8 个（已定型，不再新增） |
| **测试基线** | Playwright **65/65** 通过（[release-gate-task-005.mjs](release-gate-task-005.mjs)）— RC4.1 新增 10 项断言 |
| **构建基线** | 1664 模块，约 2.4s（gzip 主包 41.89 KB）— Skills chunk 2.67 KB / gzip 1.53 KB |
| **线上地址** | https://lai-portfolio-xi.vercel.app（Vercel 自动部署，origin/master 触发） |
| **技术栈** | Vue 3.5+ / TypeScript 5.6.3 strict / Vite 6.4.3 / Vue Router 4.5+ |
| **风格定位** | Developer Academic（Slate + Amber，Inter + JetBrains Mono） |
| **核心约束** | Markdown SSOT / 不新增依赖 / 不新增组件（除非消耗配额）/ 每子阶段三项验证 |
| **RC3 Baseline** | ✅ **冻结**（不再修改 RC3 内容，除非后续发现 P0/P1 缺陷） |
| **RC4.1 状态** | ✅ **完成**（本地验证通过，待 commit + 推送 origin/master） |
| **下一步动作** | 等待用户批准进入 RC4.2（Skills 页 Final Review） |
| **完整 Roadmap** | RC4（全局基础+Skills）→ RC5（Resume）→ RC6（Interview+AiPractice）→ RC7（IA+Nav）→ RC8（Final v3.0.0）（详见 §七） |
| **冻结清单** | 详见 §五（FROZEN INVENTORY） |
| **RC3.3 Final Review** | 详见 [RELEASE_REVIEW_REPORT.md §18](RELEASE_REVIEW_REPORT.md)（Code/Design/Performance/IA Review + P1 修复 + 5 项 P2 建议） |
| **RC4.1 Report** | 详见 [RELEASE_REVIEW_REPORT.md §20](RELEASE_REVIEW_REPORT.md)（Skills 页数据层 + 视觉重构 + 全局工具类） |

---

## 一、项目概述

### 1.1 项目目标

构建一个面向考研复试导师与校招面试官的**软件工程学生技术作品集网站**，通过三个真实项目案例展示「问题 → 方案对比 → 选择理由 → 实现 → 验证 → 复盘」的工程思维链条。

网站是简历的"证据"，不是简历的 HTML 版。

### 1.2 用户定位

| 用户 | 关注点 | 网站策略 |
|------|--------|----------|
| 考研复试导师 | 学术潜力、工程素养、独立思考 | 重点展示设计决策过程、方案对比、状态机/算法设计、文档规范 |
| 校招面试官 | 落地能力、代码质量、解决问题 | 重点展示项目架构、代码片段、测试体系、性能优化、安全意识 |

### 1.3 网站定位

**Developer Academic 风格** — 克制、专业、有细节。

- 不追暗黑炫酷、不走纯学术白底、不追花哨动画
- 配色：Slate 灰色系 + Amber 强调色
- 字体：Inter（正文）+ JetBrains Mono（代码/技术术语）
- 个人品牌来自工程质量、内容质量、项目深度，而非视觉装饰
- Hero 信息层级：Who / What / Why / Next / Engineering Metrics（无营销文案）

### 1.4 当前版本

- **项目版本**：`2.0.0`（见 [package.json](package.json)）
- **当前 Tag**：`v2.0.0`（RC2 Release，已推送 origin）
- **下一版本**：`v3.0.0`（RC8 Final Release 时统一升级，RC4~RC7 不发新版本）

### 1.5 技术栈

| 层级 | 选型 | 版本 |
|------|------|------|
| 框架 | Vue 3 (`<script setup lang="ts">` + Composition API) | 3.5+ |
| 语言 | TypeScript（strict: true） | 5.6.3 |
| 构建 | Vite（含构建时内容插件） | 6.4.3 |
| 路由 | Vue Router（createWebHistory） | 4.5+ |
| CSS | CSS Custom Properties（设计令牌系统） | — |
| 图标 | Lucide Vue Next | 0.460+ |
| 字体 | Inter + JetBrains Mono（Google Fonts） | — |
| Markdown 解析 | markdown-it + gray-matter（仅构建时） | 14.3.0 / 4.0.3 |
| 代码高亮 | Shiki（仅构建时，深色主题不随主题切换） | 4.3.1 |
| E2E 测试 | Playwright | 1.48+ |
| 部署 | Vercel（SPA rewrites，master 分支自动部署） | — |

**运行时 bundle 仅含：** Vue 3 + Vue Router + Lucide Vue + CSS（gzip 主包约 41.88 KB）。

**运行时依赖（3 项）**：vue / vue-router / lucide-vue-next
**开发时依赖（9 项）**：@types/markdown-it / @types/node / @vitejs/plugin-vue / gray-matter / markdown-it / playwright / shiki / typescript / vite / vue-tsc

### 1.6 当前分支

- **分支**：`master`（生产分支，受保护）
- **本地与远程**：**同步**（origin/master = `bfb070e`）；RC4.1 改动尚未 commit
- **远程 `origin/master`**：`bfb070e`（RC3 Release Summary，已包含 RC1 + RC2 + RC3 全部内容）
- **最新 Tag**：`v2.0.0`（RC2 Release，RC3 + RC4 均不发新 tag，RC8 时统一升级 v3.0.0）

### 1.7 Git 状态

```
On branch master
Your branch is up to date with 'origin/master'.   ← RC3 已同步，RC4.1 待 commit
Changes not staged for commit:
        modified:   release-gate-task-005.mjs       ← RC4.1 测试同步
        modified:   src/content/skills/index.md     ← RC4.1 frontmatter 扩展
        modified:   src/env.d.ts                    ← RC4.1 类型声明同步
        modified:   src/pages/Skills.vue            ← RC4.1 视觉重构
        modified:   src/styles/global.css           ← RC4.1 .page__header/.page__subtitle
        modified:   src/utils/content.ts            ← RC4.1 scanSkills 扩展
Untracked files:
        src/types/skills.ts                         ← RC4.1 新建类型文件
```

**最近 6 个 commit**：
```
bfb070e docs: append RC3 Release Summary (Section 19)                    ← origin/master = HEAD
8b45a28 docs: mark RC3 baseline frozen and origin/master synced
16b68d2 fix(rc3.3): unify DecisionSection eyebrow to Chinese
42a21dc feat(rc3.2): rebuild About header with subtitle and Facts Panel
6706630 docs: upgrade HANDOFF.md to project-lifecycle handoff document
c8b7913 feat(rc3.1): refactor About data layer to character-profile model
```

**所有 Tag**：`v0.3.0` / `v0.4.0` / `v0.5.0` / `v1.0.0` / `v2.0.0`

**RC3 Baseline 状态**：✅ **冻结**（不再修改 RC3 内容，除非后续发现 P0/P1 缺陷）

**RC4.1 状态**：✅ **完成**（typecheck + build + Playwright 65/65 全部通过，待 commit + 推送 origin/master）

---

## 二、开发历史

项目经历 **Task 001~010** → **RC1** → **RC2** → **RC3** 四个阶段。

### 2.1 Task 001~010（项目奠基，2026-07-08 ~ 2026-07-15）

| Task | 内容 | 交付 |
|------|------|------|
| 000 | 内容资产整理 | 14 个 Markdown 内容文件 |
| 001 | 工程骨架 | Vue 3 + Vite + 路由 + 主题切换 + 8 占位页 |
| 002 | 首页 | Hero / ProjectCard / Timeline / Contact 4 组件 |
| 003 | 构建时内容插件 + 项目详情页 | virtual:content + virtual:project-detail + Shiki + markdown-it |
| 004 | 面试页 + AI 实践页 | virtual:interview-content + virtual:ai-practice-content |
| 005 | Skills / Resume / About | virtual:skills-content + virtual:personal-content（Tag v0.5.0） |
| 006 | 项目同步 + 仓库清理 | 3 项目 GitHub 链接 + 17 张截图入库 |
| 007 | Final Portfolio Review | 7 部分评审 + 4 类事实修正 |
| 008 | Resume 系统完善 | virtual:resume-content + window.print PDF |
| 009 | Vercel 部署上线 | https://lai-portfolio-xi.vercel.app |
| 010 | Release Audit（RC 阶段开始） | 进入 RC1 |

### 2.2 RC1 — 真实性与架构稳定（2026-07-15 ~ 2026-07-16）

**设计目标**：在 Task 010 框架下，完成 P0 真实性修复 + 架构稳定性改造，作为后续视觉/交互升级的基线。

**最终成果**：

1. **Timeline SSOT 改造**（commit `864c996`）
   - 将时间线数据从 Home.vue 静态数组迁移至 [src/content/growth/timeline.md](src/content/growth/timeline.md) frontmatter.stages
   - 新增 `virtual:timeline-content` 虚拟模块（第 8 个，也是最后一个虚拟模块）
   - Home.vue 从 SSOT 读取，About 保持独立内容不共享 Timeline
   - TimelineStage 结构化字段：date / title / stack / highlights / learned / capability / nextStage / upcoming

2. **Hero 重构**
   - 移除"3 项目 / 218 文件 / 97 API"中可疑的"155 API tests"
   - 替换为更稳定的工程指标：3 完整项目 / 218 源文件 / 97 API 端点 / 236 测试用例

3. **P0 真实性修复**
   - 修正文档中 4 处 "155 API tests" → "155 frontend tests"
   - 修正 `开发设计规范-v1.0.md` 中 2 处过时数据
   - 修正 `个人能力分析与网站规划报告.md` 中 1 处过时数据

4. **工程基础设施**
   - 添加 [.gitattributes](.gitattributes)：`* text=auto eol=lf` 统一行尾，避免 Windows CRLF 污染
   - 恢复 Playwright 测试基础设施（release-gate-task-005.mjs）

5. **RC1 Local Release Baseline 冻结**（commit `1ad444a`）
   - Local Release（不推送 origin），作为 RC2 开发的稳定基线

**为什么这样设计**：

- **Timeline SSOT 是后续所有数据迁移的范式**。先在 Timeline 上验证 SSOT 模式，再推广到 About 等页面
- **真实性优先于视觉**。在视觉升级前必须保证内容真实，否则视觉升级只是包装错误
- **本地冻结而非远程发布**。RC1 不发布到生产，避免后续 RC 阶段频繁打 tag

### 2.3 RC2 — 视觉升级与组件化（2026-07-16 ~ 2026-07-17）

**设计目标**：以 RC1 为基线，对项目详情页和首页进行视觉层次、组件化、可访问性的全面升级，**严格控制新增组件数 ≤2**。

**子阶段与最终成果**：

| 子阶段 | Commit | 主要交付 |
|---|---|---|
| RC2.1 | `2233883` `9de992f` | 提取 ProjectHeader 组件（status / role 从 frontmatter 渲染，flex-wrap 移动端防护） |
| RC2.2 | `2b39f33` `d9e315d` | ArchitectureDiagram 组件集成 + `import.meta.glob` 从 eager 改为 lazy（真正按需加载 SVG） |
| RC2.3 | `2563e38` | 强化 ProjectDetail 视觉层次（DecisionSection border-top / padding / h2 字号差异化） |
| RC2.4 | `4d9c1e6` | 可访问性修复（5 个 section aria-labelledby / ProjectNav aria-label / ArchitectureDiagram 动态 alt） |
| RC2.5 | `12992da` | Final Review + Design Audit（eyebrow letter-spacing 统一为 0.08em） |
| RC2 Release | `20598ae` + tag `v2.0.0` | 版本号 0.1.0 → 2.0.0 + Release Notes + push 15 commits 到 origin/master |

**RC2 新增组件配额使用**：
- 用户限制：≤2 个新组件
- 实际新增：1 个（[ArchitectureDiagram.vue](src/components/project/ArchitectureDiagram.vue)）
- **剩余配额：1 个**（RC3+ 可继续使用）

**为什么这样设计**：

- **组件配额制**强制在抽象与冗余之间做权衡，避免为单次使用做抽象
- **ArchitectureDiagram 不修改 SVG 内容**，只处理显示、响应式、暗黑模式兼容（SVG 视为"亮色卡片"，用防御性样式适配 dark mode）
- **子阶段串行执行**：每个 RC2.x 完成后必须通过 typecheck + build + Playwright 三项验证才能进入下一阶段
- **eyebrow letter-spacing 统一 0.08em**：RC2.3 曾有意差异化到 0.12em，RC2.5 经讨论后统一，因差异化已通过其他方式实现

### 2.4 RC3 — About 页面重构（2026-07-17，已完成）

**设计目标**：将 About 页从"5 section 散乱内容"重构为"人物画像"模型，建立结构化 frontmatter + Markdown body 的双层信息架构，避免与 Hero / Timeline / Resume 信息重复。

**子阶段与最终成果**：

| 子阶段 | 状态 | 主要交付 |
|---|---|---|
| RC3.1 数据层重构 | ✅ 完成（commit `c8b7913`，本地未推送） | 类型扩展（PersonalFact）+ frontmatter（subtitle + 4 facts）+ scanPersonal 解析 + about.md 重组 + 测试同步 |
| RC3.2 About.vue 视觉重构 | ✅ 完成（commit `42a21dc`，本地未推送） | subtitle 渲染 + Facts Panel `<dl>` 语义结构 + 4 层 Header + 7 项 Playwright 断言 |
| RC3.3 Final Review & Release | ✅ 完成（本次 commit，本地未推送） | Code/Design/Performance/IA Review + P1 修复（DecisionSection eyebrow 中文化）+ 文档同步 |

**RC3.3 修改文件（最小化原则）：**
- `src/components/project/DecisionSection.vue` L13 — eyebrow `TECH DECISIONS` → `// 关键决策`（P1：全站唯一英文 eyebrow 不一致）
- `RELEASE_REVIEW_REPORT.md` — 追加 §18 RC3 Final Review Report
- `HANDOFF.md` — 更新 §0 SNAPSHOT + §1.6/1.7 Git 状态 + §2.4 RC3 完成状态 + §六 进度 + §七 路线

**RC3 全程约束遵守：**
- 新增组件配额：0/2（RC3 全程未新增组件，仍剩 1 个）
- 新增第三方依赖：0
- 新增 Design Token / 颜色 / 字体 / 动画：0
- Markdown SSOT 保持：是（about.md 为唯一数据源）
- 每个子阶段完成时执行 typecheck + build + Playwright 全部通过
- 隐私扫描清洁：0 手机号 / 0 真实密钥

**RC3.3 Final Review 结论：**
- ✅ Code Review：0 P0 / 0 P1（修复后）/ 6 P2（仅记录，均为合理使用）
- ✅ Design Audit：1 P1 已修复（DecisionSection eyebrow），其余全站一致
- ✅ Performance Audit：Bundle -0.01 kB gzip（无回归），动态导入正确，0 未使用资源
- ✅ IA Review：0 P0 / 0 P1 / 5 P2 建议（RC4+ 由用户决定）
- ✅ Final Validation：typecheck + build（1664 modules, 2.41s）+ Playwright 55/55 全部通过
- 详见 [RELEASE_REVIEW_REPORT.md §18](RELEASE_REVIEW_REPORT.md)

**为什么这样设计**：

- **About = 人物画像，不是 Resume**。Resume 在 `/resume` 路由，About 不应重复
- **facts ≤4 项且仅长期稳定信息**。不放项目数 / API 数 / 文件数等易变数据，避免与 Hero 重复
- **成长轨迹只做概述 + 引导**。Timeline 在首页有完整呈现，About 不应重复，而是引导访问
- **Email 不公开**。隐私考虑，About 仅保留 GitHub
- **RC3.3 IA Review 已执行**。无 P0/P1 信息架构问题，5 项 P2 建议已记录供 RC4+ 决策

**RC3.1 已完成的工作**：

1. **类型扩展**（[src/types/personal.ts](src/types/personal.ts)）
   - 新增 `PersonalFact` 接口（label + value 结构化键值对）
   - `PersonalContent` 新增 `subtitle?: string` 和 `facts?: PersonalFact[]` 字段
   - 全部为可选字段，向后兼容

2. **解析逻辑扩展**（[src/utils/content.ts](src/utils/content.ts)）
   - `scanPersonal()` 解析 `subtitle` 和 `facts`
   - `.filter((f) => f.label && f.value)` 过滤空值，保证数据质量

3. **内容重组**（[src/content/personal/about.md](src/content/personal/about.md)）
   - frontmatter 新增 `subtitle: 软件工程学生 · 后端开发 · 分布式系统`
   - frontmatter 新增 4 项 `facts`（教育 / 方向 / 考研 / GitHub）— 全部为长期稳定信息
   - body 从 5 section（个人简介 / 教育 / 方向 / 联系方式 / 关于本站）精简为 3 section（工程定位 / 成长轨迹 / 关于本站）
   - "成长轨迹" section 末尾引导访问 Timeline（`/#timeline`），不重复 Timeline 内容
   - Email 不展示（隐私考虑），仅保留 GitHub

4. **测试断言同步**（[release-gate-task-005.mjs](release-gate-task-005.mjs) Test 8）
   - `h2 >= 4` → `h2 >= 3（工程定位/成长轨迹/关于本站）`
   - 移除 `ul` 测试（联系方式已移到 facts）
   - 移除直接 GitHub 链接测试（RC3.2 About.vue 渲染 facts 后将重新添加）
   - 新增 Timeline 引导链接测试（`a[href*="#timeline"]`）

**验证结果**：
- ✅ typecheck 通过（exit 0）
- ✅ build 通过（1664 模块，2.47s）
- ✅ Playwright 48/48 通过（原 49 项，移 2 增 1，净 -1）
- ✅ Bundle 体积零变化（About CSS 0.14 kB / JS 2.23 kB，与 RC2.5 完全一致）

**为什么这样设计**：

- **About = 人物画像，不是 Resume**。Resume 在 `/resume` 路由，About 不应重复
- **facts ≤4 项且仅长期稳定信息**。不放项目数 / API 数 / 文件数等易变数据，避免与 Hero 重复
- **成长轨迹只做概述 + 引导**。Timeline 在首页有完整呈现，About 不应重复，而是引导访问
- **Email 不公开**。隐私考虑，About 仅保留 GitHub
- **RC3.3 新增 Information Architecture Review**。重点检查 Hero / Timeline / Resume / About 之间的信息重复，确保每个页面职责清晰

### 2.5 RC4 — 全局基础 + Skills 试点（2026-07-17，进行中）

**设计目标**：以《Portfolio v3 Roadmap》为唯一开发计划，RC4 承担"全局基础设施 + Skills 试点"双重职责：
1. **全局基础**：建立 `.page__header` / `.page__subtitle` 工具类（CSS utility，非新组件），为 RC5/RC6 子页面统一 Header 模式铺路；同时消除 Skills 页 `page__hint` 硬编码，验证 SSOT 模式可推广
2. **Skills 试点**：将技术栈从 Markdown body 迁移至 frontmatter.categories（结构化数据），建立"frontmatter 结构化 + body 叙事"的双层信息架构，与 About.md 模式对齐

**子阶段与最终成果**：

| 子阶段 | 状态 | 主要交付 |
|---|---|---|
| RC4.1 数据层 + 视觉重构 | ✅ 完成（本地未 commit） | SkillsContent 类型扩展（subtitle + categories）+ scanSkills 解析 + skills/index.md 重组 + .page__header/.page__subtitle 工具类 + Skills.vue 重构 + Playwright Test 6 扩展（+10 项断言） |
| RC4.2 Final Review | ⏳ 待批准 | Code/Design/Performance 局部审计 + 文档同步 |

**RC4.1 修改文件（7 个，1 新建 + 6 修改）：**

| 文件 | 类型 | 改动 |
|---|---|---|
| `src/types/skills.ts` | ★ 新建 | SkillsContent + SkillCategory 接口（subtitle? + categories?） |
| `src/utils/content.ts` | 修改 | scanSkills 返回类型改为 SkillsContent，新增 subtitle + categories 解析逻辑 |
| `src/env.d.ts` | 修改 | virtual:skills-content 类型声明改用 SkillsContent |
| `src/content/skills/index.md` | 修改 | frontmatter 新增 subtitle + 6 项 categories；body 移除"## 技术栈" section |
| `src/styles/global.css` | 修改 | 新增 `.page__header` / `.page__subtitle` 工具类（CSS utility，非组件） |
| `src/pages/Skills.vue` | 修改 | 完全重写：应用工具类 + categories 卡片网格（6 个分类）+ 移除 scoped header CSS |
| `release-gate-task-005.mjs` | 修改 | Test 6 扩展：subtitle 渲染 + page__hint 消除 + page__header 应用 + 6 分类卡片 + 6 分类名称验证 |

**RC4.1 全程约束遵守：**
- 新增组件配额：0/2（RC4.1 未新增组件，仍剩 1 个）
- 新增第三方依赖：0
- 新增 Design Token / 颜色 / 字体 / 动画：0
- Markdown SSOT 保持：是（skills/index.md 为唯一数据源）
- 每个子阶段完成时执行 typecheck + build + Playwright 全部通过
- 隐私扫描清洁：0 手机号 / 0 真实密钥

**RC4.1 验证结果：**
- ✅ typecheck 通过（exit 0）
- ✅ build 通过（1664 模块，2.40s，gzip 主包 41.89 KB — 与 RC3 一致）
- ✅ Playwright **65/65** 通过（RC3 是 55/55，新增 10 项断言全部通过）
- ✅ Bundle 体积变化：Skills CSS +0.04 kB（1.09 kB / gzip 0.43 kB）；Skills JS +0.44 kB（2.67 kB / gzip 1.53 kB）— 因新增 categories 卡片渲染逻辑

**为什么这样设计：**

- **`.page__header` / `.page__subtitle` 是 CSS utility，不是新组件**。避免消耗组件配额，同时为 RC5（Resume）/ RC6（Interview + AiPractice）提供统一的 Header 模式
- **About.vue 保留 scoped `.about__header`**。RC3.2 已冻结，不强制迁移；新页面优先使用工具类
- **技术栈从 body 迁移至 frontmatter.categories**。categories 是结构化数据（name + items），适合卡片网格展示；body 仅保留学习路线 + 当前学习等叙事内容
- **categories 卡片网格而非 MetricCard 复用**。category 数据是"name + items 字符串"，不是"number + label"，MetricCard 不适配
- **Playwright `skillsP >= 5` 调整为 `>= 4`**。技术栈段落迁移至 frontmatter 后，body 段落数减少，阈值同步调整



---

## 三、当前项目架构

### 3.1 目录结构

```
个人网页/
├── AI_RULES.md                    # AI 协作规范
├── PROJECT_CONTEXT.md            # 项目上下文索引（旧版，本文件优先级更高）
├── PROJECT_MEMORY.md             # 项目记忆档案
├── HANDOFF.md                     # ★ 本文件（最终交接文档）
├── RELEASE_REVIEW_REPORT.md      # 发布评审报告（含 RC2 Final Review Report §16-17）
├── ai-workspace.yaml              # AI 工作区配置
├── index.html                     # 入口 HTML（含 FOUC 防御脚本）
├── package.json                   # version: 2.0.0
├── tsconfig.json / tsconfig.node.json
├── vite.config.ts
├── vercel.json                    # SPA rewrites
├── .gitattributes                 # * text=auto eol=lf
├── release-gate-task-005.mjs      # Playwright E2E 测试（48 用例，17 测试组）
│
├── docs/
│   ├── 架构确认文档-v1.2.md        # ⭐ 权威架构文档（最高优先级）
│   ├── 开发设计规范-v1.0.md        # 内容为 v1.1（文件名 v1.0，参考）
│   ├── 个人能力分析与网站规划报告.md  # v1.0 背景资料
│   ├── task000-completion-report.md
│   └── assets/
│       ├── architecture/          # 7 套 SVG + Mermaid 源码
│       └── screenshots/           # 17 张项目截图
│
├── public/
│   └── favicon.svg                # Amber 方块 + "L" 字母
│
└── src/
    ├── main.ts / App.vue / env.d.ts
    ├── router/index.ts            # 7 业务路由 + 404，scrollBehavior 含 hash
    ├── composables/useTheme.ts    # 单例主题（system/light/dark 三态）
    ├── layouts/DefaultLayout.vue
    │
    ├── components/
    │   ├── common/                # NavBar / Footer / ThemeToggle / BackToTop
    │   ├── home/                  # HeroSection / ProjectCard / TimelineSection / ContactSection
    │   ├── interview/             # InterviewCategory / InterviewQuestion
    │   └── project/               # ProjectHeader / MetricCard / MarkdownContent / DecisionSection / ProjectNav / ArchitectureDiagram
    │
    ├── pages/                     # 8 个页面
    │   ├── Home.vue / ProjectDetail.vue / Skills.vue / Interview.vue
    │   ├── AiPractice.vue / Resume.vue / About.vue / NotFound.vue
    │
    ├── styles/
    │   ├── tokens.css             # Design Token 系统（color / space / text / radius / shadow / transition）
    │   ├── global.css             # reset + .page 全局样式 + 工具类
    │   └── code-theme.css         # Shiki 代码高亮主题
    │
    ├── types/                     # 类型定义（按域拆分）
    │   ├── content.ts             # ContentMeta / Metric（基础类型）
    │   ├── project.ts             # ProjectSummary / ProjectContent
    │   ├── decision.ts            # DecisionContent
    │   ├── timeline.ts            # TimelineStage / TimelineContent
    │   ├── contact.ts             # ContactInfo
    │   ├── interview.ts           # InterviewQAPair / InterviewCategory
    │   ├── ai-practice.ts         # AiPracticeContent
    │   ├── personal.ts            # ★ PersonalContent / PersonalFact（RC3.1 扩展）
    │   └── resume.ts              # ResumeContent
    │
    ├── content/                   # Markdown 内容（SSOT）
    │   ├── personal/about.md      # ★ RC3.1 重组（subtitle + 4 facts + 3 section body）
    │   ├── projects/              # 3 个项目（jiangnan-travel / love-letter / exam-system）
    │   ├── decisions/              # 3 个决策文档（10 项技术决策）
    │   ├── interview/              # 4 个分类（17 道题）
    │   ├── skills/index.md
    │   ├── growth/timeline.md      # ★ RC1 SSOT 改造后的时间线数据源
    │   ├── ai-practice/index.md
    │   └── resume/index.md
    │
    ├── assets/
    │   └── projects/              # 3 个项目架构图 SVG（Vite 静态资源引用）
    │
    └── utils/
        ├── content.ts             # ★ Vite 构建时内容插件（8 个虚拟模块）
        └── markdown.ts            # markdown-it + Shiki 配置
```

### 3.2 数据流（Markdown SSOT 模式）

```
src/content/**/*.md  ← 唯一数据源（SSOT）
   │
   ├─ frontmatter（gray-matter 解析）
   │     └─ 由 vite 内容插件 scanXxx() 提取为结构化字段
   │
   └─ body（Markdown）
         └─ 由 renderMarkdown() 渲染为 html
               │  （markdown-it + Shiki，仅构建时）
               │
               ▼
   virtual:*-content  →  TypeScript 类型化数据
               │
               ▼
   pages/*.vue  →  渲染到 DOM
```

**关键约束**：
- **Markdown 是唯一数据源**。禁止创建第二数据源
- frontmatter 字段必须向后兼容，新增字段必须可选
- 运行时零解析开销（全部构建时完成）

### 3.3 虚拟模块（8 个，[src/utils/content.ts](src/utils/content.ts)）

| 虚拟模块 | 用途 | 引入 Task |
|---|---|---|
| `virtual:content` | 项目摘要数组（无 HTML，首页用） | Task 003 |
| `virtual:project-detail` | 项目详情（含渲染 HTML + 决策记录） | Task 003 |
| `virtual:interview-content` | 面试问答分类 | Task 004 |
| `virtual:ai-practice-content` | AI 工程实践内容 | Task 004 |
| `virtual:skills-content` | 技术能力内容 | Task 005.1 |
| `virtual:personal-content` | ★ 关于我内容（RC3.1 扩展 subtitle + facts） | Task 005.3 / RC3.1 |
| `virtual:resume-content` | 简历内容 | Task 008 |
| `virtual:timeline-content` | ★ 时间线内容（SSOT 改造，RC1 新增） | RC1 |

**虚拟模块类型声明位置**：[src/env.d.ts](src/env.d.ts)

### 3.4 主要组件关系

**首页**（`Home.vue`）：
```
HeroSection  ← virtual:content（项目数等指标硬编码在组件内）
ProjectCard  ← virtual:content（ProjectSummary[]）
TimelineSection  ← virtual:timeline-content（TimelineStage[]）
ContactSection  ← 静态数据
```

**项目详情页**（`ProjectDetail.vue`）：
```
ProjectHeader  ← virtual:project-detail（ProjectContent：status/role）
MetricCard  ← ProjectContent.metrics
ArchitectureDiagram  ← ProjectContent.architecture（懒加载 SVG）
DecisionSection  ← ProjectContent.decision
MarkdownContent  ← ProjectContent.html
ProjectNav  ← 项目列表（上一篇/下一篇）
```

**关于页**（`About.vue`，RC3.2 待重构）：
```
当前：单一 MarkdownContent  ← virtual:personal-content.html
RC3.2 后：Header（title + ★subtitle）+ Facts Panel（★facts）+ MarkdownContent（body）
```

### 3.5 页面职责（不可重复）

| 路径 | 页面 | 职责 | 禁止 |
|---|---|---|---|
| `/` | Home | Who / What / Why / Next + 工程指标 + 项目卡片摘要 + 完整 Timeline + Contact | 不重复项目详情内容 |
| `/projects/:slug` | ProjectDetail | 单项目完整内容 + 技术决策 + 架构图 + 指标 | 不重复其他项目 |
| `/skills` | Skills | 技术栈分类（frontmatter.categories 结构化卡片）+ 学习路线 + 当前学习 | 不重复项目细节 |
| `/interview` | Interview | 17 道面试题（4 分类） | 不重复项目内容 |
| `/ai-practice` | AiPractice | AI 工程实践流程 | — |
| `/resume` | Resume | 完整简历 + PDF 下载 | 不重复 About 人物画像 |
| `/about` | About | **人物画像**（长期稳定信息 + 工程定位 + 成长概述 + 站点说明） | **不重复 Hero 工程指标 / Timeline 完整内容 / Resume 联系方式** |

### 3.6 设计系统

**Design Token 系统**（[src/styles/tokens.css](src/styles/tokens.css)）：

| 类别 | 示例 |
|---|---|
| 颜色 | `--color-text-primary` / `--color-text-secondary` / `--color-text-muted` / `--color-accent` / `--color-accent-strong` / `--color-on-accent` / `--color-surface` / `--color-border` |
| 间距 | `--space-1` ~ `--space-20`（4px / 8px / 12px / 16px / 20px / 24px / 32px / 40px / 48px / 64px / 80px） |
| 字号 | `--text-xs` / `--text-sm` / `--text-base` / `--text-lg` / `--text-xl` / `--text-2xl` / `--text-3xl` / `--text-4xl` / `--text-5xl` |
| 圆角 | `--radius-sm` / `--radius-md` / `--radius-lg` |
| 阴影 | `--shadow-sm` / `--shadow-md` / `--shadow-lg` |
| 过渡 | `--transition-fast` / `--transition-base` |
| 行高 | `--leading-normal` / `--leading-heading` |
| 字重 | `--font-weight-regular` / `--font-weight-medium` / `--font-weight-semibold` |

**已建立的规范**：

1. **ProjectCard 视觉层次**：通过 Surface / Shadow / Whitespace / Typography 建立，**禁止用 accent border 作为视觉权重**
2. **Timeline 阶段标签**：必须包含 learning focus / capability changes / next stage，中文标签自然阅读
3. **Hero 信息层级**：仅 Who / What / Why / Next / Engineering Metrics，**禁止营销文案**
4. **Contact section**：克制、名片式，禁止营销语言
5. **ProjectDetail frontmatter**：包含 status / role / architecture 字段（RC2.1 新增）
6. **Eyebrow 元素**：全站统一 `letter-spacing: 0.08em`（RC2.5 统一）
7. **ArchitectureDiagram 组件**：B1 方案，不修改 SVG 内容，只处理显示、响应式、暗黑模式兼容
8. **SVG 资源**：必须放在 `src/assets/projects/`，使用 Vite 静态资源方式引用
9. **ArchitectureDiagram 自动隐藏**：无架构图时不显示占位内容
10. **所有新组件必须小且单一职责**
11. **子页面 Header 工具类**（RC4.1 新增）：`/skills` `/interview` `/ai-practice` `/resume` 等子页面统一使用 `.page__header` / `.page__subtitle` 全局工具类（[src/styles/global.css](src/styles/global.css)），避免每页重复 scoped CSS；About.vue 保留 `.about__header`（RC3.2 冻结，不强制迁移）

---

## 四、当前数据结构

### 4.1 ProjectContent（[src/types/project.ts](src/types/project.ts)）

```typescript
interface ProjectContent {
  slug: string
  title: string
  subtitle?: string
  date: string
  tags: string[]
  metrics: Metric[]
  featured?: boolean
  order?: number
  github?: string
  status?: string       // ★ RC2.1 新增：项目当前状态（如 "Release 1.0 · 2026-07-08"）
  role?: string         // ★ RC2.1 新增：项目角色（如 "全栈独立开发"）
  architecture?: string // ★ RC2.1 新增：架构图标识（对应 src/assets/projects/{architecture}.svg）
  html: string
  decision?: DecisionContent
}
```

**字段使用位置**：
- `slug` / `title` / `subtitle` / `date` / `tags` / `github`：[ProjectHeader.vue](src/components/project/ProjectHeader.vue)
- `status` / `role`：[ProjectHeader.vue](src/components/project/ProjectHeader.vue)（RC2.1 提取）
- `metrics`：[MetricCard.vue](src/components/project/MetricCard.vue)
- `architecture`：[ArchitectureDiagram.vue](src/components/project/ArchitectureDiagram.vue)（RC2.2 集成，懒加载 SVG）
- `html`：[MarkdownContent.vue](src/components/project/MarkdownContent.vue)
- `decision`：[DecisionSection.vue](src/components/project/DecisionSection.vue)

### 4.2 PersonalContent（[src/types/personal.ts](src/types/personal.ts)，RC3.1 扩展）

```typescript
interface PersonalFact {  // ★ RC3.1 新增
  label: string
  value: string
}

interface PersonalContent {
  slug: string
  title: string
  date: string
  subtitle?: string         // ★ RC3.1 新增：一句话定位
  facts?: PersonalFact[]    // ★ RC3.1 新增：≤4 项长期稳定信息
  html: string
}
```

**字段使用位置**：
- `slug` / `title` / `date` / `html`：[About.vue](src/pages/About.vue)（当前仅渲染 html，RC3.2 将消费 subtitle + facts）
- `subtitle`：RC3.2 将在 About.vue Header 区域 H1 下方渲染
- `facts`：RC3.2 将在 About.vue Facts Panel 区域渲染为结构化 key-value 列表

### 4.3 PersonalFact 字段（RC3.1 新增）

```typescript
interface PersonalFact {
  label: string   // 标签（如"教育"）
  value: string   // 值（如"南昌大学 · 软件工程 · 2023 级"）
}
```

**当前 4 项 facts 内容**（[about.md](src/content/personal/about.md) frontmatter）：

| label | value |
|---|---|
| 教育 | 南昌大学 · 软件工程 · 2023 级 |
| 方向 | 后端开发 / 分布式系统 / 软件工程实践 |
| 考研 | 408 计算机科学 · 2026 届 |
| GitHub | github.com/l535304334 |

**约束**：
- **≤4 项**
- **仅长期稳定信息**（不放项目数 / API 数 / 文件数等易变数据）
- Email 不在 facts 中（隐私考虑，仅保留 GitHub）

### 4.4 TimelineStage（[src/types/timeline.ts](src/types/timeline.ts)，RC1 改造）

```typescript
interface TimelineStage {
  date: string
  title: string
  stack: string
  highlights: string[]
  learned: string      // 学习重点
  nextStage: string    // 下一阶段触发原因
  capability: string  // 能力变化
  upcoming?: boolean  // 是否为未来计划阶段
}
```

**字段使用位置**：
- 全部字段：[TimelineSection.vue](src/components/home/TimelineSection.vue)（首页时间线渲染）

### 4.5 SkillsContent（[src/types/skills.ts](src/types/skills.ts)，RC4.1 扩展）

```typescript
interface SkillCategory {  // ★ RC4.1 新增
  name: string
  items: string
}

interface SkillsContent {
  slug: string
  title: string
  date: string
  subtitle?: string         // ★ RC4.1 新增：一句话定位
  categories?: SkillCategory[]  // ★ RC4.1 新增：技术栈分类卡片
  html: string
}
```

**字段使用位置**：
- `slug` / `title` / `date` / `html`：[Skills.vue](src/pages/Skills.vue)
- `subtitle`：RC4.1 在 Skills.vue Header 区域 H1 下方渲染（替换原硬编码 `page__hint`）
- `categories`：RC4.1 在 Skills.vue 技术栈区域渲染为 6 个卡片（name + items）

**当前 6 项 categories 内容**（[skills/index.md](src/content/skills/index.md) frontmatter）：

| name | items |
|---|---|
| 后端开发 | Java 17 · Spring Boot 3 · MyBatis-Plus · MySQL · Redis · Redisson · JWT · Spring Security · Knife4j |
| 前端开发 | Vue 3 (Composition API) · React 18 · TypeScript (strict) · Vite · Element Plus · ECharts · Zustand · Pinia |
| 小程序 & 跨端 | Taro 4 · 微信小程序 · 微信云开发 CloudBase · Serverless |
| 工具 & 运维 | Docker · Docker Compose · Git · GitHub Actions · Nginx · Vitest · Playwright · ESLint |
| AI 工程化 | DeepSeek API · Prompt Engineering · AI 辅助开发 (Claude Code / Trae) · SSE 流式响应 |
| 软件工程实践 | 状态机设计 · 事件溯源 · 分布式锁 · 评分算法 · 安全加固 (OWASP Top 10) · 技术文档 |

### 4.6 其他数据结构

| 类型 | 文件 | 用途 |
|---|---|---|
| `ContentMeta` | [content.ts](src/types/content.ts) | 所有内容文件 frontmatter 公共字段 |
| `Metric` | [content.ts](src/types/content.ts) | 项目指标（label + value） |
| `ProjectSummary` | [project.ts](src/types/project.ts) | 首页项目摘要（无 HTML） |
| `DecisionContent` | [decision.ts](src/types/decision.ts) | 技术决策记录 |
| `TimelineContent` | [timeline.ts](src/types/timeline.ts) | 时间线内容（stages + html） |
| `ContactInfo` | [contact.ts](src/types/contact.ts) | 联系方式 |
| `InterviewQAPair` / `InterviewCategory` | [interview.ts](src/types/interview.ts) | 面试问答 |
| `AiPracticeContent` | [ai-practice.ts](src/types/ai-practice.ts) | AI 实践内容 |
| `ResumeContent` | [resume.ts](src/types/resume.ts) | 简历内容 |

---

## 五、不要重复设计/不要重复开发 — 已冻结决策清单（FROZEN INVENTORY）

> **本章节列出所有已经确定的架构、设计和约束。**
>
> 新 AI（或开发者）接手项目时，**禁止重新设计或重复开发**以下内容。
>
> 如需修改，必须先向用户提出并获明确批准。**冲突必须暴露，不自行折中**。

### 5.0 FROZEN INVENTORY 汇总（快速参考）

| 类别 | 冻结项 | 状态 |
|---|---|---|
| 风格 | Developer Academic 风格（Slate + Amber / Inter + JetBrains Mono） | 🔒 不更换 |
| 风格 | Hero 信息层级（Who/What/Why/Next/Metrics，禁营销文案） | 🔒 不变 |
| 风格 | Eyebrow 全站统一 `letter-spacing: 0.08em` | 🔒 不变 |
| 风格 | ProjectCard 视觉四要素（Surface/Shadow/Whitespace/Typography，禁 accent border） | 🔒 不变 |
| 数据 | Markdown SSOT（8 个虚拟模块已定型，不再新增/不重命名） | 🔒 不破 |
| 数据 | frontmatter 字段必须向后兼容（新增字段必须可选） | 🔒 不破 |
| 数据 | Timeline SSOT 在 `src/content/growth/timeline.md` | 🔒 不移 |
| 数据 | About 保持独立内容，不共享 Timeline | 🔒 不并 |
| 数据 | About facts ≤4 项且仅长期稳定信息（不放易变数据） | 🔒 不变 |
| 数据 | About 4 项 facts 内容（教育/方向/考研/GitHub） | 🔒 不改 |
| 数据 | Email 不公开（仅保留 GitHub） | 🔒 不变 |
| 页面 | 页面职责划分（Home/ProjectDetail/Skills/Interview/AiPractice/Resume/About） | 🔒 不变 |
| 页面 | About = 人物画像（不重复 Hero/Timeline/Resume） | 🔒 不变 |
| 组件 | ArchitectureDiagram.vue B1 方案（不修改 SVG 内容） | 🔒 不改 |
| 组件 | SVG 资源必须放 `src/assets/projects/`（Vite 静态资源引用） | 🔒 不移 |
| 组件 | ArchitectureDiagram 自动隐藏（无图不显示占位） | 🔒 不变 |
| 组件 | 新增组件总配额 ≤2（已用 1，剩余 1） | 🔒 不超 |
| 组件 | 所有新组件必须小且单一职责 | 🔒 不破 |
| 样式 | `.page__header` / `.page__subtitle` 工具类（RC4.1 新增，子页面 Header 统一模式） | 🔒 不破 |
| 样式 | About.vue 保留 scoped `.about__header`（RC3.2 冻结，不强制迁移工具类） | 🔒 不移 |
| 工程 | 行尾统一 LF（`.gitattributes`） | 🔒 不改 |
| 工程 | Playwright 测试基础设施必须维护 | 🔒 不删 |
| 工程 | 每子阶段三项验证（typecheck + build + Playwright） | 🔒 不省 |
| 工程 | Event Sourcing 术语保留策略（技术领域保留 / 宣传克制） | 🔒 不变 |
| 工程 | 当前 8 个虚拟模块（不再新增、不重命名） | 🔒 不动 |
| 工程 | v2.0.0 已发布内容（RC3+ 只能增量改进，不推翻重做） | 🔒 不破 |
| 工程 | 架构以《架构确认文档-v1.2.md》为准，已锁定 | 🔒 不改 |
| 工程 | RC 阶段禁止新增业务功能/页面/动画/Token/字体/抽象（除非用户明确要求） | 🔒 不破 |
| 工程 | 子阶段必须串行执行（禁止跳阶段或提前实现后续 RC 内容） | 🔒 不破 |
| 工程 | RC4~RC7 不发布新版本（仅推送 origin/master）；RC8 统一 v3.0.0 Final Release | 🔒 不破 |
| 工程 | 《Portfolio v3 Roadmap》为 RC4~RC8 唯一开发计划，禁止自行修改或重新规划 | 🔒 不破 |

### 5.1 风格定位

- **Developer Academic 风格** — 克制、专业、有细节。不追暗黑炫酷、不走纯学术白底、不追花哨动画
- **个人品牌来自工程质量、内容质量、项目深度**，而非视觉装饰或 Logo
- 配色：Slate 灰色系 + Amber 强调色（不更换）
- 字体：Inter + JetBrains Mono（不更换，最多 2 个字体家族）

### 5.2 数据架构

- **Markdown 是唯一 SSOT**。所有内容必须以 Markdown 文件为数据源，禁止创建第二数据源
- **frontmatter 字段必须向后兼容**。新增字段必须可选，不破坏现有消费者
- **8 个虚拟模块已定型**。不再新增虚拟模块（virtual:content / project-detail / interview-content / ai-practice-content / skills-content / personal-content / resume-content / timeline-content）
- **Timeline 数据 SSOT 已建立**。Home.vue 从 `virtual:timeline-content` 读取，About 保持独立内容不共享 Timeline

### 5.3 页面职责划分（不可重复）

- **Home** = Who / What / Why / Next + Engineering Metrics + Project Cards + Timeline + Contact
- **ProjectDetail** = 单项目完整内容（架构 / 决策 / 指标 / 代码）
- **Skills** = 技术栈分类 + 学习路线
- **Interview** = 17 道面试题
- **AiPractice** = AI 工程实践流程
- **Resume** = 完整简历 + PDF 下载
- **About** = **人物画像**（长期稳定信息 + 工程定位 + 成长概述 + 站点说明），不重复 Hero 工程指标 / Timeline 完整内容 / Resume 联系方式

### 5.4 组件设计

- **ArchitectureDiagram.vue（B1 方案）**：不修改 SVG 内容，只处理显示、响应式、暗黑模式兼容
- **SVG 资源必须放在 `src/assets/projects/`**，使用 Vite 静态资源方式引用
- **ArchitectureDiagram 自动隐藏**：无架构图时不显示占位内容
- **所有新组件必须小且单一职责**
- **新增组件配额**：RC2 + RC3 + 后续 RC 阶段**总共 ≤2 个新组件**（已用 1 个，剩余 1 个）

### 5.5 视觉规范

- **ProjectCard 视觉层次**：通过 Surface / Shadow / Whitespace / Typography 建立，**禁止用 accent border 作为视觉权重**
- **Eyebrow 元素**：全站统一 `letter-spacing: 0.08em`
- **Hero 信息层级**：仅 Who / What / Why / Next / Engineering Metrics，**禁止营销文案**
- **Contact section**：克制、名片式，禁止营销语言
- **Timeline 阶段标签**：必须包含 learning focus / capability changes / next stage，中文标签自然阅读
- **Email 不公开**：About 页不展示 Email，仅保留 GitHub

### 5.6 工程规范

- **行尾统一 LF**：`.gitattributes` 配置 `* text=auto eol=lf`，避免 Windows CRLF 污染
- **Playwright 测试基础设施必须维护**：[release-gate-task-005.mjs](release-gate-task-005.mjs) 必须能运行，`package.json` 必须包含 Playwright 依赖和 `test` 脚本
- **每个 RC 子阶段完成后**：必须立即执行 `npm run typecheck` + `npm run build` + `npm test`（Playwright），三项全过才能进入下一子阶段
- **Event Sourcing 术语保留**：在技术实现 / 架构设计 / 决策记录 / 面试材料 / 架构图中保留；在指标 / 宣传描述 / 能力摘要中使用更克制的"关键操作留痕"

### 5.7 RC 阶段约束

- **RC 阶段禁止新增业务功能**（除非用户明确要求）
- **RC 阶段禁止新增组件**（除非消耗 ≤2 配额）
- **RC 阶段禁止新增页面 / 动画 / Design Token / 颜色系统 / 字体 / 抽象**（除非用户明确要求）
- **RC 阶段子阶段必须串行执行**：禁止跳阶段或提前实现 RC3+ 内容
- **ProjectDetail 必须以 Markdown 为唯一内容源（SSOT）**，禁止创建第二数据源

---

## 六、当前开发进度

### 6.1 已完成

| 阶段 | 状态 | 关键交付 |
|---|---|---|
| Task 001~010 | ✅ 全部完成 | 项目奠基（v0.3.0 → v1.0.0） |
| **RC1** | ✅ Released (Local) commit `1ad444a` | Timeline SSOT + Hero 重构 + P0 真实性修复 + .gitattributes |
| **RC2** | ✅ Released (Origin) commit `20598ae` + tag `v2.0.0` | ProjectHeader 提取 + ArchitectureDiagram 集成 + 视觉层次强化 + 可访问性修复 + Design Audit |
| **RC3** | ✅ Released (Origin) commit `bfb070e`（origin/master 已同步，不发新 tag，仍属 v2.0.0） | About 页面重构：RC3.1 数据层（PersonalFact + subtitle + 4 facts）+ RC3.2 视觉重构（Facts Panel `<dl>`）+ RC3.3 Final Review（Code/Design/Performance/**IA Review** + P1 修复） |
| **RC4.1** | ✅ 完成（本地未 commit，待推送 origin/master） | Skills 数据层（SkillCategory + subtitle + 6 categories）+ 视觉重构（.page__header/.page__subtitle 工具类 + categories 卡片网格）+ Playwright +10 项断言（65/65 通过） |

### 6.2 剩余（按 Portfolio v3 Roadmap 顺序）

| 阶段 | 状态 | 预期内容 |
|---|---|---|
| **RC4.2** | ⏳ 待批准 | Skills 页 Final Review（Code/Design/Performance 局部审计 + 文档同步） |
| **RC5** | ⏳ 未开始 | Resume 深化（视觉层次 + PDF 优化 + subtitle 统一） |
| **RC6** | ⏳ 未开始 | Interview + AiPractice 深化（共用 .page__header + Q&A/案例展示） |
| **RC7** | ⏳ 未开始 | 信息架构 + 全局导航优化（NavBar 顺序决策 + 跨页面职责确认） |
| **RC8** | ⏳ 未开始 | Final Release v3.0.0（全站审计 + Core Web Vitals + WCAG AA + v3.0.0 发布） |

**重要说明**：
- **《Portfolio v3 Roadmap》已由用户批准为 RC4~RC8 唯一开发计划**，禁止自行修改或重新规划
- 用户的工作流是"按 RC 阶段顺序、用户批准后推进"，**禁止跳阶段或提前实现后续 RC 内容**
- 每完成一个 RC 子阶段，必须输出 Report（修改文件 / 数据流 / 风险 / Bundle / 验证结果），**等待用户批准才能进入下一子阶段**
- **RC4~RC7 不发布新版本**，仅推送 origin/master；**RC8 统一发 v3.0.0 Final Release**
- **RC3.3 Information Architecture Review 已完成**（详见 [RELEASE_REVIEW_REPORT.md §18.7](RELEASE_REVIEW_REPORT.md)），5 项 P2 建议供 RC4+ 决策参考

**RC3.3 IA Review 给 RC4+ 的 5 项 P2 建议处理进度：**

| # | 建议 | 建议时机 | 当前状态 |
|---|---|---|---|
| 1 | 统一 About subtitle 与 Resume 开场白 framing | RC5（Resume 重构） | ⏳ 待 RC5 处理 |
| 2 | 评估 NavBar 顺序是否优先复试导师场景 | RC4+（用户决策） | ⏳ 待 RC7 处理 |
| 3 | 评估 4 个子页面（Skills/Interview/AiPractice/Resume）`page__hint` 是否应统一迁移至 SSOT 模式 | RC4-RC7（每页重构时） | 🟡 RC4.1 已完成 Skills 迁移（其余 3 页待 RC5/RC6） |
| 4 | 评估 3 个子页面 `.xxx__header` CSS 是否提取为 `.page__header` 工具类 | RC8（Final Review） | 🟡 RC4.1 已建立工具类并验证（About.vue 保留 scoped，其余子页面待 RC5/RC6 应用） |
| 5 | 监控 Skills 软件工程实践 vs Projects 技术亮点 vs Resume 工程能力 三处能力描述是否在 RC4+ 出现过度重复 | RC4-RC7（每页重构时） | 🟡 RC4.1 Skills 软件工程实践分类已建立（待 RC5 Resume 重构时比对） |

---

## 七、后续开发路线

> **《Portfolio v3 Roadmap》已由用户批准为 RC4~RC8 唯一开发计划**（2026-07-17 批准）。
>
> RC4~RC8 全程严格按照 Roadmap 顺序推进，除非遇到 P0/P1 问题或用户明确要求，否则不得自行修改 Roadmap 或重新规划开发路线。

### 7.1 总目标

将 Portfolio v2.0（已发布）演进为 v3.0.0（RC8 Final Release），通过 RC4~RC7 的逐页深化与全局基础升级，建立"问题类型 + 页面协同"的优化模式，避免"一页一 RC"的线性低效。RC8 作为 Final Release 统一发布 v3.0.0。

### 7.2 RC4 — 全局基础 + Skills 试点（进行中）

**目标**：建立子页面 Header 工具类（`.page__header` / `.page__subtitle`），消除 Skills 页 `page__hint` 硬编码，将技术栈迁移至 frontmatter.categories 结构化数据，为 RC5/RC6 铺路。

**子阶段**：

| 子阶段 | 状态 | 主要交付 |
|---|---|---|
| RC4.1 数据层 + 视觉重构 | ✅ 完成（本地未 commit） | SkillsContent 类型扩展 + scanSkills 解析 + skills/index.md 重组 + .page__header/.page__subtitle 工具类 + Skills.vue 重构 + Playwright +10 项断言 |
| RC4.2 Final Review | ⏳ 待用户批准 | Code/Design/Performance 局部审计 + 文档同步 |

**验收标准**：
- typecheck + build + Playwright 三项全过
- Skills 页 categories 卡片网格渲染正确（6 个分类）
- `.page__header` / `.page__subtitle` 工具类在 global.css 中建立
- page__hint 硬编码消除（仅 Skills 页，其他页在 RC5/RC6 处理）

### 7.3 RC5 — Resume 深化

**目标**：Resume 页视觉层次强化，PDF 打印优化，subtitle 统一至 SSOT 模式。

**预期工作**：
- Resume frontmatter 扩展（subtitle + 可能的结构化字段）
- Resume.vue 应用 `.page__header` / `.page__subtitle` 工具类
- PDF 打印样式优化（print CSS）
- 与 About subtitle 的 framing 对齐（RC3.3 IA Review P2 #1）

**验收标准**：
- typecheck + build + Playwright 三项全过
- Resume 页 subtitle 从 SSOT 读取
- PDF 打印输出排版正确

### 7.4 RC6 — Interview + AiPractice 深化

**目标**：两页共用 `.page__header` 工具类，Q&A 与案例展示视觉强化。

**预期工作**：
- Interview frontmatter 扩展（如需要 subtitle）
- AiPractice frontmatter 扩展（如需要 subtitle）
- 两页 .vue 应用 `.page__header` / `.page__subtitle` 工具类
- Interview Q&A 折叠面板视觉强化（如需要）
- AiPractice 案例展示卡片化（如需要）

**验收标准**：
- typecheck + build + Playwright 三项全过
- 两页 subtitle 从 SSOT 读取
- page__hint 硬编码消除（4 子页面全部完成）

### 7.5 RC7 — 信息架构 + 全局导航优化

**目标**：跨页面职责确认，NavBar 顺序决策，IA 全局审计。

**预期工作**：
- NavBar 顺序评估（RC3.3 IA Review P2 #2：是否优先复试导师场景）
- 跨页面信息重复审计（RC3.3 IA Review P2 #5：Skills vs Projects vs Resume 能力描述）
- 全站 page__hint / .xxx__header 一致性最终确认
- IA Review 报告

**验收标准**：
- typecheck + build + Playwright 三项全过
- NavBar 顺序经用户确认
- IA Review 无 P0/P1 问题

### 7.6 RC8 — Final Release v3.0.0

**目标**：全站最终审计 + v3.0.0 发布。

**预期工作**：
- 全站一致性审计（Code/Design/Performance/IA 四维度）
- Core Web Vitals 验证（LCP < 2.5s / INP < 200ms / CLS < 0.1）
- WCAG AA 可访问性检查
- Bundle 体积最终对比
- 版本号 2.0.0 → 3.0.0
- 创建 v3.0.0 Git Tag
- 推送 origin/master
- Vercel 部署验证

**验收标准**：
- typecheck + build + Playwright 三项全过
- Core Web Vitals 全部达标
- WCAG AA 全部通过
- v3.0.0 Tag 创建并推送
- Vercel 部署成功

### 7.7 整体顺序（Portfolio v3 Roadmap）

```
═══════════════════════════════════════════════════════════════
  Portfolio v3 Roadmap（RC4 → RC8，2026-07-17 用户批准）
═══════════════════════════════════════════════════════════════

【已完成】
  RC1 ✅ 真实性 + 架构稳定（Timeline SSOT）
  RC2 ✅ 视觉升级 + 组件化（ProjectDetail / v2.0.0 已发布）
  RC3 ✅ About 页面重构（人物画像：RC3.1 数据层 + RC3.2 视觉 + RC3.3 Final Review + IA Review）
  RC4.1 ✅ 全局基础 + Skills 试点（.page__header 工具类 + Skills categories 卡片网格）

【进行中】RC4 — 全局基础 + Skills 试点
  RC4.1 ✅ 数据层 + 视觉重构（本地未 commit）
  RC4.2 ⏳ Final Review（待用户批准）

【待推进】
  RC5 ──── Resume 深化（视觉层次 + PDF 优化 + subtitle 统一）
  RC6 ──── Interview + AiPractice 深化（共用 .page__header + Q&A/案例展示）
  RC7 ──── 信息架构 + 全局导航优化（NavBar 顺序决策 + 跨页面职责确认）
  RC8 ──── Final Release v3.0.0
            · 全站一致性审计（Code/Design/Performance/IA）
            · Core Web Vitals 验证
            · WCAG AA 可访问性检查
            · v3.0.0 发布（版本号 2.0.0 → 3.0.0 + Git Tag）

═══════════════════════════════════════════════════════════════
```

### 7.8 关键原则

1. **《Portfolio v3 Roadmap》为唯一开发计划**，禁止自行修改或重新规划
2. **每个 RC 子阶段完成后必须执行三项验证**（typecheck + build + Playwright）
3. **每个 RC 子阶段完成后必须输出 Report**，等待用户批准才能进入下一子阶段
4. **RC4~RC7 不发布新版本**，仅推送 origin/master；**RC8 统一发 v3.0.0 Final Release**
5. **冲突必须暴露**：如发现 Roadmap 与实际情况存在冲突，不得直接修改设计，应先分析影响、提出建议并等待用户批准
6. **每次开始新的 RC 前**，先根据 §0 SNAPSHOT 和本章节自动恢复上下文，不需要用户重复说明项目状态

---

## 八、当前已知问题

### 8.1 技术债

| # | 问题 | 严重度 | 处理建议 |
|---|---|---|---|
| 1 | Shiki singleton 警告（构建时输出"10 instances have been created. Shiki is supposed to be used as a singleton"） | 低 | 构建时已知问题，非运行时错误。Playwright Test 16 已通过 `consoleErrors.filter((e) => !e.includes('Shiki'))` 过滤。后续可重构 markdown.ts 缓存 highlighter 实例 |
| 2 | `git config user.name` 历史值显示乱码（如 v2.0.0 tag 的 tagger name 显示为"璧栫澘轿"） | 低 | 历史问题，v1.0.0 tag 也有。是 PowerShell GBK 编码问题，不影响实际使用。**禁止自动修改 git config**（环境维护原则） |
| 3 | RC4.1 改动尚未 commit（7 个文件：1 新建 + 6 修改） | 中 | 待用户批准 RC4.1 后 commit + 推送 origin/master（RC4~RC7 不发新版本，仅推送 origin） |

### 8.2 待确认事项

| # | 事项 | 处理建议 |
|---|---|---|
| 1 | **RC4~RC8 开发计划** | ✅ **已确认**：《Portfolio v3 Roadmap》已由用户批准为唯一开发计划（见 §七） |
| 2 | About 页是否需要展示 Email | **用户已决定**：暂不公开，仅保留 GitHub（见 §5.5） |
| 3 | 后续 RC 阶段是否仍消耗 ≤2 新组件配额 | **是**（已用 1 个，剩余 1 个，见 §5.4；RC4.1 未消耗） |
| 4 | RC4.2 是否在用户批准后立即开始 | ⏳ 待用户批准 RC4.1 后进入 RC4.2 |

### 8.3 暂不处理的问题

- **Google Fonts CDN 国内访问**：已用 `preconnect` + `display=swap` 优化，未来可评估自托管字体子集（不在当前 RC 范围）
- **未配置 ESLint / Prettier**：依赖 TypeScript strict 模式保证代码质量，未来可添加（不在当前 RC 范围）
- **文档版本号不一致**：《开发设计规范-v1.0.md》文件名为 v1.0 但内容为 v1.1，以《架构确认文档-v1.2.md》为权威

### 8.4 未来优化点

- Shiki highlighter 单例化（减少构建警告）
- About.vue 重构后可考虑提取 FactsPanel 为独立组件（若 RC3+ 其他页面也需类似面板）— 但需消耗新组件配额
- 字体自托管子集（性能优化）
- 全站 Lighthouse / Core Web Vitals 自动化测试

---

## 九、开发约束

### 9.1 依赖约束

- **禁止引入新依赖**（运行时 + 开发时），除非用户明确批准
- **禁止**：Element Plus / Naive UI / Tailwind / UnoCSS / Pinia / Vuex / Nuxt / GSAP / 后端 / 数据库 / 运行时 Markdown 解析
- 当前依赖清单见 [package.json](package.json)（3 运行时 + 9 开发时），不得擅自增加

### 9.2 SSOT 约束

- **Markdown 是唯一数据源**，禁止创建第二数据源
- **frontmatter 字段必须向后兼容**，新增字段必须可选
- **Timeline 数据 SSOT 在 `src/content/growth/timeline.md`**，Home 从 SSOT 读取
- **About 保持独立内容**，不共享 Timeline

### 9.3 风格约束

- **遵循 Developer Academic 风格**
- **禁止营销文案 / AI 风格文案**（Hero 仅 Who/What/Why/Next/Metrics）
- **配色不更换**（Slate + Amber）
- **字体不更换**（Inter + JetBrains Mono）
- **Eyebrow 全站统一 `letter-spacing: 0.08em`**
- **禁止硬编码颜色值**（必须用 `var(--*)` 设计令牌）
- **禁止用 accent border 作为视觉权重**

### 9.4 组件约束

- **新增组件总配额 ≤2**（已用 1 个：ArchitectureDiagram；剩余 1 个）
- **所有新组件必须小且单一职责**
- **禁止为单次使用做抽象**

### 9.5 RC 阶段约束

- **禁止新增业务功能**（除非用户明确要求）
- **禁止新增页面 / 动画 / Design Token / 颜色系统 / 字体 / 抽象**（除非用户明确要求）
- **子阶段必须串行执行**：RC3.1 → RC3.2 → RC3.3，禁止跳阶段
- **每个子阶段完成后必须执行 typecheck + build + Playwright 三项验证**，全过才能进入下一阶段
- **每个子阶段完成后必须输出 Report**（修改文件 / 数据流 / 风险 / Bundle / 验证结果），等待用户批准

### 9.6 Git 约束

- **禁止自动 push**（除非用户明确要求）
- **禁止** `git push --force` / `git reset --hard` / `git clean -fdx` / `git rebase -i`（除非用户明确确认）
- **禁止修改 main / master / production 分支历史**
- **Commit 消息格式**：`<type>: <description>`，type ∈ feat / fix / refactor / docs / test / chore / perf / ci / style
- **禁止推送隐私内容**（API Key / Token / 学号 / 手机号 / 实习材料）
- **PowerShell 限制**：不支持 heredoc；GBK 编码会导致非 ASCII 字符乱码，**Git Tag message 应使用纯 ASCII**（参考 v2.0.0 tag 的处理）

### 9.7 环境维护约束

- **禁止自动修改 PATH / NODE_PATH / 环境变量 / 系统配置**
- **禁止自动安装 / 卸载 / 升级 / 重装 Node.js / npm / 全局工具**
- **修改系统环境前必须先分析影响范围并明确征求确认**
- **优先采用可回滚、影响最小的方案**
- **删除文件前必须先 grep 确认无引用**
- **不追整洁**：不得因追求"环境整洁"删除仍可用于回滚或恢复的文件

### 9.8 失败显性化约束

- **错误必须抛出 / 返回 / 上报**，禁止吞掉或藏于默认值
- **批处理跳过时**：跳过数量和原因要在输出中展示，不得埋日志
- **不能 100% 确认成功时**：必须明确说明，禁止默认成功

### 9.9 冲突暴露约束

- **代码库存在矛盾模式时**：明确指出冲突（如"A 用 X，B 用 Y，新代码该用哪个？"），等待人类决策，**绝不混合或自行选择**
- **运行时冲突自检测**：规则冲突 / Agent 文件冲突 / Skill 重复触发 / MCP 工具冲突 → 暂停并输出冲突报告

---

## 十、AI 接手说明（项目生命周期通用）

> **本章节适用于项目生命周期内任何阶段的新 AI 接手**（不仅限于 RC3）。
>
> 无论是 RC3、RC4、RC5，还是 RC8 后的维护阶段，都应遵循本章节的流程。

### 10.1 假设

新 AI 完全没有任何项目上下文。**仅阅读本文件（HANDOFF.md）一份文档**，即可继续整个项目后续开发，无需翻阅历史对话，无需重新分析整个项目。

**优先阅读顺序**：
1. **§0 PROJECT STATUS SNAPSHOT**（快速恢复上下文，1 分钟）
2. **§五 FROZEN INVENTORY**（了解什么不能动，2 分钟）
3. **§六 当前开发进度** + **§七 后续开发路线**（了解下一步，2 分钟）
4. 必要时再深入其他章节

### 10.2 接手后第一步：环境验证

```bash
# 1. 确认环境
node --version   # 需 ≥18（当前 v22.19.0）
npm --version    # 需 ≥9（当前 v11.18.0）

# 2. 确认 Git 状态
git branch --show-current   # 应为 master
git status                  # 应为 clean
git log --oneline -3        # 最新 commit 应为 c8b7913 (RC3.1)
git tag -l                  # 应有 v0.3.0 / v0.4.0 / v0.5.0 / v1.0.0 / v2.0.0

# 3. 恢复依赖
npm install

# 4. 验证可运行
npm run typecheck   # 应通过（exit 0）
npm run build       # 应成功（1664 模块，约 2.5s）
npm run dev         # 启动 localhost:5173

# 5. 验证测试（需先启动 preview 在 4180 端口）
npm run preview -- --port 4180 --strictPort   # 另一终端
npm test                                       # 应 48/48 通过
```

### 10.3 接手后第二步：理解当前状态

1. **阅读 §0 PROJECT STATUS SNAPSHOT**，确认当前阶段、最新 Commit、Git 状态、组件配额等关键信息
2. **如本地领先远程**：询问用户是否先推送未推送的 commit 到 origin，或继续本地开发
3. **如当前阶段为"待批准"**：不要自动开始下一阶段，先询问用户是否批准进入下一阶段
4. **如当前阶段为"进行中"**：根据 §七 后续开发路线继续推进，但每完成一个子阶段必须暂停并输出 Report

### 10.4 之后按什么顺序继续

**通用流程**（适用于项目生命周期任何阶段）：

```
1. 阅读 §0 SNAPSHOT，确认当前阶段
    ↓
2. 询问用户是否批准进入下一阶段（或是否先推送本地 commit）
    ↓
3. 执行下一阶段（参考 §七 后续开发路线）
    ↓
4. 完成后执行三项验证（typecheck + build + Playwright）
    ↓
5. 输出 Report（修改文件 / 数据流 / 风险 / Bundle / 验证结果）
    ↓
6. 等待用户批准进入下一子阶段
    ↓
7. 循环回到步骤 1
```

**RC3 → RC8 推进顺序**（详见 §七）：
- RC3.2 → RC3.3 → 询问用户确认 RC4 范围 → RC4 → RC5 → RC6 → RC7 → RC8
- **每个 RC 阶段开始前必须由用户批准**，禁止 AI 自行决定下一阶段范围

### 10.5 哪些内容不要重新设计

**所有冻结决策已统一汇总至 [§五 FROZEN INVENTORY](#五不要重复设计不要重复开发--已冻结决策清单frozen-inventory)**。

新 AI 接手后，**禁止重新设计或重复开发** §五 列出的任何项目。如需修改，必须：
1. 先向用户提出修改建议（含理由 + 影响范围 + 替代方案）
2. 等待用户明确批准
3. 修改后更新 §五 FROZEN INVENTORY 清单

**冲突暴露原则**：如发现代码库存在与冻结决策矛盾的模式，**暂停并输出冲突报告**，等待人类决策，**绝不混合或自行选择**。

### 10.6 哪些内容已冻结（不可改）

详见 [§五 FROZEN INVENTORY](#五不要重复设计不要重复开发--已冻结决策清单frozen-inventory) 汇总表。核心冻结项：

- **架构**：以《架构确认文档-v1.2.md》为准，已锁定
- **设计规范**：已锁定，RC 阶段禁止修改
- **当前 8 个虚拟模块**：不再新增、不重命名
- **当前 v2.0.0 已发布内容**：RC3+ 只能在其上增量改进，不推翻重做
- **当前 4 项 About facts**：教育 / 方向 / 考研 / GitHub（不放易变数据）

### 10.7 必须遵守的工作流

1. **每个 RC 子阶段完成后暂停**，输出 Report，等待用户确认，**不得自动进入下一子阶段**
2. **不得提前开发后续 RC 内容**（如 RC3.2 不实现 RC3.3 的 IA Review）
3. **重大修改需先报告并等待确认**（技术栈 / 页面结构 / 目录结构 / 设计原则 / 新增依赖 / .gitignore / Git 工作流）
4. **冲突必须暴露，不自行折中** — 发现文档冲突或代码矛盾时，暂停并报告
5. **长任务需要检查点**：超过 3 步或改超过 3 个文件的任务，每步都要总结进度

### 10.8 权威文档优先级

如遇冲突，按以下优先级判断：

1. **本文件（HANDOFF.md）** — 最终交接文档，最高权威
2. 《架构确认文档-v1.2.md》— 架构锁定版
3. [AI_RULES.md](AI_RULES.md) — AI 协作规范
4. [PROJECT_MEMORY.md](PROJECT_MEMORY.md) — Task 执行历史与决策
5. 《开发设计规范-v1.0.md》（内容为 v1.1，参考用）
6. 《个人能力分析与网站规划报告.md》（v1.0，背景资料）

**注意**：本文件已整合 PROJECT_CONTEXT.md 与历史 HANDOFF.md 的全部必要信息。PROJECT_CONTEXT.md 内容已过时（停留在 Task 008 阶段），新 AI **不需要阅读 PROJECT_CONTEXT.md**。

### 10.9 重要提醒（项目生命周期通用）

- **本文件是项目生命周期的长期交接文档**，不限于某个 RC 阶段
- **每次完成 RC 子阶段或重大变更后**，应同步更新本文件（特别是 §0 SNAPSHOT 和 §五 FROZEN INVENTORY）
- **接手后第一句话应是询问用户**：基于 §0 SNAPSHOT 的"下一步动作"字段，提出对应的确认问题（例如：「是否批准进入下一阶段？」「是否先推送本地 commit？」）
- **禁止假设用户意图**：如果用户指令不明确，先问清楚再行动
- **禁止自动 push / 自动 commit**：除非用户明确要求
- **禁止跨阶段提前开发**：当前在 RC3 阶段，不要实现 RC4+ 内容
- **本文件优先级最高**：如与其他文档冲突，以本文件为准（详见 §10.8）

---

> **本文件是整个项目的最终交接文档，适用于项目生命周期任何阶段。**
>
> 以后所有开发均以本文件作为唯一项目上下文。
>
> 本文件由原 AI 于 2026-07-17 RC3.1 完成后编写，并通过结构性调整使其成为项目长期交接文档。
>
> 新 AI 接手后应根据项目演进持续更新本文件（特别是 §0 SNAPSHOT 和 §五 FROZEN INVENTORY）。
