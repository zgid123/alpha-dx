All biome for Alpha's projects.

# Installation

```sh
pnpm add -D @biomejs/biome @alphacifer/biome
```

# Usage

Create `biome.json` at root folder

```json
{
  "$schema": "https://biomejs.dev/schemas/2.1.4/schema.json",
  "extends": ["@alphacifer/biome/config"]
}
```

# VSCode configuration

```json
{
  "editor.codeActionsOnSave": {
    "source.action.useSortedKeys.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```
