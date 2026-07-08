/**
 * AI 工程实践域类型
 * 对应 src/content/ai-practice/index.md（单文件）
 */

/** AI 实践内容 — 含 markdown-it + Shiki 渲染后的 HTML */
export interface AiPracticeContent {
  slug: string
  title: string
  date: string
  html: string
}
