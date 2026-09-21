# Thanks Layout (`thanks`)

The `thanks` layout renders a dedicated concluding slide with animated `ThanksContent` artwork and decorative geometric elements, suitable for lectures and defense closings.

## Presentation Preview

<LayoutDemo layout="thanks" theme="academic" />

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
- Runs the default entrance sequence with rotating square accents and closing typography.
- Can be paired with `<Speaker author="Alpha" date="2026-08-12" />` for defense and lecture wrap-ups.
