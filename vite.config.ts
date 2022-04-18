import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import postcss from './postcss.config.js'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2015'
  },
  plugins: [svelte()],
  css: {
    postcss
  }
})
