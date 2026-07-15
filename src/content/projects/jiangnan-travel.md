---
slug: jiangnan-travel
title: 江南出行智慧服务平台
subtitle: 基于二阶分布式锁和动态评分引擎的网约车调度系统
type: project
date: 2026-07
featured: true
order: 1
tags: [Java, Spring Boot, Redis, Vue 3, MySQL, Docker]
metrics:
  - label: 源文件
    value: 218
  - label: API 端点
    value: 97
  - label: 测试用例
    value: 236
  - label: 数据库表
    value: 27
github: https://github.com/l535304334/jiangnan-travel
status: Release 1.0 · 2026-07-08
role: 全栈独立开发
---

## 项目背景

软件工程专业毕业实习项目。在 [已脱敏] 网约车公司完成了为期 4 周的全栈开发实习，从零搭建了一个面向江西省的网约车智慧出行平台。作为全栈独立开发，设计了系统架构、实现了全部 97 个 API 端点、41 个前端页面、27 张数据库表，核心贡献集中在调度层的并发控制设计。项目完成 v1.0-v1.5 六轮调度系统增强。

## 解决的问题

网约车平台的核心技术挑战不在 CRUD，而在**并发调度**：

- **分配一致性**：多订单多司机同时竞争时，如何保证一个司机不被重复分配？
- **调度公平性**：如何防止高分司机垄断订单、低分司机永远接不到单的正反馈循环？
- **系统可观测性**：订单经历 8+ 状态变更，出问题后如何在 30 秒内定位根因？

## 技术架构

```
乘客端 (Vue 3) ──→ Controller (Spring Boot) ──→ Service ──→ Mapper (MyBatis-Plus)
司机端 (Vue 3) ──→                              │                    │
管理后台 (Vue 3) ──→                            Redis (Redisson)    MySQL 8.0
                                                 │
                                             DeepSeek API (AI 客服)
```

**技术栈：** Java 17 · Spring Boot 3.2.6 · MyBatis-Plus 3.5.7 · MySQL 8.0 · Redis + Redisson 3.32.0 · JWT · Vue 3.4 · Vite 5 · Element Plus · 高德地图 JS API 2.0 · WebSocket · Docker Compose · GitHub Actions

## 核心功能

- **并发调度引擎**：二阶分布式锁（order lock → driver tryLock），100 订单 × 20 司机压测零重复分配
- **动态评分引擎**：静态加权 + 动态反馈学习 + 时间衰减，5 轮收敛成功率 50%→70%
- **订单状态机**：10 状态 + 15+ 合法路径，枚举集中管理，18 个单元测试全覆盖
- **关键操作留痕审计**：多种事件类型，一条 SQL 回溯全生命周期
- **三层可观测性**：指标层 / 健康层（S/A/B/C/D 评级）/ 异常检测层
- **支付系统**：状态机（pending→paid/failed/refunded）+ 幂等键防重复支付 + payment_trace 追踪日志
- **计费系统**：距离费 + 时长费 + 高峰加价（7-9/17-19 点）+ 过路费 - 优惠券，订单完成时自动生成账单
- **VIP 会员体系**：多档会员等级 + 成长值 + 积分权益 + 续费优惠
- **AI 客服**：DeepSeek 集成，SSE 流式打字机效果，动态注入旅游知识库
- **WebSocket 实时通信**：位置推送 + 订单状态 + 通知
- **风控系统**：下单频率 / 深夜跨城 / 疲劳驾驶检测，三级告警分类

## 测试策略

- 81 个后端单元/集成测试（含 18 个状态机测试覆盖全部合法/非法路径）
- 155 个前端测试用例（核心流程 + 安全边界 + 并发压力）
- Playwright E2E 测试
- 100 订单 × 20 司机并发压测验证

## 项目复盘

**做得好的：**
- 从需求出发做技术选型（需要并发控制→研究分布式锁→选择 Redisson）
- 接口驱动设计（ScoringEngine 接口让评分策略可插拔）
- 防御性编程（加锁后重读 DB 防 ABA、tryLock 超时防死锁）
- 诚实记录技术债务（docs/RELEASE_REVIEW_REPORT.md 记录了 5 项已接受风险）

**可以改进的：**
- 评分引擎状态存储在内存（ConcurrentHashMap），重启丢失
- 事件溯源同步写入，高并发下多一次 INSERT 开销
- 4 个集合仍由客户端直写（安全规则不可审计）
- 未做微服务拆分（单体架构对实习项目合理，但可讨论）

**学到的：**
- 分布式锁不止是"加锁"，锁顺序、超时、锁后重读、WatchDog 续期都是坑
- AI 生成的代码需要更严格的审查——并发安全的逻辑不能交给 AI
- 代码审查的价值：81 个问题中多个 CRITICAL，全部是人工审查发现的
