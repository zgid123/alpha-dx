import { defineConfig } from 'tsdown/config';

export default defineConfig({
  dts: true,
  clean: true,
  outDir: 'lib',
  format: 'esm',
  external: [
    '@tanstack/react-query',
    '@tanstack/react-query-devtools',
    'immer',
    'react',
    'remeda',
    'zustand',
    'zustand/middleware',
    'zustand/middleware/immer',
    'zustand/react/shallow',
    'zustand/shallow',
  ],
  entry: ['src/query/index.ts', 'src/zustand/index.ts'],
});
