import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { contentPlugin } from './src/utils/content'

/**
 * Phase 6: Git Last Updated 时间戳注入
 * 权威来源：CREATIVE_DIRECTION §7.9 / READINESS §3.8 风险缓解
 * - 优先使用 git 最后提交时间（ISO 8601）
 * - Vercel 构建环境无 git 访问时 fallback 到 build time
 * - 通过 define 注入全局常量 __LAST_UPDATED__
 */
function getLastUpdated(): string {
  try {
    // %cI = committer date, strict ISO 8601 格式
    const gitDate = execSync('git log -1 --format=%cI', {
      encoding: 'utf8',
      timeout: 3000,
    }).trim()
    if (gitDate) return gitDate
  } catch {
    // git 不可用（Vercel 构建环境 / 无 git 仓库）— fallback 到 build time
  }
  return new Date().toISOString()
}

/**
 * 批次1-P6: Git Commit Hash 注入（短 hash）
 * - 优先使用 git 短 hash（7 位）
 * - Vercel 构建环境无 git 访问时 fallback 到 'dev'
 * - 强化"工程师的网站"气质（Creative Direction §7.9）
 */
function getGitCommit(): string {
  try {
    const hash = execSync('git rev-parse --short HEAD', {
      encoding: 'utf8',
      timeout: 3000,
    }).trim()
    if (hash) return hash
  } catch {
    // git 不可用 — fallback 到 'dev'
  }
  return 'dev'
}

export default defineConfig({
  plugins: [vue(), contentPlugin()],
  define: {
    __LAST_UPDATED__: JSON.stringify(getLastUpdated()),
    __GIT_COMMIT__: JSON.stringify(getGitCommit()),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
