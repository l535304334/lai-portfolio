<script setup lang="ts">
import { Github } from 'lucide-vue-next'
import type { ProjectContent } from '@/types/project'

defineProps<{
  project: ProjectContent
}>()
</script>

<template>
  <header class="project-header">
    <div class="project-header__meta">
      <span class="project-header__date mono">{{ project.date }}</span>
      <a
        v-if="project.github"
        :href="project.github"
        target="_blank"
        rel="noopener noreferrer"
        class="project-header__github"
      >
        <Github :size="14" :stroke-width="1.75" aria-hidden="true" />
        <span>GitHub 仓库</span>
      </a>
    </div>

    <h1 class="project-header__title">{{ project.title }}</h1>
    <p v-if="project.subtitle" class="project-header__subtitle">{{ project.subtitle }}</p>

    <ul v-if="project.tags.length" class="project-header__tags">
      <li
        v-for="tag in project.tags"
        :key="tag"
        class="project-header__tag mono"
      >
        {{ tag }}
      </li>
    </ul>
  </header>
</template>

<style scoped>
.project-header {
  margin-bottom: var(--space-10);
}

.project-header__meta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.project-header__date {
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-header__github {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.project-header__github:hover {
  color: var(--color-text-primary);
}

.project-header__title {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: var(--space-3);
}

.project-header__subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  max-width: 36rem;
  margin-bottom: var(--space-5);
}

.project-header__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.project-header__tag {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 2px var(--space-2);
  line-height: 1.5;
}

@media (min-width: 768px) {
  .project-header__title {
    font-size: var(--text-5xl);
  }
}
</style>
