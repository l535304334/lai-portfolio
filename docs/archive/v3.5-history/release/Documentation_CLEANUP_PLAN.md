# Documentation Cleanup Plan（文档资产审计与清理计划）

> **本文件是 Documentation Audit 的输出结果，仅供用户审阅。**
>
> **审计日期**：2026-07-18
> **项目阶段**：v3.5.0 Released（维护模式）
> **审计范围**：项目根目录 + docs/ 下所有规划类文档（.md / .txt / .mjs / .json）
> **审计约束**：只读分析，不删除、不修改任何文件；生成 Cleanup Plan 后停止，等待用户确认
>
> **当前 Git 状态**：v3.5.0 已发布（commit `5883faf` + tag `v3.5.0`），3 个发布后文件未提交（HANDOFF.md 更新 / MAINTENANCE_BACKLOG_v3.5.1.md / phase7-prod-verify.mjs）

---

## 1. 执行摘要

### 1.1 审计目标

在不影响项目维护、交接和后续 AI 协作的前提下，识别所有过时、重复、历史性或无实际价值的文档，输出分类清理建议。

### 1.2 审计方法（5 阶段）

| 阶段 | 内容 | 状态 |
|---|---|---|
| 第一阶段 | 建立文档清单（扫描 + 分析每个文档的作用/引用/价值/标签） | ✅ 完成 |
| 第二阶段 | 检查引用关系（grep 扫描文档间相互引用） | ✅ 完成 |
| 第三阶段 | 识别重复文档（Phase Reports vs Phase7 Final / RC Reports vs RELEASE_REVIEW_REPORT） | ✅ 完成 |
| 第四阶段 | 生成 Documentation_CLEANUP_PLAN.md（本文件） | ✅ 完成 |
| 第五阶段 | 停止，等待用户确认 | ⏸️ 当前 |

### 1.3 关键发现

| # | 发现 | 影响 |
|---|---|---|
| 1 | **Phase1-6 Reports 完全孤立**（未被任何文档引用，包括 HANDOFF.md 和 RELEASE_REVIEW_REPORT.md） | 7 个文件可归档 |
| 2 | **Phase7_FINAL_REVIEW_REPORT 没有汇总 Phase 1-6 内容** | Phase 1-6 Reports 包含独有详细技术决策，不能直接删除，只能归档 |
| 3 | **PROJECT_CONTEXT.md / PROJECT_MEMORY.md / AI_RULES.md 严重过时**（停留在 Task 010 RC1，实际已 v3.5.0） | 3 个文件需重写或合并 |
| 4 | **AI_RULES.md 与 .trae/rules/ 系统大量重复**（§6/§9/§10/§11 已被工作区规则覆盖） | AI_RULES.md 需精简 |
| 5 | **release-gate-test.mjs 已废弃**（已被 release-gate-task-005.mjs 替代，且在 .gitignore 中） | 1 个文件可删除 |
| 6 | **docs/ 下 4 个文档已完成使命**（规划报告 / 设计规范 v1.0 / Task 000 报告 / 截图规范） | 4 个文件可归档 |
| 7 | **早期 Phase 验证脚本（phase2-6 *.mjs）已完成使命** | 7 个文件可归档 |

### 1.4 统计汇总

| 分类 | 数量 | 总大小 | 处置 |
|---|---|---|---|
| KEEP（永久保留） | 14 | ~510 KB | 当前维护核心 |
| ARCHIVE（归档） | 18 | ~330 KB | 移至 docs/archive/，保留历史追溯 |
| DELETE（删除） | 1 | ~19 KB | 已废弃，无价值 |
| MERGE（合并） | 1 | ~12 KB | PROJECT_CONTEXT.md 合并到 HANDOFF.md |
| UPDATE（重写） | 2 | ~109 KB | PROJECT_MEMORY.md + AI_RULES.md 精简重写 |
| **合计** | **36** | **~980 KB** | — |

---

## 2. 文档清单与标签（完整审计表）

### 2.1 核心交接文档

| 文件 | 大小 | 当前作用 | 引用来源 | 维护价值 | 标签 |
|---|---|---|---|---|---|
| [HANDOFF.md](file:///c:/Users/lai/Desktop/个人网页/HANDOFF.md) | 105.9 KB | 最终交接文档，新会话仅读此文件即可恢复全部上下文 | Phase3/4/5/7 + IMPLEMENTATION_PLAN + READINESS + PROJECT_MEMORY + RELEASE_REVIEW_REPORT | **最高** | **KEEP** |
| [RELEASE_REVIEW_REPORT.md](file:///c:/Users/lai/Desktop/个人网页/RELEASE_REVIEW_REPORT.md) | 156.9 KB | RC1-RC8 + Phase 7 完整 Release Audit 汇总（§1-§26） | Phase3/4/5/7 + HANDOFF + PROJECT_MEMORY | **高**（§26 是 Phase 7 Final Review） | **KEEP** |

### 2.2 v3.5 Roadmap 设计规范（LOCKED v1.0）

| 文件 | 大小 | 当前作用 | 引用来源 | 维护价值 | 标签 |
|---|---|---|---|---|---|
| [Portfolio_v3.5_CREATIVE_DIRECTION.md](file:///c:/Users/lai/Desktop/个人网页/Portfolio_v3.5_CREATIVE_DIRECTION.md) | 45.6 KB | 创意方向规范（Signature 6 元素 / 色彩 / 排版 / Motion），LOCKED v1.0 | Phase1-7 Reports + READINESS + RELEASE_REVIEW_REPORT | **高**（v3.5 设计权威） | **KEEP** |
| [Portfolio_v3.5_IMPLEMENTATION_PLAN.md](file:///c:/Users/lai/Desktop/个人网页/Portfolio_v3.5_IMPLEMENTATION_PLAN.md) | 38.2 KB | 实施计划（Phase 0-7 任务分解），LOCKED | Phase1-7 Reports + READINESS + RELEASE_REVIEW_REPORT | **高**（v3.5 实施计划） | **KEEP** |
| [Portfolio_v3.5_IMPLEMENTATION_READINESS.md](file:///c:/Users/lai/Desktop/个人网页/Portfolio_v3.5_IMPLEMENTATION_READINESS.md) | 42.6 KB | 就绪标准与验收门槛（Review Gates），LOCKED | Phase1-7 Reports + RELEASE_REVIEW_REPORT | **高**（v3.5 验收标准） | **KEEP** |

### 2.3 项目上下文文档（过时）

| 文件 | 大小 | 当前作用 | 引用来源 | 维护价值 | 标签 |
|---|---|---|---|---|---|
| [PROJECT_CONTEXT.md](file:///c:/Users/lai/Desktop/个人网页/PROJECT_CONTEXT.md) | 12.3 KB | 项目上下文索引 | HANDOFF + PROJECT_MEMORY | **过时**（当前阶段：Task 008，实际 v3.5.0）；与 HANDOFF.md §一 + AI_RULES.md §1-§2 大量重复 | **MERGE** |
| [PROJECT_MEMORY.md](file:///c:/Users/lai/Desktop/个人网页/PROJECT_MEMORY.md) | 96.1 KB | 项目记忆档案（Task 执行过程、设计决策、问题） | AI_RULES + HANDOFF + PROJECT_CONTEXT + RELEASE_REVIEW_REPORT | **过时**（当前阶段：Task 010 RC1，实际 v3.5.0）；与 HANDOFF.md §二 + RELEASE_REVIEW_REPORT 章节重叠 | **UPDATE** |
| [AI_RULES.md](file:///c:/Users/lai/Desktop/个人网页/AI_RULES.md) | 12.7 KB | AI 协作规范 | HANDOFF + PROJECT_CONTEXT + PROJECT_MEMORY + RELEASE_REVIEW_REPORT | **部分过时**（§7 Task 进度停留在 Task 010，§13 已知问题多数已解决）；§6/§9/§10/§11 与 .trae/rules/ 重复 | **UPDATE** |

### 2.4 Phase Reports（v3.5 开发历史）

| 文件 | 大小 | 当前作用 | 引用来源 | 维护价值 | 标签 |
|---|---|---|---|---|---|
| [Phase1_REVIEW_REPORT.md](file:///c:/Users/lai/Desktop/个人网页/Phase1_REVIEW_REPORT.md) | 20.5 KB | Phase 1 Scroll Reveal 验收报告 | **无**（孤立） | **历史性**（包含独有技术决策：基础设施修复、16 个文件修改、Scroll Reveal 覆盖范围） | **ARCHIVE** |
| [Phase2_PRE_FLIGHT_REPORT.md](file:///c:/Users/lai/Desktop/个人网页/Phase2_PRE_FLIGHT_REPORT.md) | 21.3 KB | Phase 2 预检报告 | Phase2_REVIEW_REPORT | **历史性**（Phase 2 已完成） | **ARCHIVE** |
| [Phase2_REVIEW_REPORT.md](file:///c:/Users/lai/Desktop/个人网页/Phase2_REVIEW_REPORT.md) | 24.6 KB | Phase 2 Hero 验收报告 | **无**（孤立） | **历史性** | **ARCHIVE** |
| [Phase3_REVIEW_REPORT.md](file:///c:/Users/lai/Desktop/个人网页/Phase3_REVIEW_REPORT.md) | 23.3 KB | Phase 3 Skills 验收报告 | **无**（孤立） | **历史性** | **ARCHIVE** |
| [Phase4_HOTFIX_REPORT.md](file:///c:/Users/lai/Desktop/个人网页/Phase4_HOTFIX_REPORT.md) | 14.0 KB | Phase 4 CSS Cascade 热修复报告 | **无**（孤立） | **历史性**（热修复已完成） | **ARCHIVE** |
| [Phase4_REVIEW_REPORT.md](file:///c:/Users/lai/Desktop/个人网页/Phase4_REVIEW_REPORT.md) | 29.0 KB | Phase 4 ProjectCard + Timeline 验收报告 | **无**（孤立） | **历史性** | **ARCHIVE** |
| [Phase5_REVIEW_REPORT.md](file:///c:/Users/lai/Desktop/个人网页/Phase5_REVIEW_REPORT.md) | 12.2 KB | Phase 5 DecisionSection 验收报告 | **无**（孤立） | **历史性** | **ARCHIVE** |
| [Phase6_REVIEW_REPORT.md](file:///c:/Users/lai/Desktop/个人网页/Phase6_REVIEW_REPORT.md) | 17.0 KB | Phase 6 色彩 + 纹理 + Footer 验收报告 | **无**（孤立） | **历史性** | **ARCHIVE** |
| [Phase7_FINAL_REVIEW_REPORT.md](file:///c:/Users/lai/Desktop/个人网页/Phase7_FINAL_REVIEW_REPORT.md) | 19.0 KB | Phase 7 Final Review（v3.5.0 最终验收） | HANDOFF + RELEASE_REVIEW_REPORT §26 | **高**（最新最终验收报告） | **KEEP** |

### 2.5 维护期 Backlog

| 文件 | 大小 | 当前作用 | 引用来源 | 维护价值 | 标签 |
|---|---|---|---|---|---|
| [MAINTENANCE_BACKLOG_v3.5.1.md](file:///c:/Users/lai/Desktop/个人网页/MAINTENANCE_BACKLOG_v3.5.1.md) | 5.3 KB | v3.5.1 维护期 Backlog（3 项 P2） | HANDOFF | **高**（维护期决策依据） | **KEEP** |

### 2.6 工程规范文档（docs/）

| 文件 | 大小 | 当前作用 | 引用来源 | 维护价值 | 标签 |
|---|---|---|---|---|---|
| [docs/架构确认文档-v1.2.md](file:///c:/Users/lai/Desktop/个人网页/docs/架构确认文档-v1.2.md) | 22.1 KB | 架构锁定版，最高权威 | AI_RULES + HANDOFF + PROJECT_CONTEXT + PROJECT_MEMORY + RELEASE_REVIEW_REPORT | **高**（冲突仲裁依据） | **KEEP** |
| [docs/开发设计规范-v1.0.md](file:///c:/Users/lai/Desktop/个人网页/docs/开发设计规范-v1.0.md) | 46.5 KB | 开发设计规范（文件名 v1.0，内容 v1.1） | AI_RULES + HANDOFF + PROJECT_CONTEXT + PROJECT_MEMORY（作为"参考用"） | **部分过时**（设计规范已被 Portfolio_v3.5_CREATIVE_DIRECTION.md 取代；版本号不一致已知问题） | **ARCHIVE** |
| [docs/个人能力分析与网站规划报告.md](file:///c:/Users/lai/Desktop/个人网页/docs/个人能力分析与网站规划报告.md) | 27.1 KB | v1.0 规划报告，背景资料 | AI_RULES + HANDOFF + PROJECT_CONTEXT + PROJECT_MEMORY（作为"背景资料"） | **历史性**（已完成使命） | **ARCHIVE** |
| [docs/task000-completion-report.md](file:///c:/Users/lai/Desktop/个人网页/docs/task000-completion-report.md) | 2.6 KB | Task 000 完成报告 | HANDOFF + PROJECT_CONTEXT + PROJECT_MEMORY | **历史性**（Task 000 已于 2026-07-08 完成） | **ARCHIVE** |
| [docs/assets/screenshot-spec.md](file:///c:/Users/lai/Desktop/个人网页/docs/assets/screenshot-spec.md) | 3.5 KB | 截图规范 | PROJECT_CONTEXT + PROJECT_MEMORY | **已完成使命**（Task 006 已完成截图入库） | **ARCHIVE** |

### 2.7 验证脚本（.mjs）

| 文件 | 大小 | 当前作用 | 引用来源 | 维护价值 | 标签 |
|---|---|---|---|---|---|
| [release-gate-task-005.mjs](file:///c:/Users/lai/Desktop/个人网页/release-gate-task-005.mjs) | 54.7 KB | 主 E2E 测试（163/163，含 Phase 7 专项断言） | HANDOFF §0 SNAPSHOT | **高**（当前维护核心测试） | **KEEP** |
| [phase7-prod-verify.mjs](file:///c:/Users/lai/Desktop/个人网页/phase7-prod-verify.mjs) | 9.4 KB | 线上 Vercel 性能验证 | 无（未提交） | **中**（维护期线上验证工具） | **KEEP** |
| [phase7-consistency-verify.mjs](file:///c:/Users/lai/Desktop/个人网页/phase7-consistency-verify.mjs) | 22.3 KB | Phase 7 全站一致性验证（26 项断言） | Phase7_FINAL_REVIEW_REPORT | **中**（维护期回归测试） | **KEEP** |
| [phase7-perf-verify.mjs](file:///c:/Users/lai/Desktop/个人网页/phase7-perf-verify.mjs) | 10.0 KB | Phase 7 性能验证（17 项断言） | Phase7_FINAL_REVIEW_REPORT | **中**（维护期回归测试） | **KEEP** |
| [phase2-verify.mjs](file:///c:/Users/lai/Desktop/个人网页/phase2-verify.mjs) | 4.9 KB | Phase 2 验证 | 无 | **历史性**（Phase 2 已完成） | **ARCHIVE** |
| [phase3-special-verify.mjs](file:///c:/Users/lai/Desktop/个人网页/phase3-special-verify.mjs) | 17.9 KB | Phase 3 Skills 专项验证 | 无 | **历史性** | **ARCHIVE** |
| [phase4-hotfix-verify.mjs](file:///c:/Users/lai/Desktop/个人网页/phase4-hotfix-verify.mjs) | 14.4 KB | Phase 4 Hotfix 验证 | 无 | **历史性** | **ARCHIVE** |
| [phase4-special-verify.mjs](file:///c:/Users/lai/Desktop/个人网页/phase4-special-verify.mjs) | 30.2 KB | Phase 4 专项验证 | 无 | **历史性** | **ARCHIVE** |
| [phase5-cls-baseline.mjs](file:///c:/Users/lai/Desktop/个人网页/phase5-cls-baseline.mjs) | 4.0 KB | Phase 5 CLS 基线测量 | 无 | **历史性** | **ARCHIVE** |
| [phase5-special-verify.mjs](file:///c:/Users/lai/Desktop/个人网页/phase5-special-verify.mjs) | 18.7 KB | Phase 5 专项验证 | 无 | **历史性** | **ARCHIVE** |
| [phase6-a11y-verify.mjs](file:///c:/Users/lai/Desktop/个人网页/phase6-a11y-verify.mjs) | 8.0 KB | Phase 6 a11y 验证 | 无 | **历史性** | **ARCHIVE** |
| [release-gate-test.mjs](file:///c:/Users/lai/Desktop/个人网页/release-gate-test.mjs) | 18.8 KB | 早期测试脚本，已被 release-gate-task-005.mjs 替代 | 无（已在 .gitignore 排除） | **无**（已废弃） | **DELETE** |

### 2.8 Bundle 基线记录

| 文件 | 大小 | 当前作用 | 引用来源 | 维护价值 | 标签 |
|---|---|---|---|---|---|
| [phase7-bundle-baseline.txt](file:///c:/Users/lai/Desktop/个人网页/phase7-bundle-baseline.txt) | 3.2 KB | Phase 7 Bundle 基线 + v3.5 累积增量汇总 | Phase7_FINAL_REVIEW_REPORT | **中**（v3.5 Bundle 基线对比依据） | **KEEP** |
| [phase6-bundle-baseline.txt](file:///c:/Users/lai/Desktop/个人网页/phase6-bundle-baseline.txt) | 1.8 KB | Phase 6 Bundle 基线 | 无 | **历史性**（已被 phase7 汇总） | **ARCHIVE** |

### 2.9 项目配置（.json）

| 文件 | 大小 | 当前作用 | 维护价值 | 标签 |
|---|---|---|---|---|
| [package.json](file:///c:/Users/lai/Desktop/个人网页/package.json) | 0.8 KB | 项目元数据（version: 3.5.0） | **高** | **KEEP** |
| [tsconfig.json](file:///c:/Users/lai/Desktop/个人网页/tsconfig.json) | 0.7 KB | TypeScript 配置 | **高** | **KEEP** |
| [tsconfig.node.json](file:///c:/Users/lai/Desktop/个人网页/tsconfig.node.json) | 0.3 KB | Node 环境 TS 配置 | **高** | **KEEP** |
| [vercel.json](file:///c:/Users/lai/Desktop/个人网页/vercel.json) | 0.1 KB | Vercel 部署配置（SPA rewrites） | **高** | **KEEP** |

---

## 3. 引用关系分析

### 3.1 引用关系图（源文件 → 引用目标）

```
HANDOFF.md → AI_RULES.md, MAINTENANCE_BACKLOG_v3.5.1.md, Phase7_FINAL_REVIEW_REPORT.md,
              Portfolio_v3.5_CREATIVE_DIRECTION.md, Portfolio_v3.5_IMPLEMENTATION_PLAN.md,
              Portfolio_v3.5_IMPLEMENTATION_READINESS.md, PROJECT_CONTEXT.md, PROJECT_MEMORY.md,
              RELEASE_REVIEW_REPORT.md, task000-completion-report.md,
              个人能力分析与网站规划报告.md, 开发设计规范-v1.0.md, 架构确认文档-v1.2.md

RELEASE_REVIEW_REPORT.md → AI_RULES.md, HANDOFF.md, Phase7_FINAL_REVIEW_REPORT.md,
                            Portfolio_v3.5_*.md, PROJECT_CONTEXT.md, PROJECT_MEMORY.md, 架构确认文档-v1.2.md

PROJECT_MEMORY.md → AI_RULES.md, HANDOFF.md, PROJECT_CONTEXT.md, RELEASE_REVIEW_REPORT.md,
                    task000-completion-report.md, 个人能力分析与网站规划报告.md,
                    开发设计规范-v1.0.md, 架构确认文档-v1.2.md, screenshot-spec.md

PROJECT_CONTEXT.md → AI_RULES.md, PROJECT_MEMORY.md, task000-completion-report.md,
                     个人能力分析与网站规划报告.md, 开发设计规范-v1.0.md, 架构确认文档-v1.2.md, screenshot-spec.md

AI_RULES.md → PROJECT_MEMORY.md, 个人能力分析与网站规划报告.md, 开发设计规范-v1.0.md, 架构确认文档-v1.2.md

Phase2_REVIEW_REPORT.md → Phase2_PRE_FLIGHT_REPORT.md（唯一引用）
Phase1/3/4/5/6_REVIEW_REPORT.md → 无引用（完全孤立）
Phase4_HOTFIX_REPORT.md → 无引用（完全孤立）
MAINTENANCE_BACKLOG_v3.5.1.md → 无引用（但被 HANDOFF.md 引用）
```

### 3.2 反向引用分析（被引用次数排名）

| 文件 | 被引用次数 | 被哪些文档引用 |
|---|---|---|
| HANDOFF.md | 9 | Phase3/4/5/7 + IMPLEMENTATION_PLAN + READINESS + PROJECT_MEMORY + RELEASE_REVIEW_REPORT |
| RELEASE_REVIEW_REPORT.md | 8 | Phase3/4/5/7 + IMPLEMENTATION_PLAN + READINESS + PROJECT_MEMORY |
| Portfolio_v3.5_CREATIVE_DIRECTION.md | 9 | Phase1/2_PRE/2/3/4/5/7 + READINESS + RELEASE_REVIEW_REPORT |
| Portfolio_v3.5_IMPLEMENTATION_PLAN.md | 10 | Phase1/2_PRE/2/3/4/5/6/7 + READINESS + RELEASE_REVIEW_REPORT |
| Portfolio_v3.5_IMPLEMENTATION_READINESS.md | 8 | Phase1/2_PRE/2/3/4/5/7 + RELEASE_REVIEW_REPORT |
| 架构确认文档-v1.2.md | 5 | AI_RULES + HANDOFF + PROJECT_CONTEXT + PROJECT_MEMORY + RELEASE_REVIEW_REPORT |
| AI_RULES.md | 4 | HANDOFF + PROJECT_CONTEXT + PROJECT_MEMORY + RELEASE_REVIEW_REPORT |
| PROJECT_MEMORY.md | 4 | AI_RULES + HANDOFF + PROJECT_CONTEXT + RELEASE_REVIEW_REPORT |
| PROJECT_CONTEXT.md | 2 | HANDOFF + PROJECT_MEMORY |
| Phase7_FINAL_REVIEW_REPORT.md | 2 | HANDOFF + RELEASE_REVIEW_REPORT |
| MAINTENANCE_BACKLOG_v3.5.1.md | 1 | HANDOFF |
| Phase2_PRE_FLIGHT_REPORT.md | 1 | Phase2_REVIEW_REPORT |
| **Phase1/2/3/4/5/6_REVIEW_REPORT.md** | **0** | **完全孤立** |
| **Phase4_HOTFIX_REPORT.md** | **0** | **完全孤立** |

### 3.3 删除影响评估

| 文件 | 删除后影响 | 风险等级 |
|---|---|---|
| Phase1-6 Reports | 无影响（完全孤立，未被任何活跃文档引用） | 低 |
| Phase4_HOTFIX_REPORT | 无影响（完全孤立） | 低 |
| release-gate-test.mjs | 无影响（已在 .gitignore，已被替代） | 低 |
| docs/历史文档（4 个） | 引用方均标注"参考用"/"背景资料"，删除后需更新引用方 | 中（需同步更新 AI_RULES / HANDOFF / PROJECT_CONTEXT / PROJECT_MEMORY 中的引用） |
| 早期验证脚本（phase2-6） | 无影响（未被引用） | 低 |
| PROJECT_CONTEXT.md | 被 HANDOFF + PROJECT_MEMORY 引用，需先更新引用方 | 高（需合并到 HANDOFF 后再删除原文件） |

---

## 4. 重复文档识别

### 4.1 Phase Reports vs Phase7_FINAL_REVIEW_REPORT

**用户问题**：如果 Phase7_FINAL_REVIEW_REPORT 已完全汇总前面内容，则判断是否还能删除 Phase1~6 Report？

**审计结论**：**不能直接删除，建议归档。**

**理由**：
1. Phase7_FINAL_REVIEW_REPORT.md **没有汇总 Phase 1-6 的内容**。它只是 Phase 7 的验收报告（Resume callout + 全站一致性审查 + 最终性能验证 + v3.5.0 发布）。
2. HANDOFF.md §2.9 只是 Phase 0-7 的**概览表格**（每个 Phase 一行简短描述）+ Phase 7 详细信息，**未汇总 Phase 1-6 的详细技术决策**。
3. Phase1-6 Reports 包含**独有的详细技术信息**：
   - Phase1：基础设施修复（3 项）+ Micro-interaction 工具类 + 16 个文件修改详情 + Scroll Reveal 覆盖范围
   - Phase2：Hero 视觉主角设计决策 + Shiki singleton 复用方案
   - Phase3：6 个 Lucide 图标选型理由 + SkillsContent.categories 结构化方案
   - Phase4：ProjectCard 视觉层次设计 + Timeline stages Chinese labels 方案
   - Phase5：DecisionSection 结构化方案对比 + Amber Accent Line 第 1/3 配额实现
   - Phase6：Grid Pattern Footer + About 引言 + Interview 色点 + Footer 2 列设计
4. 这些详细技术决策对"当前维护"无价值（项目已发布），但对"历史追溯"和"未来新 Roadmap 决策参考"有价值。
5. 因此建议 **ARCHIVE**（归档），而非 DELETE。

### 4.2 RC Reports vs RELEASE_REVIEW_REPORT.md

**用户问题**：如果 RELEASE_REVIEW_REPORT 已完整覆盖 RC 报告，则判断 RC 文档是否还能保留？

**审计结论**：**RELEASE_REVIEW_REPORT.md 本身就是 RC 报告的汇总，不存在"RC 文档"独立文件。**

**理由**：
1. RELEASE_REVIEW_REPORT.md 是**累积式**汇总文档，每个 Release Audit 追加一个新章节：
   - §1-§9：Task 005 Release（早期，2026-07-08）
   - §10-§13：Task 007/008/009 Audit
   - §14-§15：RC1（2026-07-15）
   - §16-§17：RC2（2026-07-16）
   - §18：RC3（2026-07-17）
   - §19-§20：RC4
   - §21：RC5
   - §22：RC6
   - §23：RC7
   - §24-§25：RC8 Final Release v3.0.0
   - §26：Phase 7 Final Review v3.5.0
2. 项目中**没有独立的 RC1/RC2/.../RC8 报告文件**，所有 RC Report 都是 RELEASE_REVIEW_REPORT.md 的章节。
3. 因此不存在"RC 文档是否冗余"的问题——它们就是同一个文件的不同章节。
4. **建议**：保留整个 RELEASE_REVIEW_REPORT.md（156.9 KB）。早期章节（§1-§13）已完成使命，但作为整体文档保留更合理，不宜分割。

### 4.3 docs/ 工程规范文档重复分析

| 文档 | 与其他文档的关系 | 处置 |
|---|---|---|
| docs/架构确认文档-v1.2.md | 最高权威，被多个文档引用为冲突仲裁依据 | **KEEP** |
| docs/开发设计规范-v1.0.md | 设计规范已被 Portfolio_v3.5_CREATIVE_DIRECTION.md（LOCKED v1.0）取代；版本号不一致（v1.0/v1.1）已知问题 | **ARCHIVE** |
| docs/个人能力分析与网站规划报告.md | v1.0 背景资料，已完成使命；内容已被 AI_RULES.md §1-§2 + HANDOFF.md §一 概括 | **ARCHIVE** |
| docs/task000-completion-report.md | Task 000 完成报告，2026-07-08 完成；内容已被 HANDOFF.md §2.1 + PROJECT_MEMORY.md 汇总 | **ARCHIVE** |
| docs/assets/screenshot-spec.md | 截图规范，Task 006 已完成截图入库；使命结束 | **ARCHIVE** |

### 4.4 AI_RULES.md 与 .trae/rules/ 重复分析

| AI_RULES.md 章节 | .trae/rules/ 对应文件 | 重复程度 |
|---|---|---|
| §6 修改原则 | 00-core.md（§3 外科手术式修改）+ 02-engineering.md | **完全重复** |
| §9 Git 提交规范 | git-safety.md + workflow.md | **完全重复** |
| §10 隐私与密钥安全 | privacy.md | **完全重复** |
| §11 冲突处理原则 | 02-engineering.md §18（运行时冲突自检测） | **部分重复** |
| §1-§5 项目目标/网站定位/技术栈/禁止事项/设计原则 | 无对应（项目特定） | **不重复**（独有价值） |
| §7 开发流程 Task 000-010 | 无对应（项目特定） | **过时**（停留 Task 010） |
| §13 已知问题 | 无对应 | **过时**（多数已解决） |

**结论**：AI_RULES.md 的 §6/§9/§10/§11 已被 .trae/rules/ 完全覆盖，应删除这些章节；§1-§5 是项目特定约束，应保留并更新；§7/§13 已过时，应删除或更新。

---

## 5. 清理建议（5 类）

### ① 建议永久保留（KEEP）— 14 个文件

| # | 文件 | 大小 | 保留原因 |
|---|---|---|---|
| 1 | HANDOFF.md | 105.9 KB | 最终交接文档，新会话仅读此文件即可恢复全部上下文；被 9 个文档引用；当前维护核心 |
| 2 | RELEASE_REVIEW_REPORT.md | 156.9 KB | RC1-RC8 + Phase 7 完整 Release Audit 汇总；§26 是 Phase 7 Final Review；被 8 个文档引用 |
| 3 | Portfolio_v3.5_CREATIVE_DIRECTION.md | 45.6 KB | v3.5 创意方向规范（LOCKED v1.0）；Signature 6 元素 / 色彩 / 排版 / Motion 权威；被 9 个文档引用 |
| 4 | Portfolio_v3.5_IMPLEMENTATION_PLAN.md | 38.2 KB | v3.5 实施计划（LOCKED）；Phase 0-7 任务分解；被 10 个文档引用 |
| 5 | Portfolio_v3.5_IMPLEMENTATION_READINESS.md | 42.6 KB | v3.5 验收标准（LOCKED）；Review Gates；被 8 个文档引用 |
| 6 | Phase7_FINAL_REVIEW_REPORT.md | 19.0 KB | Phase 7 最终验收报告（v3.5.0）；被 HANDOFF + RELEASE_REVIEW_REPORT 引用 |
| 7 | MAINTENANCE_BACKLOG_v3.5.1.md | 5.3 KB | v3.5.1 维护期 Backlog（3 项 P2）；被 HANDOFF 引用；维护期决策依据 |
| 8 | docs/架构确认文档-v1.2.md | 22.1 KB | 架构锁定版，最高权威；被 5 个文档引用为冲突仲裁依据 |
| 9 | release-gate-task-005.mjs | 54.7 KB | 主 E2E 测试（163/163）；当前维护核心测试；被 HANDOFF §0 引用 |
| 10 | phase7-prod-verify.mjs | 9.4 KB | 线上 Vercel 性能验证脚本；维护期线上验证工具 |
| 11 | phase7-consistency-verify.mjs | 22.3 KB | Phase 7 全站一致性验证（26 项断言）；维护期回归测试 |
| 12 | phase7-perf-verify.mjs | 10.0 KB | Phase 7 性能验证（17 项断言）；维护期回归测试 |
| 13 | phase7-bundle-baseline.txt | 3.2 KB | Phase 7 Bundle 基线 + v3.5 累积增量汇总；v3.5 Bundle 对比依据 |
| 14 | package.json / tsconfig.json / tsconfig.node.json / vercel.json | 1.9 KB | 项目配置（运行必需） |

**保留原因汇总**：这些文件是当前维护、交接和后续 AI 协作的核心文档，被多个活跃文档引用，具有不可替代的当前价值。

---

### ② 建议归档（ARCHIVE）— 18 个文件

**归档目标位置**：`docs/archive/v3.5-history/`（新建目录）

**归档策略**：`git mv` 移动文件（保留 Git 历史），不删除内容。

#### A. Phase Reports（8 个，~162 KB）

| # | 文件 | 大小 | 归档原因 |
|---|---|---|---|
| 1 | Phase1_REVIEW_REPORT.md | 20.5 KB | Phase 1 已完成；完全孤立（未被引用）；包含独有技术决策但无维护价值；历史追溯价值 |
| 2 | Phase2_PRE_FLIGHT_REPORT.md | 21.3 KB | Phase 2 预检已完成；仅被 Phase2_REVIEW_REPORT 引用（一并归档） |
| 3 | Phase2_REVIEW_REPORT.md | 24.6 KB | Phase 2 已完成；完全孤立；历史性 |
| 4 | Phase3_REVIEW_REPORT.md | 23.3 KB | Phase 3 已完成；完全孤立；历史性 |
| 5 | Phase4_HOTFIX_REPORT.md | 14.0 KB | Phase 4 热修复已完成；完全孤立；历史性 |
| 6 | Phase4_REVIEW_REPORT.md | 29.0 KB | Phase 4 已完成；完全孤立；历史性 |
| 7 | Phase5_REVIEW_REPORT.md | 12.2 KB | Phase 5 已完成；完全孤立；历史性 |
| 8 | Phase6_REVIEW_REPORT.md | 17.0 KB | Phase 6 已完成；完全孤立；历史性 |

**归档原因汇总**：
- 这 8 个文件记录了 v3.5 Roadmap Phase 1-6 的详细开发过程
- **完全孤立**（未被任何活跃文档引用）
- 包含独有详细技术决策（基础设施修复、文件修改清单、验证结果），但项目已发布，对当前维护无价值
- 对历史追溯和未来新 Roadmap 决策参考有价值
- **不能直接删除**：Phase7_FINAL_REVIEW_REPORT 没有汇总这些内容，HANDOFF.md §2.9 只有概览表格

#### B. docs/ 历史工程文档（4 个，~80 KB）

| # | 文件 | 大小 | 归档原因 |
|---|---|---|---|
| 9 | docs/开发设计规范-v1.0.md | 46.5 KB | 设计规范已被 Portfolio_v3.5_CREATIVE_DIRECTION.md（LOCKED v1.0）取代；版本号不一致（v1.0/v1.1）已知问题；引用方均标注"参考用" |
| 10 | docs/个人能力分析与网站规划报告.md | 27.1 KB | v1.0 背景资料，已完成使命；内容已被 AI_RULES.md §1-§2 + HANDOFF.md §一 概括 |
| 11 | docs/task000-completion-report.md | 2.6 KB | Task 000 完成报告（2026-07-08）；内容已被 HANDOFF.md §2.1 + PROJECT_MEMORY.md 汇总 |
| 12 | docs/assets/screenshot-spec.md | 3.5 KB | 截图规范，Task 006 已完成截图入库；使命结束 |

**归档原因汇总**：
- 这 4 个文件是项目早期的规划与设计文档
- 内容已被后续文档（Portfolio_v3.5_*.md / HANDOFF.md / AI_RULES.md）取代或汇总
- 引用方均标注为"参考用"/"背景资料"，非权威来源
- 保留历史追溯价值，但不宜继续留在 docs/ 根目录混淆权威性

#### C. 早期验证脚本（7 个，~98 KB）

| # | 文件 | 大小 | 归档原因 |
|---|---|---|---|
| 13 | phase2-verify.mjs | 4.9 KB | Phase 2 验证脚本；Phase 2 已完成；未被引用 |
| 14 | phase3-special-verify.mjs | 17.9 KB | Phase 3 专项验证；Phase 3 已完成；未被引用 |
| 15 | phase4-hotfix-verify.mjs | 14.4 KB | Phase 4 Hotfix 验证；热修复已完成；未被引用 |
| 16 | phase4-special-verify.mjs | 30.2 KB | Phase 4 专项验证；Phase 4 已完成；未被引用 |
| 17 | phase5-cls-baseline.mjs | 4.0 KB | Phase 5 CLS 基线测量；Phase 5 已完成；未被引用 |
| 18 | phase5-special-verify.mjs | 18.7 KB | Phase 5 专项验证；Phase 5 已完成；未被引用 |
| 19 | phase6-a11y-verify.mjs | 8.0 KB | Phase 6 a11y 验证；Phase 6 已完成；未被引用 |

**归档原因汇总**：
- 这 7 个脚本是 v3.5 各 Phase 的专项验证脚本
- 对应的 Phase 已全部完成，脚本使命结束
- 未被任何文档引用（Phase Reports 本身也建议归档）
- 仍可作为维护期回归测试参考，但不宜留在项目根目录
- 归档到 `scripts/archive/` 或 `docs/archive/v3.5-history/scripts/`

#### D. Bundle 基线（1 个，~2 KB）

| # | 文件 | 大小 | 归档原因 |
|---|---|---|---|
| 20 | phase6-bundle-baseline.txt | 1.8 KB | Phase 6 Bundle 基线；已被 phase7-bundle-baseline.txt 汇总 |

---

### ③ 建议删除（DELETE）— 1 个文件

| # | 文件 | 大小 | 删除原因 |
|---|---|---|---|
| 1 | release-gate-test.mjs | 18.8 KB | 早期测试脚本，已被 release-gate-task-005.mjs 完全替代；已在 .gitignore 中排除（不提交）；无引用；无价值 |

**删除原因汇总**：
- 该文件是项目早期的测试脚本，已被 `release-gate-task-005.mjs`（54.7 KB，163/163 通过）完全替代
- 已在 [.gitignore](file:///c:/Users/lai/Desktop/个人网页/.gitignore) 第 23 行排除：`release-gate-test.mjs`
- 未被任何文档引用
- 保留会造成混淆（两个类似名称的测试脚本）
- **风险**：极低（已废弃，未提交到 Git）

---

### ④ 建议合并（MERGE）— 1 个文件

| # | 源文件 | 目标文件 | 合并原因 |
|---|---|---|---|
| 1 | PROJECT_CONTEXT.md（12.3 KB） | HANDOFF.md | PROJECT_CONTEXT.md 严重过时（当前阶段：Task 008，实际 v3.5.0）；内容与 HANDOFF.md §一（项目概述）+ AI_RULES.md §1-§2 大量重复；HANDOFF.md 已是最终交接文档（优先级更高） |

**合并策略**：
1. 检查 PROJECT_CONTEXT.md 中是否有 HANDOFF.md 未包含的独有信息
   - §11 当前项目状态（环境就绪 / 工程骨架 / 待补资产 / 风险提示）— 大部分已在 HANDOFF.md §一/§八 中
   - §12 权威文档优先级 — 已在 AI_RULES.md §12 + HANDOFF.md §10.8 中
2. 将任何独有信息合并到 HANDOFF.md 对应章节
3. 在 PROJECT_CONTEXT.md 原位置保留一个简短的指针文件：
   ```markdown
   # 项目上下文说明（已弃用）
   
   > 本文件已弃用，内容已合并到 [HANDOFF.md](HANDOFF.md)。
   > 请以 HANDOFF.md 为准。
   ```
   或直接删除（需更新 HANDOFF.md / PROJECT_MEMORY.md 中的引用）
4. 更新 HANDOFF.md / PROJECT_MEMORY.md 中的引用链接

**合并原因汇总**：
- PROJECT_CONTEXT.md 与 HANDOFF.md 内容大量重复
- PROJECT_CONTEXT.md 严重过时（停留 Task 008），维护成本高
- HANDOFF.md 已是最终交接文档（§0 SNAPSHOT 明确标注"新会话开始时，只需阅读本节即可快速恢复上下文"）
- 合并后减少信息冗余，避免"两处维护"问题

---

### ⑤ 建议重写（UPDATE）— 2 个文件

| # | 文件 | 当前大小 | 重写后预估 | 重写原因 |
|---|---|---|---|---|
| 1 | PROJECT_MEMORY.md | 96.1 KB | ~30-40 KB | 严重过时（停留 Task 010 RC1）；与 HANDOFF.md §二 + RELEASE_REVIEW_REPORT 章节大量重叠；包含大量已解决的遗留事项 |
| 2 | AI_RULES.md | 12.7 KB | ~6-8 KB | 部分过时（§7 Task 进度停留 Task 010，§13 已知问题多数已解决）；§6/§9/§10/§11 与 .trae/rules/ 完全重复 |

#### PROJECT_MEMORY.md 重写方案

**保留内容**：
- 核心设计决策记录（Timeline SSOT 决策、虚拟模块设计、组件配额制等）
- 关键教训（CRLF 污染、koatus ctx 泄漏、CSS Cascade 冲突等）
- 仍有效的约束（Markdown SSOT、不新增依赖等）

**删除内容**：
- Task 008 等已完成的 Task 详细执行过程（已在 RELEASE_REVIEW_REPORT §12 汇总）
- "当前阶段：Task 010 RC1" 等过时状态信息
- 已解决的遗留事项（Email 补充、接口统一、CSS __eyebrow 重复等）
- "后续开发顺序 RC2-RC7" 等过时计划（已全部完成）

**重写后结构**：
```
# 项目记忆档案（PROJECT_MEMORY.md）
> 本文件记录项目核心设计决策与关键教训，供未来 AI 接手时参考。
> 当前阶段：v3.5.0 Released（维护模式）
> 详细开发历史见 HANDOFF.md §二 + RELEASE_REVIEW_REPORT.md

## 1. 核心设计决策（永久保留）
## 2. 关键教训（永久保留）
## 3. 仍有效的约束（永久保留）
```

#### AI_RULES.md 重写方案

**保留内容**（项目特定，无 .trae/rules/ 对应）：
- §1 项目目标（三个展示项目核心叙事）
- §2 网站定位（与普通简历网站的差异）
- §3 技术栈（更新版本号到 v3.5.0 实际值）
- §4 技术边界与禁止事项（项目特定禁止清单）
- §5 页面设计原则 — Developer Academic（项目特定风格）
- §12 权威文档优先级（更新为 v3.5.0 后的优先级）

**删除内容**（已被 .trae/rules/ 覆盖）：
- §6 修改原则 → 已被 00-core.md §3 + 02-engineering.md 覆盖
- §9 Git 提交规范 → 已被 git-safety.md + workflow.md 覆盖
- §10 隐私与密钥安全 → 已被 privacy.md 覆盖
- §11 冲突处理原则 → 已被 02-engineering.md §18 覆盖

**更新内容**：
- §7 开发流程 → 更新为"v3.5.0 已发布，进入维护模式"，移除 Task 000-010 进度表
- §8 各 Task 范围边界 → 删除（已全部完成）
- §13 已知问题 → 更新为 v3.5.1 Maintenance Backlog 引用（3 项 P2）

**重写后结构**：
```
# AI 协作规范（AI_RULES.md）
> 本文件是本项目特定的 AI 协作规范。
> 通用编码规则见 .trae/rules/（工作区规则）。
> 当前阶段：v3.5.0 Released（维护模式）

## 1. 项目目标
## 2. 网站定位
## 3. 技术栈（v3.5.0）
## 4. 技术边界与禁止事项
## 5. 页面设计原则 — Developer Academic
## 6. 权威文档优先级
## 7. 当前阶段与维护模式约束
```

---

## 6. 执行顺序建议

若用户批准本 Cleanup Plan，建议按以下顺序执行（**每步需用户确认**）：

### 阶段 A：低风险归档（无引用影响）
1. 创建 `docs/archive/v3.5-history/` 目录
2. `git mv` 8 个 Phase Reports → `docs/archive/v3.5-history/`
3. `git mv` 7 个早期验证脚本 → `docs/archive/v3.5-history/scripts/`
4. `git mv` phase6-bundle-baseline.txt → `docs/archive/v3.5-history/`
5. 删除 release-gate-test.mjs（已在 .gitignore）
6. 验证：git status / typecheck / build / Playwright 全部通过

### 阶段 B：docs/ 历史文档归档（需更新引用）
1. `git mv` 4 个 docs/ 历史文档 → `docs/archive/v3.5-history/`
2. 更新 HANDOFF.md / AI_RULES.md / PROJECT_MEMORY.md 中的引用链接
3. 验证引用链接可达

### 阶段 C：文档合并与重写（高风险，需逐个确认）
1. PROJECT_CONTEXT.md 合并到 HANDOFF.md（或转为指针文件）
2. PROJECT_MEMORY.md 精简重写（96 KB → ~30-40 KB）
3. AI_RULES.md 精简重写（12.7 KB → ~6-8 KB）
4. 更新所有交叉引用
5. 验证：typecheck / build / Playwright / 引用链接全部通过

### 阶段 D：提交与推送
1. `git add -A`
2. `git commit -m "docs: cleanup v3.5.0 documentation assets"`
3. 等待用户批准后 `git push origin master`

---

## 7. 风险评估

| 风险 | 严重度 | 缓解措施 |
|---|---|---|
| 归档后丢失历史决策追溯能力 | 低 | 归档不删除，文件仍存在于 `docs/archive/v3.5-history/`，可通过 Git 历史和归档目录访问 |
| 合并 PROJECT_CONTEXT.md 导致引用断链 | 中 | 合并后全局搜索 `PROJECT_CONTEXT.md` 引用，逐一更新 |
| 重写 PROJECT_MEMORY.md 误删有价值的历史决策 | 中 | 重写前先备份原文件到 `.ai-backups/`，重写后用户审阅确认 |
| AI_RULES.md 删除 §6/§9/§10/§11 后，未配置 .trae/rules/ 的环境丢失规则 | 低 | 确认 .trae/rules/ 已在工作区生效（system-reminder 显示已加载）；AI_RULES.md 顶部注明"通用规则见 .trae/rules/" |
| 归档目录 `docs/archive/` 被 Vercel 部署误处理 | 低 | docs/ 不参与构建（Vite 仅处理 src/），归档不影响线上 |
| Git 历史混乱 | 低 | 使用 `git mv` 保留文件历史，避免删除+新建 |

---

## 8. 不建议清理的内容

以下内容虽未被任何文档引用，但**不建议清理**：

| 文件 | 原因 |
|---|---|
| phase7-prod-verify.mjs | 线上验证工具，维护期仍需使用 |
| phase7-consistency-verify.mjs / phase7-perf-verify.mjs | Phase 7 回归测试，维护期仍需使用 |
| phase7-bundle-baseline.txt | v3.5 Bundle 基线，维护期对比依据 |
| MAINTENANCE_BACKLOG_v3.5.1.md | 维护期决策依据，被 HANDOFF 引用 |
| .trae/rules/ 系列 | 工作区规则，已通过 system-reminder 生效，不属于规划文档 |
| src/content/ 系列 | 运行时 Markdown SSOT 数据源，不属于规划文档 |

---

## 9. 等待用户确认

### 9.1 当前状态

✅ **Documentation Audit 已完成（5 阶段中的前 4 阶段）**
- 第一阶段：建立文档清单 ✅
- 第二阶段：检查引用关系 ✅
- 第三阶段：识别重复文档 ✅
- 第四阶段：生成 Documentation_CLEANUP_PLAN.md ✅（本文件）
- 第五阶段：等待用户确认 ⏸️（当前）

### 9.2 用户需确认的事项

1. **是否批准本 Cleanup Plan？**
2. **若批准，执行哪些阶段？**
   - 阶段 A（低风险归档，18 个文件）
   - 阶段 B（docs/ 历史文档归档，4 个文件 + 引用更新）
   - 阶段 C（文档合并与重写，3 个文件，高风险）
   - 阶段 D（Git 提交与推送）
3. **归档目录位置确认**：`docs/archive/v3.5-history/` 是否合适？
4. **PROJECT_CONTEXT.md 处置方式**：合并到 HANDOFF.md 后删除原文件，还是保留为指针文件？
5. **PROJECT_MEMORY.md / AI_RULES.md 重写**：是否在本次清理中执行，还是延后到新 Roadmap 启动时？

### 9.3 硬约束遵守

按用户指令第五阶段要求：
- ⛔ **禁止删除文件**（本 Plan 仅提供建议，未执行任何删除）
- ⛔ **禁止修改文件**（本 Plan 仅生成新文件 Documentation_CLEANUP_PLAN.md）
- ⛔ **禁止 Git commit / push**
- ✅ **完成后立即停止，等待用户确认**

---

> **本 Cleanup Plan 已完成，等待用户审阅与确认。**
> 确认后才会执行真正的清理操作，且