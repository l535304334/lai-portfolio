<script setup lang="ts">
import { computed, type Component } from 'vue'
import { Server, Layout, Smartphone, Terminal, Sparkle, Workflow } from 'lucide-vue-next'
import { skills } from 'virtual:skills-content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import MarkdownContent from '@/components/project/MarkdownContent.vue'
import type { SkillCategory } from '@/types/skills'

const iconMap: Record<string, Component> = {
  server: Server,
  layout: Layout,
  smartphone: Smartphone,
  terminal: Terminal,
  sparkle: Sparkle,
  workflow: Workflow,
}

function parseChips(items: string): string[] {
  return items.split(' · ').map((s) => s.trim()).filter(Boolean)
}

const largeCategories = computed(
  () => skills?.categories?.filter((c: SkillCategory) => c.priority === 'high') ?? [],
)
const smallCategories = computed(
  () => skills?.categories?.filter((c: SkillCategory) => c.priority === 'medium') ?? [],
)
const wideCategories = computed(
  () => skills?.categories?.filter((c: SkillCategory) => c.priority === 'low') ?? [],
)

const { target: skillsHeader } = useScrollReveal()
const { target: largeGrid } = useScrollReveal()
const { target: smallGrid } = useScrollReveal()
const { target: wideGrid } = useScrollReveal()
</script>

<template>
  <div v-if="skills" class="page">
    <div class="container container--narrow">
      <header ref="skillsHeader" class="page__header" data-reveal-direction="up">
        <p class="page__eyebrow mono">// 技术能力</p>
        <h1 class="page__title">{{ skills.title }}</h1>
        <p v-if="skills.subtitle" class="page__subtitle">{{ skills.subtitle }}</p>
      </header>

      <section v-if="skills.categories?.length" class="skills__categories" aria-label="技术栈分类">
        <h2 class="skills__section-title">技术栈</h2>

        <div ref="largeGrid" class="skills__grid skills__large-grid" data-stagger-group>
          <article
            v-for="(category, i) in largeCategories"
            :key="category.name"
            class="skills__category skills__category--large"
            :class="[`skills__category--${category.colorTier ?? 'amber'}`]"
            :data-stagger-index="i"
          >
            <div class="skills__category-header">
              <component
                v-if="category.icon && iconMap[category.icon]"
                :is="iconMap[category.icon]"
                :size="22"
                :stroke-width="1.75"
                class="skills__category-icon"
                aria-hidden="true"
              />
              <h3 class="skills__category-name mono">{{ category.name }}</h3>
            </div>
            <ul class="skills__chips">
              <li v-for="chip in parseChips(category.items)" :key="chip" class="skills__chip mono">
                {{ chip }}
              </li>
            </ul>
          </article>
        </div>

        <div ref="smallGrid" class="skills__grid skills__small-grid" data-stagger-group>
          <article
            v-for="(category, i) in smallCategories"
            :key="category.name"
            class="skills__category skills__category--medium"
            :class="[`skills__category--${category.colorTier ?? 'amber'}`]"
            :data-stagger-index="i"
          >
            <div class="skills__category-header">
              <component
                v-if="category.icon && iconMap[category.icon]"
                :is="iconMap[category.icon]"
                :size="18"
                :stroke-width="1.75"
                class="skills__category-icon"
                aria-hidden="true"
              />
              <h3 class="skills__category-name mono">{{ category.name }}</h3>
            </div>
            <ul class="skills__chips">
              <li v-for="chip in parseChips(category.items)" :key="chip" class="skills__chip mono">
                {{ chip }}
              </li>
            </ul>
          </article>
        </div>

        <div ref="wideGrid" class="skills__grid skills__wide-grid" data-stagger-group>
          <article
            v-for="(category, i) in wideCategories"
            :key="category.name"
            class="skills__category skills__category--wide"
            :class="[`skills__category--${category.colorTier ?? 'amber'}`]"
            :data-stagger-index="i"
          >
            <div class="skills__category-header">
              <component
                v-if="category.icon && iconMap[category.icon]"
                :is="iconMap[category.icon]"
                :size="20"
                :stroke-width="1.75"
                class="skills__category-icon"
                aria-hidden="true"
              />
              <h3 class="skills__category-name mono">{{ category.name }}</h3>
            </div>
            <ul class="skills__chips">
              <li v-for="chip in parseChips(category.items)" :key="chip" class="skills__chip mono">
                {{ chip }}
              </li>
            </ul>
          </article>
        </div>
      </section>

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
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.skills__large-grid {
  grid-template-columns: 1fr;
}

.skills__small-grid {
  grid-template-columns: repeat(2, 1fr);
}

.skills__wide-grid {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .skills__small-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1024px) {
  .skills__large-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .skills__small-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.skills__category {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
  overflow: hidden;
}

.skills__category::before {
  content: '';
  position: absolute;
  left: 0;
  top: var(--space-5);
  width: 2px;
  height: 24px;
  background-color: var(--color-accent);
  opacity: 0;
  transition: opacity var(--transition-fast);
  border-radius: 0 2px 2px 0;
}

.skills__category:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-sm);
}

.skills__category:hover::before {
  opacity: 1;
}

.skills__category--large {
  padding: var(--space-6);
}

.skills__category--medium {
  padding: var(--space-4);
}

.skills__category--wide {
  padding: var(--space-5);
  flex-direction: row;
  align-items: flex-start;
  gap: var(--space-5);
}

.skills__category--wide .skills__category-header {
  flex-shrink: 0;
  min-width: 9rem;
}

.skills__category-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.skills__category-icon {
  flex-shrink: 0;
}

.skills__category-name {
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
}

.skills__category--large .skills__category-name {
  font-size: var(--text-sm);
}

.skills__category--amber .skills__category-icon {
  color: var(--color-accent);
}

.skills__category--amber::before {
  background-color: var(--color-accent);
}

.skills__category--slate-blue .skills__category-icon {
  color: var(--color-accent-secondary);
}

.skills__category--slate-blue::before {
  background-color: var(--color-accent-secondary);
}

.skills__category--slate-blue:hover {
  border-color: var(--color-accent-secondary);
}

.skills__category--slate .skills__category-icon {
  color: var(--color-text-muted);
}

.skills__category--slate::before {
  background-color: var(--color-text-muted);
}

.skills__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
  padding: 0;
  margin: 0;
}

.skills__chip {
  font-size: var(--text-xs);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  transition:
    border-color var(--transition-fast),
    color var(--transition-fast);
}

.skills__chip:hover {
  border-color: var(--color-accent);
  color: var(--color-text-primary);
}

@media (max-width: 767px) {
  .skills__category--wide {
    flex-direction: column;
    gap: var(--space-3);
  }

  .skills__category--wide .skills__category-header {
    min-width: 0;
  }
}
</style>
