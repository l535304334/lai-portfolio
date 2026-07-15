/**
 * 技术成长时间线类型
 * 数据来源：src/content/growth/timeline.md frontmatter.stages（SSOT）
 * Home / About 共用同一份数据，避免双源不一致
 */

/** 首页 / 关于页 时间线阶段 */
export interface TimelineStage {
  date: string
  title: string
  stack: string
  highlights: string[]
  /** 学习重点 */
  learned: string
  /** 下一阶段触发原因 */
  nextStage: string
  /** 能力变化 */
  capability: string
  /** 是否为未来计划阶段 */
  upcoming?: boolean
}

/** virtual:timeline-content 导出形状 */
export interface TimelineContent {
  slug: string
  title: string
  date: string
  /** 结构化阶段数据（Home 精简版使用） */
  stages: TimelineStage[]
  /** 渲染后 HTML（About 页详细叙述使用） */
  html: string
}
