# Alpha DX

Shared TypeScript utilities, project configurations, Slidev themes/addons, and reusable GitHub Actions for Alpha's projects.

## Packages

### Configurations

| Package | Path | Description |
| --- | --- | --- |
| `@alphacifer/biome` | [`packages/biome`](./packages/biome) | Biome configuration presets |
| `@alphacifer/eslint` | [`packages/eslint`](./packages/eslint) | ESLint configuration presets |
| `@alphacifer/lefthook` | [`packages/lefthook`](./packages/lefthook) | Shared Lefthook pre-commit presets (`biome.yml`, `oxc.yml`, `rust.yml`, `typescript.yml`) |
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
| `preparation/nodejs` | [`gh-actions/preparation/nodejs`](./gh-actions/preparation/nodejs/action.yml) | Set up `pnpm`, Node.js `24.22.3` with pnpm store caching (`cache: 'pnpm'`), and run `pnpm install` |
| `preparation/rust` | [`gh-actions/preparation/rust`](./gh-actions/preparation/rust/action.yml) | Install the Rust toolchain, optional components/targets, and configure build caching |
| `deployment/app-landing-vitepress` | [`gh-actions/deployment/app-landing-vitepress`](./gh-actions/deployment/app-landing-vitepress/action.yml) | Download release manifests from R2, build a VitePress landing page, and deploy it to GitHub Pages |
| `deployment/cloudflare-workers-node` | [`gh-actions/deployment/cloudflare-workers-node`](./gh-actions/deployment/cloudflare-workers-node/action.yml) | Prepare Node.js and pnpm and deploy a Cloudflare Workers app via its pnpm deploy script |
| `upload/r2` | [`gh-actions/upload/r2`](./gh-actions/upload/r2/action.yml) | Upload files to Cloudflare R2 via Wrangler and optionally remove obsolete keys |
| `deployment/ec2-simple-node` | [`gh-actions/deployment/ec2-simple-node`](./gh-actions/deployment/ec2-simple-node/action.yml) | Build a Node.js Docker image, copy the archive to EC2 over SSH, and run the container |
| `deployment/vercel-simple-frontend` | [`gh-actions/deployment/vercel-simple-frontend`](./gh-actions/deployment/vercel-simple-frontend/action.yml) | Prepare Node.js and pnpm, build workspace artifacts, and deploy a prebuilt frontend to Vercel |
| `release/macos-gpui` | [`gh-actions/release/macos-gpui`](./gh-actions/release/macos-gpui/action.yml) | Build, sign, pack, upload, and release `arm64` + `x64` GPUI macOS apps |
| `release/macos-swift` | [`gh-actions/release/macos-swift`](./gh-actions/release/macos-swift/action.yml) | Build, sign, pack, upload, and release `arm64` + `x64` Swift macOS apps |
| `release/windows-rust-inno-setup` | [`gh-actions/release/windows-rust-inno-setup`](./gh-actions/release/windows-rust-inno-setup/action.yml) | Build a Windows app, compile its Inno Setup installer, upload, and attach to a GitHub Release |
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
