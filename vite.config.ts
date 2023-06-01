import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@app': '/src/app',
      '@pages': '/src/pages',
      '@layouts': '/src/layouts',
      '@components': '/src/components',
      '@shared': '/src/shared',
      '@store': '/src/store',
    },
  },
  plugins: [react()],
})
