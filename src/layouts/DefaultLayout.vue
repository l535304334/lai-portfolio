<script setup lang="ts">
import NavBar from '@/components/common/NavBar.vue'
import Footer from '@/components/common/Footer.vue'
import BackToTop from '@/components/common/BackToTop.vue'
</script>

<template>
  <div class="layout">
    <NavBar />
    <main class="layout__main">
      <RouterView v-slot="{ Component }">
        <Transition name="page">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout__main {
  flex: 1 0 auto;
  width: 100%;
}

/* 简单的页面过渡：fade（不喧宾夺主，符合 Developer Academic） */
.page-enter-active,
.page-leave-active {
  transition: opacity var(--transition-fast);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
