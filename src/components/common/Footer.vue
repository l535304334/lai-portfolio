<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Github } from 'lucide-vue-next'

// Phase 6: Git Last Updated 时间戳（vite define 注入）
// 权威来源：CREATIVE_DIRECTION §7.9 / READINESS §3.8
// __LAST_UPDATED__ 为 ISO 8601 格式，显示时截取 YYYY-MM-DD
const lastUpdated = __LAST_UPDATED__
const lastUpdatedDisplay = lastUpdated.substring(0, 10)

// 批次1-P6: Git Commit Hash（短 hash）
const gitCommit = __GIT_COMMIT__

const year = new Date().getFullYear()

// Phase 6: Sitemap 链接列表（CREATIVE_DIRECTION §7.9）
const sitemap = [
  { label: '首页', to: '/' },
  { label: '项目', to: '/#projects' },
  { label: '能力', to: '/skills' },
  { label: '面试', to: '/interview' },
  { label: 'AI 实践', to: '/ai-practice' },
  { label: '简历', to: '/resume' },
  { label: '关于', to: '/about' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__inner container">
      <!-- Phase 6: 2 列布局（Sitemap + About）— CREATIVE_DIRECTION §7.9 -->
      <div class="footer__main">
        <nav class="footer__col footer__sitemap" aria-label="站点导航">
          <p class="footer__col-title mono">// Sitemap</p>
          <ul class="footer__link-list">
            <li v-for="item in sitemap" :key="item.to">
              <RouterLink :to="item.to" class="footer__link">{{ item.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <div class="footer__col footer__about">
          <p class="footer__col-title mono">// About</p>
          <p class="footer__about-name">赖睿轩</p>
          <p class="footer__about-role">软件工程学生 · 后端开发 · 分布式系统</p>
          <a
            href="https://github.com/l535304334"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__link footer__github"
            aria-label="GitHub"
          >
            <Github :size="16" :stroke-width="1.75" aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      <!-- Phase 6: 底部版权栏 + 最后更新时间戳 -->
      <div class="footer__bottom">
        <span class="footer__copyright">© {{ year }} 赖睿轩</span>
        <span class="footer__separator" aria-hidden="true">·</span>
        <span class="footer__updated">
          最后更新
          <time :datetime="lastUpdated">{{ lastUpdatedDisplay }}</time>
        </span>
        <span class="footer__separator" aria-hidden="true">·</span>
        <span class="footer__tech mono">Built with Vue 3 + TypeScript + Vite</span>
        <span class="footer__separator" aria-hidden="true">·</span>
        <span class="footer__commit mono">commit {{ gitCommit }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Phase 6: Grid Pattern Underlay（Signature 4）— CREATIVE_DIRECTION §6.3 #4 / §7.9
 * CSS background-image + linear-gradient 生成网格纹理（不引入新资源）
 * 不影响 LCP（纯 CSS background，无网络请求） */
.footer {
  border-top: 1px solid var(--color-border);
  background-color: var(--color-bg);
  background-image:
    linear-gradient(to right, var(--grid-pattern-color) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-pattern-color) 1px, transparent 1px);
  background-size: var(--grid-pattern-size) var(--grid-pattern-size);
  padding: var(--space-12) 0 var(--space-6);
  margin-top: auto;
}

.footer__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

/* Phase 6: 2 列布局（Sitemap + About）— CREATIVE_DIRECTION §7.9 */
.footer__main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
}

.footer__col-title {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-4);
}

/* --- Sitemap --- */
.footer__link-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: var(--space-2) var(--space-4);
}

/* --- About --- */
.footer__about-name {
  font-size: var(--text-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.footer__about-role {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-4);
}

.footer__github {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

/* --- Underline Reveal（Signature 9）— CREATIVE_DIRECTION §6.3 #9 / §4.7 交互验收
 * hover 时下划线从左展开 */
.footer__link {
  position: relative;
  display: inline-block;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-fast);
}

.footer__link:hover,
.footer__link:focus-visible {
  color: var(--color-text-primary);
}

.footer__link:hover::after,
.footer__link:focus-visible::after {
  transform: scaleX(1);
}

/* --- 底部版权栏 --- */
.footer__bottom {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.footer__separator {
  color: var(--color-text-muted);
  opacity: 0.5;
}

.footer__tech {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* 批次1-P6: commit hash 样式（复用 tech 样式，略降权重） */
.footer__commit {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  opacity: 0.75;
}

/* Phase 6: 响应式 — 移动端单列（READINESS §4.7 响应式验收） */
@media (max-width: 640px) {
  .footer__main {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .footer__link-list {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-1);
  }
}
</style>
