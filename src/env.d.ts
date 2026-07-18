/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

declare module 'virtual:content' {
  import type { ProjectSummary } from '@/types/project'
  export const projectSummaries: ProjectSummary[]
}

declare module 'virtual:project-detail' {
  import type { ProjectContent } from '@/types/project'
  export const projectDetails: ProjectContent[]
}

declare module 'virtual:interview-content' {
  import type { InterviewCategory } from '@/types/interview'
  export const interviewCategories: InterviewCategory[]
}

declare module 'virtual:ai-practice-content' {
  import type { AiPracticeContent } from '@/types/ai-practice'
  export const aiPractice: AiPracticeContent | null
}

declare module 'virtual:skills-content' {
  import type { SkillsContent } from '@/types/skills'
  export const skills: SkillsContent | null
}

declare module 'virtual:personal-content' {
  import type { PersonalContent } from '@/types/personal'
  export const personal: PersonalContent | null
}

declare module 'virtual:resume-content' {
  import type { ResumeContent } from '@/types/resume'
  export const resume: ResumeContent | null
}

declare module 'virtual:timeline-content' {
  import type { TimelineContent } from '@/types/timeline'
  export const timeline: TimelineContent | null
}

declare module 'virtual:hero-snippet' {
  // Phase 2: Hero 代码片段构建时预渲染的 HTML 字符串
  // 内容为江南出行分布式锁 acquireLock（TypeScript），由 Shiki github-dark 主题渲染
  // HeroSection.vue 通过 v-html 渲染到 <pre> 中
  const heroSnippetHtml: string
  export default heroSnippetHtml
}

// Phase 6: Git Last Updated 时间戳（vite define 注入）
// 权威来源：CREATIVE_DIRECTION §7.9 / READINESS §3.8
// ISO 8601 格式字符串，优先 git 最后提交时间，fallback 到 build time
declare const __LAST_UPDATED__: string

// 批次1-P6: Git Commit Hash（vite define 注入）
// 短 hash 字符串，优先 git 短 hash，fallback 到 'dev'
declare const __GIT_COMMIT__: string
