import { defineConfig } from 'tsdown/config';

export default defineConfig({
  dts: true,
  clean: true,
  outDir: 'lib',
  format: ['esm', 'cjs'],
  entry: ['src/core/index.ts', 'src/testing/index.ts'],
});
