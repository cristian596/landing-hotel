import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import seoPlugin from './seo-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
})
