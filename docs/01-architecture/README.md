# 01-architecture — 系统架构

> 系统架构索引，权威内容以 LOCKED 文档和根目录 SSOT 为准。

## 权威文档

| 文档 | 作用 | 位置 | 状态 |
|---|---|---|---|
| [架构确认文档-v1.2.md](../架构确认文档-v1.2.md) | ★ 架构锁定版（最高权威，冲突仲裁依据） | docs/ | LOCKED |
| [ARCHITECTURE.md](../../ARCHITECTURE.md) | 系统架构 SSOT（架构总览 / 技术栈 / 数据流 / 组件关系 / 设计原则） | 根目录 | 最新 |

## 架构要点

- **架构模式**：纯前端 SPA（Vue 3 + TypeScript + Vite）
- **内容模式**：Markdown SSOT（8 个虚拟模块，构建时解析）
- **运行时依赖**：3 项（vue / vue-router / lucide-vue-next）
- **组件配额**：1/2 已用（ArchitectureDiagram.vue）
- **设计令牌**：CSS Custom Properties + Dark Mode 零 JS 切换

## 架构图资源

架构图源文件位于 [docs/assets/architecture/](../assets/architecture/)：
- `overall-tech-stack.mmd` / `.svg` — 整体技术栈
- `ai-development-flow.mmd` / `.svg` — AI 开发流程
- `dispatch-flow.mmd` / `.svg` — 派单流程
- `exam-system-architecture.mmd` / `.svg` — 医学考试系统架构
- `jiangnan-architecture.mmd` / `.svg` — 江南出行架构
- `love-letter-architecture.mmd` / `.svg` — 两地书架构
- `sm2-flow.mmd` / `.svg` — SM2 算法流程

项目内嵌架构图位于 `src/assets/projects/`（3 个 SVG，构建时 `import.meta.glob` lazy 加载）。

> 详细架构说明见 [ARCHITECTURE.md](../../ARCHITECTURE.md) 和 [架构确认文档-v1.2.md](../架构确认文档-v1.2.md)。
