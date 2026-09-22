# Blank Layout (`blank`)

The `blank` layout provides an unconstrained canvas slide for the Academic Theme without expecting a top slide title or heading. It is designed for slides that need to present full diagrams, comparison components, code samples, or custom content while preserving Academic Theme margins, typography, and bottom pagination.

## Purpose

Unconstrained canvas slide without heading presumption for diagrams, full-bleed content, and custom compositions.

**When to use**: When you need full control over slide layout — large diagrams, comparison infographics, or any content that doesn't fit the standard `default` layout's margins and heading structure.

## Presentation Preview

<LayoutDemo layout="blank" theme="academic" />

---

## Usage

In your slide markdown frontmatter, set `layout: blank`:

```md
---
layout: blank
---

A minimal content slide without a title heading, maximizing canvas space while retaining academic margins and footer pagination.

- Clean typographic focus
- Unconstrained vertical layout
- Retains footer slide numbers
```

---

## Frontmatter Configuration

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `background` | `string` | `''` | Optional image URL or CSS background value passed to Slidev's `handleBackground`. |

---

## When to Use `blank` vs `default` vs `bg-center`

| Layout | Purpose | Pagination | Heading Presumption | Centering |
| :--- | :--- | :--- | :--- | :--- |
| `blank` | Content-first or full-canvas slides without top title | Visible | None | Standard margin flow |
| `default` | Standard academic slide | Visible | Level-1 `# Title` | Top aligned |
| `bg-center` | Hero/chapter background slides with optional index | Hidden | Slot title/subtitle | `place-content-center` |
