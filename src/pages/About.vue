<script setup lang="ts">
import { personal } from 'virtual:personal-content'
import MarkdownContent from '@/components/project/MarkdownContent.vue'
</script>

<template>
  <div v-if="personal" class="page">
    <div class="container container--narrow">
      <header class="about__header">
        <p class="page__eyebrow mono">关于我</p>
        <h1 class="page__title">{{ personal.title }}</h1>
        <p v-if="personal.subtitle" class="about__subtitle">{{ personal.subtitle }}</p>

        <dl v-if="personal.facts?.length" class="about__facts">
          <div v-for="fact in personal.facts" :key="fact.label" class="about__fact">
            <dt class="about__fact-label mono">{{ fact.label }}</dt>
            <dd class="about__fact-value">{{ fact.value }}</dd>
          </div>
        </dl>
      </header>

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

@media (min-width: 768px) {
  .about__facts {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
}
</style>
