# 03-api — API 文档

> **本项目为纯前端 SPA，无后端 API。**

## 架构说明

本项目采用 **Markdown SSOT 模式**，所有内容数据以 `src/content/*.md` 为唯一数据源，构建时通过自定义 Vite 插件（`src/utils/content.ts`）解析为 8 个虚拟模块，运行时 bundle 零 Markdown 解析开销。

**无后端服务**：
- ❌ 无 REST API
- ❌ 无 GraphQL
- ❌ 无数据库
- ❌ 无认证服务
- ❌ 无服务器端逻辑

**数据来源**：
- ✅ Markdown 文件（`src/content/*.md`）— 构建时解析
- ✅ 虚拟模块（`virtual:*-content`）— 构建时生成

## 8 个虚拟模块

| # | 虚拟模块名 | 数据源 | 消费者 |
|---|---|---|---|
| 1 | `virtual:content` | `src/content/projects/*.md`（Markdown body） | ProjectDetail.vue |
| 2 | `virtual:project-detail` | `src/content/projects/*.md`（frontmatter） | ProjectDetail.vue |
| 3 | `virtual:interview-content` | `src/content/interview/*.md` | Interview.vue |
| 4 | `virtual:ai-practice-content` | `src/content/ai-practice/index.md` | AiPractice.vue |
| 5 | `virtual:skills-content` | `src/content/skills/index.md` | Skills.vue |
| 6 | `virtual:personal-content` | `src/content/personal/about.md` | About.vue |
| 7 | `virtual:resume-content` | `src/content/resume/index.md` | Resume.vue |
| 8 | `virtual:timeline-content` | `src/content/growth/timeline.md` | Home.vue |

> 详细架构说明见 [ARCHITECTURE.md §4 数据流](../../ARCHITECTURE.md)。
