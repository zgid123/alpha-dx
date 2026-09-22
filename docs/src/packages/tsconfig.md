# @alphacifer/tsconfig

Curated TypeScript compiler configuration presets for Alpha's monorepo packages, web apps, backend microservices, and desktop plugins.

## Installation

```sh
pnpm add -D @alphacifer/tsconfig typescript
```

---

## Available Presets

| Config File | Extends Target | Use Case |
| :--- | :--- | :--- |
| `tsconfig.base.json` | `@alphacifer/tsconfig/base` | Base configuration for monorepo root |
| `tsconfig.es.json` | `@alphacifer/tsconfig/esm` | Modern ES Module packages |
| `tsconfig.cmj.json` | `@alphacifer/tsconfig/cmj` | CommonJS output packages |
| `tsconfig.hono.json` | `@alphacifer/tsconfig/hono` | Hono HTTP servers and APIs |
| `tsconfig.elysia.json` | `@alphacifer/tsconfig/elysia` | ElysiaJS backend services |
| `tsconfig.nest.json` | `@alphacifer/tsconfig/nest` | NestJS backend applications |
| `tsconfig.next-app.json` | `@alphacifer/tsconfig/next-app` | Next.js App Router applications |
| `tsconfig.react.json` | `@alphacifer/tsconfig/react` | React libraries and component packages |
| `tsconfig.react-app.json` | `@alphacifer/tsconfig/react-app` | React SPA apps with Vite |
| `tsconfig.react-node.json` | `@alphacifer/tsconfig/react-node` | Vite node tooling (e.g. `vite.config.ts`) |
| `tsconfig.tanstack-start-app.json` | `@alphacifer/tsconfig/tanstack-start-app` | TanStack Start full-stack web applications |
| `tsconfig.tauri-plugin.json` | `@alphacifer/tsconfig/tauri-plugin` | Tauri desktop plugin guest code |

---

## Usage Examples

### 1. Base (`base`)

Root configuration providing baseline compiler options, strict type checking, and test types across the monorepo.

Create `tsconfig.json` in your monorepo root:

```json
{
  "extends": "@alphacifer/tsconfig/base"
}
```

---

### 2. ES Module Packages (`esm`)

For modern packages built with Bundler or ES Module emission.

Create `packages/<pkg-name>/tsconfig.json`:

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

---

### 3. CommonJS Packages (`cmj`)

For packages compiled to CommonJS format.

Create `packages/<pkg-name>/tsconfig.json`:

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

---

### 4. Hono Services (`hono`)

For backend APIs built with Hono, including Hono JSX support and `#/*` alias resolution.

Create `apps/api/tsconfig.json`:

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

---

### 5. ElysiaJS Services (`elysia`)

For backend microservices running on Bun with ElysiaJS, enabling source maps and `#/*` alias resolution.

Create `apps/service/tsconfig.json`:

```json
{
  "extends": "@alphacifer/tsconfig/elysia",
  "compilerOptions": {
    "baseUrl": "src",
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["lib", "node_modules"]
}
```

---

### 6. NestJS Applications (`nest`)

For NestJS enterprise applications requiring Node16 module resolution and decorator metadata.

Create `apps/server/tsconfig.json`:

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

---

### 7. Next.js Applications (`next-app`)

For Next.js App Router applications using the Next.js TypeScript plugin and JSX preserve mode.

Create `apps/web/tsconfig.json`:

```json
{
  "extends": "@alphacifer/tsconfig/next-app",
  "compilerOptions": {
    "baseUrl": "./src"
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ]
}
```

---

### 8. React Libraries (`react`)

For shared React component packages, design systems, and hooks packages.

Create `packages/ui/tsconfig.json`:

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

---

### 9. React SPA Applications (`react-app`)

For standalone client-side React single-page applications built with Vite, utilizing TypeScript project references.

Create `apps/web/tsconfig.json`:

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

---

### 10. Vite Node Tooling (`react-node`)

For tooling configuration files in Vite projects (such as `vite.config.ts` or `vitest.config.ts`).

Create `apps/web/tsconfig.node.json`:

```json
{
  "extends": "@alphacifer/tsconfig/react-node",
  "include": [
    "vite.config.ts"
  ]
}
```

---

### 11. TanStack Start Applications (`tanstack-start-app`)

For full-stack web applications powered by TanStack Start and Vite client types.

Create `apps/web/tsconfig.json`:

```json
{
  "extends": "@alphacifer/tsconfig/tanstack-start-app",
  "compilerOptions": {
    "baseUrl": "."
  },
  "include": [
    "**/*.ts",
    "**/*.tsx"
  ]
}
```

---

### 12. Tauri Plugins (`tauri-plugin`)

For Tauri desktop plugin packages targeting `guest-js` frontend bindings.

Create `plugins/<plugin-name>/tsconfig.json`:

```json
{
  "extends": "@alphacifer/tsconfig/tauri-plugin",
  "include": [
    "guest-js/*.ts"
  ],
  "exclude": [
    "dist-js",
    "node_modules"
  ]
}
```
