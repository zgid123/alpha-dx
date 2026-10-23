# Slidev Core Design System

`@alphacifer/slidev-core-theme` provides the shared design foundation for Alpha DX presentation decks and themes.

It standardizes the baseline color tokens, typography scales, UnoCSS utility classes, and CSS cascade layers to deliver consistent, accessible, and high-contrast presentations across light and dark modes.

---

## Interactive Core Design System Explorer

Explore the foundational tokens, typography scale, and a live presentation preview below:

<DesignSystemDemo variant="core" />

---

## Architecture & Cascade Layers

Core tokens are declared inside the `@layer alpha-theme-tokens` CSS cascade layer. This architecture ensures that themes (such as [`@alphacifer/slidev-academic-theme`](/slidev/academic-theme/design-system)) and custom user slide decks can override any token cleanly in their local stylesheets without needing `!important`:

```
┌─────────────────────────────────────────────────────────────┐
│                   Presentation Themes                       │
│  @alphacifer/slidev-academic-theme  │  Seriph / Custom Deck │
└──────────────────────────────┬──────────────────────────────┘
                               │ inherits & customizes
┌──────────────────────────────▼──────────────────────────────┐
│                    Addon & Components                       │
│              @alphacifer/slidev-addon-theme                 │
│  (Infographics, Arc Orbit, DiD, Process, Cards, Layouts)    │
└──────────────────────────────┬──────────────────────────────┘
                               │ consumes core tokens
┌──────────────────────────────▼──────────────────────────────┐
│                   Core Design System                        │
│               @alphacifer/slidev-core-theme                 │
│  • CSS Tokens (@layer alpha-theme-tokens)                   │
│  • Base Typography Sizing Rules                             │
│  • UnoCSS Theme & Dynamic Regex Rules                       │
└─────────────────────────────────────────────────────────────┘
```

Core is a library dependency; it installs automatically when you use `@alphacifer/slidev-academic-theme` or `@alphacifer/slidev-addon-theme`, and does not need to appear in a deck's `addons` list.

---

## Core Color Tokens

Core defines five foundational CSS custom properties with light-mode defaults and `.dark` / `html.dark` overrides:

| Token Name | Light Value | Dark Value | UnoCSS Utilities | Semantic Role |
| :--- | :--- | :--- | :--- | :--- |
| `--alpha-primary` | `#f8fafc` | `#0f172a` | `bg-primary`, `fill-primary` | Slide canvas, modal dialogs, and background surfaces |
| `--alpha-foreground-primary` | `#0f172a` | `#f1f5f9` | `text-foreground-primary` | Main slide titles (`h1`), body copy, and high-contrast labels |
| `--alpha-foreground-secondary` | `#475569` | `#94a3b8` | `text-foreground-secondary` | Subtitles (`h4`), card descriptions, footnotes, and metadata |
| `--alpha-foreground-accent` | `#0284c7` | `#38bdf8` | `text-foreground-accent` | Brand highlights, active tabs, links, and focal graphic paths |
| `--alpha-stroke-primary` | `#cbd5e1` | `#475569` | `border-stroke-primary`, `stroke-stroke-primary` | Card boundaries, dividers, table grid lines, and connector arcs |

### Token Declaration

These tokens are defined in `@alphacifer/slidev-core-theme/style.css`:

```css
@layer alpha-theme-tokens {
  :root {
    --alpha-primary: #f8fafc;
    --alpha-foreground-primary: #0f172a;
    --alpha-foreground-secondary: #475569;
    --alpha-foreground-accent: #0284c7;
    --alpha-stroke-primary: #cbd5e1;

    --alpha-font-size-cover: 3.75rem;
    --alpha-font-size-h1: 2.25rem;
    --alpha-font-size-h2: 1.875rem;
    --alpha-font-size-h3: 1.5rem;
    --alpha-font-size-h4: 1.25rem;
    --alpha-font-size-h5: 1.125rem;
    --alpha-font-size-h6: 1rem;
    --alpha-font-size-base: 1rem;
    --alpha-font-size-small: 0.875rem;
  }

  .dark,
  html.dark {
    --alpha-primary: #0f172a;
    --alpha-foreground-primary: #f1f5f9;
    --alpha-foreground-secondary: #94a3b8;
    --alpha-foreground-accent: #38bdf8;
    --alpha-stroke-primary: #475569;
  }
}
```

---

## Typography Scale

Core establishes a responsive type scale tailored specifically for presentation readability:

| Level | Tag / Selector | Rem | Px | Weight | CSS Variable |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cover Title** | `h1` in `.alpha-cover` | `3.75rem` | 60px | Bold (700) | `--alpha-font-size-cover` |
| **Heading 1** | `h1` | `2.25rem` | 36px | Bold (700) | `--alpha-font-size-h1` |
| **Heading 2** | `h2` | `1.875rem` | 30px | Bold (700) | `--alpha-font-size-h2` |
| **Heading 3** | `h3` | `1.5rem` | 24px | Bold (700) | `--alpha-font-size-h3` |
| **Heading 4** | `h4` | `1.25rem` | 20px | Medium / Bold | `--alpha-font-size-h4` |
| **Heading 5** | `h5` | `1.125rem` | 18px | Bold (700) | `--alpha-font-size-h5` |
| **Heading 6** | `h6` | `1rem` | 16px | Bold (700) | `--alpha-font-size-h6` |
| **Base Content** | `p`, `li`, `body` | `1rem` | 16px | Regular (400) | `--alpha-font-size-base` |
| **Small / Note** | `small` | `0.875rem` | 14px | Regular (400) | `--alpha-font-size-small` |

### Automatic Heading Sizing

All `h1` through `h6` headings inside `.slidev-page .slidev-layout` default to bold weight and automatically receive their corresponding font size token when no utility class is provided.

For example, writing:

```md
# Core Architecture
```

automatically renders with `font-size: var(--alpha-font-size-h1, 2.25rem)`. If an explicit size is needed, standard utility classes (such as `text-3xl`, `text-lg`, or `text-[28px]`) take precedence.

---

## UnoCSS Integration

Core exports an UnoCSS configuration preset containing theme mappings and dynamic regex rules.

### Theme Mappings

The configuration binds Core tokens to UnoCSS theme utilities:

```ts
import unoConfig from '@alphacifer/slidev-core-theme/uno';

// Colors:
// - bg-primary
// - text-foreground-primary
// - text-foreground-secondary
// - text-foreground-accent
// - border-stroke-primary
// - fill-primary
// - stroke-stroke-primary

// Font sizes:
// - text-base (1rem / 1.5rem line-height)
// - text-sm (0.875rem / 1.25rem line-height)
```

### Custom Regex Rules

Core supplies canonical rules for dynamic variable bindings and layout helpers:

| Rule | Syntax Example | Generated CSS |
| :--- | :--- | :--- |
| **Dynamic Color** | `text-(--my-color)` | `color: var(--my-color)` |
| **Dynamic Background** | `bg-(--my-bg)` | `background-color: var(--my-bg)` |
| **Dynamic Border** | `border-(--my-stroke)` | `border-color: var(--my-stroke)` |
| **Dynamic Ring** | `ring-(--my-ring)` | `--un-ring-color: var(--my-ring)` |
| **Break Word** | `wrap-break-word` | `overflow-wrap: break-word` |
| **Linear Gradient** | `bg-linear-to-br` | `linear-gradient(to bottom right in oklch, ...)` |

---

## Usage in Projects

### 1. Installation

```bash
pnpm add @alphacifer/slidev-core-theme
```

### 2. Stylesheet Import

Import the shared stylesheet in your theme or deck's `style.css`:

```css
@import '@alphacifer/slidev-core-theme/style.css';
```

### 3. UnoCSS Configuration

Re-export Core's configuration from `uno.config.ts`:

```ts
// uno.config.ts
export { default } from '@alphacifer/slidev-core-theme/uno';
```

### 4. Overriding Tokens in Decks

To customize colors or font sizes for a specific deck, declare your overrides in `style.css`:

```css
/* style.css */
@import '@alphacifer/slidev-core-theme/style.css';

:root {
  --alpha-foreground-accent: #6366f1; /* Indigo light accent */
}

.dark {
  --alpha-foreground-accent: #818cf8; /* Indigo dark accent */
}
```

Because Core declares default tokens within `@layer alpha-theme-tokens`, unlayered deck styles take precedence without requiring `!important`.

---

## Downstream Themes

- **[Academic Theme Design System](/slidev/academic-theme/design-system)**: See how `@alphacifer/slidev-academic-theme` customizes Core with emerald dark accents, lecture code block tokens, and academic layout styling.
- **[Slidev Addon](/slidev/addon/)**: Explore reusable infographic components and presentation layouts built upon Core.
