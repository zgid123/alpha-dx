# Slidev Tools Overview

Alpha DX provides an ecosystem of presentation tools, reusable Vue components, and dedicated themes built for [Slidev](https://sli.dev).

---

## Design System

All presentation packages in Alpha DX are built upon a unified design system that guarantees visual consistency, accessibility, and high contrast across light and dark modes:

- **Semantic Color Tokens**: Five core properties (`--alpha-primary`, `--alpha-foreground-primary`, `--alpha-foreground-secondary`, `--alpha-foreground-accent`, `--alpha-stroke-primary`) declared in `@layer alpha-theme-tokens`.
- **Typography Scale**: Automatically sized headings (`h1` through `h6`) and cover titles optimized for legibility during presentations.
- **UnoCSS Utilities**: Pre-configured utility classes and canonical regex rules for dynamic variable bindings.

[Explore the Slidev Design System &rarr;](/slidev/design-system)

---

## Packages

### 1. [@alphacifer/slidev-core-theme](/slidev/design-system)
The foundation library supplying:
- **Shared Design Tokens**: Consistent CSS custom properties with light and dark mode defaults.
- **Cascade Layer Architecture**: Uses `@layer alpha-theme-tokens` so deck and theme overrides take precedence without `!important`.
- **UnoCSS Theme & Rules**: Preconfigured UnoCSS configuration mapping tokens to semantic utilities.

[Explore Core Design System Documentation &rarr;](/slidev/design-system)

---

### 2. [@alphacifer/slidev-addon-theme](/slidev/addon/)
A modular Slidev addon providing:
- **Interactive Infographics & Diagrams**: Triads, hubs, process flows, and comparison matrices with parametric SVG geometry and animations.
- **Content Cards**: Horizontal and vertical card containers with step ribbons and corner accents.
- **Custom Layouts**: Interactive table of contents, animated intro shifts, full-bleed centered backgrounds, and closing artwork slides.
- **Seriph Theme Support**: Seamless integration with Slidev's default Seriph theme.

[Explore Addon Documentation &rarr;](/slidev/addon/)

---

### 3. [@alphacifer/slidev-academic-theme](/slidev/academic-theme/)
A comprehensive Slidev theme designed specifically for:
- Academic lectures and university courses.
- Master / PhD thesis defenses and qualification exams.
- Research paper presentations and conference talks.
- Structured typography, muted color palettes, and dedicated layouts (`cover`, `section`, `default`, `blank`, `end`).

[Explore Academic Theme Documentation &rarr;](/slidev/academic-theme/)

---

## Architecture & Structure

Slidev presentation assets in Alpha DX follow a unified structure:

```
packages/slidev/
├── core-theme/               # Core design tokens, typography, UnoCSS utilities
│   ├── style.css             # Base CSS variables (@layer alpha-theme-tokens)
│   ├── src/uno.ts            # UnoCSS theme color & fontSize mappings
│   └── package.json          # Shared library dependency
│
├── addon-theme/              # Addon package
│   ├── components/           # Grouped by usage: core, facets, process, compare, card
│   ├── layouts/              # Custom presentation layouts
│   └── utils/                # Geometry, UnoCSS class merging, auto-scaling
│
└── academic-theme/           # Complete Academic Theme
    ├── layouts/              # Academic slide layouts (cover, default, section, end)
    ├── style.css             # Academic typography & scoped CSS variables
    └── slide-bottom.vue      # Academic footer with slide numbering and author
```

---

## Quick Navigation

| Area | Core Design System | Addon Theme | Academic Theme |
| :--- | :--- | :--- | :--- |
| **Overview** | [Design System](/slidev/design-system) | [Addon Overview](/slidev/addon/) | [Academic Theme Overview](/slidev/academic-theme/) |
| **Tokens & Theme** | [Color & Typography Tokens](/slidev/design-system#core-color-tokens) | [Seriph Theme Styles](/slidev/addon/) | [Academic Design System](/slidev/academic-theme/design-system) |
| **Components** | [UnoCSS Rules](/slidev/design-system#unocss-integration) | [Addon Components](/slidev/addon/components/core/speaker) | [Academic Components](/slidev/academic-theme/components/core/speaker) |
| **Layouts** | [Cascade Layers](/slidev/design-system#architecture-layers) | [Addon Layouts](/slidev/addon/layouts/arc-toc) | [Academic Layouts](/slidev/academic-theme/layouts/cover) |
