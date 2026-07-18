# 07-release — 发布文档

> 发布流程与历史，权威内容以根目录 SSOT 文档为准。

## 当前版本

- **项目版本**：`v3.5.0`（Final Release 已发布）
- **最新 Commit**：`5883faf` release: Portfolio v3.5.0
- **最新 Tag**：`v3.5.0`（已推送 origin）
- **发布日期**：2026-07-18

## Git Tag 历史

| Tag | 阶段 | 状态 |
|---|---|---|
| `v0.3.0` | Task 001 工程骨架 | ✅ 已推送 |
| `v0.4.0` | Task 002 首页 | ✅ 已推送 |
| `v0.5.0` | Task 005 Skills/Resume/About | ✅ 已推送 |
| `v1.0.0` | Task 008 Resume 系统完善 | ✅ 已推送 |
| `v2.0.0` | RC2 Release | ✅ 已推送 |
| `v3.0.0` | RC8 Final Release | ✅ 已推送 |
| `v3.5.0` | Phase 7 Final Release | ✅ 已推送 |

## 发布流程

### 标准发布流程（v3.5.0 已执行）

1. 完成 5 维度审计（Code / Design / Performance / Accessibility / SEO）
2. 更新版本号（package.json）
3. 更新交接文档（HANDOFF / PROJECT_STATUS / DEVELOPMENT_HISTORY 等）
4. Git commit：`release: Portfolio vX.Y.Z`
5. Git tag：`vX.Y.Z`
6. Git push origin master + tag
7. Vercel 自动部署
8. 线上性能验证（LCP / FCP / CLS / 控制台错误 / 路由 HTTP 200）
9. 生成发布报告

### 维护版发布流程（v3.5.1 计划）

1. 用户批准进入维护期
2. 按顺序处理 P2 Backlog（P2-1 → P2-2）
3. 每项修复后执行完整验证（typecheck + build + Playwright + 线上验证）
4. 生成 v3.5.1 Review Report
5. 用户验收
6. Git commit + tag `v3.5.1` + push origin
7. Vercel 部署验证 + 线上 Core Web Vitals 验证
8. 更新交接文档

## 发布审计结果（v3.5.0）

- ✅ 5 维度审计共 **0 P0 / 0 P1 / 3 P2**（P2 全部为 baseline 问题）
- ✅ Bundle 体积：1666 模块 / gzip 主包 ~42.26 KB
- ✅ typecheck + build + Playwright 163/163 全部通过
- ✅ 线上验证：LCP 676ms / FCP < 1500ms / 0 控制台错误 / 7 路由 HTTP 200

## 历史发布报告（已归档）

历史发布报告已归档至 [docs/archive/v3.5-history/release/](../archive/v3.5-history/release/)：
- `RELEASE_REVIEW_REPORT.md` — 发布审计汇总（RC1-RC8 + Phase 0-7）
- `Phase7_FINAL_REVIEW_REPORT.md` — Phase 7 最终验收报告
- `DOCUMENTATION_CLEANUP_REPORT.md` — 文档清理报告
- `Documentation_CLEANUP_PLAN.md` — 文档清理计划

> 详细发布历史见 [DEVELOPMENT_HISTORY.md](../../DEVELOPMENT_HISTORY.md)。
