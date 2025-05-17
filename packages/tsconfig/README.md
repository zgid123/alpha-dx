All tsconfig for Alpha's projects.

# Introduction

- `base.json`: base config for root monorepo
- `cmj.json`: for all packages that are commonjs in monorepo
- `es.json`: for all packages that are esm in monorepo
- `hono.json`: for all Hono projects in monorepo
- `nest.json`: for all NestJS projects in monorepo
- `next-app.json`: for all NextJS projects in monorepo
- `react-app.json`: for all React projects in monorepo
- `react.json`: for all packages support React in monorepo

# Usage

- base

```json
{
  "extends": "@alphacifer/tsconfig/base"
}
```

- cmj

```json
{
  "extends": "@alphacifer/tsconfig/cmj",
  "compilerOptions": {
    "outDir": "lib"
  },
  "include": ["src"],
  "exclude": ["lib", "node_modules"]
}
```

- es

```json
{
  "extends": "@alphacifer/tsconfig/esm",
  "compilerOptions": {
    "declaration": true,
    "outDir": "lib"
  },
  "include": ["src"],
  "exclude": ["lib", "node_modules"]
}
```

- hono

```json
{
  "extends": "@alphacifer/tsconfig/hono",
  "compilerOptions": {
    "baseUrl": "src",
    "outDir": "dist"
  },
  "include": ["src"]
}
```

- nest

```json
{
  "extends": "@alphacifer/tsconfig/nest",
  "compilerOptions": {
    "baseUrl": "src",
    "outDir": "dist"
  },
  "include": ["src"]
}
```

- next-app

```json
{
  "extends": "@alphacifer/tsconfig/next-app",
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "~/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

- react-app

```json
{
  "extends": "@alphacifer/tsconfig/react-app",
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"],
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
```

- react

```json
{
  "extends": "@alphacifer/tsconfig/react",
  "compilerOptions": {
    "declaration": true,
    "outDir": "lib"
  },
  "include": ["src"],
  "exclude": ["lib", "node_modules"]
}
```
