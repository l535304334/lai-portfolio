/**
 * Vite 构建时内容插件
 * 扫描 src/content/ 下 Markdown 文件，解析 frontmatter，导出为虚拟模块
 *
 * 虚拟模块：
 * - virtual:content — 轻量摘要数据（无 HTML），首页使用
 * - virtual:project-detail — 完整内容含渲染后 HTML，项目详情页懒加载使用
 * - virtual:interview-content — 面试问答分类（含渲染后 HTML），面试页懒加载使用
 * - virtual:ai-practice-content — AI 工程实践内容（含渲染后 HTML），AI 实践页懒加载使用
 * - virtual:skills-content — 技术能力内容（含渲染后 HTML），技能页懒加载使用
 * - virtual:personal-content — 关于我内容（含渲染后 HTML），关于页懒加载使用
 */

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Plugin } from 'vite'
import type { ProjectSummary, ProjectContent } from '../types/project'
import type { DecisionContent } from '../types/decision'
import type { InterviewCategory, InterviewQAPair } from '../types/interview'
import type { AiPracticeContent } from '../types/ai-practice'
import type { PersonalContent } from '../types/personal'
import type { ResumeContent } from '../types/resume'
import type { TimelineContent, TimelineStage } from '../types/timeline'
import { renderMarkdown } from './markdown'

const VIRTUAL_CONTENT_ID = 'virtual:content'
const RESOLVED_CONTENT_ID = '\0' + VIRTUAL_CONTENT_ID
const VIRTUAL_PROJECT_DETAIL_ID = 'virtual:project-detail'
const RESOLVED_PROJECT_DETAIL_ID = '\0' + VIRTUAL_PROJECT_DETAIL_ID
const VIRTUAL_INTERVIEW_ID = 'virtual:interview-content'
const RESOLVED_INTERVIEW_ID = '\0' + VIRTUAL_INTERVIEW_ID
const VIRTUAL_AI_PRACTICE_ID = 'virtual:ai-practice-content'
const RESOLVED_AI_PRACTICE_ID = '\0' + VIRTUAL_AI_PRACTICE_ID
const VIRTUAL_SKILLS_ID = 'virtual:skills-content'
const RESOLVED_SKILLS_ID = '\0' + VIRTUAL_SKILLS_ID
const VIRTUAL_PERSONAL_ID = 'virtual:personal-content'
const RESOLVED_PERSONAL_ID = '\0' + VIRTUAL_PERSONAL_ID
const VIRTUAL_RESUME_ID = 'virtual:resume-content'
const RESOLVED_RESUME_ID = '\0' + VIRTUAL_RESUME_ID
const VIRTUAL_TIMELINE_ID = 'virtual:timeline-content'
const RESOLVED_TIMELINE_ID = '\0' + VIRTUAL_TIMELINE_ID

const CONTENT_BASE = 'src/content'

/** 面试分类排序优先级（项目相关在前，通用在后） */
const INTERVIEW_ORDER = ['jiangnan-travel', 'love-letter', 'exam-system', 'general']

/** 扫描项目 Markdown 文件，提取 frontmatter 为 ProjectSummary */
function scanProjectSummaries(root: string): ProjectSummary[] {
  const dir = path.resolve(root, CONTENT_BASE, 'projects')
  if (!fs.existsSync(dir)) {
    return []
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

  const summaries = files.map((file) => {
    const filePath = path.resolve(dir, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)

    if (!data.slug) {
      throw new Error(`[content-plugin] Missing "slug" in ${filePath}`)
    }
    if (!data.title) {
      throw new Error(`[content-plugin] Missing "title" in ${filePath}`)
    }

    const summary: ProjectSummary = {
      slug: String(data.slug),
      title: String(data.title),
      subtitle: data.subtitle ? String(data.subtitle) : undefined,
      date: String(data.date ?? ''),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      metrics: Array.isArray(data.metrics) ? data.metrics : [],
      featured: Boolean(data.featured),
      order: typeof data.order === 'number' ? data.order : undefined,
      github: data.github ? String(data.github) : undefined,
    }
    return summary
  })

  return summaries.sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

/** 扫描项目 Markdown，渲染 HTML，返回 ProjectContent[] */
async function scanProjectDetails(root: string): Promise<ProjectContent[]> {
  const dir = path.resolve(root, CONTENT_BASE, 'projects')
  if (!fs.existsSync(dir)) {
    return []
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

  const details = await Promise.all(
    files.map(async (file) => {
      const filePath = path.resolve(dir, file)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)

      if (!data.slug) {
        throw new Error(`[content-plugin] Missing "slug" in ${filePath}`)
      }
      if (!data.title) {
        throw new Error(`[content-plugin] Missing "title" in ${filePath}`)
      }

      const html = await renderMarkdown(content)

      const detail: ProjectContent = {
        slug: String(data.slug),
        title: String(data.title),
        subtitle: data.subtitle ? String(data.subtitle) : undefined,
        date: String(data.date ?? ''),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        metrics: Array.isArray(data.metrics) ? data.metrics : [],
        featured: Boolean(data.featured),
        order: typeof data.order === 'number' ? data.order : undefined,
        github: data.github ? String(data.github) : undefined,
        status: data.status ? String(data.status) : undefined,
        role: data.role ? String(data.role) : undefined,
        architecture: data.architecture ? String(data.architecture) : undefined,
        html,
        decision: (await loadDecisionBySlug(root, String(data.slug))) ?? undefined,
      }
      return detail
    }),
  )

  return details.sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

/** 获取内容目录下所有 .md 文件绝对路径（用于 HMR watch） */
function getContentFiles(root: string, subdir: string): string[] {
  const dir = path.resolve(root, CONTENT_BASE, subdir)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.resolve(dir, f))
}

/** 按 slug 加载单个决策文件，渲染为 DecisionContent；不存在返回 null */
async function loadDecisionBySlug(root: string, slug: string): Promise<DecisionContent | null> {
  const filePath = path.resolve(root, CONTENT_BASE, 'decisions', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  if (!data.title) {
    throw new Error(`[content-plugin] Missing "title" in decision ${filePath}`)
  }
  const html = await renderMarkdown(content)
  return {
    slug: String(data.slug ?? slug),
    type: 'decision',
    title: String(data.title),
    date: String(data.date ?? ''),
    html,
  }
}

/**
 * 解析面试 Markdown 内容为问答对数组
 * 按 `### Q{n}: {question}` 标题切分，每个回答体单独渲染为 HTML
 */
async function parseInterviewQA(content: string): Promise<InterviewQAPair[]> {
  const headerRegex = /^### (Q\d+: .+)$/gm
  const matches: Array<{ question: string; start: number; headerEnd: number }> = []
  let match: RegExpExecArray | null
  while ((match = headerRegex.exec(content)) !== null) {
    const question = match[1]
    if (!question) continue
    matches.push({
      question,
      start: match.index,
      headerEnd: match.index + match[0].length,
    })
  }

  if (matches.length === 0) return []

  const pairs: InterviewQAPair[] = []
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i]!
    const bodyStart = current.headerEnd
    const bodyEnd = i + 1 < matches.length ? matches[i + 1]!.start : content.length
    const body = content.slice(bodyStart, bodyEnd).trim()
    const html = await renderMarkdown(body)
    pairs.push({
      question: current.question,
      html,
    })
  }
  return pairs
}

/** 扫描 interview/*.md，解析 frontmatter，渲染问答 HTML，按 INTERVIEW_ORDER 排序 */
async function scanInterviews(root: string): Promise<InterviewCategory[]> {
  const dir = path.resolve(root, CONTENT_BASE, 'interview')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

  const categories = await Promise.all(
    files.map(async (file) => {
      const filePath = path.resolve(dir, file)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)

      if (!data.slug) {
        throw new Error(`[content-plugin] Missing "slug" in ${filePath}`)
      }
      if (!data.title) {
        throw new Error(`[content-plugin] Missing "title" in ${filePath}`)
      }

      const questions = await parseInterviewQA(content)

      const category: InterviewCategory = {
        slug: String(data.slug),
        title: String(data.title),
        project: String(data.project ?? ''),
        date: String(data.date ?? ''),
        questions,
      }
      return category
    }),
  )

  return categories.sort((a, b) => {
    const ai = INTERVIEW_ORDER.indexOf(a.slug)
    const bi = INTERVIEW_ORDER.indexOf(b.slug)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })
}

/** 扫描 ai-practice/index.md，渲染 HTML，返回 AiPracticeContent（单文件） */
async function scanAiPractice(root: string): Promise<AiPracticeContent | null> {
  const filePath = path.resolve(root, CONTENT_BASE, 'ai-practice', 'index.md')
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  if (!data.slug) {
    throw new Error(`[content-plugin] Missing "slug" in ${filePath}`)
  }
  if (!data.title) {
    throw new Error(`[content-plugin] Missing "title" in ${filePath}`)
  }

  const html = await renderMarkdown(content)

  return {
    slug: String(data.slug),
    title: String(data.title),
    date: String(data.date ?? ''),
    html,
  }
}

/** 扫描 skills/index.md，渲染 HTML，返回技能页内容（单文件） */
async function scanSkills(root: string): Promise<{ slug: string; title: string; date: string; html: string } | null> {
  const filePath = path.resolve(root, CONTENT_BASE, 'skills', 'index.md')
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  if (!data.slug) {
    throw new Error(`[content-plugin] Missing "slug" in ${filePath}`)
  }
  if (!data.title) {
    throw new Error(`[content-plugin] Missing "title" in ${filePath}`)
  }

  const html = await renderMarkdown(content)

  return {
    slug: String(data.slug),
    title: String(data.title),
    date: String(data.date ?? ''),
    html,
  }
}

/** 扫描 personal/about.md，渲染 HTML，返回关于页内容（单文件） */
async function scanPersonal(root: string): Promise<PersonalContent | null> {
  const filePath = path.resolve(root, CONTENT_BASE, 'personal', 'about.md')
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  if (!data.slug) {
    throw new Error(`[content-plugin] Missing "slug" in ${filePath}`)
  }
  if (!data.title) {
    throw new Error(`[content-plugin] Missing "title" in ${filePath}`)
  }

  const html = await renderMarkdown(content)

  return {
    slug: String(data.slug),
    title: String(data.title),
    date: String(data.date ?? ''),
    html,
  }
}

/** 扫描 resume/index.md，渲染 HTML，返回简历页内容（单文件） */
async function scanResume(root: string): Promise<ResumeContent | null> {
  const filePath = path.resolve(root, CONTENT_BASE, 'resume', 'index.md')
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  if (!data.slug) {
    throw new Error(`[content-plugin] Missing "slug" in ${filePath}`)
  }
  if (!data.title) {
    throw new Error(`[content-plugin] Missing "title" in ${filePath}`)
  }

  const html = await renderMarkdown(content)

  return {
    slug: String(data.slug),
    title: String(data.title),
    date: String(data.date ?? ''),
    html,
  }
}

/**
 * 扫描 growth/timeline.md，解析 frontmatter.stages 为结构化数据，
 * 渲染 markdown body 为 HTML（未来扩展使用）。
 * 作为 Timeline 数据的 SSOT，Home 使用此数据源；About 保持独立内容，不共享 Timeline。
 */
async function scanTimeline(root: string): Promise<TimelineContent | null> {
  const filePath = path.resolve(root, CONTENT_BASE, 'growth', 'timeline.md')
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  if (!data.slug) {
    throw new Error(`[content-plugin] Missing "slug" in ${filePath}`)
  }
  if (!data.title) {
    throw new Error(`[content-plugin] Missing "title" in ${filePath}`)
  }

  const rawStages = Array.isArray(data.stages) ? data.stages : []
  const stages: TimelineStage[] = rawStages.map((s: Record<string, unknown>, idx: number) => {
    const highlights = Array.isArray(s.highlights) ? s.highlights.map(String) : []
    return {
      date: String(s.date ?? ''),
      title: String(s.title ?? `Stage ${idx + 1}`),
      stack: String(s.stack ?? ''),
      highlights,
      learned: String(s.learned ?? ''),
      nextStage: String(s.nextStage ?? ''),
      capability: String(s.capability ?? ''),
      upcoming: Boolean(s.upcoming),
    }
  })

  const html = await renderMarkdown(content)

  return {
    slug: String(data.slug),
    title: String(data.title),
    date: String(data.date ?? ''),
    stages,
    html,
  }
}

/** Vite 构建时内容插件 — 导出虚拟模块 */
export function contentPlugin(): Plugin {
  return {
    name: 'content-plugin',
    resolveId(id) {
      if (id === VIRTUAL_CONTENT_ID) {
        return RESOLVED_CONTENT_ID
      }
      if (id === VIRTUAL_PROJECT_DETAIL_ID) {
        return RESOLVED_PROJECT_DETAIL_ID
      }
      if (id === VIRTUAL_INTERVIEW_ID) {
        return RESOLVED_INTERVIEW_ID
      }
      if (id === VIRTUAL_AI_PRACTICE_ID) {
        return RESOLVED_AI_PRACTICE_ID
      }
      if (id === VIRTUAL_SKILLS_ID) {
        return RESOLVED_SKILLS_ID
      }
      if (id === VIRTUAL_PERSONAL_ID) {
        return RESOLVED_PERSONAL_ID
      }
      if (id === VIRTUAL_RESUME_ID) {
        return RESOLVED_RESUME_ID
      }
      if (id === VIRTUAL_TIMELINE_ID) {
        return RESOLVED_TIMELINE_ID
      }
    },
    async load(id) {
      if (id === RESOLVED_CONTENT_ID) {
        const root = process.cwd()
        const summaries = scanProjectSummaries(root)

        for (const file of getContentFiles(root, 'projects')) {
          this.addWatchFile(file)
        }

        return `export const projectSummaries = ${JSON.stringify(summaries)}`
      }
      if (id === RESOLVED_PROJECT_DETAIL_ID) {
        const root = process.cwd()
        const details = await scanProjectDetails(root)

        for (const file of getContentFiles(root, 'projects')) {
          this.addWatchFile(file)
        }
        for (const file of getContentFiles(root, 'decisions')) {
          this.addWatchFile(file)
        }

        return `export const projectDetails = ${JSON.stringify(details)}`
      }
      if (id === RESOLVED_INTERVIEW_ID) {
        const root = process.cwd()
        const categories = await scanInterviews(root)

        for (const file of getContentFiles(root, 'interview')) {
          this.addWatchFile(file)
        }

        return `export const interviewCategories = ${JSON.stringify(categories)}`
      }
      if (id === RESOLVED_AI_PRACTICE_ID) {
        const root = process.cwd()
        const aiPractice = await scanAiPractice(root)

        for (const file of getContentFiles(root, 'ai-practice')) {
          this.addWatchFile(file)
        }

        return `export const aiPractice = ${JSON.stringify(aiPractice)}`
      }
      if (id === RESOLVED_SKILLS_ID) {
        const root = process.cwd()
        const skills = await scanSkills(root)

        for (const file of getContentFiles(root, 'skills')) {
          this.addWatchFile(file)
        }

        return `export const skills = ${JSON.stringify(skills)}`
      }
      if (id === RESOLVED_PERSONAL_ID) {
        const root = process.cwd()
        const personal = await scanPersonal(root)

        for (const file of getContentFiles(root, 'personal')) {
          this.addWatchFile(file)
        }

        return `export const personal = ${JSON.stringify(personal)}`
      }
      if (id === RESOLVED_RESUME_ID) {
        const root = process.cwd()
        const resume = await scanResume(root)

        for (const file of getContentFiles(root, 'resume')) {
          this.addWatchFile(file)
        }

        return `export const resume = ${JSON.stringify(resume)}`
      }
      if (id === RESOLVED_TIMELINE_ID) {
        const root = process.cwd()
        const timeline = await scanTimeline(root)

        const timelineFile = path.resolve(root, CONTENT_BASE, 'growth', 'timeline.md')
        if (fs.existsSync(timelineFile)) {
          this.addWatchFile(timelineFile)
        }

        return `export const timeline = ${JSON.stringify(timeline)}`
      }
    },
  }
}
