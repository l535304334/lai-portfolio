<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import ThemeToggle from './ThemeToggle.vue'

interface NavLink {
  label: string
  to: string
}

const links: NavLink[] = [
  { label: '首页', to: '/' },
  { label: '项目', to: '/#projects' },
  { label: '能力', to: '/skills' },
  { label: '面试', to: '/interview' },
  { label: 'AI 实践', to: '/ai-practice' },
  { label: '简历', to: '/resume' },
  { label: '关于', to: '/about' },
]

const mobileOpen = ref(false)

function closeMobile() {
  mobileOpen.value = false
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
  transition: transform var(--transition-fast);
}

.nav__link:hover,
.nav__link.router-link-active {
  color: var(--color-text-primary);
}

.nav__link.router-link-exact-active::after {
  transform: scaleX(1);
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
