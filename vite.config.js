import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/admin/',  // This ensures assets are loaded from /admin/ subdirectory
  plugins: [react()],
})
