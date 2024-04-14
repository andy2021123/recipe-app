import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': {
        target: process.env.REACT_APP_PROXY || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      components: "/src/components",
      hooks: "/src/hooks",
      layout: "/src/layout",
      routes: "/src/routes",
      style: "/src/style",
      utils: "/src/utils",
    }
  }
})

