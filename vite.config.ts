import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const { LA_BACKEND_URL } = loadEnv(mode, '.', 'LA_')
  const backend = LA_BACKEND_URL || 'http://127.0.0.1:8000'
  const target = { target: backend, changeOrigin: false }
  const proxy = { '/api': target, '/office/': target, '/static/': target }
  return { plugins: [react()], server: { proxy }, preview: { proxy } }
})
