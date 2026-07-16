<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  /** 架构图标识（对应 frontmatter.architecture，匹配 src/assets/projects/{architecture}.svg） */
  architecture?: string
  /** 项目标题，用于生成无障碍 alt 文本 */
  projectTitle?: string
}>()

/**
 * 按需加载 src/assets/projects/ 下 SVG：返回路径 → 动态 import() 加载器 映射。
 * 仅当组件渲染且 architecture prop 存在时，才会触发对应的 import() 获取 URL。
 * URL 字符串不进入主 bundle，避免 eager 收集所有 SVG URL。
 */
const svgModuleLoaders = import.meta.glob('../../assets/projects/*.svg', {
  query: '?url',
  import: 'default',
}) as Record<string, () => Promise<string>>

/** 当前匹配到的 SVG URL（异步加载，初始为 undefined） */
const svgUrl = ref<string | undefined>(undefined)

watchEffect(async () => {
  const arch = props.architecture
  if (!arch) {
    svgUrl.value = undefined
    return
  }
  const key = Object.keys(svgModuleLoaders).find((k) =>
    k.endsWith(`/${arch}.svg`),
  )
  const loader = key ? svgModuleLoaders[key] : undefined
  if (!loader) {
    svgUrl.value = undefined
    return
  }
  svgUrl.value = await loader()
})
</script>

<template>
  <figure v-if="svgUrl" class="architecture-diagram">
    <figcaption class="architecture-diagram__caption mono">架构图</figcaption>
    <img
      :src="svgUrl"
      :alt="projectTitle ? `${projectTitle} 架构图` : '项目架构图'"
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
