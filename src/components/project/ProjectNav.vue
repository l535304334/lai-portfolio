<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'

interface NavItem {
  slug: string
  title: string
}

defineProps<{
  prev?: NavItem
  next?: NavItem
}>()
</script>

<template>
  <nav class="project-nav">
    <RouterLink
      v-if="prev"
      :to="`/projects/${prev.slug}`"
      class="project-nav__item project-nav__item--prev"
    >
      <ArrowLeft :size="16" :stroke-width="2" aria-hidden="true" />
      <span class="project-nav__text">
        <span class="project-nav__label mono">上一个</span>
        <span class="project-nav__title">{{ prev.title }}</span>
      </span>
    </RouterLink>
    <span v-else class="project-nav__placeholder" />

    <RouterLink
      v-if="next"
      :to="`/projects/${next.slug}`"
      class="project-nav__item project-nav__item--next"
    >
      <span class="project-nav__text">
        <span class="project-nav__label mono">下一个</span>
        <span class="project-nav__title">{{ next.title }}</span>
      </span>
      <ArrowRight :size="16" :stroke-width="2" aria-hidden="true" />
    </RouterLink>
    <span v-else class="project-nav__placeholder" />
  </nav>
</template>

<style scoped>
.project-nav {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: var(--space-20);
  padding-top: var(--space-10);
  border-top: 2px solid var(--color-border);
}

.project-nav__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
  flex: 1;
  max-width: 50%;
}

.project-nav__item:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-sm);
}

.project-nav__item--next {
  text-align: right;
  justify-content: flex-end;
}

.project-nav__placeholder {
  flex: 1;
  max-width: 50%;
}

.project-nav__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.project-nav__label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.project-nav__title {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  line-height: var(--leading-normal);
}
</style>
