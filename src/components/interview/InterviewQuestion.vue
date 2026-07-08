<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import type { InterviewQAPair } from '@/types/interview'
import MarkdownContent from '@/components/project/MarkdownContent.vue'

defineProps<{
  qa: InterviewQAPair
}>()
</script>

<template>
  <details class="qa">
    <summary class="qa__summary">
      <ChevronRight class="qa__chevron" :size="18" :stroke-width="2" />
      <span class="qa__question">{{ qa.question }}</span>
    </summary>
    <div class="qa__body">
      <MarkdownContent :html="qa.html" />
    </div>
  </details>
</template>

<style scoped>
.qa {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  overflow: hidden;
  transition: border-color var(--transition-fast);
}

.qa:hover {
  border-color: var(--color-accent);
}

.qa[open] {
  border-color: var(--color-accent);
}

.qa__summary {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  cursor: pointer;
  list-style: none;
  user-select: none;
}

.qa__summary::-webkit-details-marker {
  display: none;
}

.qa__chevron {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-accent);
  transition: transform var(--transition-fast);
}

.qa[open] .qa__chevron {
  transform: rotate(90deg);
}

.qa__question {
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  line-height: var(--leading-normal);
}

.qa__body {
  padding: 0 var(--space-5) var(--space-5);
  border-top: 1px solid var(--color-border);
  margin-top: 0;
}

.qa__body :deep(.markdown) {
  padding-top: var(--space-4);
}

.qa__body :deep(.markdown p:first-child) {
  margin-top: 0;
}

.qa__body :deep(.markdown h2:first-child) {
  margin-top: 0;
}
</style>
