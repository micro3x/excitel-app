import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr(), react()],
  test: {
    setupFiles: ['test.setup.ts'],
    include: ['**/*.test.tsx', '**/*.test.ts'],
    globals: true,
    environment: 'jsdom',
  },
});
