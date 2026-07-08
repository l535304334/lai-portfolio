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
