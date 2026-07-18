# 06-testing — 测试文档

> 测试体系说明，权威内容以根目录 SSOT 文档为准。

## 测试基线

| 测试类型 | 数量 | 通过率 | 状态 |
|---|---|---|---|
| TypeScript typecheck | 0 错误 | 100% | ✅ |
| Vite build | 1666 模块 | 100% | ✅ |
| Playwright E2E | 163 项 | 100% | ✅ |
| Phase 7 一致性 | 26 项 | 100% | ✅ |
| Phase 7 性能 | 14/17 | 82% | ⚠️ 3 项 baseline |
| 线上性能验证 | 21/23 | 91% | ⚠️ CLS + FCP baseline |

## 测试命令

```bash
# 类型检查
npm run typecheck

# 生产构建
npm run build

# E2E 测试（Playwright）
npm test

# Phase 7 一致性验证
node phase7-consistency-verify.mjs

# Phase 7 性能验证
node phase7-perf-verify.mjs

# 线上性能验证
node phase7-prod-verify.mjs
```

## 主测试套件

### release-gate-task-005.mjs（★ 主测试套件）

- **断言数**：163 项（全部通过）
- **覆盖范围**：
  - 7 个路由可访问性
  - 关键元素存在性（Hero / ProjectCard / Timeline / Contact 等）
  - 主题切换
  - 键盘导航
  - Dark Mode
  - Phase 7 专项断言（18 项，Test 19）
- **运行命令**：`npm test`

### 历史验证脚本（仅供追溯）

| 脚本 | 用途 | 阶段 |
|---|---|---|
| `phase2-verify.mjs` | Phase 2 验证 | Phase 2 |
| `phase3-special-verify.mjs` | Phase 3 专项验证 | Phase 3 |
| `phase4-hotfix-verify.mjs` | Phase 4 Hotfix 验证 | Phase 4 |
| `phase4-special-verify.mjs` | Phase 4 专项验证 | Phase 4 |
| `phase5-cls-baseline.mjs` | Phase 5 CLS 基线验证 | Phase 5 |
| `phase5-special-verify.mjs` | Phase 5 专项验证 | Phase 5 |
| `phase6-a11y-verify.mjs` | Phase 6 a11y 验证 | Phase 6 |
| `phase7-consistency-verify.mjs` | Phase 7 一致性验证（26 项） | Phase 7 |
| `phase7-perf-verify.mjs` | Phase 7 性能验证（17 项） | Phase 7 |
| `phase7-prod-verify.mjs` | Phase 7 线上性能验证 | Phase 7 |

## 测试覆盖范围

### 功能测试
- ✅ 7 个路由 HTTP 200
- ✅ 关键元素存在性
- ✅ 主题切换（Light / Dark）
- ✅ 键盘导航（Tab + focus-visible + Enter）
- ✅ Reduced Motion 友好性
- ✅ 响应式设计（移动端适配）

### 性能测试
- ✅ LCP < 2500ms（线上 676ms）
- ✅ FCP < 1500ms（线上通过）
- ⚠️ CLS < 0.1（baseline 0.3756，详见 [TECHNICAL_DEBT.md](../../TECHNICAL_DEBT.md)）

### 可访问性测试
- ✅ aria-labelledby / aria-label / 动态 alt
- ✅ 键盘导航
- ✅ Reduced Motion
- ⚠️ Amber 对比度 3.19:1（baseline，详见 [TECHNICAL_DEBT.md](../../TECHNICAL_DEBT.md)）

> 详细测试说明见 [PROJECT_STATUS.md §5 测试覆盖](../../PROJECT_STATUS.md)。
