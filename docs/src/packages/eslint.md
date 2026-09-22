# @alphacifer/eslint

Curated flat ESLint configurations for Alpha's projects, supporting Node.js, Next.js, and React.

## Configurations

- `@alphacifer/eslint/base`: Base ESLint rules for all TypeScript and JavaScript codebases.
- `@alphacifer/eslint/next`: Specialized configuration for Next.js applications.
- `@alphacifer/eslint/react`: Rules for React libraries and design systems.
- `@alphacifer/eslint/react-app`: Rules for standalone React Single Page Applications.

---

## Installation

Ensure your `package.json` sets `"type": "module"`, then install the dependencies:

```sh
pnpm add -D eslint @alphacifer/eslint typescript-eslint
```

---

## Configuration Example

Create an `eslint.config.js` in your root folder:

```js
import baseLint from '@alphacifer/eslint/base';
import nextLint from '@alphacifer/eslint/next';
import reactLint from '@alphacifer/eslint/react';
import reactAppLint from '@alphacifer/eslint/react-app';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  {
    ...baseLint,
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
  },
  {
    ...reactLint,
    files: ['packages/@react/**/*.ts', 'packages/@react/**/*.tsx'],
  },
  {
    ...reactAppLint,
    files: ['apps/web/**/*.ts', 'apps/web/**/*.tsx'],
    ignores: ['apps/next-app/**/*.ts', 'apps/next-app/**/*.tsx'],
  },
  ...nextLint.map((config) => {
    return {
      ...config,
      files: ['apps/next-app/**/*.ts', 'apps/next-app/**/*.tsx'],
    };
  }),
);
```
