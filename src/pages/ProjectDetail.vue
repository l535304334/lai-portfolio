<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { projectDetails } from 'virtual:project-detail'
import { useScrollReveal } from '@/composables/useScrollReveal'
import ProjectHeader from '@/components/project/ProjectHeader.vue'
import MetricCard from '@/components/project/MetricCard.vue'
import MarkdownContent from '@/components/project/MarkdownContent.vue'
import ArchitectureDiagram from '@/components/project/ArchitectureDiagram.vue'
import DecisionSection from '@/components/project/DecisionSection.vue'
import ProjectNav from '@/components/project/ProjectNav.vue'

const route = useRoute()
const router = useRouter()

const slug = computed(() => String(route.params.slug))

const currentIndex = computed(() =>
  projectDetails.findIndex((p) => p.slug === slug.value),
)

const project = computed(() =>
  currentIndex.value >= 0 ? projectDetails[currentIndex.value] ?? null : null,
)

const prev = computed(() => {
  if (currentIndex.value <= 0) return undefined
  const p = projectDetails[currentIndex.value - 1]
  return p ? { slug: p.slug, title: p.title } : undefined
})

const next = computed(() => {
  if (currentIndex.value < 0 || currentIndex.value >= projectDetails.length - 1) return undefined
  const p = projectDetails[currentIndex.value + 1]
  return p ? { slug: p.slug, title: p.title } : undefined
})

// Phase 1: Scroll Reveal — project metrics stagger + content reveal
const { target: projectMetrics } = useScrollReveal()
const { target: projectContent } = useScrollReveal()

onMounted(() => {
  if (!project.value) {
    router.replace({ name: 'not-found' })
  }
})
</script>

<template>
  <div v-if="project" class="page">
    <div class="container container--narrow">
      <ProjectHeader :project="project" />

      <section
        v-if="project.metrics.length"
        ref="projectMetrics"
        class="project__metrics"
        data-stagger-group
      >
        <MetricCard
          v-for="(metric, i) in project.metrics"
          :key="metric.label"
          :metric="metric"
          :data-stagger-index="i"
        />
      </section>

      <div ref="projectContent" data-reveal-direction="up">
        <MarkdownContent :html="project.html" />
      </div>

      <ArchitectureDiagram
        :architecture="project.architecture"
        :project-title="project.title"
      />

      <DecisionSection v-if="project.decision" :decision="project.decision" />

      <ProjectNav :prev="prev" :next="next" />
    </div>
  </div>
</template>

<style scoped>
.project__metrics {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
  margin-bottom: var(--space-10);
  /* Phase 1: Metrics 使用紧凑 stagger（60ms），适合小卡片快节奏 */
  --stagger-step: var(--stagger-step-tight);
}

@media (min-width: 480px) {
  .project__metrics {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .project__metrics {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
