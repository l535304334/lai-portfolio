# Development History（开发历史）

> **本文件是项目开发历史的唯一权威来源（SSOT）。**
> 按时间顺序记录所有 RC / Sprint / Milestone 的完整演进过程。
>
> 最后更新：2026-07-18
> 当前版本：v3.5.0（已发布，维护模式）

---

## 0. 开发阶段总览

项目经历 **4 个大阶段**，从项目奠基到 v3.5.0 Final Release，共 10 天（2026-07-08 ~ 2026-07-18）。

| 阶段 | 时间 | 版本 | 状态 |
|---|---|---|---|
| Task 000-010 | 2026-07-08 ~ 2026-07-15 | v0.3.0 → v1.0.0 | ✅ 项目奠基 |
| RC1-RC8 | 2026-07-15 ~ 2026-07-17 | v2.0.0 → v3.0.0 | ✅ v3.0.0 Final Release |
| Phase 0-7 | 2026-07-17 ~ 2026-07-18 | v3.5.0 | ✅ v3.5.0 Final Release |
| 维护期 | 2026-07-18 ~ | v3.5.1（待定） | ⏸️ 维护模式 |

**Git Tag 历史**：`v0.3.0` / `v0.4.0` / `v0.5.0` / `v1.0.0` / `v2.0.0` / `v3.0.0` / `v3.5.0`（全部已推送 origin）

**最新 Commit**：`5883faf` release: Portfolio v3.5.0

---

## 1. Task 000-010（项目奠基，2026-07-08 ~ 2026-07-15）

**设计目标**：从零构建软件工程学生技术作品集网站，完成内容资产整理、工程骨架、8 个页面、Vercel 部署。

| Task | 内容 | 关键交付 | Tag |
|---|---|---|---|
| 000 | 内容资产整理 | 14 个 Markdown 内容文件 | — |
| 001 | 工程骨架 | Vue 3 + Vite + 路由 + 主题切换 + 8 占位页 | v0.3.0 |
| 002 | 首页 | Hero / ProjectCard / Timeline / Contact 4 组件 | v0.4.0 |
| 003 | 构建时内容插件 + 项目详情页 | virtual:content + virtual:project-detail + Shiki + markdown-it | — |
| 004 | 面试页 + AI 实践页 | virtual:interview-content + virtual:ai-practice-content | — |
| 005 | Skills / Resume / About | virtual:skills-content + virtual:personal-content | v0.5.0 |
| 006 | 项目同步 + 仓库清理 | 3 项目 GitHub 链接 + 17 张截图入库 | — |
| 007 | Final Portfolio Review | 7 部分评审 + 4 类事实修正 | — |
| 008 | Resume 系统完善 | virtual:resume-content + window.print PDF | v1.0.0 |
| 009 | Vercel 部署上线 | https://lai-portfolio-xi.vercel.app | — |
| 010 | Release Audit | 进入 RC1 阶段 | — |

**重要设计决策**：
- **Markdown SSOT 模式**：所有内容数据以 `src/content/*.md` 为唯一数据源，构建时解析为虚拟模块
- **构建时处理**：markdown-it + Shiki 仅在构建时运行，运行时 bundle 零解析开销
- **Vue 3 + TypeScript strict**：组合式 API + 类型安全

**遗留问题**：
- Timeline 数据硬编码在 Home.vue（RC1 解决）
- "155 API tests" 数据可疑（RC1 修正）

---

## 2. RC1 — 真实性与架构稳定（2026-07-15 ~ 2026-07-16）

**设计目标**：完成 P0 真实性修复 + 架构稳定性改造，作为后续视觉/交互升级的基线。

### 2.1 完成目标

1. **Timeline SSOT 改造**（commit `864c996`）
2. **Hero 工程指标重构**
3. **P0 真实性修复**（4 处文档错误）
4. **工程基础设施**（.gitattributes + Playwright 恢复）
5. **RC1 Local Release Baseline 冻结**（commit `1ad444a`）

### 2.2 修改模块

| 模块 | 改动 |
|---|---|
| `src/content/growth/timeline.md` | 新建（SSOT 数据源） |
| `src/utils/content.ts` | 新增 `virtual:timeline-content` 虚拟模块（第 8 个） |
| `src/pages/Home.vue` | Timeline 从 SSOT 读取 |
| `.gitattributes` | 新建（`* text=auto eol=lf`） |
| `release-gate-task-005.mjs` | Playwright 测试恢复 |

### 2.3 关键 Commit

- `864c996` — Timeline SSOT 改造
- `1ad444a` — RC1 Local Release Baseline 冻结（Local Release，不推送 origin）

### 2.4 重要设计决策

**为什么 Timeline SSOT 改造**：
- **问题**：Home.vue 静态数组维护 Timeline 数据，与 `timeline.md` 双数据源同步困难
- **决策**：将时间线数据迁移至 `timeline.md` frontmatter.stages，新增 `virtual:timeline-content` 虚拟模块
- **教训**：维护两个 Timeline 数据源导致同步问题；SSOT 实现是长期可维护性的必要投资

**为什么本地冻结而非远程发布**：
- RC1 不发布到生产，避免后续 RC 阶段频繁打 tag
- 作为 RC2 开发的稳定基线

### 2.5 遗留问题

- 无（RC1 全部完成，无遗留）

---

## 3. RC2 — 视觉升级与组件化（2026-07-16 ~ 2026-07-17）

**设计目标**：对项目详情页和首页进行视觉层次、组件化、可访问性的全面升级，**严格控制新增组件数 ≤2**。

### 3.1 子阶段与完成目标

| 子阶段 | Commit | 完成目标 |
|---|---|---|
| RC2.1 | `2233883` `9de992f` | 提取 ProjectHeader 组件（status / role 从 frontmatter 渲染） |
| RC2.2 | `2b39f33` `d9e315d` | ArchitectureDiagram 组件集成 + `import.meta.glob` lazy 加载 |
| RC2.3 | `2563e38` | 强化 ProjectDetail 视觉层次（DecisionSection border-top / padding / h2 字号差异化） |
| RC2.4 | `4d9c1e6` | 可访问性修复（5 个 section aria-labelledby / ProjectNav aria-label / ArchitectureDiagram 动态 alt） |
| RC2.5 | `12992da` | Final Review + Design Audit（eyebrow letter-spacing 统一为 0.08em） |
| RC2 Release | `20598ae` + tag `v2.0.0` | 版本号 0.1.0 → 2.0.0 + push 15 commits 到 origin/master |

### 3.2 修改模块

| 模块 | 改动 |
|---|---|
| `src/components/project/ProjectHeader.vue` | 新建（RC2.1 提取） |
| `src/components/project/ArchitectureDiagram.vue` | 新建（RC2.2，B1 方案） |
| `src/components/project/DecisionSection.vue` | 视觉层次强化 |
| `src/pages/ProjectDetail.vue` | 集成新组件 + aria-labelledby |
| `src/types/project.ts` | 新增 status / role / architecture 字段 |

### 3.3 关键 Commit

- `20598ae` — RC2 Release + tag `v2.0.0`

### 3.4 重要设计决策

**为什么组件配额制**：
- 强制在抽象与冗余之间做权衡，避免为单次使用做抽象
- 用户限制 ≤2 个新组件，实际新增 1 个（ArchitectureDiagram.vue），剩余 1 个

**为什么 ArchitectureDiagram B1 方案**：
- 不修改 SVG 内容，只处理显示、响应式、暗黑模式兼容
- SVG 视为"亮色卡片"，用防御性样式适配 dark mode
- `import.meta.glob` lazy 加载（按需加载 SVG，非 eager）

**为什么 eyebrow letter-spacing 统一 0.08em**：
- RC2.3 曾有意差异化到 0.12em，RC2.5 经讨论后统一
- 差异化已通过其他方式实现，letter-spacing 统一避免视觉碎片化

### 3.5 遗留问题

- 5 个主要内容页面 eyebrow 缺 `//` 前缀（RC7 Design Review 结论：保持现状，有意语义区分）

---

## 4. RC3 — About 页面重构（2026-07-17）

**设计目标**：将 About 页从"5 section 散乱内容"重构为"人物画像"模型，建立结构化 frontmatter + Markdown body 的双层信息架构。

### 4.1 子阶段与完成目标

| 子阶段 | Commit | 完成目标 |
|---|---|---|
| RC3.1 数据层重构 | `c8b7913` | PersonalFact 类型 + frontmatter（subtitle + 4 facts）+ scanPersonal 解析 + about.md 重组 |
| RC3.2 About.vue 视觉重构 | `42a21dc` | subtitle 渲染 + Facts Panel `<dl>` 语义结构 + 4 层 Header + 7 项 Playwright 断言 |
| RC3.3 Final Review & Release | `bfb070e` | Code/Design/Performance/IA Review + P1 修复（DecisionSection eyebrow 中文化） |

### 4.2 修改模块

| 模块 | 改动 |
|---|---|
| `src/types/personal.ts` | 新增 PersonalFact + subtitle + facts 字段 |
| `src/utils/content.ts` | scanPersonal 解析 subtitle + facts |
| `src/content/personal/about.md` | 重组：subtitle + 4 facts + 3 section body |
| `src/pages/About.vue` | 视觉重构：Facts Panel + 4 层 Header |
| `src/components/project/DecisionSection.vue` | eyebrow `TECH DECISIONS` → `// 关键决策`（P1 修复） |

### 4.3 重要设计决策

**为什么 About = 人物画像，不是 Resume**：
- Resume 在 `/resume` 路由，About 不应重复
- facts ≤4 项且仅长期稳定信息（教育 / 方向 / 考研 / GitHub）
- 不放项目数 / API 数 / 文件数等易变数据，避免与 Hero 重复

**为什么 Email 不公开**：
- 隐私考虑，About 仅保留 GitHub

**为什么 RC3.3 新增 IA Review**：
- 重点检查 Hero / Timeline / Resume / About 之间的信息重复
- 确保每个页面职责清晰

### 4.4 遗留问题

- RC3.3 IA Review 5 项 P2 建议（RC4-RC7 全部处理完毕）

---

## 5. RC4 — 全局基础 + Skills 试点（2026-07-17）

**设计目标**：建立 `.page__header` / `.page__subtitle` 工具类（CSS utility，非新组件），为 RC5/RC6 子页面统一 Header 模式铺路；将技术栈从 Markdown body 迁移至 frontmatter.categories 结构化数据。

### 5.1 完成目标

1. 全局基础：`.page__header` / `.page__subtitle` 工具类
2. Skills 试点：SkillCategory 类型 + 6 个分类卡片网格
3. Playwright +10 项断言（65/65 通过）

### 5.2 修改模块

| 模块 | 改动 |
|---|---|
| `src/types/skills.ts` | 新建（SkillsContent + SkillCategory） |
| `src/utils/content.ts` | scanSkills 解析 subtitle + categories |
| `src/content/skills/index.md` | frontmatter 新增 subtitle + 6 项 categories |
| `src/styles/global.css` | 新增 `.page__header` / `.page__subtitle` 工具类 |
| `src/pages/Skills.vue` | 完全重写：工具类 + categories 卡片网格 |

### 5.3 关键 Commit

- `caff817` — RC4 开发完成
- `6ab0a3b` — RC4 收尾 commit

### 5.4 重要设计决策

**为什么 `.page__header` 是 CSS utility，不是新组件**：
- 避免消耗组件配额
- 为 RC5（Resume）/ RC6（Interview + AiPractice）提供统一的 Header 模式

**为什么 About.vue 保留 scoped `.about__header`**：
- RC3.2 已冻结，不强制迁移
- 新页面优先使用工具类

### 5.5 遗留问题

- 5 页 eyebrow 缺 `//` 前缀（留 RC7）

---

## 6. RC5 — Resume 深化（2026-07-17）

**设计目标**：Resume 页 subtitle SSOT 化 + 视觉层次统一 + PDF 打印优化。

### 6.1 完成目标

1. ResumeContent 类型扩展（subtitle?）
2. resume/index.md frontmatter SSOT 化
3. Resume.vue 应用 `.page__header` / `.page__subtitle`
4. 打印 CSS 优化
5. Playwright +3 项断言（68/68 通过）
6. 完成 RC3.3 IA Review P2 #1（About subtitle vs Resume framing 对齐）

### 6.2 修改模块

| 模块 | 改动 |
|---|---|
| `src/types/resume.ts` | ResumeContent 新增 `subtitle?: string` |
| `src/utils/content.ts` | scanResume 解析 subtitle |
| `src/content/resume/index.md` | frontmatter 新增 subtitle |
| `src/pages/Resume.vue` | 应用工具类 + 打印 CSS 更新 |

### 6.3 关键 Commit

- `a0c4002` — RC5 收尾 commit

### 6.4 重要设计决策

**为什么保留 `.resume__header` 双类策略**：
- `.page__header` 提供视觉样式
- `.resume__header` 作为打印 CSS 钩子（精确控制打印时元素隐藏）

### 6.5 遗留问题

- 无

---

## 7. RC6 — Interview + AiPractice 深化（2026-07-17）

**设计目标**：两页共用 `.page__header` 工具类 + subtitle SSOT 化（AiPractice）+ 动态计算统一（Interview）+ page__hint 全站消除。

### 7.1 完成目标

1. AiPracticeContent 类型扩展（subtitle?）
2. AiPractice subtitle SSOT 化
3. Interview subtitle 保留动态计算（合理架构选择）
4. 两页应用 `.page__header` / `.page__subtitle`
5. page__hint 全站消除（4 子页面全部完成）
6. Playwright +6 项断言（74/74 通过）
7. 完成 RC3.3 IA Review P2 #3 + P2 #4

### 7.2 修改模块

| 模块 | 改动 |
|---|---|
| `src/types/ai-practice.ts` | AiPracticeContent 新增 `subtitle?: string` |
| `src/utils/content.ts` | scanAiPractice 解析 subtitle |
| `src/content/ai-practice/index.md` | frontmatter 新增 subtitle |
| `src/pages/AiPractice.vue` | 应用工具类 |
| `src/pages/Interview.vue` | 应用工具类（动态计算） |

### 7.3 关键 Commit

- `92a605a` — RC6 收尾 commit

### 7.4 重要设计决策

**为什么 Interview 保留动态计算**：
- Interview 是多文件聚合页（4 个分类文件）
- subtitle 包含动态数据（分类数 + 问题数），不适合静态 SSOT 化
- 这是合理的架构选择，不是缺陷

### 7.5 遗留问题

- `.xxx__header` 类名一致性冲突（留 RC7）

---

## 8. RC7 — Final Polish（最终打磨）（2026-07-17）

**设计目标**：经 RC7 Design Review 评估，原计划"信息架构 + 全局导航优化"无真正有价值的修改空间。用户批准将 RC7 重新定位为 **Final Polish**，仅做 Content Accuracy + Release Polish。

### 8.1 完成目标

1. Content Accuracy：Resume subtitle 文案修正 + About facts 考研字段歧义消除
2. Release Polish：robots.txt + sitemap.xml + index.html SEO meta 增量
3. Playwright Test 7 断言同步（74/74 通过）

### 8.2 修改模块

| 模块 | 改动 |
|---|---|
| `src/content/resume/index.md` | subtitle "软件工程方向" → "分布式系统" |
| `src/content/personal/about.md` | facts 考研 "2026 届" → "2027 考研" |
| `public/robots.txt` | 新建（SEO 基础资源） |
| `public/sitemap.xml` | 新建（9 条路由） |
| `index.html` | SEO meta 增量 |
| `release-gate-task-005.mjs` | Test 7 断言更新 |

### 8.3 关键 Commit

- `e31e0b8` — RC7 收尾 commit

### 8.4 重要设计决策

**为什么不调整 NavBar / 不统一 Header 类 / 不给 eyebrow 加 //**：
- RC7 Design Review 确认这些"差异"实际是有意的设计模式
- 强行统一反而破坏语义
- **不为了统一而统一、不为了重构而重构**

**为什么 Resume subtitle "软件工程方向" → "分布式系统"**：
- "软件工程方向"与 H1"软件工程学生"语义重复
- 与 About subtitle "分布式系统" 不一致
- 这是真实的内容问题，必须修正

### 8.5 遗留问题

- og:image 缺失（留 RC8 决策）
- per-route description（留 RC8 决策）

---

## 9. RC8 — Final Release v3.0.0（2026-07-17）

**设计目标**：全站最终审计 + v3.0.0 发布（Release Candidate → Stable）。

### 9.1 完成目标

1. 5 维度最终审计（Code/Design/Performance/Accessibility/SEO）
2. 版本号 2.0.0 → 3.0.0
3. Git Tag `v3.0.0` + push origin/master
4. Vercel 部署验证

### 9.2 修改模块

- `package.json` — 版本号 2.0.0 → 3.0.0
- 文档同步（HANDOFF.md + RELEASE_REVIEW_REPORT.md）

**零代码改动**，仅文档 + 版本号。

### 9.3 关键 Commit

- `3d485c9` — chore(rc8): final release v3.0.0 with full audit and tag
- Tag `v3.0.0`（已推送 origin）

### 9.4 审计结论

- ✅ 5 维度审计共 **0 P0 / 0 P1 / 4 P2**（P2 全部记录，未修改）
- ✅ Bundle 体积零回归（1662 modules / gzip 41.87 KB）
- ✅ typecheck + build + Playwright 74/74 全部通过

### 9.5 遗留问题

- Lighthouse 当前环境无法运行（待 Vercel 验证）

---

## 10. Portfolio v3.5 Roadmap — Phase 0-7（2026-07-17 ~ 2026-07-18）

**设计目标**：以 v3.0.0 为基线，按《Portfolio_v3.5_CREATIVE_DIRECTION.md》+《IMPLEMENTATION_PLAN》+《READINESS》三份 LOCKED 文档，完成全站 Motion 系统 + Signature Visual 6 元素 + 视觉层次深化，最终发布 v3.5.0。

### 10.1 Phase 总览

| Phase | 内容 | 主要交付 | 状态 |
|---|---|---|---|
| Phase 0 | Motion 基础设施 | `useScrollReveal` composable + `motion.css` | ✅ |
| Phase 1 | Scroll Reveal 全站应用 | 8 个页面 + 全局组件接入 | ✅ |
| Phase 2 | Hero 视觉主角 | Hero Grid Pattern underlay + 工程指标强化 | ✅ |
| Phase 3 | Skills 重设计 | 6 个 Lucide 图标 + categories 结构化 | ✅ |
| Phase 4 | ProjectCard + Timeline 视觉深化 | Surface + Shadow + Whitespace + Chinese labels | ✅ |
| Phase 5 | DecisionSection 结构化方案对比 | `frontmatter.decisions` + Amber Accent Line 1/3 | ✅ |
| Phase 6 | 色彩 + 纹理 + Footer 收尾 | Grid Pattern Footer + About 引言 2/3 + Interview 色点 | ✅ |
| Phase 7 | Final Polish & Release v3.5.0 | Resume callout 3/3 + 全站一致性 + 性能验证 | ✅ |

### 10.2 Phase 7 详细（Final Release v3.5.0）

**完成目标**：
1. Resume 核心竞争力 callout（Signature 3 Amber Accent Line 第 3/3 配额）
2. 全站一致性审查（26/26 通过）
3. 最终性能验证（LCP 2140ms ✅ / CLS baseline ⚠️）
4. v3.5 Bundle 基线汇总（+0.34 kB gzip，总累积 ~ +5.0-5.5 kB gzip）
5. 版本号 3.0.0 → 3.5.0
6. 5 维度审计（0 P0/P1，3 P2 baseline 记录）

**修改模块**（12 个文件，8 修改 + 4 新建）：

| 模块 | 改动 |
|---|---|
| `src/content/resume/index.md` | frontmatter 新增 `callout: 后端 · 分布式 · 工程` |
| `src/types/resume.ts` | ResumeContent 新增 `callout?: string` |
| `src/utils/content.ts` | scanResume 透传 callout |
| `src/pages/Resume.vue` | callout 渲染 + Accent Line + 打印 + Dark Mode + 响应式 |
| `release-gate-task-005.mjs` | Test 19（18 项 Phase 7 断言） |
| `package.json` | 版本号 3.0.0 → 3.5.0 |
| `phase7-consistency-verify.mjs` | 新建（一致性验证） |
| `phase7-perf-verify.mjs` | 新建（性能验证） |
| `phase7-bundle-baseline.txt` | 新建（Bundle baseline） |

**关键 Commit**：
- `5883faf` — release: Portfolio v3.5.0
- Tag `v3.5.0`（已推送 origin）

### 10.3 重要设计决策

**为什么 Resume callout 是 Signature 3 第 3/3 配额**：
- 按 CREATIVE_DIRECTION §7.6 设计
- 置于 header 与 resume__content 之间，作为"核心竞争力"视觉锚点
- 与 Phase 6 About quote 引言模式对齐

**为什么 SSOT 模式**：
- callout 内容从 `resume/index.md` frontmatter 读取
- 与 About quote / Timeline stages / ProjectDetail decisions 模式一致
- 避免硬编码到组件

**为什么 v3.5 Bundle 预算边界附近**：
- 总累积 ~ +5.0-5.5 kB gzip
- 主要增量来自已批准的 Phase 3（Lucide 图标 +1.70 kB）和 Phase 6（Footer 视觉系统 +1.4-1.9 kB）
- Phase 7 增量极小（+0.34 kB），未引入新依赖

### 10.4 Signature Visual 6 元素全站应用完成状态

| Signature | 描述 | 应用位置 | 状态 |
|---|---|---|---|
| S1 | Number Prefix（`//` eyebrow） | 全站 section header | ✅ |
| S2 | Mono Eyebrow（`.mono` class） | 6 个页面 eyebrow | ✅ |
| S3 | Amber Accent Line（3 处配额） | DecisionSection / About / Resume | ✅ 3/3 |
| S4 | Grid Pattern Underlay（2 处配额） | Hero / Footer | ✅ 2/2 |
| S5 | Code Comment Style（`//` 注释） | 全站代码注释 | ✅ |
| S9 | Underline Reveal（Footer link hover） | Footer link `::after` | ✅ |

### 10.5 遗留问题

- 3 项 P2 baseline 问题（Footer CLS / Amber 对比度 / FCP，详见 [TECHNICAL_DEBT.md](TECHNICAL_DEBT.md)）

---

## 11. 维护期（2026-07-18 ~）

**当前状态**：v3.5.0 已发布，项目处于**维护模式**。

**维护范围**：
- ✅ 允许：修复 P0/P1 缺陷、安全问题
- ❌ 禁止：新增功能 / 新增组件 / 新增依赖 / 新增 Design Token / 新增颜色 / 新增字体
- ⚠️ 如需新功能或大重构，需用户重新批准新 Roadmap

**v3.5.1 Maintenance Backlog**：3 项 P2（详见 [ROADMAP.md](ROADMAP.md)）

---

## 12. 开发阶段关键数据对比

| 指标 | Task 010 | RC8 (v3.0.0) | Phase 7 (v3.5.0) |
|---|---|---|---|
| 版本号 | v1.0.0 | v3.0.0 | v3.5.0 |
| 构建模块数 | ~1650 | 1662 | 1666 |
| gzip 主包 | ~41 KB | 41.87 KB | 42.26 KB |
| Playwright 用例 | ~40 | 74 | 163 |
| 虚拟模块数 | 7 | 8 | 8 |
| 新增组件数 | 0 | 1 | 1（累计） |
| 运行时依赖 | 3 | 3 | 3 |

---

## 13. 相关文档

| 文档 | 作用 |
|---|---|
| [HANDOFF.md](HANDOFF.md) | 唯一入口文档（项目概览 + 接手指南） |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 系统架构 + 设计原则 + 关键文件 |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | 当前完成情况 |
| [TECHNICAL_DEBT.md](TECHNICAL_DEBT.md) | 技术债清单 |
| [ROADMAP.md](ROADMAP.md) | 未来规划 |
| [AI_RULES.md](AI_RULES.md) | 开发规范 + AI 协作约束 |
| [docs/架构确认文档-v1.2.md](docs/架构确认文档-v1.2.md) | 架构锁定版（最高权威） |
| [docs/archive/v3.5-history/](docs/archive/v3.5-history/) | 历史文档归档（Phase Reports /