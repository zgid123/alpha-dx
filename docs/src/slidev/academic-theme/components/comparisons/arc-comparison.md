# Arc Comparison

Opposing curved comparison diagram with edge project hubs, numbered arc nodes, and central versus divider for comparing experimental methodologies and model baselines. Includes `ArcComparison`, `ArcComparisonLeft`, `ArcComparisonRight`, `ArcComparisonTitle`, `ArcComparisonContents`, `ArcComparisonCallout`, `ArcComparisonBadge`, `ArcComparisonHeading`, and `ArcComparisonContent`.

## Presentation Preview

<ArcComparisonDemo theme="academic" />

---

## Usage Examples

### Detailed Compound Comparison

```vue
<ArcComparison :count="3">
  <ArcComparisonLeft color="#ea580c">
    <ArcComparisonTitle>Baseline<br />Approach</ArcComparisonTitle>
    <ArcComparisonContents>
      <ArcComparisonCallout>
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>High Latency</ArcComparisonHeading>
        <ArcComparisonContent>
          Sequential processing incurs substantial inference latency.
        </ArcComparisonContent>
      </ArcComparisonCallout>
      <ArcComparisonCallout>
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Memory Footprint</ArcComparisonHeading>
        <ArcComparisonContent>
          Requires extensive GPU VRAM allocations for batching.
        </ArcComparisonContent>
      </ArcComparisonCallout>
      <ArcComparisonCallout>
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Brittle Convergence</ArcComparisonHeading>
        <ArcComparisonContent>
          Susceptible to gradient vanishing in deep layers.
        </ArcComparisonContent>
      </ArcComparisonCallout>
    </ArcComparisonContents>
  </ArcComparisonLeft>

  <ArcComparisonRight color="#0284c7">
    <ArcComparisonTitle>Proposed<br />Architecture</ArcComparisonTitle>
    <ArcComparisonContents>
      <ArcComparisonCallout>
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Sub-linear Time</ArcComparisonHeading>
        <ArcComparisonContent>
          Parallelized attention achieves significant speedups.
        </ArcComparisonContent>
      </ArcComparisonCallout>
      <ArcComparisonCallout>
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Compact Footprint</ArcComparisonHeading>
        <ArcComparisonContent>
          Quantized weights reduce memory overhead by 4x.
        </ArcComparisonContent>
      </ArcComparisonCallout>
      <ArcComparisonCallout>
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Stable Training</ArcComparisonHeading>
        <ArcComparisonContent>
          Residual normalization guarantees robust convergence.
        </ArcComparisonContent>
      </ArcComparisonCallout>
    </ArcComparisonContents>
  </ArcComparisonRight>
</ArcComparison>
```

### 4-Points Compound Comparison

```vue
<ArcComparison :count="4">
  <ArcComparisonLeft :count="4" color="#ea580c">
    <ArcComparisonTitle>Baseline<br />Approach</ArcComparisonTitle>
    <ArcComparisonContents>
      <ArcComparisonCallout :index="0">
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>High Latency</ArcComparisonHeading>
        <ArcComparisonContent>
          Sequential processing incurs substantial inference latency.
        </ArcComparisonContent>
      </ArcComparisonCallout>
      <ArcComparisonCallout :index="1">
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Memory Footprint</ArcComparisonHeading>
        <ArcComparisonContent>
          Requires extensive GPU VRAM allocations for batching.
        </ArcComparisonContent>
      </ArcComparisonCallout>
      <ArcComparisonCallout :index="2">
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Brittle Convergence</ArcComparisonHeading>
        <ArcComparisonContent>
          Susceptible to gradient vanishing in deep layers.
        </ArcComparisonContent>
      </ArcComparisonCallout>
      <ArcComparisonCallout :index="3">
        <ArcComparisonBadge>04</ArcComparisonBadge>
        <ArcComparisonHeading>High Complexity</ArcComparisonHeading>
        <ArcComparisonContent>
          Quadratic computational cost scales poorly with sequence length.
        </ArcComparisonContent>
      </ArcComparisonCallout>
    </ArcComparisonContents>
  </ArcComparisonLeft>

  <ArcComparisonRight :count="4" color="#0284c7">
    <ArcComparisonTitle>Proposed<br />Architecture</ArcComparisonTitle>
    <ArcComparisonContents>
      <ArcComparisonCallout :index="0">
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Sub-linear Time</ArcComparisonHeading>
        <ArcComparisonContent>
          Parallelized attention achieves significant inference speedups.
        </ArcComparisonContent>
      </ArcComparisonCallout>
      <ArcComparisonCallout :index="1">
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Compact Footprint</ArcComparisonHeading>
        <ArcComparisonContent>
          Quantized weights reduce runtime memory overhead by 4x.
        </ArcComparisonContent>
      </ArcComparisonCallout>
      <ArcComparisonCallout :index="2">
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Stable Training</ArcComparisonHeading>
        <ArcComparisonContent>
          Residual normalization guarantees robust optimization.
        </ArcComparisonContent>
      </ArcComparisonCallout>
      <ArcComparisonCallout :index="3">
        <ArcComparisonBadge>04</ArcComparisonBadge>
        <ArcComparisonHeading>Linear Complexity</ArcComparisonHeading>
        <ArcComparisonContent>
          Sparse kernel execution achieves linear time scaling.
        </ArcComparisonContent>
      </ArcComparisonCallout>
    </ArcComparisonContents>
  </ArcComparisonRight>
</ArcComparison>
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

## Props Reference

### `ArcComparison`

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `count` | `number` | `3` | No | Number of comparison points per side (`3` or `4`). |
| `vsText` | `string` | `'Vs'` | No | Text inside the central divider badge. |
| `vsSize` | `number` | `14` | No | Font size of the central versus badge text. |
| `hubRadius` | `number` | `135` | No | Semicircular project hub radius in pixels. |
| `arcRadius` | `number` | `235` | No | Radius of the guide arcs. |
| `animation` | `boolean` | `true` | No | Enables staggered entrance animations. |
| `autoScale` | `boolean` | `true` | No | Automatically scales diagram to fit the slide bounds. |
| `hidePagy` | `boolean` | `false` | No | Hides pagination indicators on the active slide. |

### `ArcComparisonCallout`

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `index` | `number` | `auto` | No | Explicit 0-indexed position on the arc (`0` to `count - 1`). |
| `id` | `string \| number` | `auto` | No | Number or label inside the badge (e.g. `'01'`). |
| `title` | `string` | `undefined` | No | Text title override when not using child components. |
| `description` | `string` | `undefined` | No | Description override when not using child components. |
| `color` | `string` | `sideColor` | No | Custom accent color override for this callout. |
| `textColor` | `string` | `undefined` | No | Custom description text color. |
| `textGap` | `number` | `auto` | No | Gap in pixels between badge and callout text. |

### `ArcComparisonLeft` & `ArcComparisonRight`

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `color` | `string` | `'#ea580c'` / `'#208b9e'` | No | Side accent theme color for hubs and badges. |
| `title` | `string` | `undefined` | No | Hub title text when not using `<ArcComparisonTitle>`. |
| `count` | `number` | `rootContext.count` | No | Explicit points count for this side container. |

### `ArcComparisonBadge`

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `id` | `string \| number` | `callout.id` | No | Custom badge label. |
| `color` | `string` | `callout.color` | No | Custom background color for the circle. |
| `size` | `number` | `52` | No | Circle diameter in pixels. |

---

## Child Components Summary

- `ArcComparisonLeft`: Left-side container with custom accent color and title.
- `ArcComparisonRight`: Right-side container with custom accent color and title.
- `ArcComparisonTitle`: Large heading rendered inside the semicircular hub.
- `ArcComparisonContents`: List wrapper for comparison callout points.
- `ArcComparisonCallout`: Individual numbered criteria row positioned along the arc.
- `ArcComparisonBadge`: Circular numbered pill for each criterion.
- `ArcComparisonHeading`: Callout header label.
- `ArcComparisonContent`: Callout description paragraph.
