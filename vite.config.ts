import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // Setting base to './' ensures assets are loaded relatively, 
    // which fixes 404 errors on GitHub Pages without needing to know the repo name.
    base: './',
  }
})