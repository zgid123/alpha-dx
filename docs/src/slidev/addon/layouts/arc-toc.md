# Arc TOC Layout

The `arc-toc` layout renders a circular arc table of contents with measured bezier connector lines, color-coded node badges, and links to slide sections.

## Presentation Preview

<LayoutDemo layout="arc-toc" />

---

## Usage

In your slide markdown frontmatter, set `layout: arc-toc`:

```md
---
layout: arc-toc
maxItems: 7
indexed: false
---

# Agenda
```

---

## Frontmatter Configuration

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxItems` | `number \| string` | `7` | Maximum number of TOC sections to display along the arc (up to 7). |
| `maxDepth` | `number \| string` | `1` | Maximum heading level depth. |
| `indexed` | `boolean` | `false` | Displays numerical indexes on the section items. |

---

## Behavior

- Reads the deck's navigation structure automatically via Slidev's navigation context.
- Dynamically renders up to 7 distinct section markers with matching marker colors (`#ffad21`, `#24b9aa`, `#3188e4`, `#59d875`, `#f53270`, `#8b5cf6`, `#ef4444`).
- Renders an optional title slot (defaults to `<h1>Table of Contents</h1>`).
