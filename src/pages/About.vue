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
        <p class="page__hint mono">// 软件工程学生 · 赖睿轩</p>
      </header>

      <MarkdownContent :html="personal.html" />
    </div>
  </div>
</template>

<style scoped>
.about__header {
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-8);
  border-bottom: 1px solid var(--color-border);
}
</style>
