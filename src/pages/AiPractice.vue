<script setup lang="ts">
import { aiPractice } from 'virtual:ai-practice-content'
import MarkdownContent from '@/components/project/MarkdownContent.vue'
</script>

<template>
  <div v-if="aiPractice" class="page">
    <div class="container container--narrow">
      <header class="ai-practice__header">
        <p class="page__eyebrow mono">AI 实践</p>
        <h1 class="page__title">{{ aiPractice.title }}</h1>
        <p class="page__hint mono">// 不是"AI 帮我写代码"，是"我用 AI 加速了哪些环节，我独立完成了哪些决策"</p>
      </header>

      <MarkdownContent :html="aiPractice.html" />
    </div>
  </div>
</template>

<style scoped>
.ai-practice__header {
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-8);
  border-bottom: 1px solid var(--color-border);
}
</style>
