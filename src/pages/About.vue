<script setup lang="ts">
import { personal } from 'virtual:personal-content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import MarkdownContent from '@/components/project/MarkdownContent.vue'

// Phase 1: Scroll Reveal — about header + facts stagger
const { target: aboutHeader } = useScrollReveal()
const { target: aboutFacts } = useScrollReveal()
// Phase 6: 引言 Signature Element 独立 reveal
const { target: aboutQuote } = useScrollReveal()
</script>

<template>
  <div v-if="personal" class="page">
    <div class="container container--narrow">
      <header ref="aboutHeader" class="about__header" data-reveal-direction="up">
        <p class="page__eyebrow mono">// 关于</p>
        <h1 class="page__title">{{ personal.title }}</h1>
        <p v-if="personal.subtitle" class="about__subtitle">{{ personal.subtitle }}</p>

        <dl
          v-if="personal.facts?.length"
          ref="aboutFacts"
          class="about__facts"
          data-stagger-group
        >
          <div
            v-for="(fact, i) in personal.facts"
            :key="fact.label"
            class="about__fact"
            :data-stagger-index="i"
          >
            <dt class="about__fact-label mono">{{ fact.label }}</dt>
            <dd class="about__fact-value">{{ fact.value }}</dd>
          </div>
        </dl>
      </header>

      <!-- Phase 6: 引言 Signature Element（CREATIVE_DIRECTION §7.5 / §6.3 #3 Amber Accent Line 第 2/3 处配额）
           - Accent Line: 3px × 24px，amber 主色，作为引言的视觉锚点
           - blockquote: 大字号 italic，半透明 text-primary，语义化引言内容
           - quote 字段从 SSOT (about.md frontmatter) 读取，不硬编码
           - 当 frontmatter.quote 缺失时自动隐藏，保持向后兼容 -->
      <blockquote
        v-if="personal.quote"
        ref="aboutQuote"
        class="about__quote"
        data-reveal-direction="up"
      >
        <span class="about__quote-accent" aria-hidden="true"></span>
        <p class="about__quote-text">{{ personal.quote }}</p>
      </blockquote>

      <MarkdownContent :html="personal.html" />
    </div>
  </div>
</template>

<style scoped>
.about__header {
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-10);
  border-bottom: 1px solid var(--color-border);
}

/* Subtitle — 一句话定位（替换原 page__hint 硬编码，从 SSOT 读取） */
.about__subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  margin-top: var(--space-2);
  margin-bottom: var(--space-8);
  max-width: 36rem;
}

/* Phase 6: 引言 Signature Element — Accent Line + blockquote
 * 权威来源：CREATIVE_DIRECTION §7.5 / §6.3 #3 Amber Accent Line（第 2/3 处配额）
 * - Accent Line 3px × 24px，amber 主色，引言的视觉锚点
 * - blockquote 大字号 italic，半透明 text-primary
 * - 与 header 和正文之间留出节奏间距，建立视觉层次 */
.about__quote {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--space-5);
  margin: 0 0 var(--space-12);
  padding: var(--space-2) 0;
}

.about__quote-accent {
  display: block;
  width: 3px;
  height: 24px;
  background-color: var(--color-accent);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
  /* 视觉对齐：与第一行引言文本基线对齐 */
  margin-top: 0.375em;
}

.about__quote-text {
  margin: 0;
  font-size: var(--text-2xl);
  font-style: italic;
  font-weight: var(--font-weight-medium);
  line-height: var(--leading-heading);
  letter-spacing: -0.01em;
  color: var(--color-text-primary);
  opacity: 0.88;
}

/* Facts Panel — definition list styled as key-value pairs
   设计参考 ContactSection.contact__methods 模式，但 About 独立实现
   职责：仅展示适合快速扫描的长期稳定事实，不与 Markdown 正文重复 */
.about__facts {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  /* Phase 1: Facts 使用紧凑 stagger（60ms），适合小元素快节奏 */
  --stagger-step: var(--stagger-step-tight);
}

.about__fact {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.about__fact-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.about__fact-value {
  font-size: var(--text-base);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  line-height: var(--leading-normal);
}

/* Phase 6: 移动端引言字号降级（READINESS §4.7 响应式验收） */
@media (max-width: 640px) {
  .about__quote {
    gap: var(--space-4);
    margin-bottom: var(--space-10);
  }

  .about__quote-text {
    font-size: var(--text-xl);
  }
}

@media (min-width: 768px) {
  .about__facts {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
}

/* Phase 6: reduced-motion 友好 — Scroll Reveal 由 motion.css 全局控制 */
</style>
