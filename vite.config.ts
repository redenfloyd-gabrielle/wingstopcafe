import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const env = loadEnv('', process.cwd())
console.log(env)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    port: 5174,
    proxy: {
      "/api/": { target: env.VITE_PROXY, secure: false, changeOrigin: true },
      "/cas/": { target: env.VITE_PROXY, secure: false },
      "/default": { target: env.VITE_PROXY, secure: false },
      "/user/": { target: env.VITE_PROXY, secure: false },
      "/admin/": { target: env.VITE_PROXY, secure: false },
      "/static/": { target: env.VITE_PROXY, secure: false },
    },
  }
})
