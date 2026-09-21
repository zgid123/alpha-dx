# Arc TOC Layout (`arc-toc`)

The `arc-toc` layout renders a circular arc table of contents with measured bezier connector lines, color-coded node badges, and links to slide sections, styled to fit the Academic Theme.

## Presentation Preview

<LayoutDemo layout="arc-toc" theme="academic" />

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

## Academic Theme Notes

- Adapts typography, background colors, and heading sizes to the Academic Theme design tokens.
- Suppresses footer slide numbering automatically to preserve clean visual balance.
