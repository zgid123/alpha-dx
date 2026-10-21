# Arc Defense-in-Depth (ArcDefenseInDepth)

Concentric semicircular security defense-in-depth shield diagram with stacked arc layers, top-center titles, and radial control indicator pins. Includes `ArcDefenseInDepth`, `ArcDefenseInDepthLayer`, `ArcDefenseInDepthLayerHeading`, `ArcDefenseInDepthLayerSector`, and `ArcDefenseInDepthLayerPart`.

## Purpose

Visualize layered defense-in-depth security architectures where controls are organized concentrically (e.g., Physical, Administrative, and Technical controls). Each layer features an arc band with a top title and symmetrically distributed control pins with glowing indicators.

**When to use**: Security architecture overviews, cybersecurity defense-in-depth models, threat modeling layers, compliance framework mapping, and multi-tier protection strategies.

## Presentation Preview

<ArcDefenseInDepthDemo />

---

## Usage Examples

### Compound Layers Hierarchy

```vue
<ArcDefenseInDepth>
  <ArcDefenseInDepthLayer>
    <ArcDefenseInDepthLayerHeading>Physical
controls</ArcDefenseInDepthLayerHeading>

      <ArcDefenseInDepthLayerPart>Access to servers</ArcDefenseInDepthLayerPart>
      <ArcDefenseInDepthLayerPart>Infrastructure</ArcDefenseInDepthLayerPart>

  </ArcDefenseInDepthLayer>

  <ArcDefenseInDepthLayer>
    <ArcDefenseInDepthLayerHeading>Administrative
controls</ArcDefenseInDepthLayerHeading>

      <ArcDefenseInDepthLayerSector>
        <ArcDefenseInDepthLayerPart position="top">Approved destinations</ArcDefenseInDepthLayerPart>
        <ArcDefenseInDepthLayerPart position="bottom">Data-sharing policy</ArcDefenseInDepthLayerPart>
      </ArcDefenseInDepthLayerSector>
      <ArcDefenseInDepthLayerPart>Staff procedures</ArcDefenseInDepthLayerPart>

  </ArcDefenseInDepthLayer>

  <ArcDefenseInDepthLayer>
    <ArcDefenseInDepthLayerHeading>Technical
controls</ArcDefenseInDepthLayerHeading>

      <ArcDefenseInDepthLayerPart>Authentication</ArcDefenseInDepthLayerPart>
      <ArcDefenseInDepthLayerSector :span="46" rotate="tangent">
        <ArcDefenseInDepthLayerPart position="top">Access control</ArcDefenseInDepthLayerPart>
        <ArcDefenseInDepthLayerPart position="bottom">Encryption</ArcDefenseInDepthLayerPart>
      </ArcDefenseInDepthLayerSector>
      <ArcDefenseInDepthLayerSector>
        <ArcDefenseInDepthLayerPart position="top">DDM</ArcDefenseInDepthLayerPart>
        <ArcDefenseInDepthLayerPart position="bottom">DLP</ArcDefenseInDepthLayerPart>
      </ArcDefenseInDepthLayerSector>
      <ArcDefenseInDepthLayerPart>Audit</ArcDefenseInDepthLayerPart>

  </ArcDefenseInDepthLayer>
</ArcDefenseInDepth>
```

---

## Props Reference

### `ArcDefenseInDepth`

| Prop                 | Type                                   | Default            | Required | Description                                                              |
| :------------------- | :------------------------------------- | :----------------- | :------: | :----------------------------------------------------------------------- |
| `order`              | `'outer-to-inner' \| 'inner-to-outer'` | `'outer-to-inner'` |    No    | Direction of layer nesting.                                              |
| `count`              | `number`                               | `undefined`        |    No    | Number of layers (1 to 6). Inferred from slotted layers if omitted.      |
| `activeIndex`        | `number`                               | `-1`               |    No    | Index of the active layer (-1 for all active).                           |
| `activePart`         | `string \| number`                     | `undefined`        |    No    | Label or index of a specific part to highlight.                          |
| `color`              | `string`                               | `'#0ea5e9'`        |    No    | Primary base theme color. Generates a balanced layered gradient palette. |
| `colors`             | `string[]`                             | `undefined`        |    No    | Optional explicit array of layer colors.                                 |
| `interactive`        | `boolean`                              | `true`             |    No    | Enables clicking layers to highlight them.                               |
| `animation`          | `boolean`                              | `true`             |    No    | Enables entrance animations.                                             |
| `autoScale`          | `boolean`                              | `true`             |    No    | Enables responsive diagram scaling via `useDiagramAutoScale`.            |
| `width`              | `number \| string`                     | `undefined`        |    No    | Container width.                                                         |
| `height`             | `number \| string`                     | `undefined`        |    No    | Container height.                                                        |
| `innerRadius`        | `number`                               | `110`              |    No    | Radius of the inner cutout semicircle.                                   |
| `outerRadius`        | `number`                               | `390`              |    No    | Radius of the outermost arc layer.                                       |
| `gap`                | `number`                               | `3`                |    No    | Spacing between concentric arc layers.                                   |
| `showDecorativeArcs` | `boolean`                              | `true`             |    No    | Renders outer decorative radar/shield accent lines.                      |

### `ArcDefenseInDepthLayer`

- **Rendered Class:** `.alpha-arc-defense-in-depth__layer` (renders SVG band path: `.alpha-arc-defense-in-depth__band`)
- **Rendered HTML Tag:** `<g>` (SVG group inside stage canvas)
- **Role:** Concentric arc layer provider grouping sectors, headings, and security pins.

| Prop             | Type      | Default     | Required | Description                              |
| :--------------- | :-------- | :---------- | :------: | :--------------------------------------- |
| `color`          | `string`  | `undefined` |    No    | Base accent color for this layer band.   |
| `textColor`      | `string`  | `undefined` |    No    | Text color for labels inside this layer. |
| `headingColor`   | `string`  | `undefined` |    No    | Heading color for this layer title.      |
| `index`          | `number`  | `undefined` |    No    | Concentric ring index (0-based).         |
| `active`         | `boolean` | `undefined` |    No    | Force layer active state.                |
| `showBoundaries` | `boolean` | `true`      |    No    | Toggles inner boundary lines.            |

### `ArcDefenseInDepthLayerHeading`

- **Rendered Class:** `.alpha-arc-defense-in-depth__layer-title`
- **Rendered HTML Tag:** `<div>`
- **Role:** Top-centered title label identifying the security ring domain.

| Prop    | Type     | Default     | Required | Description                        |
| :------ | :------- | :---------- | :------: | :--------------------------------- |
| `color` | `string` | `undefined` |    No    | Layer heading text color override. |

### `ArcDefenseInDepthLayerSector`

- **Rendered Class:** `.alpha-arc-defense-in-depth__sector` (modifier: `.alpha-arc-defense-in-depth__sector--active`)
- **Rendered HTML Tag:** `<path>` (SVG sector partition)
- **Role:** Angular slice within a ring grouping related security controls.

| Prop     | Type                                       | Default     | Required | Description                                      |
| :------- | :----------------------------------------- | :---------- | :------: | :----------------------------------------------- |
| `span`   | `number`                                   | `undefined` |    No    | Angular span in degrees occupied by this sector. |
| `angle`  | `number`                                   | `undefined` |    No    | Explicit angular placement in degrees.           |
| `split`  | `boolean`                                  | `false`     |    No    | Renders concentric divider arc between parts.    |
| `color`  | `string`                                   | `undefined` |    No    | Sector background color override.                |
| `rotate` | `boolean \| number \| 'tangent' \| 'auto'` | `'auto'`    |    No    | Angular rotation mode for child labels.          |
| `skew`   | `number \| string`                         | `undefined` |    No    | Visual skew angle for stacked labels.            |

### `ArcDefenseInDepthLayerPart`

- **Rendered Class:** `.alpha-arc-defense-in-depth__part`
- **Rendered HTML Tag:** `<div>` or `<button>`
- **Role:** Individual control pin and label anchored along the ring arc.

| Prop       | Type                                        | Default     | Required | Description                                      |
| :--------- | :------------------------------------------ | :---------- | :------: | :----------------------------------------------- |
| `label`    | `string`                                    | `undefined` |    No    | Label text fallback if default slot is not used. |
| `position` | `'top' \| 'middle' \| 'bottom' \| 'center'` | `'center'`  |    No    | Radial track alignment within layer band.        |
| `color`    | `string`                                    | `undefined` |    No    | Accent color override for indicator pin.         |
| `active`   | `boolean`                                   | `undefined` |    No    | Forces active highlight state.                   |
| `icon`     | `string \| object`                          | `undefined` |    No    | Optional icon class or component.                |
| `showDot`  | `boolean`                                   | `true`      |    No    | Renders small pin indicator dot.                 |
| `maxWidth` | `number \| string`                          | `undefined` |    No    | Constrains label wrap width.                     |

---

## Child Components Summary

- `ArcDefenseInDepthLayer`: Concentric arc layer provider.
- `ArcDefenseInDepthLayerHeading`: Layer heading rendered at the top of the arc band.
- `ArcDefenseInDepthLayerSector`: Groups multiple vertically/radially stacked parts in a shared angular sector.
- `ArcDefenseInDepthLayerPart`: Individual control pin and label.

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the radar rings and shield glow globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                                       | Default   | Description                          |
| :--------------------------------------------- | :-------- | :----------------------------------- |
| `--alpha-arc-defense-in-depth-layer-accent`    | `#0ea5e9` | Primary base theme accent.           |
| `--alpha-arc-defense-in-depth-layer-1-color`   | `#38bdf8` | Outer ring stroke/fill.              |
| `--alpha-arc-defense-in-depth-layer-2-color`   | `#0ea5e9` | Middle ring stroke/fill.             |
| `--alpha-arc-defense-in-depth-layer-3-color`   | `#0284c7` | Inner ring stroke/fill.              |
| `--alpha-arc-defense-in-depth-center-fill`     | `#ffffff` | Core hub center fill.                |
| `--alpha-arc-defense-in-depth-part-dot`        | `#0284c7` | Default pin indicator dot color.     |
| `--alpha-arc-defense-in-depth-part-dot-active` | `#38bdf8` | Highlighted pin indicator dot color. |

```vue
<!-- Example: Customizing colors via CSS variables -->
<ArcDefenseInDepth
  :style="{
    '--alpha-arc-defense-in-depth-layer-accent': '#6366f1',
    '--alpha-arc-defense-in-depth-layer-1-color': '#a5b4fc',
    '--alpha-arc-defense-in-depth-layer-2-color': '#6366f1',
    '--alpha-arc-defense-in-depth-layer-3-color': '#4338ca'
  }"
>
  <!-- defense layers -->
</ArcDefenseInDepth>
```

### 2. UnoCSS Utility Styling

`ArcDefenseInDepth` integrates `useMergedUnoAttrs`. You can pass UnoCSS utility classes to adjust centering, scale, or outer margins:

```vue
<ArcDefenseInDepth class="my-2 max-w-4xl mx-auto shadow-sm">
  <!-- layers -->
</ArcDefenseInDepth>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <ArcDefenseInDepth> (Root container) -->
<div class="alpha-arc-defense-in-depth">
  <div class="alpha-arc-defense-in-depth__stage">

    <!-- SVG Canvas for Concentric Rings & Sectors -->
    <svg>
      <!-- Layer Group (<ArcDefenseInDepthLayer>) -->
      <g class="alpha-arc-defense-in-depth__layer">
        <!-- Semicircular Layer Band -->
        <path class="alpha-arc-defense-in-depth__band [alpha-arc-defense-in-depth__band--animated]" ... />

        <!-- Sector Partition (<ArcDefenseInDepthLayerSector>) -->
        <path class="alpha-arc-defense-in-depth__sector [alpha-arc-defense-in-depth__sector--active]" ... />
      </g>
    </svg>

    <!-- Top-centered Layer Title (<ArcDefenseInDepthLayerHeading>) -->
    <div class="alpha-arc-defense-in-depth__layer-title">
      Perimeter Defense
    </div>

    <!-- Security Control Pin (<ArcDefenseInDepthLayerPart>) -->
    <div class="alpha-arc-defense-in-depth__part">
      <!-- Dot indicator & label text -->
      <span class="dot"></span>
      <span>Firewall & WAF</span>
    </div>

  </div>
</div>
```

#### Class Reference Table

| Component                         | Target Element          | Rendered Class                                | Purpose & Description                               |
| :-------------------------------- | :---------------------- | :-------------------------------------------- | :-------------------------------------------------- |
| `<ArcDefenseInDepth>`             | Root container          | `.alpha-arc-defense-in-depth`                 | Main outer diagram wrapper.                         |
| `<ArcDefenseInDepth>`             | Stage wrapper           | `.alpha-arc-defense-in-depth__stage`          | Coordinates SVG rings and HTML overlay positions.   |
| `<ArcDefenseInDepthLayer>`        | Concentric ring group   | `.alpha-arc-defense-in-depth__layer`          | SVG `<g>` grouping arc bands, sectors, and pins.    |
| `<ArcDefenseInDepthLayer>`        | Ring arc band           | `.alpha-arc-defense-in-depth__band`           | SVG path rendering concentric semicircular band.    |
| `<ArcDefenseInDepthLayer>`        | Band animation modifier | `.alpha-arc-defense-in-depth__band--animated` | Applied when entrance animation sequence is active. |
| `<ArcDefenseInDepthLayerHeading>` | Layer title             | `.alpha-arc-defense-in-depth__layer-title`    | Top-centered heading text above each security band. |
| `<ArcDefenseInDepthLayerSector>`  | Sector slice            | `.alpha-arc-defense-in-depth__sector`         | SVG path partitioning layer into angular domains.   |
| `<ArcDefenseInDepthLayerSector>`  | Active sector modifier  | `.alpha-arc-defense-in-depth__sector--active` | Highlighted active sector partition.                |
| `<ArcDefenseInDepthLayerPart>`    | Pin button / wrapper    | `.alpha-arc-defense-in-depth__part`           | Interactive pin indicator dot and label text.       |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all defense-in-depth diagrams across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all ArcDefenseInDepth diagrams across slides */

/* 1. Customize layer heading typography */
.alpha-arc-defense-in-depth__layer-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* 2. Customize control pin labels */
.alpha-arc-defense-in-depth__part {
  font-size: 0.8rem;
  font-weight: 500;
}

/* 3. Highlight active sector glow */
.alpha-arc-defense-in-depth__sector--active {
  filter: brightness(1.2);
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for defense rings on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<ArcDefenseInDepth>
  <!-- layers, sectors, and parts -->
</ArcDefenseInDepth>

<style>
/* Scoped to this slide only */
:deep(.alpha-arc-defense-in-depth__layer-title) {
  color: #0284c7 !important;
}

:deep(.alpha-arc-defense-in-depth__part) {
  font-weight: 700;
}
</style>
```

### 4. Geometry & Ring Calibration

- **`innerRadius`** (default `110`) & **`outerRadius`** (default `390`): Control radial ring thickness.
- **`gap`** (default `3`): Spacing between concentric rings.
- **`showDecorativeArcs`** (default `true`): Toggles radar crosshairs and accent circles.
- **`activePart`** / **`activeIndex`**: Preselect a highlighted sector or security boundary.
