<script setup lang="ts">
import { ArrowRight, ArrowDown, Github } from 'lucide-vue-next'

interface HeroStat {
  value: string
  label: string
}

const stats: HeroStat[] = [
  { value: '3', label: '完整项目' },
  { value: '218', label: '源文件' },
  { value: '97', label: 'API 端点' },
  { value: '236', label: '测试用例' },
]
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container hero__grid">
      <div class="hero__main">
        <p class="hero__eyebrow mono">// 赖睿轩 · 软件工程学生</p>

        <h1 id="hero-title" class="hero__title">
          客户端 · Serverless · 分布式系统<br />
          <span class="hero__title-accent">三类工程实践</span>
        </h1>

        <p class="hero__subtitle">
          三个完整项目，覆盖客户端存储、AI 工程化、并发控制三类工程问题。<br />
          从需求到测试，独立完成全流程。
        </p>

        <div class="hero__actions">
          <a href="#projects" class="hero__cta hero__cta--primary">
            浏览项目
            <ArrowRight :size="16" :stroke-width="2" aria-hidden="true" />
          </a>
          <a
            href="https://github.com/l535304334"
            target="_blank"
            rel="noopener noreferrer"
            class="hero__cta hero__cta--ghost"
          >
            <Github :size="16" :stroke-width="1.75" aria-hidden="true" />
            GitHub
          </a>
        </div>
      </div>

      <aside class="hero__stats">
        <p class="hero__stats-label mono">// 工程规模</p>
        <dl class="hero__stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="hero__stat">
            <dt class="hero__stat-value mono">{{ stat.value }}</dt>
            <dd class="hero__stat-label">{{ stat.label }}</dd>
          </div>
        </dl>
      </aside>
    </div>

    <a href="#projects" class="hero__scroll" aria-label="向下滚动到项目">
      <ArrowDown :size="14" :stroke-width="2" aria-hidden="true" />
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: var(--space-20) 0 var(--space-16);
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  align-items: center;
  flex: 1;
}

.hero__eyebrow {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
  margin-bottom: var(--space-5);
}

.hero__title {
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.02em;
  line-height: var(--leading-heading);
  margin-bottom: var(--space-6);
}

.hero__title-accent {
  color: var(--color-accent);
}

.hero__subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  max-width: 32rem;
  margin-bottom: var(--space-8);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition:
    transform var(--transition-fast),
    background-color var(--transition-fast),
    color var(--transition-fast),
    border-color var(--transition-fast);
}

.hero__cta--primary {
  background-color: var(--color-accent);
  color: var(--color-on-accent);
}

.hero__cta--primary:hover {
  background-color: var(--color-accent-strong);
  color: var(--color-on-accent);
  transform: translateY(-1px);
}

.hero__cta--ghost {
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  background-color: var(--color-surface);
}

.hero__cta--ghost:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* Stats panel — code-style aside with stronger elevation */
.hero__stats {
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.hero__stats-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.hero__stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4) var(--space-6);
}

.hero__stat-value {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: 1.2;
}

.hero__stat-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: var(--space-1);
}

/* Scroll hint */
.hero__scroll {
  position: absolute;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: var(--color-text-muted);
  transition:
    color var(--transition-fast),
    transform var(--transition-fast);
  animation: heroScrollBob 2s ease-in-out infinite;
}

.hero__scroll:hover {
  color: var(--color-accent);
}

@keyframes heroScrollBob {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(4px); }
}

/* Desktop: asymmetric 2-column layout */
@media (min-width: 768px) {
  .hero__grid {
    grid-template-columns: 7fr 5fr;
    gap: var(--space-16);
  }

  .hero__title {
    font-size: var(--text-5xl);
  }

  .hero__stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__scroll {
    animation: none;
  }

  .hero__cta--primary:hover {
    transform: none;
  }
}
</style>
