# 项目交接文档（HANDOFF.md）

> **本文件是整个项目的最终交接文档。**
>
> 任何 AI（Trae / GLM / Claude Code / Codex / ChatGPT 等）接手本项目时，**仅阅读本文件即可获得全部上下文**，无需重新分析整个项目，无需翻阅历史对话。
>
> 以后所有开发均以本文件作为唯一项目上下文。
>
> 最后更新：2026-07-17
> 当前阶段：**RC7 In Progress（Final Polish）** — 用户 2026-07-17 批准 RC7 重新定位为 Final Polish（不再执行 IA + Nav 优化）
> **开发计划**：《Portfolio v3 Roadmap》已由用户批准为 RC4~RC8 唯一开发计划（详见 §七）；**RC7 定位于 2026-07-17 经用户调整**，从"IA + Nav 优化"改为"Final Polish（最终打磨）"，依据为 RC7 Design Review 结论（详见 [RELEASE_REVIEW_REPORT.md §24](RELEASE_REVIEW_REPORT.md)）
> **执行规则**（2026-07-17 用户调整）：每个 RC 包含完整生命周期（开发 → 验证 → Review → 文档 → Commit → Push → Report），Review 作为收尾工作不再单独拆分子阶段；RC5~RC8 保持结构一致

---

## 0. PROJECT STATUS SNAPSHOT（快速恢复上下文）

> 新会话开始时，**只需阅读本节即可快速恢复上下文**。详细内容见后续章节。

| 项 | 值 |
|---|---|
| **项目名称** | 软件工程学生技术作品集（Portfolio v2.0） |
| **当前阶段** | **RC7 Completed（Final Polish）** — 开发 + 验证 + Review 全部完成，待 commit + push |
| **下一阶段** | RC8 — Final Release v3.0.0（全站最终审计 + v3.0.0 发布） |
| **项目版本** | `2.0.0`（[package.json](package.json)）— RC4~RC7 不发新版本，RC8 统一发 v3.0.0 |
| **最新 Commit** | `92a605a` — `feat(rc6): interview and ai-practice page header utility adoption`（已推送 origin） |
| **最新 Tag** | `v2.0.0`（RC2 Release，commit `20598ae`，已推送 origin） |
| **本地 vs 远程** | **同步**（origin/master = `92a605a`）；RC7 改动待 commit |
| **工作区状态** | dirty（6 个文件：resume/index.md + about.md + index.html + release-gate-task-005.mjs + robots.txt + sitemap.xml，待 commit）+ HANDOFF.md + RELEASE_REVIEW_REPORT.md 文档更新 |
| **当前分支** | `master`（受保护，禁止直接 push 历史） |
| **组件配额** | 已用 **1**（ArchitectureDiagram.vue）/ 剩余 **1** / 上限 **2**（RC5 + RC6 + RC7 均未消耗） |
| **虚拟模块数** | 8 个（已定型，不再新增） |
| **测试基线** | Playwright **74/74** 通过（[release-gate-task-005.mjs](release-gate-task-005.mjs)）— RC7 Resume subtitle 断言更新（"软件工程方向" → "分布式系统"） |
| **构建基线** | 1662 模块，2.49s（gzip 主包 41.87 KB）— RC7 零回归（-0.01 KB） |
| **线上地址** | https://lai-portfolio-xi.vercel.app（Vercel 自动部署，origin/master 触发） |
| **技术栈** | Vue 3.5+ / TypeScript 5.6.3 strict / Vite 6.4.3 / Vue Router 4.5+ |
| **风格定位** | Developer Academic（Slate + Amber，Inter + JetBrains Mono） |
| **核心约束** | Markdown SSOT / 不新增依赖 / 不新增组件（除非消耗配额）/ 每 RC 完整生命周期 |
| **RC3 Baseline** | ✅ **冻结**（不再修改 RC3 内容，除非后续发现 P0/P1 缺陷）— RC7 未解冻 |
| **RC4 Baseline** | ✅ **冻结**（不再修改 RC4 内容，除非后续发现 P0/P1 缺陷） |
| **RC5 Baseline** | ✅ **冻结**（不再修改 RC5 内容，除非后续发现 P0/P1 缺陷） |
| **RC6 Baseline** | ✅ **冻结**（不再修改 RC6 内容，除非后续发现 P0/P1 缺陷） |
| **RC7 状态** | ✅ **完成**（Final Polish：Content Accuracy + SEO 基础资源 + 文案一致性 + a11y 验证） |
| **下一步动作** | commit + push RC7 → 输出 RC7 Final Report → 等待批准进入 RC8（Final v3.0.0） |
| **完整 Roadmap** | RC4（全局基础+Skills，已完成）→ RC5（Resume，已完成）→ RC6（Interview+AiPractice，已完成）→ RC7（Final Polish，已完成）→ RC8（Final v3.0.0）（详见 §七） |
| **执行规则** | 每个 RC 完整生命周期：开发 → 验证 → Review → 文档 → Commit → Push → Report（不再拆 RC.x 子阶段） |
| **冻结清单** | 详见 §五（FROZEN INVENTORY） |
| **RC3.3 Final Review** | 详见 [RELEASE_REVIEW_REPORT.md §18](RELEASE_REVIEW_REPORT.md)（Code/Design/Performance/IA Review + P1 修复 + 5 项 P2 建议） |
| **RC4 Report** | 详见 [RELEASE_REVIEW_REPORT.md §20](RELEASE_REVIEW_REPORT.md)（RC4 开发报告）+ [§21](RELEASE_REVIEW_REPORT.md)（RC4 Final Review） |
| **RC5 Report** | 详见 [RELEASE_REVIEW_REPORT.md §22](RELEASE_REVIEW_REPORT.md)（RC5 Final Review — Resume 深化） |
| **RC6 Report** | 详见 [RELEASE_REVIEW_REPORT.md §23](RELEASE_REVIEW_REPORT.md)（RC6 Final Review — Interview + AiPractice 深化） |

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
- **本地与远程**：**同步**（origin/master = `92a605a`）；RC7 改动待 commit
- **远程 `origin/master`**：`92a605a`（RC6 Interview + AiPractice 深化 commit，已包含 RC1 + RC2 + RC3 + RC4 + RC5 + RC6 全部内容）
- **最新 Tag**：`v2.0.0`（RC2 Release，RC3 + RC4 + RC5 + RC6 + RC7 均不发新 tag，RC8 时统一升级 v3.0.0）

### 1.7 Git 状态

```
On branch master
Your branch is up to date with 'origin/master'.   ← RC6 已同步，RC7 待 commit
Changes not staged for commit:
        modified:   HANDOFF.md                       ← RC7 文档同步（§0 + §1.6/1.7 + §2.8 + §6.1/6.2 + §7.5/7.7）
        modified:   index.html                       ← RC7 SEO meta 增量（robots / canonical / og:url / og:site_name / twitter:title/description）
        modified:   release-gate-task-005.mjs        ← RC7 Test 7 Resume subtitle 断言更新
        modified:   src/content/personal/about.md    ← RC7 About facts 考研字段："2026 届" → "2027 考研"
        modified:   src/content/resume/index.md      ← RC7 Resume subtitle："软件工程方向" → "分布式系统"
        new file:   public/robots.txt                ← RC7 SEO 基础资源（新建）
        new file:   public/sitemap.xml               ← RC7 SEO 基础资源（新建，9 条路由）
        modified:   RELEASE_REVIEW_REPORT.md         ← RC7 §24 Final Review（待追加）
```

**最近 6 个 commit**：
```
92a605a feat(rc6): interview and ai-practice page header utility adoption  ← origin/master = HEAD
a0c4002 feat(rc5): resume subtitle ssot and page header utility adoption
6ab0a3b docs(rc4): final review with P1 fix and execution rule adjustment
caff817 feat(rc4.1): rebuild skills page with structured categories and global page header utility
bfb070e docs: append RC3 Release Summary (Section 19)
8b45a28 docs: mark RC3 baseline frozen and origin/master synced
```

**所有 Tag**：`v0.3.0` / `v0.4.0` / `v0.5.0` / `v1.0.0` / `v2.0.0`

**RC3 Baseline 状态**：✅ **冻结**（不再修改 RC3 内容，除非后续发现 P0/P1 缺陷）— RC7 未解冻

**RC4 Baseline 状态**：✅ **冻结**（不再修改 RC4 内容，除非后续发现 P0/P1 缺陷）

**RC5 Baseline 状态**：✅ **冻结**（不再修改 RC5 内容，除非后续发现 P0/P1 缺陷）

**RC6 Baseline 状态**：✅ **冻结**（不再修改 RC6 内容，除非后续发现 P0/P1 缺陷）

**RC7 状态**：✅ **完成**（Final Polish：开发 + 验证 + Review 全部完成，待 commit + push）

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

### 2.5 RC4 — 全局基础 + Skills 试点（2026-07-17，已完成）

**设计目标**：以《Portfolio v3 Roadmap》为唯一开发计划，RC4 承担"全局基础设施 + Skills 试点"双重职责：
1. **全局基础**：建立 `.page__header` / `.page__subtitle` 工具类（CSS utility，非新组件），为 RC5/RC6 子页面统一 Header 模式铺路；同时消除 Skills 页 `page__hint` 硬编码，验证 SSOT 模式可推广
2. **Skills 试点**：将技术栈从 Markdown body 迁移至 frontmatter.categories（结构化数据），建立"frontmatter 结构化 + body 叙事"的双层信息架构，与 About.md 模式对齐

**RC4 完整生命周期**（按 2026-07-17 调整后的执行规则）：

| 阶段 | 状态 | 主要交付 |
|---|---|---|
| 开发 | ✅ 完成（commit `caff817`） | SkillsContent 类型扩展（subtitle + categories）+ scanSkills 解析 + skills/index.md 重组 + .page__header/.page__subtitle 工具类 + Skills.vue 重构 + Playwright Test 6 扩展（+10 项断言） |
| 验证 | ✅ 完成 | typecheck + build + Playwright 65/65 全过 |
| Review | ✅ 完成 | Code Review（0 问题）+ Design Audit（P1 修复：--leading-relaxed → --leading-normal；P2 记录：5 页 eyebrow 缺 `//` 前缀，留 RC7）+ Performance Audit（0 问题） |
| 文档更新 | ✅ 完成 | HANDOFF.md + RELEASE_REVIEW_REPORT.md §21 同步 |
| Commit + Push | ⏳ 待执行 | 收尾 commit + 推送 origin/master |
| RC4 Final Report | ⏳ 待输出 | 等待批准进入 RC5 |

**RC4 开发阶段修改文件（7 个，1 新建 + 6 修改）：**

| 文件 | 类型 | 改动 |
|---|---|---|
| `src/types/skills.ts` | ★ 新建 | SkillsContent + SkillCategory 接口（subtitle? + categories?） |
| `src/utils/content.ts` | 修改 | scanSkills 返回类型改为 SkillsContent，新增 subtitle + categories 解析逻辑 |
| `src/env.d.ts` | 修改 | virtual:skills-content 类型声明改用 SkillsContent |
| `src/content/skills/index.md` | 修改 | frontmatter 新增 subtitle + 6 项 categories；body 移除"## 技术栈" section |
| `src/styles/global.css` | 修改 | 新增 `.page__header` / `.page__subtitle` 工具类（CSS utility，非组件） |
| `src/pages/Skills.vue` | 修改 | 完全重写：应用工具类 + categories 卡片网格（6 个分类）+ 移除 scoped header CSS |
| `release-gate-task-005.mjs` | 修改 | Test 6 扩展：subtitle 渲染 + page__hint 消除 + page__header 应用 + 6 分类卡片 + 6 分类名称验证 |

**RC4 全程约束遵守：**
- 新增组件配额：0/2（RC4 未新增组件，仍剩 1 个）
- 新增第三方依赖：0
- 新增 Design Token / 颜色 / 字体 / 动画：0
- Markdown SSOT 保持：是（skills/index.md 为唯一数据源）
- 隐私扫描清洁：0 手机号 / 0 真实密钥

**RC4 验证结果：**
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

### 2.6 RC5 — Resume 深化（2026-07-17，已完成）

**设计目标**：以《Portfolio v3 Roadmap》为唯一开发计划，RC5 承担"Resume 页 subtitle SSOT 化 + 视觉层次统一 + PDF 打印优化"三项职责，对齐 RC4 建立的 `.page__header` / `.page__subtitle` 工具类模式，并完成 RC3.3 IA Review P2 #1（About subtitle vs Resume 开场白 framing 对齐）。

**RC5 完整生命周期**（按 2026-07-17 调整后的执行规则，不再拆子阶段）：

| 阶段 | 状态 | 主要交付 |
|---|---|---|
| 开发 | ✅ 完成 | ResumeContent 类型扩展（subtitle?）+ scanResume 解析 subtitle + resume/index.md 重组（frontmatter subtitle + body 删除首行）+ Resume.vue 应用 .page__header / .page__subtitle + 打印 CSS 更新 + Playwright Test 7 扩展（+3 项断言） |
| 验证 | ✅ 完成 | typecheck + build + Playwright 68/68 全过 |
| Review | ✅ 完成 | Code Review（0 问题）+ Design Audit（0 P0/P1，1 P2 记录：5 页 eyebrow 缺 `//` 前缀，留 RC7）+ Performance Audit（0 问题） |
| 文档更新 | ✅ 完成 | HANDOFF.md + RELEASE_REVIEW_REPORT.md §22 同步 |
| Commit + Push | ⏳ 待执行 | 收尾 commit + 推送 origin/master |
| RC5 Final Report | ⏳ 待输出 | 等待批准进入 RC6 |

**RC5 开发阶段修改文件（5 个，0 新建 + 5 修改）：**

| 文件 | 类型 | 改动 |
|---|---|---|
| `src/types/resume.ts` | 修改 | ResumeContent 新增 `subtitle?: string` 可选字段 |
| `src/utils/content.ts` | 修改 | scanResume 解析 subtitle（`data.subtitle ? String(data.subtitle) : undefined`） |
| `src/content/resume/index.md` | 修改 | frontmatter 新增 `subtitle: 软件工程学生 · 后端开发 · 软件工程方向`；body 删除首行重复定位（`**软件工程学生 · 后端开发 / 软件工程方向**`） |
| `src/pages/Resume.vue` | 修改 | 应用 `.page__header resume__header` 双类（视觉 + 打印钩子）+ `.page__subtitle` 替换硬编码 `page__hint` + scoped CSS 移除 `.resume__header` 重复块 + 打印 CSS `.page__hint` → `.page__subtitle` |
| `release-gate-task-005.mjs` | 修改 | Test 7 新增 3 项断言：subtitle 渲染 + page__hint 消除 + page__header 应用 |

**RC5 全程约束遵守：**
- 新增组件配额：0/2（RC5 未新增组件，仍剩 1 个）
- 新增第三方依赖：0
- 新增 Design Token / 颜色 / 字体 / 动画：0
- Markdown SSOT 保持：是（resume/index.md 为唯一数据源）
- 隐私扫描清洁：0 手机号 / 0 真实密钥
- env.d.ts 无需修改（已通过 `ResumeContent` 类型继承 subtitle 字段）

**RC5 验证结果：**
- ✅ typecheck 通过（exit 0）
- ✅ build 通过（1664 模块，2.50s，gzip 主包 41.89 KB — 与 RC4 一致）
- ✅ Playwright **68/68** 通过（RC4 是 65/65，新增 3 项断言全部通过）
- ✅ Bundle 体积变化：Resume.js 5.17 kB / gzip 2.95 kB（与 RC4 持平，仅新增 subtitle 字段读取，影响 <100 bytes）；Resume.css 1.87 kB / gzip 0.62 kB

**RC3.3 IA Review P2 建议处理进度（RC5 更新）：**

| # | 建议 | 建议时机 | RC5 处理 |
|---|---|---|---|
| 1 | 统一 About subtitle 与 Resume 开场白 framing | RC5 | ✅ **已完成**：Resume subtitle "软件工程学生 · 后端开发 · 软件工程方向" 与 About subtitle "软件工程学生 · 后端开发 · 分布式系统" 共享前缀，分隔符统一为 "·"；后缀差异合理（Resume = 学生身份与方向，About = 研究方向，符合 RC3.3 IA Review "页面职责互补"原则） |

**为什么这样设计：**

- **subtitle 移至 frontmatter SSOT**。与 RC3.1（About）/ RC4.1（Skills）模式对齐，消除 Resume.vue 中 page__hint 硬编码
- **保留 `.resume__header` 双类策略**。`.page__header` 提供视觉样式，`.resume__header` 作为打印 CSS 钩子（精确控制打印时元素隐藏），不能仅依赖全局工具类
- **subtitle 内容 "软件工程学生 · 后端开发 · 软件工程方向"**。前缀 "软件工程学生 · 后端开发" 与 About 一致；后缀 "软件工程方向" 区别于 About 的 "分布式系统"，体现 Resume（学生身份 + 方向）vs About（研究方向）的职责差异
- **body 删除首行 `**软件工程学生 · 后端开发 / 软件工程方向**`**。原 body 首行与 subtitle 内容重复，且分隔符不统一（`/` vs `·`）；移除后由 subtitle 统一渲染
- **打印 CSS `.page__hint` → `.page__subtitle`**。同步模板改动，确保打印时正确隐藏 subtitle
- **不引入结构化字段（如 Skills categories）**。Resume 是叙事型内容（教育 / 实习 / 项目 / 能力），结构化字段会违反"最小修改"原则，无明确收益

### 2.7 RC6 — Interview + AiPractice 深化（2026-07-17，已完成）

**设计目标**：以《Portfolio v3 Roadmap》为唯一开发计划，RC6 承担"两页共用 .page__header 工具类 + subtitle SSOT 化（AiPractice）+ subtitle 动态计算统一（Interview）+ page__hint 全站消除"四项职责，完成 RC3.3 IA Review P2 #3（4 子页面 page__hint → SSOT）和 P2 #4（3 子页面 .xxx__header → .page__header）。

**RC6 完整生命周期**（按 2026-07-17 调整后的执行规则，不再拆子阶段）：

| 阶段 | 状态 | 主要交付 |
|---|---|---|
| 开发 | ✅ 完成 | AiPracticeContent 类型扩展（subtitle?）+ scanAiPractice 解析 subtitle + ai-practice/index.md frontmatter 新增 subtitle + AiPractice.vue 应用 .page__header / .page__subtitle + Interview.vue 应用 .page__header / .page__subtitle（动态计算）+ 两页移除 scoped .xxx__header + Playwright Test 3 + Test 5 各新增 3 项断言 |
| 验证 | ✅ 完成 | typecheck + build + Playwright 74/74 全过 |
| Review | ✅ 完成 | Code Review（0 P0/P1，1 P2 记录：.xxx__header 类名一致性冲突，留 RC7）+ Design Audit（0 P0/P1，1 P2 记录：5 页 eyebrow 缺 // 前缀，留 RC7）+ Performance Audit（0 问题） |
| 文档更新 | ✅ 完成 | HANDOFF.md + RELEASE_REVIEW_REPORT.md §23 同步 |
| Commit + Push | ⏳ 待执行 | 收尾 commit + 推送 origin/master |
| RC6 Final Report | ⏳ 待输出 | 等待批准进入 RC7 |

**RC6 开发阶段修改文件（6 个，0 新建 + 6 修改）：**

| 文件 | 类型 | 改动 |
|---|---|---|
| `src/types/ai-practice.ts` | 修改 | AiPracticeContent 新增 `subtitle?: string` 可选字段 |
| `src/utils/content.ts` | 修改 | scanAiPractice 解析 subtitle（`data.subtitle ? String(data.subtitle) : undefined`） |
| `src/content/ai-practice/index.md` | 修改 | frontmatter 新增 `subtitle: 不是 AI 帮我写代码，是我用 AI 加速了哪些环节，我独立完成了哪些决策` |
| `src/pages/AiPractice.vue` | 修改 | 应用 `.page__header ai-practice__header` 双类 + `.page__subtitle` 替换硬编码 `page__hint` + 移除 scoped `.ai-practice__header` 块（含 `//` 前缀和 `mono` 类） |
| `src/pages/Interview.vue` | 修改 | 应用 `.page__header interview__header` 双类 + `.page__subtitle` 替换 `page__hint`（保留动态计算分类数 + 问题数）+ 移除 scoped `.interview__header` 块（含 `//` 前缀和 `mono` 类） |
| `release-gate-task-005.mjs` | 修改 | Test 3（面试页）+ Test 5（AI 实践页）各新增 3 项断言：subtitle 渲染 + page__hint 消除 + page__header 应用 |

**RC6 全程约束遵守：**
- 新增组件配额：0/2（RC6 未新增组件，仍剩 1 个）
- 新增第三方依赖：0
- 新增 Design Token / 颜色 / 字体 / 动画：0
- Markdown SSOT 保持：是（ai-practice/index.md 为 AiPractice 唯一数据源；interview/*.md 不修改）
- 隐私扫描清洁：0 手机号 / 0 真实密钥
- env.d.ts 无需修改（已通过 `AiPracticeContent` 类型继承 subtitle 字段）

**RC6 验证结果：**
- ✅ typecheck 通过（exit 0）
- ✅ build 通过（1662 模块，2.54s，gzip 主包 41.88 KB — 比 RC5 减少 2 模块，因两页移除空 scoped style 块）
- ✅ Playwright **74/74** 通过（RC5 是 68/68，新增 6 项断言全部通过）
- ✅ Bundle 体积变化：
  - AiPractice.js 3.85 kB / gzip 2.11 kB（移除 scoped CSS 后略减）
  - Interview.js 14.93 kB / gzip 6.87 kB（与 RC5 持平）
  - AiPractice.css 不再单独列出（已合并到主包）
  - Interview.css 2.14 kB / gzip 0.68 kB（与 RC5 一致 — InterviewCategory 组件 CSS 保留）
  - 主包 index.js 107.78 kB / gzip 41.88 kB（与 RC5 一致）

**RC3.3 IA Review P2 建议处理进度（RC6 更新）：**

| # | 建议 | 建议时机 | RC6 处理 |
|---|---|---|---|
| 3 | 4 子页面 page__hint → SSOT | RC4-RC7 | ✅ **已完成**（Skills RC4.1 + Resume RC5 + AiPractice RC6 + Interview RC6 = 4/4 页全部消除 page__hint） |
| 4 | 3 子页面 .xxx__header → .page__header | RC8（Final Review） | ✅ **已完成**（Skills RC4.1 + Resume RC5 + AiPractice RC6 + Interview RC6 = 4/4 页全部应用 .page__header；About.vue 保留 scoped，RC3 冻结） |

**为什么这样设计：**

- **AiPractice 完整 SSOT 化**。与 RC3.1（About）/ RC4.1（Skills）/ RC5（Resume）模式对齐，subtitle 从 frontmatter 读取
- **Interview 保留动态计算**。Interview 是多文件聚合页（4 个分类文件），subtitle 包含动态数据（分类数 + 问题数），不适合静态 SSOT 化。这是合理的架构选择，不是缺陷
- **两页 subtitle 移除 `//` 前缀和 `mono` 类**。与 About/Skills/Resume 三页 subtitle 一致性对齐（5 页 subtitle 全部无 `//` 前缀，使用普通字体而非等宽字体）
- **保留 `.xxx__header` 双类策略**。与 RC5 Resume 模式一致，保留语义钩子（未来如需页面级样式可使用）。但与 Skills.vue 模式（仅 `page__header`）存在冲突，留待 RC7 IA Review 统一决策
- **不修改 interview/*.md frontmatter**。Interview subtitle 是动态计算的，不需要从 frontmatter 读取
- **AiPractice subtitle 内容简化**。原 hint 含嵌套引号（"AI 帮我写代码" 和 "我用 AI 加速了哪些环节..."），在 frontmatter 中处理引号复杂；简化为无嵌套引号的等价表达，语义不变

### 2.8 RC7 — Final Polish（最终打磨）（2026-07-17，已完成）

**设计目标**：经 RC7 Design Review 评估，原计划"信息架构 + 全局导航优化"无真正有价值的修改空间（IA 已合理、NavBar 三类用户路径均可自然完成、Header 类三种模式各有合理理由、eyebrow `//` 是有意的语义区分、About RC3 Freeze 解除收益小）。用户批准将 RC7 重新定位为 **Final Polish（最终打磨）**，坚持"最小修改、最大价值"原则，仅做 Content Accuracy + Release Polish，**不为了统一而统一、不为了重构而重构**。

**RC7 完整生命周期**（按 2026-07-17 调整后的执行规则，不再拆子阶段）：

| 阶段 | 状态 | 主要交付 |
|---|---|---|
| 开发 | ✅ 完成 | Resume subtitle 文案修正（"软件工程方向" → "分布式系统"）+ About facts 考研字段歧义消除（"2026 届" → "2027 考研"）+ public/robots.txt 新建 + public/sitemap.xml 新建（9 条路由）+ index.html SEO meta 增量（robots / canonical / og:url / og:site_name / twitter:title / twitter:description）+ release-gate-task-005.mjs Test 7 Resume subtitle 断言更新 |
| 验证 | ✅ 完成 | typecheck + build + Playwright 74/74 全过 |
| Review | ✅ 完成 | Code Review（0 P0/P1，2 P2 记录留 RC8：og:image 缺失 + per-route description）+ Design Review（0 问题，eyebrow/Header/NavBar 维持现状）+ Performance Review（0 问题，Bundle -0.01 KB）+ a11y 验证（35 处 aria-* 全部合理使用） |
| 文档更新 | ✅ 完成 | HANDOFF.md + RELEASE_REVIEW_REPORT.md §24 同步 |
| Commit + Push | ⏳ 待执行 | 收尾 commit + 推送 origin/master |
| RC7 Final Report | ⏳ 待输出 | 等待批准进入 RC8（Final v3.0.0） |

**RC7 开发阶段修改文件（6 个，2 新建 + 4 修改；不含文档 2 个）**：

| 文件 | 类型 | 改动 |
|---|---|---|
| `src/content/resume/index.md` | 修改 | frontmatter `subtitle: 软件工程学生 · 后端开发 · 软件工程方向` → `subtitle: 软件工程学生 · 后端开发 · 分布式系统`（消除语义重复，对齐 About） |
| `src/content/personal/about.md` | 修改 | frontmatter facts 考研字段 `408 计算机科学 · 2026 届` → `408 计算机科学 · 2027 考研`（消除"届"字歧义，用户 2027.06 毕业） |
| `public/robots.txt` | 新建 | 基础 SEO 资源（User-agent: * + Allow: / + Sitemap 指向） |
| `public/sitemap.xml` | 新建 | 基础 SEO 资源（9 条路由：1 首页 + 3 项目详情 + 5 子页面，priority 0.6~1.0） |
| `index.html` | 修改 | SEO meta 增量：`<meta name="robots">` + `<link rel="canonical">` + `og:url` + `og:site_name` + `twitter:title` + `twitter:description` |
| `release-gate-task-005.mjs` | 修改 | Test 7 Resume subtitle 断言更新（"软件工程方向" → "分布式系统"）+ 注释补充 RC7 来源 |

**RC7 全程约束遵守：**
- 新增组件配额：0/2（RC7 未新增组件，仍剩 1 个）
- 新增第三方依赖：0
- 新增 Design Token / 颜色 / 字体 / 动画：0
- Markdown SSOT 保持：是（仅修改 frontmatter 文案，未新增字段或迁移结构）
- 隐私扫描清洁：0 手机号 / 0 真实密钥
- env.d.ts 无需修改
- **明确不做的项全部遵守**：未调整 NavBar / 未统一 Header 类 / 未给所有 eyebrow 加 `//` / 未解除 About RC3 Freeze / 未新增组件动画Token / 未进行无收益 CSS 重构

**RC7 验证结果：**
- ✅ typecheck 通过（exit 0）
- ✅ build 通过（1662 模块，2.49s，gzip 主包 41.87 KB — 比 RC6 减少 0.01 KB，零回归）
- ✅ Playwright **74/74** 通过（与 RC6 一致，仅 Test 7 断言文案同步更新）
- ✅ Bundle 体积变化：主包 index.js 107.78 KB / gzip 41.87 KB（-0.01 KB）

**RC7 Design Review 结论（详见 [RELEASE_REVIEW_REPORT.md §24](RELEASE_REVIEW_REPORT.md)）：**

| # | 评估项 | 结论 |
|---|---|---|
| 1 | Information Architecture 合理性 | 【建议保持现状】8 页职责清晰，3 分钟面试官快速浏览目标已达成 |
| 2 | NavBar 调整必要性 | 【明确不要修改】复试导师 / 技术面试官 / 普通访客三类路径均可自然完成 |
| 3 | Header 类统一 | 【建议保持现状】3 种模式（仅 page__header / page__header + xxx__header 双类 / 独立 scoped）各有合理理由：YAGNI / 打印 CSS 钩子 / RC3 冻结结构差异 |
| 4 | eyebrow `//` 统一 | 【明确不要修改】`//` 是 section-level（页内 section）与 page-level（子页 H1）的有意语义区分，非历史遗留不一致 |
| 5 | About RC3 Freeze 解除 | 【建议保持现状】facts 用 `<dl>` 结构，与其他页 `.page__header` 不同；解冻收益小、风险大 |
| 6 | v3.0 成熟度评估 | 当前已基本达到 v3.0 成熟度；真正值得投入的仅 Content Accuracy + SEO 基础资源 |

**为什么这样设计：**

- **不为了统一而统一**。Design Review 确认 eyebrow `//`、Header 类、NavBar 顺序的"差异"实际是有意的设计模式，强行统一反而破坏语义。RC7 不实施任何仅为形式统一的修改
- **Content Accuracy 优先**。Resume subtitle 中"软件工程方向"与 H1"软件工程学生"语义重复，且与 About subtitle "分布式系统" 不一致——这是真实的内容问题，必须修正
- **About facts 考研字段"届"字歧义**。"届"在中文里既可指毕业年份也可指入学年份，用户 2027.06 毕业，"2026 届"易引起误解；改为"2027 考研"明确无歧义
- **SEO 基础资源零风险**。robots.txt + sitemap.xml 是纯静态文件，不涉及运行时逻辑；index.html meta 增量不破坏现有渲染。这是发布前的基础打磨，属于"最大价值、最小风险"
- **不补 og:image / twitter:image**。项目无现成图片源（favicon.svg 不适合作为社交分享图），强行添加需新增资源，超出 RC7 范围；记录为 P2 留 RC8 决策
- **不实施 per-route description**。SPA 限制下，路由级 description 需在路由守卫中动态注入 document.head，属于新功能而非打磨；记录为 P2 留 RC8 决策

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
| **RC4** | ✅ Completed commit `6ab0a3b`（origin/master 已同步，不发新 tag） | 全局基础（.page__header/.page__subtitle 工具类）+ Skills 试点（SkillCategory + subtitle + 6 categories + 卡片网格）+ Playwright +10 项断言（65/65 通过）+ Final Review（P1 修复 --leading-relaxed） |
| **RC5** | ✅ Completed commit `a0c4002`（origin/master 已同步，不发新 tag） | Resume 深化：ResumeContent subtitle? 字段 + scanResume 解析 + frontmatter SSOT 化 + .page__header/.page__subtitle 工具类应用 + 打印 CSS 优化 + Playwright +3 项断言（68/68 通过）+ Review（0 P0/P1，1 P2 记录）+ 完成 RC3.3 IA Review P2 #1 |
| **RC6** | ✅ Completed commit `92a605a`（origin/master 已同步，不发新 tag） | Interview + AiPractice 深化：AiPracticeContent subtitle? 字段 + scanAiPractice 解析 + frontmatter SSOT 化 + AiPractice.vue 应用 .page__header/.page__subtitle + Interview.vue 应用 .page__header/.page__subtitle（动态计算）+ 两页移除 scoped .xxx__header + Playwright +6 项断言（74/74 通过）+ Review（0 P0/P1，2 P2 记录）+ 完成 RC3.3 IA Review P2 #3 + P2 #4 |
| **RC7** | ✅ Completed（开发 + 验证 + Review 全部完成，待 commit + push） | Final Polish（2026-07-17 重新定位，原"IA + Nav 优化"经 Design Review 评估为无价值修改）：Content Accuracy（Resume subtitle "软件工程方向" → "分布式系统" + About facts 考研 "2026 届" → "2027 考研"）+ Release Polish（public/robots.txt + public/sitemap.xml 9 路由 + index.html SEO meta 增量）+ Playwright Test 7 断言同步 + Review（0 P0/P1，2 P2 记录留 RC8：og:image + per-route description）+ Bundle -0.01 KB |

### 6.2 剩余（按 Portfolio v3 Roadmap 顺序）

| 阶段 | 状态 | 预期内容 |
|---|---|---|
| **RC8** | ⏳ 未开始 | Final Release v3.0.0（全站审计 + Core Web Vitals + WCAG AA + v3.0.0 发布） |

**重要说明**：
- **《Portfolio v3 Roadmap》已由用户批准为 RC4~RC8 唯一开发计划**，禁止自行修改或重新规划
- 用户的工作流是"按 RC 阶段顺序、用户批准后推进"，**禁止跳阶段或提前实现后续 RC 内容**
- 每完成一个 RC，必须输出 RC Final Report（修改文件 / 数据流 / 风险 / Bundle / 验证结果），**等待用户批准才能进入下一 RC**
- **RC4~RC7 不发布新版本**，仅推送 origin/master；**RC8 统一发 v3.0.0 Final Release**
- **RC3.3 Information Architecture Review 已完成**（详见 [RELEASE_REVIEW_REPORT.md §18.7](RELEASE_REVIEW_REPORT.md)），5 项 P2 建议供 RC4+ 决策参考

**RC3.3 IA Review 给 RC4+ 的 5 项 P2 建议处理进度：**

| # | 建议 | 建议时机 | 当前状态 |
|---|---|---|---|
| 1 | 统一 About subtitle 与 Resume 开场白 framing | RC5（Resume 重构） | ✅ **RC5 已完成**（Resume subtitle 前缀与 About 一致，分隔符统一为 `·`，后缀差异合理） |
| 2 | 评估 NavBar 顺序是否优先复试导师场景 | RC4+（用户决策） | ✅ **RC7 Design Review 已结论**：保持现状（详见 [RELEASE_REVIEW_REPORT.md §24](RELEASE_REVIEW_REPORT.md)）。三类用户路径（复试导师 / 技术面试官 / 普通访客）均可自然完成，调整无明确收益 |
| 3 | 评估 4 个子页面（Skills/Interview/AiPractice/Resume）`page__hint` 是否应统一迁移至 SSOT 模式 | RC4-RC7（每页重构时） | ✅ **RC6 已完成**（Skills RC4.1 + Resume RC5 + AiPractice RC6 + Interview RC6 = 4/4 页全部消除 page__hint） |
| 4 | 评估 3 个子页面 `.xxx__header` CSS 是否提取为 `.page__header` 工具类 | RC8（Final Review） | ✅ **RC6 已完成**（Skills RC4.1 + Resume RC5 + AiPractice RC6 + Interview RC6 = 4/4 页全部应用 .page__header；About.vue 保留 scoped，RC3 冻结） |
| 5 | 监控 Skills 软件工程实践 vs Projects 技术亮点 vs Resume 工程能力 三处能力描述是否在 RC4+ 出现过度重复 | RC4-RC7（每页重构时） | ✅ **RC5 已比对**：Resume 工程能力 5 项与 Skills 软件工程实践分类无逐项重复，Resume 是 HR 友好摘要，Skills 是技术栈分类，角度互补，**无缺陷** |

---

## 七、后续开发路线

> **《Portfolio v3 Roadmap》已由用户批准为 RC4~RC8 唯一开发计划**（2026-07-17 批准）。
>
> RC4~RC8 全程严格按照 Roadmap 顺序推进，除非遇到 P0/P1 问题或用户明确要求，否则不得自行修改 Roadmap 或重新规划开发路线。
>
> **执行规则**（2026-07-17 用户调整）：每个 RC 包含完整生命周期（开发 → 验证 → Review → 文档 → Commit → Push → Report），Review 作为收尾工作不再单独拆分子阶段。后续 RC5/RC6/RC7/RC8 保持结构一致，不再拆分 RC5.1/RC5.2/RC6.1/RC6.2 等子阶段，除非用户明确要求。

### 7.0 执行规则（2026-07-17 调整）

**每个 RC 的完整生命周期**：

```
开发 → 验证（Typecheck/Build/Playwright）→ Review（Code/Design/Performance）→ 文档更新 → Git Commit → Push → RC Report → 等待批准
```

**关键原则**：
1. Review 属于当前 RC 的收尾工作，**不再单独作为新的 RC.x 子阶段**
2. 后续 RC5/RC6/RC7/RC8 保持结构一致，**不再拆分 RC5.1/RC5.2/RC6.1/RC6.2 等子阶段**，除非用户明确要求
3. 每个 RC 完成后输出 **RC Final Report**（不是子阶段报告），等待用户批准进入下一 RC
4. RC4~RC7 不发布新版本，仅推送 origin/master；RC8 统一发 v3.0.0 Final Release
5. 如发现 Roadmap 与实际情况存在冲突，不得直接修改设计，应先分析影响、提出建议并等待用户批准
6. 每次开始新的 RC 前，先根据 §0 SNAPSHOT 和本章节自动恢复上下文

### 7.1 总目标

将 Portfolio v2.0（已发布）演进为 v3.0.0（RC8 Final Release），通过 RC4~RC7 的逐页深化与全局基础升级，建立"问题类型 + 页面协同"的优化模式，避免"一页一 RC"的线性低效。RC8 作为 Final Release 统一发布 v3.0.0。

### 7.2 RC4 — 全局基础 + Skills 试点（已完成）

**目标**：建立子页面 Header 工具类（`.page__header` / `.page__subtitle`），消除 Skills 页 `page__hint` 硬编码，将技术栈迁移至 frontmatter.categories 结构化数据，为 RC5/RC6 铺路。

**完整生命周期进度**：

| 阶段 | 状态 |
|---|---|
| 开发 | ✅ 完成（commit `caff817`） |
| 验证 | ✅ 完成（typecheck + build + Playwright 65/65） |
| Review | ✅ 完成（Code Review 0 问题 / Design Audit P1 修复 / Performance Audit 0 问题） |
| 文档更新 | ✅ 完成（HANDOFF.md + RELEASE_REVIEW_REPORT.md §21） |
| Commit + Push | ⏳ 待执行（收尾 commit + 推送 origin/master） |
| RC4 Final Report | ⏳ 待输出（等待批准进入 RC5） |

**验收标准**（全部达成）：
- ✅ typecheck + build + Playwright 三项全过
- ✅ Skills 页 categories 卡片网格渲染正确（6 个分类）
- ✅ `.page__header` / `.page__subtitle` 工具类在 global.css 中建立
- ✅ page__hint 硬编码消除（仅 Skills 页，其他页在 RC5/RC6 处理）
- ✅ Code/Design/Performance Review 无 P0/P1 问题（P1 已修复）

### 7.3 RC5 — Resume 深化（已完成）

**目标**：Resume 页视觉层次强化，PDF 打印优化，subtitle 统一至 SSOT 模式。

**完整生命周期进度**：

| 阶段 | 状态 |
|---|---|
| 开发 | ✅ 完成（5 个文件修改：resume.ts + content.ts + resume/index.md + Resume.vue + release-gate-task-005.mjs） |
| 验证 | ✅ 完成（typecheck + build + Playwright 68/68） |
| Review | ✅ 完成（Code Review 0 问题 / Design Audit 0 P0/P1，1 P2 记录 / Performance Audit 0 问题） |
| 文档更新 | ✅ 完成（HANDOFF.md + RELEASE_REVIEW_REPORT.md §22） |
| Commit + Push | ⏳ 待执行（收尾 commit + 推送 origin/master） |
| RC5 Final Report | ⏳ 待输出（等待批准进入 RC6） |

**验收标准**（全部达成）：
- ✅ typecheck + build + Playwright 三项全过
- ✅ Resume 页 subtitle 从 SSOT 读取（frontmatter.subtitle）
- ✅ PDF 打印输出排版正确（.page__subtitle 隐藏规则更新）
- ✅ Review 无 P0/P1 问题（1 P2 已记录到 RELEASE_REVIEW_REPORT.md）
- ✅ RC3.3 IA Review P2 #1 已完成（About/Resume subtitle framing 对齐）

### 7.4 RC6 — Interview + AiPractice 深化（已完成）

**目标**：两页共用 `.page__header` 工具类，subtitle SSOT 化（AiPractice）+ 动态计算统一（Interview），page__hint 全站消除。

**完整生命周期进度**：

| 阶段 | 状态 |
|---|---|
| 开发 | ✅ 完成（6 个文件修改：ai-practice.ts + content.ts + ai-practice/index.md + AiPractice.vue + Interview.vue + release-gate-task-005.mjs） |
| 验证 | ✅ 完成（typecheck + build + Playwright 74/74） |
| Review | ✅ 完成（Code Review 0 P0/P1，1 P2 记录 / Design Audit 0 P0/P1，1 P2 记录 / Performance Audit 0 问题） |
| 文档更新 | ✅ 完成（HANDOFF.md + RELEASE_REVIEW_REPORT.md §23） |
| Commit + Push | ⏳ 待执行（收尾 commit + 推送 origin/master） |
| RC6 Final Report | ⏳ 待输出（等待批准进入 RC7） |

**验收标准**（全部达成）：
- ✅ typecheck + build + Playwright 三项全过
- ✅ AiPractice subtitle 从 SSOT 读取（frontmatter.subtitle）；Interview subtitle 保留动态计算（合理架构选择，非缺陷）
- ✅ page__hint 硬编码消除（4 子页面全部完成：Skills + Resume + AiPractice + Interview）
- ✅ Review 无 P0/P1 问题（2 P2 已记录到 RELEASE_REVIEW_REPORT.md，留待 RC7）

### 7.5 RC7 — Final Polish（最终打磨）（已完成）

> **2026-07-17 用户重新定位**：原计划"信息架构 + 全局导航优化"经 RC7 Design Review 评估，当前 IA 与 NavBar 已合理，没有真正有价值的修改空间。用户批准将 RC7 调整为"Final Polish"，仅做 Content Accuracy + Release Polish，**不为了统一而统一、不为了重构而重构**。详见 [RELEASE_REVIEW_REPORT.md §24](RELEASE_REVIEW_REPORT.md) RC7 Design Review。

**目标**：修正真实存在的内容/事实问题，补充基础 SEO 资源，全站文案与可访问性最终打磨。

**完整生命周期进度**：

| 阶段 | 状态 |
|---|---|
| 开发 | ✅ 完成（6 个文件：2 新建 + 4 修改；不含文档 2 个） |
| 验证 | ✅ 完成（typecheck + build + Playwright 74/74） |
| Review | ✅ 完成（Code Review 0 P0/P1，2 P2 记录留 RC8 / Design Review 0 问题 / Performance Review 0 问题 / a11y 验证 0 问题） |
| 文档更新 | ✅ 完成（HANDOFF.md + RELEASE_REVIEW_REPORT.md §24） |
| Commit + Push | ⏳ 待执行（收尾 commit + 推送 origin/master） |
| RC7 Final Report | ⏳ 待输出（等待批准进入 RC8 Final v3.0.0） |

**允许的工作**：
1. **Content Accuracy**：Resume/About 文案真实不一致修正 + About Facts 考研字段歧义消除
2. **Release Polish**：
   - 全站文案一致性（大小写、标点、术语、命名）
   - SEO 基础资源（robots.txt + sitemap.xml + index.html meta 增量）
   - 页面 Metadata 完整性
   - 图片 alt / aria / 可访问性细节
   - 移动端细节

**明确不做**：
- ❌ 不调整 NavBar 顺序（Design Review §2 结论：当前顺序三类用户路径均可自然完成）
- ❌ 不统一 Header 类（Design Review §3 结论：各模式有合理理由）
- ❌ 不给所有 eyebrow 加 `//`（Design Review §4 结论：当前 `//` 是有意的语义区分）
- ❌ 不解除 About RC3 Freeze（Design Review §5 结论：facts 结构差异合理）
- ❌ 不新增组件/动画/Design Token/颜色/字体（FROZEN INVENTORY）
- ❌ 不进行无明确收益的 CSS 重构

**验收标准**（全部达成）：
- ✅ typecheck + build + Playwright 三项全过
- ✅ Content Accuracy 修正完成（Resume subtitle "软件工程方向" → "分布式系统" + About facts 考研 "2026 届" → "2027 考研"）
- ✅ SEO 基础资源补充完成（robots.txt + sitemap.xml + index.html meta 增量）
- ✅ Review 无 P0/P1 问题（2 P2 记录到 RELEASE_REVIEW_REPORT.md §24，留 RC8 决策：og:image + per-route description）
- ✅ Bundle 体积零回归（41.88 KB → 41.87 KB，-0.01 KB）

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
  执行规则：每个 RC 完整生命周期，不再拆子阶段（2026-07-17 调整）
═══════════════════════════════════════════════════════════════

【已完成】
  RC1 ✅ 真实性 + 架构稳定（Timeline SSOT）
  RC2 ✅ 视觉升级 + 组件化（ProjectDetail / v2.0.0 已发布）
  RC3 ✅ About 页面重构（人物画像：RC3.1 数据层 + RC3.2 视觉 + RC3.3 Final Review + IA Review）
  RC4 ✅ 全局基础 + Skills 试点（.page__header 工具类 + Skills categories 卡片网格 + Final Review P1 修复）
  RC5 ✅ Resume 深化（subtitle SSOT 化 + .page__header 工具类应用 + 打印 CSS 优化 + 完成 IA P2 #1）
  RC6 ✅ Interview + AiPractice 深化（AiPractice SSOT + Interview 动态计算 + 两页 .page__header 应用 + page__hint 全站消除 + 完成 IA P2 #3 + P2 #4）
  RC7 ✅ Final Polish（最终打磨）— 2026-07-17 用户重新定位，原"IA + Nav 优化"经 Design Review 评估为无价值修改
            · Content Accuracy（Resume subtitle "软件工程方向" → "分布式系统" + About facts 考研 "2026 届" → "2027 考研"）
            · Release Polish（robots.txt + sitemap.xml 9 路由 + index.html SEO meta 增量）
            · 全站 a11y 验证（35 处 aria-* 全部合理使用）
            · 完成 IA P2 #2（Design Review 结论：NavBar 保持现状）
            · 不做：NavBar / Header 类 / eyebrow // / About 解冻 / 新增组件动画Token
            · 验证：typecheck + build（1662 modules, 2.49s, gzip 41.87 KB -0.01）+ Playwright 74/74 + 0 P0/P1 + 2 P2 留 RC8

【待推进】（每个 RC 完整生命周期，不再拆子阶段）
  RC8 ──── Final Release v3.0.0
            · 全站一致性审计（Code/Design/Performance/IA）
            · Core Web Vitals 验证
            · WCAG AA 可访问性检查
            · v3.0.0 发布（版本号 2.0.0 → 3.0.0 + Git Tag）

═══════════════════════════════════════════════════════════════
```

### 7.8 关键原则

1. **《Portfolio v3 Roadmap》为唯一开发计划**，禁止自行修改或重新规划
2. **每个 RC 完整生命周期**：开发 → 验证 → Review → 文档 → Commit → Push → Report（不再拆子阶段）
3. **每个 RC 完成后必须输出 RC Final Report**，等待用户批准才能进入下一 RC
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
| 3 | 5 个主要内容页面 eyebrow 缺 `//` 前缀（仅 DecisionSection 有 `//`，About/Skills/Resume/Interview/AiPractice 5 页是纯中文） | 低 | RC4.1 已记录，RC5 复核，RC6 再次确认。留待 RC7 全局一致性最终确认时统一处理 |
| 4 | `.xxx__header` 类名一致性冲突（Skills.vue 仅 `page__header`，Resume/AiPractice/Interview.vue 用 `page__header + .xxx__header` 双类） | 低 | RC6 Code Review P2 记录。Skills 模式（最简）vs Resume 模式（保留语义钩子）。留待 RC7 IA Review 统一决策 |

### 8.2 待确认事项

| # | 事项 | 处理建议 |
|---|---|---|
| 1 | **RC4~RC8 开发计划** | ✅ **已确认**：《Portfolio v3 Roadmap》已由用户批准为唯一开发计划（见 §七） |
| 2 | About 页是否需要展示 Email | **用户已决定**：暂不公开，仅保留 GitHub（见 §5.5） |
| 3 | 后续 RC 阶段是否仍消耗 ≤2 新组件配额 | **是**（已用 1 个，剩余 1 个，见 §5.4；RC4 + RC5 + RC6 均未消耗） |
| 4 | RC7 是否在用户批准 RC6 后立即开始 | ⏳ 待用户批准 RC6 后进入 RC7 |
| 5 | RC7 中 `.xxx__header` 类名一致性决策（Skills 模式 vs Resume 模式） | ⏳ 待 RC7 IA Review 时用户决策 |
| 6 | RC7 中 eyebrow `//` 前缀统一决策（5 页是否加 `//` 前缀） | ⏳ 待 RC7 IA Review 时用户决策 |

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
