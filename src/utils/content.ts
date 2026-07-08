/**
 * Vite 构建时内容插件
 * 扫描 src/content/ 下 Markdown 文件，解析 frontmatter，导出为虚拟模块
 *
 * 虚拟模块：
 * - virtual:content — 轻量摘要数据（无 HTML），首页使用
 * - virtual:project-detail — 完整内容含渲染后 HTML，项目详情页懒加载使用
 */

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Plugin } from 'vite'
import type { ProjectSummary, ProjectContent } from '../types/project'
import type { DecisionContent } from '../types/decision'
import { renderMarkdown } from './markdown'

const VIRTUAL_CONTENT_ID = 'virtual:content'
const RESOLVED_CONTENT_ID = '\0' + VIRTUAL_CONTENT_ID
const VIRTUAL_PROJECT_DETAIL_ID = 'virtual:project-detail'
const RESOLVED_PROJECT_DETAIL_ID = '\0' + VIRTUAL_PROJECT_DETAIL_ID

const CONTENT_BASE = 'src/content'

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
    },
  }
}
