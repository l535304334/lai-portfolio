﻿/**
 * 技术决策类型
 *
 * Phase 5 扩展：支持结构化方案对比卡片（decisions 字段）
 * - 存在 decisions 字段 → 渲染为方案对比卡片
 * - 不存在 decisions 字段 → fallback 到 html（Markdown 渲染）
 *
 * 渐进迁移：decisions 字段可选，不破坏现有 DecisionContent
 */

import type { ContentMeta } from './content'

/** 方案选项（Phase 5 新增） */
export interface DecisionOption {
  /** 方案名称，如 "Redis 分布式锁" */
  name: string
  /** 方案描述 */
  description: string
  /** 优点列表（可选） */
  pros?: string[]
  /** 缺点列表（可选） */
  cons?: string[]
  /** 是否为最终选中方案（默认 false） */
  chosen?: boolean
}

/** 决策项（Phase 5 新增） */
export interface DecisionItem {
  /** 决策标题，如 "并发控制方案选择" */
  title: string
  /** 决策背景/上下文（可选） */
  context?: string
  /** 方案对比列表（至少 2 个方案） */
  options: DecisionOption[]
  /** 最终选择理由（可选） */
  reasoning?: string
}

/** 决策内容 — 从 project frontmatter.decisions 或 decisions/*.md 构建 */
export interface DecisionContent extends ContentMeta {
  type: 'decision'
  /** Fallback HTML（从 decisions/*.md 渲染，无结构化 decisions 时使用） */
  html: string
  /** 结构化决策项（Phase 5 新增，从 project frontmatter.decisions 解析）
   * 存在时使用方案对比卡片渲染，不存在时 fallback 到 html */
  decisions?: DecisionItem[]
}