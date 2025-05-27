import { defineConfig } from 'vite'

export default defineConfig({
  base: '/ecs-check-stock-price-app/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true
  }
})
