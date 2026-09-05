# Alpha Academic Theme

A light-only Slidev theme for lectures, research presentations, technical
reports, and thesis defenses.

## Installation

```bash
pnpm add -D @alphacifer/slidev-theme-alpha-academic
```

## Usage

```yaml
---
theme: '@alphacifer/slidev-theme-alpha-academic'
---
```

Combine it with Alpha's reusable Slidev addon when needed:

```yaml
---
theme: '@alphacifer/slidev-theme-alpha-academic'
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

## Layouts

- `cover`: title slide with a restrained academic accent.
- `default`: standard content slide.
- `section`: centered section divider.
- `end`: closing slide.

## Design tokens

Override the CSS custom properties in a deck-level `style.css` to customize the
theme without replacing its layouts:

```css
:root {
  /* Primary Text / Heading Color */
  --alpha-academic-primary: #0f172a;
  /* Content Background Color */
  --alpha-academic-bg: #f8fafc;
  /* Accent Highlight (e.g. Cover / Badge) */
  --alpha-academic-accent: #0ea5e9;
  /* Accent Foreground (e.g. highlighted terms / marks) */
  --alpha-academic-accent-foreground: #0284c7;
}

.dark {
  --alpha-academic-accent: #10b981;
  --alpha-academic-accent-foreground: #34d399;
}
```

## Preview

```bash
pnpm --filter @alphacifer/slidev-theme-alpha-academic dev
```

Build the preview without opening a browser:

```bash
pnpm --filter @alphacifer/slidev-theme-alpha-academic preview:build
```
