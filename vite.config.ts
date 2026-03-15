import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    watch: {
      // Vite reloads the browser whenever public/ files change.
      // Exclude the labuladong markdown archive (466 static .md files)
      // so crawl runs never trigger page reloads.
      ignored: ['**/public/labuladong/**'],
    },
  },
})
