/**
 * Vite 构建时内容插件
 * 扫描 src/content/ 下 Markdown 文件，解析 frontmatter，导出为虚拟模块
 *
 * 虚拟模块：
 * - virtual:content — 轻量摘要数据（无 HTML），首页使用
 * - virtual:project-detail — 完整内容含 HTML（003.4 实现），项目详情页懒加载使用
 */

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Plugin } from 'vite'
import type { ProjectSummary } from '../types/project'

const VIRTUAL_CONTENT_ID = 'virtual:content'
const RESOLVED_CONTENT_ID = '\0' + VIRTUAL_CONTENT_ID

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

/** 获取内容目录下所有 .md 文件绝对路径（用于 HMR watch） */
function getContentFiles(root: string, subdir: string): string[] {
  const dir = path.resolve(root, CONTENT_BASE, subdir)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.resolve(dir, f))
}

/** Vite 构建时内容插件 — 导出 virtual:content 虚拟模块 */
export function contentPlugin(): Plugin {
  return {
    name: 'content-plugin',
    resolveId(id) {
      if (id === VIRTUAL_CONTENT_ID) {
        return RESOLVED_CONTENT_ID
      }
    },
    load(id) {
      if (id === RESOLVED_CONTENT_ID) {
        const root = process.cwd()
        const summaries = scanProjectSummaries(root)

        for (const file of getContentFiles(root, 'projects')) {
          this.addWatchFile(file)
        }

        return `export const projectSummaries = ${JSON.stringify(summaries)}`
      }
    },
  }
}
