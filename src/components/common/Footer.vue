<script setup lang="ts">
import { Github } from 'lucide-vue-next'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__left">
        <span class="footer__copyright">© {{ year }} 赖睿轩</span>
        <span class="footer__separator" aria-hidden="true">·</span>
        <span class="footer__tech">Built with Vue 3 + TypeScript + Vite</span>
      </div>

      <a
        href="https://github.com/l535304334"
        target="_blank"
        rel="noopener noreferrer"
        class="footer__github"
        aria-label="GitHub"
      >
        <Github :size="18" :stroke-width="1.75" aria-hidden="true" />
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  background-color: var(--color-bg);
  padding: var(--space-6) 0;
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.footer__left {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.footer__tech {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.footer__github {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.footer__github:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface);
}
</style>
