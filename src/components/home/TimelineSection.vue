<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import type { TimelineStage } from '@/types/timeline'

defineProps<{
  stages: TimelineStage[]
}>()

// Phase 1: Scroll Reveal — timeline head + stages stagger
const { target: timelineHead } = useScrollReveal()
const { target: timelineList } = useScrollReveal()
</script>

<template>
  <section class="timeline" aria-labelledby="timeline-title">
    <div class="container">
      <header ref="timelineHead" class="timeline__head" data-reveal-direction="up">
        <p class="timeline__eyebrow mono">// 02 · 技术成长</p>
        <h2 id="timeline-title" class="timeline__title">从单文件到分布式系统的演进</h2>
        <p class="timeline__lead">
          三个项目按时间正序排列，每个项目都是一次完整的能力跃迁。
        </p>
      </header>

      <ol ref="timelineList" class="timeline__list" data-stagger-group>
        <li
          v-for="(stage, i) in stages"
          :key="stage.date"
          class="timeline__item"
          :class="{
            'timeline__item--upcoming': stage.upcoming,
            'timeline__item--main': stage.isMainProject,
          }"
          :data-stagger-index="i"
        >
          <div class="timeline__marker">
            <span class="timeline__dot" aria-hidden="true"></span>
          </div>

          <div class="timeline__content">
            <p class="timeline__date mono">{{ stage.date }}</p>
            <h3 class="timeline__stage-title">{{ stage.title }}</h3>
            <p class="timeline__stack mono">{{ stage.stack }}</p>

            <!-- 能力变化：surface + border 突出重点（upcoming 隐藏，批次3-P3） -->
            <div v-if="!stage.upcoming" class="timeline__capability">
              <p class="timeline__capability-label mono">能力变化</p>
              <p class="timeline__capability-text">{{ stage.capability }}</p>
            </div>

            <!-- 学习重点（upcoming 隐藏，批次3-P3） -->
            <div v-if="!stage.upcoming" class="timeline__section">
              <p class="timeline__section-label mono">学习重点</p>
              <p class="timeline__section-text">{{ stage.learned }}</p>
            </div>

            <!-- 下一阶段（upcoming 隐藏，批次3-P3） -->
            <div v-if="!stage.upcoming" class="timeline__section timeline__section--next">
              <p class="timeline__section-label mono">下一阶段</p>
              <p class="timeline__section-text">{{ stage.nextStage }}</p>
            </div>

            <!-- Phase 4: highlights chip 化（READINESS §4.5） -->
            <ul class="timeline__highlights">
              <li
                v-for="point in stage.highlights"
                :key="point"
                class="timeline__chip mono"
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

/* 批次2-P2: editorial 章节短线 — 24px × 2px Amber，水平开章 */
.timeline__title::after {
  content: '';
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--color-accent);
  margin-top: var(--space-4);
  border-radius: var(--radius-sm);
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
  /* Phase 1: Timeline stages 使用松散 stagger（120ms），适合大内容块节奏 */
  --stagger-step: var(--stagger-step-loose);
}

.timeline__item {
  position: relative;
  padding-bottom: var(--space-12);
}

.timeline__item:last-child {
  padding-bottom: 0;
}

/* Dot marker on the vertical line */
.timeline__marker {
  position: absolute;
  left: calc(-1 * var(--space-8) - 4px);
  top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline__dot {
  display: block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-surface);
  /* Phase 4: hover transition（READINESS §4.5: dot 放大 + amber glow） */
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

/* Phase 4: stage hover — dot 放大 + amber glow（仅非 upcoming stage）
   READINESS §4.5 交互验收 */
.timeline__item:not(.timeline__item--upcoming):hover .timeline__dot {
  transform: scale(1.4);
  box-shadow:
    0 0 0 3px var(--color-surface),
    0 0 12px 2px var(--color-accent);
}

/* Upcoming — hollow dot, muted treatment */
.timeline__item--upcoming .timeline__dot {
  background-color: var(--color-surface);
  border: 2px solid var(--color-text-muted);
  width: 9px;
  height: 9px;
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
  color: var(--color-text-secondary);
  margin-bottom: var(--space-5);
  line-height: var(--leading-code);
}

/* 能力变化 — surface + border 突出，建立视觉重点 */
.timeline__capability {
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-bg);
  border-left: 2px solid var(--color-accent);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin-bottom: var(--space-5);
}

.timeline__capability-label {
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.timeline__capability-text {
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  line-height: var(--leading-normal);
}

/* 学习重点 / 下一阶段 — 信息层，muted 标签 + secondary 文字
 * 批次3-P5: "学习重点"label 用 Slate Blue（accent-secondary），
 * 建立"Amber=能力跃迁（结果）/ Slate Blue=学习投入（过程）"双色叙事 */
.timeline__section {
  margin-bottom: var(--space-4);
}

.timeline__section-label {
  font-size: var(--text-xs);
  color: var(--color-accent-secondary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: var(--space-1);
}

.timeline__section-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
}

.timeline__section--next .timeline__section-text {
  color: var(--color-text-muted);
}

/* 批次3-P3: "下一阶段"弱化为连接线 — italic + → 箭头 + 虚线分隔，
 * 建立"过渡信息"视觉权重，与"学习重点"拉开层次 */
.timeline__section--next {
  margin-top: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px dashed var(--color-border);
}

.timeline__section--next .timeline__section-label {
  display: none;
}

.timeline__section--next .timeline__section-text {
  font-style: italic;
  font-size: var(--text-xs);
}

.timeline__section--next .timeline__section-text::before {
  content: '\2192\00A0'; /* → + nbsp */
  color: var(--color-accent);
  font-style: normal;
  font-weight: var(--font-weight-semibold);
}

/* Phase 4: Highlights chip 化（READINESS §4.5: Timeline highlights chip 化）
   从 v3.0.0 纯文本列表改为 chip 形式，呼应 Skills chip 设计语言 */
.timeline__highlights {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  list-style: none;
  padding-left: 0;
}

.timeline__chip {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 2px var(--space-2);
  line-height: 1.5;
  /* Phase 4: chip hover 反馈（READINESS §4.5 交互验收） */
  transition:
    border-color var(--transition-fast),
    color var(--transition-fast);
}

.timeline__chip:hover {
  border-color: var(--color-accent);
  color: var(--color-text-primary);
}

/* 批次3-P3: highlights 第一个 chip Amber 化（仅非 upcoming stage）—
 * 建立"4 个里最该看哪个"的引导，呼应 editorial 层次 */
.timeline__item:not(.timeline__item--upcoming) .timeline__chip:first-child {
  border-color: var(--color-accent);
  color: var(--color-accent);
  font-weight: var(--font-weight-medium);
}

/* Phase 4: 主项目放大 1.2x — 字体 + padding 强化，dot 位置不变
   READINESS §3.6: "仅放大 stage 内容，dot 位置不变"
   READINESS §4.5: "Timeline 主项目阶段放大 1.2x"
   实现策略：用字体放大 + padding 增加（非 transform: scale），避免布局溢出
   批次3-P3: 主项目卡片化 — surface 卡片背景 + border + shadow，
   与其它 stage 的"纯文字 + 左侧线"拉开"主角 vs 配角"层次 */
.timeline__item--main .timeline__content {
  max-width: 48rem; /* 默认 42rem → 加宽 */
  padding: var(--space-6) var(--space-8);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.timeline__item--main .timeline__stage-title {
  font-size: var(--text-2xl); /* 默认 --text-xl → 放大一级 */
}

.timeline__item--main .timeline__stack {
  font-size: var(--text-base); /* 默认 --text-sm → 放大一级 */
}

/* 批次3-P3: 主项目 capability 去背景（融入卡片），保留 border-left accent */
.timeline__item--main .timeline__capability {
  padding: var(--space-5) var(--space-6); /* 默认 --space-4 --space-5 → 放大 */
  background-color: transparent;
}

.timeline__item--main .timeline__capability-text {
  font-size: var(--text-base); /* 默认 --text-sm → 放大一级 */
  font-weight: var(--font-weight-semibold);
}

/* 主项目 dot 默认稍大，建立视觉权重（仍保持 dot 位置不变） */
.timeline__item--main .timeline__dot {
  width: 9px;
  height: 9px;
}

.timeline__item--main:hover .timeline__dot {
  transform: scale(1.4);
}

@media (min-width: 768px) {
  .timeline__title {
    font-size: var(--text-4xl);
  }

  /* Phase 4: 平板/桌面端主项目 stage-title 进一步放大 */
  .timeline__item--main .timeline__stage-title {
    font-size: var(--text-3xl);
  }
}
</style>
