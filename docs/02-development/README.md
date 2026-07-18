# 02-development — 开发规范

> 开发规范索引，权威内容以根目录 SSOT 文档为准。

## 权威文档

| 文档 | 作用 | 位置 |
|---|---|---|
| [AI_RULES.md](../../AI_RULES.md) | AI 协作约束 + 技术栈 + 禁止事项 + 替代原则 | 根目录 |
| [.trae/rules/](../../.trae/rules/) | 通用编码规则（工作区规则，自动加载） | .trae/ |

## v3.5 LOCKED 实施文档

| 文档 | 作用 | 位置 |
|---|---|---|
| [Portfolio_v3.5_CREATIVE_DIRECTION.md](../../Portfolio_v3.5_CREATIVE_DIRECTION.md) | v3.5 创意方向规范（LOCKED） | 根目录 |
| [Portfolio_v3.5_IMPLEMENTATION_PLAN.md](../../Portfolio_v3.5_IMPLEMENTATION_PLAN.md) | v3.5 实施计划（LOCKED） | 根目录 |
| [Portfolio_v3.5_IMPLEMENTATION_READINESS.md](../../Portfolio_v3.5_IMPLEMENTATION_READINESS.md) | v3.5 验收标准（LOCKED） | 根目录 |

## 开发命令

```bash
npm run dev          # 开发模式
npm run typecheck    # 类型检查
npm run build        # 生产构建
npm run preview      # 预览构建
npm test             # Playwright E2E 测试
```

## 核心开发约束

1. **Markdown SSOT 模式**：所有内容以 `src/content/*.md` 为唯一数据源
2. **组件配额制**：全站仅 1 个抽象组件（已耗尽）
3. **运行时依赖限制**：仅 3 项（vue / vue-router / lucide-vue-next）
4. **不引入**：Element Plus / Naive UI / Tailwind / Pinia / Nuxt / GSAP
5. **维护模式**：仅修复 P0/P1 + 安全问题，不新增功能

> 详细约束见 [AI_RULES.md](../../AI_RULES.md) 和 [.trae/rules/](../../.trae/rules/)。
