# @alphacifer/oxc

Shared configurations for the [OXC](https://oxc.rs) toolchain, providing presets for Oxlint and Oxfmt.

## Installation

```sh
pnpm add -D @alphacifer/oxc oxfmt oxlint
```

---

## Oxlint

### Default Configuration

Create `oxlint.config.ts` in your root directory:

```ts
export { default } from '@alphacifer/oxc/oxlint';
```

### Custom Configuration

Extend the preset and add project-specific overrides:

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

---

## Oxfmt

### Default Configuration

Create `oxfmt.config.ts` in your root directory:

```ts
export { default } from '@alphacifer/oxc/oxfmt';
```

### Custom Configuration

Spread the preset and override formatting preferences:

```ts
import config from '@alphacifer/oxc/oxfmt';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...config,
  printWidth: 100,
});
```

---

## VSCode Settings

Set OXC as your default formatter in VSCode:

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "oxc.oxc-vscode"
}
```
