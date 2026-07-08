# 项目记忆档案（PROJECT_MEMORY.md）

> 本文件记录每个 Task 的执行过程、设计决策、遇到的问题与遗留事项。
> 供未来 AI 接手时快速理解历史决策脉络，避免重复踩坑。
> 最后更新：2026-07-09

---

## 当前阶段

**Task 003 In Progress（构建时内容插件 + 项目详情页）**

- **Master Baseline：** `a805869`（Task 002 Release, 2026-07-09）— Release Baseline 以 master 为准
- **Develop HEAD：** feature/task-003-content-plugin（从 develop `6d54dc1` 创建）
- **Release Review：** 已通过（Self Review 修复 1 WARNING + Acceptance Review 修复 1 P1 + 1 P2）
- **工作区状态：** Task 003 开发中

### Task 进度总览

| Task | 名称 | 状态 |
|------|------|------|
| 000 | 项目内容资产整理 | ✅ 已完成 |
| 000.5 | 架构图与展示素材 | ✅ 已完成 |
| 001 | 项目初始化与基础设施 | ✅ 已完成（含 Release Review） |
| **002** | **首页开发** | **✅ 已完成（含 Self Review + Acceptance Review，已合并到 master）** |
| **003** | **构建时内容插件 + 项目详情页** | **🚧 In Progress（003.1 ✅）** |
| 004 | 面试准备页 + AI 实践页 | 待开始 |
| 005 | 能力页 + 简历页 + 关于页 | 待开始 |
| 006 | 部署与上线（Vercel） | 待开始 |
| 007 | Release Audit | 待开始 |

### 后续开发顺序

1. **Task 003** — Vite 构建时 Markdown 转换插件 + 项目详情页
2. **Task 004** — `/interview` + `/ai-practice` 两个内容页
3. **Task 005** — `/skills` + `/resume` + `/about` 三个剩余页面
4. **Task 006** — Vercel 部署上线
5. **Task 007** — Release Audit（最终质量关卡）

**规则：** 每个 Task 完成后暂停，等待用户确认，不得提前开发后续 Task 内容。

---

## Task 003 — 构建时内容插件 + 项目详情页

**开始时间：** 2026-07-09
**状态：** 🚧 In Progress
**Git 分支：** feature/task-003-content-plugin（从 develop `6d54dc1` 创建）

### Execution Plan v2 要点

1. **Baseline 管理：** Master Baseline / Develop HEAD 分离，Release 以 master 为准
2. **双虚拟模块：** virtual:content（摘要，无 HTML）+ virtual:project-detail（完整 HTML，懒加载）
3. **Decision 简化：** 仅 Markdown → HTML 渲染，无结构化解析（用户决定，偏离 v1.2 §8 DecisionItem）
4. **独立类型：** ProjectSummary 独立于 ProjectContent，不用 Omit 派生
5. **类型拆分：** 5 个文件（content / project / decision / timeline / contact）
6. **开发顺序：** 003.1→003.8，提前验证 virtual:content
7. **最终验证：** Bundle Size 对比（ESLint 未配置，跳过 lint）

### 子任务 003.1 — 类型设计 + 依赖安装

**完成时间：** 2026-07-09
**状态：** ✅ 完成

#### 新增文件（5 项）

- `src/types/content.ts` — 基础类型：ContentMeta, Metric
- `src/types/project.ts` — ProjectSummary（首页，无 HTML）+ ProjectContent（详情页，含 HTML）
- `src/types/decision.ts` — DecisionContent（frontmatter + html，无结构化解析）
- `src/types/timeline.ts` — TimelineStage（首页时间线，当前静态）
- `src/types/contact.ts` — ContactInfo（首页联系方式，当前静态）

#### 新增依赖（4 项，均 devDependencies，不进运行时 bundle）

- markdown-it ^14.3.0 — Markdown → HTML
- gray-matter ^4.0.3 — Frontmatter 解析
- shiki ^4.3.1 — 代码高亮（构建时）
- @types/markdown-it ^14.1.2 — TS 类型声明

#### 设计决策

1. **ProjectSummary 独立于 ProjectContent** — 不用 Omit 派生，后续 ProjectContent 字段扩展不影响首页
2. **DecisionContent 无结构化解析** — 用户决定不做 DecisionItem 解析器，仅 HTML 渲染（偏离 v1.2 §8，用户批准）
3. **类型按域拆分** — 用户决定拆分为 5 文件，保持后续可维护性（v1.2 §8 说单文件，用户批准拆分）

#### RC 验证结果

| 验证项 | 结果 |
|--------|------|--------|
| Self Review | ✅ 5 文件职责清晰，类型匹配 frontmatter |
| Duplicate Review | ✅ 新文件无重复（现有重复在 003.3 解决） |
| Architecture Review | ✅ 用户批准的偏离已记录 |
| Design Token Review | ✅ N/A（纯类型文件） |
| typecheck | ✅ 通过 |
| build | ✅ gzip ~52KB（与 Task 002 一致） |

---

## Task 002 — 首页开发

**完成时间：** 2026-07-08
**状态：** ✅ 已完成（含 Self Review + Release Review + Acceptance Review）
**Git Commit：** 代码 `df83559` + 文档 `4db5f7f` + 修复 `6013367` + 收尾 `a805869`（已 FF 合并到 master，Task 002 Release Baseline）

### 本次修改内容

#### 新增文件（4 项）

**首页组件（4 项，位于 `src/components/home/`）**
- `src/components/home/HeroSection.vue` — Hero 区域（非对称 7fr/5fr 网格，含 4 项统计指标 + 2 个 CTA）
- `src/components/home/ProjectCard.vue` — 项目卡片（支持 featured/normal 两种展示模式）
- `src/components/home/TimelineSection.vue` — 技术成长时间线（`<ol>` + CSS `::before` 圆点）
- `src/components/home/ContactSection.vue` — 联系方式（`<dl>` 语义化键值对）

#### 修改文件（1 项）

- `src/pages/Home.vue` — 替换 Task 001 占位页，组合 4 个组件，持有类型化静态数据（projects / timelineStages / contact）

#### Git 工作流建立

- 从 master `2c57d64` 创建 `develop` 分支
- 从 `develop` 创建 `feature/task-002-homepage` 分支
- 所有 Task 002 开发均在 feature 分支完成
- Acceptance Review 通过后，fast-forward 合并 `feature/task-002-homepage` → `develop`（当前 develop HEAD `6013367`）
- feature 分支保留，develop 已 FF 合并到 master（Task 002 Release Baseline `a805869`）

### 设计决策

#### 1. 非对称 Hero 布局 — 避免通用居中 hero 模板

**决策：** Hero 采用 7fr/5fr 双列网格（桌面端），左侧大标题 + 描述 + CTA，右侧统计指标面板。

**原因：** AI_RULES.md §5.6 与 design-quality.md 均禁止"通用 hero section（居中标题 + 渐变 blob + 通用 CTA）"。非对称布局建立视觉层次，统计指标面板用 surface 背景 + border + shadow 形成深度。

**实现：** `min-height: calc(100vh - var(--nav-height))` 确保首屏占满；移动端单列堆叠。

#### 2. Bento 网格 + 精选卡片跨行 — 建立层次

**决策：** 项目卡片用 `grid-template-columns: 1.4fr 1fr`，精选项目（江南出行，order=1）设 `grid-row: span 2`，展示完整 4 项指标；其他项目只展示前 2 项指标。

**原因：** 满足 design-quality.md「通过尺度对比建立清晰层次」和「网格破坏型编辑/便当布局」要求。精选项目是核心叙事，需要更多视觉权重。

**实现：** `ProjectCard` 接收 `featured` prop（boolean），根据 featured 切换布局密度、标题大小、指标数量。通过 `v-for` + `:featured="project.order === 1"` 避免数组索引 + 非空断言。

#### 3. 展示型组件 + Props 类型化 — 数据归父组件持有

**决策：** 4 个组件均为展示型（presentational），通过 `defineProps<T>()` 接收类型化数据，不持有自己的状态。所有数据（projects / timelineStages / contact）定义在 Home.vue。

**原因：**
- 遵循 v1.2 §8 组件树定义（home/ 下为展示组件）
- 数据集中便于 Task 003 替换为 `virtual:content` 虚拟模块
- 组件可独立测试和复用

**实现：** 每个组件内部 `interface` 定义自己的 Props 类型（HeroStat / ProjectSummary / TimelineStage / ContactInfo），Home.vue 导入并使用。

#### 4. 静态数据放 Home.vue 而非 `src/data/` — 避免架构变更

**决策：** Task 002 的项目/时间线/联系数据以类型化常量定义在 Home.vue 的 `<script setup>` 中，不创建 `src/data/` 目录。

**原因：**
- v1.2 §1 目录结构未定义 `src/data/`，新建目录属于"修改架构"（AI_RULES.md §6.4 需确认）
- 数据来源是 Markdown frontmatter，Task 003 将通过 virtual:content 提供
- 当前静态数据是临时占位，YAGNI 原则下不为单次使用创建目录

**权衡：** Home.vue 文件稍长（~180 行），但数据集中可见，便于 Task 003 一次性替换。Task 003 实现后，这些常量将被 `import { projects } from 'virtual:content'` 替代。

#### 5. Timeline 用 `<ol>` + CSS `::before` — 遵循 v1.2 替代原则

**决策：** 时间线用 `<ol>` 有序列表 + CSS `::before` 伪元素实现圆点，不引入任何 UI 库。

**原因：** AI_RULES.md §4 替代原则明确：「时间线 → el-timeline → `<ol>` + CSS `::before`」。v1.2 §2.3 同样规定。

**实现：**
- `<ol>` 设 `border-left` 形成垂直线
- 每个 `<li>` `position: relative`，`::before` 绝对定位圆点（`left: calc(-1 * var(--space-8) - 5px)`）
- 已完成阶段：实心圆点（accent 背景）；未来阶段：空心圆点（border only）
- 高亮列表用 `<li>` + `::before` 横线标记（非默认 bullet）

#### 6. Contact 用 `<dl>` 语义化键值对

**决策：** 联系方式用 `<dl>` 定义列表，每项 `<div class="contact__method">` 包含 `<dt>`（key）和 `<dd>`（value）。

**原因：** `<dl>` 语义化表达"术语-定义"关系，比 `<div>` + class 更符合无障碍标准。GitHub 用户名用 mono 字体 + ArrowUpRight 图标，Email 待补充时显示 `// 待补充`（mono 灰色）。

#### 7. 日期顺序而非倒序 — 时间线叙事连贯

**决策：** Timeline 按日期正序排列（05 → 06 → 07 → 下一步），非倒序。

**原因：** 网站定位是"技术成长档案"（AI_RULES.md §2），正序展示成长轨迹更符合"档案"叙事。倒序适合新闻/博客，不适合成长记录。

### 遇到的问题与解决

#### 问题 1：ContactSection.vue 响应式缺失（Self Review 发现）

**现象：** `githubHandle` 和 `emailAvailable` 直接从 `props.contact` 计算赋值，未包裹 `computed()`。虽然当前 props 是静态的不会变化，但违反 Vue 响应式最佳实践——如果未来 props 变化，这两个值不会更新。

**严重程度：** 🟡 WARNING

**解决：**
- 将 `githubHandle` 和 `emailAvailable` 改为 `computed()`
- 添加 `import { computed } from 'vue'`

**验证：** 修复后 `npm run typecheck` 通过。

#### 问题 2：Git commit heredoc 在 PowerShell 不支持

**现象：** 尝试用 `git commit -m "$(cat <<'EOF'...EOF)"` heredoc 语法提交多行 commit message，PowerShell 报多个 parser error。

**解决：** 改用多个 `-m` 标志：`git commit -m "subject" -m "body"`，PowerShell 正确处理。

**验证：** Commit 成功，hash `df83559`。

#### 问题 3：Dev server 端口冲突

**现象：** Vite dev server 启动时端口 5173 被占用（疑似之前 dev server 未完全停止）。

**解决：** Vite 自动切换到 5174 端口。无需手动干预。

**影响：** 无功能影响，仅 dev server 端口变化。

### 验证结果

| 验证项 | 结果 |
|--------|------|
| `npm run typecheck` | ✅ 通过（strict 全开） |
| `npm run build` | ✅ 成功（gzip Home 4.46 KB，总 ~48 KB） |
| `npm run dev` | ✅ 启动正常（localhost:5174） |
| Self Review | ✅ 修复 1 项响应式问题（ContactSection computed） |
| Release Review | ✅ 通过 |
| 无 TODO / FIXME / console.log | ✅ 已验证 |
| 未新增依赖 | ✅ package.json 未改动 |
| 未修改架构 | ✅ 目录结构与 v1.2 一致 |
| 设计质量 | ✅ 满足 7/8 项 design-quality 标准（缺"质感纹理氛围"） |

### 依赖清单

**未新增任何依赖。** Task 002 使用现有依赖：
- vue@^3.5.13（Composition API + `<script setup>`）
- lucide-vue-next@^0.460.0（ArrowRight / ArrowDown / Github / ArrowUpRight 等图标）
- CSS Custom Properties（设计令牌系统）

**Task 003 将引入（仅构建时）：** markdown-it / gray-matter / Shiki — 不进入运行时 bundle。

### 设计质量自评

| design-quality.md 标准 | 满足 | 说明 |
|----------------------|------|------|
| 1. 尺度对比建立层次 | ✅ | Hero 大标题 vs 统计指标；精选卡片 vs 普通卡片 |
| 2. 有意的节奏间距 | ✅ | 非均匀 padding：Hero `--space-20` / Timeline `--space-16` / Contact `--space-20` |
| 3. 重叠/阴影/表面/动效建立深度 | ✅ | 统计面板 surface + shadow-sm；卡片 hover translateY + shadow-lg |
| 4. 有特点的排版和配对 | ✅ | Inter（正文）+ JetBrains Mono（技术术语/数字/代码注释风格 eyebrow） |
| 5. 色彩用于语义 | ✅ | Amber 强调色仅用于 eyebrow / CTA / 链接 hover / 关键数字 |
| 6. hover/focus/active 状态有设计感 | ✅ | 卡片 hover translateY + border 变色；链接 hover 颜色过渡；CTA hover 阴影增强 |
| 7. 网格破坏型编辑/便当布局 | ✅ | Bento 网格精选卡片 `grid-row: span 2` |
| 8. 质感、纹理、氛围 | ⚠️ | 当前无纹理/质感装饰，纯色块为主。Task 007 可评估是否添加 |

### Acceptance Review 补充

**Acceptance Review 时间：** 2026-07-09
**Git Commit：** `6013367`（feature/task-002-homepage，已合并到 develop）

#### 额外发现并修复的问题

| # | 问题 | 严重度 | 修复方式 |
|---|------|--------|---------|
| 4 | TimelineSection.vue L22 文字写"按时间**倒序**排列"，但实际数据是正序（05→06→07→下一步），与设计决策矛盾 | 🔴 P1 | 改为"按时间**正序**排列" |
| 5 | HeroSection.vue L135/L140 硬编码 `color: #fff`，违反 AI_RULES.md §4「禁止硬编码颜色值」 | 🟡 P2 | 新增 `--color-on-accent` 设计令牌，替换 `#fff` 为 `var(--color-on-accent)` |

#### 新增设计令牌：`--color-on-accent`

**令牌：** `--color-on-accent: #ffffff`
**位置：** `src/styles/tokens.css` — `:root`（L20）+ `[data-theme='dark']`（L111）
**用途：** Accent 强调色背景上的文字颜色（如 Hero CTA 按钮的文字色）。
**暗色模式：** 保持 `#ffffff`（amber 强调色在亮/暗模式下均需白色文字）。
**原因：** Acceptance Review 发现 HeroSection 使用硬编码 `#fff`，违反 AI_RULES.md §4。原 tokens.css 无"accent 背景上的文字色"令牌，新增此令牌填补设计系统空缺。

#### Duplicate Review 结果

**扫描范围：** `src/` 下所有 `.vue` 和 `.ts` 文件
**扫描维度：** Interface / Type / CSS / Utility / Computed / Constant

| # | 类型 | 重复项 | 文件 | 行数 | 处置 |
|---|------|--------|------|------|------|
| 1 | Interface | `ProjectSummary` | Home.vue L10 + ProjectCard.vue L10 | 各 8 行 | Task 003 统一（virtual:content 类型声明） |
| 2 | Interface | `TimelineStage` | Home.vue L20 + TimelineSection.vue L2 | 各 6 行 | Task 003 统一 |
| 3 | Interface | `ContactInfo` | Home.vue L28 + ContactSection.vue L5 | 各 3 行 | Task 003 统一 |
| 4 | CSS | `__eyebrow` 样式块 | TimelineSection.vue L69 + ContactSection.vue L88 + Home.vue L166 | 各 6 行，共 18 行 | P3：可提取为 `.section__eyebrow` 到 global.css（类似已有 `.page__eyebrow`）。当前不重构 |

**无重复项：** Utility 函数、Computed 属性、Constant 常量均无重复。

**说明：**
- Interface 重复属于 Task 003 范围 — virtual:content 插件实现后，类型将集中声明在 `src/env.d.ts` 或独立类型文件中，Home.vue 和子组件的重复 interface 将被 import 替代。当前不提前重构。
- CSS `__eyebrow` 重复属于轻微代码质量问题（18 行），可提取为 `.section__eyebrow` 全局类。但当前 3 个组件各自 scoped 样式独立维护更安全，待全局样式进一步积累后再统一提取。

---

## Task 001 — 项目初始化与基础设施

**完成时间：** 2026-07-08
**状态：** ✅ 已完成（含 Release Review）

### 本次修改内容

#### 新增文件（30 项）

**AI 协作文档（2 项）**
- `AI_RULES.md` — 项目 AI 协作统一规范
- `PROJECT_CONTEXT.md` — 项目上下文索引

**工程配置（10 项）**
- `package.json` / `package-lock.json`
- `tsconfig.json` / `tsconfig.node.json`
- `vite.config.ts`
- `index.html`
- `vercel.json`
- `public/favicon.svg`

**src 核心代码（8 项）**
- `src/main.ts` / `src/App.vue` / `src/env.d.ts`
- `src/router/index.ts`
- `src/composables/useTheme.ts`
- `src/styles/tokens.css` / `src/styles/global.css`
- `src/layouts/DefaultLayout.vue`

**通用组件（4 项）**
- `src/components/common/NavBar.vue`
- `src/components/common/Footer.vue`
- `src/components/common/ThemeToggle.vue`
- `src/components/common/BackToTop.vue`

**占位页面（8 项）**
- `src/pages/Home.vue` / `src/pages/ProjectDetail.vue`
- `src/pages/Skills.vue` / `src/pages/Interview.vue`
- `src/pages/AiPractice.vue` / `src/pages/Resume.vue`
- `src/pages/About.vue` / `src/pages/NotFound.vue`

**空目录（2 项）**
- `src/assets/`（待 Task 004 SVG 图表）
- `src/utils/`（待 Task 003 content 工具）

### 设计决策

#### 1. 依赖选择 — 严格 YAGNI

**决策：** 只引入 v1.2 明确要求的依赖，不提前引入 Markdown 相关库。

**原因：** Task 001 范围是基础工程，Markdown 解析属于 Task 003。提前引入会增加 bundle 并违反 YAGNI。

**结果：** 运行时仅 3 个依赖（vue / vue-router / lucide-vue-next），gzip 总量 ~45KB。

#### 2. TypeScript 配置 — 独立配置而非 Project References

**决策：** `tsconfig.json` 和 `tsconfig.node.json` 各自独立，不使用 `references` + `composite`。

**原因：** 初始尝试使用 Project References 导致 TS6305 错误（`vite.config.ts` 被两个配置同时归属）。简化为独立配置后问题消失，且功能等价。

**权衡：** 失去了 Project References 的增量编译优势，但对小项目无影响。

#### 3. 主题系统 — 模块级单例状态

**决策：** `useTheme.ts` 使用模块级 `ref` 而非 Pinia，所有组件共享同一状态实例。

**原因：** v1.2 禁止 Pinia。模块级单例是 Vue 3 Composition API 的标准模式，无需状态管理库。

**实现：**
- `mode` ref（system / light / dark）
- `systemPrefersDark` ref（matchMedia 实时监听）
- `resolved` computed（根据 mode + systemPrefersDark 推导实际主题）
- `ensureListener()` 只挂载一次 matchMedia 监听
- `cycleMode()` 循环 system → light → dark

#### 4. FOUC 防御 — 内联脚本

**决策：** `index.html` 内联 `<script>` 在渲染前读 `localStorage.theme-mode` 并设置 `data-theme`。

**原因：** 避免 Vue 应用挂载前出现主题闪烁（Flash of Unstyled Content）。

**权衡：** 内联脚本增加 ~200 字节 HTML，但避免了首屏闪烁，值得。

#### 5. 占位页样式 — 提取到全局

**决策：** 5 个占位页的 `.page / .page__eyebrow / .page__title / .page__hint` 样式提取到 `global.css`，各页面删除 `<style scoped>`。

**原因：** Self Review 发现 5 个占位页有 ~125 行重复样式。提取后每页只保留差异部分（如 ProjectDetail 的 `font-mono`）。

**权衡：** `.page__*` 类名放在全局样式，但这些是页面通用样式（非组件特定），符合 v1.2「组件特定样式用 scoped，通用样式全局」原则。

#### 6. 首页标题处理 — 不设 meta.title

**决策：** Home 路由不设 `meta.title`，`afterEach` 检测到 undefined 时使用完整品牌名 `赖睿轩 | 软件工程学生 · 技术成长档案`。

**原因：** Self Review 发现所有页面都被 `afterEach` 改写为 `${title} | 赖睿轩 · 软件工程学生`，首页丢失了「· 技术成长档案」后缀。删除首页 meta.title 后，首页使用完整品牌名，内页使用简洁版本。

#### 7. 路由 scrollBehavior — hash 锚点支持

**决策：** `scrollBehavior` 增加 `to.hash` 分支，配合 `global.css` 的 `section[id] { scroll-margin-top }` 处理固定导航偏移。

**原因：** NavBar 有「项目」链接指向 `/#projects`，但原 scrollBehavior 不处理 hash，导致点击无效。

### 遇到的问题与解决

#### 问题 1：PowerShell 不支持 `&&` 分隔符

**现象：** `node --version && npm --version` 报错 "The token '&&' is not a valid statement separator"。

**解决：** 改用 `;` 分隔符。这是 Windows PowerShell 的语法限制。

#### 问题 2：TS6305 — vite.config.ts 双重归属

**现象：** `error TS6305: Output file 'vite.config.d.ts' has not been built from source file 'vite.config.ts'`

**原因：** `tsconfig.json` 同时有 `references: [{ path: "./tsconfig.node.json" }]` 和 `include: ["vite.config.ts"]`，导致 `vite.config.ts` 被两个配置同时归属。

**解决：**
1. 从 `tsconfig.json` 删除 `references` 字段
2. 从 `tsconfig.node.json` 删除 `composite: true`
3. 两个配置变为独立文件，各自 `include` 自己的范围

**验证：** `npm run typecheck` 通过。

#### 问题 3：Self Review 发现的 6 项问题

| # | 问题 | 严重程度 | 修复方式 |
|---|------|---------|---------|
| 1 | scrollBehavior 未处理 to.hash | 🔴 CRITICAL | 增加 `if (to.hash) return { el: to.hash, behavior: 'smooth' }` + global.css 添加 `scroll-margin-top` |
| 2 | afterEach 标题丢失「· 技术成长档案」 | 🟡 WARNING | Home 路由删除 `meta.title`，使用完整品牌名 |
| 3 | 5 个占位页 ~125 行重复样式 | 🟡 WARNING | 提取到 `global.css` 的 `.page__*` 类 |
| 4 | NotFound.vue 硬编码 `8rem` | 🟡 WARNING | 改用 `var(--space-20)`（5rem，阶梯内） |
| 5 | ProjectDetail.vue 冗余 `as string` | 🟡 WARNING | 直接 `route.params.slug`（Vue Router 4 已推断为 string） |
| 6 | DefaultLayout.vue 冗余 `mode="default"` | 🟡 WARNING | 省略 `mode` 属性（default 是默认值） |

### 遗留问题

#### 1. 文档版本号不一致（中风险）

`docs/开发设计规范-v1.0.md` 文件名标记 v1.0，内容实际是 v1.1。

**处置：** 不自行重命名。以 `docs/架构确认文档-v1.2.md` 为权威源。等待用户决策是否重命名。

#### 2. tokens.css 预定义未使用令牌（低风险）

`tokens.css` 中 `--color-java/vue/ts/redis/docker` 和 `--code-bg/text/line-number` 等令牌当前未被使用，属于 Task 003+ 才需要的代码高亮相关令牌。

**处置：** 保留。这些是设计系统预先锁定的令牌，Task 003 实现代码高亮时会用到。删除会导致 Task 003 重新定义，违反「设计系统一致性」原则。

#### 3. 空目录未进入 Git 追踪（低风险）

`src/assets/` 和 `src/utils/` 为空目录，Git 不追踪空目录。

**处置：** Task 003 / Task 004 添加首文件时自然解决。当前不加 `.gitkeep`（YAGNI）。

#### 4. Google Fonts CDN 国内访问（中风险）

Inter + JetBrains Mono 通过 Google Fonts CDN 加载，国内首次访问可能较慢。

**处置：** Task 007 性能验证阶段评估是否自托管字体子集。当前已用 `preconnect` + `display=swap` 优化。

#### 5. 未配置 ESLint / Prettier（低风险）

v1.2 未要求 ESLint / Prettier。

**处置：** Task 007 可选添加。当前依赖 TypeScript strict 模式保证代码质量。

#### 6. Email 待补充（低风险）

`src/content/personal/about.md` 联系方式中 Email 标注为 `[待补充]`。

**处置：** Task 005 前补充真实 Email。Task 002 已用 GitHub 链接占位（Contact 区域 Email 显示 `// 待补充`），不阻塞 Task 003。

### 验证结果

| 验证项 | 结果 |
|--------|------|
| `npm install` | ✅ 55 packages，成功 |
| `npm run typecheck` | ✅ 无错误（strict 全开） |
| `npm run build` | ✅ 成功（gzip ~45KB） |
| `npm run dev` | ✅ 启动 507ms，8 路由全部 200 |
| 路由 hash 锚点 | ✅ 修复后 `/#projects` 可滚动 |
| 主题三态切换 | ✅ system/light/dark 循环 |
| FOUC 防御 | ✅ 内联脚本生效 |
| 移动端汉堡菜单 | ✅ 768px 断点切换 |

### 依赖清单

**运行时（3 项）：**
- vue@^3.5.13
- vue-router@^4.5.0
- lucide-vue-next@^0.460.0

**开发时（5 项）：**
- @types/node@^22.10.0
- @vitejs/plugin-vue@^5.2.1
- typescript@~5.6.3
- vite@^6.0.7
- vue-tsc@^2.1.10

**未引入（v1.2 禁止）：** Element Plus / Tailwind / Pinia / 后端 / 数据库 / 运行时 Markdown 解析

---

## Task 000 — 项目内容资产整理（已完成）

**完成时间：** 2026-07-07（本 AI 接手前）
**交付物：** 14 个 Markdown 内容文件 + 7 套 SVG 架构图

详见 [docs/task000-completion-report.md](docs/task000-completion-report.md)

---

## Task 000.5 — 架构图与展示素材（已完成）

**完成时间：** 2026-07-07（本 AI 接手前）
**交付物：** 7 套 SVG 架构图 + Mermaid 源码，位于 [docs/assets/architecture/](docs/assets/architecture/)

| 文件 | 内容 |
|------|------|
| `overall-tech-stack` | 个人技术栈全景 |
| `jiangnan-architecture` | 江南出行系统架构 |
| `exam-system-architecture` | 题库系统架构 |
| `love-letter-architecture` | 两地书系统架构 |
| `dispatch-flow` | 并发调度流程 |
| `sm2-flow` | SM-2 算法流程 |
| `ai-development-flow` | AI 开发流程 |

**说明：** Task 001 由本 AI 接手。Task 000 与 Task 000.5 均在本 AI 接手前完成，以上为记录留存，便于后续 AI 理解资产来源。

---

> 本文件随 Task 推进持续更新。每个 Task 完成后追加新章节。
