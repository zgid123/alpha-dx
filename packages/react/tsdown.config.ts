import { defineConfig } from 'tsdown/config';

export default defineConfig({
  dts: true,
  clean: true,
  outDir: 'lib',
  format: 'esm',
  entry: ['src/query/index.ts', 'src/zustand/index.ts'],
});
