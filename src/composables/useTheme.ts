import { computed, ref } from 'vue'

type ThemeMode = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'theme-mode'
const MEDIA_QUERY = '(prefers-color-scheme: dark)'

function readStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  } catch {
    // localStorage 不可用（隐私模式等），回退到 system
  }
  return 'system'
}

function readSystemDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(MEDIA_QUERY).matches
}

// 模块级单例状态：所有组件共享同一份主题
const mode = ref<ThemeMode>(readStoredMode())
const systemPrefersDark = ref<boolean>(readSystemDark())

const resolved = computed<ResolvedTheme>(() => {
  if (mode.value === 'system') {
    return systemPrefersDark.value ? 'dark' : 'light'
  }
  return mode.value
})

let listenerAttached = false

function applyTheme() {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', resolved.value)
}

function ensureListener() {
  if (listenerAttached || typeof window === 'undefined') return
  listenerAttached = true

  applyTheme()

  const mediaQuery = window.matchMedia(MEDIA_QUERY)
  mediaQuery.addEventListener('change', (e: MediaQueryListEvent) => {
    systemPrefersDark.value = e.matches
    if (mode.value === 'system') {
      applyTheme()
    }
  })
}

function setMode(newMode: ThemeMode) {
  mode.value = newMode
  try {
    localStorage.setItem(STORAGE_KEY, newMode)
  } catch {
    // 写入失败可忽略，内存状态仍生效
  }
  applyTheme()
}

function cycleMode() {
  const order: ThemeMode[] = ['system', 'light', 'dark']
  const currentIndex = order.indexOf(mode.value)
  const nextIndex = (currentIndex + 1) % order.length
  setMode(order[nextIndex]!)
}

export function useTheme() {
  return {
    mode: computed(() => mode.value),
    resolved,
    setMode,
    cycleMode,
    ensureListener,
  }
}
