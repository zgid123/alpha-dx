# Vertical Card

Vertical card component with a step ribbon badge, top-right diagonal stripes, organic accent shape, and optional icon. Includes `VertCard`, `VertCardBadge`, `VertCardTitle`, `VertCardHeading`, `VertCardContent`, and `VertCardIcon`.

## Purpose

Vertical card with a step badge, diagonal stripe accents, and optional divider for presenting numbered items in a tall layout.

**When to use**: When arranging cards side-by-side in a horizontal row — the vertical orientation works well in `grid-cols-3` or `grid-cols-4` layouts. Choose badge `variant` to control badge positioning style.

## Presentation Preview

<VertCardDemo />

---

## Usage Examples

### Outside Badge Variant

```vue
<VertCard
  step="01"
  color="#ea583a"
  variant="outside"
>
  <VertCardTitle>Outside Badge</VertCardTitle>
  <VertCardContent>
    Default ribbon step badge anchored to the outer left card boundary.
  </VertCardContent>
</VertCard>
```

### Clean Variant (No Badge)

```vue
<VertCard
  variant="none"
  color="#2563eb"
  :dots="false"
>
  <VertCardTitle>Clean Layout</VertCardTitle>
  <VertCardContent>
    Spacious text layout without step indicators or badges.
  </VertCardContent>
</VertCard>
```

---

## Props Reference (`VertCard`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `step` | `string \| number` | `'01'` | No | Step number or text on the badge. |
| `title` | `string` | `undefined` | No | Card heading text (can also use `<VertCardTitle>`). |
| `description` | `string` | `undefined` | No | Card body text (can also use `<VertCardContent>`). |
| `color` | `string` | `'#ea583a'` | No | Primary accent color for badges and decorative stripes. |
| `variant` | `'outside' \| 'inside' \| 'none' \| 'hidden'` | `'outside'` | No | Badge positioning style. `'outside'` positions badge on the outer margin; `'none'` hides the badge. |
| `cardBg` | `string` | `'#ffffff'` | No | Background color for the card container. |
| `hasDivider` | `boolean` | `true` | No | Shows or hides the divider line below the title. |
| `dots` | `boolean` | `true` | No | Shows or hides decorative dots. |

---

## Slots Reference

| Slot | Description |
| :--- | :--- |
| `title` | Custom card title element. |
| `description` | Custom card description body. |
| `badge` | Custom badge element. |
| `icon` | Icon markup. |
| `default` | Child compound components (`VertCardTitle`, `VertCardContent`, etc.). |
