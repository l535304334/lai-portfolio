# Technical Debt（技术债）

> **本文件是项目所有已知技术债的唯一权威来源（SSOT）。**
> 涵盖：已知 Bug / 已知限制 / 待重构模块 / 性能问题 / 安全问题 / TODO / FIXME + 建议解决方案。
>
> 最后更新：2026-07-18
> 当前版本：v3.5.0（已发布，维护模式）

---

## 0. 总览

| 类别 | 数量 | 严重度分布 |
|---|---|---|
| 已知 Bug | 0 | — |
| 已知限制 | 5 | P2 × 2 / P3 × 3 |
| 性能问题 | 3 | P2 × 3（baseline） |
| 待重构模块 | 0 | — |
| 安全问题 | 0 | — |
| TODO / FIXME | 0 | — |

**结论**：项目技术债极低，全部为 v3.0.0 baseline 已知问题，无 v3.5.0 引入的新债务。所有问题均为 P2/P3 级别，不阻塞 v3.5.0 发布，已记录到 [ROADMAP.md](ROADMAP.md) 的 v3.5.1 维护 Backlog。

---

## 1. 性能问题（P2 baseline）

### 1.1 P2-1: Footer 字体加载导致 CLS 0.3756

| 项 | 值 |
|---|---|
| **严重度** | P2（用户体验 + SEO） |
| **引入版本** | v3.0.0 baseline（非 v3.5 引入） |
| **线上实测** | Home CLS 0.3756 / Resume CLS 0.3759（Vercel Production，2026-07-18） |
| **阈值** | < 0.1 |
| **CLS 来源** | `FOOTER.footer` 贡献 99.8% CLS（0.3750 / 0.3756） |
| **根因** | Footer 字体加载导致布局偏移（`font-display: swap` 已启用，但字体加载期间仍产生 layout shift） |
| **影响** | Core Web Vitals CLS 不达标，可能影响搜索引擎排名和用户体验评分 |
| **建议方案** | **方案 1（推荐）**：font preload — 在 `index.html` `<head>` 添加 `<link rel="preload" as="font">` 预加载关键字重，最小改动，效果明确 |
| **备选方案** | 方案 2：font subset — 使用 fonttools 或 Google Fonts `?text=` 参数生成子集字体；方案 3：`font-display: optional` — 字体加载失败时用系统字体（可能影响视觉一致性） |
| **优先级** | 中（用户体验 + SEO） |
| **处理时机** | v3.5.1 维护期，需用户批准 |

### 1.2 P2-2: Amber accent + white 文字对比度 3.19:1

| 项 | 值 |
|---|---|
| **严重度** | P2（无障碍） |
| **引入版本** | v3.0.0 baseline（非 v3.5 引入） |
| **WCAG 标准** | normal text ≥ 4.5:1 / large text (≥ 18px 或 ≥ 14px bold) ≥ 3:1 |
| **当前状态** | Amber `#d97706` + white 文字对比度 3.19:1，低于 4.5:1（normal text 阈值） |
| **影响范围** | 所有使用 Amber 背景 + white 文字的按钮（如"查看详情" / "GitHub"等） |
| **根因** | 按钮文字 14px regular weight（400），未达到 large text 阈值（需 ≥ 18px 或 ≥ 14px bold） |
| **建议方案** | **方案 1（推荐）**：`font-weight: 600` — 按钮文字加粗到 600，触发 large text 阈值（≥ 14px bold），对比度要求降为 ≥ 3:1，最小改动，符合 large text 标准，不影响视觉品牌 |
| **备选方案** | 方案 2：字号增大到 16px+ — 触发 large text 阈值（≥ 18px）；方案 3：调整 Amber 色值加深（如 `#b45309`）— 直接提升对比度到 4.5:1+，但影响品牌一致性 |
| **优先级** | 低（baseline 设计决策，WCAG AA 非强制） |
| **处理时机** | v3.5.1 维护期，需用户批准 |

### 1.3 P2-3: FCP 线上复测（已自愈，仅记录）

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

## 2. 已知限制（非 Bug，设计权衡）

### 2.1 P2: Interview subtitle 保留动态计算

| 项 | 值 |
|---|---|
| **限制** | Interview 页 subtitle 未 SSOT 化，保留动态计算（分类数 + 问题数） |
| **引入版本** | RC6（合理架构选择，非缺陷） |
| **原因** | Interview 是多文件聚合页（4 个分类文件），subtitle 包含动态数据（分类数 + 问题数），不适合静态 SSOT 化 |
| **影响** | 无功能影响，仅与其他页面 subtitle SSOT 模式不一致 |
| **建议** | 不修改（这是合理的架构选择，详见 [DEVELOPMENT_HISTORY.md §7 RC6](DEVELOPMENT_HISTORY.md)） |

### 2.2 P3: About.vue 保留 scoped `.about__header`（未迁移到 `.page__header`）

| 项 | 值 |
|---|---|
| **限制** | About.vue 保留 RC3.2 已冻结的 scoped `.about__header`，未迁移到 RC4 引入的 `.page__header` 工具类 |
| **引入版本** | RC3.2 冻结后 RC4 引入工具类 |
| **原因** | RC3.2 已冻结，不强制迁移；新页面优先使用工具类 |
| **影响** | 无功能影响，仅类名一致性略差 |
| **建议** | 不修改（冻结清单约束，详见 [ARCHITECTURE.md §11.4](ARCHITECTURE.md)） |

### 2.3 P3: 5 个主要内容页面 eyebrow 缺 `//` 前缀

| 项 | 值 |
|---|---|
| **限制** | 5 个主要内容页面 eyebrow 缺 `//` 前缀（S1 Number Prefix 未全站应用） |
| **引入版本** | RC2.5 Design Review 结论 |
| **原因** | RC7 Design Review 确认这些"差异"实际是有意的设计模式，强行统一反而破坏语义 |
| **影响** | 无功能影响，仅视觉一致性 |
| **建议** | 不修改（有意的设计决策，详见 [DEVELOPMENT_HISTORY.md §8 RC7](DEVELOPMENT_HISTORY.md)） |

### 2.4 P3: Lighthouse CLI 当前环境无法运行

| 项 | 值 |
|---|---|
| **限制** | 本地开发环境无法运行 Lighthouse CLI，仅能用 Playwright 性能验证 |
| **引入版本** | RC8 |
| **原因** | 环境限制，不猜测、不引用未经验证的数据 |
| **影响** | 无法获得完整的 Lighthouse 审计分数 |
| **建议** | 在 Vercel Preview Deployment 上运行 Lighthouse 验证实际 Core Web Vitals |

### 2.5 P3: og:image 缺失

| 项 | 值 |
|---|---|
| **限制** | `index.html` 缺少 `og:image` meta 标签 |
| **引入版本** | RC7（未处理，留 RC8 决策；RC8 也未处理） |
| **原因** | 无合适的 OG 图片资源，且当前无社交媒体分享需求 |
| **影响** | 社交媒体分享时无预览图 |
| **建议** | 未来如有分享需求，生成一张 OG 图片（1200×630）并添加 meta 标签 |

---

## 3. 已知 Bug

**无已知 Bug。**

v3.5.0 发布前已完成 5 维度审计（Code / Design / Performance / Accessibility / SEO），0 P0 / 0 P1 / 3 P2（全部为 baseline 问题，已记录在 §1）。Playwright E2E 测试 163/163 全部通过，线上验证 21/23 通过（2 项 CLS 失败为 baseline 问题）。

---

## 4. 待重构模块

**无待重构模块。**

项目当前处于维护模式，v3.5.0 Baseline 已冻结。所有模块均符合设计预期，无技术债驱动的重构需求。

**注意**：如未来需要重构，需用户重新批准新 Roadmap，不得在维护模式下擅自重构。

---

## 5. 安全问题

**无已知安全问题。**

### 5.1 安全检查清单

| 检查项 | 状态 | 说明 |
|---|---|---|
| 硬编码凭据 | ✅ 无 | 代码中无 API Key / Token / 密码 |
| 隐私文件 | ✅ 无 | 无实习材料 / 学号 / 手机号 / 身份证号 |
| `.env` 文件 | ✅ 无 | 项目无环境变量文件（纯前端，无后端） |
| 第三方凭据 | ✅ 无 | 无高德 Key / DeepSeek Key 等 |
| XSS 风险 | ✅ 无 | Markdown 渲染通过 markdown-it 默认转义，无 `v-html` 直接渲染用户输入 |
| CSRF 风险 | ✅ 无 | 无后端 API，无表单提交 |
| 依赖漏洞 | ✅ 无 | 运行时仅 3 个依赖（vue / vue-router / lucide-vue-next），均为官方维护 |

### 5.2 隐私保护

- ✅ Email 不公开（About 仅保留 GitHub）
- ✅ 无个人身份信息（姓名 / 学号 / 手机号 / 身份证号 / 证件照）
- ✅ Git 提交前检查：`git diff --cached | grep -iE "password|secret|api_key|token|apiKey|private_key|\.env"`

> **详细的隐私与密钥安全规范见 [.trae/rules/privacy.md](.trae/rules/privacy.md)。**

---

## 6. TODO / FIXME / HACK

**源码中无 TODO / FIXME / HACK 注释。**

扫描命令：
```powershell
Select-String -Path "src\**\*.vue","src\**\*.ts" -Pattern "TODO|FIXME|HACK|XXX|WARN" -CaseSensitive:$false
```

结果：0 项匹配。

---

## 7. 技术债处理优先级

### 7.1 优先级矩阵

| 优先级 | 问题 | 严重度 | 处理时机 | 推荐方案 |
|---|---|---|---|---|
| 1 | P2-1 Footer CLS | 中 | v3.5.1 维护期 | font preload |
| 2 | P2-2 Amber 对比度 | 低 | v3.5.1 维护期 | font-weight: 600 |
| 3 | P2-3 FCP | — | 无需处理 | 已自愈 |
| 4 | og:image 缺失 | P3 | 未来如有分享需求 | 生成 OG 图片 |
| 5 | Lighthouse CLI | P3 | Vercel Preview 验证 | 在线上环境运行 |
| 6 | Interview 动态计算 | P2 | 不修改 | 合理架构选择 |
| 7 | About scoped header | P3 | 不修改 | 冻结清单约束 |
| 8 | eyebrow `//` 前缀 | P3 | 不修改 | 有意设计决策 |

### 7.2 v3.5.1 维护期处理建议

**处理顺序**：
1. **P2-1 Footer CLS**（优先级中）— 影响 Core Web Vitals 和 SEO，建议优先处理
2. **P2-2 Amber 对比度**（优先级低）— 影响 WCAG AA 合规，但不影响功能
3. P2-3 FCP — 无需处理（线上已通过）

**处理原则**：
- **最小修改**：仅触碰必须改的地方，不重构无关代码
- **不扩大 Scope**：不新增组件 / 依赖 / Design Token / 颜色 / 字体
- **可回滚**：每个修改都应能独立回滚
- **完整验证**：每项修复后执行 typecheck + build + Playwright + 线上验证
- **用户批准**：所有修改需用户明确批准后才能动工

**v3.5.1 发布条件**：
- 至少处理 P2-1（Footer CLS）
- 通过完整验证（typecheck + build + Playwright + 线上 Core Web Vitals）
- CLS 从 0.375 降低到 < 0.1
- 用户验收通过

---

## 8. 已接受的技术权衡（非技术债）

以下为项目开发过程中**明确接受**的技术权衡，**不属于技术债**，无需处理：

### 8.1 Phase 3 Skills Bundle gzip 增量 +1.70 kB

| 项 | 值 |
|---|---|
| **权衡** | Phase 3 Skills Bundle gzip 增量 +1.70 kB（超出 READINESS §4.4 "≤ +1 KB gzip" 约束 0.70 kB） |
| **接受原因** | 6 个 Lucide 图标是 Creative Direction 强制要求的核心设计元素 |
| **批准时间** | 2026-07-17 用户批准接受 |
| **后续** | 无需重复优化此指标，除非未来整体 Bundle 出现明显增长 |

### 8.2 Interview subtitle 动态计算（非 SSOT）

| 项 | 值 |
|---|---|
| **权衡** | Interview 页 subtitle 保留动态计算，未 SSOT 化 |
| **接受原因** | Interview 是多文件聚合页，subtitle 包含动态数据（分类数 + 问题数），不适合静态 SSOT 化 |
| **结论** | 这是合理的架构选择，不是缺陷 |

### 8.3 v3.5 Bundle 总累积增量 ~ +5.0-5.5 kB gzip

| 项 | 值 |
|---|---|
| **权衡** | v3.5 总累积 Bundle 增量在 +5 KB gzip 预算边界附近 |
| **接受原因** | 主要增量来自已批准的 Phase 3（Lucide 图标 +1.70 kB）和 Phase 6（Footer 视觉系统 +1.4-1.9 kB） |
| **结论** | Phase 7 增量极小（+0.34 kB），未引入新依赖，符合 READINESS §4.8 预算约束精神 |

---

## 9. 相关文档索引

| 文档 | 内容 | 关系 |
|---|---|---|
| [HANDOFF.md](HANDOFF.md) | 项目概览 + 接手指南 + AI 接手 | 本文件的入口 |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | 当前完成情况 | 本文件 §1 性能问题的完成度状态 |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 系统架构 + 设计原则 | 本文件 §2 已知限制的架构背景 |
| [ROADMAP.md](ROADMAP.md) | 未来规划 | 本文件 §7 处理优先级的执行计划 |
| [DEVELOPMENT_HISTORY.md](DEVELOPMENT_HISTORY.md) | 开发历史 | 本文件 §8 已接受权衡的历史溯源 |
| [AI_RULES.md](AI_RULES.md) | AI 协作约束 | 本文件 §7.2 处理原则的规范基础 |
