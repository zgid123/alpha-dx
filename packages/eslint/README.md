All eslint for Alpha's projects.

# Introduction

- `base.js`: basic config for all projects
- `next.js`: config for all Next.js projects
- `react-app.js`: config for all React App projects
- `react.js`: config for all React packages/apps

# Usage

Set `"type": "module"` for root `package.json`

## Installation

```sh
pnpm add -D eslint @alphacifer/eslint typescript-eslint
```

## Apply configuration

```js
import tsEslint from 'typescript-eslint';
import baseLint from '@alphacifer/eslint/base';
import nextLint from '@alphacifer/eslint/next';
import reactLint from '@alphacifer/eslint/react';
import reactAppLint from '@alphacifer/eslint/react-app';

export default tsEslint.config(
  {
    ...baseLint,
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
  },
  {
    ...reactLint,
    files: [
      'packages/@react/**/*.ts',
      'packages/@react/**/*.tsx',
      'workspaces/**/*.ts',
      'workspaces/**/*.tsx',
    ],
  },
  {
    ...reactAppLint,
    files: ['workspaces/**/*.ts', 'workspaces/**/*.tsx'],
    ignores: [
      'workspaces/<next-project>/**/*.ts',
      'workspaces/<next-project>/**/*.tsx',
    ],
  },
  ...nextLint.map((config) => {
    return {
      ...config,
      files: [
        'workspaces/<next-project>/**/*.ts',
        'workspaces/<next-project>/**/*.tsx',
      ],
    };
  }),
);
```
