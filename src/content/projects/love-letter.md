---
slug: love-letter
title: 两地书 Love
subtitle: 为异地恋情侣打造的微信小程序陪伴工具
type: project
date: 2026-06
featured: true
order: 2
tags: [TypeScript, React, Taro, 微信云开发, DeepSeek, Serverless]
metrics:
  - label: 页面
    value: 17
  - label: 云函数
    value: 26
  - label: 数据库集合
    value: 22
  - label: AI 功能
    value: 8
github: https://github.com/l535304334/Love
status: v1.0.0 · 2026-07-04 · 维护模式
role: 全栈独立开发
architecture: love-letter
---

## 项目背景

为异地恋大学生情侣设计的微信小程序。灵感来源于鲁迅与许广平的通信集《两地书》——"见字如面，纸短情长"。作为全栈独立开发，从产品定位到技术选型，从 17 个前端页面到 26 个云函数，从 22 个数据库集合到 8 个 AI 功能模块，全部独立完成。项目经历了 8 个开发阶段迭代与微信平台合规审核整改。

## 解决的问题

异地恋情侣面临的问题是"日常陪伴感的缺失"。通用聊天工具缺少情侣专属功能。这款小程序将书信、心情记录、经期关怀、AI 智能助手等功能整合到一个应用中。

## 技术架构

```
微信小程序客户端 (Taro + React + TypeScript + Zustand)
        │
   Taro.cloud.callFunction()
        │
微信云开发 CloudBase
  ├── 26 个云函数 (Node.js)
  │     ├── 认证层 (OpenID 推导)
  │     ├── 业务层 (书信/留言/记录)
  │     └── AI 层 (8 个 DeepSeek 函数)
  ├── 云数据库 (22 个集合)
  └── 云存储
        │
   DeepSeek API · 和风天气 API
```

**技术栈：** Taro 4.2 · React 18 · TypeScript 5.3 (strict) · Zustand 4.5 · SCSS · 微信云开发 CloudBase · DeepSeek Chat API · Vitest · ESLint 10

## 核心功能

- **信箱系统**：四合一收件箱（留言/书信/取件/备忘录），统一云函数代理
- **AI 功能矩阵**：8 个 AI 云函数——书信润色、诗歌生成、语感检查、备忘提取、科普文章、健康建议、打卡/愿望推荐、周报月报
- **安全架构**：全云函数 OPENID 推导身份、字段白名单、创建者所有权校验、Prompt 注入防护、msgSecCheck 内容审核
- **经期关怀**：双角色权限 + pendingConfirm 确认机制 + 定时推送（避开上课时段）
- **游客模式**：微信合规驱动的完整游客体验，mock 数据预览 + 写操作拦截
- **马卡龙设计系统**：60+ CSS 变量、信纸纹理（纯 CSS）、粉调阴影系统

## 测试策略

- 28 个 Vitest 单元测试（前端工具函数）
- TypeScript strict 模式 0 error
- ESLint 10 flat config 0 error

## 项目复盘

**做得好的：**
- 安全第一：全云函数不信任前端传入身份的设计决策
- AI 工程化：共享 callDeepSeek 模块消除 300+ 行重复代码
- 合规驱动 UX：游客模式从"合规需求"变成了"用户转化功能"
- 文档完整：10+ 份文档覆盖架构、数据库、AI、安全、合规

**可以改进的：**
- 首页 Tab 切换触发 10+ 云函数调用（应合并为组合端点）
- 4 个集合仍由客户端直写（应全量迁移到云函数）
- 无云函数集成测试
- 微信生态强绑定，可迁移性有限

**学到的：**
- 平台合规不是"打勾"——它根本上塑造了 UX 流程
- Serverless 架构的冷启动是真实问题（~200-500ms 延迟）
- 双人共用场景下的数据模型设计（per-user 软删除、pendingConfirm）
