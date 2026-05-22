import { defineConfig } from 'tsdown/config';

export default defineConfig({
  dts: true,
  clean: true,
  outDir: 'lib',
  format: ['esm', 'cjs'],
  external: [
    '@hono/standard-validator',
    '@hono/zod-validator',
    'arktype',
    'hono',
    'zod',
  ],
  entry: [
    'src/arktype-validator/index.ts',
    'src/core/index.ts',
    'src/testing/index.ts',
    'src/zod-validator/index.ts',
  ],
});
