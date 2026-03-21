import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  optimizeDeps: {
    // sql.js loads a WASM file at runtime via its own locateFile mechanism.
    // Pre-bundling it with esbuild breaks that mechanism, causing the browser
    // to receive an HTML 404 page instead of the WASM binary.
    exclude: ['sql.js'],
  },
  server: {
    port: 5173,
    watch: {
      // Vite reloads the browser whenever public/ files change.
      // Exclude the algorithm-study-note markdown archive (466 static .md files)
      // so crawl runs never trigger page reloads.
      ignored: ['**/public/algorithm-study-note/**'],
    },
  },
})
