# Thanks Layout (`thanks`)

The `thanks` layout renders a dedicated concluding slide with animated `SquareThanks` artwork and decorative geometric elements.

## Purpose

Dedicated closing slide with animated `SquareThanks` artwork and decorative geometric elements.

**When to use**: Final slide of your presentation. Zero-config — just set `layout: thanks` and optionally `hideInToc: true`.

## Presentation Preview

<LayoutDemo layout="thanks" />

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

When no body content is provided, it displays the default closing message: `Thank You<br>for your attention!`.

### Custom Heading Text

You can pass custom closing text using a Markdown heading:

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
- Runs the default entrance sequence with decorative rotating square accents and "Thank you" typography.
- Ideal for ending developer talks, conferences, and milestone presentations.
