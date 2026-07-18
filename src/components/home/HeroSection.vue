<script setup lang="ts">
import { ArrowRight, ArrowDown, Github } from 'lucide-vue-next'
import { useScrollReveal } from '@/composables/useScrollReveal'
// Phase 2: Hero 代码片段构建时预渲染 HTML
// 权威来源：《Portfolio_v3.5_IMPLEMENTATION_READINESS.md》§1.3.1
// - 必须构建时预渲染，禁止运行时调用 Shiki（避免 WASM 下载威胁 LCP）
// - 通过 virtual:hero-snippet 虚拟模块导入，content.ts load 钩子内调用 renderCode
import heroSnippetHtml from 'virtual:hero-snippet'

interface HeroStat {
  value: string
  label: string
}

// 批次2-P4: Hero stats 改为「能力维度」而非「项目指标」
// 避免 218/97/236 与 featured 项目卡 metrics 重复，传递「我是什么人」
const stats: HeroStat[] = [
  { value: '3', label: '完整项目' },
  { value: '4', label: '周企业实习' },
  { value: '408', label: '考研方向' },
  { value: '0', label: 'UI 框架依赖' },
]

// Phase 1: 仅 stats grid 应用 Scroll Reveal（stagger group）
// Hero 首屏核心内容（eyebrow / title / subtitle / actions / snippet）不应用，避免影响 LCP
const { target: statsGrid } = useScrollReveal()
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container hero__grid">
      <div class="hero__main">
        <p class="hero__eyebrow mono">// 赖睿轩 · 软件工程学生</p>

        <h1 id="hero-title" class="hero__title">
          <span class="hero__title-domain">客户端 · Serverless · 分布式系统</span>
          <span class="hero__title-accent">三类工程实践</span>
        </h1>

        <p class="hero__subtitle">
          三个完整项目，覆盖客户端存储、AI 工程化、并发控制三类工程问题。<br />
          从需求到测试，独立完成全流程。
        </p>

        <div class="hero__actions">
          <a href="#projects" class="hero__cta hero__cta--primary">
            浏览项目
            <ArrowRight :size="16" :stroke-width="2" aria-hidden="true" />
          </a>
          <a
            href="https://github.com/l535304334"
            target="_blank"
            rel="noopener noreferrer"
            class="hero__cta hero__cta--ghost"
          >
            <Github :size="16" :stroke-width="1.75" aria-hidden="true" />
            GitHub
          </a>
        </div>
      </div>

      <aside class="hero__aside">
        <figure class="hero__snippet">
          <figcaption class="hero__snippet-header mono">// distributed-lock.ts</figcaption>
          <!--
            Phase 2: Shiki 构建时预渲染的 HTML（github-dark 主题）
            内容为江南出行分布式锁 acquireLock 实现，与 jiangnan-travel 项目呼应
            v-html 安全：HTML 由构建时 Shiki 生成，无运行时用户输入
          -->
          <div class="hero__snippet-code" v-html="heroSnippetHtml"></div>
        </figure>

        <div class="hero__stats">
          <p class="hero__stats-label mono">// 工程规模</p>
          <dl ref="statsGrid" class="hero__stats-grid" data-stagger-group>
            <div
              v-for="(stat, i) in stats"
              :key="stat.label"
              class="hero__stat"
              :data-stagger-index="i"
            >
              <dt class="hero__stat-value mono">{{ stat.value }}</dt>
              <dd class="hero__stat-label">{{ stat.label }}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>

    <a href="#projects" class="hero__scroll" aria-label="向下滚动到项目">
      <ArrowDown :size="14" :stroke-width="2" aria-hidden="true" />
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: var(--space-20) 0 var(--space-16);
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Phase 6: Grid Pattern Underlay（Signature 4）— CREATIVE_DIRECTION §6.3 #4 / §7.1
   * CSS background-image 生成网格纹理，subtle 可见，不影响 LCP（无网络请求） */
  background-image:
    linear-gradient(to right, var(--grid-pattern-color) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-pattern-color) 1px, transparent 1px);
  background-size: var(--grid-pattern-size) var(--grid-pattern-size);
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  align-items: center;
  flex: 1;
}

.hero__eyebrow {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
  margin-bottom: var(--space-5);
}

.hero__title {
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.02em;
  line-height: var(--leading-heading);
  margin-bottom: var(--space-6);
}

/* 批次2-P2: Editorial 排版强化 —「领域声明 → 主张」节奏
 * domain（第一行）：较小字号 + secondary 色，作为"领域声明"
 * accent（第二行）：大字号 + Amber，作为"视觉锤" */
.hero__title-domain {
  display: block;
  font-size: var(--text-xl);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  letter-spacing: 0;
  margin-bottom: var(--space-2);
}

.hero__title-accent {
  display: block;
  font-size: var(--text-5xl);
  color: var(--color-accent);
  letter-spacing: -0.02em;
}

.hero__subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  max-width: 32rem;
  margin-bottom: var(--space-8);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition:
    transform var(--transition-fast),
    background-color var(--transition-fast),
    color var(--transition-fast),
    border-color var(--transition-fast);
}

.hero__cta--primary {
  background-color: var(--color-accent);
  color: var(--color-on-accent);
}

.hero__cta--primary:hover {
  background-color: var(--color-accent-strong);
  color: var(--color-on-accent);
  transform: translateY(-1px);
}

.hero__cta--ghost {
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  background-color: var(--color-surface);
}

.hero__cta--ghost:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/*
 * Phase 2: 右侧 aside 容器 — 包含 Code Snippet Card（上）+ Stats Panel（下）
 * 权威来源：《Portfolio_v3.5_IMPLEMENTATION_READINESS.md》§1.3.2 方案 W
 * 移动端默认单列，aside 内 snippet + stats 上下叠
 */
.hero__aside {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/*
 * Phase 2: Code Snippet Card — 极简设计
 * 权威来源：Phase2_PRE_FLIGHT_REPORT.md §9.2 决策 2
 * - 仅文件名 header + Shiki 高亮代码，无 macOS 彩点或其他装饰
 * - 视觉层次：surface 卡片 + shadow-md 建立深度，code 区为内嵌深色屏幕
 */
.hero__snippet {
  margin: 0;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.hero__snippet-header {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  letter-spacing: 0.04em;
}

.hero__snippet-code {
  overflow-x: auto;
}

/*
 * 覆盖 code-theme.css 的 .shiki 样式（仅 Hero 内）
 * - margin: 0（去除全局上下间距，由 figure 控制布局）
 * - 移动端字号 --text-xs（12px），桌面端升级到 --text-sm
 * - 保留 Shiki 的 --code-bg 深色背景（code-theme.css 的 !important 生效）
 */
.hero__snippet-code :deep(.shiki) {
  margin: 0;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-xs);
  border-radius: 0;
}

/* Stats panel — code-style aside with stronger elevation */
.hero__stats {
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.hero__stats-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.hero__stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4) var(--space-6);
  /* Phase 1: Stats 使用紧凑 stagger（60ms），适合小元素快节奏 */
  --stagger-step: var(--stagger-step-tight);
}

.hero__stat-value {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: 1.2;
}

.hero__stat-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: var(--space-1);
}

/* Scroll hint */
.hero__scroll {
  position: absolute;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: var(--color-text-muted);
  transition:
    color var(--transition-fast),
    transform var(--transition-fast);
  animation: heroScrollBob 2s ease-in-out infinite;
}

.hero__scroll:hover {
  color: var(--color-accent);
}

@keyframes heroScrollBob {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(4px); }
}

/*
 * Tablet (768–1023px): 保留 6fr/4fr 双列布局 + 代码片段（批次2-P4 优化）
 * 原 v3.5 决策：平板隐藏 snippet（Pre-Flight 决策 1）
 * 批次2-P4 改良：平板保留 snippet 降级呈现（字号 --text-xs + 横向滚动）
 * - 平板占访客 10-15%，隐藏 snippet 丢失「代码即证据」核心
 * - 6fr/4fr 给 snippet 更多空间（原 7fr/5fr 偏紧）
 */
@media (min-width: 768px) {
  .hero__grid {
    grid-template-columns: 6fr 4fr;
    gap: var(--space-16);
  }

  /* 平板 accent 升级到 display(56px) */
  .hero__title-accent {
    font-size: var(--text-display);
  }

  .hero__stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  /* 批次2-P4: 平板保留 snippet（移除原 display: none），降级呈现 */
  .hero__snippet {
    display: block;
  }
}

/*
 * Desktop (≥1024px): 6fr/4fr，右侧 aside 包含 snippet + stats 上下叠
 * 权威来源：《Portfolio_v3.5_IMPLEMENTATION_READINESS.md》§1.3.2 方案 W
 * - 桌面端代码字号升级到 --text-sm（14px）
 */
@media (min-width: 1024px) {
  /* 桌面端代码字号升级到 --text-sm（14px，与全局代码块一致） */
  .hero__snippet-code :deep(.shiki) {
    font-size: var(--text-sm);
  }
}

/*
 * Wide Desktop (≥1280px): Hero title accent 升级到 72px（批次2-P2）
 * 建立 editorial「巨大标题 vs 紧凑正文」对比
 * 仅在宽屏启用，避免 1024-1279px 区间 72px 过大
 */
@media (min-width: 1280px) {
  .hero__title-accent {
    font-size: var(--text-hero);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__scroll {
    animation: none;
  }

  .hero__cta--primary:hover {
    transform: none;
  }
}
</style>
