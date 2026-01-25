import { defineConfig } from 'tsdown/config';

export default defineConfig([
  {
    dts: true,
    clean: true,
    outDir: 'lib',
    format: ['esm', 'cjs'],
    external: ['drizzle-kit'],
    entry: [
      'src/config.ts',
      'src/core.ts',
      'src/factory.ts',
      'src/parser.ts',
      'src/pg.ts',
      'src/testing.ts',
    ],
  },
  {
    dts: true,
    clean: true,
    outDir: 'lib',
    format: 'esm',
    external: ['drizzle-kit'],
    entry: {
      cli: 'src/cli/index.ts',
    },
  },
]);
