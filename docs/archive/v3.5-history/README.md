# 历史文档归档（v3.5-history）

> **本目录是 Portfolio v3.5 开发过程中产生的所有历史文档归档区。**
>
> 这些文档记录了项目从 v3.0.0 到 v3.5.0 的完整演进过程，仅供追溯历史决策、Review 记录、Phase 报告时参考。
>
> ⚠️ **本目录内所有文档属于历史资料，不再维护。** 当前权威文档以项目根目录的 SSOT 文档为准（HANDOFF.md / ARCHITECTURE.md / PROJECT_STATUS.md / DEVELOPMENT_HISTORY.md / ROADMAP.md / TECHNICAL_DEBT.md / AI_RULES.md）。

---

## 目录结构

```
docs/archive/v3.5-history/
├── README.md                          # 本文件（归档区说明）
├── design/                            # 历史设计文档（6 份）
│   ├── screenshot-spec.md             # 截图规范（截图已入库）
│   ├── 个人能力分析与网站规划报告.md   # 早期人物画像分析
│   ├── 开发设计规范-v1.0.md           # v1.0 设计规范（已被 v1.2 取代）
│   └── 设计改良方案.md                # v3.5 设计改良方案（已被 CREATIVE_DIRECTION 取代）
├── phase/                             # Phase Review Reports（8 份）
│   ├── Phase1_REVIEW_REPORT.md        # Phase 1 Scroll Reveal 全站应用
│   ├── Phase2_PRE_FLIGHT_REPORT.md    # Phase 2 预检报告
│   ├── Phase2_REVIEW_REPORT.md        # Phase 2 Hero 视觉主角
│   ├── Phase3_REVIEW_REPORT.md        # Phase 3 Skills 重设计
│   ├── Phase4_HOTFIX_REPORT.md        # Phase 4 CSS Cascade Hotfix
│   ├── Phase4_REVIEW_REPORT.md        # Phase 4 ProjectCard + Timeline
│   ├── Phase5_REVIEW_REPORT.md        # Phase 5 DecisionSection 结构化
│   └── Phase6_REVIEW_REPORT.md        # Phase 6 色彩 + 纹理 + Footer
├── release/                           # Release 报告（5 份）
│   ├── DOCUMENTATION_CLEANUP_REPORT.md  # 文档清理报告
│   ├── Documentation_CLEANUP_PLAN.md    # 文档清理计划
│   ├── Phase7_FINAL_REVIEW_REPORT.md    # Phase 7 最终验收报告
│   └── RELEASE_REVIEW_REPORT.md         # 发布审计汇总报告
└── task/                              # 早期 Task 报告
    └── task000-completion-report.md     # Task 000 内容资产整理完成报告
```

---

## 归档原则

1. **历史性**：本目录所有文档记录的是项目某个历史时刻的状态，不反映当前最新情况
2. **不可修改**：归档文档冻结，不再更新内容
3. **不作为权威**：任何决策以根目录 SSOT 文档为准，不以本目录文档为准
4. **仅供追溯**：当需要理解"为什么会形成当前设计"时，可参考本目录文档

---

## 已归档文件说明（内容已合并到根目录 SSOT）

以下文件的内容已经合并到根目录的 SSOT 文档中，本目录保留的版本仅供历史追溯，不再作为权威来源：

| 归档文件 | 内容已合并到 | 说明 |
|---|---|---|
| `design/PROJECT_CONTEXT.md` | `HANDOFF.md` | 已被 HANDOFF.md 取代为项目唯一入口 |
| `design/PROJECT_MEMORY.md` | `ARCHITECTURE.md` + `DEVELOPMENT_HISTORY.md` | 长期决策记忆已分散合并到对应 SSOT |
| `release/MAINTENANCE_BACKLOG_v3.5.1.md` | `ROADMAP.md` + `TECHNICAL_DEBT.md` | v3.5.1 维护 Backlog 已合并到规划与技术债文档 |
| `release/RELEASE_REVIEW_REPORT.md` | `DEVELOPMENT_HISTORY.md` | 发布审计汇总已合并到开发历史 |
| `release/Phase7_FINAL_REVIEW_REPORT.md` | `DEVELOPMENT_HISTORY.md` | Phase 7 验收报告已合并到开发历史 |

---

## 相关文档

| 文档 | 作用 |
|---|---|
| [HANDOFF.md](../../../HANDOFF.md) | 项目唯一入口文档 |
| [DEVELOPMENT_HISTORY.md](../../../DEVELOPMENT_HISTORY.md) | 开发历史 SSOT（含 Task/RC1-RC8/Phase 0-7 完整演进） |
| [PROJECT_STATUS.md](../../../PROJECT_STATUS.md) | 当前完成情况 SSOT |
