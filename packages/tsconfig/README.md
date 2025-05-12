All tsconfig for Alpha's projects.

# Introduction

- `base.json`: base config for root monorepo
- `cmj.json`: for all packages that are commonjs in monorepo
- `es.json`: for all packages that are esm in monorepo
- `nest.json`: for all NestJS projects in monorepo
- `next-app.json`: for all NextJS projects in monorepo
- `react-app.json`: for all React projects in monorepo
- `react.json`: for all packages support React in monorepo

# Usage

```json
{
  "extends": "@alphacifer/tsconfig/base"
}
```
