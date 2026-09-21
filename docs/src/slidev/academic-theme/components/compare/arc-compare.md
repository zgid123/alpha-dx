# Arc Compare

Opposing curved comparison diagram with edge project hubs, numbered arc nodes, and central versus divider for comparing experimental methodologies and model baselines. Includes `ArcCompare`, `ArcCompareLeft`, `ArcCompareRight`, `ArcCompareTitle`, `ArcCompareContents`, `ArcCompareCallout`, `ArcCompareBadge`, `ArcCompareHeading`, and `ArcCompareContent`.

## Presentation Preview

<ArcCompareDemo theme="academic" />

---

## Usage Examples

### Detailed Compound Comparison

```vue
<ArcCompare :count="3">
  <ArcCompareLeft color="#ea580c">
    <ArcCompareTitle>Baseline<br />Approach</ArcCompareTitle>
    <ArcCompareContents>
      <ArcCompareCallout>
        <ArcCompareBadge>01</ArcCompareBadge>
        <ArcCompareHeading>High Latency</ArcCompareHeading>
        <ArcCompareContent>
          Sequential processing incurs substantial inference latency.
        </ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>02</ArcCompareBadge>
        <ArcCompareHeading>Memory Footprint</ArcCompareHeading>
        <ArcCompareContent>
          Requires extensive GPU VRAM allocations for batching.
        </ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>03</ArcCompareBadge>
        <ArcCompareHeading>Brittle Convergence</ArcCompareHeading>
        <ArcCompareContent>
          Susceptible to gradient vanishing in deep layers.
        </ArcCompareContent>
      </ArcCompareCallout>
    </ArcCompareContents>
  </ArcCompareLeft>

  <ArcCompareRight color="#0284c7">
    <ArcCompareTitle>Proposed<br />Architecture</ArcCompareTitle>
    <ArcCompareContents>
      <ArcCompareCallout>
        <ArcCompareBadge>01</ArcCompareBadge>
        <ArcCompareHeading>Sub-linear Time</ArcCompareHeading>
        <ArcCompareContent>
          Parallelized attention achieves significant speedups.
        </ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>02</ArcCompareBadge>
        <ArcCompareHeading>Compact Footprint</ArcCompareHeading>
        <ArcCompareContent>
          Quantized weights reduce memory overhead by 4x.
        </ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>03</ArcCompareBadge>
        <ArcCompareHeading>Stable Training</ArcCompareHeading>
        <ArcCompareContent>
          Residual normalization guarantees robust convergence.
        </ArcCompareContent>
      </ArcCompareCallout>
    </ArcCompareContents>
  </ArcCompareRight>
</ArcCompare>
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

## Props Reference (`ArcCompare`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `count` | `number` | `3` | No | Number of comparison points per side (`3` or `4`). |
| `vsText` | `string` | `'Vs'` | No | Text inside the central divider badge. |
| `vsSize` | `number` | `14` | No | Font size of the central versus badge text. |
| `animation` | `boolean` | `true` | No | Enables the entrance animation. |
| `autoScale` | `boolean` | `true` | No | Automatically scales diagram to fit the slide bounds. |
