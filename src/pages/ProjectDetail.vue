<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug
// Task 003 将接入构建时 Markdown 内容并渲染项目详情
</script>

<template>
  <div class="page">
    <div class="container container--narrow">
      <p class="page__eyebrow mono">项目详情</p>
      <h1 class="page__title">{{ slug }}</h1>
      <p class="page__hint mono">// Task 003 将渲染此项目的内容</p>
    </div>
  </div>
</template>

<style scoped>
.page__title {
  font-family: var(--font-mono);
}
</style>
