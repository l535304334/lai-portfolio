<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = withDefaults(defineProps<{
  /** 截图标识（对应 frontmatter.cover，匹配 src/assets/screenshots/{cover}.png） */
  cover?: string
  /** 项目标题，用于生成无障碍 alt 文本 */
  title?: string
  /** 显示模式：detail 详情页大图 / thumb 卡片缩略 */
  variant?: 'detail' | 'thumb'
}>(), {
  variant: 'detail',
})

/**
 * 批次4-P1: 按需加载 src/assets/screenshots/ 下 PNG 截图
 * 复用 ArchitectureDiagram 的 glob 模式，仅当 cover prop 存在时触发 import()
 * URL 不进入主 bundle，避免 eager 收集所有截图 URL
 */
const imgLoaders = import.meta.glob('../../assets/screenshots/*.png', {
  query: '?url',
  import: 'default',
}) as Record<string, () => Promise<string>>

/** 当前匹配到的截图 URL（异步加载，初始为 undefined） */
const imgSrc = ref<string | undefined>(undefined)

watchEffect(async () => {
  const cover = props.cover
  if (!cover) {
    imgSrc.value = undefined
    return
  }
  const key = Object.keys(imgLoaders).find((k) => k.endsWith(`/${cover}.png`))
  const loader = key ? imgLoaders[key] : undefined
  if (!loader) {
    imgSrc.value = undefined
    return
  }
  imgSrc.value = await loader()
})
</script>

<template>
  <figure
    v-if="imgSrc"
    :class="['project-cover', `project-cover--${variant}`]"
  >
    <figcaption v-if="variant === 'detail'" class="project-cover__caption mono">界面预览</figcaption>
    <img
      :src="imgSrc"
      :alt="title ? `${title} 项目界面截图` : '项目界面截图'"
      class="project-cover__image"
      loading="lazy"
      decoding="async"
    />
  </figure>
</template>

<style scoped>
/*
 * 批次4-P1: 项目封面截图（方案文档 P1.1）
 * 权威来源：设计改良方案.md §1 P1
 * - detail 模式：ProjectHeader 与 metrics 之间，大图 + caption + shadow
 * - thumb 模式：ProjectCard featured 卡片顶部缩略，无 caption 无 shadow
 * - 统一 aspect-ratio 16/9 + object-fit cover + object-position top，
 *   3 张图比例不同（正方形/竖长/正方形）统一为宽屏，视觉一致
 * - loading="lazy" + decoding="async"，首屏不阻塞 LCP
 */

/* detail 模式 — 详情页封面 */
.project-cover--detail {
  margin-top: var(--space-8);
  margin-bottom: var(--space-10);
}

.project-cover__caption {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.project-cover__image {
  display: block;
  width: 100%;
  height: auto;
  /* 统一 16:9 宽屏比例，3 张图比例不同但视觉一致 */
  aspect-ratio: 16 / 9;
  object-fit: cover;
  /* 保留顶部核心 UI（竖长截图底部通常是列表，顶部是 header/功能入口） */
  object-position: top;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-md);
  transition: filter var(--transition-fast);
}

/* thumb 模式 — featured 卡片缩略 */
.project-cover--thumb {
  margin: 0;
}

.project-cover--thumb .project-cover__image {
  /* 卡片已有 elevation，缩略图不加 shadow，融入卡片 */
  border-radius: var(--radius-md);
  box-shadow: none;
  margin-bottom: var(--space-4);
}

/* 暗色模式：截图微降亮度，避免亮屏刺眼（方案文档 P1.1：filter: brightness(0.9)） */
:global([data-theme='dark']) .project-cover__image {
  filter: brightness(0.9);
}

@media (prefers-reduced-motion: reduce) {
  .project-cover__image {
    transition: none;
  }
}
</style>
