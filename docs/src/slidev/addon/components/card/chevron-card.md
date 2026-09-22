# Chevron Card

Horizontal process card featuring an indented chevron badge on the left side and rounded container on the right. Includes `ChevronCard`, `ChevronCardBadge`, `ChevronCardHeading`, and `ChevronCardContent`.

## Purpose

Horizontal card with an indented chevron-shaped badge for presenting sequential process steps with visual directionality.

**When to use**: When building process grids where the chevron shape reinforces the sequential flow — onboarding steps, deployment pipelines, or sprint phases. Works well in 2x2 grid layouts.

## Presentation Preview

<ChevronCardDemo />

---

## Usage Examples

### Single Step Card

```vue
<ChevronCard step="01" color="#f59e0b">
  <ChevronCardHeading>Discovery & Research</ChevronCardHeading>
  <ChevronCardContent>
    Analyze user requirements, architecture dependencies, and core assumptions.
  </ChevronCardContent>
</ChevronCard>
```

### Multi-step Process Grid

```vue
<div class="grid grid-cols-2 gap-4">
  <ChevronCard step="01" color="#f59e0b">
    <ChevronCardHeading>Discovery</ChevronCardHeading>
    <ChevronCardContent>Explore requirements and user journeys.</ChevronCardContent>
  </ChevronCard>

  <ChevronCard step="02" color="#10b981">
    <ChevronCardHeading>Design</ChevronCardHeading>
    <ChevronCardContent>Build wireframes and UI contracts.</ChevronCardContent>
  </ChevronCard>

  <ChevronCard step="03" color="#06b6d4">
    <ChevronCardHeading>Build</ChevronCardHeading>
    <ChevronCardContent>Implement components with test suites.</ChevronCardContent>
  </ChevronCard>

  <ChevronCard step="04" color="#f43f5e">
    <ChevronCardHeading>Deploy</ChevronCardHeading>
    <ChevronCardContent>Publish packages and monitor rollouts.</ChevronCardContent>
  </ChevronCard>
</div>
```

---

## Props Reference (`ChevronCard`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `step` | `string \| number` | `'01'` | No | Step number or text inside the chevron badge. |
| `color` | `string` | `'#f59e0b'` | No | Primary accent color for the chevron badge. |
| `notchDepth` | `number` | `26` | No | Inward notch depth of the chevron point in pixels. |
| `chevronWidth` | `number` | `130` | No | Width of the chevron badge section in pixels. |
| `cardBg` | `string` | `'#f5f5f7'` | No | Background color for the card body. |
| `borderRadius` | `number` | `18` | No | Border radius for the card container in pixels. |
| `animation` | `boolean` | `true` | No | Controls whether entrance animation is applied. |

---

## Slots Reference

| Slot | Description |
| :--- | :--- |
| `title` | Custom heading slot. |
| `description` | Custom description slot. |
| `badge` | Custom badge content. |
| `default` | Child compound elements (`<ChevronCardHeading>`, `<ChevronCardContent>`). |
