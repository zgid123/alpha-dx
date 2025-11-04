import { defineConfig } from 'tsdown/config';

export default defineConfig({
  dts: true,
  clean: true,
  outDir: 'lib',
  format: ['esm', 'cjs'],
  entry: [
    'src/config.ts',
    'src/core.ts',
    'src/factory.ts',
    'src/pg.ts',
    'src/testing.ts',
  ],
});
