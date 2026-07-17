<script setup lang="ts">
/**
 * DecisionSection — 技术决策展示
 *
 * Phase 5 扩展：方案对比卡片（结构化 decisions 字段）
 * - decision.decisions?.length 存在 → 渲染方案对比卡片（每个 DecisionItem 一个 article）
 * - 否则 → fallback 到 MarkdownContent（从 decisions/*.md 渲染，向后兼容）
 *
 * 权威来源：
 * - 《Portfolio_v3.5_CREATIVE_DIRECTION.md》§4.2 Rhythm 4: Statement（fade-in 600ms + Accent Line）
 * - 《Portfolio_v3.5_CREATIVE_DIRECTION.md》§6.3 Signature 3: Amber Accent Line（DecisionSection header）
 * - 《Portfolio_v3.5_CREATIVE_DIRECTION.md》§8.1 DecisionSection 渐进迁移 + fallback
 * - 《Portfolio_v3.5_IMPLEMENTATION_READINESS.md》§3.7 Phase 5 风险（不新建组件 / 渐进迁移 / 响应式 / Accent Line 配额）
 * - 《Portfolio_v3.5_IMPLEMENTATION_READINESS.md》§4.6 Phase 5 Review Gate
 *
 * 设计约束：
 * - 不新增组件（在本文件内用 v-if 分支）
 * - Accent Line 严格限定：仅 section header ::before（Signature 3 配额 1 处）
 * - chosen option 用 border-color + badge，不复用 Accent Line
 * - 响应式：桌面 2 列 grid，≤640px 1 列堆叠
 * - 语义化：使用 <dl>/<dt>/<dd> 描述方案名称与详情
 */
import { useScrollReveal } from '@/composables/useScrollReveal'
import type { DecisionContent } from '@/types/decision'
import MarkdownContent from './MarkdownContent.vue'

defineProps<{
  decision: DecisionContent
}>()

// Phase 1: Scroll Reveal — decision section header
const { target: decisionHeader } = useScrollReveal()
// Phase 5: stagger group for decision items cascade entry
const { target: decisionItems } = useScrollReveal()
</script>

<template>
  <section class="decision-section">
    <header ref="decisionHeader" class="decision-section__header" data-reveal-direction="up">
      <span class="decision-section__eyebrow mono">// 关键决策</span>
      <h2 class="decision-section__title">技术决策</h2>
      <p class="decision-section__hint">
        不是"我做了什么"，而是"为什么这样做而不那样做"。
      </p>
    </header>

    <!-- Phase 5: 结构化方案对比卡片（优先） -->
    <div
      v-if="decision.decisions?.length"
      ref="decisionItems"
      class="decision-section__items"
      data-stagger-group
    >
      <article
        v-for="(item, i) in decision.decisions"
        :key="item.title"
        class="decision-item"
        :data-stagger-index="i"
      >
        <h3 class="decision-item__title">{{ item.title }}</h3>
        <p v-if="item.context" class="decision-item__context">{{ item.context }}</p>

        <dl class="decision-item__options">
          <div
            v-for="opt in item.options"
            :key="opt.name"
            class="decision-option"
            :class="{ 'decision-option--chosen': opt.chosen }"
          >
            <dt class="decision-option__name">
              <span>{{ opt.name }}</span>
              <span v-if="opt.chosen" class="decision-option__badge mono">已选</span>
            </dt>
            <dd class="decision-option__body">
              <p class="decision-option__description">{{ opt.description }}</p>

              <ul v-if="opt.pros?.length" class="decision-option__list decision-option__list--pros">
                <li v-for="(p, pi) in opt.pros" :key="pi">{{ p }}</li>
              </ul>
              <ul v-if="opt.cons?.length" class="decision-option__list decision-option__list--cons">
                <li v-for="(c, ci) in opt.cons" :key="ci">{{ c }}</li>
              </ul>
            </dd>
          </div>
        </dl>

        <p v-if="item.reasoning" class="decision-item__reasoning">
          <span class="decision-item__reasoning-label mono">// 理由</span>
          <span class="decision-item__reasoning-text">{{ item.reasoning }}</span>
        </p>
      </article>
    </div>

    <!-- Phase 5: fallback 到 Markdown 渲染（无 decisions 字段时） -->
    <MarkdownContent v-else :html="decision.html" />
  </section>
</template>

<style scoped>
.decision-section {
  margin-top: var(--space-20);
  padding-top: var(--space-12);
  border-top: 2px solid var(--color-border);
}

/* --- Section Header --- */
.decision-section__header {
  position: relative;
  margin-bottom: var(--space-10);
  /* Phase 5: Signature 3 — Accent Line（3px × 24px，左上紧贴 eyebrow 上方） */
  padding-left: var(--space-4);
}

.decision-section__header::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.25rem; /* 与 eyebrow 首行视觉对齐 */
  width: 3px;
  height: 24px;
  background: var(--color-accent);
  /* Signature 3 配额：仅此一处使用 Accent Line，chosen option 不复用 */
}

.decision-section__eyebrow {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.decision-section__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-3);
}

.decision-section__hint {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-normal);
}

/* --- Decision Items (Stagger Group) --- */
.decision-section__items {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

.decision-item__title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
  margin-bottom: var(--space-2);
}

.decision-item__context {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-4);
}

/* --- Options Grid --- */
.decision-item__options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
  margin: 0; /* dl 默认 margin 修正 */
}

.decision-option {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: var(--space-4) var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  transition: border-color 150ms ease-in-out, box-shadow 150ms ease-in-out;
}

.decision-option--chosen {
  /* chosen 方案：accent border + subtle shadow，不复用 Accent Line（Signature 3 配额） */
  border-color: var(--color-accent);
  box-shadow: var(--shadow-sm);
}

.decision-option__name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.decision-option__badge {
  font-size: var(--text-xs);
  color: var(--color-accent);
  background: var(--color-accent-light);
  padding: 2px var(--space-2);
  border-radius: 3px;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.decision-option__body {
  margin: 0; /* dd 默认 margin 修正 */
}

.decision-option__description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-3);
}

.decision-option__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.decision-option__list li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  padding-left: var(--space-4);
  position: relative;
}

.decision-option__list--pros li::before {
  content: '+';
  position: absolute;
  left: 0;
  color: var(--color-success);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-mono, ui-monospace, monospace);
}

.decision-option__list--cons li::before {
  content: '\2212'; /* minus sign − */
  position: absolute;
  left: 0;
  color: var(--color-text-muted);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-mono, ui-monospace, monospace);
}

.decision-option__list + .decision-option__list {
  margin-top: var(--space-2);
}

/* --- Reasoning --- */
.decision-item__reasoning {
  margin-top: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg);
  border-left: 2px solid var(--color-border);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.decision-item__reasoning-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}

.decision-item__reasoning-text {
  color: var(--color-text-secondary);
}

/* --- Fallback Markdown adjustments (与原 v3.0.0 保持一致) --- */
.decision-section :deep(.markdown h2) {
  position: static;
  padding-left: 0;
  font-size: var(--text-xl);
  margin-top: var(--space-10);
  margin-bottom: var(--space-4);
}

.decision-section :deep(.markdown h2::before) {
  content: none;
}

.decision-section :deep(.markdown h2:first-child) {
  margin-top: 0;
}

/* --- Responsive --- */
@media (min-width: 768px) {
  .decision-section__title {
    font-size: var(--text-3xl);
  }
}

@media (max-width: 640px) {
  /* 移动端：方案对比退化为单列堆叠 */
  .decision-item__options {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>