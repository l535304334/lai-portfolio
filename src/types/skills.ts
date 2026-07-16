/**
 * 技术能力页面内容类型
 * - 单文件 Markdown 渲染：src/content/skills/index.md
 * - frontmatter 为唯一数据源（SSOT）
 * - 技术栈分类以结构化数据存储在 frontmatter.categories，由 Skills.vue 渲染为卡片
 * - body 仅保留叙事内容（学习路线 + 当前学习）
 */

/** 技术栈分类（结构化展示单元） */
export interface SkillCategory {
  /** 分类名称（如 "后端开发"） */
  name: string
  /** 技术列表（如 "Java 17 · Spring Boot 3 · ..."） */
  items: string
}

/** 技术能力页面内容（单文件 Markdown 渲染） */
export interface SkillsContent {
  slug: string
  title: string
  date: string
  /** 一句话定位（如 "技术栈 · 学习路线 · 持续学习中"） */
  subtitle?: string
  /** 技术栈分类（结构化卡片数据） */
  categories?: SkillCategory[]
  /** Markdown body 渲染后的 HTML（学习路线 + 当前学习） */
  html: string
}
