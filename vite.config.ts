/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ['clover', 'text'],
      reportsDirectory: './test-report/coverage'
    }
  }
});
