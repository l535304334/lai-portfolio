# 08-maintenance — 维护文档

> 维护期 Backlog 与计划，权威内容以根目录 SSOT 文档为准。

## 当前维护状态

- **项目版本**：v3.5.0（Final Release 已发布）
- **维护阶段**：维护模式（仅修复 P0/P1 + 安全问题）
- **v3.5.0 Baseline**：✅ 冻结
- **v3.5.1 状态**：待用户批准进入维护期处理

## 维护范围

- ✅ **允许**：修复 P0/P1 缺陷、安全问题
- ❌ **禁止**：新增功能 / 组件 / 依赖 / Design Token / 颜色 / 字体
- ⚠️ **新功能或大重构**：需用户重新批准新 Roadmap

## P2 维护 Backlog（3 项，需用户批准）

### P2-1: Footer 字体加载导致 CLS 0.3756

| 项 | 值 |
|---|---|
| **严重度** | P2（用户体验 + SEO） |
| **引入版本** | v3.0.0 baseline（非 v3.5 引入） |
| **根因** | Footer 字体加载导致布局偏移 |
| **推荐方案** | font preload — 在 `index.html` `<head>` 添加 `<link rel="preload" as="font">` |
| **修改范围** | `index.html`（仅添加 preload 标签） |
| **处理时机** | v3.5.1 维护期，需用户批准 |

### P2-2: Amber accent + white 文字对比度 3.19:1

| 项 | 值 |
|---|---|
| **严重度** | P2（无障碍） |
| **引入版本** | v3.0.0 baseline（非 v3.5 引入） |
| **根因** | 按钮文字 14px regular weight，未达 large text 阈值 |
| **推荐方案** | `font-weight: 600` — 按钮文字加粗，触发 large text 阈值 |
| **修改范围** | `src/styles/tokens.css` 或 `src/styles/global.css` |
| **处理时机** | v3.5.1 维护期，需用户批准 |

### P2-3: FCP 线上复测（已自愈，仅记录）

| 项 | 值 |
|---|---|
| **严重度** | P2（已自愈，仅记录） |
| **结论** | FCP 问题为 local server 环境噪声，线上 Vercel CDN 已达标 |
| **处理时机** | 无需处理 |

## v3.5.1 维护期处理计划

### 处理顺序

| 顺序 | 问题 | 优先级 | 修改范围 |
|---|---|---|---|
| 1 | P2-1 Footer CLS | 中 | `index.html`（font preload） |
| 2 | P2-2 Amber 对比度 | 低 | `tokens.css` 或 `global.css`（font-weight） |
| 3 | P2-3 FCP | — | 无需处理 |

### 处理原则

- **最小修改**：仅触碰必须改的地方，不重构无关代码
- **不扩大 Scope**：不新增组件 / 依赖 / Design Token / 颜色 / 字体
- **可回滚**：每个修改都应能独立回滚
- **完整验证**：每项修复后执行 typecheck + build + Playwright + 线上验证
- **用户批准**：所有修改需用户明确批准后才能动工

### v3.5.1 发布条件

- ✅ 至少处理 P2-1（Footer CLS）
- ✅ 通过完整验证（typecheck + build + Playwright + 线上 Core Web Vitals）
- ✅ CLS 从 0.375 降低到 < 0.1
- ✅ 用户验收通过

## 已接受的权衡（非技术债，无需处理）

- Phase 3 Skills Bundle gzip 增量 +1.70 kB（用户 2026-07-17 批准接受）
- Interview subtitle 动态计算（合理架构选择）
- v3.5 Bundle 总累积增量 ~ +5.0-5.5 kB gzip（预算边界附近）

> 详细技术债见 [TECHNICAL_DEBT.md](../../TECHNICAL_DEBT.md)，详细规划见 [ROADMAP.md](../../ROADMAP.md)。
