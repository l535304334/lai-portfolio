<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import ThemeToggle from './ThemeToggle.vue'

interface NavLink {
  label: string
  to: string
  /** 自定义 active 前缀匹配：当 to 是锚点但需在详情页高亮时使用 */
  activePrefix?: string
}

const links: NavLink[] = [
  { label: '首页', to: '/' },
  // activePrefix: /projects/:slug 详情页时"项目"高亮（v3.5 遗留问题修复）
  { label: '项目', to: '/#projects', activePrefix: '/projects' },
  { label: '能力', to: '/skills' },
  { label: '面试', to: '/interview' },
  { label: 'AI 实践', to: '/ai-practice' },
  { label: '简历', to: '/resume' },
  { label: '关于', to: '/about' },
]

const route = useRoute()
const mobileOpen = ref(false)

function closeMobile() {
  mobileOpen.value = false
}

/** 自定义 active 判断：链接配置了 activePrefix 且当前路径匹配前缀时返回 true
 *  修复 /projects/:slug 详情页"项目"不高亮（to 为 /#projects 锚点，RouterLink 默认不匹配） */
function isCustomActive(link: NavLink): boolean {
  if (!link.activePrefix) return false
  return route.path.startsWith(link.activePrefix)
}
</script>

<template>
  <header class="nav">
    <div class="nav__inner container">
      <RouterLink to="/" class="nav__logo" @click="closeMobile">lai.dev</RouterLink>

      <nav class="nav__desktop" aria-label="主导航">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav__link"
          :class="{
            'nav__link--custom': !!link.activePrefix,
            'nav__link--custom-active': isCustomActive(link),
          }"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="nav__actions">
        <ThemeToggle />
        <button
          type="button"
          class="nav__hamburger"
          :aria-expanded="mobileOpen"
          aria-label="切换菜单"
          @click="mobileOpen = !mobileOpen"
        >
          <X v-if="mobileOpen" :size="20" :stroke-width="1.75" aria-hidden="true" />
          <Menu v-else :size="20" :stroke-width="1.75" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div v-if="mobileOpen" class="nav__mobile">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="nav__mobile-link"
        :class="{
          'nav__mobile-link--custom': !!link.activePrefix,
          'nav__mobile-link--custom-active': isCustomActive(link),
        }"
        @click="closeMobile"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: saturate(180%) blur(8px);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--nav-height);
  gap: var(--space-4);
}

.nav__logo {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
  transition: color var(--transition-fast);
}

.nav__logo:hover {
  color: var(--color-accent);
}

.nav__desktop {
  display: none;
  align-items: center;
  gap: var(--space-6);
  flex: 1;
  justify-content: center;
}

.nav__link {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  position: relative;
  padding: var(--space-1) 0;
  transition: color var(--transition-fast);
}

.nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background-color: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left center;
  opacity: 1;
  transition:
    transform var(--transition-fast),
    opacity var(--transition-fast);
}

.nav__link:hover,
.nav__link.router-link-active {
  color: var(--color-text-primary);
}

/* 非 exact-active（如 /projects/x 命中"项目"）：半透明下划线，强化"你在哪"反馈 */
.nav__link.router-link-active::after {
  transform: scaleX(1);
  opacity: 0.4;
}

/* exact-active（精确匹配当前页）：完整 Amber 下划线 */
.nav__link.router-link-exact-active::after {
  transform: scaleX(1);
  opacity: 1;
}

/* 自定义 active 链接（activePrefix）：屏蔽 RouterLink 默认 active 样式
 * 此类链接的 active 状态完全由 nav__link--custom-active 控制
 * 修复 v3.5 遗留：Home 页"项目"(to="/#projects") 的 path="/" 触发 router-link-exact-active 误高亮 */
.nav__link--custom.router-link-active,
.nav__link--custom.router-link-exact-active {
  color: var(--color-text-secondary);
}

.nav__link--custom.router-link-active::after,
.nav__link--custom.router-link-exact-active::after {
  transform: scaleX(0);
}

/* 自定义 active（/projects/:slug 详情页"项目"高亮）— 半透明下划线
 * 修复 v3.5 遗留：to 为 /#projects 锚点，RouterLink 默认不匹配详情路由 */
.nav__link--custom-active {
  color: var(--color-text-primary);
}

.nav__link--custom-active::after {
  transform: scaleX(1);
  opacity: 0.4;
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.nav__hamburger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.nav__hamburger:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface);
}

.nav__mobile {
  display: flex;
  flex-direction: column;
  padding: var(--space-4) var(--space-6) var(--space-6);
  border-top: 1px solid var(--color-border);
  background-color: var(--color-bg);
}

.nav__mobile-link {
  display: block;
  padding: var(--space-3) 0;
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
}

.nav__mobile-link:last-child {
  border-bottom: none;
}

.nav__mobile-link:hover,
.nav__mobile-link.router-link-active {
  color: var(--color-accent);
}

/* 自定义 active 链接（activePrefix）：屏蔽 RouterLink 默认 active 样式
 * 修复 v3.5 遗留：Home 页"项目"误高亮 */
.nav__mobile-link--custom.router-link-active {
  color: var(--color-text-secondary);
}

/* 自定义 active（移动端 /projects/:slug 详情页"项目"高亮）— Amber 文字色 */
.nav__mobile-link--custom-active {
  color: var(--color-accent);
}

/* 桌面端：显示完整导航，隐藏汉堡菜单 */
@media (min-width: 768px) {
  .nav__desktop {
    display: flex;
  }

  .nav__hamburger {
    display: none;
  }

  .nav__mobile {
    display: none;
  }
}
</style>
