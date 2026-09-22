All biome for Alpha's projects.

# Installation

```sh
pnpm add -D @biomejs/biome @alphacifer/biome
```

# Usage

Create `biome.json` at root folder
 
 ```json
 {
   "$schema": "https://biomejs.dev/schemas/2.5.7/schema.json",
   "extends": [
     "@alphacifer/biome/config"
   ]
 }
 ```
 
 # VSCode configuration
 
 ```json
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
