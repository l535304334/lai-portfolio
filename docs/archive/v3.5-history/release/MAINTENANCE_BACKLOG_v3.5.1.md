# v3.5.1 Maintenance Backlog

> **创建日期**：2026-07-18
> **基线版本**：v3.5.0（已发布）
> **状态**：待用户批准进入维护期处理
> **原则**：仅 P2 级别记录，不阻塞 v3.5.0 发布；需用户明确批准才能动工

---

## 1. 概述

v3.5.0 Final Release 已完成发布（commit `5883faf` + tag `v3.5.0` + push origin + Vercel 部署验证通过）。线上性能验证结果 21/23 通过，2 项 CLS 失败均为 v3.0.0 baseline 已知问题，非 v3.5 引入。

本 Backlog 记录 v3.5.0 发布后发现/确认的 P2 问题，作为 v3.5.1 维护期的处理候选。**未经用户明确批准，不得动工**。

---

## 2. P2 问题清单

### P2-1: Footer 字体加载导致 CLS 0.3756（线上复测确认）

| 项 | 值 |
|---|---|
| **严重度** | P2（用户体验） |
| **引入版本** | v3.0.0 baseline（非 v3.5 引入） |
| **线上实测** | Home CLS 0.3756 / Resume CLS 0.3759（Vercel Production，2026-07-18） |
| **阈值** | < 0.1 |
| **CLS 来源** | FOOTER.footer 贡献 99.8% CLS（0.3750 / 0.3756） |
| **根因** | Footer 字体加载导致布局偏移（font-display: swap 已启用，但字体加载期间仍产生 layout shift） |
| **影响** | Core Web Vitals CLS 不达标，可能影响搜索引擎排名和用户体验评分 |
| **处理建议** | 1. font preload：在 index.html `<head>` 中添加 `<link rel="preload" as="font">` 预加载关键字重；2. font subset：使用 fonttools 或 Google Fonts `?text=` 参数生成子集字体，减少加载体积；3. font-display: optional：将 swap 改为 optional，字体加载失败时使用系统字体不产生 CLS（但可能影响视觉一致性） |
| **推荐方案** | 方案 1（font preload）— 最小改动，效果明确 |
| **优先级** | 中（用户体验 + SEO） |
| **处理时机** | v3.5.1 维护期，需用户批准 |

### P2-2: Amber accent + white 文字对比度 3.19:1

| 项 | 值 |
|---|---|
| **严重度** | P2（无障碍） |
| **引入版本** | v3.0.0 baseline（非 v3.5 引入） |
| **WCAG 标准** | normal text ≥ 4.5:1 / large text (≥ 18px 或 ≥ 14px bold) ≥ 3:1 |
| **当前状态** | Amber `#d97706` + white 文字对比度 3.19:1，低于 4.5:1（normal text 阈值） |
| **影响范围** | 所有使用 Amber 背景 + white 文字的按钮（如 "查看详情" / "GitHub" 等） |
| **根因** | 按钮文字 14px regular weight（400），未达到 large text 阈值（需 ≥ 18px 或 ≥ 14px bold） |
| **处理建议** | 1. 按钮文字加粗到 600（`font-weight: 600`）— 触发 large text 阈值（≥ 14px bold），对比度要求降为 ≥ 3:1；2. 按钮字号增大到 16px+ — 触发 large text 阈值（≥ 18px），对比度要求降为 ≥ 3:1；3. 调整 Amber 色值加深（如 `#b45309`）— 直接提升对比度到 4.5:1+，但影响品牌一致性 |
| **推荐方案** | 方案 1（font-weight: 600）— 最小改动，符合 large text 标准，不影响视觉品牌 |
| **优先级** | 低（baseline 设计决策，WCAG AA 非强制） |
| **处理时机** | v3.5.1 维护期，需用户批准 |

### P2-3: FCP 线上复测（已通过，仅记录）

| 项 | 值 |
|---|---|
| **严重度** | P2（已自愈，仅记录） |
| **引入版本** | local server 环境限制（非真实问题） |
| **local server 实测** | FCP 1908ms（> 1500ms 阈值） |
| **线上实测** | FCP < 1500ms ✅ 通过（Vercel Production，2026-07-18） |
| **结论** | FCP 问题为 local server 环境噪声，线上 Vercel CDN + Edge Network 加速后已达标，**无需处理** |
| **优先级** | —（已自愈） |
| **处理时机** | 无需处理 |

---

## 3. v3.5.1 维护期处理建议

### 3.1 推荐处理顺序

1. **P2-1 Footer CLS**（优先级中）— 影响 Core Web Vitals 和 SEO，建议优先处理
2. **P2-2 Amber 对比度**（优先级低）— 影响 WCAG AA 合规，但不影响功能
3. P2-3 FCP — 无需处理（线上已通过）

### 3.2 处理原则

- **最小修改**：仅触碰必须改的地方，不重构无关代码
- **不扩大 Scope**：不新增组件 / 依赖 / Design Token / 颜色 / 字体
- **可回滚**：每个修改都应能独立回滚
- **完整验证**：每项修复后执行 typecheck + build + Playwright + 线上验证
- **用户批准**：所有修改需用户明确批准后才能动工

### 3.3 v3.5.1 发布条件

- 至少处理 P2-1（Footer CLS）
- 通过完整验证（typecheck + build + Playwright + 线上 Core Web Vitals）
- CLS 从 0.375 降低到 < 0.1
- 用户验收通过

---

## 4. 线上性能验证数据（v3.5.0 基线）

**验证日期**：2026-07-18
**验证环境**：Vercel Production（https://lai-portfolio-xi.vercel.app）
**验证脚本**：`phase7-prod-verify.mjs`

| 指标 | Home | Resume | 阈值 | 结论 |
|---|---|---|---|---|
| HTTP 200 | ✅ | ✅ | 200 | ✅ 全部通过 |
| LCP | 676ms | 660ms | < 2500ms | ✅ 远优于阈值 |
| CLS | 0.3756 | 0.3759 | < 0.1 | ❌ baseline 问题（P2-1） |
| FCP | < 1500ms | < 1500ms | < 1500ms | ✅ 通过 |
| 控制台错误 | 0 | 0 | 0 | ✅ 全站无错误 |
| callout 渲染 | — | 8/8 通过 | 全部通过 | ✅ Phase 7 核心交付已上线 |

**验证结果**：21/23 通过，2 项 CLS 失败为 baseline 问题（P2-1），不阻塞 v3.5.0 发布。

---

**v3.5.1 Maintenance Backlog 结束。** 等待用户批准进入维护期处理。
