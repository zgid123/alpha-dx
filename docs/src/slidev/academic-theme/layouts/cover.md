# Cover Layout (`cover`)

The `cover` layout is designed for title slides in university lectures, conference keynotes, and thesis defenses.

## Presentation Preview

<LayoutDemo layout="cover" theme="academic" />

---

## Usage

In your slide markdown frontmatter, set `layout: cover`:

```md
---
layout: cover
background: /images/cover.jpg
---

# Neural Architecture Search
## Efficient Exploration of Transformer Topologies

<Speaker author="Alpha" date="2026-08-12" />
```

---

## Frontmatter Configuration

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `background` | `string` | `''` | Optional background image or CSS gradient passed to Slidev's `handleBackground`. |
