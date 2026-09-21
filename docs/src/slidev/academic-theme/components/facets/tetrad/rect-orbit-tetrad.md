# Rect Orbit Tetrad

Four-part circular hub infographic with concentric quadrant blocks, central badge, and symmetrical callouts for categorizing research components. Includes `RectOrbitTetrad`, `RectOrbitTetradCallout`, `RectOrbitTetradCenter`, `RectOrbitTetradHeading`, `RectOrbitTetradContent`, and `RectOrbitTetradIcon`.

## Presentation Preview

<RectOrbitTetradDemo theme="academic" />

---

## Usage Examples

### Slotted Composition

```vue
<RectOrbitTetrad title="Framework" subtitle="Architecture">
  <RectOrbitTetradCallout color="#0ea5e9">
    <RectOrbitTetradHeading>Data Ingestion</RectOrbitTetradHeading>
    <RectOrbitTetradContent>Clean and normalize input datasets.</RectOrbitTetradContent>
  </RectOrbitTetradCallout>
  <RectOrbitTetradCallout color="#10b981">
    <RectOrbitTetradHeading>Feature Extraction</RectOrbitTetradHeading>
    <RectOrbitTetradContent>Derive high-dimensional representations.</RectOrbitTetradContent>
  </RectOrbitTetradCallout>
  <RectOrbitTetradCallout color="#f59e0b">
    <RectOrbitTetradHeading>Model Inference</RectOrbitTetradHeading>
    <RectOrbitTetradContent>Execute tensor predictions efficiently.</RectOrbitTetradContent>
  </RectOrbitTetradCallout>
  <RectOrbitTetradCallout color="#ef4444">
    <RectOrbitTetradHeading>Metrics & Audit</RectOrbitTetradHeading>
    <RectOrbitTetradContent>Monitor accuracy and error distributions.</RectOrbitTetradContent>
  </RectOrbitTetradCallout>
</RectOrbitTetrad>
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

## Props Reference (`RectOrbitTetrad`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `title` | `string` | `undefined` | No | Title displayed in the center hub. |
| `subtitle` | `string` | `undefined` | No | Subtitle displayed in the center hub. |
| `animation` | `boolean` | `true` | No | Enables entrance animation sequence. |
| `arcRatio` | `number` | `0.55` | No | Concentric arc thickness ratio. |
| `arcBorderRatio` | `number` | `0.8` | No | Concentric border arc thickness ratio. |
| `autoScale` | `boolean` | `true` | No | Automatically scales diagram to fit slide height. |

### `RectOrbitTetradCallout`

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `id` | `string \| number` | `auto` | No | Quadrant numeric index identifier (`'01'`, `'02'`, `'03'`, `'04'`). |
| `icon` | `string \| object \| boolean` | `'user'` / `'academic'` / etc. | No | Icon class name (e.g. `'i-lucide-rocket'`), component, or `false` to hide. |
| `color` | `string` | `auto` | No | Base theme color for this quadrant block and dependent pastel hues. |
| `cardBg` | `string` | `auto` | No | Explicit background color override for the quadrant card. |
| `arcColor` | `string` | `auto` | No | Explicit background color override for the concentric arc ribbon. |
| `arcBorderColor` | `string` | `auto` | No | Explicit stroke color override for the concentric border line. |
| `titleColor` | `string` | `auto` | No | Title text color override for the quadrant header. |
| `textColor` | `string` | `auto` | No | Body text color override. |

---

## Child Components Summary

- `RectOrbitTetradCallout`: Container for each of the 4 quadrant callouts (top-left, top-right, bottom-right, bottom-left).
- `RectOrbitTetradCenter`: Customizable center circle badge with title and subtitle.
- `RectOrbitTetradHeading`: Title text for the callout.
- `RectOrbitTetradContent`: Body description for the callout.
- `RectOrbitTetradIcon`: Center quadrant icon.
