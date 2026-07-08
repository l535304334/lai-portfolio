# 项目记忆档案（PROJECT_MEMORY.md）

> 本文件记录每个 Task 的执行过程、设计决策、遇到的问题与遗留事项。
> 供未来 AI 接手时快速理解历史决策脉络，避免重复踩坑。
> 最后更新：2026-07-08

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

> 本文件随 Task 推进持续更新。每个 Task 完成后追加新章节。
