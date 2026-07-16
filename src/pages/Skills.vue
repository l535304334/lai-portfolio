<script setup lang="ts">
import { skills } from 'virtual:skills-content'
import MarkdownContent from '@/components/project/MarkdownContent.vue'
</script>

<template>
  <div v-if="skills" class="page">
    <div class="container container--narrow">
      <header class="page__header">
        <p class="page__eyebrow mono">技术能力</p>
        <h1 class="page__title">{{ skills.title }}</h1>
        <p v-if="skills.subtitle" class="page__subtitle">{{ skills.subtitle }}</p>
      </header>

      <!-- 技术栈分类卡片（从 frontmatter.categories SSOT 读取，结构化展示） -->
      <section v-if="skills.categories?.length" class="skills__categories" aria-label="技术栈分类">
        <h2 class="skills__section-title">技术栈</h2>
        <div class="skills__grid">
          <div
            v-for="category in skills.categories"
            :key="category.name"
            class="skills__category"
          >
            <h3 class="skills__category-name mono">{{ category.name }}</h3>
            <p class="skills__category-items">{{ category.items }}</p>
          </div>
        </div>
      </section>

      <!-- 叙事内容（学习路线 + 当前学习，从 Markdown body 渲染） -->
      <MarkdownContent :html="skills.html" />
    </div>
  </div>
</template>

<style scoped>
.skills__categories {
  margin-bottom: var(--space-12);
}

.skills__section-title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-6);
}

.skills__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.skills__category {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.skills__category:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-sm);
}

.skills__category-name {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.skills__category-items {
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  line-height: var(--leading-relaxed);
}

@media (min-width: 768px) {
  .skills__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
