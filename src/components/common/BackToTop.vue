<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const visible = ref(false)

function handleScroll() {
  visible.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="backtotop">
    <button
      v-if="visible"
      type="button"
      class="back-to-top"
      aria-label="回到顶部"
      title="回到顶部"
      @click="scrollToTop"
    >
      <ArrowUp :size="20" :stroke-width="1.75" aria-hidden="true" />
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: var(--space-6);
  bottom: var(--space-8);
  z-index: 50;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  box-shadow: var(--shadow-md);
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast),
    transform var(--transition-fast);
}

.back-to-top:hover {
  color: var(--color-accent);
  transform: translateY(-2px);
}

.back-to-top:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.backtotop-enter-active,
.backtotop-leave-active {
  transition:
    opacity var(--transition-fast),
    transform var(--transition-fast);
}

.backtotop-enter-from,
.backtotop-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 767px) {
  .back-to-top {
    right: var(--space-4);
    bottom: var(--space-6);
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
