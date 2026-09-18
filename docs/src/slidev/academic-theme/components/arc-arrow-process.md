# Arc Arrow Process

U-shaped curved process workflow with interlocking chevron arrows and outline callouts. Supports 2, 3, or 4 steps, plus standalone arrows. Includes `ArcArrowProcess`, `ArcArrowProcessArrow`, `ArcArrowProcessCallout`, `ArcArrowProcessHeading`, `ArcArrowProcessContent`, and `ArcArrowProcessIcon`.

## Presentation Preview

<ArcArrowProcessDemo theme="academic" />

---

## Usage Examples

### 3-Stage Process Flow

```vue
<ArcArrowProcess :count="3">
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Problem Statement</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Formalize domain constraints and research objectives.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Methodology</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Implement the proposed algorithm with reproducible pipelines.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Validation</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Conduct empirical evaluation across standard academic benchmarks.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
</ArcArrowProcess>
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

## Props Reference (`ArcArrowProcess`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `count` | `number` | `undefined` | No | Number of chevron arrow stages (`2`, `3`, or `4`). Inferred from callouts if omitted. |
| `animation` | `boolean` | `true` | No | Enables entrance sequence animation. |
| `height` | `number \| string` | `370` | No | Diagram height in pixels (minimum `340px`). |
| `startDelay` | `number` | `undefined` | No | Animation delay in milliseconds. |
