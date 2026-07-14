<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import ProjectCard from '@/components/home/ProjectCard.vue'
import TimelineSection from '@/components/home/TimelineSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import { projectSummaries as projects } from 'virtual:content'
import type { TimelineStage } from '@/types/timeline'
import type { ContactInfo } from '@/types/contact'

const timelineStages: TimelineStage[] = [
  {
    date: '2026.05',
    title: '医学考试刷题系统 V9',
    stack: 'Vanilla JS · CSS3 · Chart.js · localStorage',
    highlights: [
      '14,563 行单文件 HTML 应用',
      'SM-2 间隔复习算法实现',
      'CSS 设计令牌系统（65+ 变量）',
      'localStorage 配额管理（三层防御）',
    ],
  },
  {
    date: '2026.06',
    title: '两地书 Love',
    stack: 'React · TypeScript · Taro · 微信云开发 · DeepSeek · Serverless',
    highlights: [
      '17 页面 + 26 云函数 + 22 数据库集合',
      '9 个 AI 功能模块的工程化落地',
      '安全架构（OPENID 推导、字段白名单、创建者校验）',
      '微信平台合规整改（游客模式、隐私协议）',
    ],
  },
  {
    date: '2026.07',
    title: '江南出行智慧服务平台',
    stack: 'Java 17 · Spring Boot 3 · Redis · Vue 3 · Docker · CI/CD',
    highlights: [
      '97 API + 27 数据库表的企业级全栈项目',
      '二阶分布式锁并发调度（100 订单 × 20 司机零重复）',
      '形式化订单状态机（10 状态 + 15+ 转换路径）',
      '安全加固（81 个问题清零，7 个 CRITICAL）',
    ],
  },
  {
    date: '下一步',
    title: '分布式系统深入 · 考研准备 · 技术品牌',
    stack: '持续学习中',
    highlights: [
      '分布式系统理论与实践深入',
      '考研计算机基础准备（408）',
      '个人技术品牌建设（本网站）',
    ],
    upcoming: true,
  },
]

const contact: ContactInfo = {
  github: 'https://github.com/l535304334',
  email: null,
}
</script>

<template>
  <div class="home">
    <HeroSection />

    <section id="projects" class="home__projects">
      <div class="container">
        <header class="home__projects-head">
          <p class="home__eyebrow mono">// 精选项目</p>
          <h2 class="home__section-title">三个完整项目，三种工程挑战</h2>
        </header>

        <div class="home__projects-grid">
          <ProjectCard
            v-for="project in projects"
            :key="project.slug"
            :project="project"
            :featured="project.order === 1"
          />
        </div>
      </div>
    </section>

    <TimelineSection :stages="timelineStages" />

    <ContactSection :contact="contact" />
  </div>
</template>

<style scoped>
.home__projects {
  padding: var(--space-20) 0;
}

.home__projects-head {
  margin-bottom: var(--space-10);
}

.home__eyebrow {
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.home__section-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}

/* Bento grid — featured card spans 2 rows on desktop */
.home__projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
}

@media (min-width: 768px) {
  .home__projects-grid {
    grid-template-columns: 1.4fr 1fr;
    grid-template-rows: auto auto;
    gap: var(--space-6);
  }

  .home__projects-grid > :first-child {
    grid-row: span 2;
  }

  .home__section-title {
    font-size: var(--text-4xl);
  }
}
</style>
