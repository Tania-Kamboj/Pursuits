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
})