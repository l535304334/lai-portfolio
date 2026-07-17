# Portfolio v3.5 Implementation Plan

> **版本**：v3.5-impl-plan-rc1
> **日期**：2026-07-17
> **基础**：Portfolio v3.0.0（已冻结）+《v3.5 Visual Audit Report》+ 实际网站实现
> **定位**：新项目，非 RC9，非延续 Roadmap
> **约束**：保留 `// eyebrow` / Mono / Token / 暗色模式 / Bento / Markdown SSOT；不新增依赖；组件配额剩 1
> **状态**：Plan 阶段，待用户确认后进入开发

---

## 1. 对 Audit Report 重新评估

### 评估原则

不机械执行 Audit Report。每项判断 5 个维度：
1. 是否值得实现（用户价值）
2. ROI（High / Medium / Low）
3. 技术风险
4. 对现有 Design Language 的影响
5. 是否违反现有架构

### 1.1 十大问题逐项评估

#### 问题 1：全站缺少 Scroll Reveal 动效

| 维度 | 评估 |
|---|---|
| 值得实现 | ✅ 现代 Portfolio 入场券 |
| ROI | **High** — 低成本高感知 |
| 技术风险 | 低（IntersectionObserver 原生支持） |
| Design Language 影响 | 正向（增强"现代感"，不破坏克制） |
| 架构违反 | 无（封装 composable） |

**决策：Adopt**（核心 P0）

---

#### 问题 2：Hero 缺少视觉主角

| 维度 | 评估 |
|---|---|
| 值得实现 | ✅ 第一屏决定 70% 第一印象 |
| ROI | **High** — 解决"第一印象平淡" |
| 技术风险 | 中（需选方案，可能消耗组件配额） |
| Design Language 影响 | 中（需谨慎，不破坏 Developer Academic） |
| 架构违反 | 无 |

**决策：Adopt**（核心 P0，但方案需细选，见 §4）

---

#### 问题 3：Skills 6 卡片视觉相同

| 维度 | 评估 |
|---|---|
| 值得实现 | ✅ 反模板政策的边缘违规 |
| ROI | **High** — 解决"最模板化"问题 |
| 技术风险 | 中（涉及 Token 扩展 + 布局重排） |
| Design Language 影响 | 中（引入分类色，需克制） |
| 架构违反 | 无（仍用 Markdown SSOT） |

**决策：Adopt**（核心 P0，分类色需克制，见 §6）

---

#### 问题 4：配色过度克制

| 维度 | 评估 |
|---|---|
| 值得实现 | ⚠️ 部分值得 — 全站引入辅助色风险高 |
| ROI | **Medium** — 提升识别度但易破坏克制 |
| 技术风险 | 中（暗色模式对比度） |
| Design Language 影响 | **高** — Amber 单色是核心资产 |
| 架构违反 | 无 |

**决策：Modify**（仅引入 1 个辅助色 Slate Blue，限定用于分类标识 / 状态指示，不用于交互色；放弃 Sage Green，避免色相过多）

**理由**：3 色（Amber + Blue + Green）对 Developer Academic 风格已偏多。2 色（Amber + Blue）足够建立分类视觉差异，且 Blue 与 Slate 中性色同源，过渡自然。

---

#### 问题 5：Timeline 文本密集

| 维度 | 评估 |
|---|---|
| 值得实现 | ⚠️ 部分值得 — 全部重设计成本高 |
| ROI | **Medium** — 改善但非核心 |
| 技术风险 | 中（破坏现有信息架构） |
| Design Language 影响 | 中 |
| 架构违反 | 无 |

**决策：Modify**（仅主项目"江南出行"阶段放大 1.2x + highlights 改 chip，其他阶段保持；不做项目缩略图，避免引入图片资源管理复杂度）

**理由**：项目缩略图需要 4 张新图片资源，违反"不引入新资源"原则。仅做尺寸差异 + chip 化即可建立主次节奏。

---

#### 问题 6：ProjectCard 普通卡片过紧凑

| 维度 | 评估 |
|---|---|
| 值得实现 | ✅ 提升次级卡片信息密度 |
| ROI | **Medium** — 改善但非核心 |
| 技术风险 | 低 |
| Design Language 影响 | 低 |
| 架构违反 | 无 |

**决策：Adopt**（恢复 2 列 metrics 网格）

---

#### 问题 7：DecisionSection 未视觉化

| 维度 | 评估 |
|---|---|
| 值得实现 | ⚠️ 高价值但高风险 |
| ROI | **High** — 转化差异化优势 |
| 技术风险 | **高**（需扩展 frontmatter + 渐进迁移） |
| Design Language 影响 | 中 |
| 架构违反 | ⚠️ 边缘（扩展 frontmatter 字段） |

**决策：Modify**（采用方案 A 方案对比卡片，但**渐进迁移**：无 decisions 字段时 fallback 到现有 Markdown 渲染，不强制全项目补数据）

**理由**：强制全项目补结构化决策数据成本高，且可能引入内容失真。先做组件，再逐项目迁移。

---

#### 问题 8：缺少纹理质感

| 维度 | 评估 |
|---|---|
| 值得实现 | ⚠️ 部分值得 — 全局纹理风险高 |
| ROI | **Low-Medium** — 质感提升有限 |
| 技术风险 | 中（暗色适配） |
| Design Language 影响 | 中 |
| 架构违反 | 无 |

**决策：Modify**（仅 Grid Pattern，且仅用于 Hero 背景 + Footer 背景；放弃 noise / gradient blob）

**理由**：Grid Pattern 与"Developer"身份契合（代码网格隐喻），且实现成本最低。但全站铺纹理会破坏克制，仅 2 处使用。

---

#### 问题 9：Resume 下载按钮 UX 误导

| 维度 | 评估 |
|---|---|
| 值得实现 | ✅ 小问题但明确 |
| ROI | **Low** — 影响范围小 |
| 技术风险 | 低 |
| Design Language 影响 | 无 |
| 架构违反 | 无 |

**决策：Adopt**（文案改为"打印 / 另存为 PDF"；不换实现，避免引入 PDF 生成依赖）

---

#### 问题 10：Footer 信息密度过低

| 维度 | 评估 |
|---|---|
| 值得实现 | ⚠️ 部分值得 — 社交链接有隐私风险 |
| ROI | **Medium** |
| 技术风险 | 低 |
| Design Language 影响 | 低 |
| 架构违反 | 无 |

**决策：Modify**（仅升级为 2 列：Sitemap + About；不加 Social 列避免邮箱隐私问题；增加"最后更新"时间戳）

**理由**：用户隐私规则严格禁止邮箱入仓库。Footer 仅 GitHub 链接足够，无需 Social 列。

---

### 1.2 十大亮点评估

全部 **Keep As-Is**，不修改：
1. `// eyebrow` Design Language
2. Hero 不对称 7fr/5fr 网格
3. Projects Bento Grid
4. Timeline Capability Callout
5. Mono 字体克制使用
6. Design Token 系统严谨
7. Hero Stats Panel elevation
8. 暗色模式独立调色
9. Interview Q&A chevron 旋转
10. 三态主题切换

### 1.3 评估汇总

| 决策 | 数量 | 项目 |
|---|---|---|
| **Adopt** | 5 | Scroll Reveal / Hero 视觉主角 / Skills 重设计 / ProjectCard metrics / Resume 文案 |
| **Modify** | 5 | 配色（仅 1 辅助色）/ Timeline（仅主项目）/ DecisionSection（渐进迁移）/ 纹理（仅 Grid）/ Footer（2 列无社交） |
| **Reject** | 0 | — |

---

## 2. 最终 Roadmap

### 设计原则

- 每个 Phase 独立可提交 Git
- 每个 Phase 不破坏现有功能
- Phase 间有依赖关系，但每个 Phase 内部完整
- 总共 7 个 Phase + 1 个 Final Release

### Phase 0：Motion 基础设施

**Goal**：建立动效系统基础，不应用任何视觉变化

**Scope**：
- 新增 `src/composables/useScrollReveal.ts`（IntersectionObserver 封装）
- 新增 `src/styles/motion.css`（动效 Token + keyframes）
- 扩展 `tokens.css`（motion Token）
- 不应用任何组件

**Modified Files**：
- `src/composables/useScrollReveal.ts`（新建）
- `src/styles/motion.css`（新建）
- `src/styles/tokens.css`（扩展 motion Token）
- `src/main.ts`（引入 motion.css）

**Risk**：低 — 仅基础设施，无视觉变化

**Expected Visual Improvement**：无（基础设施）

**Rollback Strategy**：删除新增文件，恢复 tokens.css 和 main.ts

---

### Phase 1：Scroll Reveal 全站应用

**Goal**：让网站"活起来"，建立现代感

**Scope**：
- 应用 scroll reveal 到：Section headers / Card grids / Timeline stages / Stats panel / Facts / Markdown blocks
- 应用 stagger 到：Card grid items / Stats items / Facts
- 应用 micro-interaction 到：Button hover / Card hover accent line / Link underline expand
- 尊重 `prefers-reduced-motion`

**Modified Files**：
- `src/components/home/HeroSection.vue`（stats reveal）
- `src/components/home/ProjectCard.vue`（card reveal + accent line）
- `src/components/home/TimelineSection.vue`（stage reveal）
- `src/components/home/ContactSection.vue`（reveal）
- `src/pages/Home.vue`（section reveal）
- `src/pages/About.vue`（section + facts reveal）
- `src/pages/Skills.vue`（card reveal）
- `src/pages/Resume.vue`（section reveal）
- `src/pages/Interview.vue`（category reveal）
- `src/pages/AiPractice.vue`（section reveal）
- `src/pages/ProjectDetail.vue`（section reveal)
- `src/components/project/ArchitectureDiagram.vue`（reveal）
- `src/components/project/DecisionSection.vue`（reveal）
- `src/styles/global.css`（global micro-interaction classes）

**Risk**：中 — 大量文件改动，需保证 reduced-motion 路径正确

**Expected Visual Improvement**：⭐⭐⭐⭐⭐ 立即提升现代感

**Rollback Strategy**：移除 `v-scroll-reveal` 指令 / composable 调用，恢复组件原状

---

### Phase 2：Hero 视觉主角

**Goal**：第一屏 3 秒传递"做什么 + 做得怎么样"

**Scope**：
- 在 Hero 右侧增加视觉主角（见 §4 推荐方案）
- 调整 Hero 网格为 7fr/5fr → 6fr/4fr（视觉主角占更多空间）
- Stats Panel 重新定位（移到视觉主角下方或保持右侧）

**Modified Files**：
- `src/components/home/HeroSection.vue`（核心改动）
- 可能新增 1 个组件（消耗配额，待方案确认）

**Risk**：高 — 第一印象关键，方案选择失误影响大

**Expected Visual Improvement**：⭐⭐⭐⭐⭐ 解决第一印象平淡

**Rollback Strategy**：恢复 HeroSection.vue 原状

---

### Phase 3：Skills 页重设计

**Goal**：从"最模板化"到"最有信息密度"

**Scope**：
- 6 分类卡片差异化（图标 + 分类色 + 主次层级）
- 技术栈改 chip 形式
- 大卡 + 小卡 + 横长卡布局（见 §6 推荐方案）
- 引入 Slate Blue 辅助色 Token

**Modified Files**：
- `src/pages/Skills.vue`（核心改动）
- `src/styles/tokens.css`（新增 Slate Blue + chip Token）
- `src/content/skills/index.md`（frontmatter 可能扩展 icon 字段）
- `src/types/skills.ts`（类型扩展）
- `src/utils/content.ts`（scanSkills 解析扩展）

**Risk**：中 — 涉及数据层 + 视觉层

**Expected Visual Improvement**：⭐⭐⭐⭐⭐ 解决模板化问题

**Rollback Strategy**：恢复 Skills.vue + tokens.css + content.ts + skills.md

---

### Phase 4：ProjectCard + Timeline 升级

**Goal**：强化主次对比，建立 Timeline 节奏

**Scope**：
- ProjectCard normal 恢复 2 列 metrics 网格
- Timeline 主项目阶段放大 1.2x
- Timeline highlights 改 chip 形式
- Timeline stage hover：dot 放大 + amber glow

**Modified Files**：
- `src/components/home/ProjectCard.vue`（metrics 网格）
- `src/components/home/TimelineSection.vue`（主项目放大 + chip）
- `src/styles/tokens.css`（chip Token，若 Phase 3 未引入）
- `src/content/growth/timeline.md`（可能扩展 isMainProject 字段）

**Risk**：中 — Timeline 主项目放大可能破坏对齐

**Expected Visual Improvement**：⭐⭐⭐⭐ 强化主次对比

**Rollback Strategy**：恢复组件原状

---

### Phase 5：DecisionSection 视觉化

**Goal**：将 Portfolio 最大差异化优势视觉化

**Scope**：
- DecisionSection 改为方案对比卡片
- 扩展 frontmatter.decisions 字段（渐进迁移）
- 无 decisions 字段时 fallback 到 Markdown 渲染

**Modified Files**：
- `src/components/project/DecisionSection.vue`（核心改动）
- `src/types/project.ts`（Decision 类型扩展）
- `src/utils/content.ts`（scanProjectDetail 解析 decisions）
- `src/content/projects/exam-system.md`（补 decisions 字段，可选）
- `src/content/projects/love-letter.md`（补 decisions 字段，可选）
- `src/content/projects/jiangnan-travel.md`（补 decisions 字段，可选）

**Risk**：高 — 涉及数据层 + 组件重写 + 内容迁移

**Expected Visual Improvement**：⭐⭐⭐⭐ 转化差异化优势

**Rollback Strategy**：恢复 DecisionSection.vue + 类型 + content.ts；Markdown 内容不动（frontmatter 扩展向后兼容）

---

### Phase 6：色彩 + 纹理 + Footer 收尾

**Goal**：完成视觉系统收尾

**Scope**：
- Grid Pattern 纹理（Hero 背景 + Footer 背景）
- Footer 2 列升级（Sitemap + About）+ 最后更新时间戳
- Resume 按钮文案修正
- Interview 分类色彩标识
- About 引言 Signature Element（可选）

**Modified Files**：
- `src/components/home/HeroSection.vue`（Grid Pattern 背景）
- `src/components/common/Footer.vue`（2 列布局 + 时间戳）
- `src/pages/Resume.vue`（按钮文案）
- `src/pages/Interview.vue`（分类色彩）
- `src/pages/About.vue`（引言，可选）
- `src/styles/tokens.css`（Interview 分类色 Token）
- `vite.config.ts`（构建时注入 git 时间戳，可选）

**Risk**：低-中

**Expected Visual Improvement**：⭐⭐⭐ 收尾打磨

**Rollback Strategy**：逐文件恢复

---

### Phase 7：v3.5 Final Release

**Goal**：发布 v3.5.0

**Scope**：
- 全站最终审计（Code / Design / Motion / Performance / Accessibility）
- Lighthouse 验证（Vercel Preview）
- WCAG AA 对比度验证
- Playwright 测试更新
- 版本号 3.0.0 → 3.5.0
- Git Tag v3.5.0
- Release Notes

**Modified Files**：
- `package.json`（版本号）
- `HANDOFF.md`（v3.5 状态）
- `RELEASE_REVIEW_REPORT.md`（v3.5 Final Report）
- `release-gate-task-005.mjs`（新增断言）

**Risk**：低

**Expected Visual Improvement**：无（发布阶段）

**Rollback Strategy**：恢复版本号 + 文档

---

### Roadmap 依赖关系

```
Phase 0 (Motion 基础)
  ↓
Phase 1 (Scroll Reveal 应用) ← 依赖 Phase 0
  ↓
Phase 2 (Hero 视觉主角) ─┐
Phase 3 (Skills 重设计) ─┤  并行
Phase 4 (ProjectCard+Timeline) ─┘
  ↓
Phase 5 (DecisionSection) ← 独立
  ↓
Phase 6 (色彩+纹理+Footer) ← 收尾
  ↓
Phase 7 (Final Release)
```

**建议执行顺序**：0 → 1 → 2 → 3 → 4 → 5 → 6 → 7
（Phase 2/3/4 可并行，但为保证 Review 节奏，建议串行）

---

## 3. Motion System 设计

### 3.1 设计原则

1. **现代但克制** — 不超过 4 层动效
2. **compositor 友好** — 仅动画 transform / opacity / filter
3. **尊重 reduced-motion** — 强制禁用所有 transform/opacity 动画
4. **不重复触发** — IntersectionObserver unobserve 后不再监听
5. **duration ≤ 500ms** — 避免拖沓
6. **stagger ≤ 100ms** — 避免最后入场太晚

### 3.2 动效分层

#### Layer 1：Scroll Reveal（入场动效）

| 元素 | 起始状态 | 结束状态 | duration | easing |
|---|---|---|---|---|
| Section header | translateY(16px) + opacity 0 | translateY(0) + opacity 1 | 500ms | ease-out |
| Card grid item | translateY(12px) + opacity 0 | translateY(0) + opacity 1 | 400ms | ease-out |
| Timeline stage | translateX(-12px) + opacity 0 | translateX(0) + opacity 1 | 500ms | ease-out |
| Stats panel | translateX(12px) + opacity 0 | translateX(0) + opacity 1 | 500ms | ease-out |
| Stats item | opacity 0 | opacity 1 | 400ms | ease-out |
| Facts item | translateY(8px) + opacity 0 | translateY(0) + opacity 1 | 400ms | ease-out |
| Markdown block | opacity 0 | opacity 1 | 400ms | ease-out |
| ArchitectureDiagram | translateY(16px) + opacity 0 | translateY(0) + opacity 1 | 600ms | ease-out |

**触发阈值**：元素进入视口 80%（threshold: 0.2，rootMargin: "0px 0px -10% 0px"）

#### Layer 2：Stagger（错峰入场）

| 元素 | stagger 间隔 |
|---|---|
| Card grid items | 80ms |
| Stats items | 60ms |
| Facts items | 80ms |
| Skills categories | 100ms |
| Timeline stages | 120ms |
| DecisionSection options | 80ms |

#### Layer 3：Hover（悬停反馈）

| 元素 | 属性 | 起始 | 结束 | duration | easing |
|---|---|---|---|---|---|
| Button Primary | transform | translateY(0) | translateY(-1px) | 150ms | ease-in-out |
| Button Primary | box-shadow | shadow-sm | shadow-md | 150ms | ease-in-out |
| Card | transform | translateY(0) | translateY(-2px) | 200ms | ease-out |
| Card | box-shadow | shadow-sm | shadow-md | 200ms | ease-out |
| Card | border-color | border | accent | 200ms | ease-out |
| Link | text-decoration | scaleX(0) | scaleX(1) | 150ms | ease-out |
| Chip | background-color | surface | surface-hover | 150ms | ease-out |
| NavBar link | underline scaleX | 0 | 1 | 200ms | ease-out |
| Timeline dot | transform | scale(1) | scale(1.5) | 200ms | ease-out |
| ThemeToggle | transform | rotate(0) | rotate(180deg) | 300ms | ease-in-out |
| BackToTop | transform | scale(1) | scale(1.05) | 200ms | spring |

#### Layer 4：Micro-interaction（微交互）

| 元素 | 触发 | 动效 |
|---|---|---|
| Button press | :active | translateY(0) + shadow-sm |
| Card click | :active | translateY(0) |
| Accent line reveal | card hover | width 0 → 24px, 200ms ease-out |
| Q&A chevron | details[open] | rotate 0 → 90deg, 200ms |
| Page transition | route change | fade 200ms |

### 3.3 Easing 函数

```
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)     /* 入场，快速开始缓慢结束 */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)   /* hover，平滑过渡 */
--ease-in: cubic-bezier(0.4, 0, 1, 1)         /* 退出，少用 */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1) /* 弹性，仅 BackToTop */
```

### 3.4 Duration Token

```
--duration-fast: 150ms      /* hover */
--duration-normal: 250ms    /* transition */
--duration-slow: 400ms      /* reveal */
--duration-reveal: 500ms    /* scroll reveal */
--duration-slowest: 600ms   /* ArchitectureDiagram */
```

### 3.5 使用场景

| 场景 | 适用 Layer |
|---|---|
| 首次进入视口 | Layer 1 + Layer 2 |
| 鼠标悬停 | Layer 3 |
| 点击按下 | Layer 4 |
| 路由切换 | Layer 4（page transition） |

### 3.6 禁止事项

❌ **禁止动画 layout 属性**：width / height / top / left / margin / padding
❌ **禁止 parallax**：性能差，与克制风格冲突
❌ **禁止 3D transform**：rotateY / rotateX / perspective
❌ **禁止复杂 keyframe**：超过 3 个关键帧的动画
❌ **禁止 duration > 500ms**（ArchitectureDiagram 例外 600ms）
❌ **禁止 stagger > 120ms**
❌ **禁止无限循环动画**（Hero scroll bob 除外，已有）
❌ **禁止动效叠加**：同一元素不超过 2 个动效同时执行

### 3.7 Reduced Motion 处理

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**额外保障**：
- scroll reveal 元素**默认 opacity:1**（JS 失败时仍可见）
- 仅在 JS 成功注册 IntersectionObserver 后才设置 opacity:0
- reduced-motion 用户不应用任何 transform/opacity 入场动画

### 3.8 风险评估

| 风险 | 严重度 | 缓解 |
|---|---|---|
| INP 退化 | 中 | 仅 transform/opacity，duration ≤ 500ms |
| LCP 退化 | 中 | Hero 内容不应用 scroll reveal |
| reduced-motion 用户看到跳变 | 低 | 默认 opacity:1 |
| 动效过度花哨 | 高 | 严格 4 层，不超出 |

---

## 4. Hero Visual Direction

### 4.1 设计约束

- 不破坏 Developer Academic 风格
- 不引入新依赖
- 不消耗超过 1 个组件配额
- 必须在 3 秒内传递"做什么 + 做得怎么样"
- 不使用图片资源（避免资源管理复杂度）

### 4.2 方案 A：代码片段卡片（Code Snippet Card）

**效果**：
Hero 右侧 Stats Panel 上方增加一张"代码片段卡片"，展示江南出行分布式锁核心代码（10-15 行），用 Shiki 高亮，mono 字体。

```
┌─────────────────────────────────┐
│ // distributed-lock.ts          │
│                                 │
│ async function acquireLock(     │
│   key: string,                  │
│   ttl: number                   │
│ ): Promise<boolean> {           │
│   const token = uuid()          │
│   const ok = await redis.set(   │
│     key, token,                 │
│     'PX', ttl,                  │
│     'NX'                        │
│   )                             │
│   return ok === 'OK'            │
│ }                               │
└─────────────────────────────────┘
```

**优点**：
- 与 "Developer" 身份高度契合
- 复用 Shiki 基建，无新依赖
- 代码即"证据"，比 stats 更有说服力
- 可消耗 0 个组件配额（直接在 HeroSection 内实现）

**风险**：
- 代码片段选择需谨慎（不能太长，不能泄露敏感信息）
- Shiki 构建时高亮，需确认 Hero 内使用方式

**与 Design Language 一致性**：✅ 高度一致（Mono + 代码 = Developer）

---

### 4.3 方案 B：几何线框背景（Geometric Wireframe）

**效果**：
Hero 背景增加 SVG 几何线框（grid + 抽象节点连线），subtle 不抢戏。

```
┌─────────────────────────────────┐
│ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼      │
│  ╱─────────╲                    │
│ ┼ ●─────────● ┼ ┼ ┼ ┼ ┼ ┼      │
│  │         │                    │
│ ┼ │  Hero   │ ┼ ┼ ┼ ┼ ┼ ┼      │
│  │ Content │                    │
│ ┼ ●─────────● ┼ ┼ ┼ ┼ ┼ ┼      │
│  ╲─────────╱                    │
│ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼      │
└─────────────────────────────────┘
```

**优点**：
- 视觉冲击力强
- 与 Grid Pattern 纹理方案呼应
- 不消耗组件配额

**风险**：
- 可能抢戏（与文字争夺视觉焦点）
- 几何节点抽象，可能让用户困惑
- 暗色模式适配复杂

**与 Design Language 一致性**：⚠️ 中等（线框偏装饰，与克制风格有张力）

---

### 4.4 方案 C：项目截图马赛克（Project Screenshots Mosaic）

**效果**：
Hero 右侧用 3 个项目的小截图拼贴成马赛克，配项目名 label。

```
┌─────────────────────────────────┐
│ ┌────────┬────────┐             │
│ │ 江南出行 │ 考试系统 │             │
│ │ screenshot│screenshot│           │
│ ├────────┴────────┤             │
│ │ 情书生成器        │             │
│ │ screenshot       │             │
│ └──────────────────┘             │
└─────────────────────────────────┘
```

**优点**：
- 直观展示项目成果
- 视觉信息量大

**风险**：
- 需要管理 3 张截图资源（违反"不引入新资源"原则）
- 截图质量参差不齐
- 移动端适配复杂
- 消耗组件配额

**与 Design Language 一致性**：❌ 低（图片与 Developer Academic 风格冲突，偏 marketing）

---

### 4.5 方案 D：数据可视化卡片（Data Visualization Card）

**效果**：
Hero 右侧 Stats Panel 升级为"数据可视化卡片"，包含 mini chart / progress ring。

```
┌─────────────────────────────────┐
│ // 工程规模                      │
│                                 │
│  3 完整项目       ◐◐◐           │
│  218 源文件  ▓▓▓▓▓▓▓▓▓▓░░░░    │
│  97 API 端点  ▓▓▓▓▓▓▓░░░░░░    │
│  236 测试用例 ▓▓▓▓▓▓▓▓▓▓▓▓░    │
└─────────────────────────────────┘
```

**优点**：
- 信息可视化
- 与现有 Stats Panel 升级路径自然

**风险**：
- 进度条无明确基准（218/多少？）
- 可视化可能误导（数据被人为放大）
- 消耗组件配额

**与 Design Language 一致性**：⚠️ 中等（可视化偏 dashboard，与 Editorial 风格有张力）

---

### 4.6 方案 E：Terminal 模拟器（Terminal Simulator）

**效果**：
Hero 右侧展示一个 Terminal 模拟器，模拟 git log / npm run dev 等命令输出，带 typing 动画。

```
┌─────────────────────────────────┐
│ $ git log --oneline -5          │
│ 3d485c9 chore(rc8): final ...   │
│ e31e0b8 feat(rc7): final ...    │
│ 92a605a feat(rc6): interview... │
│                                 │
│ $ npm run test                  │
│ ✓ 74/74 passing (3.2s)          │
│                                 │
│ $ _                              │
└─────────────────────────────────┘
```

**优点**：
- 极致 Developer 气质
- 动态 typing 动画吸睛
- 不消耗组件配额（可在 HeroSection 内实现）

**风险**：
- typing 动画可能违反"动效克制"（需谨慎）
- 静态 fallback 需考虑
- 移动端空间不足

**与 Design Language 一致性**：✅ 高度一致（Terminal = Developer 终极符号）

---

### 4.7 方案推荐

| 方案 | 推荐度 | 理由 |
|---|---|---|
| A. 代码片段卡片 | ⭐⭐⭐⭐⭐ | **推荐** — 与身份最契合，复用 Shiki，零配额 |
| B. 几何线框背景 | ⭐⭐⭐ | 视觉冲击强但风险高 |
| C. 项目截图马赛克 | ⭐⭐ | 违反"不引入新资源" |
| D. 数据可视化卡片 | ⭐⭐⭐ | 可视化但基准模糊 |
| E. Terminal 模拟器 | ⭐⭐⭐⭐ | 极致 Developer，但 typing 动画风险 |

**最终推荐：方案 A（代码片段卡片）**

**理由**：
1. 与 Developer Academic 身份高度契合
2. 复用 Shiki 构建时高亮，无新依赖
3. 不消耗组件配额（直接在 HeroSection 内实现）
4. 代码即"证据"，比 stats 更有说服力
5. 实现成本最低，风险最小

---

## 5. Signature Visual

### 5.1 设计目标

建立全站统一视觉符号，提升品牌辨识度，**不破坏**：
- `// eyebrow` 语言
- Mono 字体策略
- Developer Academic 风格

### 5.2 现有 Signature 资产

- `// eyebrow` — 已建立，保持
- Bento Grid — 已建立，保持
- Mono 数字 — 已建立，保持

### 5.3 新增 Signature 元素

#### Signature 1：Mono Number Prefix（章节编号）

**效果**：每个 section header 的 `// eyebrow` 前增加 mono 数字编号。

```
当前：// 精选项目
v3.5：// 01 · 精选项目
      // 02 · 技术成长
      // 03 · 联系方式
```

**应用范围**：Home / ProjectDetail / About / Skills 等多 section 页面

**实现**：CSS counter 或 frontmatter 显式编号

**与现有资产关系**：增强 `// eyebrow`，不破坏

---

#### Signature 2：Amber Accent Line（强调短线）

**效果**：在关键位置增加 24px × 2px amber 短线，作为"被强调"标记。

```
┌──────────────────────────┐
│ ▌                          │  ← 2px × 24px amber 短线
│ // 关键决策                │
│ Decision Title             │
└──────────────────────────┘
```

**应用范围**：
- DecisionSection 主面板
- About 引言
- Resume 核心竞争力 callout
- ProjectCard featured hover

**与现有资产关系**：与 Timeline capability callout 的 border-left 呼应，统一为"强调语言"

---

#### Signature 3：Grid Pattern Underlay（网格底纹）

**效果**：Hero 背景 + Footer 背景 subtle grid pattern。

```
┌─────────────────────────────┐
│ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼  │  ← Hero 背景
│                             │
│   [Hero content overlay]    │
│                             │
│ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼  │
└─────────────────────────────┘
```

**应用范围**：仅 Hero + Footer（2 处，不全局）

**与现有资产关系**：与 `// eyebrow` / Mono 共同建立"代码 / 工程"视觉语言

---

### 5.4 Signature 组合效果

```
┌─────────────────────────────────────┐
│ [grid pattern underlay]             │  ← Signature 3
│                                     │
│ // 01 · Hero Title                  │  ← Signature 1
│ ▌ subtitle                          │  ← Signature 2 (可选)
│                                     │
└─────────────────────────────────────┘
```

### 5.5 风险评估

| 风险 | 严重度 | 缓解 |
|---|---|---|
| Number Prefix 破坏 eyebrow 简洁 | 中 | 用 `·` 分隔，编号 mono 风格 |
| Accent Line 滥用 | 高 | 严格限定 4 处使用 |
| Grid Pattern 抢戏 | 中 | 透明度 0.4，仅 2 处 |

### 5.6 与 Design Language 关系

| Signature | 关系 |
|---|---|
| Number Prefix | **增强** `// eyebrow`，不破坏 |
| Accent Line | **统一**已有 border-left 语言，不破坏 |
| Grid Pattern | **呼应** Mono / 代码隐喻，不破坏 |

**结论**：3 个 Signature 元素均在现有 Design Language 基础上**增强**而非破坏。

---

## 6. Skills 重设计方案

### 6.1 设计约束

- 6 分类：后端 / 前端 / 小程序 / 工具运维 / AI 工程 / 软件工程实践
- 不引入新依赖
- 保持 Markdown SSOT
- 分类色仅用 Amber + Slate Blue（§1.4 决策）
- 必须解决"6 卡片视觉相同"问题

### 6.2 方案 A：Bento 大小卡混合（推荐）

**布局**：
```
桌面端 2 列：
┌──────────────────┬──────────────────┐
│ [Server icon]    │ [Layout icon]    │
│ 后端开发 (大卡)    │ 前端开发 (大卡)    │
│ Amber            │ Slate Blue       │
│ [chip][chip][chip]│ [chip][chip][chip]│
│ 学习路线: ...     │ 学习路线: ...     │
├─────────┬────────┴────────┬─────────┤
│[Smart]  │[Terminal]        │[Sparkle] │
│小程序    │工具运维           │AI 工程   │
│(小卡)   │(小卡)            │(小卡)   │
│Slate    │Slate Blue        │Amber    │
├─────────┴─────────────────┴─────────┤
│ [Workflow icon] 软件工程实践 (横长卡)  │
│ Amber                                │
│ [chip][chip][chip][chip]              │
└─────────────────────────────────────┘
```

**信息密度**：⭐⭐⭐⭐⭐ 高 — 大卡详尽，小卡精简
**可读性**：⭐⭐⭐⭐⭐ 高 — 主次清晰，扫读友好
**现代感**：⭐⭐⭐⭐⭐ 高 — Bento 破坏型布局
**维护成本**：⭐⭐⭐ 中 — 需 frontmatter 扩展 icon + priority 字段

**优点**：
- 主次层级清晰（核心 vs 辅助）
- 与 Home Projects Bento 呼应，全站一致
- 分类色克制（仅 Amber + Slate Blue）

**缺点**：
- frontmatter 需扩展字段
- 移动端需简化布局

---

### 6.3 方案 B：单列时间线

**布局**：
```
桌面端单列：
┌─────────────────────────────────────┐
│ ● 后端开发                            │
│ │ [Server icon] Amber                │
│ │ [chip][chip][chip]                  │
│ │ 学习路线: ...                       │
│ │                                    │
│ ● 前端开发                            │
│ │ [Layout icon] Slate Blue           │
│ │ [chip][chip][chip]                  │
│ │ ...                                │
│ │                                    │
│ ● 小程序 & 跨端                       │
│ │ ...                                │
└─────────────────────────────────────┘
```

**信息密度**：⭐⭐⭐ 中 — 单列展开
**可读性**：⭐⭐⭐⭐ 高 — 线性阅读路径
**现代感**：⭐⭐⭐ 中 — 与 Home Timeline 重复
**维护成本**：⭐⭐⭐⭐ 低 — 仅纵向堆叠

**优点**：
- 阅读路径清晰
- 维护成本低

**缺点**：
- 与 Home Timeline 视觉重复
- 单列过窄，桌面端留白多
- 无法体现主次层级

---

### 6.4 方案 C：分类标签云 + 详情展开

**布局**：
```
桌面端：
┌─────────────────────────────────────┐
│ [后端] [前端] [小程序] [工具] [AI] [实践]│  ← 6 个标签
├─────────────────────────────────────┤
│ ▾ 后端开发                            │  ← 点击展开
│   [chip][chip][chip]                  │
│   学习路线: ...                       │
│   学习重点: ...                       │
└─────────────────────────────────────┘
```

**信息密度**：⭐⭐ 低 — 默认折叠
**可读性**：⭐⭐⭐ 中 — 需点击展开
**现代感**：⭐⭐⭐⭐ 高 — 交互式
**维护成本**：⭐⭐⭐⭐ 低 — 类似 Interview Q&A

**优点**：
- 首屏简洁
- 复用 Interview Q&A 折叠模式

**缺点**：
- 默认隐藏内容，SEO 不友好
- 用户需额外点击，增加摩擦
- 与 Interview 视觉重复

---

### 6.5 方案比较矩阵

| 维度 | 方案 A Bento | 方案 B 时间线 | 方案 C 折叠 |
|---|---|---|---|
| 信息密度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| 可读性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 现代感 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| 维护成本 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 与全站一致性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| 解决模板化 | ✅ | ⚠️ 部分 | ✅ |
| SEO 友好 | ✅ | ✅ | ❌ |

### 6.6 方案推荐

**推荐：方案 A（Bento 大小卡混合）**

**理由**：
1. 信息密度最高，解决"6 卡片视觉相同"问题
2. 与 Home Projects Bento 呼应，全站 Design Language 一致
3. 主次层级清晰，符合 Editorial 风格
4. SEO 友好（无折叠）
5. 分类色克制（仅 Amber + Slate Blue）

---

## 7. 最终输出

### 7.1 关键决策点（待用户确认）

| # | 决策项 | 推荐方案 | 备选 |
|---|---|---|---|
| 1 | Audit 评估结论 | 5 Adopt + 5 Modify | — |
| 2 | Roadmap 划分 | 8 Phase（0-7） | — |
| 3 | Motion 系统 | 4 层 + reduced-motion | — |
| 4 | Hero 视觉主角 | 方案 A（代码片段卡片） | B/C/D/E |
| 5 | Signature Visual | 3 元素（Number Prefix + Accent Line + Grid Pattern） | — |
| 6 | Skills 重设计 | 方案 A（Bento 大小卡） | B/C |
| 7 | 配色扩展 | 仅 Slate Blue（1 辅助色） | + Sage Green |
| 8 | Footer | 2 列（Sitemap + About），无 Social | — |
| 9 | DecisionSection | 渐进迁移 + fallback | 强制全迁移 |
| 10 | Timeline | 仅主项目放大 + chip | 全部重设计 |

### 7.2 不确定项（需用户决策）

1. **Hero 代码片段内容**：选择哪个项目的哪段代码？
   - 候选：江南出行分布式锁 / 考试系统并发控制 / 情书生成器 Prompt 工程
   - 建议：江南出行分布式锁（最具技术深度）

2. **Skills 分类色映射**：
   - 候选：后端=Amber / 前端=Slate Blue / 小程序=Slate / 工具=Slate Blue / AI=Amber / 实践=Amber
   - 建议：前者（核心方向用 Amber，辅助方向用 Slate Blue，次要方向用 Slate）

3. **About 引言内容**：
   - 候选："工程师的克制，学者的严谨"
   - 建议：前者（与 Developer Academic 定位呼应）

4. **Footer 最后更新时间戳来源**：
   - 候选 A：git 最近 commit 日期（构建时注入）
   - 候选 B：package.json version 日期
   - 建议：A（git-based，准确反映更新频率）

### 7.3 验收标准

#### 视觉验收
- [ ] 全站 scroll reveal 生效，尊重 reduced-motion
- [ ] Hero 增加视觉主角（代码片段卡片）
- [ ] Skills 6 卡片差异化（Bento 大小卡 + 图标 + 分类色）
- [ ] DecisionSection 视觉化（方案对比卡片 + fallback）
- [ ] Timeline 主项目放大 + highlights chip 化
- [ ] ProjectCard normal metrics 网格化
- [ ] Footer 2 列 + 最后更新时间戳
- [ ] Grid Pattern 纹理（Hero + Footer）
- [ ] Signature 3 元素全部应用
- [ ] Slate Blue 辅助色 Token 定义并应用

#### 工程验收
- [ ] typecheck 通过
- [ ] build 通过
- [ ] Playwright 全部通过（含新增断言）
- [ ] Bundle 体积回归 ≤ +3 KB gzip
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 95
- [ ] WCAG AA 对比度全部通过
- [ ] 无新增运行时依赖
- [ ] 组件配额 ≤ 1 新组件
- [ ] `// eyebrow` / Mono / Token / 暗色模式 / Bento / Markdown SSOT 全部保持

### 7.4 不破坏的约束（Do Not Touch）

- `// eyebrow` Design Language
- Inter + JetBrains Mono 字体组合
- Design Token 系统完整性
- 暗色模式独立调色
- Bento Grid（featured 跨 2 行）
- Markdown SSOT 架构
- 运行时依赖仅 3 项（vue / vue-router / lucide-vue-next）
- 三态主题切换
- 8 个虚拟模块
- 组件配额（已用 1，剩 1）

---

## 总结

### 核心策略

**从 "Developer Academic — Strict Mode" 演进为 "Developer Editorial — Confident Mode"**。

保留克制，增加自信。保留 Design Language 资产，补足视觉短板。

### Audit 评估结论

- **5 项 Adopt**：Scroll Reveal / Hero 视觉主角 / Skills 重设计 / ProjectCard metrics / Resume 文案
- **5 项 Modify**：配色（仅 1 辅助色）/ Timeline（仅主项目）/ DecisionSection（渐进迁移）/ 纹理（仅 Grid）/ Footer（2 列无社交）
- **0 项 Reject**

### Roadmap 摘要

| Phase | Goal | 风险 |
|---|---|---|
| 0 | Motion 基础设施 | 低 |
| 1 | Scroll Reveal 全站应用 | 中 |
| 2 | Hero 视觉主角（代码片段卡片） | 高 |
| 3 | Skills 重设计（Bento 大小卡） | 中 |
| 4 | ProjectCard + Timeline 升级 | 中 |
| 5 | DecisionSection 视觉化 | 高 |
| 6 | 色彩 + 纹理 + Footer 收尾 | 低-中 |
| 7 | v3.5 Final Release | 低 |

---

**《Portfolio v3.5 Implementation Plan》结束。**

本阶段严格遵守"仅输出设计方案，不修改源码、不 commit、不 push、不更新项目文档"原则。

> **注意**：本文件为设计探索文档，非项目工程文档。如需进入开发阶段，需用户明确批准。
