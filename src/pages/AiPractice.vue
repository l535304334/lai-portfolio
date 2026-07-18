<script setup lang="ts">
import { aiPractice } from 'virtual:ai-practice-content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import MarkdownContent from '@/components/project/MarkdownContent.vue'

// Phase 1: Scroll Reveal — ai practice header
const { target: aiPracticeHeader } = useScrollReveal()
</script>

<template>
  <div v-if="aiPractice" class="page">
    <div class="container container--narrow">
      <header ref="aiPracticeHeader" class="page__header ai-practice__header" data-reveal-direction="up">
        <p class="page__eyebrow mono">// AI 实践</p>
        <h1 class="page__title">{{ aiPractice.title }}</h1>
        <p v-if="aiPractice.subtitle" class="page__subtitle">{{ aiPractice.subtitle }}</p>
      </header>

      <MarkdownContent :html="aiPractice.html" />
    </div>
  </div>
</template>
