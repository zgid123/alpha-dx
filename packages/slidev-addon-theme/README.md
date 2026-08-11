# @alphacifer/slidev-addon-theme

Shared Slidev components and layouts for Alpha presentations.

## Installation

```bash
pnpm add -D @alphacifer/slidev-addon-theme
```

```yaml
---
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

## Core

- Components: `Date`, `QnA`, `Quote`, `ReflectedTitle`, `Speaker`
- Layouts: `bg-center`, `table-of-contents`

## Shifting heading

- Component: `TransitionHeading`
- Layout: `shifting-intro`
- Utilities: `mergeUno`, `createUnoClassMerger`

## Thanks

- Components: `ThanksContent`, `ThanksOutlineSquare`, `ThanksSquare`
- Layout: `thanks`

## Preview

```bash
pnpm --filter @alphacifer/slidev-addon-theme dev
```

The preview deck is defined in `slides.md` and loads this package locally as a
Slidev addon.

Build the preview without opening a browser:

```bash
pnpm --filter @alphacifer/slidev-addon-theme preview:build
```
