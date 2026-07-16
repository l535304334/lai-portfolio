/** 简历页面内容（单文件 Markdown 渲染） */
export interface ResumeContent {
  slug: string
  title: string
  date: string
  /** 一句话定位（如 "软件工程学生 · 后端开发 · 软件工程方向"） */
  subtitle?: string
  html: string
}
