All Oxc for Alpha's projects.

# Installation

```sh
pnpm add -D @alphacifer/oxc oxfmt oxlint
```

# Usage

## Oxlint

### Default usage

Create `oxlint.config.ts` at root folder

```ts
export { default } from '@alphacifer/oxc/oxlint';
```

### Custom usage

Extend the default configuration and add project-specific options:

```ts
import config from '@alphacifer/oxc/oxlint';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [config],
  rules: {
    'no-console': 'error',
  },
});
```

## Oxfmt

### Default usage

Create `oxfmt.config.ts` at root folder

```ts
export { default } from '@alphacifer/oxc/oxfmt';
```

### Custom usage

Spread the default configuration and override project-specific options:

```ts
import config from '@alphacifer/oxc/oxfmt';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...config,
  printWidth: 100,
});
```

# VSCode configuration

```json
{
  "editor.defaultFormatter": "oxc.oxc-vscode"
}
```
