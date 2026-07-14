<script setup lang="ts">
import { skills } from 'virtual:skills-content'
import MarkdownContent from '@/components/project/MarkdownContent.vue'
</script>

<template>
  <div v-if="skills" class="page">
    <div class="container container--narrow">
      <header class="skills__header">
        <p class="page__eyebrow mono">技术能力</p>
        <h1 class="page__title">{{ skills.title }}</h1>
        <p class="page__hint mono">// 技术栈 · 学习路线 · 持续学习中</p>
      </header>

      <MarkdownContent :html="skills.html" />
    </div>
  </div>
</template>

<style scoped>
.skills__header {
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-8);
  border-bottom: 1px solid var(--color-border);
}
</style>
