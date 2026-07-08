<script setup lang="ts">
// Task 002 将实现：Hero + 项目卡片 + 时间线 + 联系方式
</script>

<template>
  <div class="page">
    <section class="page__section">
      <div class="container container--narrow">
        <p class="page__eyebrow mono">首页</p>
        <h1 class="page__title">从需求到系统的软件工程实践</h1>
        <p class="page__subtitle">
          三个完整项目，从需求分析到分布式调度的工程实践记录与技术成长。
        </p>
        <p class="page__hint mono">// Task 002 将填充此区域</p>
      </div>
    </section>

    <section id="projects" class="page__section page__section--muted">
      <div class="container container--narrow">
        <p class="page__eyebrow mono">精选项目</p>
        <p class="page__hint mono">// Task 002 将渲染项目卡片</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page__section {
  padding: var(--space-20) 0;
}

.page__section--muted {
  background-color: var(--color-surface);
  border-block: 1px solid var(--color-border);
}

.page__title {
  font-size: var(--text-4xl);
}

.page__subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  max-width: 36rem;
}
</style>
