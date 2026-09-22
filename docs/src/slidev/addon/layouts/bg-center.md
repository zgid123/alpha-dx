# Background Center Layout (`bg-center`)

The `bg-center` layout centers your slide content in the middle of the screen over a full-bleed background image or CSS gradient, with optional dimming and automatic section indexing.

## Purpose

Centers slide content over a full-bleed background image or CSS gradient with optional dimming overlay and section indexing.

**When to use**: Section divider slides with dramatic background imagery, or any slide where centered content over a background creates visual impact. Use `dim: true` for text readability over busy backgrounds.

## Presentation Preview

<LayoutDemo layout="bg-center" />

---

## Usage

In your slide markdown frontmatter, set `layout: bg-center`:

```md
---
layout: bg-center
background: linear-gradient(135deg, #111827 0%, #172554 55%, #164e63 100%)
dim: true
indexed: true
---

# Section Title

Supporting introduction or subtitle.
```

---

## Frontmatter Configuration

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `background` | `string` | `''` | Image URL or CSS background value passed to Slidev's `handleBackground`. |
| `dim` | `boolean` | `true` | Applies dimming overlay to maintain high text contrast against busy backgrounds. |
| `indexed` | `boolean` | `false` | Displays a two-digit section index number derived from the slide's position in the top-level TOC. |
