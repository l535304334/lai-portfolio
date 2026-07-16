<script setup lang="ts">
import type { Metric } from '@/types/content'

defineProps<{
  metric: Metric
}>()
</script>

<template>
  <div class="metric-card">
    <span class="metric-card__value mono">{{ metric.value }}</span>
    <span class="metric-card__label">{{ metric.label }}</span>
  </div>
</template>

<style scoped>
.metric-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    transform var(--transition-fast);
}

.metric-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.metric-card__value {
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.metric-card__label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

@media (max-width: 480px) {
  .metric-card__value {
    font-size: var(--text-3xl);
  }
}
</style>
