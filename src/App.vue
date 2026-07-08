<script setup lang="ts">
import { onMounted } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useTheme } from '@/composables/useTheme'

const { ensureListener } = useTheme()

onMounted(() => {
  ensureListener()
})
</script>

<template>
  <DefaultLayout />
</template>
