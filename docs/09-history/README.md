# 09-history — 历史归档索引

> 历史文档归档索引，所有历史文档位于 [docs/archive/v3.5-history/](../archive/v3.5-history/)。

## 归档区位置

**主归档区**：[docs/archive/v3.5-history/](../archive/v3.5-history/)

## 归档文档分类

### design/ — 历史设计文档

| 文档 | 作用 | 当前状态 |
|---|---|---|
| `PROJECT_CONTEXT.md` | 旧版项目上下文 | 已被 HANDOFF.md 取代 |
| `PROJECT_MEMORY.md` | 长期决策记忆 | 已合并到 ARCHITECTURE.md + DEVELOPMENT_HISTORY.md |
| `screenshot-spec.md` | 截图规范 | 截图已入库 |
| `个人能力分析与网站规划报告.md` | 早期人物画像分析 | 仅供追溯 |
| `开发设计规范-v1.0.md` | v1.0 设计规范 | 已被 v1.2 取代 |
| `设计改良方案.md` | v3.5 设计改良方案 | 已被 CREATIVE_DIRECTION 取代 |

### phase/ — Phase Review Reports（8 份）

| 文档 | 阶段 |
|---|---|
| `Phase1_REVIEW_REPORT.md` | Phase 1 Scroll Reveal 全站应用 |
| `Phase2_PRE_FLIGHT_REPORT.md` | Phase 2 预检报告 |
| `Phase2_REVIEW_REPORT.md` | Phase 2 Hero 视觉主角 |
| `Phase3_REVIEW_REPORT.md` | Phase 3 Skills 重设计 |
| `Phase4_HOTFIX_REPORT.md` | Phase 4 CSS Cascade Hotfix |
| `Phase4_REVIEW_REPORT.md` | Phase 4 ProjectCard + Timeline |
| `Phase5_REVIEW_REPORT.md` | Phase 5 DecisionSection 结构化 |
| `Phase6_REVIEW_REPORT.md` | Phase 6 色彩 + 纹理 + Footer |

### release/ — Release 报告

| 文档 | 作用 |
|---|---|
| `DOCUMENTATION_CLEANUP_REPORT.md` | 文档清理报告 |
| `Documentation_CLEANUP_PLAN.md` | 文档清理计划 |
| `MAINTENANCE_BACKLOG_v3.5.1.md` | v3.5.1 维护 Backlog（已合并到 ROADMAP + TECHNICAL_DEBT） |
| `Phase7_FINAL_REVIEW_REPORT.md` | Phase 7 最终验收报告（已合并到 DEVELOPMENT_HISTORY） |
| `RELEASE_REVIEW_REPORT.md` | 发布审计汇总（已合并到 DEVELOPMENT_HISTORY） |

### task/ — 早期 Task 报告

| 文档 | 作用 |
|---|---|
| `task000-completion-report.md` | Task 000 内容资产整理完成报告 |

## 归档原则

1. **历史性**：归档文档记录项目某个历史时刻的状态，不反映当前最新情况
2. **不可修改**：归档文档冻结，不再更新内容
3. **不作为权威**：任何决策以根目录 SSOT 文档为准
4. **仅供追溯**：当需要理解"为什么会形成当前设计"时，可参考归档文档

## 历史脚本归档

根目录保留以下历史验证脚本，已完成使命但保留在原位置以便运行回归测试，不移动到归档区：

| 脚本 | 用途 | 当前状态 |
|---|---|---|
| `release-gate-task-005.mjs` | 主 E2E 测试套件（163 项断言） | ✅ **当前使用**（npm test 入口） |
| `phase2-verify.mjs` | Phase 2 验证 | 历史脚本，仅供回归 |
| `phase3-special-verify.mjs` | Phase 3 验证 | 历史脚本，仅供回归 |
| `phase4-hotfix-verify.mjs` | Phase 4 Hotfix 验证 | 历史脚本，仅供回归 |
| `phase4-special-verify.mjs` | Phase 4 验证 | 历史脚本，仅供回归 |
| `phase5-special-verify.mjs` | Phase 5 验证 | 历史脚本，仅供回归 |
| `phase5-cls-baseline.mjs` | Phase 5 CLS baseline 测量 | 历史脚本，仅供回归 |
| `phase6-a11y-verify.mjs` | Phase 6 可访问性验证 | 历史脚本，仅供回归 |
| `phase7-consistency-verify.mjs` | Phase 7 一致性验证 | 历史脚本，仅供回归 |
| `phase7-perf-verify.mjs` | Phase 7 性能验证 | 历史脚本，仅供回归 |
| `phase7-prod-verify.mjs` | Phase 7 生产环境验证 | 历史脚本，仅供回归 |
| `release-gate-test.mjs` | 早期发布门禁测试 | 历史脚本，仅供回归 |

**保留原则**：
- 不删除：维护模式下禁止破坏 git 历史，删除需用户明确批准
- 不移动：移动会破坏 `npm test` 引用和 git 历史追溯
- 不修改：v3.5.0 Baseline 已冻结

> 归档区详细说明见 [docs/archive/v3.5-history/README.md](../archive/v3.5-history/README.md)。
