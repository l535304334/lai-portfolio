<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="not-found">
    <div class="container">
      <p class="not-found__code mono">404</p>
      <h1 class="not-found__title">页面未找到</h1>
      <p class="not-found__text">
        你访问的路径不存在，可能是链接已失效或地址输入有误。
      </p>
      <RouterLink to="/" class="not-found__link">← 返回首页</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--nav-height) - var(--space-20));
  padding: var(--space-16) 0;
  text-align: center;
}

.not-found__code {
  font-size: var(--text-5xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: var(--space-6);
}

.not-found__title {
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.not-found__text {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-8);
}

.not-found__link {
  display: inline-block;
  padding: var(--space-3) var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  transition:
    color var(--transition-fast),
    border-color var(--transition-fast);
}

.not-found__link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}
</style>
