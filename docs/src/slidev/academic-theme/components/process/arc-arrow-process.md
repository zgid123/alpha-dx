# Arc Arrow Process

U-shaped curved process workflow with interlocking chevron arrows and outline callouts. Supports 2, 3, or 4 steps, plus standalone arrows. Includes `ArcArrowProcess`, `ArcArrowProcessArrow`, `ArcArrowProcessCallout`, `ArcArrowProcessHeading`, `ArcArrowProcessContent`, and `ArcArrowProcessIcon`.

## Purpose

U-shaped curved workflow with interlocking chevron arrows showing a sequential process flow of 2-4 stages.

**When to use**: When presenting linear workflows, development pipelines, or step-by-step procedures. Supports 2, 3, or 4 stages. Use the standalone `ArcArrowProcessArrow` for decorative chevron elements outside the full process diagram.

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

---

## Child Components

- `ArcArrowProcessCallout`: Individual stage text block.
- `ArcArrowProcessHeading`: Stage title text.
- `ArcArrowProcessContent`: Stage description body.
- `ArcArrowProcessArrow`: Standalone or nested chevron arrow SVG component.

### `ArcArrowProcessArrow` Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `color` | `string` | `'#6fa3b5'` | No | Base fill color. |
| `gradientEnd` | `string` | `'#8cb8c8'` | No | End color for the linear gradient. |
| `stroke` | `string` | `'#ffffff'` | No | Outline stroke color. |
| `strokeWidth` | `number` | `2.5` | No | Outline stroke width. |
| `width` | `number \| string` | `undefined` | No | Width of the arrow wrapper. |
| `height` | `number \| string` | `undefined` | No | Height of the arrow wrapper. |
| `rotation` | `number` | `0` | No | Rotation angle. |
| `standalone` | `boolean` | `undefined` | No | Forces standalone viewBox and layout if true. |
| `path` | `string` | `undefined` | No | SVG path for the chevron. |
| `viewBox` | `string` | `undefined` | No | Custom viewBox string. |
| `originY` | `number` | `-220` | No | Pivot point Y-coordinate for rotation when not standalone. |
