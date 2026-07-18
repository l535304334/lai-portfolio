# Documentation Index（文档体系索引）

> **本文件是 docs/ 目录的总索引，提供企业级文档分类导航。**
>
> 每类信息只保留一个唯一来源（Single Source of Truth）。本索引仅提供导航，不重复内容。实际权威文档保留在根目录或子目录中。

---

## 文档体系结构

```
docs/
├── README.md                          # 本文件（文档体系总索引）
├── 00-overview/                       # 项目总览
├── 01-architecture/                   # 系统架构
├── 02-development/                    # 开发规范
├── 03-api/                            # API 文档（本项目无 API）
├── 04-database/                       # 数据库设计（本项目无数据库）
├── 05-deployment/                     # 部署文档
├── 06-testing/                        # 测试文档
├── 07-release/                        # 发布文档
├── 08-maintenance/                    # 维护文档
├── 09-history/                        # 历史归档索引
├── assets/                            # 文档资源（架构图源文件 + 项目截图）
├── archive/                           # 历史文档归档区（v3.5 开发过程文档）
└── 架构确认文档-v1.2.md               # ★ LOCKED 架构锁定版（最高权威）
```

---

## 文档分类导航

### 00-overview — 项目总览
- [00-overview/README.md](00-overview/README.md) — 项目总览索引

### 01-architecture — 系统架构
- [01-architecture/README.md](01-architecture/README.md) — 架构文档索引
- [架构确认文档-v1.2.md](架构确认文档-v1.2.md) — ★ LOCKED 架构锁定版（最高权威）
- [../ARCHITECTURE.md](../ARCHITECTURE.md) — 系统架构 SSOT（根目录）

### 02-development — 开发规范
- [02-development/README.md](02-development/README.md) — 开发规范索引
- [../AI_RULES.md](../AI_RULES.md) — AI 协作约束（根目录）

### 03-api — API 文档
- [03-api/README.md](03-api/README.md) — 本项目为纯前端 SPA，无后端 API

### 04-database — 数据库设计
- [04-database/README.md](04-database/README.md) — 本项目无数据库，使用 Markdown SSOT

### 05-deployment — 部署文档
- [05-deployment/README.md](05-deployment/README.md) — Vercel 部署说明

### 06-testing — 测试文档
- [06-testing/README.md](06-testing/README.md) — 测试体系说明

### 07-release — 发布文档
- [07-release/README.md](07-release/README.md) — 发布流程与历史

### 08-maintenance — 维护文档
- [08-maintenance/README.md](08-maintenance/README.md) — 维护期 Backlog 与计划

### 09-history — 历史归档索引
- [09-history/README.md](09-history/README.md) — 历史文档归档索引
- [archive/v3.5-history/](archive/v3.5-history/) — v3.5 开发过程历史文档

---

## 文档维护原则

1. **Single Source of Truth (SSOT)**：每类信息只保留一个权威来源，其他文档引用而非重复
2. **LOCKED 文档不得修改**：架构确认文档-v1.2.md / Portfolio_v3.5_*.md 内容冻结
3. **历史文档不作为权威**：archive/ 中的文档仅供追溯，不作为决策依据
4. **索引不重复内容**：本索引和子目录 README.md 仅提供导航，不重复权威文档内容
5. **更新引用关系**：移动或修改文档时，必须同步更新所有引用

---

## 相关文档

| 文档 | 作用 |
|---|---|
| [../HANDOFF.md](../HANDOFF.md) | 项目唯一入口文档 |
| [../README.md](../README.md) | 项目 README（根目录） |
