# @alphacifer/biome

Shared [Biome](https://biomejs.dev) configuration for high-performance formatting, import organization, and linting across Alpha's projects.

## Installation

```sh
pnpm add -D @biomejs/biome @alphacifer/biome
```

---

## Configuration

Create a `biome.json` file in the root of your project and extend the preset:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.5.7/schema.json",
  "extends": [
    "@alphacifer/biome/config"
  ]
}
```

---

## VSCode Settings

To configure the official [Biome VSCode extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) with automatic import organization, attribute/key/property sorting, and fix-all on save:

```json
// .vscode/settings.json
{
  "js/ts.preferences.importModuleSpecifier": "shortest",
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[html]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[vue]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "editor.codeActionsOnSave": {
    "source.action.useSortedKeys.biome": "explicit",
    "source.action.useSortedAttributes.biome": "explicit",
    "source.action.useSortedProperties.biome": "explicit",
    "source.organizeImports.biome": "explicit",
    "source.fixAll.biome": "explicit"
  }
}
```
