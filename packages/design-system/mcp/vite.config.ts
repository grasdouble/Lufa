import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      name: 'LufaDesignSystemMcp',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', '@grasdouble/lufa_design-system-primitives', '@grasdouble/lufa_design-system-tokens'],
    },
  },
});
