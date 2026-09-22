# Horizontal Card

Horizontal card component featuring a step ribbon badge, chamfered corner with organic accent blob, and optional icon circle. Includes `HorizCard`, `HorizCardBadge`, `HorizCardHeading`, `HorizCardContent`, and `HorizCardIcon`.

## Purpose

Horizontal card with a step ribbon badge, chamfered corner accent, and optional icon circle for presenting numbered steps or feature highlights.

**When to use**: When laying out 2-4 step process cards in a grid, or presenting individual feature highlights with numbered steps. Supports both prop-based and slot composition patterns.

## Presentation Preview

<HorizCardDemo />

---

## Usage Examples

### Prop-based Card

```vue
<HorizCard
  step="01"
  title="Discovery"
  description="Explore ideas, define requirements, and formulate system design."
  color="#ea583a"
/>
```

### With Slot Composition

```vue
<HorizCard step="02" color="#2563eb">
  <template #icon>
    <div class="i-carbon-search text-4xl" />
  </template>
  <HorizCardHeading>Clean Architecture</HorizCardHeading>
  <HorizCardContent>
    Isolate domain logic from presentation and database dependencies.
  </HorizCardContent>
</HorizCard>
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
| `hasIconCircle` | `boolean` | `undefined` | No | Controls whether the icon circle container is rendered. |

---

## Slots Reference

| Slot | Description |
| :--- | :--- |
| `title` | Custom title content (overrides `title` prop). |
| `description` | Custom description content (overrides `description` prop). |
| `badge` | Custom badge content. |
| `icon` | Icon markup placed inside the icon container. |
| `default` | Additional body markup or compound children. |
