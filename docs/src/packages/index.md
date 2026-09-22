# Packages Overview

Alpha DX is a monorepo offering modular TypeScript libraries, shared developer tooling configurations, and presentation engines.

---

## Utilities & Auth

### [@alphacifer/core-utils](/packages/core-utils)
[![npm version](https://img.shields.io/npm/v/@alphacifer/core-utils.svg)](https://www.npmjs.com/package/@alphacifer/core-utils)

Essential, zero-boilerplate utility functions for everyday TypeScript development:
- **Timing:** Debounce and throttle wrappers.
- **Arrays & Collections:** Safe array wrapping.
- **Strings:** Camelize, pascalize, snakize, humanize, and separator combining.
- **Objects:** Deep key casing transformations (`deepCamelizeKeys`, `deepSnakeizeKeys`, `deepPascalizeKeys`).
- **Dates & URLs:** Parsing, formatting, and safe URL concatenation.
- **Identifiers & Slugs:** Vietnamese-aware slug generation and unique ID generation.
- **Functional Programming:** Direct re-export of `remeda`.

```sh
pnpm add @alphacifer/core-utils
```

[Read `@alphacifer/core-utils` Documentation &rarr;](/packages/core-utils)

---

### [@alphacifer/authkit](/packages/authkit)
[![npm version](https://img.shields.io/npm/v/@alphacifer/authkit.svg)](https://www.npmjs.com/package/@alphacifer/authkit)

Authentication primitives built for modern Node.js and TypeScript services:
- **JWT:** Strongly-typed payload extraction, signature verification, and claims options (`issuer`, `audience`, `subject`, `algorithm`).
- **Password Hashing:** Argon2id hashing and verification with configurable memory, passes, parallelism, and salt size.

```sh
pnpm add @alphacifer/authkit
```

[Read `@alphacifer/authkit` Documentation &rarr;](/packages/authkit)

---

## Backend & Data

### [@alphacifer/hono](/packages/hono)
[![npm version](https://img.shields.io/npm/v/@alphacifer/hono.svg)](https://www.npmjs.com/package/@alphacifer/hono)

Production-ready helpers and middleware for [Hono](https://hono.dev):
- **Error Handling:** Standardized `HonoError` and `HonoCommonError` hierarchy with automatic error formatting via `onError`.
- **Validation:** Type-safe request validation with [Zod](https://zod.dev) (`zValidator`) and [ArkType](https://arktype.io) (`arkValidator`).
- **Testing:** `HonoTest` client with simplified helper methods (`post`, `get`, etc.) and JSON response parsing.

```sh
pnpm add @alphacifer/hono hono
```

[Read `@alphacifer/hono` Documentation &rarr;](/packages/hono)

---

### [@alphacifer/drizzle](/packages/drizzle)
[![npm version](https://img.shields.io/npm/v/@alphacifer/drizzle.svg)](https://www.npmjs.com/package/@alphacifer/drizzle)

Streamlined setup and utilities for [Drizzle ORM](https://orm.drizzle.team) and PostgreSQL:
- **Config Helper:** Modular `drizzle.config.ts` generator supporting single or multiple root folders.
- **Client Factory:** `createDrizzle` client setup with connection pooling and snake_case mapping.
- **CLI Tools:** `drizzle-cli seed create <name>` command for seed generation.
- **Schema & Testing Utilities:** Automated schema setup, teardown, table truncation, and error parser (`parseError`).

```sh
pnpm add @alphacifer/drizzle drizzle-orm pg
pnpm add -D drizzle-kit @types/pg
```

[Read `@alphacifer/drizzle` Documentation &rarr;](/packages/drizzle)

---

## Frontend & Networking

### [@alphacifer/axios](/packages/axios)
[![npm version](https://img.shields.io/npm/v/@alphacifer/axios.svg)](https://www.npmjs.com/package/@alphacifer/axios)

An enterprise-ready [Axios](https://axios-http.com) wrapper with built-in token management and response formatting:
- **Automatic Casing:** Seamless casing transforms for request parameters/data (`camel`, `snake`, `pascal`).
- **Data Unwrapping:** Auto-unwrapping and deep camelization of response data payloads.
- **Token Management:** Built-in `TokenStorage` with Bearer auth injection.
- **Token Refresh Queue:** Concurrent `401` interceptor with deduplicated refresh calls and retry handling.

```sh
pnpm add @alphacifer/axios
```

[Read `@alphacifer/axios` Documentation &rarr;](/packages/axios)

---

### [@alphacifer/react](/packages/react)
[![npm version](https://img.shields.io/npm/v/@alphacifer/react.svg)](https://www.npmjs.com/package/@alphacifer/react)

Shared utilities and patterns for React applications:
- **Zustand Store Factory:** `createStore` helper with built-in Immer support and DevTools configuration.

```sh
pnpm add @alphacifer/react
```

[Read `@alphacifer/react` Documentation &rarr;](/packages/react)

---

## Tooling & Configurations

### [@alphacifer/tsconfig](/packages/tsconfig)
[![npm version](https://img.shields.io/npm/v/@alphacifer/tsconfig.svg)](https://www.npmjs.com/package/@alphacifer/tsconfig)

A curated collection of strict, modern TypeScript presets:
- Presets for ESM, CommonJS, Hono, NestJS, Next.js, React, React App (Vite), TanStack Start, and Tauri Plugin.

```sh
pnpm add -D @alphacifer/tsconfig typescript
```

[Read `@alphacifer/tsconfig` Documentation &rarr;](/packages/tsconfig)

---

### [@alphacifer/biome](/packages/biome)
[![npm version](https://img.shields.io/npm/v/@alphacifer/biome.svg)](https://www.npmjs.com/package/@alphacifer/biome)

Shared [Biome](https://biomejs.dev) configuration for high-performance formatting and linting:
- Standardized rules for syntax, imports, sorted keys, and code hygiene.

```sh
pnpm add -D @alphacifer/biome @biomejs/biome
```

[Read `@alphacifer/biome` Documentation &rarr;](/packages/biome)

---

### [@alphacifer/oxc](/packages/oxc)
[![npm version](https://img.shields.io/npm/v/@alphacifer/oxc.svg)](https://www.npmjs.com/package/@alphacifer/oxc)

Shared configurations for the [OXC](https://oxc.rs) toolchain:
- **Oxlint:** Ultra-fast linter configuration extending `@alphacifer/oxc/oxlint`.
- **Oxfmt:** Rust-based code formatter configuration extending `@alphacifer/oxc/oxfmt`.

```sh
pnpm add -D @alphacifer/oxc oxlint oxfmt
```

[Read `@alphacifer/oxc` Documentation &rarr;](/packages/oxc)

---

### [@alphacifer/eslint](/packages/eslint)
[![npm version](https://img.shields.io/npm/v/@alphacifer/eslint.svg)](https://www.npmjs.com/package/@alphacifer/eslint)

Flat ESLint configurations for Alpha's projects:
- Modular flat configs: `base`, `next`, `react`, and `react-app`.

```sh
pnpm add -D eslint @alphacifer/eslint typescript-eslint
```

[Read `@alphacifer/eslint` Documentation &rarr;](/packages/eslint)

---

## Slidev Presentations

### [@alphacifer/slidev-addon-theme](/slidev/addon/)
Reusable Slidev addon providing interactive infographics, layouts, and cards.

### [@alphacifer/slidev-academic-theme](/slidev/academic-theme/)
Complete academic Slidev theme with dedicated slide layouts and typography.
