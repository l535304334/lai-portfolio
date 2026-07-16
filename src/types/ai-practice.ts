/**
 * AI 工程实践域类型
 * 对应 src/content/ai-practice/index.md（单文件）
 */

/** AI 实践内容 — 含 markdown-it + Shiki 渲染后的 HTML */
export interface AiPracticeContent {
  slug: string
  title: string
  date: string
  /** 一句话定位（如 "不是 AI 帮我写代码，是我用 AI 加速了哪些环节"） */
  subtitle?: string
  html: string
}
