import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: './',
  resolve: {
    
  },
  css: {
    preprocessorOptions: {
      sass: {
        // 引入公共样式
        additionalData: `@import "./src/assets/scss/common.scss"`
      }
    }
  },
})
