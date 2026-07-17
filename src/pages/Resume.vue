<script setup lang="ts">
import { Printer } from 'lucide-vue-next'
import { resume } from 'virtual:resume-content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import MarkdownContent from '@/components/project/MarkdownContent.vue'

// Phase 1: Scroll Reveal — resume header
const { target: resumeHeader } = useScrollReveal()
// Phase 7: 核心竞争力 callout 独立 reveal
const { target: resumeCallout } = useScrollReveal()

function downloadPdf() {
  window.print()
}
</script>

<template>
  <div v-if="resume" class="page">
    <div class="container container--narrow">
      <header ref="resumeHeader" class="page__header resume__header" data-reveal-direction="up">
        <p class="page__eyebrow mono">简历</p>
        <h1 class="page__title">{{ resume.title }}</h1>
        <p v-if="resume.subtitle" class="page__subtitle">{{ resume.subtitle }}</p>
        <button
          type="button"
          class="resume__download-btn"
          @click="downloadPdf"
        >
          <Printer :size="16" :stroke-width="1.75" aria-hidden="true" />
          <span>打印 / 另存为 PDF</span>
        </button>
      </header>

      <!-- Phase 7: 核心竞争力 callout（Accent Line Signature 3 第 3/3 配额）
           权威来源：CREATIVE_DIRECTION §7.6 Resume / §6.3 #3 Amber Accent Line
           - Accent Line: 3px × 24px，amber 主色，作为核心竞争力的视觉锚点
           - callout: surface 背景 + border + 圆角，展示核心竞争力关键词
           - callout 字段从 SSOT (resume/index.md frontmatter) 读取，不硬编码
           - 缺失时自动隐藏，保持向后兼容 -->
      <div
        v-if="resume.callout"
        ref="resumeCallout"
        class="resume__callout"
        data-reveal-direction="up"
      >
        <span class="resume__callout-accent" aria-hidden="true"></span>
        <p class="resume__callout-text">{{ resume.callout }}</p>
      </div>

      <div class="resume__content">
        <MarkdownContent :html="resume.html" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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

/* Phase 7: 核心竞争力 callout（Accent Line Signature 3 第 3/3 配额）
 * 权威来源：CREATIVE_DIRECTION §7.6 Resume / §6.3 #3 Amber Accent Line
 * - Accent Line 3px × 24px，amber 主色，作为核心竞争力的视觉锚点
 * - callout 容器使用 surface 背景 + border + 圆角 + subtle shadow，建立层次
 * - 与 header 和正文之间留出节奏间距，建立视觉层次 */
.resume__callout {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-5);
  margin: 0 0 var(--space-10);
  padding: var(--space-5) var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.resume__callout-accent {
  display: block;
  width: 3px;
  height: 24px;
  background-color: var(--color-accent);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.resume__callout-text {
  margin: 0;
  font-size: var(--text-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
  line-height: var(--leading-normal);
}

@media (prefers-reduced-motion: reduce) {
  .resume__download-btn {
    transition: none;
  }
}

/* Phase 7: 移动端 callout 字号降级（与 About 引言响应式一致） */
@media (max-width: 640px) {
  .resume__callout {
    gap: var(--space-4);
    padding: var(--space-4) var(--space-5);
    margin-bottom: var(--space-8);
  }

  .resume__callout-text {
    font-size: var(--text-base);
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
  .resume__header .page__subtitle,
  .resume__download-btn {
    display: none !important;
  }

  /* 简历内容紧凑排版 */
  .resume__content {
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Phase 7: callout 打印样式 — 保持可见但简化视觉（去除 Web 装饰） */
  .resume__callout {
    margin: 6pt 0 8pt !important;
    padding: 4pt 8pt !important;
    background: none !important;
    border: 1px solid #999 !important;
    border-radius: 2pt !important;
    box-shadow: none !important;
    break-inside: avoid;
  }

  .resume__callout-accent {
    background-color: #d97706 !important;
  }

  .resume__callout-text {
    font-size: 11pt !important;
    color: #000 !important;
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
