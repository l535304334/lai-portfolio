/**
 * 项目域类型
 * - ProjectSummary: 首页用，仅 frontmatter 字段，无 HTML
 * - ProjectContent: 详情页用，含渲染后的 HTML
 * 两者独立定义，后续 ProjectContent 字段扩展不影响首页数据模型
 */

import type { Metric } from './content'

/** 首页项目摘要 — 从 frontmatter 提取，无 HTML */
export interface ProjectSummary {
  slug: string
  title: string
  subtitle?: string
  date: string
  tags: string[]
  metrics: Metric[]
  featured?: boolean
  order?: number
  github?: string
}

/** 项目详情 — 含 markdown-it + Shiki 渲染后的 HTML */
export interface ProjectContent {
  slug: string
  title: string
  subtitle?: string
  date: string
  tags: string[]
  metrics: Metric[]
  featured?: boolean
  order?: number
  github?: string
  html: string
}
