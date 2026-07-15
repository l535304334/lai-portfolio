<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** 架构图标识（对应 frontmatter.architecture，匹配 src/assets/projects/{architecture}.svg） */
  architecture?: string
}>()

/** 预加载 src/assets/projects/ 下所有 SVG，返回路径 → URL 映射 */
const svgModules = import.meta.glob('../../assets/projects/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/** 根据 architecture 字段查找对应的 SVG URL */
const svgUrl = computed(() => {
  if (!props.architecture) return undefined
  const key = Object.keys(svgModules).find((k) =>
    k.endsWith(`/${props.architecture}.svg`),
  )
  return key ? svgModules[key] : undefined
})
</script>

<template>
  <figure v-if="svgUrl" class="architecture-diagram">
    <figcaption class="architecture-diagram__caption mono">架构图</figcaption>
    <img
      :src="svgUrl"
      alt="项目架构图"
      class="architecture-diagram__image"
      loading="lazy"
    />
  </figure>
</template>

<style scoped>
.architecture-diagram {
  margin-top: var(--space-10);
  margin-bottom: var(--space-10);
}

.architecture-diagram__caption {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.architecture-diagram__image {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface);
}
</style>
