import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  base: "/",

  // ── Dev server config ─────────────────────────────────────
  server: {
    port: 5174, // Changed from default 5173
  },
})