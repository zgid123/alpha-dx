import globals from 'globals';
import tsEslint from 'typescript-eslint';
import baseLint from '@alphacifer/eslint/base';

export default tsEslint.config(
  {
    ...baseLint,
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.vitest,
        HeadersInit: true,
      },
    },
  },
);
