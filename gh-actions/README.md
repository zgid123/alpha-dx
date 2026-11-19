# Reusable GitHub Actions

Shared composite GitHub Actions for Alpha's repositories. Reference any action from external repositories with `@main` (or a specific tag / commit SHA).

## Available Actions

| Action | Path | Description |
| --- | --- | --- |
| `prepare-nodejs` | [`./prepare-nodejs/action.yml`](./prepare-nodejs/action.yml) | Set up pnpm, install Node.js with pnpm store caching, and install dependencies |
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
