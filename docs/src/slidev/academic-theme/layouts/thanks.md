# Thanks Layout (`thanks`)

The `thanks` layout renders a dedicated concluding slide with animated `SquareThanks` artwork and decorative geometric elements, suitable for lectures and defense closings.

## Presentation Preview

<LayoutDemo layout="thanks" theme="academic" />

---

## Usage

### Default Closing

In your slide markdown frontmatter, set `layout: thanks`:

```md
---
layout: thanks
hideInToc: true
---
```

When no body content is provided, the default message `Thank You<br>for your attention!` is displayed.

### Custom Heading Text

You can provide custom closing text using a Markdown heading:

```md
---
layout: thanks
hideInToc: true
---

# Thank you
```

### Custom Markup

You can also pass multi-line HTML markup:

```md
---
layout: thanks
hideInToc: true
---

<div>
  Thank you<br /> And good night!
</div>
```

---

## Behavior

- Automatically mounts and renders the complete `SquareThanks` composition.
- Runs the default entrance sequence with rotating square accents and closing typography.
- Can be paired with `<Speaker author="Alpha" date="2026-08-12" />` for defense and lecture wrap-ups.
