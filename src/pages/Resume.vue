<script setup lang="ts">
</script>

<template>
  <div class="page">
    <div class="container container--narrow">
      <header class="resume__header">
        <p class="page__eyebrow mono">简历</p>
        <h1 class="page__title">简历下载</h1>
        <p class="page__hint mono">// PDF 格式 · 整理中</p>
      </header>

      <div class="resume__placeholder">
        <p class="resume__placeholder-text">简历 PDF 正在整理中，将在后续补充。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resume__header {
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-8);
  border-bottom: 1px solid var(--color-border);
}

.resume__placeholder {
  padding: var(--space-12) var(--space-8);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-align: center;
}

.resume__placeholder-text {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
}
</style>
