import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
  rolldownOptions: {
    output: {
      manualChunks: {
        'asciify-studio': ['asciify-engine/studio'],
      },
    },
  },
})
