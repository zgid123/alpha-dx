# Background Center Layout (`bg-center`)

The `bg-center` layout centers your slide content in the middle of the screen over an image or CSS gradient, with optional dimming and automatic section indexing formatted for Academic presentations.

## Presentation Preview

<LayoutDemo layout="bg-center" theme="academic" />

---

## Usage

In your slide markdown frontmatter, set `layout: bg-center`:

```md
---
layout: bg-center
background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f1f5f9 100%)
dim: false
indexed: true
---

# Methodology Overview

Formal framework and computational foundations.
```

---

## Frontmatter Configuration

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `background` | `string` | `''` | Image URL or CSS background value passed to Slidev's `handleBackground`. |
| `dim` | `boolean` | `true` | Applies dimming overlay to maintain high text contrast against busy backgrounds. |
| `indexed` | `boolean` | `false` | Displays a two-digit section index number derived from the slide's position in the top-level TOC. |

---

## Academic Theme Notes

- In Academic Theme, the section index badge uses `--alpha-academic-accent-foreground` for subtle emphasis.
- The footer slide counter is automatically hidden on centered background slides.
