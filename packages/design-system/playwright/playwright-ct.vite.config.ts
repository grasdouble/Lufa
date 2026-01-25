import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Vite config for Playwright Component Testing
 *
 * This config is used by Playwright to bundle test components.
 * It ensures external dependencies like lucide-react are properly resolved.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure lucide-react resolves correctly
      'lucide-react': 'lucide-react',
    },
  },
  build: {
    rollupOptions: {
      // Don't externalize lucide-react in test builds
      external: [],
    },
  },
});
