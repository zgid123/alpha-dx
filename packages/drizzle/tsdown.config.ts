import { defineConfig } from 'tsdown/config';

const external = [
  'drizzle-kit',
  'drizzle-orm',
  'drizzle-orm/node-postgres',
  'drizzle-orm/node-postgres/migrator',
  'drizzle-orm/pg-core',
  'pg',
];

export default defineConfig([
  {
    dts: true,
    clean: true,
    outDir: 'lib',
    format: ['esm', 'cjs'],
    external,
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
    external,
    entry: {
      cli: 'src/cli/index.ts',
    },
  },
]);
