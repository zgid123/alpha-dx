# Thanks Layout (`thanks`)

The `thanks` layout renders a dedicated concluding slide with animated `ThanksContent` artwork and decorative geometric elements.

## Purpose

Dedicated closing slide with animated `ThanksContent` artwork and decorative geometric elements.

**When to use**: Final slide of your presentation. Zero-config — just set `layout: thanks` and optionally `hideInToc: true`.

## Presentation Preview

<LayoutDemo layout="thanks" />

---

## Usage

In your slide markdown frontmatter, set `layout: thanks`:

```md
---
layout: thanks
hideInToc: true
---
```

---

## Behavior

- Automatically mounts and renders the complete `ThanksContent` composition.
- Runs the default entrance sequence with decorative rotating square accents and "Thank you" typography.
- Ideal for ending developer talks, conferences, and milestone presentations.
