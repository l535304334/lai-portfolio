---
slug: love-letter
type: interview
title: 两地书 Love — 面试问题
date: 2026-06
project: 两地书 Love
---

### Q1: 你的 App 采用了混合数据访问策略。你是如何为每个集合决定使用哪种策略的？

**考察点：** 安全架构理解、风险评估、实际权衡思维

**回答思路：**
1. `manageRecord` 云函数作为通用 CRUD 网关（集合白名单 + 字段白名单 + 创建者校验）
2. 4 个客户端直写集合是低风险 + 高频操作（打卡/课程/通知设置）
3. 承认局限：控制台安全规则不可从代码审计（非 IaC）
4. 有计划的迁移路径

**关键词：** 安全分层、字段白名单、OPENID 推导、IaC

---

### Q2: 微信小程序合规审核被拒后，你是怎么应对的？

**考察点：** 真实平台合规经验、UX 适应能力、对中国应用生态的理解

**回答思路：**
1. 三个违规：强制登录、隐私同意机制缺失、按钮文案误导
2. 游客模式实现（`isGuest` + mock 数据 + `requireLogin()` 拦截）
3. 隐私勾选框：CheckboxGroup → 按钮 disabled 直到勾选
4. 关键洞察：合规功能变成了用户转化功能——游客可以先体验再注册

**关键词：** 平台合规、游客模式、隐私协议、用户转化

---

### Q3: 9 个 AI 云函数如何做 Prompt 注入防护、频率限制和成本控制？

**考察点：** LLM API 实践、安全意识、生产级考量

**回答思路：**
1. 共享 `callDeepSeek` 模块消除 300+ 行重复
2. 频率限制：滑动窗口 60s/10 次，DB 故障 fail-open
3. 三层 Prompt 防护：系统指令 + 边界标记 `---{input}---` + msgSecCheck
4. 成本控制：max_tokens=1024 默认、日期种子确定选题（可缓存）

**关键词：** Prompt 注入、滑动窗口、fail-open、msgSecCheck

---

### Q4: updatePeriod 的 pendingConfirm 机制是做什么的？

**考察点：** 共享数据并发、敏感数据权限模型、数据一致性

**回答思路：**
1. 经期数据敏感，双角色访问（女性记录、男性关怀）
2. 男性修改 → `pendingConfirm: true` + `pendingUpdate` 对象
3. 女性看到确认 UI → 批准后清除 pending 并应用修改
4. 乐观离线模式——无实时锁（经期更新不频繁，足够）

**关键词：** 权限模型、pendingConfirm、乐观锁、双角色

---

### Q5: 首页 10 个云函数调用，v2.0 怎么优化？

**考察点：** 性能优化思维、Serverless 冷启动理解、缓存策略

**回答思路：**
1. 当前：Promise.allSettled 并行 + initialLoadDone 防重复 + 本地缓存
2. v2.0：30s SWR 缓存 → 合并端点 `getHomeData`（最大收益：1 次冷启动 vs 10 次）
3. 进阶：云函数预热 + Zustand selector 减少重渲染

**关键词：** SWR、组合端点、冷启动、Promise.allSettled
