<script setup lang="ts">
defineProps<{
  html: string
}>()
</script>

<template>
  <div class="markdown" v-html="html" />
</template>

<style scoped>
/* ===== 容器：防止宽表格/代码块溢出 ===== */
.markdown {
  overflow-x: auto;
  /* Editorial 章节编号：每个 markdown 实例独立计数 */
  counter-reset: md-section;
}

/* ===== 标题 ===== */
.markdown :deep(h2) {
  position: relative;
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-top: var(--space-16);
  margin-bottom: var(--space-5);
  padding-left: var(--space-4);
  letter-spacing: -0.01em;
  /* 左侧 Accent Line 竖线（原 ::before 迁移至此） */
  border-left: 3px solid var(--color-accent);
  border-top-left-radius: var(--radius-sm);
  border-bottom-left-radius: var(--radius-sm);
  counter-increment: md-section;
}

/* Editorial 章节编号：// 01 · 标题文字 */
.markdown :deep(h2::before) {
  content: '// ' counter(md-section, decimal-leading-zero) ' \00B7\00A0';
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-normal);
  color: var(--color-text-muted);
  letter-spacing: 0;
  margin-right: var(--space-1);
}

.markdown :deep(h2:first-child) {
  margin-top: 0;
}

.markdown :deep(h3) {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-top: var(--space-10);
  margin-bottom: var(--space-3);
}

/* ===== 段落 + 文本 ===== */
.markdown :deep(p) {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-5);
}

.markdown :deep(strong) {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

.markdown :deep(em) {
  font-style: italic;
}

.markdown :deep(a) {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color var(--transition-fast);
}

.markdown :deep(a:hover) {
  color: var(--color-accent-strong);
}

/* ===== 列表 ===== */
.markdown :deep(ul),
.markdown :deep(ol) {
  margin: var(--space-4) 0;
  padding-left: var(--space-6);
}

.markdown :deep(li) {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-2);
}

.markdown :deep(li:last-child) {
  margin-bottom: 0;
}

.markdown :deep(ul li) {
  list-style-type: disc;
}

.markdown :deep(ol li) {
  list-style-type: decimal;
}

/* ===== 分割线 ===== */
.markdown :deep(hr) {
  margin: var(--space-8) 0;
  border: none;
  border-top: 1px solid var(--color-border);
}

/* ===== 表格 ===== */
.markdown :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: var(--space-5) 0;
  font-size: var(--text-sm);
}

.markdown :deep(thead th) {
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  padding: var(--space-3);
  border-bottom: 2px solid var(--color-border);
}

.markdown :deep(tbody td) {
  padding: var(--space-3);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.markdown :deep(tbody tr:hover td) {
  background-color: var(--color-bg);
}

.markdown :deep(tbody tr:last-child td) {
  border-bottom: none;
}

/* ===== 引用 ===== */
.markdown :deep(blockquote) {
  margin: var(--space-5) 0;
  padding: var(--space-3) var(--space-5);
  border-left: 3px solid var(--color-accent);
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.markdown :deep(blockquote p) {
  margin-bottom: 0;
}
</style>
