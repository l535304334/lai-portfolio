<script setup lang="ts">
import type { InterviewCategory } from '@/types/interview'
import InterviewQuestion from './InterviewQuestion.vue'

defineProps<{
  category: InterviewCategory
}>()
</script>

<template>
  <section class="category" :aria-label="`${category.project} · ${category.title}`">
    <header class="category__header">
      <span class="category__eyebrow mono">{{ category.project }}</span>
      <h2 class="category__title">{{ category.title }}</h2>
      <span class="category__count mono">{{ category.questions.length }} 题</span>
    </header>
    <div class="category__list">
      <InterviewQuestion
        v-for="qa in category.questions"
        :key="qa.question"
        :qa="qa"
      />
    </div>
  </section>
</template>

<style scoped>
.category {
  margin-bottom: var(--space-12);
}

.category:last-child {
  margin-bottom: 0;
}

.category__header {
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.category__eyebrow {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.category__title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
  line-height: var(--leading-heading);
}

.category__count {
  display: inline-block;
  margin-top: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

@media (min-width: 768px) {
  .category__title {
    font-size: var(--text-2xl);
  }
}

.category__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
</style>
