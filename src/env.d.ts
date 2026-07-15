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
  export const skills: { slug: string; title: string; date: string; html: string } | null
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
