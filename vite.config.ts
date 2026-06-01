import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// Base path for GitHub Pages.
// - Local dev / custom domain (imcmotor.hu): '/'
// - GitHub project pages (user.github.io/<repo>): set BASE_PATH=/<repo>/
//   The deploy workflow sets this automatically from the repo name.
const base = process.env.BASE_PATH ?? '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
