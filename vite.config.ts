import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Path alias — import from '@/components/...' instead of '../../components/...'
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Base path — '/' for custom domain, '/professional-portfolio/' for GitHub Pages
  base: "/",
})