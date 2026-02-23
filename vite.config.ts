import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    // Enables globals: describe, it, expect, vi without imports in every test file
    globals: true,

    // Critical: browser-like DOM environment (required for React + RTL + antd)
    environment: 'jsdom',

    // Points to your setup file with RTL matchers + mocks for matchMedia / ResizeObserver
    setupFiles: './src/setupTests.ts',

    // Optional but recommended:
    // - Include CSS in snapshots if you snapshot components
    // - Useful for antd styles or CSS modules
    css: true,

    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/*.d.ts',
      '**/*.config.*',
    ],

    // Optional: coverage report (run with npm run test:coverage)
    coverage: {
      provider: 'v8',           // or 'istanbul'
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/**', 'src/setupTests.ts'],
    },

    // Optional: if you want to mock more globals or env vars
    // env: {
    //   VITE_SOME_VAR: 'test-value',
    // },
  },
})