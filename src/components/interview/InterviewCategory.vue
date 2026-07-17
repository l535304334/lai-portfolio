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
      <!-- Phase 6: 分类色点 + 文字双重标识（方案 B — 按项目维度分配色）
           权威来源：CREATIVE_DIRECTION §7.7 / 用户决策方案 B
           - 色点：视觉焦点，按 category.slug 映射 4 个项目色
           - 文字：辅助标签，eyebrow 颜色降级到 text-muted 让色点成为视觉重心
           - aria-hidden：色点为装饰性，屏幕阅读器仅朗读文字标签 -->
      <span class="category__eyebrow mono">
        <span
          class="category__dot"
          :class="`category__dot--${category.slug}`"
          aria-hidden="true"
        ></span>
        {{ category.project }}
      </span>
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
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  /* Phase 6: 颜色降级到 text-muted，让色点成为视觉重心（方案 B） */
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

/* Phase 6: 分类色点（方案 B — 按项目维度分配色）
 * - 色点尺寸 8px，圆形，flex-shrink: 0 防止挤压
 * - 4 个项目色映射到对应 token（tokens.css 中已定义 light + dark） */
.category__dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.category__dot--jiangnan-travel {
  background-color: var(--color-interview-jiangnan);
}

.category__dot--love-letter {
  background-color: var(--color-interview-love);
}

.category__dot--exam-system {
  background-color: var(--color-interview-exam);
}

.category__dot--general {
  background-color: var(--color-interview-general);
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
