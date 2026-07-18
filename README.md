# Portfolio v3.5.0 — 软件工程学生技术作品集

> **面向考研复试导师与校招面试官的软件工程学生技术作品集网站。**
>
> 网站是简历的"证据"，不是简历的 HTML 版。通过三个真实项目案例展示「问题 → 方案对比 → 选择理由 → 实现 → 验证 → 复盘」的工程思维链条。

**线上地址**：https://lai-portfolio-xi.vercel.app

**当前版本**：`v3.5.0`（Final Release，维护模式）

---

## 项目特点

- **纯前端 SPA**：Vue 3 + TypeScript strict + Vite，无后端、无数据库、无 API
- **Markdown SSOT 模式**：所有内容以 `src/content/*.md` 为唯一数据源，构建时解析为 8 个虚拟模块，运行时零 Markdown 解析开销
- **Developer Academic 风格**：克制、专业、有细节（Slate + Amber，Inter + JetBrains Mono）
- **极简运行时**：仅 3 个运行时依赖（vue / vue-router / lucide-vue-next），gzip 主包 ~42.26 KB
- **完整测试**：Playwright E2E 163 项断言全部通过
- **优秀性能**：LCP 676ms / FCP < 1500ms（Vercel Production 实测）

---

## 快速启动

### 环境要求

- Node.js 18+
- npm 9+

### 安装与运行

```bash
# 安装依赖
npm install

# 开发模式（http://localhost:5173）
npm run dev

# 类型检查
npm run typecheck

# 生产构建
npm run build

# 预览生产构建
npm run preview

# E2E 测试（Playwright）
npm test
```

---

## 技术栈

| 层级 | 选型 | 版本 |
|---|---|---|
| 框架 | Vue 3（`<script setup lang="ts">` + Composition API） | 3.5+ |
| 语言 | TypeScript（strict: true） | 5.6.3 |
| 构建 | Vite（含构建时内容插件） | 6.4.3 |
| 路由 | Vue Router（createWebHistory） | 4.5+ |
| CSS | CSS Custom Properties（设计令牌系统） | — |
| 图标 | Lucide Vue Next | 0.460+ |
| 字体 | Inter + JetBrains Mono（Google Fonts） | — |
| Markdown 解析 | markdown-it + gray-matter（仅构建时） | 14.3.0 / 4.0.3 |
| 代码高亮 | Shiki（仅构建时，深色主题不随主题切换） | 4.3.1 |
| E2E 测试 | Playwright | 1.48+ |
| 部署 | Vercel（SPA rewrites，master 自动部署） | — |

**运行时依赖（3 项）**：`vue` / `vue-router` / `lucide-vue-next`

---

## 项目结构

```
个人网页/
├── src/
│   ├── assets/projects/              # 3 个项目架构图 SVG
│   ├── components/                   # 16 个组件（common / home / interview / project）
│   ├── composables/                  # useScrollReveal / useTheme
│   ├── content/                      # ★ Markdown SSOT 数据源（14 个文件）
│   ├── layouts/                      # DefaultLayout
│   ├── pages/                        # 8 个页面
│   ├── router/                       # 路由配置
│   ├── styles/                       # tokens / global / motion / code-theme
│   ├── types/                        # 9 个类型定义
│   └── utils/                        # content.ts（核心）/ markdown.ts
├── public/                           # favicon / robots.txt / sitemap.xml
├── docs/                             # 架构确认文档 + 历史归档
├── HANDOFF.md                        # ★ 唯一入口文档
├── ARCHITECTURE.md                   # 系统架构 SSOT
├── PROJECT_STATUS.md                 # 完成情况 SSOT
├── DEVELOPMENT_HISTORY.md            # 开发历史 SSOT（含 Phase 0-7 完整演进）
├── ROADMAP.md                        # 未来规划 SSOT（含 v3.5.1 Backlog）
├── TECHNICAL_DEBT.md                 # 技术债 SSOT（含 3 项 P2 详情）
├── AI_RULES.md                       # AI 协作约束
├── Portfolio_v3.5_CREATIVE_DIRECTION.md     # LOCKED 设计规范
├── Portfolio_v3.5_IMPLEMENTATION_PLAN.md    # LOCKED 实施计划
├── Portfolio_v3.5_IMPLEMENTATION_READINESS.md # LOCKED 验收标准
├── package.json                      # 版本号 3.5.0 + 脚本
├── vite.config.ts                    # Vite 配置 + contentPlugin
├── vercel.json                       # SPA rewrites
└── release-gate-task-005.mjs         # ★ Playwright E2E 测试（163 项断言）
```

---

## 文档导航

### 必读文档（按顺序）

| # | 文档 | 作用 | 何时阅读 |
|---|---|---|---|
| 1 | [HANDOFF.md](HANDOFF.md) | **唯一入口** — 项目概览 + 接手指南 + AI 接手 | **必读** |
| 2 | [PROJECT_STATUS.md](PROJECT_STATUS.md) | 当前完成情况（✅/⚠/❌ 功能清单 + 测试覆盖） | 了解项目状态时 |
| 3 | [ARCHITECTURE.md](ARCHITECTURE.md) | 系统架构 + 设计原则 + 关键文件说明 | 理解架构时 |
| 4 | [AI_RULES.md](AI_RULES.md) | AI 协作约束 + 技术栈 + 禁止事项 | 任何开发前 |
| 5 | [docs/架构确认文档-v1.2.md](docs/架构确认文档-v1.2.md) | **架构锁定版，最高权威**（冲突仲裁依据） | 架构决策时 |

### 按需阅读

| 文档 | 作用 | 何时阅读 |
|---|---|---|
| [DEVELOPMENT_HISTORY.md](DEVELOPMENT_HISTORY.md) | 开发历史（Task / RC1-RC8 / Phase 0-7 演进 + 发布审计汇总） | 追溯历史决策时 |
| [ROADMAP.md](ROADMAP.md) | 未来规划（v3.5.1 Backlog + 未来方向） | 规划下一步时 |
| [TECHNICAL_DEBT.md](TECHNICAL_DEBT.md) | 技术债（3 项 P2 + 已知限制 + 已接受权衡） | 评估风险时 |

### LOCKED 权威文档（不得修改）

| 文档 | 作用 |
|---|---|
| [docs/架构确认文档-v1.2.md](docs/架构确认文档-v1.2.md) | 架构锁定版，**最高权威** |
| [Portfolio_v3.5_CREATIVE_DIRECTION.md](Portfolio_v3.5_CREATIVE_DIRECTION.md) | v3.5 创意方向规范 |
| [Portfolio_v3.5_IMPLEMENTATION_PLAN.md](Portfolio_v3.5_IMPLEMENTATION_PLAN.md) | v3.5 实施计划 |
| [Portfolio_v3.5_IMPLEMENTATION_READINESS.md](Portfolio_v3.5_IMPLEMENTATION_READINESS.md) | v3.5 验收标准 |

### 历史归档

| 目录 | 作用 |
|---|---|
| [docs/archive/v3.5-history/](docs/archive/v3.5-history/) | v3.5 开发过程历史文档归档（Phase Reports / Release Reports / Design Docs） |

---

## 核心设计思想

1. **Markdown SSOT 模式** — 所有内容以 `.md` 为唯一数据源，构建时解析为虚拟模块
2. **构建时处理** — markdown-it + Shiki 仅构建时运行，运行时零解析开销
3. **Developer Academic 风格** — 克制、专业、有细节（Slate + Amber）
4. **组件配额制** — 全站仅 1 个抽象组件，杜绝过度抽象
5. **设计令牌系统** — CSS Custom Properties + Dark Mode 零 JS 切换
6. **YAGNI 原则** — 不引入 Pinia / UI 库 / CSS 框架 / 动画库

> 详细的设计原则见 [ARCHITECTURE.md §11](ARCHITECTURE.md)。

---

## 部署

**自动部署**：push 到 `master` 分支后，Vercel 自动构建并部署到生产环境。

**部署平台**：Vercel（SPA rewrites 模式，静态托管 + Edge CDN）

**配置文件**：[vercel.json](vercel.json)

**线上地址**：https://lai-portfolio-xi.vercel.app

> ⚠️ `master` 分支受保护，禁止直接 push 历史。任何变更需通过 PR 合并。

---

## 开发约束

### 维护模式约束（v3.5.0 已发布）

- ✅ **允许**：修复 P0/P1 缺陷、安全问题
- ❌ **禁止**：新增功能 / 组件 / 依赖 / Design Token / 颜色 / 字体
- ⚠️ **新功能或大重构**：需用户重新批准新 Roadmap

### Git 安全规范

- 未经用户明确批准，不得进行 Git commit / tag / push
- 禁止 `git push --force` / `git reset --hard` / `git clean -fdx` / `git rebase -i`
- `master` 分支禁止直接 push，必须通过 PR
- Commit 格式：`<type>: <description>`（feat / fix / refactor / docs / test / chore / perf / ci）

### 隐私与安全

- 禁止推送：实习材料 / PII / API Key / Token / 密码
- 凭据通过环境变量或 `.gitignore` 排除的本地配置文件
- 详细规范见 [.trae/rules/privacy.md](.trae/rules/privacy.md)

> 完整的 AI 协作约束见 [AI_RULES.md](AI_RULES.md)。

---

## 测试

```bash
# 类型检查（0 错误）
npm run typecheck

# 生产构建（1666 模块）
npm run build

# Playwright E2E 测试（163 项断言）
npm test
```

**测试基线**：

| 测试类型 | 数量 | 通过率 |
|---|---|---|
| TypeScript typecheck | 0 错误 | 100% |
| Vite build | 1666 模块 | 100% |
| Playwright E2E | 163 项 | 100% |
| Phase 7 一致性 | 26 项 | 100% |

---

## 线上性能基线（2026-07-18 实测）

| 指标 | 实测值 | 阈值 | 结论 |
|---|---|---|---|
| LCP | 676ms | < 2500ms | ✅ 通过 |
| FCP | < 1500ms | < 1500ms | ✅ 通过 |
| CLS | 0.3756 | < 0.1 | ❌ baseline（详见 [TECHNICAL_DEBT.md](TECHNICAL_DEBT.md)） |
| 控制台错误 | 0 | 0 | ✅ 通过 |
| 7 路由 HTTP 200 | 7/7 | 全部 | ✅ 通过 |

---

## 相关链接

- **线上部署**：https://lai-portfolio-xi.vercel.app
- **Git 仓库**：本地仓库（master 分支）
- **最新版本**：v3.5.0（commit `5883faf`，tag `v3.5.0`）

---

## License

个人作品集项目，不开源。

---

> **新人与 AI 接手必读**：[HANDOFF.md](HANDOFF.md) 是项目唯一入口文档，阅读该文件即可获得全部上下文。
