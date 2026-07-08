/**
 * 基础内容类型 — 所有内容域共享
 * 权威来源：《架构确认文档-v1.2.md》§3.2 Frontmatter 格式
 */

/** 所有内容文件 frontmatter 的公共字段 */
export interface ContentMeta {
  slug: string
  type: 'project' | 'decision' | 'interview' | 'skill' | 'growth' | 'personal' | 'ai-practice'
  title: string
  date: string
}

/** 项目指标（卡片 + 详情页共用） */
export interface Metric {
  label: string
  value: number | string
}
