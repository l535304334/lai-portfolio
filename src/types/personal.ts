/**
 * 关于我页面内容类型
 * - 单文件 Markdown 渲染：src/content/personal/about.md
 * - frontmatter 为唯一数据源（SSOT）
 * - About 页定位为"人物画像"，不重复 Hero/Timeline/Resume 信息
 */

/** 关于我页面关键事实（结构化 key-value，≤4 项长期稳定信息） */
export interface PersonalFact {
  label: string
  value: string
}

/** 关于我页面内容（单文件 Markdown 渲染） */
export interface PersonalContent {
  slug: string
  title: string
  date: string
  /** 一句话定位（如 "软件工程学生 · 后端开发 · 分布式系统"） */
  subtitle?: string
  /** 结构化关键事实（≤4 项，长期稳定且适合快速扫描的信息） */
  facts?: PersonalFact[]
  /** Markdown body 渲染后的 HTML */
  html: string
}
