import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

const resolve = (path: string) => 
  fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@features': resolve('./src/features'),
      '@shared': resolve('./src/shared'),
      '@pages': resolve('./src/pages'),
      '@app': resolve('./src/app'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor'
            }
            if (id.includes('lucide-react')) {
              return 'icons'
            }
          }
        },
      },
    },
  }
})