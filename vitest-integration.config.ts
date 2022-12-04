/// <reference types="vitest" />
/// <reference types="jest-extended" />

// Configure Vitest (https://vitest.dev/config/)

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['jest-extended/all'],
    coverage: {
      reporter: ['clover', 'text'],
      reportsDirectory: './test-report/coverage'
    },
    include: ['src/**/integration.test.ts']
  }
});
