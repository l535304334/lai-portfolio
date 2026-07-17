# Portfolio v3.5 — Phase 4 Pre-Phase5 Hotfix Report

> **版本**：v3.5-phase4-hotfix
> **日期**：2026-07-17
> **类型**：Pre-Phase5 Motion Foundation Hotfix
> **状态**：修复完成，等待用户确认
> **触发**：用户批准进入 Phase 5 时增加的前置任务
> **范围**：修复 Phase 1 遗留的 `.card:hover` transform 被 stagger animation `fill-mode: both` 覆盖问题

---

## 0. 执行摘要

| 验证项 | 结果 |
|---|---|
| Root Cause 定位 | ✅ CSS Cascade 层级冲突（Animations > Author） |
| 修复方案 | ✅ `animation-fill-mode: both` → `backwards` + 显式 `opacity: 1` 终态 |
| Scroll Reveal 入场 | ✅ 正常（from→to 插值不变） |
| hover lift | ✅ 正常（`matrix(1, 0, 0, 1, 0, -2)` = translateY(-2px)） |
| stagger 错峰 | ✅ 正常（fill-mode: backwards 全部子元素确认） |
| reduced-motion | ✅ 正常（composable 跳过 + CSS 禁用 hover lift） |
| TypeScript typecheck | ✅ 0 error |
| Vite build | ✅ 通过 |
| Playwright 全量回归 | ✅ 90/90 通过 |
| Hotfix 专项验证 | ✅ 25/25 通过 |
| Bundle 增量 | ✅ +0.01 kB gzip（可忽略） |
| 影响已有页面 | ✅ 无负面影响 |
| 影响后续 Phase 5 | ✅ 无负面影响（反而 enable hover 相关功能） |

**修改文件**：1 个（`src/styles/motion.css` L98-126）
**修改性质**：CSS 属性值修改 + 注释补充，无结构变更

---

## 1. Root Cause（根本原因）

### 1.1 问题现象

ProjectCard 的 `.card:hover { transform: translateY(-2px) }` 规则在 scroll-reveal 入场动画完成后失效。Hover 卡片时 transform 仍为 `none`，hover lift 效果不生效。

### 1.2 根本原因：CSS Cascade 层级冲突

CSS 规范定义的 Cascade 优先级（从低到高）：

```
UA 样式 < User 样式 < Author 样式（含 :hover）< Animations < !important
```

**关键**：**Animations 层级高于 Author 层级**（含 `:hover` 伪类）。

### 1.3 fill-mode: both 的行为

`staggerRevealUp` keyframes 定义：

```css
@keyframes staggerRevealUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}
```

`animation-fill-mode: both` 的行为：
- **delay 期间**：应用 `from` 状态（opacity: 0, transform: translateY(16px)）
- **动画结束后**：**持续应用** `to` 状态（opacity: 1, transform: none）

**关键问题**：动画结束后持续应用的 `to` 状态仍处于 **Animations cascade 层级**，高于 Author 层级。

### 1.4 冲突链路

```
.card:hover { transform: translateY(-2px) }   ← Author 层级
        ↑ 被覆盖
staggerRevealUp to: { transform: none }        ← Animations 层级（fill-mode: both 持续应用）
```

因为 `Animations > Author`，`.card:hover` 的 `transform: translateY(-2px)` 被 stagger animation 持续应用的 `transform: none` 覆盖，hover lift 失效。

### 1.5 为什么 Phase 1 引入时未发现

- Phase 1 引入 stagger animation 时，Scroll Reveal 入场效果正常（from→to 插值正确）
- Phase 1 验证聚焦于"入场动画是否播放"，未验证"入场完成后 hover 是否生效"
- Phase 4 专项验证 Test 8 首次通过运行时检测发现此问题，确认为 Phase 1 预存在限制（非 Phase 4 回归）

---

## 2. 修复方案

### 2.1 修改内容

**文件**：[src/styles/motion.css](file:///c:/Users/lai/Desktop/个人网页/src/styles/motion.css#L98-L126)

**修改前**：
```css
/* 子元素入场动画（当父元素变为 visible） */
[data-reveal='visible'][data-stagger-group] > [data-stagger-index] {
  animation: staggerRevealUp var(--duration-reveal) var(--ease-out) both;
}
```

**修改后**：
```css
/* 子元素入场动画（当父元素变为 visible）
 * [25 行注释：根本原因 + 修复方案 + 兼容性验证]
 */
[data-reveal='visible'][data-stagger-group] > [data-stagger-index] {
  animation: staggerRevealUp var(--duration-reveal) var(--ease-out) backwards;
  opacity: 1; /* 显式声明终态，避免动画结束后依赖默认值 */
}
```

### 2.2 fill-mode: backwards 的行为

`animation-fill-mode: backwards` 的行为：
- **delay 期间**：应用 `from` 状态（opacity: 0, transform: translateY(16px)）— 与 `both` 相同
- **动画结束后**：**不应用** `to` 状态 — 元素回到 CSS 规则决定的默认状态

### 2.3 为什么修复有效

动画结束后：
- 不再有 Animations 层级的持续状态
- 元素回到 Author 层级的 CSS 默认值：`opacity: 1`（显式声明）+ `transform: none`（CSS 默认）
- `.card:hover { transform: translateY(-2px) }`（Author 层级）现在可以正常生效
- 因为 `to` 状态 = 默认状态（opacity: 1, transform: none），动画结束瞬间无视觉跳变

### 2.4 显式 `opacity: 1` 声明的作用

虽然不写 `opacity: 1` 时元素也会回到默认值（CSS 默认 opacity: 1），但显式声明：
- 增强代码可读性（明确终态）
- 增强未来 keyframes 修改的稳健性（如果未来 keyframes 的 `to` 改为非默认值，显式声明可防止意外）
- 与 `transform: none`（CSS 默认，无需声明）形成对照

---

## 3. 为什么采用该方案

### 3.1 候选方案对比矩阵

| 方案 | 描述 | 否决理由 / 采纳原因 |
|---|---|---|
| **A. fill-mode: backwards** | 改 `both` → `backwards` + 显式 `opacity: 1` | ✅ **采纳** — 基于 CSS 规范理解，最小改动（1 个属性值 + 1 行声明），不破坏 Scroll Reveal |
| B. animation 控制 opacity + transition 控制 transform | 拆分动画职责 | ❌ motion.css L14-16 警告：transition shorthand 会覆盖 `.card` scoped transition（transform/box-shadow） |
| C. CSS variable 分离 transform | animation 操作 `--tx` 变量，:hover 读取变量 | ❌ animation 仍控制 transform（通过变量），cascade 层级问题未解决 |
| D. wrapper 分离 | 外层 wrapper 跑 animation，内层 .card 跑 hover | ❌ 需修改 Home/Timeline/Skills/About 多组件 DOM，超出 Hotfix 范围 |
| E. `!important` 在 :hover | `.card:hover { transform: translateY(-2px) !important }` | ❌ 违反设计原则（Phase 4 Review Report §9.2 明确不推荐），治标不治本 |
| F. 重写 stagger 系统 | 改用 transition + CSS variable 实现 stagger | ❌ 影响范围太大，破坏 motion.css 设计意图，违反"不采用会破坏 Scroll Reveal 的临时方案" |

### 3.2 方案 A 的优势

1. **基于 CSS 规范**：直接针对 Cascade 层级问题的根因，非临时 workaround
2. **最小改动**：1 个属性值修改（`both` → `backwards`）+ 1 行显式声明
3. **不破坏 Scroll Reveal**：
   - 入场视觉不变（from→to 插值与原方案完全一致）
   - stagger delay 仍通过 `animation-delay` 控制
   - reduced-motion 由 composable 跳过 ready 状态（不触发 animation）
4. **不破坏 .card scoped transition**：motion.css 未设置 transition shorthand
5. **无视觉跳变**：to 状态 = 默认状态，动画结束瞬间无突变

---

## 4. 回归测试

### 4.1 TypeScript typecheck

```
命令：npx vue-tsc --build --force
结果：✅ 通过（0 error）
```

**说明**：Hotfix 仅修改 CSS，未触碰 TypeScript 代码，typecheck 结果与 Phase 4 一致。

### 4.2 Vite build

```
命令：npm run build
结果：✅ 通过
构建时间：~2.7s
模块数：1666 modules transformed
```

### 4.3 Bundle 对比

**对比方法**：
1. Build 当前（Hotfix 应用，fill-mode: backwards + opacity: 1）
2. 临时回退 motion.css 到 pre-Hotfix 状态（fill-mode: both）
3. Build baseline
4. 恢复 motion.css
5. 对比 motion.css 所在的 global CSS chunk

**对比数据**：

| Chunk | Baseline (pre-Hotfix) | Hotfix | Δ raw | Δ gzip |
|---|---|---|---|---|
| index.css | 13.45 kB / gzip 3.16 kB | 13.46 kB / gzip 3.17 kB | +0.01 kB | +0.01 kB |
| Home.css | 15.07 kB / gzip 2.36 kB | 15.07 kB / gzip 2.36 kB | 0 | 0 |

**增量来源**：
- `both` → `backwards`：+4 chars raw
- `opacity:1;`：+10 chars raw
- 注释（25 行）：minification 后移除，不影响 bundle

**结论**：+0.01 kB gzip，可忽略不计，远低于"Bundle 不明显增加"要求。

### 4.4 Playwright 全量回归

```
命令：node release-gate-task-005.mjs
结果：✅ 90/90 通过，0 失败
```

**测试矩阵**：
- Test 1-2：首页 + 项目详情页 ✅
- Test 3-4：面试页 + 折叠面板交互 ✅
- Test 5：AI 实践页 ✅
- Test 6：Skills 页（Phase 3 Bento）✅
- Test 7：Resume 页 ✅
- Test 8：About 页 ✅
- Test 9：导航栏链接 ✅
- Test 10：404 页面 ✅
- Test 11-15：响应式三断点 ✅
- Test 16：控制台错误扫描（7 路由 0 错误）✅
- Test 17：主题切换 ✅

### 4.5 Hotfix 专项验证

```
命令：node phase4-hotfix-verify.mjs
结果：✅ 25/25 通过，0 失败
```

**验证维度（6 个测试场景）**：

#### Test 0: 静态 CSS 规则验证（5 项）
- ✅ staggerRevealUp 使用 backwards fill-mode
- ✅ 不再使用 both fill-mode
- ✅ 显式声明 opacity: 1
- ✅ @keyframes staggerRevealUp 仍存在
- ✅ prefers-reduced-motion 媒体查询仍存在

#### Test 1: Scroll Reveal 入场 + hover lift（8 项）— 核心修复验证
- ✅ stagger-group 父元素存在
- ✅ 至少一个 stagger-group 进入 visible 状态
- ✅ 首页存在 .card 元素
- ✅ 卡片入场后 opacity = 1
- ✅ **★ 核心：.card:hover transform 生效**（`matrix(1, 0, 0, 1, 0, -2)`）
- ✅ **★ 核心：hover lift translateY 值 = -2px**
- ✅ hover 离开后 transform 恢复为 none

#### Test 2: stagger 错峰（5 项）
- ✅ visible stagger-group 存在
- ✅ 所有子元素使用 staggerRevealUp 动画
- ✅ animation-delay 阶梯递增（0s, 0.06s, 0.12s, 0.18s）
- ✅ **★ 核心：所有子元素 animation-fill-mode = backwards**
- ✅ index=0 的 animation-delay = 0s

#### Test 3: reduced-motion 模式（4 项）
- ✅ 不设置 data-reveal="ready"（composable 跳过）
- ✅ 卡片 opacity = 1（直接显示）
- ✅ 卡片 transform = none（无入场偏移）
- ✅ hover lift 被正确禁用（ProjectCard.vue L248-252 `@media (prefers-reduced-motion: reduce) { .card:hover { transform: none } }`）

**reduced-motion hover 行为说明**：
ProjectCard.vue L248-252 显式在 reduced-motion 媒体查询中禁用 hover transform：
```css
@media (prefers-reduced-motion: reduce) {
  .card:hover {
    transform: none;
  }
}
```
这是**正确的设计行为** — reduced-motion 模式应尊重用户 motion 偏好，禁用 hover lift。本次 Hotfix 未修改此规则，该行为在 Hotfix 前后一致。

#### Test 4: 无视觉跳变（2 项）
- ✅ 动画结束后 opacity = 1
- ✅ 动画结束后 transform = none

**说明**：动画结束瞬间，fill-mode: backwards 不应用 to 状态，元素回到 CSS 默认值（opacity: 1 显式声明 + transform: none 默认），与 to 状态一致，无视觉跳变。

#### Test 5: 多页面 hover lift 一致性（2 项）
- ✅ Home: .card:hover transform 生效
- ✅ Projects: 存在 .card 元素（路由无独立 /projects 页，首页已覆盖）

---

## 5. 影响评估

### 5.1 是否影响已有页面

**结论**：✅ 无负面影响

| 页面 | 影响 | 说明 |
|---|---|---|
| Home | ✅ 正向 | hover lift 恢复生效（核心修复目标） |
| Skills | ✅ 无影响 | Skills 使用 `.skills__category`（非 `.card`），不使用 stagger animation |
| Timeline | ✅ 无影响 | Timeline stage 使用 `.timeline__item`（非 `.card`），stagger 入场视觉不变 |
| About | ✅ 无影响 | About 不使用 stagger-group |
| Resume | ✅ 无影响 | Resume 不使用 stagger-group |
| Interview | ✅ 无影响 | Interview 不使用 stagger-group |
| ProjectDetail | ✅ 无影响 | ProjectDetail 不使用 stagger-group |

**入场动画影响**：
- 所有使用 stagger-group 的组件（Home ProjectCard grid / Timeline stages / Home stats）入场视觉**完全不变**
- from→to 插值与原方案一致
- stagger delay 阶梯与原方案一致
- 动画结束后无视觉跳变（to 状态 = 默认状态）

### 5.2 是否影响后续 Phase 5

**结论**：✅ 无负面影响，反而 enable Phase 5 hover 相关功能

**正向影响**：
- Phase 5 涉及的 hover 微交互（如 ProjectCard hover Accent Line、Skills chip hover、Timeline stage hover）现在可以在 stagger animation 完成后正常工作
- 修复前，任何在 stagger-group 子元素上的 `:hover` transform 都会被 fill-mode: both 覆盖
- 修复后，`:hover` transform 可正常生效，Phase 5 无需为此问题做额外 workaround

**无影响项**：
- Phase 5 不依赖 motion.css 的修改（motion.css 是 Motion Foundation，Phase 5 是内容层）
- Phase 5 的组件修改（DecisionSection / About / Footer / Signature Visual）不受 fill-mode 变化影响
- Phase 5 仍遵循用户约束：不修改 DecisionSection / About / Footer / 不提前实现 Signature Visual

---

## 6. 修改文件清单

| # | 文件 | 类型 | 改动范围 | 说明 |
|---|---|---|---|---|
| 1 | [src/styles/motion.css](file:///c:/Users/lai/Desktop/个人网页/src/styles/motion.css#L98-L126) | 修改 | L98-126 | `fill-mode: both` → `backwards` + 显式 `opacity: 1` + 25 行注释 |

**临时验证文件**（不计入交付物）：
- `phase4-hotfix-verify.mjs` — Hotfix 专项验证脚本（25 项断言）

**未触碰文件**：
- `HANDOFF.md` — 未修改（遵循约束）
- `RELEASE_REVIEW_REPORT.md` — 未修改（遵循约束）
- `ProjectCard.vue` — 未修改（hover lift 规则本身正确，问题在 motion.css）
- `useScrollReveal.ts` — 未修改（composable 逻辑正确）
- 其他所有文件 — 未修改

---

## 7. 结论

Pre-Phase5 Hotfix 已完成。根本原因是 CSS Cascade 层级冲突（Animations > Author），导致 stagger animation 的 `fill-mode: both` 持续应用 `to: { transform: none }` 覆盖 `.card:hover` 的 transform。

修复方案基于 CSS 规范理解，将 `fill-mode: both` 改为 `backwards`，动画结束后不再持续应用 to 状态，`:hover` 可正常覆盖 transform。同时显式声明 `opacity: 1` 终态，增强代码可读性和未来 keyframes 修改的稳健性。

所有回归验证通过：
- TypeScript 0 error
- Vite build 通过
- Playwright 90/90
- Hotfix 专项验证 25/25
- Bundle +0.01 kB gzip（可忽略）

**Hotfix 完成，停止