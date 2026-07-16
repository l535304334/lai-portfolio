<script setup lang="ts">
import { aiPractice } from 'virtual:ai-practice-content'
import MarkdownContent from '@/components/project/MarkdownContent.vue'
</script>

<template>
  <div v-if="aiPractice" class="page">
    <div class="container container--narrow">
      <header class="page__header ai-practice__header">
        <p class="page__eyebrow mono">AI 实践</p>
        <h1 class="page__title">{{ aiPractice.title }}</h1>
        <p v-if="aiPractice.subtitle" class="page__subtitle">{{ aiPractice.subtitle }}</p>
      </header>

      <MarkdownContent :html="aiPractice.html" />
    </div>
  </div>
</template>
