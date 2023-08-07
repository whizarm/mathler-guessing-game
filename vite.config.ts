/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), nodePolyfills()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['.vitest/setup'],
    include: ['**/*test.{ts,tsx}'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/config/variables.scss";`,
      },
    },
  },
});
