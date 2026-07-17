# Portfolio v3.5 Creative Direction

> **版本**：v3.5-creative-direction-1.0（LOCKED）
> **日期**：2026-07-17
> **身份**：Senior Product Designer / Creative Director / Design System Architect
> **基础**：Portfolio v3.0.0（已冻结）+ 第一印象导向（非组件导向）
> **状态**：✅ Creative Direction 已确认 — 7 项关键决策全部按推荐执行，等待进入 Implementation 阶段
> **确认记录**：用户于 2026-07-17 明确确认"决策都按推荐的来"
> **约束**：不修改源码、不生成实现代码、不 commit、不 push、不更新项目工程文档

---

## 0. 创意方向重启

本文档**不**是 Implementation Plan 的延续，而是**重新定义**整个 Portfolio 的视觉方向。

**视角切换**：
- ❌ 从组件实现出发（"如何改 HeroSection.vue"）
- ✅ 从最终用户第一印象出发（"访客打开网站 3 秒内感受到什么"）

**核心问题**：
> 当一个考研复试导师、校招面试官、技术 HR 在 2026 年打开这个 Portfolio，他们应该感受到什么？

**当前感受**（v3.0.0 实测）：
- "这是一个工程师做的网站"
- "信息完整，但像 README"
- "克制，但缺少记忆点"

**目标感受**（v3.5 方向）：
- "这是一个有工程审美的工程师做的网站"
- "信息有节奏，像在读一篇技术专栏"
- "克制但有锐度，有一个让人记住的视觉符号"

---

## 1. 视觉定位重新定义：Developer Editorial

### 1.1 命名解读

**Developer Editorial** = Developer（身份） × Editorial（气质）

| 维度 | Developer | Editorial |
|---|---|---|
| 来源 | 代码 / 终端 / Mono 字体 | 杂志 / 报纸 / 学术期刊 |
| 节奏 | 模块化 / 网格化 | 章节化 / 留白驱动 |
| 字体 | Mono 用于技术语境 | 衬线/无衬线对比用于层级 |
| 颜色 | Slate 中性 + Amber 强调 | 单色克制 + 1 辅助叙事色 |
| 气质 | 精确 / 克制 / 工程感 | 有呼吸 / 有重点 / 有作者声音 |

**融合结果**：用 Developer 的视觉词汇，表达 Editorial 的节奏与作者声音。

### 1.2 Design Language 完整定义

#### Tone（基调）
- **克制但有态度** — 不堆砌，但该说的说清楚
- **专业但不冷感** — 工程师的专业，不是律师的专业
- **深度但不晦涩** — 有思考过程，但结论清晰

#### Voice（声音）
- 第一人称叙述（"我做了什么"，不是"项目做了什么"）
- 决策驱动（"为什么这样选"，不是"用了什么技术"）
- 证据支撑（代码 / 数据 / 测试，不是形容词）

#### Hierarchy（层次）
- **Editorial 三级层次**：Section Title > Chapter Title > Body
- **视觉对比**：字号对比 > 颜色对比 > 字重对比
- **空间对比**：section 间大留白，section 内紧凑

#### Rhythm（节奏）
- **呼吸式**：紧 - 松 - 紧 - 松，非均匀
- **章节式**：每个 section 像一章，有明确的"开章"和"收尾"
- **停顿式**：关键决策前给用户"思考的停顿"

#### Material（材质）
- **纸质感**：subtle 纹理建立"页面"感，而非"屏幕"感
- **代码感**：Mono 字体 / 代码片段 / Terminal 隐喻
- **油墨感**：高对比文字，像印刷品

#### Light（光线）
- **定向光**：阴影方向一致（左上光源）
- **深度感**：通过 shadow + surface 层级建立"前后"
- **不反光**：无玻璃态 / 无金属感 / 无渐变光斑

### 1.3 与 v3.0.0 的差异

| 维度 | v3.0.0 Developer Academic | v3.5 Developer Editorial |
|---|---|---|
| 基调 | 严格克制 | 克制但有态度 |
| 节奏 | 均匀 | 呼吸式 |
| 留白 | 标准 | 章节 大留白 |
| 视觉主角 | 无 | 有（Hero 视觉符号） |
| 动效 | 仅 hover | 入场 + hover + micro |
| 色彩 | 1 色 | 1 主 + 1 辅叙事色 |
| 纹理 | 无 | subtle grid |
| 作者声音 | 弱 | 强（Number Prefix + Accent Line） |

---

## 2. Moodboard 与参考产品分析

### 2.1 参考产品矩阵

| 产品 | 借鉴点 | 避免点 | 借鉴强度 |
|---|---|---|---|
| **Linear** | 克制配色 / Mono 字体 / subtle 动效 / 任务编号 | 过度暗黑 / 紫色基调 | ⭐⭐⭐⭐⭐ |
| **Vercel** | 几何边框 / 纯白背景 / Triangle logo / 文字驱动 | 过于冷感 / 缺少温度 | ⭐⭐⭐⭐ |
| **Stripe** | Editorial 排版 / 字号对比 / 文档美学 | 渐变背景过浓 / 营销感 | ⭐⭐⭐⭐ |
| **GitHub** | 代码块呈现 / Mono 字体 / Terminal 美学 | 信息密度过高 / 缺少层次 | ⭐⭐⭐⭐⭐ |
| **New York Times** | Editorial 排版 / 字号对比 / 留白节奏 | 过于新闻化 / 衬线字体 | ⭐⭐⭐ |
| **Notion** | clean surface / 块级编辑 / 文档美学 | emoji 使用 / 笔记气质 | ⭐⭐ |
| **Adam Wathan** | Developer 个人品牌 / 克制 / Tailwind 文档 | 博客气质 / 缺少视觉冲击 | ⭐⭐⭐⭐⭐ |
| **Tanner Linsley** | Developer Portfolio / 个人作品集 | 过度动画 / React 气质 | ⭐⭐⭐ |
| **Josh Comeau** | Developer 教学 / 动效克制 | 过度友好 / 偏教学 | ⭐⭐⭐ |
| **Rauno** | 极简 Developer / 几何 / Mono | 过度极简 / 信息不足 | ⭐⭐⭐⭐ |

### 2.2 核心借鉴对象

#### 主借鉴：Linear + Adam Wathan + GitHub

**Linear 教会我们**：
- 克制不等于无趣 — subtle 动效可以建立"现代感"
- 任务编号（如 PROJ-123）可以成为 Signature — 我们的 `// 01 ·` 编号呼应
- 配色统一性 — 全站仅 1-2 个强调色

**Adam Wathan 教会我们**：
- Developer 个人品牌的力量 — 工程师作品集应有的样子
- Tailwind 文档式排版 — 文字驱动，代码点缀
- 克制的色彩 — 不需要彩虹色也能建立识别度

**GitHub 教会我们**：
- 代码即内容 — 不要害怕展示代码片段
- Terminal 美学 — `// comment` / `$ command` / `output` 是 Developer 母语
- Mono 字体的克制使用 — 仅用于技术语境

### 2.3 明确避免对象

#### 避免：Stripe 的渐变背景
- 原因：渐变是 marketing 工具，与 Developer Editorial 冲突
- 替代：纯色 + Grid Pattern 纹理

#### 避免：Notion 的 emoji 使用
- 原因：emoji 偏友好 / 教学，与 Editorial 严肃感冲突
- 替代：Mono 编号 + Lucide 图标

#### 避免：Josh Comeau 的"过度友好"
- 原因：过度友好削弱专业感
- 替代：克制但精确的措辞

#### 避免：Tanner Linsley 的"过度动画"
- 原因：动效过度与克制冲突
- 替代：4 层动效系统，严格限定

### 2.4 Moodboard 视觉关键词

```
关键词矩阵：
┌─────────────┬─────────────┐
│ Editorial   │ Technical   │
│ - 章节编号   │ - 代码片段   │
│ - 大留白     │ - Mono 字体  │
│ - 字号对比   │ - Terminal   │
│ - 杂志排版   │ - 网格背景   │
├─────────────┼─────────────┤
│ Restrained  │ Confident   │
│ - 单色克制   │ - 视觉主角   │
│ - subtle 动效│ - 强调短线   │
│ - 中性灰     │ - Amber 锐度 │
│ - 无渐变     │ - 有态度     │
└─────────────┴─────────────┘
```

---

## 3. Hero Direction（至少 5 套方案）

### 设计约束

- 第一屏 3 秒传递"做什么 + 做得怎么样"
- 不破坏 Developer Editorial 风格
- 不引入新依赖 / 新图片资源
- 不消耗超过 1 个组件配额
- 移动端可用

### 方案 A：Code Snippet Card（代码片段卡片）

**草图**：
```
┌─────────────────────────────────────┐
│ // 赖睿轩 · 软件工程学生              │
│                                     │
│ 客户端 · Serverless · 分布式系统      │
│ 三类工程实践                          │
│                                     │
│ [浏览项目 →]  [GitHub]              │
│                                     │
├─────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────┐ │
│ │ // acquire-lock.ts              │ │
│ │                                 │ │
│ │ async function acquireLock(     │ │
│ │   key: string,                  │ │
│ │   ttl: number                   │ │
│ │ ): Promise<boolean> {           │ │
│ │   const token = uuid()          │ │
│ │   const ok = await redis.set(   │ │
│ │     key, token,                 │ │
│ │     'PX', ttl, 'NX'             │ │
│ │   )                             │ │
│ │   return ok === 'OK'            │ │
│ │ }                               │ │
│ └─────────────────┘ └─────────────┘ │
│                       [Stats Panel] │
└─────────────────────────────────────┘
```

**优点**：
- 与 Developer 身份高度契合（代码 = 证据）
- 复用 Shiki 构建时高亮，无新依赖
- 不消耗组件配额
- 代码片段是最有说服力的"作品"

**风险**：
- 代码片段选择需谨慎（10-15 行，不能泄露敏感信息）
- 需选择代表性强的核心代码（分布式锁 / 并发控制 / Prompt 工程）

**与 Design Language 一致性**：✅ 高度一致

---

### 方案 B：Terminal Simulator（终端模拟器）

**草图**：
```
┌─────────────────────────────────────┐
│ // 赖睿轩 · 软件工程学生              │
│                                     │
│ 客户端 · Serverless · 分布式系统      │
│                                     │
│ [浏览项目 →]  [GitHub]              │
│                                     │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ $ whoami                        │ │
│ │ lai-ruixuan                     │ │
│ │                                 │ │
│ │ $ cat stack.json                │ │
│ │ {                               │ │
│ │   "backend": ["Spring Boot"],   │ │
│ │   "frontend": ["Vue 3"],        │ │
│ │   "focus": "分布式系统"          │ │
│ │ }                               │ │
│ │                                 │ │
│ │ $ git log --oneline -3          │ │
│ │ 3d485c9 chore(rc8): final ...   │ │
│ │ e31e0b8 feat(rc7): final ...    │ │
│ │                                 │ │
│ │ $ _                              │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**优点**：
- 极致 Developer 气质（Terminal = 开发者终极符号）
- 信息密度高（一个 Terminal 传递多种信息）
- 可静态渲染（无 typing 动画也成立）

**风险**：
- typing 动画若加入可能违反动效克制
- 移动端空间不足
- 静态 Terminal 可能显得"假装在运行"

**与 Design Language 一致性**：✅ 高度一致

---

### 方案 C：Editorial Magazine Cover（杂志封面式）

**草图**：
```
┌─────────────────────────────────────┐
│                                     │
│  // Issue 01 · 2026.07              │  ← 杂志期号
│                                     │
│  LAI                                │  ← 巨大字号
│  RUIXUAN                            │
│                                     │
│  ───────────                        │  ← 分隔线
│                                     │
│  Software Engineering Student       │
│  Backend · Distributed Systems      │
│                                     │
│  [Enter →]                          │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ In this issue:                  │ │
│ │ 01 江南出行 · 分布式锁           │ │
│ │ 02 考试系统 · 并发控制           │ │
│ │ 03 情书生成器 · Prompt 工程      │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**优点**：
- 强 Editorial 气质（杂志封面隐喻）
- 巨大字号建立强烈第一印象
- "In this issue" 像目录，预告内容

**风险**：
- 巨大字号可能过于张扬，与克制冲突
- "Issue 01" 杂志隐喻可能让用户困惑
- 与 Developer 身份关联弱（偏 Editorial）

**与 Design Language 一致性**：⚠️ 中等（Editorial 强，Developer 弱）

---

### 方案 D：Architecture Blueprint（架构蓝图）

**草图**：
```
┌─────────────────────────────────────┐
│ // 赖睿轩 · 软件工程学生              │
│                                     │
│ 客户端 · Serverless · 分布式系统      │
│                                     │
│ [浏览项目 →]  [GitHub]              │
│                                     │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │  ┌─────────┐    ┌─────────┐     │ │
│ │  │ Client  │───→│ API     │     │ │
│ │  │ Vue 3   │    │ Gateway │     │ │
│ │  └─────────┘    └────┬────┘     │ │
│ │                      ↓          │ │
│ │  ┌─────────┐    ┌─────────┐     │ │
│ │  │ Redis   │←──→│ Service │     │ │
│ │  │ Lock    │    │ Layer   │     │ │
│ │  └─────────┘    └─────────┘     │ │
│ │                                 │ │
│ │ // 江南出行分布式架构              │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**优点**：
- 直接展示"系统设计能力"
- 与 ProjectDetail 架构图呼应
- 工程感强

**风险**：
- 架构图复杂度高，移动端难呈现
- 静态架构图缺少"活力"
- 与 Home Projects 内容重复

**与 Design Language 一致性**：✅ 一致（架构 = 工程）

---

### 方案 E：Typographic Poster（字体海报）

**草图**：
```
┌─────────────────────────────────────┐
│                                     │
│  // 01 · 赖睿轩                      │
│                                     │
│  ████████████████████████████       │  ← 巨大字号
│  █ 软件工程学生              █       │
│  █ 后端开发                  █       │
│  █ 分布式系统                █       │
│  ████████████████████████████       │
│                                     │
│  ───────────                        │
│                                     │
│  三个完整项目 · 218 文件 · 97 API    │
│                                     │
│  [浏览项目 →]  [GitHub]              │
│                                     │
└─────────────────────────────────────┘
```

**优点**：
- 极致字体驱动（最 Editorial）
- 视觉冲击力强（巨大字号）
- 实现成本最低（纯 CSS）

**风险**：
- 巨大色块可能过于"海报化"
- 与 Developer 身份关联弱（偏平面设计）
- 可能显得"自吹自擂"

**与 Design Language 一致性**：⚠️ 中等（Editorial 强，Developer 弱）

---

### 方案 F：Code Annotation（代码注释式）

**草图**：
```
┌─────────────────────────────────────┐
│ // Hi, I'm La Ruixuan               │  ← 注释式自我介绍
│ // Software Engineering Student      │
│ // Backend · Distributed Systems     │
│                                     │
│ const portfolio = {                 │  ← 代码式陈述
│   projects: 3,                      │
│   focus: ['Spring Boot', 'Vue 3'],  │
│   current: '分布式锁 · Kano 模型',    │
│   github: 'l535304334'              │
│ }                                   │
│                                     │
│ export default portfolio            │
│                                     │
│ [浏览项目 →]  [GitHub]              │
└─────────────────────────────────────┘
```

**优点**：
- 代码即内容（最 Developer）
- 信息结构化（对象字面量）
- 实现成本低

**风险**：
- 代码片段可能让非技术用户困惑
- 与"展示能力"目标略偏（展示的是"会写代码"而非"做了什么"）
- 视觉冲击力中等

**与 Design Language 一致性**：✅ 高度一致

---

### 方案推荐矩阵

| 方案 | Developer 一致 | Editorial 一致 | 视觉冲击 | 实现成本 | 风险 | 总分 |
|---|---|---|---|---|---|---|
| A 代码片段卡片 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **21** |
| B Terminal 模拟器 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | 18 |
| C 杂志封面式 | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | 19 |
| D 架构蓝图 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | 15 |
| E 字体海报 | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 19 |
| F 代码注释式 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 20 |

### 最终推荐：方案 A（代码片段卡片）

**理由**：
1. **Developer 与 Editorial 双高** — 代码片段既体现 Developer 身份，又有"展示作品"的 Editorial 气质
2. **证据驱动** — 代码是最有说服力的"作品"，比 stats 数字更具体
3. **实现成本可控** — 复用 Shiki 基建，不消耗组件配额
4. **风险可控** — 静态呈现，无 typing 动画风险
5. **与 Hero stats panel 互补** — 代码片段（质）+ stats（量）= 完整 Hero

**备选**：方案 F（代码注释式）— 若用户希望 Hero 更"轻量"，可作为备选

---

## 4. Motion Language（节奏，而非参数）

### 4.1 Motion Philosophy

**Motion 不是动画，是节奏。**

v3.0.0 的问题是"没有节奏" — 所有内容一次性出现，像 PDF。
v3.5 的目标是"建立节奏" — 内容像音乐，有起承转合。

### 4.2 Motion 五大节奏模式

#### Rhythm 1：Inhale-Exhale（呼吸）

**何时用**：元素进入视口
**感受**：像呼吸 — 缓慢进入，自然停止
**节奏**：快入慢停（ease-out）
**隐喻**：用户"吸入"信息，元素"呼出"呈现

```
[元素在视口外]
     ↓ 用户滚动
[元素缓慢浮现] ← 500ms ease-out
     ↓
[元素静止]
```

#### Rhythm 2：Cascade（瀑布）

**何时用**：多个元素同时进入视口（卡片网格）
**感受**：像瀑布 — 错峰而下，自然流动
**节奏**：stagger 80-100ms
**隐喻**：信息逐个"落下"，用户视线自然跟随

```
[Card 1] 80ms
[Card 2] 80ms
[Card 3] 80ms
[Card 4] 80ms
     ↓
[全部呈现]
```

#### Rhythm 3：Whisper（耳语）

**何时用**：hover 反馈
**感受**：像耳语 — 轻微克制，不喧宾夺主
**节奏**：150ms ease-in-out
**隐喻**：用户"靠近"元素，元素"轻声回应"

```
[Card default]
     ↓ mouse hover
[Card +1px translateY + shadow] ← 150ms
     ↓ mouse leave
[Card default] ← 150ms
```

#### Rhythm 4：Statement（陈述）

**何时用**：关键决策 / 核心数据呈现
**感受**：像陈述 — 强对比，明确重点
**节奏**：fade-in 600ms + 大字号 + Accent Line
**隐喻**：作者"站起来说"，用户"必须听"

```
[// 关键决策]
     ↓ scroll into view
[Accent Line reveal 24px]
[Decision Title fade-in 600ms]
[方案对比卡片 fade-in 500ms]
```

#### Rhythm 5：Pause（停顿）

**何时用**：section 之间
**感受**：像停顿 — 大留白，让用户"消化"
**节奏**：无动画，纯空间
**隐喻**：作者"停顿一下"，用户"思考"

```
[Section A 完]
     ↓
[大留白 space-24] ← 无动画，纯呼吸
     ↓
[Section B 开始]
```

### 4.3 Motion 节奏组合

**Hero**：无 motion（首屏可见，直接呈现）
**Projects**：Cascade（瀑布）— 卡片错峰入场
**Timeline**：Inhale-Exhale（呼吸）— 阶段逐个浮现
**DecisionSection**：Statement（陈述）— 强对比呈现
**Section 间**：Pause（停顿）— 大留白

### 4.4 Motion 禁忌

❌ **禁止"表演式"动效** — 旋转 / 弹跳 / 闪光
❌ **禁止"营销式"动效** — 视差 / 3D / 滚动劫持
❌ **禁止"教学式"动效** — typing / step-by-step reveal
❌ **禁止"游戏式"动效** — 进度条 / 计数器 / 成就解锁
❌ **禁止"过度友好"动效** — bounce / spring / wiggle

### 4.5 Motion 与 Design Language 关系

**Developer Editorial Motion = 克制的呼吸，不是表演**

- 像 Linear 的 subtle reveal，不像 Apple 的 cinematic
- 像 GitHub 的 hover feedback，不像 Stripe 的 gradient shift
- 像 New York Times 的章节节奏，不像 BuzzFeed 的弹跳动画

---

## 5. Color Story

### 5.1 当前 Color Story

**Amber 单色叙事**：
> "Amber 是工程师的热忱 — 在克制的 Slate 中性色中，Amber 是唯一的温度。"

**问题**：
- 单色叙事过于纯粹，缺少"层次感"
- 6 个 Skills 分类、4 个 Timeline 阶段、4 个 Interview 分类全部用同一种 Amber，无法区分
- 全站视觉"平"，无色彩节奏

### 5.2 是否需要辅助色？

**支持引入**：
- 解决分类视觉差异
- 建立色彩层次
- 与 Linear / Vercel 等参考产品对齐（它们都有辅助色）

**反对引入**：
- 单色是 v3.0.0 的核心资产
- 辅助色易破坏克制风格
- 暗色模式适配复杂

**折中决策**：**引入 1 个辅助色，作为"叙事色"**

### 5.3 辅助色选择

#### 候选 A：Slate Blue

```
--color-accent-secondary: #475569 (light) / #94a3b8 (dark)
```

**优点**：
- 与 Slate 中性色同源（同色相，不同明度）
- 过渡自然，不破坏克制
- 暗色模式对比度好

**风险**：
- 与中性色过于接近，区分度低

#### 候选 B：Indigo

```
--color-accent-secondary: #4f46e5 (light) / #818cf8 (dark)
```

**优点**：
- 区分度高
- 与 Amber 形成互补色对比

**风险**：
- 过于鲜艳，破坏克制
- 与 Linear 紫色混淆

#### 候选 C：Teal

```
--color-accent-secondary: #0d9488 (light) / #2dd4bf (dark)
```

**优点**：
- 与 Amber 形成色相对比
- 技术感强

**风险**：
- 偏 dashboard 风格
- 与 Sage Green 接近

### 5.4 Color Story 决策

**选择：候选 A（Slate Blue）**

**Color Story 叙事**：

> **Amber = 工程师的热忱**（Primary）
> — 用于 CTA / 链接 / eyebrow / 主交互
> — 高频，全站
> — "这是我想让你做的事"
>
> **Slate Blue = 学者的冷静**（Secondary）
> — 用于分类标识 / 状态指示 / 次要分类
> — 中频，特定场景
> — "这是辅助信息，帮你理解"
>
> **Slate = 克制的中性**（Neutral）
> — 用于文字 / 背景 / 边框 / 阴影
> — 高频，全站
> — "这是基础，不抢戏"

### 5.5 Color Story 使用规则

**Amber（热忱）出现的场景**：
- CTA 按钮
- 链接 hover
- eyebrow 文字
- Accent Line（强调短线）
- 主项目分类色（后端 / 软件工程实践）
- Timeline dot
- Featured ProjectCard hover

**Slate Blue（冷静）出现的场景**：
- Skills 辅助分类色（前端 / 工具运维）
- Interview 分类色（系统设计 / 技术原理）
- 状态指示（"已完成" / "进行中"）
- 次要 badge

**Slate（中性）出现的场景**：
- 所有文字
- 所有背景
- 所有边框
- 所有阴影
- 次要分类色（小程序 — 去强调）

### 5.6 Color Story 禁忌

❌ **Amber 不用于**：分类标识（避免抢戏）/ 状态指示（避免与 CTA 混淆）
❌ **Slate Blue 不用于**：CTA / 链接 / eyebrow（Amber 是唯一交互色）
❌ **不引入第三个强调色**：保持 1 主 + 1 辅 = 2 色系统

### 5.7 暗色模式 Color Story

| 色 | Light | Dark |
|---|---|---|
| Amber | #d97706 | #f59e0b（提亮） |
| Slate Blue | #475569 | #94a3b8（提亮） |
| Slate 中性 | #ffffff / #f8fafc / #1e293b | #1e293b / #334155 / #f8fafc |

**暗色模式原则**：
- Amber 提亮（保持温度识别）
- Slate Blue 提亮（保持色相识别）
- 对比度必须通过 WCAG AA（≥4.5:1）

---

## 6. Signature Visual Exploration

### 6.1 探索目标

建立全站统一视觉符号，让用户**3 秒内记住**这个 Portfolio。

**约束**：
- 不破坏 `// eyebrow` / Mono / Developer Editorial
- 不引入新依赖
- 不消耗组件配额

### 6.2 候选视觉符号（15 种）

#### 1. `// eyebrow`（已有）

```
// 精选项目
```
- **状态**：已有，保持
- **强度**：⭐⭐⭐⭐⭐
- **理由**：已是核心资产

#### 2. Mono Number Prefix（章节编号）

```
// 01 · 精选项目
// 02 · 技术成长
```
- **状态**：候选
- **强度**：⭐⭐⭐⭐⭐
- **理由**：增强 `// eyebrow`，建立章节感

#### 3. Amber Accent Line（强调短线）

```
▌ // 关键决策
```
- **状态**：候选
- **强度**：⭐⭐⭐⭐
- **理由**：与 Timeline capability callout 呼应，统一"强调语言"

#### 4. Grid Pattern Underlay（网格底纹）

```
┼ ┼ ┼ ┼ ┼ ┼
[Hero content]
┼ ┼ ┼ ┼ ┼ ┼
```
- **状态**：候选
- **强度**：⭐⭐⭐⭐
- **理由**：与 Mono / 代码隐喻呼应

#### 5. Code Comment Style（注释样式）

```
// 这里是注释样式
   这里是正文
```
- **状态**：已有（eyebrow 本身就是注释样式）
- **强度**：⭐⭐⭐⭐⭐
- **理由**：已融入 `// eyebrow`

#### 6. Vertical Rhythm Lines（垂直节奏线）

```
│ Section A
│
│ Section B
```
- **状态**：候选
- **强度**：⭐⭐
- **理由**：过于装饰，与克制冲突

#### 7. Status Dot（状态点）

```
● 后端开发   ○ 小程序
● 前端开发   ● AI 工程
```
- **状态**：候选
- **强度**：⭐⭐⭐
- **理由**：偏 dashboard，与 Editorial 冲突

#### 8. Bracket Frame（方括号边框）

```
[ 后端开发 ]
[ 前端开发 ]
```
- **状态**：候选
- **强度**：⭐⭐
- **理由**：过于装饰，抢戏

#### 9. Underline Reveal（下划线展开）

```
Hover 时：
Link_______ → Link═══════
```
- **状态**：候选
- **强度**：⭐⭐⭐⭐
- **理由**：微交互，不抢戏

#### 10. Monospace Cursor（光标符号）

```
$ command█
```
- **状态**：候选
- **强度**：⭐⭐⭐
- **理由**：与 Terminal 隐喻关联，但可能过度

#### 11. Pixel Grid Texture（像素网格纹理）

```
▣ ▣ ▣ ▣ ▣
▣ ▣ ▣ ▣ ▣
```
- **状态**：候选
- **强度**：⭐
- **理由**：过于复古，与 Editorial 冲突

#### 12. Code Block Numbering（代码行号）

```
01  async function...
02    const token...
03    const ok...
```
- **状态**：候选
- **强度**：⭐⭐⭐
- **理由**：仅适用于代码块，不通用

#### 13. Hash Symbol（# 标签）

```
#后端 #Spring-Boot #Redis
```
- **状态**：候选
- **强度**：⭐⭐
- **理由**：偏社交媒体，与 Editorial 冲突

#### 14. Bracket Pair（<> 括号对）

```
<Component />
```
- **状态**：候选
- **强度**：⭐⭐⭐⭐
- **理由**：Developer 强符号，但可能过度

#### 15. Indent Guide（缩进引导线）

```
function main() {
│   const x = 1
│   if (x) {
│   │   console.log(x)
│   }
}
```
- **状态**：候选
- **强度**：⭐⭐
- **理由**：仅适用于代码块，不通用

### 6.3 Signature 筛选

#### 进入开发（6 种）

| # | Signature | 强度 | 应用范围 |
|---|---|---|---|
| 1 | `// eyebrow` | ⭐⭐⭐⭐⭐ | 全站 section header |
| 2 | Mono Number Prefix | ⭐⭐⭐⭐⭐ | 多 section 页面 |
| 3 | Amber Accent Line | ⭐⭐⭐⭐ | DecisionSection / About 引言 / Resume callout |
| 4 | Grid Pattern Underlay | ⭐⭐⭐⭐ | Hero / Footer 背景 |
| 5 | Code Comment Style | ⭐⭐⭐⭐⭐ | 已融入 `// eyebrow` |
| 9 | Underline Reveal | ⭐⭐⭐⭐ | Link hover |

#### 放弃（9 种）

| # | Signature | 放弃理由 |
|---|---|---|
| 6 | Vertical Rhythm Lines | 过于装饰 |
| 7 | Status Dot | 偏 dashboard |
| 8 | Bracket Frame | 抢戏 |
| 10 | Monospace Cursor | 过度 Terminal |
| 11 | Pixel Grid Texture | 复古冲突 |
| 12 | Code Block Numbering | 不通用 |
| 13 | Hash Symbol | 社交媒体气质 |
| 14 | Bracket Pair | 过度 Developer |
| 15 | Indent Guide | 不通用 |

### 6.4 最终 Signature 组合

**Signature System = 1 + 2 + 3 + 4 + 5 + 9**

```
┌─────────────────────────────────────┐
│ [Grid Pattern Underlay]             │  ← Signature 4
│                                     │
│ // 01 · 精选项目                     │  ← Signature 1 + 2 + 5
│ Section Title                       │
│ ───────────                         │
│                                     │
│ ▌ // 关键决策                        │  ← Signature 3
│ Decision Title                      │
│                                     │
│ [Link with underline reveal]        │  ← Signature 9
└─────────────────────────────────────┘
```

**视觉效果**：
- Grid Pattern 建立"代码网格"氛围
- `// 01 ·` 建立"章节编号"识别
- Accent Line 建立"重点强调"标记
- Underline Reveal 建立"交互反馈"语言

**与现有资产关系**：全部**增强**而非破坏。

---

## 7. 页面级视觉策略

### 7.1 Home（首页）

**视觉策略**：Editorial 杂志封面式入口

**第一屏**：
- Hero 用代码片段卡片（方案 A）建立"Developer"身份
- Grid Pattern 背景（Hero 专属）
- 不对称 7fr/5fr 网格保持

**第二屏（Projects）**：
- Bento Grid 保持（已有亮点）
- Featured 卡片增加 Accent Line hover
- Normal 卡片恢复 metrics 网格
- `// 01 · 精选项目` 章节编号

**第三屏（Timeline）**：
- 主项目阶段放大 1.2x
- Highlights 改 chip
- `// 02 · 技术成长` 章节编号
- Cascade 动效（瀑布节奏）

**第四屏（Contact）**：
- 保持 business card 风格（已有亮点）
- `// 03 · 联系方式` 章节编号

**Footer**：
- Grid Pattern 背景
- 2 列布局（Sitemap + About）
- 最后更新时间戳

### 7.2 Projects List（项目列表）

**视觉策略**：Bento 主次对比，Featured 卡片"封面化"

**布局**：
- Bento Grid 保持
- Featured 卡片增加：
  - Accent Line hover
  - 项目截图占位（不引入图片，用 Mono 项目代号代替，如 `// PROJ-01`）
  - 大字号项目名

**Normal 卡片**：
- 恢复 2 列 metrics 网格
- 增加 Mono 项目代号

### 7.3 Project Detail（项目详情）

**视觉策略**：Engineering Narrative（工程叙事）

**结构**：
```
[Project Header]
   // PROJ-01 · 江南出行
   [status badge] [role badge]
   ───────────

[Metrics 4 列]

[// 01 · 项目背景]
   Markdown 正文

[// 02 · 架构设计]
   [ArchitectureDiagram + Accent Line]
   ┌─ ▌ Architecture ──┐
   │   [SVG]            │
   └────────────────────┘

[// 03 · 关键决策]
   ┌─ ▌ Decision ──────┐
   │ 方案 A │ 方案 B    │
   │ pros   │ pros      │
   │ cons   │ cons      │
   │ ─────────────────  │
   │ 决策：xxx           │
   └────────────────────┘

[// 04 · 实现细节]
   Markdown 正文

[ProjectNav]
```

**关键决策**：
- DecisionSection 视觉化（方案对比卡片）
- Accent Line 强调关键决策
- 章节编号 `// 01 ·` ~ `// 04 ·`

### 7.4 Skills（技能）

**视觉策略**：Bento 大小卡混合，分类色克制

**布局**：
```
[// 技术能力]
Skills Title
───────────

[大卡 - 后端]  [大卡 - 前端]
Amber         Slate Blue

[小卡] [小卡] [小卡]
小程序  工具   AI
Slate  Blue   Amber

[横长卡 - 软件工程实践]
Amber
```

**分类色映射**：
- 后端 = Amber（核心方向）
- 前端 = Slate Blue（辅助方向）
- 小程序 = Slate（去强调）
- 工具运维 = Slate Blue（辅助方向）
- AI 工程 = Amber（核心方向）
- 软件工程实践 = Amber（核心方向）

**技术栈**：chip 形式（Mono 字体）

### 7.5 About（关于）

**视觉策略**：人物画像 Editorial，引言 Signature

**结构**：
```
[// 关于]
赖睿轩
软件工程学生 · 后端开发 · 分布式系统
───────────

[Facts Panel 2×2]
教育 / 方向 / 考研 / GitHub

[// 01 · 工程定位]
┌─ ▌ 引言 ───────────┐
│ "工程师的克制，     │
│  学者的严谨"        │
└─────────────────────┘

正文段落...

[// 02 · 成长轨迹]
正文段落...
→ 访问 Timeline

[// 03 · 关于本站]
正文段落...
```

**关键决策**：
- 引言 Signature Element（Accent Line + 大字号 italic）
- 章节编号 `// 01 ·` ~ `// 03 ·`
- Facts Panel 保持（已有亮点）

### 7.6 Resume（简历）

**视觉策略**：打印优先，Web 辅助

**Web 呈现**：
```
[// 简历]
赖睿轩
subtitle
───────────
[打印 / 另存为 PDF]  ← 文案修正

[// 01 · 教育背景]
...

[// 02 · 核心竞争力]
┌─ ▌ callout ──────────┐
│ 后端 · 分布式 · 工程  │
└───────────────────────┘

[// 03 · 项目经历]
...
```

**关键决策**：
- 按钮文案修正
- 核心竞争力 callout（Accent Line）
- 章节编号

### 7.7 Interview（面试）

**视觉策略**：Q&A 折叠，分类色彩

**布局**：
```
[// 面试准备]
Interview Title
───────────

[分类卡 2×2]
● 项目深挖 (Amber)      ● 系统设计 (Slate Blue)
● 技术原理 (Slate Blue) ● 工程实践 (Slate)

[// 01 · 项目深挖]
▸ Q1: xxx
▾ Q2: xxx
  [展开内容]
▸ Q3: xxx

[// 02 · 系统设计]
...
```

**关键决策**：
- 分类色点（4 分类 4 色）
- 章节编号

### 7.8 AI Practice（AI 实践）

**视觉策略**：Workflow 可视化

**布局**：
```
[// AI 实践]
AI Practice Title
───────────

[// 01 · 工作流]
┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
│需求 │→│Prompt│→│模型 │→│验证 │
│分析 │  │设计  │  │调用 │  │迭代 │
└─────┘  └─────┘  └─────┘  └─────┘

[// 02 · 案例 1：xxx]
Markdown 内容

[// 03 · 案例 2：xxx]
Markdown 内容
```

**关键决策**：
- AI 工作流横向流程图（与 ArchitectureDiagram 区分：流程 vs 结构）
- 章节编号

### 7.9 Footer

**视觉策略**：Sitemap + Signature 收尾

**布局**：
```
[Grid Pattern 背景]
┌─────────────┬─────────────┐
│ Sitemap     │ About       │
│ 首页        │ 赖睿轩       │
│ 项目        │ 软件工程学生  │
│ 能力        │ 分布式系统    │
│ 面试        │              │
│ AI 实践     │              │
│ 简历        │              │
│ 关于        │              │
├─────────────┴─────────────┤
│ © 2026 赖睿轩              │
│ 最后更新 2026-07-17        │
│ Built with Vue 3 + TS     │
└───────────────────────────┘
```

**关键决策**：
- Grid Pattern 背景（与 Hero 呼应）
- 2 列布局（无 Social 列，避免隐私风险）
- 最后更新时间戳（git-based）

---

## 8. 最终 Visual Direction

### 8.1 进入开发的视觉决策

#### Design Language
- ✅ **Developer Editorial** — 从 Strict Mode 演进为 Confident Mode
- ✅ Tone: 克制但有态度 / 专业但不冷感 / 深度但不晦涩
- ✅ Rhythm: 呼吸式 / 章节式 / 停顿式

#### Hero Direction
- ✅ **方案 A：Code Snippet Card** — 代码片段卡片
- 备选：方案 F（代码注释式）

#### Motion Language
- ✅ **5 大节奏模式**：Inhale-Exhale / Cascade / Whisper / Statement / Pause
- ✅ 严格 4 层动效系统
- ✅ 尊重 reduced-motion

#### Color Story
- ✅ **1 主 + 1 辅**：Amber（热忱）+ Slate Blue（冷静）
- ✅ 辅助色仅用于分类 / 状态，不用于交互

#### Signature Visual
- ✅ **6 元素组合**：
  1. `// eyebrow`（已有）
  2. Mono Number Prefix
  3. Amber Accent Line
  4. Grid Pattern Underlay
  5. Code Comment Style（已融入 eyebrow）
  6. Underline Reveal

#### Skills 重设计
- ✅ **Bento 大小卡混合**（方案 A）
- ✅ 分类色克制（Amber + Slate Blue + Slate）

#### DecisionSection 视觉化
- ✅ **方案对比卡片**（方案 A）
- ✅ 渐进迁移 + fallback

#### Footer 升级
- ✅ **2 列布局**（Sitemap + About）
- ✅ Grid Pattern 背景
- ✅ 最后更新时间戳

#### Resume 修正
- ✅ **按钮文案修正**（"打印 / 另存为 PDF"）

### 8.2 放弃的视觉决策

#### Hero Direction 放弃
- ❌ 方案 B（Terminal 模拟器）— typing 动画风险
- ❌ 方案 C（杂志封面式）— Developer 关联弱
- ❌ 方案 D（架构蓝图）— 与 ProjectDetail 重复
- ❌ 方案 E（字体海报）— Developer 关联弱

#### Color Story 放弃
- ❌ Indigo 辅助色 — 过于鲜艳
- ❌ Teal 辅助色 — 偏 dashboard
- ❌ 第三个强调色（Sage Green）— 破坏克制
- ❌ Social 链接 — 隐私风险

#### Signature Visual 放弃
- ❌ Vertical Rhythm Lines — 过于装饰
- ❌ Status Dot — 偏 dashboard
- ❌ Bracket Frame — 抢戏
- ❌ Monospace Cursor — 过度 Terminal
- ❌ Pixel Grid Texture — 复古冲突
- ❌ Code Block Numbering — 不通用
- ❌ Hash Symbol — 社交媒体气质
- ❌ Bracket Pair — 过度 Developer
- ❌ Indent Guide — 不通用

#### Motion 放弃
- ❌ Parallax — 性能差
- ❌ 3D transform — 与克制冲突
- ❌ Typing 动画 — 教学式
- ❌ 视差滚动 — 营销式
- ❌ 无限循环动画（除 Hero scroll bob）

#### 其他放弃
- ❌ 项目截图马赛克 — 违反"不引入新资源"
- ❌ Terminal 模拟器 — typing 风险
- ❌ 全局纹理 — 破坏克制
- ❌ Footer Social 列 — 隐私风险

### 8.3 已确认的关键决策（用户确认：全部按推荐执行）

| # | 决策项 | ✅ 最终决策 | 备选（已放弃） |
|---|---|---|---|
| 1 | Design Language | **Developer Editorial** | — |
| 2 | Hero 方案 | **A（代码片段卡片）** | F（代码注释式） |
| 3 | Hero 代码片段内容 | **江南出行分布式锁** | 考试系统并发控制 / 情书生成器 Prompt |
| 4 | 辅助色 | **Slate Blue** | Indigo / Teal |
| 5 | Skills 布局 | **Bento 大小卡** | 单列时间线 / 折叠 |
| 6 | About 引言 | **"工程师的克制，学者的严谨"** | 用户自定义 |
| 7 | Footer 最后更新来源 | **git commit 日期** | package.json version 日期 |

**确认时间**：2026-07-17
**确认方式**：用户明确指令"决策都按推荐的来"
**决策状态**：全部 LOCKED，进入 Implementation 阶段后不得再变更

### 8.4 视觉方向总结

**Portfolio v3.5 Visual Direction**：

> **Developer Editorial — Confident Mode**
>
> 用 Developer 的视觉词汇（Mono / 代码 / 网格），表达 Editorial 的节奏与作者声音（章节 / 留白 / 编号）。
>
> 保留克制，增加自信。保留 Design Language 资产，补足视觉短板。
>
> 1 个 Design Language + 1 个 Hero 方向 + 1 个 Motion 系统 + 1 个 Color Story + 6 个 Signature 元素 + 7 个页面策略 = 1 个让人记住的 Portfolio。

### 8.5 下一步

**✅ Creative Direction 已确认。**

进入 Implementation 阶段后，按 Roadmap 顺序开发：
- Phase 0：Motion 基础设施
- Phase 1：Scroll Reveal 全站应用
- Phase 2：Hero 视觉主角（方案 A — 代码片段卡片，代码内容为江南出行分布式锁）
- Phase 3：Skills 重设计（Bento 大小卡，Slate Blue 辅助色）
- Phase 4：ProjectCard + Timeline 升级
- Phase 5：DecisionSection 视觉化
- Phase 6：色彩 + 纹理 + Footer 收尾（Footer 最后更新时间戳来源：git commit 日期）
- Phase 7：v3.5 Final Release

---

## 9. Confirmed Visual Direction Summary（锁定决策汇总）

> **本章为 Creative Direction 锁定后的最终汇总，作为 Implementation 阶段的唯一视觉参考。**

### 9.1 One-Line Direction

> **Developer Editorial — Confident Mode**
> 用 Developer 的视觉词汇，表达 Editorial 的节奏与作者声音。保留克制，增加自信。

### 9.2 锁定的 7 项关键决策

| # | 决策项 | 锁定值 |
|---|---|---|
| 1 | Design Language | Developer Editorial |
| 2 | Hero 方案 | A — Code Snippet Card（代码片段卡片） |
| 3 | Hero 代码片段内容 | 江南出行分布式锁（acquireLock 实现） |
| 4 | 辅助色 | Slate Blue（`#475569` light / `#94a3b8` dark） |
| 5 | Skills 布局 | Bento 大小卡混合 |
| 6 | About 引言 | "工程师的克制，学者的严谨" |
| 7 | Footer 最后更新来源 | git commit 日期 |

### 9.3 锁定的 Design Language 六维度

| 维度 | 锁定值 |
|---|---|
| Tone | 克制但有态度 / 专业但不冷感 / 深度但不晦涩 |
| Voice | 第一人称 / 决策驱动 / 证据支撑 |
| Hierarchy | Editorial 三级层次（字号对比 > 颜色对比 > 字重对比） |
| Rhythm | 呼吸式 / 章节式 / 停顿式 |
| Material | 纸质感 / 代码感 / 油墨感 |
| Light | 定向光 / 深度感 / 不反光 |

### 9.4 锁定的 Motion Language 五节奏

| Rhythm | 场景 | 隐喻 |
|---|---|---|
| Inhale-Exhale | 元素进入视口 | 呼吸 |
| Cascade | 卡片网格 | 瀑布 |
| Whisper | hover 反馈 | 耳语 |
| Statement | 关键决策 / 核心数据 | 陈述 |
| Pause | section 之间 | 停顿 |

### 9.5 锁定的 Color Story 三角色

| 角色 | 色值 | 用途 |
|---|---|---|
| Amber（热忱）| `#d97706` / `#f59e0b` | CTA / 链接 / eyebrow / Accent Line / 主项目分类 / Timeline dot |
| Slate Blue（冷静）| `#475569` / `#94a3b8` | Skills 辅助分类 / Interview 分类 / 状态指示 / 次要 badge |
| Slate（中性）| 现有 token | 文字 / 背景 / 边框 / 阴影 / 次要分类 |

### 9.6 锁定的 Signature Visual 6 元素

| # | Signature | 应用范围 |
|---|---|---|
| 1 | `// eyebrow` | 全站 section header（已有，保持） |
| 2 | Mono Number Prefix | 多 section 页面（`// 01 ·` `// 02 ·`） |
| 3 | Amber Accent Line | DecisionSection / About 引言 / Resume callout |
| 4 | Grid Pattern Underlay | Hero 背景 / Footer 背景 |
| 5 | Code Comment Style | 已融入 `// eyebrow` |
| 6 | Underline Reveal | Link hover 微交互 |

### 9.7 锁定的页面级视觉策略

| 页面 | 视觉策略 | 关键升级 |
|---|---|---|
| Home | Editorial 杂志封面式入口 | Hero 代码片段卡片 + Grid Pattern + 章节编号 |
| Projects List | Bento 主次对比 | Featured 卡片"封面化" + Accent Line hover |
| Project Detail | Engineering Narrative | DecisionSection 视觉化 + Accent Line + 章节编号 |
| Skills | Bento 大小卡混合 | 分类色克制（Amber + Slate Blue + Slate） |
| About | 人物画像 Editorial | 引言 Signature + 章节编号 + Facts Panel |
| Resume | 打印优先 Web 辅助 | 按钮文案修正 + 核心竞争力 callout |
| Interview | Q&A 折叠 + 分类色彩 | 4 分类 4 色 + 章节编号 |
| AiPractice | Workflow 可视化 | AI 工作流横向流程图 + 章节编号 |
| Footer | Sitemap + Signature 收尾 | Grid Pattern 背景 + 2 列 + 最后更新时间戳 |

### 9.8 Implementation 阶段入口准则

进入 Implementation 阶段时，必须：

1. ✅ 以本文件（v3.5-creative-direction-1.0 LOCKED）为唯一视觉参考
2. ✅ 严格遵守 7 项锁定决策，不得变更
3. ✅ 遵守 FROZEN INVENTORY 约束（不新增组件/依赖/Token/字体/动画/架构抽象）
4. ✅ 每个 Phase 完成后回归本文件 §9 验证视觉一致性
5. ✅ 若发现锁定决策与实现冲突，暂停并暴露冲突，等待用户决策（规则 18）

---

**《Portfolio v3.5 Creative Direction》结束 — 已锁定，等待进入 Implementation 阶段。**

本阶段严格遵守"仅完成设计方向探索，不修改源码、不生成实现代码、不 commit、不 push、不更新项目工程文档"原则。

> **本文件为 Creative Direction 探索文档（已锁定），非项目工程文档。进入 Implementation 阶段需用户明确批准。**
