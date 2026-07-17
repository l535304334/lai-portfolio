/** 简历页面内容（单文件 Markdown 渲染） */
export interface ResumeContent {
  slug: string
  title: string
  date: string
  /** 一句话定位（如 "软件工程学生 · 后端开发 · 软件工程方向"） */
  subtitle?: string
  /** Phase 7: 核心竞争力 callout 内容（Accent Line Signature 3 第 3/3 配额）
   * 权威来源：CREATIVE_DIRECTION §7.6 Resume / §6.3 #3 Amber Accent Line
   * 来自 frontmatter.callout，渲染为带 Accent Line 的视觉锚点，置于 header 与 Markdown 内容之间
   * 缺失时自动隐藏，保持向后兼容 */
  callout?: string
  html: string
}
