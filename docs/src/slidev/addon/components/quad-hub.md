# Quad Hub

Four-part circular hub infographic with concentric quadrant blocks, central badge, and symmetrical callouts. Includes `QuadHub`, `QuadHubCallout`, `QuadHubCenter`, `QuadHubHeading`, `QuadHubContent`, and `QuadHubIcon`.

## Presentation Preview

<QuadHubDemo />

---

## Usage Examples

### Slotted Composition

```vue
<QuadHub title="4 Pillars" subtitle="System Architecture">
  <QuadHubCallout color="#f29e4b">
    <QuadHubHeading>Strategy</QuadHubHeading>
    <QuadHubContent>Formulate goals and roadmap.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#a4cb81">
    <QuadHubHeading>Execution</QuadHubHeading>
    <QuadHubContent>Iterate rapidly with automated tests.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#62b6a8">
    <QuadHubHeading>Security</QuadHubHeading>
    <QuadHubContent>Enforce policies and continuous posture checks.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#e9717a">
    <QuadHubHeading>Scale</QuadHubHeading>
    <QuadHubContent>Optimize edge distribution and caching.</QuadHubContent>
  </QuadHubCallout>
</QuadHub>
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

---

## Child Components

- `QuadHubCallout`: Container for each of the 4 quadrant callouts (top-left, top-right, bottom-right, bottom-left).
- `QuadHubCenter`: Customizable center circle badge.
- `QuadHubHeading`: Title text for the callout.
- `QuadHubContent`: Body description for the callout.
- `QuadHubIcon`: Center quadrant icon.
