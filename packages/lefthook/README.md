Shared Lefthook configurations for Alpha's projects.

# Installation

```sh
pnpm add -D lefthook @alphacifer/lefthook
```

Install the git hooks in your repository:

```sh
pnpm exec lefthook install
```

# Usage

## Available Presets

Pick the presets your repository uses (`biome.yml` and `oxc.yml` are alternatives for JS/TS formatting & linting):

| Preset | Path | Commands |
| --- | --- | --- |
| `biome.yml` | `packages/lefthook/biome.yml` | `biome-check` (`pnpm biome check --write`, `stage_fixed: true`) |
| `oxc.yml` | `packages/lefthook/oxc.yml` | `format` (`oxfmt`, priority `1`) then `lint` (`oxlint --fix`, priority `2`), `stage_fixed: true` |
| `rust.yml` | `packages/lefthook/rust.yml` | `rust-fmt` (`rustfmt` on staged files, `stage_fixed: true`) and `rust-clippy` (`cargo clippy`) |

## Option 1: Extend from `node_modules` (`extends`)

Create `lefthook.yml` at your repository root (swap `biome.yml` for `oxc.yml` if using OXC):

```yaml
extends:
  - node_modules/@alphacifer/lefthook/biome.yml
  - node_modules/@alphacifer/lefthook/rust.yml
```

## Option 2: Load directly from GitHub (`remotes`)

Useful in repositories without `node_modules` (such as pure Rust repositories):

```yaml
remotes:
  - git_url: https://github.com/zgid123/alpha-dx
    ref: main
    configs:
      - packages/lefthook/biome.yml
      - packages/lefthook/rust.yml
```
