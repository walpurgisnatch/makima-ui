import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@app': '/src/app',
      '@pages': '/src/pages',
      '@layouts': '/src/layouts',
      '@widgets': '/src/widgets',
      '@components': '/src/components',
      '@shared': '/src/shared',
      '@store': '/src/store',
    },
  },
  plugins: [react()],
});
