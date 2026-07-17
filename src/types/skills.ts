/**
 * 技术能力页面内容类型
 * - 单文件 Markdown 渲染：src/content/skills/index.md
 * - frontmatter 为唯一数据源（SSOT）
 * - 技术栈分类以结构化数据存储在 frontmatter.categories，由 Skills.vue 渲染为卡片
 * - body 仅保留叙事内容（学习路线 + 当前学习）
 *
 * Phase 3 扩展（READINESS §1.6.2）：
 * - icon: Lucide 图标名（Server/Layout/Smartphone/Terminal/Sparkle/Workflow）
 * - priority: 卡片大小优先级（high=大卡 / medium=小卡 / low=横长卡）
 * - colorTier: 分类色映射（amber/slate-blue/slate）
 * 所有新增字段可选，向后兼容（无字段时 fallback 到普通卡片 + Amber）
 */

/** 卡片大小优先级（READINESS §1.6.2） */
export type SkillCategoryPriority = 'high' | 'medium' | 'low'

/** 分类色映射（CREATIVE_DIRECTION §7.4 / READINESS §4.4） */
export type SkillColorTier = 'amber' | 'slate-blue' | 'slate'

/** 技术栈分类（结构化展示单元） */
export interface SkillCategory {
  /** 分类名称（如 "后端开发"） */
  name: string
  /** 技术列表（如 "Java 17 · Spring Boot 3 · ..."） */
  items: string
  /** Lucide 图标名（如 "server"），无字段时 fallback 到无图标 */
  icon?: string
  /** 卡片大小优先级：high=大卡 / medium=小卡 / low=横长卡 */
  priority?: SkillCategoryPriority
  /** 分类色映射：amber=核心方向 / slate-blue=辅助方向 / slate=去强调 */
  colorTier?: SkillColorTier
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
