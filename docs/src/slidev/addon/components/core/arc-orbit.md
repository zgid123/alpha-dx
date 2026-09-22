# Arc Orbit

Edge-anchored semicircular hub with radial orbiting callout nodes along a curved guide arc. Designed as a foundational primitive that powers single-sided slide layouts and side-by-side comparisons. Includes `ArcOrbit`, `ArcOrbitTitle`, `ArcOrbitContents`, `ArcOrbitCallout`, `ArcOrbitBadge`, `ArcOrbitHeading`, and `ArcOrbitContent`.

## Purpose

Renders an edge-anchored semicircular hub with 3 or 4 radial callout nodes along a curved guide arc. A foundational primitive for single-sided feature breakdowns and side-by-side comparisons.

**When to use**: When presenting 3-4 related concepts radiating from a central topic — feature breakdowns, architecture pillars, or product capabilities. Choose `position="left"` or `position="right"` based on your slide composition. For opposing dual-sided comparisons, use `ArcComparison` instead.

## Presentation Preview

<ArcOrbitDemo />

---

## Usage Examples

### Right-Anchored (Features / Pros Breakdown)

```vue
<ArcOrbit position="right" :count="3" color="#ea580c">
  <ArcOrbitTitle>Implementing<br />a New CRM System</ArcOrbitTitle>
  <ArcOrbitContents>
    <ArcOrbitCallout>
      <ArcOrbitBadge>01</ArcOrbitBadge>
      <ArcOrbitHeading>Customer Service:</ArcOrbitHeading>
      <ArcOrbitContent>
        Streamline resolution and client messaging.
      </ArcOrbitContent>
    </ArcOrbitCallout>
    <ArcOrbitCallout>
      <ArcOrbitBadge>02</ArcOrbitBadge>
      <ArcOrbitHeading>Sales Efficiency:</ArcOrbitHeading>
      <ArcOrbitContent>
        Automate tasks and track pipeline leads.
      </ArcOrbitContent>
    </ArcOrbitCallout>
    <ArcOrbitCallout>
      <ArcOrbitBadge>03</ArcOrbitBadge>
      <ArcOrbitHeading>Data Analysis:</ArcOrbitHeading>
      <ArcOrbitContent>
        Gain customer insights through unified data.
      </ArcOrbitContent>
    </ArcOrbitCallout>
  </ArcOrbitContents>
</ArcOrbit>
```

### Left-Anchored (4-Point Sequential Orbit)

```vue
<ArcOrbit position="left" :count="4" color="#0284c7">
  <ArcOrbitTitle>Architecture<br />Pillars</ArcOrbitTitle>
  <ArcOrbitContents>
    <ArcOrbitCallout :index="0">
      <ArcOrbitBadge>01</ArcOrbitBadge>
      <ArcOrbitHeading>Bounded Context</ArcOrbitHeading>
      <ArcOrbitContent>
        Autonomous services communicate over defined asynchronous events.
      </ArcOrbitContent>
    </ArcOrbitCallout>
    <ArcOrbitCallout :index="1">
      <ArcOrbitBadge>02</ArcOrbitBadge>
      <ArcOrbitHeading>Elastic Scale</ArcOrbitHeading>
      <ArcOrbitContent>
        Horizontal autoscaling responds dynamically to spike traffic demand.
      </ArcOrbitContent>
    </ArcOrbitCallout>
    <ArcOrbitCallout :index="2">
      <ArcOrbitBadge>03</ArcOrbitBadge>
      <ArcOrbitHeading>Isolated Faults</ArcOrbitHeading>
      <ArcOrbitContent>
        Failures remain localized without cascading across service domains.
      </ArcOrbitContent>
    </ArcOrbitCallout>
    <ArcOrbitCallout :index="3">
      <ArcOrbitBadge>04</ArcOrbitBadge>
      <ArcOrbitHeading>Linear Complexity</ArcOrbitHeading>
      <ArcOrbitContent>
        Sparse kernel execution achieves linear time scaling.
      </ArcOrbitContent>
    </ArcOrbitCallout>
  </ArcOrbitContents>
</ArcOrbit>
```

---

## Props Reference

### `ArcOrbit`

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `position` | `'left' \| 'right'` | `'left'` | No | Edge placement of the semicircular hub. Callouts radiate inward toward the center. |
| `count` | `number` | `3` | No | Number of orbiting callout nodes (`3` or `4`). |
| `color` | `string` | `'#ea580c'` | No | Accent theme color for hub and badges. |
| `title` | `string` | `undefined` | No | Hub title text when not using `<ArcOrbitTitle>`. |
| `animation` | `boolean` | `true` | No | Enables staggered entrance animations. |
| `autoScale` | `boolean` | `true` | No | Automatically scales diagram to fit the container bounds. |
| `hubRadius` | `number` | `135` | No | Semicircular hub radius in pixels. |
| `arcRadius` | `number` | `235` | No | Radius of the guide arc in pixels. |
| `height` | `number \| string` | `undefined` | No | Explicit container height in pixels or CSS value. |
| `scale` | `number` | `undefined` | No | Fixed scaling override factor. |
| `maxScale` | `number` | `undefined` | No | Maximum scale factor when `autoScale` is enabled. |

### `ArcOrbitCallout`

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `position` | `'left' \| 'right'` | `root.position` | No | Override side alignment for this callout. |
| `index` | `number` | `auto` | No | Explicit 0-indexed position on the arc (`0` to `count - 1`). |
| `id` | `string \| number` | `auto` | No | Number or label inside the badge (e.g. `'01'`). |
| `title` | `string` | `undefined` | No | Text title override when not using child components. |
| `description` | `string` | `undefined` | No | Description override when not using child components. |
| `color` | `string` | `root.color` | No | Custom accent color override for this callout. |
| `textColor` | `string` | `undefined` | No | Custom description text color. |
| `textGap` | `number` | `auto` | No | Gap in pixels between badge and callout text. |

### `ArcOrbitBadge`

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `id` | `string \| number` | `callout.id` | No | Custom badge label. |
| `color` | `string` | `callout.color` | No | Custom background color for the circle. |
| `size` | `number` | `52` | No | Circle diameter in pixels. |
