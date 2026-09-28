import { defineConfig } from 'tsdown/config';

export default defineConfig({
  dts: true,
  clean: true,
  outDir: 'lib',
  format: 'esm',
  external: [
    'immer',
    'react',
    'remeda',
    'zustand',
    'zustand/middleware',
    'zustand/middleware/immer',
    'zustand/react/shallow',
    'zustand/shallow',
  ],
  entry: ['src/zustand/index.ts'],
});
