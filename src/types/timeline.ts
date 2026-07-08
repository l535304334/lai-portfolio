/**
 * 技术成长时间线类型
 * 当前为 Home.vue 静态数据，Task 005 从 growth/timeline.md 提取
 */

/** 首页时间线阶段 */
export interface TimelineStage {
  date: string
  title: string
  stack: string
  highlights: string[]
  upcoming?: boolean
}
