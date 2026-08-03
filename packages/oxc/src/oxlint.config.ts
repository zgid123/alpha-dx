import { defineConfig } from 'oxlint';

const namingPluginUrl = './naming-plugin.mjs';
const namingPluginSpecifier = new URL(namingPluginUrl, import.meta.url).href;

export default defineConfig({
  categories: {
    correctness: 'error',
  },
  ignorePatterns: [
    '**/node_modules/**/*.ts',
    '**/node_modules/**/*.tsx',
    '**/routeTree.gen.ts',
  ],
  jsPlugins: [
    {
      name: 'alphacifer',
      specifier: namingPluginSpecifier,
    },
  ],
  overrides: [
    {
      files: ['**/*.astro', '**/*.svelte', '**/*.vue'],
      rules: {
        'no-unused-vars': 'off',
        'prefer-const': 'off',
        'typescript/consistent-type-imports': 'off',
      },
    },
  ],
  rules: {
    'alphacifer/class-name': 'error',
    'alphacifer/interface-prefix': 'error',
    'alphacifer/type-alias-prefix': 'error',
    'prefer-const': 'error',
    'typescript/consistent-type-imports': 'error',
    'unicorn/no-static-only-class': 'off',
  },
});
