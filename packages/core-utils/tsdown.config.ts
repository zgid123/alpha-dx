import { defineConfig } from 'tsdown/config';

export default defineConfig({
  dts: true,
  clean: true,
  outDir: 'lib',
  format: 'esm',
  entry: [
    'src/arrayUtils.ts',
    'src/dateUtils.ts',
    'src/index.ts',
    'src/objectUtils.ts',
    'src/remeda.ts',
    'src/stringUtils.ts',
    'src/uniqid.ts',
    'src/urlUtils.ts',
  ],
});
