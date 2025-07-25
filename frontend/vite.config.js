import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 스프링 서버 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

