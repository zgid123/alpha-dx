# Gear Triad

Three-way mechanical cogwheel infographic with 3D folded ribbon petals, central floating hub, and surrounding callout blocks. Includes `GearTriad`, `GearTriadCallout`, `GearTriadHeading`, `GearTriadDescription`, `GearTriadIcon`, and `GearTriadCenter`.

## Purpose

Mechanical cogwheel infographic with 3D folded ribbon petals, a central floating hub, and optional drill-down content panels. Supports an interactive multi-step mode where the gear shifts left and reveals numbered detail lists for each option.

**When to use**: When you need a visually rich 3-option overview that can optionally expand into detailed breakdowns on click. Ideal for methodology overviews, tool comparisons, or research approach summaries where each option has 3-4 supporting details.

## Standard Triad Preview (Without Contents)

The standard academic triad layout with 3 surrounding callout blocks around the central gear.

<GearTriadDemo theme="academic" />

```vue
<GearTriad>
  <GearTriadCallout>
    <GearTriadHeading>Hypothesis</GearTriadHeading>
    <GearTriadDescription>
      Formulate testable research questions and theoretical models.
    </GearTriadDescription>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadHeading>Experiment</GearTriadHeading>
    <GearTriadDescription>
      Execute controlled investigations with automated measurement pipelines.
    </GearTriadDescription>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadHeading>Validation</GearTriadHeading>
    <GearTriadDescription>
      Subject findings to reproducible peer reviews and empirical analysis.
    </GearTriadDescription>
  </GearTriadCallout>
</GearTriad>
```

---

## Interactive Detail Preview (With Contents)

When advancing through presentation clicks, the gear moves to the left and focuses on each option, displaying numbered methodology points on the right.

<GearTriadContentsDemo theme="academic" />

```vue
<GearTriad>
  <!-- Triad Callouts (visible in overview mode, rotate & fade out on shift) -->
  <GearTriadCallout>
    <GearTriadHeading>Hypothesis</GearTriadHeading>
    <GearTriadDescription>Theoretical Models & Research Questions</GearTriadDescription>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadHeading>Experiment</GearTriadHeading>
    <GearTriadDescription>Controlled Empirical Measurement</GearTriadDescription>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadHeading>Validation</GearTriadHeading>
    <GearTriadDescription>Reproducible Verification & Peer Review</GearTriadDescription>
  </GearTriadCallout>

  <!-- Option 1 Details (visible when Option 1 is active) -->
  <GearTriadContents :option="1">
    <GearTriadContent>Formulate rigorous mathematical models.</GearTriadContent>
    <GearTriadContent>Establish boundary conditions and axioms.</GearTriadContent>
    <GearTriadContent>Synthesize background academic literature.</GearTriadContent>
    <GearTriadContent>State testable primary and null hypotheses.</GearTriadContent>
  </GearTriadContents>

  <!-- Option 2 Details (visible when Option 2 is active) -->
  <GearTriadContents :option="2">
    <GearTriadContent>Design automated testing pipelines.</GearTriadContent>
    <GearTriadContent>Collect randomized empirical telemetry.</GearTriadContent>
    <GearTriadContent>Control confounding variables and variance.</GearTriadContent>
    <GearTriadContent>Execute benchmark comparisons across suites.</GearTriadContent>
  </GearTriadContents>

  <!-- Option 3 Details (visible when Option 3 is active) -->
  <GearTriadContents :option="3">
    <GearTriadContent>Perform cross-validation against baseline data.</GearTriadContent>
    <GearTriadContent>Publish deterministic replication artifacts.</GearTriadContent>
    <GearTriadContent>Conduct independent peer inspection.</GearTriadContent>
    <GearTriadContent>Verify statistical significance with p-values.</GearTriadContent>
  </GearTriadContents>
</GearTriad>
```

---

## Usage Examples

### Slidev Configuration

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

---

## Props Reference (`GearTriad`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `title` | `string` | `undefined` | No | Header title rendered above the diagram. |
| `subtitle` | `string` | `undefined` | No | Header subtitle rendered beneath title. |
| `items` | `readonly IGearTriadItem[]` | `undefined` | No | Array of 3 items overriding petal and callout data. |
| `icons` | `readonly (TGearTriadIcon \| undefined)[]` | `undefined` | No | Array of up to 3 petal icons (`document`, `shield`, `archive`, UnoCSS class, or Vue component). |
| `animation` | `boolean` | `true` | No | Enables entrance spin and pop animation sequence. |
| `active` | `boolean` | `undefined` | No | Manually controls active animation state. |
| `startDelay` | `number` | `undefined` | No | Delay in ms before animations begin (defaults to 600ms in `shifting-intro`). |
| `scale` | `number` | `undefined` | No | Explicit scale multiplier for the diagram. |
| `autoScale` | `boolean` | `true` | No | Automatically scales diagram to fit slide dimensions. |
| `maxScale` | `number` | `undefined` | No | Maximum scale cap for auto-scaling. |
| `height` | `number \| string` | `undefined` | No | Custom container height. |
| `centerIcon` | `string \| object \| false` | `'gear'` | No | Icon displayed inside the central floating hub (`'gear'` by default like the design; pass `false` to hide). |
| `step` | `number` | `undefined` | No | Active transition step (`0`: centered triad, `1`: Option 1 focused on left). |
| `clicks` | `number` | `undefined` | No | Direct slide clicks sync. |
| `moved` | `boolean` | `undefined` | No | Explicit boolean toggle for left-shifted state. |

---

## Child Components

- `GearTriadCallout`: Individual callout positioned around the gear (indices 0: left, 1: right, 2: bottom).
- `GearTriadHeading`: Callout header title text.
- `GearTriadDescription`: Callout body description text.
- `GearTriadContents`: Detail view revealed on the right when the gear is shifted to the left.
- `GearTriadContent`: Individual numbered detail item (`01`, `02`, `03`, `04`) inside `GearTriadContents` supporting free DOM.
- `GearTriadCenter`: Center floating circular hub disk with elevation drop shadow.
- `GearTriadIcon`: Vector icon component supporting built-in SVGs (`document`, `shield`, `archive`, `gear`), UnoCSS icon classes, and custom Vue components.

### Props Reference (`GearTriadCallout`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `id` | `string \| number` | `undefined` | No | Overrides internal ID. |
| `index` | `number` | `undefined` | No | Overrides registered index. |
| `icon` | `TGearTriadIcon` | `undefined` | No | Overrides petal icon. |
| `color` | `string` | `undefined` | No | Overrides base color. |
| `depthColor` | `string` | `undefined` | No | Overrides 3D shadow color. |
| `cardBg` | `string` | `undefined` | No | Background color of callout. |
| `textColor` | `string` | `undefined` | No | Description text color. |
| `titleColor` | `string` | `undefined` | No | Title text color. |
| `title` | `string` | `undefined` | No | Title text. |
| `description` | `string` | `undefined` | No | Description text. |

### Props Reference (`GearTriadContents`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `title` | `string` | `undefined` | No | Header title override. |
| `description` | `string` | `undefined` | No | Header description override. |
| `option` | `number` | `undefined` | No | Option index (1, 2, or 3) this detail view belongs to. |

### Props Reference (`GearTriadContent`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `step` | `string \| number` | `undefined` | No | Overrides the step number (e.g. '01'). |
| `option` | `number` | `undefined` | No | Specific option index this content is bound to. |

### Props Reference (`GearTriadIcon`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `size` | `number` | `32` | No | Icon size in pixels. |
| `color` | `string` | `'#0f172a'` | No | Icon color. |
| `strokeWidth` | `number` | `2` | No | Vector stroke width. |
| `icon` | `TGearTriadIcon` | `undefined` | No | Icon identifier or component. |
