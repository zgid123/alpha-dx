import { defineConfig } from 'tsdown/config';

export default defineConfig({
  clean: true,
  deps: {
    neverBundle: ['oxfmt', 'oxlint'],
  },
  dts: true,
  entry: [
    'src/naming-plugin.ts',
    'src/oxfmt.config.ts',
    'src/oxlint.config.ts',
  ],
  format: 'esm',
  outDir: 'lib',
});
