<script setup lang="ts">
import type { DecisionContent } from '@/types/decision'
import MarkdownContent from './MarkdownContent.vue'

defineProps<{
  decision: DecisionContent
}>()
</script>

<template>
  <section class="decision-section">
    <header class="decision-section__header">
      <span class="decision-section__eyebrow mono">TECH DECISIONS</span>
      <h2 class="decision-section__title">技术决策</h2>
      <p class="decision-section__hint">
        不是"我做了什么"，而是"为什么这样做而不那样做"。
      </p>
    </header>
    <MarkdownContent :html="decision.html" />
  </section>
</template>

<style scoped>
.decision-section {
  margin-top: var(--space-16);
  padding-top: var(--space-10);
  border-top: 1px solid var(--color-border);
}

.decision-section__header {
  margin-bottom: var(--space-6);
}

.decision-section__eyebrow {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.decision-section__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-2);
}

.decision-section__hint {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-normal);
}

@media (min-width: 768px) {
  .decision-section__title {
    font-size: var(--text-3xl);
  }
}
</style>
