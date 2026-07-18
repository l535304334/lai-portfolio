<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import ProjectCard from '@/components/home/ProjectCard.vue'
import TimelineSection from '@/components/home/TimelineSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { projectSummaries as projects } from 'virtual:content'
import { timeline as timelineContent } from 'virtual:timeline-content'
import type { ContactInfo } from '@/types/contact'

// Timeline SSOT: 从 virtual:timeline-content 读取（唯一数据源 growth/timeline.md）
const timelineStages = timelineContent?.stages ?? []

const contact: ContactInfo = {
  github: 'https://github.com/l535304334',
  email: '535304334@qq.com',
}

// Phase 1: Scroll Reveal — projects section header + projects grid stagger
const { target: projectsHead } = useScrollReveal()
const { target: projectsGrid } = useScrollReveal()
</script>

<template>
  <div class="home">
    <HeroSection />

    <section id="projects" class="home__projects" aria-labelledby="projects-title">
      <div class="container">
        <header ref="projectsHead" class="home__projects-head" data-reveal-direction="up">
          <p class="home__eyebrow mono">// 01 · 精选项目</p>
          <h2 id="projects-title" class="home__section-title">三个完整项目，三种工程挑战</h2>
        </header>

        <div ref="projectsGrid" class="home__projects-grid" data-stagger-group>
          <ProjectCard
            v-for="(project, i) in projects"
            :key="project.slug"
            :project="project"
            :featured="project.order === 1"
            :data-stagger-index="i"
          />
        </div>
      </div>
    </section>

    <TimelineSection :stages="timelineStages" />

    <ContactSection :contact="contact" />
  </div>
</template>

<style scoped>
.home__projects {
  padding: var(--space-20) 0;
}

.home__projects-head {
  margin-bottom: var(--space-10);
}

.home__eyebrow {
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.home__section-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}

/* 批次2-P2: editorial 章节短线 — 24px × 2px Amber，水平开章
 * 与 DecisionSection 垂直 Accent Line 形成「水平开章 / 垂直强调」双语法 */
.home__section-title::after {
  content: '';
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--color-accent);
  margin-top: var(--space-4);
  border-radius: var(--radius-sm);
}

/* Bento grid — featured card spans 2 rows on desktop */
.home__projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
}

@media (min-width: 768px) {
  .home__projects-grid {
    grid-template-columns: 1.4fr 1fr;
    grid-template-rows: auto auto;
    gap: var(--space-6);
  }

  .home__projects-grid > :first-child {
    grid-row: span 2;
  }

  .home__section-title {
    font-size: var(--text-4xl);
  }
}
</style>
