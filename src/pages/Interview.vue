<script setup lang="ts">
import { interviewCategories } from 'virtual:interview-content'
import InterviewCategory from '@/components/interview/InterviewCategory.vue'

const totalQuestions = interviewCategories.reduce(
  (sum, cat) => sum + cat.questions.length,
  0,
)
</script>

<template>
  <div class="page">
    <div class="container container--narrow">
      <header class="page__header interview__header">
        <p class="page__eyebrow mono">面试准备</p>
        <h1 class="page__title">基于三个真实项目的面试问题</h1>
        <p class="page__subtitle">
          {{ interviewCategories.length }} 个分类 · {{ totalQuestions }} 道问题 · 点击展开查看回答思路
        </p>
      </header>

      <InterviewCategory
        v-for="category in interviewCategories"
        :key="category.slug"
        :category="category"
      />
    </div>
  </div>
</template>
