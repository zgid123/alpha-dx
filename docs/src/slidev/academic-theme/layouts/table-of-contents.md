# Table of Contents Layout (`table-of-contents`)

The `table-of-contents` layout renders standard Slidev table of contents navigation with support for custom heading content and depth filtering, rendered in Academic Theme typography.

## Presentation Preview

<LayoutDemo layout="table-of-contents" theme="academic" />

---

## Usage

In your slide markdown frontmatter, set `layout: table-of-contents`:

```md
---
layout: table-of-contents
maxDepth: 1
hideInToc: true
---

# Lecture Agenda
```

---

## Frontmatter Configuration

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxDepth` | `number \| string` | `1` | Depth of headings to include from the deck. Set higher to include deeper subheadings. |
| `hideInToc` | `boolean` | `true` | Standard Slidev frontmatter property to exclude this slide itself from the table of contents. |
