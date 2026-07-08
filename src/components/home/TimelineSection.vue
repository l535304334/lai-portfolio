<script setup lang="ts">
import type { TimelineStage } from '@/types/timeline'

defineProps<{
  stages: TimelineStage[]
}>()
</script>

<template>
  <section class="timeline">
    <div class="container">
      <header class="timeline__head">
        <p class="timeline__eyebrow mono">// 技术成长</p>
        <h2 class="timeline__title">从单文件到分布式系统的演进</h2>
        <p class="timeline__lead">
          三个项目按时间正序排列，每个项目都是一次完整的能力跃迁。
        </p>
      </header>

      <ol class="timeline__list">
        <li
          v-for="stage in stages"
          :key="stage.date"
          class="timeline__item"
          :class="{ 'timeline__item--upcoming': stage.upcoming }"
        >
          <div class="timeline__marker">
            <span class="timeline__dot" aria-hidden="true"></span>
          </div>

          <div class="timeline__content">
            <p class="timeline__date mono">{{ stage.date }}</p>
            <h3 class="timeline__stage-title">{{ stage.title }}</h3>
            <p class="timeline__stack mono">{{ stage.stack }}</p>
            <ul class="timeline__highlights">
              <li
                v-for="point in stage.highlights"
                :key="point"
                class="timeline__highlight"
              >
                {{ point }}
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  padding: var(--space-20) 0;
  background-color: var(--color-surface);
  border-block: 1px solid var(--color-border);
}

.timeline__head {
  max-width: 36rem;
  margin-bottom: var(--space-12);
}

.timeline__eyebrow {
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.timeline__title {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
  margin-bottom: var(--space-3);
}

.timeline__lead {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
}

/* Timeline list — vertical line via border-left */
.timeline__list {
  position: relative;
  border-left: 1px solid var(--color-border);
  margin-left: var(--space-2);
  padding-left: var(--space-8);
}

.timeline__item {
  position: relative;
  padding-bottom: var(--space-12);
}

.timeline__item:last-child {
  padding-bottom: 0;
}

/* Dot marker — positioned on the vertical line */
.timeline__marker {
  position: absolute;
  left: calc(-1 * var(--space-8) - 5px);
  top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline__dot {
  display: block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-surface);
}

/* Upcoming — hollow dot, muted treatment */
.timeline__item--upcoming .timeline__dot {
  background-color: var(--color-surface);
  border: 2px solid var(--color-text-muted);
  width: 11px;
  height: 11px;
}

.timeline__content {
  max-width: 42rem;
}

.timeline__date {
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.timeline__item--upcoming .timeline__date {
  color: var(--color-text-muted);
}

.timeline__stage-title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.timeline__item--upcoming .timeline__stage-title {
  color: var(--color-text-secondary);
}

.timeline__stack {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
  line-height: var(--leading-code);
}

.timeline__highlights {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.timeline__highlight {
  position: relative;
  padding-left: var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
}

.timeline__highlight::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 4px;
  height: 1px;
  background-color: var(--color-text-muted);
}

@media (min-width: 768px) {
  .timeline__title {
    font-size: var(--text-4xl);
  }
}
</style>
