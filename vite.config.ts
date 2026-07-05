import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import adminPlugin from './scripts/admin-plugin.mjs'

// Base "./" giúp web chạy được ở mọi thư mục con trên Hostinger (public_html hoặc subfolder)
export default defineConfig({
  base: './',
  plugins: [react(), adminPlugin()],
  server: {
    // Ưu tiên cổng do công cụ preview cấp qua PORT; không có thì dùng 5173
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
