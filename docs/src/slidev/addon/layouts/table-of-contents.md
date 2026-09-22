# Table of Contents Layout (`table-of-contents`)

The `table-of-contents` layout renders standard Slidev table of contents navigation with support for custom heading content and depth filtering.

## Purpose

Standard text-based table of contents with configurable heading depth filtering.

**When to use**: When you need a clean, simple agenda slide. For a more visually distinctive TOC, use the `arc-toc` layout instead.

## Presentation Preview

<LayoutDemo layout="table-of-contents" />

---

## Usage

In your slide markdown frontmatter, set `layout: table-of-contents`:

```md
---
layout: table-of-contents
maxDepth: 1
hideInToc: true
---

# Agenda
```

---

## Frontmatter Configuration

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxDepth` | `number \| string` | `1` | Depth of headings to include from the deck. Set higher to include deeper subheadings. |
| `hideInToc` | `boolean` | `true` | Standard Slidev frontmatter property to exclude this slide itself from the table of contents. |
