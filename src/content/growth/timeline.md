---
slug: timeline
type: growth
title: 技术成长时间线
date: 2026-07
stages:
  - date: "2026.05"
    title: "医学考试刷题系统 V9"
    stack: "Vanilla JS · CSS3 · Chart.js · localStorage"
    highlights:
      - "独立完成 14,563 行单文件 HTML 应用"
      - "SM-2 间隔复习算法实现"
      - "CSS 设计令牌系统（65+ 变量）"
      - "localStorage 配额管理（三层防御）"
    learned: "客户端架构的边界——单文件 14k 行工程化、SM-2 算法实现、localStorage 配额管理"
    nextStage: "单文件无法承载服务端逻辑，需要接触后端与分布式"
    capability: "从算法实现 → 客户端系统设计"
  - date: "2026.06"
    title: "两地书 Love"
    stack: "React · TypeScript · Taro · 微信云开发 · DeepSeek · Serverless"
    highlights:
      - "17 页面 + 26 云函数 + 22 数据库集合"
      - "8 个 AI 功能模块的工程化落地"
      - "安全架构（OPENID 推导、字段白名单、创建者校验）"
      - "微信平台合规整改（游客模式、隐私协议）"
    learned: "Serverless 架构、8 个 AI 云函数工程化、安全架构设计、平台合规"
    nextStage: "Serverless 限制对底层控制，需要接触并发与分布式系统"
    capability: "从单端 → 全栈；从功能 → 安全与合规"
  - date: "2026.07"
    title: "江南出行智慧服务平台"
    stack: "Java 17 · Spring Boot 3 · Redis · Vue 3 · Docker · CI/CD"
    highlights:
      - "97 API + 27 数据库表的企业级全栈项目"
      - "二阶分布式锁并发调度（100 订单 × 20 司机零重复）"
      - "形式化订单状态机（10 状态 + 15+ 转换路径）"
      - "安全加固（多个 CRITICAL 清零）"
    learned: "并发控制（二阶分布式锁）、形式化状态机、可观测性、企业级开发流程"
    nextStage: "实习结束，回归学术，准备考研"
    capability: "从单机 → 分布式；从个人 → 企业工程"
    isMainProject: true
  - date: "下一步"
    title: "持续学习"
    stack: "持续学习中"
    highlights:
      - "分布式系统理论与实践深入"
      - "考研计算机基础准备（408）"
      - "个人技术品牌建设（本网站）"
    learned: "持续学习中"
    nextStage: "—"
    capability: "分布式系统理论 → 学术研究 → 个人技术品牌"
    upcoming: true
---

## 2026.05 — 医学考试刷题系统 V9 → v1.0.0

**技术栈：** Vanilla JS · CSS3 · Chart.js · localStorage

**做了什么：**
- 独立完成 14,563 行单文件 HTML 应用
- 实现 SM-2 间隔复习算法
- 建立 CSS 设计令牌系统（65+ 变量）
- Chart.js 数据可视化仪表板
- localStorage 配额管理（三层防御）
- v1.0.0 于 2026-07-08 发布到 GitHub（7 轮 RC 修复后稳定）

**学到的：**
- "简单"不等于"简陋"——单文件可以承载高级功能
- YAGNI 决策：不拆分文件是用户需求驱动的，不是偷懒
- 客户端存储配额是必须处理的边界条件

---

## 2026.06 — 两地书 Love

**技术栈：** React · TypeScript · Taro · 微信云开发 · DeepSeek · Serverless

**做了什么：**
- 全栈独立开发微信小程序（17 页面 + 26 云函数 + 22 数据库集合）
- 8 个 AI 功能模块的工程化落地（共享模块、频率限制、Prompt 防护）
- 安全架构设计（OPENID 推导、字段白名单、创建者校验）
- 微信平台合规整改（游客模式、隐私协议）
- 马卡龙设计系统（60+ CSS 变量）
- v1.0.0 于 2026-07-04 正式发布

**学到的：**
- 安全必须从架构层面设计，不能事后修补
- Serverless 的冷启动是真实问题
- 平台合规能驱动更好的 UX

---

## 2026.07 — 江南出行智慧服务平台

**技术栈：** Java 17 · Spring Boot 3 · Redis · Vue 3 · Docker · CI/CD

**做了什么：**
- 4 周实习期完成企业级全栈项目（97 API + 41 页面 + 27 数据库表）
- 二阶分布式锁并发调度（100 订单 × 20 司机零重复分配）
- 动态评分引擎（收敛型，5 轮收敛成功率 50%→70%）
- 形式化订单状态机（10 状态 + 15+ 转换路径）
- 关键操作留痕审计追踪
- 安全加固（多个 CRITICAL 清零）
- Release 1.0 于 2026-07-08 发布，v1.0-v1.5 六轮调度系统增强

**学到的：**
- 分布式锁不止是"加锁"——锁顺序、超时、锁后重读、WatchDog
- AI 生成代码需要更严格的审查（ABA bug 的教训）
- 代码审查的商业价值：多个 CRITICAL 都是人工发现的

---

## 下一步

- 分布式系统理论与实践深入
- 考研计算机基础准备
- 个人技术品牌建设（本网站）
