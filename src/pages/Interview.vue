<script setup lang="ts">
import { interviewCategories } from 'virtual:interview-content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import InterviewCategory from '@/components/interview/InterviewCategory.vue'

// Phase 1: Scroll Reveal — interview header + categories stagger
const { target: interviewHeader } = useScrollReveal()
const { target: interviewList } = useScrollReveal()

const totalQuestions = interviewCategories.reduce(
  (sum, cat) => sum + cat.questions.length,
  0,
)
</script>

<template>
  <div class="page">
    <div class="container container--narrow">
      <header ref="interviewHeader" class="page__header interview__header" data-reveal-direction="up">
        <p class="page__eyebrow mono">面试准备</p>
        <h1 class="page__title">基于三个真实项目的面试问题</h1>
        <p class="page__subtitle">
          {{ interviewCategories.length }} 个分类 · {{ totalQuestions }} 道问题 · 点击展开查看回答思路
        </p>
      </header>

      <div ref="interviewList" class="interview__list" data-stagger-group>
        <InterviewCategory
          v-for="(category, i) in interviewCategories"
          :key="category.slug"
          :category="category"
          :data-stagger-index="i"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Phase 1: Interview categories 使用松散 stagger（120ms），适合大内容块节奏 */
.interview__list {
  --stagger-step: var(--stagger-step-loose);
}
</style>
