# Quad Hub

Four-part circular hub infographic with concentric quadrant blocks, central badge, and symmetrical callouts for categorizing research components. Includes `QuadHub`, `QuadHubCallout`, `QuadHubCenter`, `QuadHubHeading`, `QuadHubContent`, and `QuadHubIcon`.

## Presentation Preview

<QuadHubDemo theme="academic" />

---

## Usage Examples

### Slotted Composition

```vue
<QuadHub title="Framework" subtitle="Architecture">
  <QuadHubCallout color="#0ea5e9">
    <QuadHubHeading>Data Ingestion</QuadHubHeading>
    <QuadHubContent>Clean and normalize input datasets.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#10b981">
    <QuadHubHeading>Feature Extraction</QuadHubHeading>
    <QuadHubContent>Derive high-dimensional representations.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#f59e0b">
    <QuadHubHeading>Model Inference</QuadHubHeading>
    <QuadHubContent>Execute tensor predictions efficiently.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#ef4444">
    <QuadHubHeading>Metrics & Audit</QuadHubHeading>
    <QuadHubContent>Monitor accuracy and error distributions.</QuadHubContent>
  </QuadHubCallout>
</QuadHub>
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

## Props Reference (`QuadHub`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `title` | `string` | `undefined` | No | Title displayed in the center hub. |
| `subtitle` | `string` | `undefined` | No | Subtitle displayed in the center hub. |
| `animation` | `boolean` | `true` | No | Enables entrance animation sequence. |
| `arcRatio` | `number` | `0.55` | No | Concentric arc thickness ratio. |
| `arcBorderRatio` | `number` | `0.8` | No | Concentric border arc thickness ratio. |
| `autoScale` | `boolean` | `true` | No | Automatically scales diagram to fit slide height. |
