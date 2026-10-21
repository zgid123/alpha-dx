# @alphacifer/slidev-core-theme

Shared color tokens, typography defaults, and UnoCSS utilities for Alpha's
Slidev packages. Core is a library dependency; it does not need to appear in a
deck's `addons` list.

## Installation

The `@alphacifer/slidev-academic-theme` and `@alphacifer/slidev-addon-theme`
packages install Core automatically. To use Core in another Slidev theme or
addon, add it as a regular dependency:

```bash
pnpm add @alphacifer/slidev-core-theme
```

## Usage

Import the shared stylesheet from your theme or addon's `style.css`:

```css
@import '@alphacifer/slidev-core-theme/style.css';
```

Re-export the UnoCSS configuration from `uno.config.ts` when Core supplies all
the theme values you need:

```ts
export { default } from '@alphacifer/slidev-core-theme/uno';
```

## Color tokens

Core defines these CSS custom properties for light and dark mode:

| Token                          | Light     | Dark      |
| ------------------------------ | --------- | --------- |
| `--alpha-primary`              | `#f8fafc` | `#0f172a` |
| `--alpha-foreground-primary`   | `#0f172a` | `#f1f5f9` |
| `--alpha-foreground-secondary` | `#475569` | `#94a3b8` |
| `--alpha-foreground-accent`    | `#0284c7` | `#38bdf8` |
| `--alpha-stroke-primary`       | `#cbd5e1` | `#475569` |

The defaults sit in the `alpha-theme-tokens` cascade layer, so themes and decks
can override them in their own stylesheets. Core's UnoCSS configuration maps
them to `bg-primary`, `text-foreground-primary`, `text-foreground-secondary`,
`text-foreground-accent`,
`border-stroke-primary`, `fill-primary`, and `stroke-stroke-primary`.

## Typography

Core sets the base size on Slidev layouts and sizes headings without a `class`
attribute. Those `h1` through `h6` headings use bold weight.

| Content      | Size       |
| ------------ | ---------- |
| Cover `h1`   | `3.75rem`  |
| `h1`         | `2.5rem`   |
| `h2`         | `2rem`     |
| `h3`         | `1.625rem` |
| `h4`         | `1.25rem`  |
| `h5`         | `1rem`     |
| `h6`         | `0.875rem` |
| Base content | `1rem`     |
| `small`      | `0.875rem` |

The `text-base` and `text-sm` UnoCSS utilities use the same base and small size
tokens.
