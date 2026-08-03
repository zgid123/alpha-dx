import { defineConfig } from 'oxfmt';

export default defineConfig({
  ignorePatterns: [
    '**/node_modules/**/*.ts',
    '**/node_modules/**/*.tsx',
    '**/routeTree.gen.ts',
  ],
  jsxSingleQuote: true,
  overrides: [
    {
      files: ['**/*.json', '**/*.jsonc'],
      options: {
        printWidth: 10,
      },
    },
  ],
  printWidth: 80,
  singleQuote: true,
  sortImports: {
    groups: [
      ['builtin', 'external'],
      {
        newlinesBetween: true,
      },
      ['internal', 'subpath'],
      {
        newlinesBetween: true,
      },
      ['parent', 'sibling', 'index', 'style', 'unknown'],
    ],
    newlinesBetween: false,
  },
  sortPackageJson: false,
  tabWidth: 2,
  useTabs: false,
});
