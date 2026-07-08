<script setup lang="ts">
import { ArrowRight, Github } from 'lucide-vue-next'
import { computed } from 'vue'
import type { ProjectSummary } from '@/types/project'

const props = withDefaults(defineProps<{
  project: ProjectSummary
  featured?: boolean
}>(), {
  featured: false,
})

const detailPath = computed(() => `/projects/${props.project.slug}`)
const primaryMetrics = computed(() => props.project.metrics.slice(0, 2))
</script>

<template>
  <article
    class="card"
    :class="{ 'card--featured': featured }"
  >
    <div class="card__head">
      <span v-if="project.order" class="card__order mono">{{ String(project.order).padStart(2, '0') }}</span>
      <a
        v-if="project.github"
        :href="project.github"
        target="_blank"
        rel="noopener noreferrer"
        class="card__github"
        :aria-label="`${project.title} GitHub 仓库`"
      >
        <Github :size="18" :stroke-width="1.75" aria-hidden="true" />
      </a>
    </div>

    <div class="card__body">
      <h3 class="card__title">{{ project.title }}</h3>
      <p class="card__subtitle">{{ project.subtitle }}</p>

      <ul class="card__tags">
        <li
          v-for="tag in project.tags"
          :key="tag"
          class="card__tag mono"
        >
          {{ tag }}
        </li>
      </ul>

      <!-- Featured: full metrics grid -->
      <dl v-if="featured" class="card__metrics card__metrics--grid">
        <div v-for="m in project.metrics" :key="m.label" class="card__metric">
          <dt class="card__metric-value mono">{{ m.value }}</dt>
          <dd class="card__metric-label">{{ m.label }}</dd>
        </div>
      </dl>

      <!-- Normal: condensed inline metrics -->
      <p v-else class="card__metrics card__metrics--inline mono">
        <span v-for="(m, i) in primaryMetrics" :key="m.label">
          <span class="card__metric-value-inline">{{ m.value }}</span> {{ m.label }}
          <span v-if="i < primaryMetrics.length - 1" class="card__metric-sep">·</span>
        </span>
      </p>
    </div>

    <div class="card__foot">
      <RouterLink :to="detailPath" class="card__link">
        查看详情
        <ArrowRight :size="14" :stroke-width="2" aria-hidden="true" />
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast),
    border-color var(--transition-fast);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-accent);
}

.card--featured {
  padding: var(--space-8);
}

.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.card__order {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

.card__github {
  display: inline-flex;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.card__github:hover {
  color: var(--color-text-primary);
}

.card__body {
  flex: 1;
}

.card__title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
  letter-spacing: -0.01em;
}

.card--featured .card__title {
  font-size: var(--text-2xl);
}

.card__subtitle {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-4);
}

.card--featured .card__subtitle {
  font-size: var(--text-base);
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

.card__tag {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 2px var(--space-2);
  line-height: 1.5;
}

/* Metrics — featured grid */
.card__metrics--grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4) var(--space-6);
  padding: var(--space-5) 0;
  border-top: 1px solid var(--color-border);
}

.card__metric-value {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: 1.2;
}

.card__metric-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: 2px;
}

/* Metrics — normal inline */
.card__metrics--inline {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-code);
}

.card__metric-value-inline {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.card__metric-sep {
  color: var(--color-text-muted);
  margin: 0 var(--space-2);
}

.card__foot {
  margin-top: var(--space-5);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}

.card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-accent);
}

.card__link:hover {
  color: var(--color-accent-strong);
}

/* Featured metrics: 4 columns on wider screens */
@media (min-width: 480px) {
  .card--featured .card__metrics--grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .card:hover {
    transform: none;
  }
}
</style>
