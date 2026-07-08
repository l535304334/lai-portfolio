<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { projectDetails } from 'virtual:project-detail'
import ProjectHeader from '@/components/project/ProjectHeader.vue'
import MetricCard from '@/components/project/MetricCard.vue'
import MarkdownContent from '@/components/project/MarkdownContent.vue'
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

      <section v-if="project.metrics.length" class="project__metrics">
        <MetricCard
          v-for="metric in project.metrics"
          :key="metric.label"
          :metric="metric"
        />
      </section>

      <MarkdownContent :html="project.html" />

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
