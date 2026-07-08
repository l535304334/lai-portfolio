<script setup lang="ts">
import { computed } from 'vue'
import { Monitor, Moon, Sun } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const { mode, cycleMode } = useTheme()

const icon = computed(() => {
  switch (mode.value) {
    case 'light':
      return Sun
    case 'dark':
      return Moon
    case 'system':
      return Monitor
  }
})

const label = computed(() => {
  switch (mode.value) {
    case 'light':
      return '当前：亮色（点击切换到暗色）'
    case 'dark':
      return '当前：暗色（点击切换到跟随系统）'
    case 'system':
      return '当前：跟随系统（点击切换到亮色）'
  }
})
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="label"
    :title="label"
    @click="cycleMode"
  >
    <component :is="icon" :size="18" :stroke-width="1.75" aria-hidden="true" />
  </button>
</template>

<style scoped>
.theme-toggle {
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

.theme-toggle:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
