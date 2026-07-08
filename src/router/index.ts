import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/projects/:slug',
    name: 'project',
    component: () => import('@/pages/ProjectDetail.vue'),
    meta: { title: '项目详情' },
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('@/pages/Skills.vue'),
    meta: { title: '技术能力' },
  },
  {
    path: '/interview',
    name: 'interview',
    component: () => import('@/pages/Interview.vue'),
    meta: { title: '面试准备' },
  },
  {
    path: '/ai-practice',
    name: 'ai-practice',
    component: () => import('@/pages/AiPractice.vue'),
    meta: { title: 'AI 实践' },
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('@/pages/Resume.vue'),
    meta: { title: '简历' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/About.vue'),
    meta: { title: '关于我' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFound.vue'),
    meta: { title: '页面未找到' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} | 赖睿轩 · 软件工程学生` : '赖睿轩 | 软件工程学生 · 技术成长档案'
})

export default router
