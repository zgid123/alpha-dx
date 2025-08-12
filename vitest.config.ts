import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/lib/**', 'packages/core-utils/src/uniqid.ts'],
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
    globals: true,
    include: ['**/__tests__/**/*.spec.ts'],
    reporters: 'verbose',
  },
});
