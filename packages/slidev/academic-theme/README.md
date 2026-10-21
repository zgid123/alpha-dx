# Alpha Academic Theme

A light-only Slidev theme for lectures, research presentations, technical
reports, and thesis defenses.

## Installation

```bash
pnpm add -D @alphacifer/slidev-academic-theme
```

The theme installs `@alphacifer/slidev-core-theme` automatically for its shared
color tokens, typography, and UnoCSS utilities. You do not need to register it
as an addon.

## Usage

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
---
```

Combine it with Alpha's reusable Slidev addon when needed:

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

## Layouts

- `cover`: title slide with a restrained academic accent.
- `default`: standard content slide.
- `blank`: unconstrained canvas slide.
- `section`: centered section divider.

## Color tokens

Override the CSS custom properties in a deck-level `style.css` to customize the
theme without replacing its layouts:

```css
:root {
  --alpha-primary: #f8fafc;
  --alpha-foreground-primary: #0f172a;
  --alpha-foreground-accent: #0284c7;
  --alpha-stroke-primary: #cbd5e1;
}

.dark {
  --alpha-foreground-accent: #34d399;
}
```

Core provides these tokens and UnoCSS color utilities through the theme:
`bg-primary`, `text-foreground-primary`,
`text-foreground-accent`, `border-stroke-primary`, `fill-primary`, and
`stroke-stroke-primary`. The optional `@alphacifer/slidev-addon-theme` package
adds reusable components and layouts; the academic theme does not require it.

## Preview

```bash
pnpm --filter @alphacifer/slidev-academic-theme dev
```

Build the preview without opening a browser:

```bash
pnpm --filter @alphacifer/slidev-academic-theme preview:build
```
