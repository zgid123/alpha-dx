# Alpha DX

Shared TypeScript utilities, project configurations, Slidev themes/addons, and reusable GitHub Actions for Alpha's projects.

## Packages

### Configurations

| Package | Path | Description |
| --- | --- | --- |
| `@alphacifer/biome` | [`packages/biome`](./packages/biome) | Biome configuration presets |
| `@alphacifer/eslint` | [`packages/eslint`](./packages/eslint) | ESLint configuration presets |
| `@alphacifer/oxc` | [`packages/oxc`](./packages/oxc) | OXC configuration presets |
| `@alphacifer/tsconfig` | [`packages/tsconfig`](./packages/tsconfig) | Shared TypeScript configuration presets |

### Utilities & Libraries

| Package | Path | Description |
| --- | --- | --- |
| `@alphacifer/authkit` | [`packages/authkit`](./packages/authkit) | JWT generation/verification and Argon2id password hashing |
| `@alphacifer/axios` | [`packages/axios`](./packages/axios) | Axios HTTP client wrapper |
| `@alphacifer/core-utils` | [`packages/core-utils`](./packages/core-utils) | Core utilities for arrays, dates, objects, strings, URLs, slugs, and IDs |
| `@alphacifer/drizzle` | [`packages/drizzle`](./packages/drizzle) | Drizzle setup helpers, PostgreSQL utilities, and testing support |
| `@alphacifer/hono` | [`packages/hono`](./packages/hono) | Hono helpers for validation and testing |
| `@alphacifer/react` | [`packages/react`](./packages/react) | React utilities including Zustand and Immer helpers |

### Slidev Themes & Addons

| Package | Path | Description |
| --- | --- | --- |
| `@alphacifer/slidev-academic-theme` | [`packages/slidev/academic-theme`](./packages/slidev/academic-theme) | Light-only academic theme for Slidev |
| `@alphacifer/slidev-addon-theme` | [`packages/slidev/addon-theme`](./packages/slidev/addon-theme) | Slidev components, layouts, and addons |
| `@alphacifer/slidev-core-theme` | [`packages/slidev/core-theme`](./packages/slidev/core-theme) | Shared color tokens and typography for Alpha Slidev themes |

## Reusable GitHub Actions

Shared composite actions live under [`gh-actions/`](./gh-actions). See [`gh-actions/README.md`](./gh-actions/README.md) for inputs, outputs, and workflow examples.

| Action | Path | Description |
| --- | --- | --- |
| `prepare-nodejs` | [`gh-actions/prepare-nodejs`](./gh-actions/prepare-nodejs/action.yml) | Set up `pnpm`, Node.js `24.22.3` with pnpm store caching (`cache: 'pnpm'`), and run `pnpm install` |
| `detect-changes` | [`gh-actions/detect-changes`](./gh-actions/detect-changes/action.yml) | Evaluate `key = regex` path filters against `base` and output a `changes` JSON object |

## Development

Requirements: `pnpm` (enforced via `preinstall`).

```bash
# Install workspace dependencies
pnpm install

# Build all packages
pnpm build

# Run tests with coverage
pnpm test

# Start the VitePress documentation dev server
pnpm docs:dev

# Build the VitePress documentation
pnpm docs:build

# Create a changeset for releasing packages
pnpm set-release
```

Shared TypeScript utilities, project configurations, Slidev themes/addons, and reusable GitHub Actions for Alpha's projects.

## Packages

### Configurations

| Package | Path | Description |
| --- | --- | --- |
| `@alphacifer/biome` | [`packages/biome`](./packages/biome) | Biome configuration presets |
| `@alphacifer/eslint` | [`packages/eslint`](./packages/eslint) | ESLint configuration presets |
| `@alphacifer/oxc` | [`packages/oxc`](./packages/oxc) | OXC configuration presets |
| `@alphacifer/tsconfig` | [`packages/tsconfig`](./packages/tsconfig) | Shared TypeScript configuration presets |

### Utilities & Libraries

| Package | Path | Description |
| --- | --- | --- |
| `@alphacifer/authkit` | [`packages/authkit`](./packages/authkit) | JWT generation/verification and Argon2id password hashing |
| `@alphacifer/axios` | [`packages/axios`](./packages/axios) | Axios HTTP client wrapper |
| `@alphacifer/core-utils` | [`packages/core-utils`](./packages/core-utils) | Core utilities for arrays, dates, objects, strings, URLs, slugs, and IDs |
| `@alphacifer/drizzle` | [`packages/drizzle`](./packages/drizzle) | Drizzle setup helpers, PostgreSQL utilities, and testing support |
| `@alphacifer/hono` | [`packages/hono`](./packages/hono) | Hono helpers for validation and testing |
| `@alphacifer/react` | [`packages/react`](./packages/react) | React utilities including Zustand and Immer helpers |

### Slidev Themes & Addons

| Package | Path | Description |
| --- | --- | --- |
| `@alphacifer/slidev-academic-theme` | [`packages/slidev/academic-theme`](./packages/slidev/academic-theme) | Light-only academic theme for Slidev |
| `@alphacifer/slidev-addon-theme` | [`packages/slidev/addon-theme`](./packages/slidev/addon-theme) | Slidev components, layouts, and addons |
| `@alphacifer/slidev-core-theme` | [`packages/slidev/core-theme`](./packages/slidev/core-theme) | Shared color tokens and typography for Alpha Slidev themes |

## Reusable GitHub Actions

Shared composite actions live under [`gh-actions/`](./gh-actions). See [`gh-actions/README.md`](./gh-actions/README.md) for inputs, outputs, and workflow examples.

| Action | Path | Description |
| --- | --- | --- |
| `prepare-nodejs` | [`gh-actions/prepare-nodejs`](./gh-actions/prepare-nodejs/action.yml) | Set up `pnpm`, Node.js `24.22.3` with pnpm store caching (`cache: 'pnpm'`), and run `pnpm install` |
| `detect-changes` | [`gh-actions/detect-changes`](./gh-actions/detect-changes/action.yml) | Evaluate `key = regex` path filters against `base` and output a `changes` JSON object |

## Development

Requirements: `pnpm` (enforced via `preinstall`).

```bash
# Install workspace dependencies
pnpm install

# Build all packages
pnpm build

# Run tests with coverage
pnpm test

# Start the VitePress documentation dev server
pnpm docs:dev

# Build the VitePress documentation
pnpm docs:build

# Create a changeset for releasing packages
pnpm set-release
```
