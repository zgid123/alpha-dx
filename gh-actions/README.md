# Reusable GitHub Actions

Shared composite GitHub Actions for Alpha's repositories. Reference any action from external repositories with `@main` (or a specific tag / commit SHA).

## Available Actions

| Action | Path | Description |
| --- | --- | --- |
| `preparation/nodejs` | [`./preparation/nodejs/action.yml`](./preparation/nodejs/action.yml) | Set up pnpm, install Node.js with pnpm store caching, and install dependencies |
| `preparation/rust` | [`./preparation/rust/action.yml`](./preparation/rust/action.yml) | Install the Rust toolchain, optional components/targets, and configure build caching |
| `deployment/app-landing-vitepress` | [`./deployment/app-landing-vitepress/action.yml`](./deployment/app-landing-vitepress/action.yml) | Download release manifests from R2, build a VitePress landing page, and deploy it to GitHub Pages |
| `deployment/cloudflare-workers-node` | [`./deployment/cloudflare-workers-node/action.yml`](./deployment/cloudflare-workers-node/action.yml) | Prepare Node.js and pnpm and deploy a Cloudflare Workers app via its pnpm deploy script |
| `upload/r2` | [`./upload/r2/action.yml`](./upload/r2/action.yml) | Upload files to Cloudflare R2 via Wrangler and optionally remove obsolete keys |
| `deployment/ec2-simple-node` | [`./deployment/ec2-simple-node/action.yml`](./deployment/ec2-simple-node/action.yml) | Build a Node.js Docker image, copy the archive to EC2 over SSH, and run the container |
| `deployment/vercel-simple-frontend` | [`./deployment/vercel-simple-frontend/action.yml`](./deployment/vercel-simple-frontend/action.yml) | Prepare Node.js and pnpm, build workspace artifacts, and deploy a prebuilt frontend to Vercel |
| `release/macos-gpui` | [`./release/macos-gpui/action.yml`](./release/macos-gpui/action.yml) | Build, sign, pack, upload, and release `arm64` + `x64` GPUI macOS apps |
| `release/macos-swift` | [`./release/macos-swift/action.yml`](./release/macos-swift/action.yml) | Build, sign, pack, upload, and release `arm64` + `x64` Swift macOS apps |
| `release/windows-rust-inno-setup` | [`./release/windows-rust-inno-setup/action.yml`](./release/windows-rust-inno-setup/action.yml) | Build a Windows app, compile its Inno Setup installer, upload, and attach to a GitHub Release |
| `detect-changes` | [`./detect-changes/action.yml`](./detect-changes/action.yml) | Detect changed repository paths using customizable regex rules and output a JSON map |

---

## `preparation/nodejs`

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
    uses: zgid123/alpha-dx/gh-actions/preparation/nodejs@main
```

---

## `preparation/rust`

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
    uses: zgid123/alpha-dx/gh-actions/preparation/rust@main
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
    uses: zgid123/alpha-dx/gh-actions/preparation/rust@main
    with:
      toolchain: stable
      components: clippy,rustfmt
      cache-key: test-core
```

---

## `deployment/app-landing-vitepress`

Downloads release manifests from Cloudflare R2, builds a VitePress app landing page, packs it with macOS-safe `tar` flags (`COPYFILE_DISABLE=1 tar -cf`), uploads the Pages artifact, and deploys via `actions/deploy-pages@v4`.

### What It Does

1. Runs [`preparation/nodejs`](./preparation/nodejs/action.yml) (`zgid123/alpha-dx/gh-actions/preparation/nodejs@main`) to install `pnpm`, Node.js, and workspace dependencies.
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
        uses: zgid123/alpha-dx/gh-actions/deployment/app-landing-vitepress@main
        with:
          bucket: remio
          releases-dir-env: REMIO_RELEASES_DIR
          cloudflare-api-token: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          cloudflare-account-id: ${{ vars.CLOUDFLARE_ACCOUNT_ID }}
```

---

## `deployment/cloudflare-workers-node`

Prepares Node.js and `pnpm`, then deploys a Cloudflare Workers application via its `pnpm` `deploy` script.

### What It Does

1. Runs [`preparation/nodejs`](./preparation/nodejs/action.yml) to install `pnpm`, Node.js, and workspace dependencies.
2. Verifies `cloudflare-api-token` and `cloudflare-account-id` are non-empty.
3. Runs `pnpm --filter "$FILTER" run deploy` when `filter` is provided, or `pnpm run deploy` at the repository root otherwise.

### Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `cloudflare-api-token` | Yes | — | Cloudflare API token with Workers deploy permission |
| `cloudflare-account-id` | Yes | — | Cloudflare account ID for the Worker |
| `filter` | No | `''` | Optional pnpm workspace filter (for example `server`); empty runs at repo root |

### Usage

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v6

  - name: Deploy Worker
    uses: zgid123/alpha-dx/gh-actions/deployment/cloudflare-workers-node@main
    with:
      filter: server
      cloudflare-api-token: ${{ secrets.CLOUDFLARE_API_TOKEN }}
      cloudflare-account-id: ${{ vars.CLOUDFLARE_ACCOUNT_ID }}
```

---

## `upload/r2`

Uploads prepared artifacts and manifests to a Cloudflare R2 bucket via Wrangler, uploading blobs first, inline manifest entries next, and removing obsolete keys last.

### What It Does

1. Skips gracefully with a notice when `cloudflare-api-token` is empty.
2. Uploads every `<r2-key>\t<local-path>` entry listed in `uploads-file` (when provided).
3. Uploads every `<r2-key>=<local-path>` entry listed in `files` (useful for uploading a manifest last or standalone files directly).
4. Best-effort deletes each key listed in `delete-file` (logging a warning if deletion fails).

### Prerequisites

- Run `actions/checkout` and [`preparation/nodejs`](./preparation/nodejs/action.yml) before calling this action so `wrangler` is installed.

### Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `bucket` | Yes | — | Target Cloudflare R2 bucket name (for example `remio` or `typio`) |
| `cloudflare-api-token` | No | `''` | Token with write access to the bucket (empty skips upload) |
| `cloudflare-account-id` | No | `''` | Cloudflare account ID of the bucket |
| `uploads-file` | No | `''` | TSV file (`<r2-key>\t<local-path>` per line) uploaded first |
| `files` | No | `''` | Newline-separated `<r2-key>=<local-path>` entries uploaded after `uploads-file` |
| `delete-file` | No | `''` | Path to a file listing obsolete R2 keys (one per line) to delete afterwards |
| `wrangler-filter` | No | `'server'` | pnpm workspace filter providing `wrangler` (empty runs `pnpm exec wrangler`) |

### Usage

With a prepared TSV `uploads` file, a manifest uploaded last, and an `obsolete` cleanup list:

```yaml
steps:
  - name: Upload to R2
    uses: zgid123/alpha-dx/gh-actions/upload/r2@main
    with:
      bucket: remio
      cloudflare-api-token: ${{ secrets.CLOUDFLARE_API_TOKEN }}
      cloudflare-account-id: ${{ vars.CLOUDFLARE_ACCOUNT_ID }}
      uploads-file: ${{ runner.temp }}/dict-out/uploads
      files: manifests/dictionaries/en.json=${{ runner.temp }}/dict-out/en.json
      delete-file: ${{ runner.temp }}/dict-out/obsolete
```

With inline `files` only:

```yaml
steps:
  - name: Upload to R2
    uses: zgid123/alpha-dx/gh-actions/upload/r2@main
    with:
      bucket: remio
      cloudflare-api-token: ${{ secrets.CLOUDFLARE_API_TOKEN }}
      cloudflare-account-id: ${{ vars.CLOUDFLARE_ACCOUNT_ID }}
      files: |
        macos/0.2.0/Remio.app.tar.gz=target/release/Remio.app.tar.gz
        manifests/macos.json=dist/macos.json
```

---

## `deployment/ec2-simple-node`

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
        uses: zgid123/alpha-dx/gh-actions/deployment/ec2-simple-node@main
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
        uses: zgid123/alpha-dx/gh-actions/deployment/ec2-simple-node@main
        with:
          step: deploy
          image-name: blog-server
          ec2-host: ${{ vars.EC2_HOST }}
          ec2-user: ${{ vars.EC2_USER }}
          ssh-key: ${{ secrets.SSH_KEY }}
          ssh-key-pub: ${{ secrets.SSH_KEY_PUB }}
```

---

## `deployment/vercel-simple-frontend`

Prepares Node.js and `pnpm`, builds the workspace and optional target package, pulls Vercel configuration, builds prebuilt Vercel artifacts, and deploys them to Vercel.

### What It Does

1. Runs [`preparation/nodejs`](./preparation/nodejs/action.yml) (`zgid123/alpha-dx/gh-actions/preparation/nodejs@main`) to install `pnpm`, Node.js, and workspace dependencies.
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
        uses: zgid123/alpha-dx/gh-actions/deployment/vercel-simple-frontend@main
        with:
          filter: cms
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_BLOG_CMS_PROJECT_ID }}
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## `release/macos-gpui`

Builds `arm64` and `x64` GPUI/Rust macOS `.app` bundles, optionally imports a `.p12` signing certificate into a temporary Keychain (and cleans it up on exit), verifies minimum macOS version with `otool -l`, packs `.dmg` and `.app.tar.gz` archives, uploads them as workflow artifacts, and attaches them to a GitHub Release when `tag` is provided.

### What It Does

1. Runs [`preparation/rust`](./preparation/rust/action.yml) with targets `aarch64-apple-darwin x86_64-apple-darwin`.
2. When `certificate` or `tag` is set, imports the `.p12` certificate into `$RUNNER_TEMP/macos-signing.keychain-db` and deletes the keychain in `if: always()`.
3. Compiles `-p <package>` for both architectures, bundles `<AppName>.app`, codesigns it, verifies `otool -l` `minos`, packs `.dmg` + `.app.tar.gz`, and writes artifact paths to outputs.
4. Uploads the 4 files as a GitHub Actions artifact and, if `tag` is non-empty, creates (if missing) and uploads to the GitHub Release.

### Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `app-name` | Yes | — | Bundle and DMG display name (for example `Remio`) |
| `package` | Yes | — | Cargo package name (`-p <package>`) |
| `bundle-id` | Yes | — | Code signing bundle identifier (for example `com.remio.app`) |
| `info-plist` | Yes | — | Path to `Info.plist` |
| `icon` | Yes | — | Path to `AppIcon.icns` |
| `binary-name` | No | `''` | Binary name in `target/<target>/release` (defaults to `package`) |
| `extra-resources` | No | `''` | Newline-separated resource paths copied into `Contents/Resources/` |
| `min-macos-version` | No | `'11.0'` | `MACOSX_DEPLOYMENT_TARGET` and `otool -l` `minos` check (`''` skips) |
| `version` | No | `''` | Version in output filenames (defaults to text after `@` in `tag`) |
| `output-dir` | No | `'target/release'` | Output directory for DMGs and `.app.tar.gz` archives |
| `build-env` | No | `''` | Newline-separated `KEY=VALUE` entries exported before `cargo build` |
| `tag` | No | `''` | GitHub Release tag (for example `remio@0.2.0`) |
| `github-token` | No | `''` | Token for creating/attaching releases (required when `tag` is set) |
| `certificate` | No | `''` | Base64 `.p12` certificate (required when `tag` is set; empty signs ad hoc) |
| `certificate-password` | No | `''` | Password for `.p12` certificate |
| `hardened-runtime` | No | `'false'` | Add `--options runtime --timestamp` to `codesign` |
| `toolchain` | No | `''` | Toolchain passed to `preparation/rust` |
| `cache-key` | No | `'release-macos'` | Cache key passed to `preparation/rust` |
| `artifact-name` | No | `''` | Uploaded artifact name override (defaults to `<app-name>-macos`) |

### Outputs

`version`, `arm64-dmg`, `x64-dmg`, `arm64-archive`, `x64-archive`

### Usage

```yaml
steps:
  - name: Release macOS
    id: macos
    uses: zgid123/alpha-dx/gh-actions/release/macos-gpui@main
    with:
      app-name: Remio
      package: remio
      bundle-id: com.remio.app
      info-plist: workspaces/remio/bundle/macos/Info.plist
      icon: workspaces/remio/bundle/macos/AppIcon.icns
      build-env: REMIO_UPDATE_SERVER=${{ vars.REMIO_UPDATE_SERVER }}
      tag: ${{ needs.release.outputs.app-tag }}
      github-token: ${{ secrets.GITHUB_TOKEN }}
      certificate: ${{ secrets.MACOS_CERTIFICATE }}
      certificate-password: ${{ secrets.MACOS_CERTIFICATE_PASSWORD }}
```

---

## `release/macos-swift`

Builds `arm64` and `x64` Swift macOS `.app` bundles (with optional Rust FFI pre-build), optionally updates bundled `Info.plist` entries via `PlistBuddy`, signs with a `.p12` certificate in a temporary Keychain, packs `.dmg` and `.app.tar.gz` archives, uploads workflow artifacts, and attaches them to a GitHub Release when `tag` is set.

### What It Does

1. When `rust-ffi-package` is set, runs [`preparation/rust`](./preparation/rust/action.yml) with targets `aarch64-apple-darwin x86_64-apple-darwin`.
2. When `certificate` or `tag` is set, imports the `.p12` certificate into a temporary keychain and deletes it in `if: always()`.
3. For each architecture (`arm64` and `x64`), optionally compiles `rust-ffi-package`, compiles Swift via `swift build -c release`, assembles `<AppName>.app`, updates `plist-entries`, codesigns, packs `.dmg` + `.app.tar.gz`, and writes artifact paths to outputs.
4. Uploads artifacts and, if `tag` is non-empty, attaches them to the GitHub Release.

### Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `app-name` | Yes | — | Bundle and DMG display name (for example `Typio`) |
| `swift-package-path` | Yes | — | Directory containing `Package.swift` |
| `info-plist` | Yes | — | Path to `Info.plist` |
| `icon` | Yes | — | Path to `AppIcon.icns` |
| `product-name` | No | `''` | Swift executable name (defaults to `app-name`) |
| `bundle-id` | No | `''` | Optional bundle identifier passed to `codesign --identifier` |
| `extra-resources` | No | `''` | Newline-separated resource paths copied into `Contents/Resources/` |
| `plist-entries` | No | `''` | Newline-separated `Key=Value` written into `Info.plist` via `PlistBuddy` when non-empty |
| `rust-ffi-package` | No | `''` | Optional Cargo FFI crate (`-p <package>`) built before `swift build` |
| `rust-ffi-target-env` | No | `''` | Env var name set to the active Rust target triple for `swift build` |
| `rust-ffi-profile-env` | No | `''` | Env var name set to `release` for `swift build` |
| `min-macos-version` | No | `''` | Optional `otool -l` `minos` check (`''` skips) |
| `version` | No | `''` | Optional version string included in filenames |
| `output-dir` | No | `'build'` | Output directory for DMGs and `.app.tar.gz` archives |
| `build-env` | No | `''` | Newline-separated `KEY=VALUE` entries exported before building |
| `tag` | No | `''` | GitHub Release tag (for example `typio-macos@0.1.0`) |
| `github-token` | No | `''` | Token for creating/attaching releases (required when `tag` is set) |
| `certificate` | No | `''` | Base64 `.p12` certificate (required when `tag` is set; empty signs ad hoc) |
| `certificate-password` | No | `''` | Password for `.p12` certificate |
| `hardened-runtime` | No | `'false'` | Add `--options runtime --timestamp` to `codesign` |
| `toolchain` | No | `'stable'` | Toolchain passed to `preparation/rust` |
| `cache-key` | No | `'release-macos'` | Cache key passed to `preparation/rust` |
| `artifact-name` | No | `''` | Uploaded artifact name override (defaults to `<app-name>-macos`) |

### Outputs

`version`, `arm64-dmg`, `x64-dmg`, `arm64-archive`, `x64-archive`

### Usage

```yaml
steps:
  - name: Release macOS
    id: macos
    uses: zgid123/alpha-dx/gh-actions/release/macos-swift@main
    with:
      app-name: Typio
      swift-package-path: workspaces/macos
      info-plist: workspaces/macos/Resources/Info.plist
      icon: workspaces/macos/Resources/AppIcon.icns
      plist-entries: TypioUpdateServer=${{ vars.TYPIO_UPDATE_SERVER }}
      rust-ffi-package: typio-ffi
      rust-ffi-target-env: TYPIO_RUST_TARGET
      rust-ffi-profile-env: TYPIO_RUST_PROFILE
      output-dir: workspaces/macos/build
      tag: ${{ needs.release.outputs.macos-tag }}
      github-token: ${{ secrets.GITHUB_TOKEN }}
      certificate: ${{ secrets.MACOS_CERTIFICATE }}
      certificate-password: ${{ secrets.MACOS_CERTIFICATE_PASSWORD }}
```

---

## `release/windows-rust-inno-setup`

Builds a Windows executable (with Cargo and/or a custom PowerShell command), installs Inno Setup via Chocolatey if missing, compiles a `.iss` installer script, uploads the resulting `.exe` as a workflow artifact, and attaches it to a GitHub Release when `tag` is set.

### What It Does

1. When `package` is non-empty, runs [`preparation/rust`](./preparation/rust/action.yml) with `cache-key`.
2. Installs Inno Setup (`choco install innosetup`) if `iscc` is not already available.
3. Exports `build-env` variables and builds the app (`cargo build --release -p <package>` and/or `build-command`).
4. Runs `ISCC.exe` on `iss-path`, locates `installer-path`, and writes `installer` and `version` outputs.
5. Uploads the installer as a GitHub Actions artifact and, if `tag` is non-empty, creates (if missing) and uploads to the GitHub Release.

### Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `app-name` | Yes | — | Display name for artifacts and release notes (for example `Remio` or `Typio`) |
| `iss-path` | Yes | — | Path to the Inno Setup `.iss` script |
| `installer-path` | Yes | — | Exact path or glob matching the generated installer (for example `target/release/Remio-*-setup.exe`) |
| `package` | No | `''` | Optional Cargo package name (`-p <package>`). Enables `preparation/rust` |
| `build-command` | No | `''` | Optional custom PowerShell build command |
| `build-env` | No | `''` | Newline-separated `KEY=VALUE` entries exported before building |
| `tag` | No | `''` | GitHub Release tag (for example `remio@0.2.0`) |
| `github-token` | No | `''` | Token for creating/attaching releases (required when `tag` is set) |
| `toolchain` | No | `''` | Toolchain passed to `preparation/rust` (`''` follows `rust-toolchain.toml`) |
| `cache-key` | No | `'release-windows'` | Cache key passed to `preparation/rust` |
| `artifact-name` | No | `''` | Uploaded artifact name override (defaults to `<app-name>-windows`) |

### Outputs

`version`, `installer`

### Usage

```yaml
steps:
  - name: Release Windows
    id: windows
    uses: zgid123/alpha-dx/gh-actions/release/windows-rust-inno-setup@main
    with:
      app-name: Remio
      package: remio
      iss-path: workspaces/remio/bundle/windows/remio.iss
      installer-path: target/release/Remio-*-setup.exe
      build-env: REMIO_UPDATE_SERVER=${{ vars.REMIO_UPDATE_SERVER }}
      tag: ${{ needs.release.outputs.app-tag }}
      github-token: ${{ secrets.GITHUB_TOKEN }}
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
      - uses: zgid123/alpha-dx/gh-actions/preparation/nodejs@main
      - run: pnpm --filter api test

  web:
    name: Web
    needs: changes
    if: fromJSON(needs.changes.outputs.changes).web
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: zgid123/alpha-dx/gh-actions/preparation/nodejs@main
      - run: pnpm --filter web test

  docs:
    name: Docs
    needs: changes
    if: fromJSON(needs.changes.outputs.changes).docs
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: zgid123/alpha-dx/gh-actions/preparation/nodejs@main
      - run: pnpm docs:build
```
