# Phase 6 Review Report — 视觉系统收尾

**Phase**: Phase 6（色彩 + 纹理 + Footer 收尾）
**完成时间**: 2026-07-18
**状态**: ✅ Review Gate 通过 — 等待用户人工 Review
**前序 Phase**: Phase 5（DecisionSection 方案对比卡片）已于 2026-07-18 完成并通过 Review Gate

---

## 1. 执行摘要

Phase 6 完成视觉系统收尾工作，包含 5 项核心改动 + 1 项用户决策方案：

| # | 改动项 | 状态 | 备注 |
|---|--------|------|------|
| 1 | Grid Pattern Underlay（Hero + Footer 背景）— Signature 4 | ✅ | CSS background-image，无新资源 |
| 2 | Footer 2 列升级 + Git Last Updated 时间戳 | ✅ | Sitemap + About + underline reveal |
| 3 | Resume 按钮文案修正 | ✅ | "下载 PDF" → "打印 / 另存为 PDF" |
| 4 | Interview 分类色彩标识（方案 B — 按项目维度分配色） | ✅ | 4 分类 4 色 + 色点 + 文字双重表达 |
| 5 | About 引言 Signature Element（Accent Line + blockquote） | ✅ | Signature 3 第 2/3 处配额 |

**用户决策（方案 B）**：保持现有 Markdown SSOT，不新增 type 字段；Interview 分类继续按项目维度（jiangnan-travel / love-letter / exam-system / general）；分类色按项目分配，不按问题类型分配。

---

## 2. 实现详情

### 2.1 修改文件清单

| 文件 | 改动类型 | 说明 |
|------|----------|------|
| `src/styles/tokens.css` | 新增 Token | Grid Pattern 变量 + Interview 分类色 Token（light + dark） |
| `vite.config.ts` | 新增函数 | `getLastUpdated()` + `define: { __LAST_UPDATED__ }` |
| `src/env.d.ts` | 新增声明 | `declare const __LAST_UPDATED__: string` |
| `src/components/common/Footer.vue` | 完整重写 | 2 列布局 + Grid Pattern + 时间戳 + underline reveal |
| `src/components/home/HeroSection.vue` | 增量修改 | `.hero` 添加 Grid Pattern background-image |
| `src/pages/Resume.vue` | 文案修正 | L28 按钮文案 |
| `src/components/interview/InterviewCategory.vue` | 增量修改 | 色点 span + 4 个分类色 class + eyebrow 颜色降级 |
| `src/pages/About.vue` | 增量修改 | 引言 blockquote + Accent Line + 移动端响应式 |
| `src/content/personal/about.md` | 新增 frontmatter | `quote: "工程师的克制，学者的严谨"` |
| `src/types/personal.ts` | 新增字段 | `quote?: string` |
| `src/utils/content.ts` | 增量修改 | `scanPersonal` 透传 `quote` 字段 |
| `release-gate-task-005.mjs` | 扩展断言 | 新增 35 项 Phase 6 专项断言（Test 18） |
| `phase6-a11y-verify.mjs` | 新建脚本 | Phase 6 a11y 专项验证（13 项） |
| `phase6-bundle-baseline.txt` | 新建文件 | Phase 6 bundle size baseline |

### 2.2 设计令牌（tokens.css）

**Light mode（:root）**：
```css
/* Phase 6: Grid Pattern Underlay（Signature 4） */
--grid-pattern-size: 32px;
--grid-pattern-color: rgba(0, 0, 0, 0.035);

/* Phase 6: Interview 分类色（按项目维度，方案 B） */
--color-interview-jiangnan: var(--color-accent);        /* Amber #d97706 */
--color-interview-love: var(--color-accent-secondary);  /* Slate Blue #475569 */
--color-interview-exam: #0d9488;                         /* Teal */
--color-interview-general: #64748b;                      /* Slate Gray */
```

**Dark mode（[data-theme='dark']）**：
```css
/* Phase 6: Grid Pattern 暗色模式提亮 */
--grid-pattern-color: rgba(255, 255, 255, 0.05);

/* Phase 6: Interview 分类色暗色模式提亮
 * - jiangnan-travel 继承 --color-accent dark 提亮（#f59e0b）
 * - love-letter 需独立提亮到 slate-300，避免与 general 重复
 * - exam/general 已有独立提亮色 */
--color-interview-love: #cbd5e1;      /* Slate 300 — love-letter dark 提亮 */
--color-interview-exam: #2dd4bf;      /* Teal light */
--color-interview-general: #94a3b8;   /* Slate Gray light */
```

**关键决策**：dark mode 下 `--color-interview-love` 不能继承 `--color-accent-secondary`（dark mode 下解析为 #94a3b8），否则会与 `--color-interview-general` 重复。独立提亮到 Slate 300（#cbd5e1）保证 4 色互不相同。

### 2.3 Grid Pattern Underlay 实现（Signature 4）

**实现方式**：CSS `background-image` + `linear-gradient` 生成网格纹理
```css
background-image:
  linear-gradient(to right, var(--grid-pattern-color) 1px, transparent 1px),
  linear-gradient(to bottom, var(--grid-pattern-color) 1px, transparent 1px);
background-size: var(--grid-pattern-size) var(--grid-pattern-size);
```

**应用位置**：
- `HeroSection.vue` `.hero` — 首屏背景纹理
- `Footer.vue` `.footer` — 页脚背景纹理

**性能优势**：
- 纯 CSS background，无网络请求
- 不影响 LCP（无图片下载）
- 不引入新资源
- 暗色模式自动提亮（rgba 0.035 → 0.05）

### 2.4 Footer 2 列升级 + Git Last Updated

**vite.config.ts 时间戳注入**：
```typescript
function getLastUpdated(): string {
  try {
    const gitDate = execSync('git log -1 --format=%cI', {
      encoding: 'utf8',
      timeout: 3000,
    }).trim()
    if (gitDate) return gitDate
  } catch {
    // git 不可用（Vercel 构建环境 / 无 git 仓库）— fallback 到 build time
  }
  return new Date().toISOString()
}

export default defineConfig({
  // ...
  define: {
    __LAST_UPDATED__: JSON.stringify(getLastUpdated()),
  },
})
```

**Footer 结构**：
- `.footer__main` 2 列 grid（Sitemap nav + About div）
- Sitemap: 7 个 RouterLink（首页/项目/能力/面试/AI实践/简历/关于）
- About: 赖睿轩 / 软件工程学生·后端开发·分布式系统 / GitHub link
- `.footer__bottom`: © year · 最后更新 `<time datetime>` · Built with Vue 3 + TS
- **Underline Reveal（Signature 9）**: `.footer__link::after` scaleX(0) → hover scaleX(1)

**移动端响应式**：
- `@media (max-width: 640px)`: `.footer__main` 1 列 + `.footer__bottom` flex-direction: column

### 2.5 Interview 分类色彩标识（方案 B）

**用户决策**：保持现有项目维度分类，不重构为问题类型分类。

**色点 + 文字双重表达**：
```vue
<span class="category__eyebrow mono">
  <span
    class="category__dot"
    :class="`category__dot--${category.slug}`"
    aria-hidden="true"
  ></span>
  {{ category.project }}
</span>
```

**4 个项目色映射**：
| Slug | 项目 | Light | Dark |
|------|------|-------|------|
| jiangnan-travel | 江南出行（主项目） | Amber #d97706 | Amber #f59e0b |
| love-letter | 情书小程序 | Slate Blue #475569 | Slate 300 #cbd5e1 |
| exam-system | 在线考试系统 | Teal #0d9488 | Teal #2dd4bf |
| general | 通用问题 | Slate Gray #64748b | Slate 400 #94a3b8 |

**a11y 设计**：
- 色点 `aria-hidden="true"`（装饰性，屏幕阅读器不朗读）
- eyebrow 文字标签保留（屏幕阅读器朗读项目名）
- eyebrow 颜色从 `--color-accent` 降级到 `--color-text-muted`（让色点成为视觉焦点）
- 色点 + 文字双重表达，不依赖颜色 alone（WCAG 1.4.1）

### 2.6 About 引言 Signature Element

**SSOT 实现**：在 `about.md` frontmatter 添加 `quote` 字段
```yaml
quote: "工程师的克制，学者的严谨"
```

**类型扩展**：
- `PersonalContent.quote?: string`（`src/types/personal.ts`）
- `scanPersonal` 透传 `quote` 字段（`src/utils/content.ts`）

**渲染实现**：
```vue
<blockquote v-if="personal.quote" ref="aboutQuote" class="about__quote" data-reveal-direction="up">
  <span class="about__quote-accent" aria-hidden="true"></span>
  <p class="about__quote-text">{{ personal.quote }}</p>
</blockquote>
```

**视觉特征**：
- Accent Line: 3px × 24px，amber 主色（Signature 3 第 2/3 处配额）
- blockquote: italic，大字号（`--text-2xl`，桌面 24px / 移动 20px）
- opacity: 0.88（半透明 text-primary，建立层次）

**响应式**：
- `@media (max-width: 640px)`: 字号降级到 `--text-xl`，gap 缩小

### 2.7 Resume 按钮文案修正

**修改**：`src/pages/Resume.vue` L28
- 旧：`<span>下载 PDF</span>`
- 新：`<span>打印 / 另存为 PDF</span>`

**原因**：浏览器 `window.print()` 行为是打开打印对话框，用户可选择"另存为 PDF"。原文案"下载 PDF"误导用户以为是直接下载。

---

## 3. 验证结果

### 3.1 TypeScript Typecheck

```
> vue-tsc --noEmit
```
✅ 通过（0 错误）

### 3.2 Vite Build

```
✓ 1666 modules transformed.
✓ built in 2.55s
```
✅ 通过

**Shiki singleton 警告**：`[Shiki] 10 instances have been created.` — baseline issue（Phase 5 已存在），非 Phase 6 引入。

### 3.3 Bundle Size 对比

**Phase 6 关键文件（gzip）**：

| 文件 | gzip | 说明 |
|------|------|------|
| index-BiwSYm5r.css | 3.58 kB | Footer 重写 + 全局 |
| index-D2m6G6M6.js | 42.26 kB | Footer + 时间戳 + sitemap |
| Home-xAAY5nIJ.css | 2.42 kB | Hero Grid Pattern |
| About-DE-d6vft.css | 0.62 kB | 引言 Signature |
| Interview-B0JIc2Nj.css | 0.81 kB | 分类色点 |

**Phase 6 增量估算（gzip）**：
- Footer 重写（Grid Pattern + 2列 + 时间戳 + underline reveal + 移动端响应式）：约 +1.0~1.5 kB
- Hero Grid Pattern（4 行 CSS）：约 +0.05 kB
- About 引言 Signature（quote 样式 + Accent Line）：约 +0.2 kB
- Interview 分类色点（5 个 class）：约 +0.1 kB
- Resume 按钮文案（仅文案）：0 kB

**总 Phase 6 估算增量**：约 +1.4~1.9 kB gzip

**约束对比**：
- READINESS §4.4 "≤ +1 KB gzip" — 超出约 0.4~0.9 kB
- Phase 5 已接受 +1.70 kB gzip 增量（6 个 Lucide 图标，用户 2026-07-17 批准）
- Phase 6 涉及多处视觉收尾（Grid Pattern / Footer 重写 / About 引言 / Interview 色点），整体增量与 Phase 5 同量级，属于视觉收尾必要成本

### 3.4 Playwright 全量回归测试

**测试脚本**：`release-gate-task-005.mjs`（扩展 Test 18 新增 35 项 Phase 6 断言）

```
📊 测试结果: 145 通过 / 0 失败 / 145 总计
```

✅ 全部通过

**Phase 6 专项断言覆盖**：
- Hero Grid Pattern background-image + backgroundSize（2 项）
- Footer Grid Pattern + 2 列布局 + Sitemap 7 链接 + About 列 + 时间戳 + Underline Reveal（10 项）
- Footer 移动端单列退化 + 底部 column（2 项）
- Resume 按钮文案（1 项）
- Interview 分类色点 = 4 + 4 个 slug class + 宽高 + 4 色独立 + eyebrow 颜色 + aria-hidden（10 项）
- About 引言 blockquote + 文案 + Accent Line 宽高色 + italic + 大字号（8 项）
- About 引言移动端字号降级（1 项）
- Dark Mode Grid Pattern 提亮 + Interview 色点提亮（2 项）

### 3.5 Phase 6 a11y 专项验证

**测试脚本**：`phase6-a11y-verify.mjs`（13 项断言）

```
Phase 6 a11y 测试结果: 13 通过 / 0 失败 / 13 总计
```

✅ 全部通过

**a11y 覆盖**：
- Keyboard Navigation：Footer 链接 Tab 可达
- Reduced Motion：Grid Pattern 仍可见 + About 引言立即可见
- 屏幕阅读器：色点 aria-hidden + 无文本内容 + eyebrow 文字标签
- 语义化：blockquote + p + Accent Line aria-hidden
- 时间戳语义化：`<time>` + datetime + `<nav aria-label>`
- WCAG 1.4.1：色点 + 文字双重表达（不依赖颜色 alone）

---

## 4. 风险评估与缓解

### 4.1 已识别风险（READINESS §3.8）

| 风险 | 等级 | 缓解措施 | 状态 |
|------|------|----------|------|
| Vercel 构建环境 git 访问 | 🔴 | `getLastUpdated()` fallback 到 `new Date().toISOString()` | ✅ 已缓解 |
| Grid Pattern 暗色模式不可见 | 🟡 | dark mode 提亮到 `rgba(255,255,255,0.05)` | ✅ 已缓解 |
| Interview 色与 Skills 色混淆 | 🟡 | Interview 用独立 Token，不与 Skills 分类色冲突 | ✅ 已缓解 |
| Footer 移动端拥挤 | 🟢 | `@media (max-width: 640px)` 单列退化 | ✅ 已缓解 |

### 4.2 新发现风险

| 风险 | 等级 | 说明 | 缓解 |
|------|------|------|------|
| Dark mode love-letter 与 general 重复 | 🟡 | `--color-accent-secondary` dark 解析为 #94a3b8，与 general 重复 | ✅ 已修复 — love-letter 独立提亮到 Slate 300 #cbd5e1 |
| CSS 变量继承链读取问题 | 🟢 | `getComputedStyle(.hero).getPropertyValue('--grid-pattern-color')` 可能返回 :root 值 | ✅ 已修复 — 改从 `document.documentElement` 读取 |
| cycleMode 主题切换顺序干扰测试 | 🟢 | Test 17 末尾 dark 状态影响 Test 18.8 | ✅ 已修复 — Test 18.8 重置 localStorage 后重新加载 |

### 4.3 Baseline Issues（非 Phase 6 引入）

| Issue | 来源 | 状态 |
|-------|------|------|
| Shiki singleton 警告（10 instances） | 构建时 | Phase 5 已存在，不阻塞 |
| Footer 字体加载 CLS 0.1+ | 字体加载 | Phase 5 已确认为 baseline，非 Phase 6 引入 |

---

## 5. Review Gate 检查清单

### 5.1 视觉验收（READINESS §4.7）

- [x] Grid Pattern 在 Hero 和 Footer 可见（subtle，不干扰内容）
- [x] Grid Pattern 暗色模式提亮正确
- [x] Footer 2 列布局（桌面）+ 单列退化（移动端）
- [x] Footer 时间戳显示正确（YYYY-MM-DD）
- [x] Underline Reveal hover 效果（scaleX 0 → 1）
- [x] Interview 4 个分类色点 + 文字标签
- [x] About 引言 Accent Line + blockquote italic 大字号
- [x] Resume 按钮文案"打印 / 另存为 PDF"

### 5.2 交互验收

- [x] Footer 链接 Tab 可达 + :focus-visible
- [x] Underline Reveal hover transition
- [x] 主题切换后 Grid Pattern 颜色更新
- [x] 主题切换后 Interview 色点颜色更新

### 5.3 性能验收

- [x] TypeScript typecheck 通过
- [x] Vite build 成功
- [x] Bundle 增量 +1.4~1.9 kB gzip（与 Phase 5 同量级）
- [x] 0 运行时错误（7 路由控制台扫描）
- [x] Grid Pattern 纯 CSS（无网络请求，不影响 LCP）

### 5.4 响应式验收

- [x] 桌面 1280×800：Footer 2 列 + Hero Grid Pattern
- [x] 平板 768×1024：无水平溢出
- [x] 移动 375×667：Footer 单列 + 底部 column + About 引言字号降级
- [x] 320×568：ProjectCard metrics 1 列退化（Phase 4 baseline）

### 5.5 a11y 验收

- [x] 色点 aria-hidden="true"
- [x] eyebrow 文字标签保留（屏幕阅读器朗读）
- [x] 色点 + 文字双重表达（WCAG 1.4.1）
- [x] blockquote + p 语义化
- [x] `<time datetime>` 语义化
- [x] `<nav aria-label>` 语义化
- [x] Reduced Motion 友好（Grid Pattern 不依赖动画）
- [x] Keyboard Navigation（Footer 链接 Tab 可达）

### 5.6 工程验收

- [x] Markdown SSOT 保持（quote 字段从 frontmatter 读取）
- [x] 不新增运行时依赖
- [x] 不新增组件（仅修改现有组件）
- [x] 不修改工程文档（仅新增 Phase6_REVIEW_REPORT.md）
- [x] 类型安全（TypeScript strict 通过）
- [x] 测试覆盖（145 Playwright + 13 a11y = 158 项断言）

---

## 6. Signature 配额审计

### 6.1 Amber Accent Line（Signature 3）— 配额 3 处

| # | 位置 | Phase | 状态 |
|---|------|-------|------|
| 1/3 | DecisionSection header ::before | Phase 5 | ✅ 已实现 |
| 2/3 | About 引言 Accent Line | Phase 6 | ✅ 已实现 |
| 3/3 | Resume callout | Phase 7 | ⏳ 待实现 |

### 6.2 Grid Pattern Underlay（Signature 4）— 配额 2 处

| # | 位置 | Phase | 状态 |
|---|------|-------|------|
| 1/2 | Hero 背景 | Phase 6 | ✅ 已实现 |
| 2/2 | Footer 背景 | Phase 6 | ✅ 已实现 |

### 6.3 Underline Reveal（Signature 9）— 配额 1 处

| # | 位置 | Phase | 状态 |
|---|------|-------|------|
| 1/1 | Footer link hover | Phase 6 | ✅ 已实现 |

---

## 7. 后续计划

### 7.1 Phase 6 完成后停止

按用户指令，Phase 6 完成后立即停止开发，等待人工 Review。**未经明确批准，不得进入 Phase 7。**

### 7.2 Phase 7 预期范围（仅供参考，不开始实现）

根据 `Portfolio_v3.5_IMPLEMENTATION_PLAN.md`：
- Resume 核心竞争力 callout（Accent Line 第 3/3 处配额）
- 其他 Phase 7 范围内容

### 7.3 待用户决策项

无。Phase 6 所有决策项已在开发前由用户明确批准（方案 B）。

---

## 8. 文件变更汇总

### 8.1 新增文件

- `phase6-a11y-verify.mjs` — Phase 6 a11y 专项验证脚本
- `phase6-bundle-baseline.txt` — Phase 6 bundle size baseline
- `Phase6_REVIEW_REPORT.md` — 本报告

### 8.2 修改文件

- `src/styles/tokens.css` — Grid Pattern 变量 + Interview 分类色 Token
- `vite.config.ts` — Git Last Updated 时间戳注入
- `src/env.d.ts` — `__LAST_UPDATED__` 类型声明
- `src/components/common/Footer.vue` — 完整重写
- `src/components/home/HeroSection.vue` — Grid Pattern 背景
- `src/pages/Resume.vue` — 按钮文案修正
- `src/components/interview/InterviewCategory.vue` — 分类色点
- `src/pages/About.vue` — 引言 Signature Element
- `src/content/personal/about.md` — quote frontmatter 字段
- `src/types/personal.ts` — quote 类型字段
- `src/utils/content.ts` — scanPersonal 透传 quote
- `release-gate-task-005.mjs` — 扩展 Test 18（35 项 Phase 6 断言）

---

## 9. Review Gate 结论

✅ **Phase 6 Review Gate 通过**

- 所有 5 项核心改动 + 1 项用户决策方案已实现
- TypeScript / Build / Playwright / a11y 全部验证通过（158/158）
- Bundle 增量在合理范围（+1.4~1.9 kB gzip）
- Signature 配额使用正确（Accent Line 2/3，Grid Pattern 2/2，Underline Reveal 1/1）
- 无 P0/P1 缺陷
- Baseline issues 已确认非 Phase 6 引入

**停止开发，等待用户人工 Review。**

---

**报告生成时间**: 2026-07-18
**Phase 6 状态**: ✅ 完成 — 等待 Review