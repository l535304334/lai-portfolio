# 04-database — 数据库设计

> **本项目无数据库，使用 Markdown SSOT 模式作为数据源。**

## 数据存储架构

本项目采用 **纯前端 SPA + Markdown SSOT** 模式，无传统数据库。所有内容数据以 Markdown 文件为唯一数据源，构建时解析为 JavaScript 对象。

**无数据库**：
- ❌ 无关系型数据库（MySQL / PostgreSQL）
- ❌ 无 NoSQL 数据库（MongoDB / Redis）
- ❌ 无本地存储（IndexedDB / LocalStorage 用于主题切换，非内容数据）
- ❌ 无文件系统数据库（SQLite）

**数据存储方式**：
- ✅ Markdown 文件（`src/content/*.md`）— 版本控制友好，非技术人员可维护
- ✅ Frontmatter（YAML 元数据）— 结构化数据
- ✅ Markdown body — 非结构化内容

## 内容数据源

| 数据类型 | SSOT 文件 | frontmatter 字段 |
|---|---|---|
| 项目详情 | `src/content/projects/*.md` | title / status / role / architecture / decisions |
| 时间线 | `src/content/growth/timeline.md` | stages |
| About 页 | `src/content/personal/about.md` | subtitle / facts / quote |
| Resume | `src/content/resume/index.md` | subtitle / callout |
| Skills | `src/content/skills/index.md` | subtitle / categories |
| Interview | `src/content/interview/*.md` | 4 个分类文件 |
| AI Practice | `src/content/ai-practice/index.md` | subtitle |

## 数据流

```
Markdown 文件 → Vite contentPlugin → 8 个虚拟模块 → Vue 页面组件
```

> 详细数据流说明见 [ARCHITECTURE.md §4 数据流](../../ARCHITECTURE.md)。
