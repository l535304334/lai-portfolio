# Task 000 — 项目内容资产整理完成报告

> 完成日期：2026-07-08
> 状态：已完成

---

## 已生成文件清单（14 个内容文件）

### 项目介绍
- src/content/projects/jiangnan-travel.md
- src/content/projects/love-letter.md
- src/content/projects/exam-system.md

### 技术决策
- src/content/decisions/jiangnan-travel.md (4 项决策)
- src/content/decisions/love-letter.md (3 项决策)
- src/content/decisions/exam-system.md (3 项决策)

### 面试问题（17 题）
- src/content/interview/jiangnan-travel.md (5 题)
- src/content/interview/love-letter.md (5 题)
- src/content/interview/exam-system.md (5 题)
- src/content/interview/general.md (4 题)

### 其他
- src/content/skills/index.md (技术栈 + 学习路线)
- src/content/growth/timeline.md (技术成长时间线)
- src/content/ai-practice/index.md (AI 工程实践)
- src/content/personal/about.md (关于我)

---

## 技术决策清单（10 项）

| # | 项目 | 决策 | 候选方案 |
|---|------|------|---------|
| 1 | 江南出行 | 并发调度 | 乐观锁 / 行锁 / 二阶分布式锁 |
| 2 | 江南出行 | 状态管理 | if-else / 状态模式 / 枚举化状态机 |
| 3 | 江南出行 | 评分引擎 | 接口+Primary / 策略工厂 / 硬编码 |
| 4 | 江南出行 | 审计追踪 | 时间戳 / 操作日志 / 事件溯源 |
| 5 | 两地书 | AI 集成 | 客户端直调 / 云函数代理 |
| 6 | 两地书 | 数据访问 | 全客户端 / 全云函数 / 混合分层 |
| 7 | 两地书 | 软删除 | 布尔字段 / 映射表 / per-user 数组 |
| 8 | 题库 | 架构 | 单文件 / 多文件模块化 |
| 9 | 题库 | 搜索 | indexOf / 倒排索引 |
| 10 | 题库 | 深色模式 | 重复选择器 / CSS 变量 |

---

## 面试问题库（17 题）

- 江南出行专项：5 题（分布式锁、事件溯源、评分公平性、ABA 竞态、架构演进）
- 两地书专项：5 题（安全分层、合规、AI 工程化、权限模型、性能优化）
- 题库专项：5 题（单文件维护、搜索算法、SM-2、配额管理、架构演进）
- 通用问题：4 题（最大挑战、AI 协作、学习路线、项目选择）

---

## 缺失资料列表

以下资料尚未准备：

### 高优先级
- [ ] 江南出行架构图 SVG
- [ ] 江南出行状态机转换图 SVG
- [ ] 江南出行分布式锁时序图 SVG
- [ ] 两地书架构图 SVG
- [ ] 简历 PDF 终稿（放入 public/resume.pdf）
- [ ] 项目截图（运行界面录屏或截图）

### 中优先级
- [ ] 题库系统架构图 SVG
- [ ] Open Graph 分享图片
- [ ] 个人头像（可选）

### 低优先级
- [ ] Email 联系方式确认
- [ ] GitHub 仓库 README 更新
