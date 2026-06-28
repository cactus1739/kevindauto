import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base "./" giúp web chạy được ở mọi thư mục con trên Hostinger (public_html hoặc subfolder)
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
