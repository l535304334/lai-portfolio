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
  gap: var(--space-1);
  padding: var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.metric-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-sm);
}

.metric-card__value {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.metric-card__label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
