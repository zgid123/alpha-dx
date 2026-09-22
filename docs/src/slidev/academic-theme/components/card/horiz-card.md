# Horizontal Card

Horizontal step card component styled for clean academic presentation decks. Includes `HorizCard`, `HorizCardBadge`, `HorizCardHeading`, `HorizCardContent`, and `HorizCardIcon`.

## Purpose

Horizontal card with a step ribbon badge, chamfered corner accent, and optional icon circle for presenting numbered steps or feature highlights.

**When to use**: When laying out 2-4 step process cards in a grid, or presenting individual feature highlights with numbered steps. Supports both prop-based and slot composition patterns.

## Presentation Preview

<HorizCardDemo theme="academic" />

---

## Usage Examples

### Prop-based Card

```vue
<HorizCard
  step="01"
  title="Discovery"
  description="Explore academic literature, formulate hypotheses, and specify experiment bounds."
  color="#0ea5e9"
/>
```

### Slidev Configuration

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

---

## Props Reference (`HorizCard`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `step` | `string \| number` | `'01'` | No | Step indicator number or text displayed on the ribbon badge. |
| `title` | `string` | `'Lorem Ipsum'` | No | Card title text. |
| `description` | `string` | `undefined` | No | Body description text. |
| `color` | `string` | `'#ea583a'` | No | Accent color for the badge, corner blob, and decorative elements. |
| `cardBg` | `string` | `'#ffffff'` | No | Card background color. |
| `dots` | `boolean` | `true` | No | Shows or hides the decorative dot matrix pattern. |
