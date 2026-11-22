# Reusable GitHub Actions

Shared composite GitHub Actions for Alpha's repositories. Reference any action from external repositories with `@main` (or a specific tag / commit SHA).

## Available Actions

| Action | Path | Description |
| --- | --- | --- |
| `prepare-nodejs` | [`./prepare-nodejs/action.yml`](./prepare-nodejs/action.yml) | Set up pnpm, install Node.js with pnpm store caching, and install dependencies |
| `prepare-rust` | [`./prepare-rust/action.yml`](./prepare-rust/action.yml) | Install the Rust toolchain, optional components/targets, and configure build caching |
| `test-rust` | [`./test-rust/action.yml`](./test-rust/action.yml) | Check formatting, run clippy, and run tests for a Rust crate or workspace |
| `deploy-app-landing-vitepress` | [`./deploy-app-landing-vitepress/action.yml`](./deploy-app-landing-vitepress/action.yml) | Download release manifests from R2, build a VitePress landing page, and deploy it to GitHub Pages |
| `deploy-ec2-simple-node` | [`./deploy-ec2-simple-node/action.yml`](./deploy-ec2-simple-node/action.yml) | Build a Node.js Docker image, copy the archive to EC2 over SSH, and run the container |
| `deploy-vercel-simple-frontend` | [`./deploy-vercel-simple-frontend/action.yml`](./deploy-vercel-simple-frontend/action.yml) | Prepare Node.js and pnpm, build workspace artifacts, and deploy a prebuilt frontend to Vercel |
| `detect-changes` | [`./detect-changes/action.yml`](./detect-changes/action.yml) | Detect changed repository paths using customizable regex rules and output a JSON map |

---

## `prepare-nodejs`

Sets up `pnpm` and Node.js with built-in pnpm store caching, then installs workspace dependencies.

### What It Does

1. Installs `pnpm` using `pnpm/action-setup@v6`.
2. Installs Node.js `24.22.3` using `actions/setup-node@v6` with `registry-url: 'https://registry.npmjs.org'` and `cache: 'pnpm'`.
3. Runs `pnpm install`.

### Prerequisites

- Run `actions/checkout` before calling this action.
- Specify the `pnpm` version in the consuming repository's `package.json` via `"packageManager"` (or `"devEngines.packageManager"`), since `pnpm/action-setup` does not hardcode a version here.

### Usage

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v6

  - name: Prepare Node.js and pnpm
    uses: zgid123/alpha-dx/gh-actions/prepare-nodejs@main
```

---

## `prepare-rust`

Sets up the Rust toolchain across macOS, Linux, and Windows (using `shell: bash`), installs optional components and compilation targets, and configures build caching for both GitHub-hosted and self-hosted runners.

### What It Does

1. Installs the Rust toolchain:
   - When `toolchain` is empty, runs `rustup show` to install the toolchain and components declared in `rust-toolchain.toml` (and installs any extra `components`).
   - When `toolchain` is set (for example `stable`), runs `rustup toolchain install <toolchain> --profile minimal` (with any `components`) and sets it as default.
2. Adds any extra compilation `targets` via `rustup target add`.
3. Configures caching when `cache: 'true'`:
   - **GitHub-hosted runners (`runner.environment == 'github-hosted'`):** runs `Swatinem/rust-cache@v2` with `cache-key` and `cache-on-failure`.
   - **Self-hosted runners:** uses `self-hosted-cache` (`sccache`, `target-dir`, or `none`) so compiled artifacts survive `actions/checkout` workspace cleaning.

### Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `toolchain` | No | `''` | Toolchain to install (`stable`, etc.). Empty follows `rust-toolchain.toml` via `rustup show` |
| `components` | No | `''` | Comma- or space-separated `rustup` components (for example `clippy,rustfmt`) |
| `targets` | No | `''` | Comma- or space-separated `rustup` targets (for example `aarch64-apple-darwin x86_64-apple-darwin`) |
| `cache` | No | `'true'` | Enable Rust build caching (`true` or `false`) |
| `cache-key` | No | `''` | Extra cache key prefix passed to `Swatinem/rust-cache@v2` and appended to the self-hosted `target-dir` name |
| `cache-on-failure` | No | `'true'` | Save `Swatinem/rust-cache@v2` even when a job fails |
| `self-hosted-cache` | No | `'sccache'` | Self-hosted strategy: `sccache`, `target-dir`, or `none` |

### Self-Hosted Caching Notes

Because `actions/checkout` defaults to `clean: true` (`git clean -ffdx`), an in-repo `target/` folder is wiped between runs even on a self-hosted runner:

- **`sccache` (default):** If `sccache` is installed on the runner's `PATH`, exports `RUSTC_WRAPPER=sccache` and `CARGO_INCREMENTAL=0`. If not installed, logs a non-fatal notice and builds normally.
- **`target-dir`:** Exports `CARGO_TARGET_DIR=$XDG_CACHE_HOME/cargo-target/<repo>[-<cache-key>]` (or `$HOME/.cache/...`). Packaging scripts that read `target/` directly must check `${CARGO_TARGET_DIR:-target}`.

### Usage

Using `rust-toolchain.toml` and cross-compiling macOS release targets:

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v6

  - name: Prepare Rust
    uses: zgid123/alpha-dx/gh-actions/prepare-rust@main
    with:
      targets: aarch64-apple-darwin x86_64-apple-darwin
      cache-key: release-macos
```

Using an explicit toolchain with lint/format components (for repositories without `rust-toolchain.toml`):

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v6

  - name: Prepare Rust
    uses: zgid123/alpha-dx/gh-actions/prepare-rust@main
    with:
      toolchain: stable
      components: clippy,rustfmt
      cache-key: test-core
```

---

## `test-rust`

Cross-platform Rust CI test action (macOS, Linux, and Windows via `shell: bash`) that checks formatting, runs Clippy with warnings denied, and runs the test suite for an entire workspace or a single package.

### What It Does

1. Runs `cargo fmt --all --check` (or `cargo fmt -p <package> --check` when `package` is set).
2. Runs `cargo clippy --workspace --all-targets [clippy-args] -- -D warnings` (or `-p <package>`).
3. Runs `cargo test --workspace [test-args]` (or `-p <package>`).

### Prerequisites

- Run `actions/checkout` before calling this action.
- Run [`prepare-rust`](./prepare-rust/action.yml) (or ensure Rust with `clippy` and `rustfmt` components is already installed on the runner) before calling this action.

### Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `package` | No | `''` | Optional Cargo package name (`-p <package>`). Empty checks the full workspace |
| `working-directory` | No | `'.'` | Directory containing `Cargo.toml` |
| `clippy-args` | No | `''` | Extra flags passed to `cargo clippy` before `-- -D warnings` (for example `--all-features`) |
| `test-args` | No | `''` | Extra flags passed to `cargo test` (for example `--all-features`) |

### Usage

Full workspace using `rust-toolchain.toml`:

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v6

  - name: Prepare Rust
    uses: zgid123/alpha-dx/gh-actions/prepare-rust@main
    with:
      cache-key: test-rust

  - name: Test Rust
    uses: zgid123/alpha-dx/gh-actions/test-rust@main
```

Single crate using an explicit `stable` toolchain:

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v6

  - name: Prepare Rust
    uses: zgid123/alpha-dx/gh-actions/prepare-rust@main
    with:
      toolchain: stable
      components: clippy,rustfmt
      cache-key: test-core

  - name: Test Core
    uses: zgid123/alpha-dx/gh-actions/test-rust@main
    with:
      package: typio-core
```

---

## `deploy-app-landing-vitepress`

Downloads release manifests from Cloudflare R2, builds a VitePress app landing page, packs it with macOS-safe `tar` flags (`COPYFILE_DISABLE=1 tar -cf`), uploads the Pages artifact, and deploys via `actions/deploy-pages@v4`.

### What It Does

1. Runs [`prepare-nodejs`](./prepare-nodejs/action.yml) (`zgid123/alpha-dx/gh-actions/prepare-nodejs@main`) to install `pnpm`, Node.js, and workspace dependencies.
2. Creates `$RUNNER_TEMP/releases`, exports its path in the environment variable named by `releases-dir-env`, and fetches `manifests/<platform>.json` from Cloudflare R2 via Wrangler (skipped gracefully when `cloudflare-api-token` is empty).
3. Builds the VitePress site via `pnpm --filter <website-filter> build`.
4. Packs `dist-path` into `$RUNNER_TEMP/artifact.tar` (works on both GNU and BSD/macOS `tar`).
5. Uploads the archive using `actions/upload-artifact@v4` with retention `1` day.
6. Deploys the uploaded artifact using `actions/deploy-pages@v4` and exposes `page-url`.

### Prerequisites

- Run `actions/checkout` before calling this action, and define `"packageManager"` (or `"devEngines.packageManager"`) in root `package.json`.
- Configure the calling job with `environment: { name: github-pages, url: ... }` and permissions `pages: write` and `id-token: write`.

### Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `bucket` | Yes | — | R2 bucket containing `manifests/<platform>.json` (for example `remio`, `typio`) |
| `releases-dir-env` | Yes | — | Env var name exported with the downloaded manifests folder (for example `REMIO_RELEASES_DIR`) |
| `cloudflare-api-token` | No | `''` | Token that can read the release bucket (empty builds without download links) |
| `cloudflare-account-id` | No | `''` | Cloudflare account ID of the release bucket |
| `platforms` | No | `'macos windows'` | Space-separated platform manifest names to fetch |
| `wrangler-filter` | No | `'server'` | pnpm workspace filter that provides `wrangler` |
| `website-filter` | No | `'website'` | pnpm workspace filter for the VitePress site |
| `dist-path` | No | `'workspaces/website/.vitepress/dist'` | Built static output directory to deploy |
| `artifact-name` | No | `''` | Optional Pages artifact name override (defaults to `github-pages-<run_attempt>`) |

### Outputs

| Output | Description |
| --- | --- |
| `page-url` | The deployed GitHub Pages URL |

### Usage

```yaml
jobs:
  deploy:
    name: Deploy Website
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.website.outputs.page-url }}
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Deploy app landing page
        id: website
        uses: zgid123/alpha-dx/gh-actions/deploy-app-landing-vitepress@main
        with:
          bucket: remio
          releases-dir-env: REMIO_RELEASES_DIR
          cloudflare-api-token: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          cloudflare-account-id: ${{ vars.CLOUDFLARE_ACCOUNT_ID }}
```

---

## `deploy-ec2-simple-node`

Builds a Docker image for a Node.js service, transfers the compressed image archive to an EC2 host over SSH/SCP, replaces the running container, and prunes dangling images. Supports running as two separate jobs (`step: build` and `step: deploy`) via GitHub Actions artifacts, or in a single job (`step: all`).

### What It Does

1. **Build (`step: build` or `all`):**
   - Sets up Docker Buildx (`docker/setup-buildx-action@v3`) and caches layers (`actions/cache@v4`).
   - Writes `NODE_ENV=production` to `<env-dir>/.env` and any `env-vars` entries to `<env-dir>/.env.production.local`.
   - Builds `<image-name>:latest` from `dockerfile` and saves it to `$RUNNER_TEMP/<image-name>.tar.gz`.
   - When `step: build`, uploads `$RUNNER_TEMP/<image-name>.tar.gz` as an artifact via `actions/upload-artifact@v4`.
2. **Deploy (`step: deploy` or `all`):**
   - When `step: deploy`, downloads `<image-name>.tar.gz` into `$RUNNER_TEMP` via `actions/download-artifact@v4`.
   - Configures SSH for `ec2` using `ec2-host`, `ec2-user`, `ssh-key`, and optional `ssh-key-pub`.
   - Copies the image archive to `~/docker/<image-name>.tar.gz` on EC2, loads the image, restarts `<container-name>`, prunes unused images, and cleans up the archive.

### Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `step` | No | `'all'` | Execution step to run: `build`, `deploy`, or `all` |
| `image-name` | Yes | — | Docker image name (for example `blog-server`) |
| `artifact-name` | No | `''` | Optional artifact name override for `build`/`deploy` split (defaults to `<image-name>-docker-image`) |
| `ec2-host` | No | `''` | EC2 hostname or IP address (required when `step` is `deploy` or `all`) |
| `ec2-user` | No | `''` | EC2 SSH username (required when `step` is `deploy` or `all`) |
| `ssh-key` | No | `''` | SSH private key for connecting to EC2 (required when `step` is `deploy` or `all`) |
| `ssh-key-pub` | No | `''` | Optional SSH public key |
| `container-name` | No | `''` | Docker container name on EC2 (defaults to `<image-name>-container`) |
| `dockerfile` | No | `'infrastructures/docker/Dockerfile.server'` | Path to the Dockerfile |
| `context` | No | `'.'` | Docker build context directory |
| `port` | No | `'3000:3000'` | Port mapping passed to `docker run -p` |
| `env-dir` | No | `'workspaces/server'` | Workspace directory where `.env` and `.env.production.local` are generated |
| `env-vars` | No | `''` | Optional newline-separated `KEY=VALUE` entries written to `<env-dir>/.env.production.local` |

### Usage

Split across two jobs (`build` and `deploy`):

```yaml
jobs:
  build:
    name: Build Server
    runs-on: ${{ vars.RUNNER || 'ubuntu-latest' }}
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Build Server
        uses: zgid123/alpha-dx/gh-actions/deploy-ec2-simple-node@main
        with:
          step: build
          image-name: blog-server
          env-vars: |
            DB_HOST=${{ secrets.DB_HOST }}
            DB_PORT=${{ secrets.DB_PORT }}

  deploy:
    name: Deploy Server
    runs-on: ${{ vars.RUNNER || 'ubuntu-latest' }}
    needs: build
    steps:
      - name: Deploy Server to EC2
        uses: zgid123/alpha-dx/gh-actions/deploy-ec2-simple-node@main
        with:
          step: deploy
          image-name: blog-server
          ec2-host: ${{ vars.EC2_HOST }}
          ec2-user: ${{ vars.EC2_USER }}
          ssh-key: ${{ secrets.SSH_KEY }}
          ssh-key-pub: ${{ secrets.SSH_KEY_PUB }}
```

---

## `deploy-vercel-simple-frontend`

Prepares Node.js and `pnpm`, builds the workspace and optional target package, pulls Vercel configuration, builds prebuilt Vercel artifacts, and deploys them to Vercel.

### What It Does

1. Runs [`prepare-nodejs`](./prepare-nodejs/action.yml) (`zgid123/alpha-dx/gh-actions/prepare-nodejs@main`) to install `pnpm`, Node.js, and workspace dependencies.
2. Runs `pnpm build`, and when `filter` is provided, runs `pnpm --filter="<filter>" build`.
3. Installs the Vercel CLI (`pnpm add -g vercel@latest`).
4. Runs `vercel pull --yes --environment="<environment>"`.
5. Runs `vercel build` (with `--prod` when `environment` is `production`).
6. Runs `vercel deploy --prebuilt` (with `--prod` when `environment` is `production`).

### Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `vercel-token` | Yes | — | Vercel authentication token |
| `vercel-org-id` | Yes | — | Vercel organization ID (`VERCEL_ORG_ID`) |
| `vercel-project-id` | Yes | — | Vercel project ID (`VERCEL_PROJECT_ID`) |
| `filter` | No | `''` | Optional pnpm workspace filter to build after root `pnpm build` (for example `cms` or `blog`) |
| `environment` | No | `'production'` | Target Vercel environment (`production` or `preview`) |

### Usage

```yaml
jobs:
  deploy:
    name: Deploy CMS
    runs-on: ${{ vars.RUNNER || 'ubuntu-latest' }}
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Deploy CMS to Vercel
        uses: zgid123/alpha-dx/gh-actions/deploy-vercel-simple-frontend@main
        with:
          filter: cms
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_BLOG_CMS_PROJECT_ID }}
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## `detect-changes`

Compares `HEAD` against a base commit using newline-separated `key = regex` rules and outputs a `changes` JSON object so downstream jobs only run when relevant files change.

### Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `filters` | Yes | — | Newline-separated `key = regex` rules |
| `base` | No | `${{ github.event.pull_request.base.sha || github.event.before }}` | Commit SHA to compare `HEAD` against |

### Outputs

| Output | Description |
| --- | --- |
| `changes` | JSON object mapping each non-`$` filter key to `true` or `false` (e.g. `{"api":true,"web":false}`) |

### Rule Syntax

- Each non-empty line is `key = regex` (leading/trailing whitespace around keys and patterns is trimmed).
- Lines starting with `#` are treated as comments and ignored.
- Keys starting with `$` define reusable pattern variables wrapped in `(...)` and expanded in subsequent rules (e.g. `$shared`, `$node`).
- If `base` is empty or does not resolve to a valid commit (for example on a new branch, force push, or `workflow_dispatch`), every filter evaluates to `true`.
- Be sure to pass `fetch-depth: 0` to `actions/checkout` so `base` is present in git history.

### Usage

```yaml
jobs:
  changes:
    name: Detect changes
    runs-on: ubuntu-latest
    outputs:
      changes: ${{ steps.filter.outputs.changes }}
    steps:
      - name: Checkout
        uses: actions/checkout@v6
        with:
          fetch-depth: 0

      - name: Detect changes
        id: filter
        uses: zgid123/alpha-dx/gh-actions/detect-changes@main
        with:
          filters: |
            # Shared config files
            $shared = ^(\.github/workflows/test\.yml)$
            $node   = ^(package\.json|pnpm-lock\.yaml|pnpm-workspace\.yaml|biome\.json|tsconfig\.json)$|$shared

            api     = ^apps/api/|$node
            web     = ^apps/web/|$node
            docs    = ^docs/|$shared

  api:
    name: API
    needs: changes
    if: fromJSON(needs.changes.outputs.changes).api
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: zgid123/alpha-dx/gh-actions/prepare-nodejs@main
      - run: pnpm --filter api test

  web:
    name: Web
    needs: changes
    if: fromJSON(needs.changes.outputs.changes).web
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: zgid123/alpha-dx/gh-actions/prepare-nodejs@main
      - run: pnpm --filter web test

  docs:
    name: Docs
    needs: changes
    if: fromJSON(needs.changes.outputs.changes).docs
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: zgid123/alpha-dx/gh-actions/prepare-nodejs@main
      - run: pnpm docs:build
```
