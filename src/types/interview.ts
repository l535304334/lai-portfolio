/**
 * 面试域类型
 * - InterviewQAPair: 单个问答对（问题 + 渲染后 HTML）
 * - InterviewCategory: 一个分类文件（含多个 Q&A）
 */

/** 单个面试问答对 */
export interface InterviewQAPair {
  /** 问题标题（含 Q{n}: 前缀，如 "Q1: 你这个项目最难的地方是什么？"） */
  question: string
  /** 回答 HTML（markdown-it + Shiki 渲染后） */
  html: string
}

/** 面试分类 — 对应 interview/*.md 一个文件 */
export interface InterviewCategory {
  slug: string
  title: string
  /** 关联项目名（frontmatter project 字段） */
  project: string
  date: string
  questions: InterviewQAPair[]
}
