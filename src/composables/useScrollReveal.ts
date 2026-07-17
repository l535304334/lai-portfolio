/**
 * useScrollReveal — Scroll Reveal composable
 *
 * 权威来源：
 * - 《Portfolio_v3.5_CREATIVE_DIRECTION.md》§4 Motion Language
 * - 《Portfolio_v3.5_IMPLEMENTATION_PLAN.md》§3 Motion System
 * - 《Portfolio_v3.5_IMPLEMENTATION_READINESS.md》§7.6 IntersectionObserver 失败 fallback
 *
 * 设计原则：
 * 1. 默认 opacity:1（CSS 初始值）— JS 失败 / IntersectionObserver 不支持时元素仍可见
 * 2. 仅在 IntersectionObserver 成功注册后才设置 data-reveal="ready"
 *    CSS 据此设置 opacity:0 + transform，准备入场动画
 * 3. 元素进入视口后将 data-reveal 改为 "visible"（保留属性，transition 持续生效）
 *    Phase 1 修复：原 removeAttribute 会导致 transition 消失，元素瞬间跳变
 * 4. 尊重 prefers-reduced-motion：reduced-motion 用户跳过 ready 状态，直接可见
 * 5. 不支持 IntersectionObserver 的浏览器：直接可见
 * 6. once=true（默认）：元素显示后 unobserve，不再监听
 *
 * Phase 1 状态：基础设施已修复，开始应用到全站组件
 */

import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export interface ScrollRevealOptions {
  /** 进入视口阈值（0-1），默认 0.2（元素 20% 可见时触发） */
  threshold?: number
  /** IntersectionObserver rootMargin，默认 '0px 0px -10% 0px'（底部预留 10%） */
  rootMargin?: string
  /** 是否只触发一次，默认 true（显示后 unobserve） */
  once?: boolean
  /** stagger 延迟（ms），默认 0（用于错峰入场） */
  delay?: number
}

export interface ScrollRevealReturn {
  /** 绑定到目标元素的 ref（template 中 ref="target"） */
  target: Ref<HTMLElement | null>
  /** 元素是否已可见（进入视口或 fallback） */
  isVisible: Ref<boolean>
}

/**
 * Scroll Reveal composable
 *
 * 使用方式（Phase 1+ 才应用，Phase 0 不应用到任何组件）：
 *
 * ```vue
 * <script setup lang="ts">
 * import { useScrollReveal } from '@/composables/useScrollReveal'
 * const { target } = useScrollReveal()
 * </script>
 *
 * <template>
 *   <section ref="target" data-reveal-direction="up">
 *     ...
 *   </section>
 * </template>
 * ```
 *
 * 工作流程：
 * 1. 组件挂载 → onMounted 检查 reduced-motion / IntersectionObserver 支持
 * 2. 支持 → 设置 data-reveal="ready"（CSS 设置 opacity:0 + transform）
 * 3. 创建 IntersectionObserver 监听目标元素
 * 4. 元素进入视口 → 设置 data-reveal="visible"（CSS transition/animation 回到 opacity:1 + transform: none）
 * 5. once=true → unobserve，不再监听
 * 6. 组件卸载 → onUnmounted disconnect observer
 *
 * Stagger Group 模式（v-for 列表）：
 * - 父元素加 data-stagger-group 属性，子元素加 :data-stagger-index="index"
 * - composable 只需绑定父元素 ref
 * - CSS 用 animation（非 transition）错峰入场，避免与子项 scoped transition 冲突
 *
 * ```vue
 * <div ref="grid" data-stagger-group>
 *   <div v-for="(item, i) in items" :key="item.id" :data-stagger-index="i">...</div>
 * </div>
 * ```
 */
export function useScrollReveal(options: ScrollRevealOptions = {}): ScrollRevealReturn {
  const {
    threshold = 0.2,
    rootMargin = '0px 0px -10% 0px',
    once = true,
    delay = 0,
  } = options

  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null
  let delayTimer: number | null = null

  onMounted(() => {
    const el = target.value
    if (!el) return

    // 1. reduced-motion 用户：直接显示，不应用任何入场动画
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isVisible.value = true
      return
    }

    // 2. 不支持 IntersectionObserver 的浏览器：直接显示（fallback）
    if (!('IntersectionObserver' in window)) {
      isVisible.value = true
      return
    }

    // 3. 标记为 ready（CSS 据此设置 opacity:0 + transform，准备入场）
    el.setAttribute('data-reveal', 'ready')

    // 4. 创建 observer 监听元素进入视口
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const show = () => {
              isVisible.value = true
              // 将 data-reveal 改为 'visible'（保留属性，transition 持续生效）
              // Phase 1 修复：原 removeAttribute 会导致 transition 消失，元素瞬间跳变
              el.setAttribute('data-reveal', 'visible')
            }

            // 应用 stagger 延迟（用于错峰入场）
            if (delay > 0) {
              delayTimer = window.setTimeout(show, delay)
            } else {
              show()
            }

            // once=true：显示后不再监听
            if (once && observer) {
              observer.unobserve(entry.target)
            }
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
  })

  onUnmounted(() => {
    // 清理 delay timer
    if (delayTimer !== null) {
      window.clearTimeout(delayTimer)
      delayTimer = null
    }
    // 清理 observer
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return { target, isVisible }
}