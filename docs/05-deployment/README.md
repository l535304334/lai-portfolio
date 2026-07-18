# 05-deployment — 部署文档

> Vercel 部署说明，权威内容以根目录配置文件为准。

## 部署架构

```
Git Push origin/master
    ↓
Vercel Auto Build
    ↓
contentPlugin（解析 8 个虚拟模块）
    ↓
Vite Build（1666 模块）
    ↓
静态资源
    ↓
Vercel Edge CDN
    ↓
用户访问 https://lai-portfolio-xi.vercel.app
```

## 部署配置

| 配置文件 | 作用 | 位置 |
|---|---|---|
| [vercel.json](../../vercel.json) | Vercel SPA rewrites（所有路由指向 index.html） | 根目录 |
| [vite.config.ts](../../vite.config.ts) | Vite 构建配置 + contentPlugin + Git 注入 | 根目录 |
| [package.json](../../package.json) | 构建脚本 + 依赖 | 根目录 |
| [index.html](../../index.html) | SEO meta + Google Fonts preconnect | 根目录 |

## 部署流程

1. **自动部署**：push 到 `master` 分支后，Vercel 自动构建并部署到生产环境
2. **SPA 模式**：所有路由通过 rewrites 指向 `index.html`，由 Vue Router 处理
3. **CDN 加速**：Vercel Edge Network 全球加速

## 环境变量

**无环境变量**：本项目为纯前端 SPA，无后端服务，无需配置环境变量。

## Git 注入

构建时通过 `vite.config.ts` 注入：
- `__LAST_UPDATED__` — Git 最后提交时间（ISO 8601），Vercel 环境无 git 时 fallback 到 build time
- `__GIT_COMMIT__` — Git 短 hash（7 位），Vercel 环境无 git 时 fallback 到 `'dev'`

## 线上性能基线（2026-07-18 实测）

| 指标 | 实测值 | 阈值 | 结论 |
|---|---|---|---|
| LCP | 676ms | < 2500ms | ✅ 通过 |
| FCP | < 1500ms | < 1500ms | ✅ 通过 |
| CLS | 0.3756 | < 0.1 | ❌ baseline（详见 [TECHNICAL_DEBT.md](../../TECHNICAL_DEBT.md)） |
| 控制台错误 | 0 | 0 | ✅ 通过 |
| 7 路由 HTTP 200 | 7/7 | 全部 | ✅ 通过 |

## 分支保护

- ⚠️ `master` 分支受保护，禁止直接 push 历史
- ✅ 任何变更需通过 PR 合并
- ❌ 未经用户明确批准，不得进行 Git commit / tag / push

> 详细部署说明见 [ARCHITECTURE.md §9 构建与部署](../../ARCHITECTURE.md)。
