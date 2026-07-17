import MarkdownIt from 'markdown-it'
import { createHighlighter, type Highlighter } from 'shiki'

let highlighter: Highlighter | null = null

async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-dark'],
      langs: ['javascript', 'typescript', 'java', 'python', 'bash', 'json', 'sql', 'yaml'],
    })
  }
  return highlighter
}

const md: MarkdownIt = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight(code, lang) {
    if (highlighter && lang) {
      try {
        return highlighter.codeToHtml(code, { lang, theme: 'github-dark' })
      } catch {
        // 语言未加载或无效，回退到默认转义
      }
    }
    return '' // markdown-it 使用默认 <pre><code> 转义
  },
})

export async function renderMarkdown(content: string): Promise<string> {
  await getHighlighter()
  return md.render(content)
}

/**
 * 构建时代码片段预渲染（Phase 2 Hero Code Snippet Card 使用）
 *
 * 权威来源：《Portfolio_v3.5_IMPLEMENTATION_READINESS.md》§1.3.1
 * - 必须构建时预渲染，禁止运行时调用 Shiki（避免 WASM 下载威胁 LCP）
 * - 复用 getHighlighter 单例，零额外初始化成本
 *
 * @param code 代码字符串（不含围栏）
 * @param lang Shiki 语言标识（必须在 getHighlighter langs 列表中）
 * @returns Shiki 渲染的 HTML（含 .shiki class，被 code-theme.css 样式化）
 */
export async function renderCode(code: string, lang: string): Promise<string> {
  const highlighter = await getHighlighter()
  try {
    return highlighter.codeToHtml(code, { lang, theme: 'github-dark' })
  } catch {
    // 语言未加载或无效，回退到 <pre><code> 转义
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    return `<pre><code>${escaped}</code></pre>`
  }
}
