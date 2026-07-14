<script setup lang="ts">
import { Printer } from 'lucide-vue-next'
import { resume } from 'virtual:resume-content'
import MarkdownContent from '@/components/project/MarkdownContent.vue'

function downloadPdf() {
  window.print()
}
</script>

<template>
  <div v-if="resume" class="page">
    <div class="container container--narrow">
      <header class="resume__header">
        <p class="page__eyebrow mono">简历</p>
        <h1 class="page__title">{{ resume.title }}</h1>
        <p class="page__hint mono">// 可在线查看 · 可下载 PDF</p>
        <button
          type="button"
          class="resume__download-btn"
          @click="downloadPdf"
        >
          <Printer :size="16" :stroke-width="1.75" aria-hidden="true" />
          <span>下载 PDF</span>
        </button>
      </header>

      <div class="resume__content">
        <MarkdownContent :html="resume.html" />
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

.resume__download-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-6);
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-surface);
  background-color: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);
}

.resume__download-btn:hover {
  background-color: var(--color-accent-strong);
  border-color: var(--color-accent-strong);
}

.resume__download-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.resume__content {
  margin-bottom: var(--space-12);
}

@media (prefers-reduced-motion: reduce) {
  .resume__download-btn {
    transition: none;
  }
}
</style>

<!-- 打印样式：非 scoped，用于控制全局元素（NavBar / Footer / BackToTop） -->
<style>
@media print {
  /* 隐藏导航、页脚、回到顶部按钮、下载按钮和页面提示 */
  .nav,
  .footer,
  .back-to-top,
  .resume__header .page__eyebrow,
  .resume__header .page__hint,
  .resume__download-btn {
    display: none !important;
  }

  /* 简历内容紧凑排版 */
  .resume__content {
    margin: 0 !important;
    padding: 0 !important;
  }

  .resume__content .markdown {
    font-size: 11pt;
    line-height: 1.5;
    color: #000;
  }

  .resume__header .page__title {
    font-size: 18pt;
    margin-bottom: 4pt;
    border-bottom: 1.5pt solid #000;
    padding-bottom: 2pt;
  }

  .resume__content .markdown h2 {
    font-size: 13pt;
    margin-top: 10pt;
    margin-bottom: 4pt;
    border-bottom: 0.5pt solid #666;
    padding-bottom: 1pt;
  }

  .resume__content .markdown h3 {
    font-size: 11pt;
    margin-top: 8pt;
    margin-bottom: 2pt;
  }

  .resume__content .markdown p {
    margin-bottom: 4pt;
  }

  .resume__content .markdown ul,
  .resume__content .markdown ol {
    margin-bottom: 4pt;
    padding-left: 16pt;
  }

  .resume__content .markdown li {
    margin-bottom: 2pt;
  }

  .resume__content .markdown hr {
    border: none;
    border-top: 0.5pt solid #999;
    margin: 6pt 0;
  }

  /* 页面边缘 */
  @page {
    margin: 15mm 15mm;
  }

  /* 避免元素断页 */
  .resume__content .markdown h2,
  .resume__content .markdown h3 {
    break-after: avoid;
  }

  .resume__content .markdown li {
    break-inside: avoid;
  }
}
</style>
