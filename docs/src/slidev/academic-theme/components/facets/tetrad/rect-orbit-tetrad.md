# Rectangle Orbit Tetrad

Four-part circular hub infographic with concentric quadrant blocks, central badge, and symmetrical callouts. Includes `RectangleOrbitTetrad`, `RectangleOrbitTetradCallout`, `RectangleOrbitTetradCenter`, `RectangleOrbitTetradHeading`, `RectangleOrbitTetradContent`, and `RectangleOrbitTetradIcon`.

## Purpose

Four-part circular hub infographic with concentric quadrant arcs, a central badge, and symmetrical callouts arranged in four corners.

**When to use**: When presenting exactly 4 equally-weighted concepts around a central theme — four pillars of architecture, four-quadrant matrices, or balanced strategy frameworks. Each quadrant gets its own color and icon.

## Presentation Preview

<RectangleOrbitTetradDemo theme="academic" />

---

## Usage Examples

### Slotted Composition

```vue
<RectangleOrbitTetrad>
  <template #center>
    <RectangleOrbitTetradCenter title="Framework">
      <template #content>Architecture</template>
    </RectangleOrbitTetradCenter>
  </template>

  <RectangleOrbitTetradCallout color="#0ea5e9">
    <RectangleOrbitTetradHeading>Data Ingestion</RectangleOrbitTetradHeading>
    <RectangleOrbitTetradContent>Clean and normalize input datasets.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
  <RectangleOrbitTetradCallout color="#10b981">
    <RectangleOrbitTetradHeading>Feature Extraction</RectangleOrbitTetradHeading>
    <RectangleOrbitTetradContent>Derive high-dimensional representations.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
  <RectangleOrbitTetradCallout color="#f59e0b">
    <RectangleOrbitTetradHeading>Model Inference</RectangleOrbitTetradHeading>
    <RectangleOrbitTetradContent>Execute tensor predictions efficiently.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
  <RectangleOrbitTetradCallout color="#ef4444">
    <RectangleOrbitTetradHeading>Metrics & Audit</RectangleOrbitTetradHeading>
    <RectangleOrbitTetradContent>Monitor accuracy and error distributions.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
</RectangleOrbitTetrad>
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

### `RectangleOrbitTetrad`

- **Rendered Class:** `.alpha-rectangle-orbit-tetrad`
- **Rendered HTML Tag:** `<div>`
- **Role:** Root diagram container managing layout, responsive auto-scaling, and central orbital stage.

| Prop             | Type               | Default     | Required | Description                                       |
| :--------------- | :----------------- | :---------- | :------: | :------------------------------------------------ |
| `active`         | `boolean`          | `undefined` |    No    | Manually controls the entrance animation state.   |
| `height`         | `number \| string` | `undefined` |    No    | Container height.                                 |
| `animation`      | `boolean`          | `true`      |    No    | Enables entrance animation sequence.              |
| `startDelay`     | `number`           | `undefined` |    No    | Animation delay in milliseconds.                  |
| `arcRatio`       | `number`           | `0.55`      |    No    | Concentric arc thickness ratio.                   |
| `arcBorderRatio` | `number`           | `0.8`       |    No    | Concentric border arc thickness ratio.            |
| `autoScale`      | `boolean`          | `true`      |    No    | Automatically scales diagram to fit slide height. |
| `scale`          | `number`           | `undefined` |    No    | Explicit scale multiplier.                        |
| `maxScale`       | `number`           | `undefined` |    No    | Maximum automatic scale.                          |

### `RectangleOrbitTetradCallout`

- **Rendered Class:** `.alpha-rectangle-orbit-tetrad-callout` (modifiers: `.alpha-rectangle-orbit-tetrad-callout--animated`, `.alpha-rectangle-orbit-tetrad-callout--{0..3}`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Corner callout card positioning heading, description text, and vertical accent indicator bar.

| Prop             | Type                          | Default                        | Required | Description                                                                |
| :--------------- | :---------------------------- | :----------------------------- | :------: | :------------------------------------------------------------------------- |
| `id`             | `string \| number`            | `auto`                         |    No    | Quadrant numeric index identifier (`'01'`, `'02'`, `'03'`, `'04'`).        |
| `icon`           | `string \| object \| boolean` | `'user'` / `'academic'` / etc. |    No    | Icon class name (e.g. `'i-lucide-rocket'`), component, or `false` to hide. |
| `color`          | `string`                      | `auto`                         |    No    | Base theme color for this quadrant block and dependent pastel hues.        |
| `cardBg`         | `string`                      | `auto`                         |    No    | Explicit background color override for the quadrant card.                  |
| `arcColor`       | `string`                      | `auto`                         |    No    | Explicit background color override for the concentric arc ribbon.          |
| `arcBorderColor` | `string`                      | `auto`                         |    No    | Explicit stroke color override for the concentric border line.             |
| `textColor`      | `string`                      | `auto`                         |    No    | Body text color override.                                                  |

### `RectangleOrbitTetradCenter`

- **Rendered Class:** `.alpha-rectangle-orbit-tetrad-center`
- **Rendered HTML Tag:** `<div>`
- **Role:** Centered floating circular badge displaying core framework title and subtitle.

| Prop     | Type              | Default     | Required | Description                                                   |
| :------- | :---------------- | :---------- | :------: | :------------------------------------------------------------ |
| `title`  | `string \| VNode` | `undefined` |    No    | Center title; use the `#title` slot for rich template markup. |
| `radius` | `number`          | `58`        |    No    | Radius of the center circle hub in pixels.                    |

### `RectangleOrbitTetradHeading`

- **Rendered Class:** `.alpha-rectangle-orbit-tetrad-heading`
- **Rendered HTML Tag:** `<h4>`
- **Role:** Quadrant callout title heading text styled with quadrant accent color.

| Prop    | Type     | Default     | Required | Description                        |
| :------ | :------- | :---------- | :------: | :--------------------------------- |
| `color` | `string` | `undefined` |    No    | Heading title text color override. |

### `RectangleOrbitTetradContent`

- **Rendered Class:** `.alpha-rectangle-orbit-tetrad-content`
- **Rendered HTML Tag:** `<p>`
- **Role:** Quadrant callout body text description.

| Prop    | Type     | Default     | Required | Description                           |
| :------ | :------- | :---------- | :------: | :------------------------------------ |
| `color` | `string` | `undefined` |    No    | Body description text color override. |

### `RectangleOrbitTetradIcon`

- **Rendered Class:** `.alpha-rectangle-orbit-tetrad-icon`
- **Rendered HTML Tag:** `<div>`
- **Role:** Centered icon container positioned over each petal block.

| Prop    | Type               | Default     | Required | Description                           |
| :------ | :----------------- | :---------- | :------: | :------------------------------------ |
| `icon`  | `string \| object` | `undefined` |    No    | Icon class string or Vue component.   |
| `color` | `string`           | `undefined` |    No    | Foreground icon color override.       |
| `size`  | `number \| string` | `36`        |    No    | Icon size in pixels or CSS dimension. |

---

## Child Components Summary

- `RectangleOrbitTetradCallout`: Container for each of the 4 quadrant callouts (top-left, top-right, bottom-right, bottom-left).
- `RectangleOrbitTetradCenter`: Customizable center circle badge with title and `#content` slot.
- `RectangleOrbitTetradHeading`: Title text for the callout.
- `RectangleOrbitTetradContent`: Body description for the callout.
- `RectangleOrbitTetradIcon`: Center quadrant icon.

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the 4-quadrant orbital theme globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                                      | Default                                    | Description                                |
| :-------------------------------------------- | :----------------------------------------- | :----------------------------------------- |
| `--alpha-rectangle-orbit-tetrad-item-1-color` | `#f29e4b`                                  | Quadrant 1 (top-left) accent color.        |
| `--alpha-rectangle-orbit-tetrad-item-2-color` | `#a4cb81`                                  | Quadrant 2 (top-right) accent color.       |
| `--alpha-rectangle-orbit-tetrad-item-3-color` | `#62b6a8`                                  | Quadrant 3 (bottom-right) accent color.    |
| `--alpha-rectangle-orbit-tetrad-item-4-color` | `#e9717a`                                  | Quadrant 4 (bottom-left) accent color.     |
| `--alpha-rectangle-orbit-tetrad-center-bg`    | `#ffffff`                                  | Background fill of the center orbital hub. |
| `--alpha-rectangle-orbit-tetrad-center`       | `#2c3e50`                                  | Center hub title text color.               |
| `--alpha-rectangle-orbit-tetrad-title`        | `var(--alpha-foreground-primary, #1e293b)` | Callout heading title text color.          |
| `--alpha-rectangle-orbit-tetrad-content`      | `var(--alpha-foreground-primary, #555555)` | Callout description body text color.       |

```vue
<!-- Example: Customizing colors via CSS variables -->
<RectangleOrbitTetrad
  :style="{
    '--alpha-rectangle-orbit-tetrad-item-1-color': '#0284c7',
    '--alpha-rectangle-orbit-tetrad-item-2-color': '#10b981',
    '--alpha-rectangle-orbit-tetrad-item-3-color': '#f59e0b',
    '--alpha-rectangle-orbit-tetrad-item-4-color': '#8b5cf6'
  }"
>
  <!-- callouts and center -->
</RectangleOrbitTetrad>
```

### 2. UnoCSS Utility Styling

`RectangleOrbitTetrad` integrates `useMergedUnoAttrs`. You can pass UnoCSS utility classes to adjust alignment, scale, or outer slide margins:

```vue
<RectangleOrbitTetrad class="scale-95 origin-center my-2">
  <!-- quadrants -->
</RectangleOrbitTetrad>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <RectangleOrbitTetrad> (Root diagram container) -->
<div class="alpha-rectangle-orbit-tetrad">
  <div class="alpha-rectangle-orbit-tetrad__stage">

    <!-- Central Orbital Diagram -->
    <div class="alpha-rectangle-orbit-tetrad__center">
      <svg class="alpha-rectangle-orbit-tetrad__svg">
        <!-- Quadrant Block (0: TL, 1: TR, 2: BR, 3: BL) -->
        <g class="alpha-rect-orbit-block alpha-rect-orbit-block--0 [alpha-rect-orbit-block--animated]">
          <rect ... /> <!-- Solid rounded rectangle base -->
          <circle ... /> <!-- Concentric pastel inner arc band -->
          <path ... /> <!-- Concentric separator border -->
          <text>01</text> <!-- Quadrant index label -->
        </g>
      </svg>

      <!-- HTML Icon Overlay Layer -->
      <div class="alpha-rectangle-orbit-tetrad__icons">
        <div class="alpha-rect-orbit-block alpha-rect-orbit-block--0">
          <!-- <RectangleOrbitTetradIcon> -->
          <div class="alpha-rectangle-orbit-tetrad-icon">
            <span class="i-lucide-database" />
          </div>
        </div>
      </div>

      <!-- Central Circular Hub (<RectangleOrbitTetradCenter>) -->
      <div class="alpha-rectangle-orbit-tetrad-center">
        <h4 class="..."><!-- #title slot --></h4>
        <p class="..."><!-- #content slot --></p>
      </div>
    </div>

    <!-- Quadrant Callout Card (<RectangleOrbitTetradCallout>) -->
    <div class="alpha-rectangle-orbit-tetrad-callout alpha-rectangle-orbit-tetrad-callout--0 [alpha-rectangle-orbit-tetrad-callout--animated]">
      <!-- <RectangleOrbitTetradHeading> -->
      <h4 class="alpha-rectangle-orbit-tetrad-heading">Data Ingestion</h4>
      <!-- <RectangleOrbitTetradContent> -->
      <p class="alpha-rectangle-orbit-tetrad-content">Clean and normalize input datasets.</p>
      <!-- Vertical accent indicator bar -->
      <div class="w-0.75 rounded-full" />
    </div>

  </div>
</div>
```

#### Class Reference Table

| Component                       | Target Element    | Rendered Class                                    | Purpose & Description                                       |
| :------------------------------ | :---------------- | :------------------------------------------------ | :---------------------------------------------------------- |
| `<RectangleOrbitTetrad>`        | Root container    | `.alpha-rectangle-orbit-tetrad`                   | Main outer diagram wrapper.                                 |
| `<RectangleOrbitTetrad>`        | Stage container   | `.alpha-rectangle-orbit-tetrad__stage`            | Relative stage positioning central hub and corner callouts. |
| `<RectangleOrbitTetrad>`        | Center wrapper    | `.alpha-rectangle-orbit-tetrad__center`           | Positions SVG quadrants and center badge.                   |
| `<RectangleOrbitTetrad>`        | Center SVG        | `.alpha-rectangle-orbit-tetrad__svg`              | SVG rendering petal quadrants and circular arc clips.       |
| `<RectangleOrbitTetrad>`        | Quadrant block    | `.alpha-rect-orbit-block`                         | Individual colored petal sector group.                      |
| `<RectangleOrbitTetrad>`        | Quadrant modifier | `.alpha-rect-orbit-block--animated`               | Entrance rotation animation modifier.                       |
| `<RectangleOrbitTetrad>`        | Icons overlay     | `.alpha-rectangle-orbit-tetrad__icons`            | HTML overlay wrapper ensuring mask icons render reliably.   |
| `<RectangleOrbitTetradCenter>`  | Center hub        | `.alpha-rectangle-orbit-tetrad-center`            | Centered floating circular badge with title.                |
| `<RectangleOrbitTetradCallout>` | Callout card      | `.alpha-rectangle-orbit-tetrad-callout`           | Outer quadrant callout card.                                |
| `<RectangleOrbitTetradCallout>` | Callout modifier  | `.alpha-rectangle-orbit-tetrad-callout--animated` | Entrance slide motion modifier.                             |
| `<RectangleOrbitTetradHeading>` | Heading           | `.alpha-rectangle-orbit-tetrad-heading`           | Callout heading title text.                                 |
| `<RectangleOrbitTetradContent>` | Content paragraph | `.alpha-rectangle-orbit-tetrad-content`           | Callout description paragraph.                              |
| `<RectangleOrbitTetradIcon>`    | Icon container    | `.alpha-rectangle-orbit-tetrad-icon`              | Quadrant icon container.                                    |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all rectangle orbit tetrad diagrams across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all RectangleOrbitTetrad diagrams across slides */

/* 1. Customize central orbital badge */
.alpha-rectangle-orbit-tetrad-center {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
}

/* 2. Customize callout heading typography */
.alpha-rectangle-orbit-tetrad-heading {
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
}

/* 3. Adjust callout content line height */
.alpha-rectangle-orbit-tetrad-content {
  line-height: 1.5;
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for orbit callouts on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<RectangleOrbitTetrad>
  <!-- callouts and center -->
</RectangleOrbitTetrad>

<style>
/* Scoped to this slide only */
:deep(.alpha-rectangle-orbit-tetrad-callout) {
  border-radius: 12px;
}

:deep(.alpha-rectangle-orbit-tetrad-heading) {
  letter-spacing: 0.05em;
}
</style>
```

### 4. Center Hub Radius & Quadrant Overrides

- **`radius`** on `<RectangleOrbitTetradCenter>` (default `58`): Controls the center circle diameter.
- Pass `color`, `cardBg`, `arcColor`, or `icon` directly on `<RectangleOrbitTetradCallout>` to customize individual quadrants.
