/**
 * 技术决策类型
 * 仅 frontmatter + 渲染 HTML，无结构化解析
 * decisions/*.md 整体渲染为 HTML 字符串，页面直接展示
 */

import type { ContentMeta } from './content'

/** 决策内容 — 从 decisions/*.md 构建 */
export interface DecisionContent extends ContentMeta {
  type: 'decision'
  html: string
}
