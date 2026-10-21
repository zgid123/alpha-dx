# Arc Comparison

Opposing curved comparison diagram with edge project hubs, numbered arc nodes, and central versus divider for evaluating architectural trade-offs. Includes `ArcComparison`, `ArcComparisonLeft`, `ArcComparisonRight`, `ArcComparisonOrbit`, `ArcComparisonBadge`, `ArcComparisonHeading`, and `ArcComparisonContent`.

## Purpose

Opposing dual-arc comparison diagram with two edge hubs, numbered arc nodes, and a central "Vs" divider for evaluating architectural trade-offs side by side.

**When to use**: When comparing two approaches, architectures, or solutions head-to-head — monolith vs. microservices, baseline vs. proposed, old vs. new. Each side supports 3-4 comparison criteria with matching numbering.

## Presentation Preview

<ArcComparisonDemo />

---

## Usage Examples

### Detailed Compound Comparison

```vue
<ArcComparison :count="3">
  <ArcComparisonLeft color="#ea580c">
    <template #title>Traditional<br />Monolith</template>

      <ArcComparisonOrbit>
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Coupled State</ArcComparisonHeading>
        <ArcComparisonContent>
          Shared database schemas create cross-team deployment bottlenecks.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Vertical Scale</ArcComparisonHeading>
        <ArcComparisonContent>
          Requires upgrading single instances with exponential cost increases.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Single Failure</ArcComparisonHeading>
        <ArcComparisonContent>
          Unchecked crashes can bring down the entire system.
        </ArcComparisonContent>
      </ArcComparisonOrbit>

  </ArcComparisonLeft>

  <ArcComparisonRight color="#0284c7">
    <template #title>Distributed<br />Microservices</template>

      <ArcComparisonOrbit>
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Bounded Context</ArcComparisonHeading>
        <ArcComparisonContent>
          Autonomous services communicate over defined asynchronous events.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Elastic Scale</ArcComparisonHeading>
        <ArcComparisonContent>
          Horizontal autoscaling responds dynamically to spike traffic demand.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Isolated Faults</ArcComparisonHeading>
        <ArcComparisonContent>
          Failures remain localized without cascading across service domains.
        </ArcComparisonContent>
      </ArcComparisonOrbit>

  </ArcComparisonRight>
</ArcComparison>
```

### 4-Points Compound Comparison

```vue
<ArcComparison :count="4">
  <ArcComparisonLeft :count="4" color="#ea580c">
    <template #title>Baseline<br />Approach</template>

      <ArcComparisonOrbit :index="0">
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>High Latency</ArcComparisonHeading>
        <ArcComparisonContent>
          Sequential processing incurs substantial inference latency.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit :index="1">
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Memory Footprint</ArcComparisonHeading>
        <ArcComparisonContent>
          Requires extensive GPU VRAM allocations for batching.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit :index="2">
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Brittle Convergence</ArcComparisonHeading>
        <ArcComparisonContent>
          Susceptible to gradient vanishing in deep layers.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit :index="3">
        <ArcComparisonBadge>04</ArcComparisonBadge>
        <ArcComparisonHeading>High Complexity</ArcComparisonHeading>
        <ArcComparisonContent>
          Quadratic computational cost scales poorly with sequence length.
        </ArcComparisonContent>
      </ArcComparisonOrbit>

  </ArcComparisonLeft>

  <ArcComparisonRight :count="4" color="#0284c7">
    <template #title>Proposed<br />Architecture</template>

      <ArcComparisonOrbit :index="0">
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Sub-linear Time</ArcComparisonHeading>
        <ArcComparisonContent>
          Parallelized attention achieves significant inference speedups.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit :index="1">
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Compact Footprint</ArcComparisonHeading>
        <ArcComparisonContent>
          Quantized weights reduce runtime memory overhead by 4x.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit :index="2">
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Stable Training</ArcComparisonHeading>
        <ArcComparisonContent>
          Residual normalization guarantees robust optimization.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit :index="3">
        <ArcComparisonBadge>04</ArcComparisonBadge>
        <ArcComparisonHeading>Linear Complexity</ArcComparisonHeading>
        <ArcComparisonContent>
          Sparse kernel execution achieves linear time scaling.
        </ArcComparisonContent>
      </ArcComparisonOrbit>

  </ArcComparisonRight>
</ArcComparison>
```

### Layout Mode

```vue
<ArcComparison as="layout" />
```

---

## Props Reference

### `ArcComparison`

- **Rendered Class:** `.alpha-arc-comparison`
- **Rendered HTML Tag:** `<div>`
- **Role:** Main container coordinating the central SVG canvas, versus badge, and comparison columns.

| Prop        | Type                            | Default     | Required | Description                                                                                                  |
| :---------- | :------------------------------ | :---------- | :------: | :----------------------------------------------------------------------------------------------------------- |
| `as`        | `'layout' \| null \| undefined` | `undefined` |    No    | Render mode. When set to `'layout'`, renders only the central divider line, two edge hubs, and versus badge. |
| `count`     | `number`                        | `3`         |    No    | Number of comparison points per side (`3` or `4`).                                                           |
| `vsText`    | `string`                        | `'Vs'`      |    No    | Text inside the central divider badge.                                                                       |
| `vsSize`    | `number`                        | `14`        |    No    | Font size of the central versus badge text.                                                                  |
| `hubRadius` | `number`                        | `135`       |    No    | Semicircular project hub radius in pixels.                                                                   |
| `arcRadius` | `number`                        | `235`       |    No    | Radius of the guide arcs.                                                                                    |
| `animation` | `boolean`                       | `true`      |    No    | Enables staggered entrance animations.                                                                       |
| `autoScale` | `boolean`                       | `true`      |    No    | Automatically scales diagram to fit the slide bounds.                                                        |
| `hidePagy`  | `boolean`                       | `false`     |    No    | Hides pagination indicators on the active slide.                                                             |

### `ArcComparisonLeft` & `ArcComparisonRight`

- **Rendered Class:** `.alpha-arc-comparison-left` / `.alpha-arc-comparison-right`
- **Rendered HTML Tag:** `<div>`
- **Role:** Side wrapper columns anchoring to the corresponding hub and positioning child orbit rows.

| Prop    | Type              | Default                   | Required | Description                                                |
| :------ | :---------------- | :------------------------ | :------: | :--------------------------------------------------------- |
| `color` | `string`          | `'#ea580c'` / `'#208b9e'` |    No    | Side accent theme color for hubs and badges.               |
| `title` | `string \| VNode` | `undefined`               |    No    | Hub title; use the `#title` slot for rich template markup. |
| `count` | `number`          | `rootContext.count`       |    No    | Explicit points count for this side container.             |

### `ArcComparisonOrbit`

- **Rendered Class:** `.alpha-arc-comparison-orbit`
- **Rendered HTML Tag:** `<div>`
- **Role:** Individual criterion callout item positioned radially along the guide arc.

| Prop        | Type               | Default     | Required | Description                                                  |
| :---------- | :----------------- | :---------- | :------: | :----------------------------------------------------------- |
| `index`     | `number`           | `auto`      |    No    | Explicit 0-indexed position on the arc (`0` to `count - 1`). |
| `id`        | `string \| number` | `auto`      |    No    | Number or label inside the badge (e.g. `'01'`).              |
| `color`     | `string`           | `sideColor` |    No    | Custom accent color override for this callout.               |
| `textColor` | `string`           | `undefined` |    No    | Custom description text color.                               |
| `textGap`   | `number`           | `auto`      |    No    | Gap in pixels between badge and callout text.                |

### `ArcComparisonBadge`

- **Rendered Class:** `.alpha-arc-comparison-badge`
- **Rendered HTML Tag:** `<div>`
- **Role:** Circular numbered pill indicating the criterion index or step.

| Prop    | Type               | Default         | Required | Description                             |
| :------ | :----------------- | :-------------- | :------: | :-------------------------------------- |
| `id`    | `string \| number` | `callout.id`    |    No    | Custom badge label.                     |
| `color` | `string`           | `callout.color` |    No    | Custom background color for the circle. |
| `size`  | `number`           | `52`            |    No    | Circle diameter in pixels.              |

### `ArcComparisonHeading`

- **Rendered Class:** `.alpha-arc-comparison-heading`
- **Rendered HTML Tag:** `<h4>`
- **Role:** Criterion title label.

| Prop    | Type     | Default     | Required | Description                        |
| :------ | :------- | :---------- | :------: | :--------------------------------- |
| `color` | `string` | `undefined` |    No    | Heading title text color override. |

### `ArcComparisonContent`

- **Rendered Class:** `.alpha-arc-comparison-content`
- **Rendered HTML Tag:** `<p>`
- **Role:** Criterion description text paragraph.

| Prop    | Type     | Default     | Required | Description                           |
| :------ | :------- | :---------- | :------: | :------------------------------------ |
| `color` | `string` | `undefined` |    No    | Body description text color override. |

---

## Child Components Summary

- `ArcComparisonLeft`: Left-side container with custom accent color and title prop or `#title` slot.
- `ArcComparisonRight`: Right-side container with custom accent color and title prop or `#title` slot.
- `ArcComparisonOrbit`: Individual numbered criteria row positioned along the arc.
- `ArcComparisonBadge`: Circular numbered pill for each criterion.
- `ArcComparisonHeading`: Callout header label.
- `ArcComparisonContent`: Callout description paragraph.

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the diagram's theme globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                              | Default                                    | Description                                                          |
| :------------------------------------ | :----------------------------------------- | :------------------------------------------------------------------- |
| `--alpha-arc-comparison-left-accent`  | `#e87a36`                                  | Left-side accent color for hubs and badges.                          |
| `--alpha-arc-comparison-right-accent` | `#208b9e`                                  | Right-side accent color for hubs and badges.                         |
| `--alpha-arc-comparison-left-title`   | `var(--alpha-arc-comparison-left-accent)`  | Left hub title text color.                                           |
| `--alpha-arc-comparison-right-title`  | `var(--alpha-arc-comparison-right-accent)` | Right hub title text color.                                          |
| `--alpha-arc-comparison-badge`        | `#ffffff`                                  | Foreground text color for circular badges.                           |
| `--alpha-arc-comparison-heading`      | `var(--alpha-foreground-primary, #1e293b)` | Callout title text color (inherits callout/orbit accent by default). |
| `--alpha-arc-comparison-content`      | `var(--alpha-foreground-primary, #475569)` | Callout body description color.                                      |
| `--alpha-arc-comparison-vs`           | `var(--alpha-foreground-primary)`          | Central VS label text color.                                         |
| `--alpha-arc-comparison-vs-bg`        | `#ffffff`                                  | Central VS badge background circle.                                  |
| `--alpha-arc-comparison-guide-stroke` | `var(--alpha-stroke-primary)`              | Curved guide line stroke color.                                      |
| `--alpha-arc-comparison-guide-dot`    | `#94a3b8`                                  | Alignment dot color along the guide arc.                             |
| `--alpha-arc-comparison-hub-fill`     | `#f1f3f6`                                  | Inner background fill of the central comparison hub.                 |

```vue
<!-- Example: Customizing colors via CSS variables -->
<ArcComparison
  :style="{
    '--alpha-arc-comparison-left-accent': '#ef4444',
    '--alpha-arc-comparison-right-accent': '#3b82f6',
    '--alpha-arc-comparison-hub-fill': '#f8fafc'
  }"
>
  <!-- left and right sides -->
</ArcComparison>
```

### 2. UnoCSS Utility Styling

`ArcComparison` supports root utility classes via `useMergedUnoAttrs`. You can pass UnoCSS utilities to scale or reposition the container:

```vue
<ArcComparison class="scale-95 origin-center my-2 shadow-sm">
  <!-- comparison sides -->
</ArcComparison>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements, apply complex hover interactions, or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <ArcComparison> (Root container) -->
<div class="alpha-arc-comparison">

  <!-- SVG Vector Canvas (Hubs and curved guide arcs) -->
  <svg class="alpha-arc-comparison-canvas">
    <path class="alpha-arc-comparison__hub" ... />
    <path class="alpha-arc-comparison__arc" ... />
  </svg>

  <!-- Left Comparison Column (<ArcComparisonLeft>) -->
  <div class="alpha-arc-comparison-left">
    <!-- Hub Title Label -->
    <div class="alpha-arc-comparison__hub-title">...</div>

    <!-- Orbit Callout Row (<ArcComparisonOrbit>) -->
    <div class="alpha-arc-comparison-orbit">
      <!-- Badge (<ArcComparisonBadge>) -->
      <div class="alpha-arc-comparison-badge">01</div>

      <!-- Text Container -->
      <div>
        <h4 class="alpha-arc-comparison-heading">...</h4>  <!-- <ArcComparisonHeading> -->
        <p class="alpha-arc-comparison-content">...</p>    <!-- <ArcComparisonContent> -->
      </div>
    </div>
  </div>

  <!-- Central Versus Badge -->
  <div class="alpha-arc-comparison__vs">Vs</div>

  <!-- Right Comparison Column (<ArcComparisonRight>) -->
  <div class="alpha-arc-comparison-right">
    <!-- Same orbit row hierarchy as left side -->
  </div>

</div>
```

#### Class Reference Table

| Component                | Target Element   | Rendered Class                     | Purpose & Description                                            |
| :----------------------- | :--------------- | :--------------------------------- | :--------------------------------------------------------------- |
| `<ArcComparison>`        | Root container   | `.alpha-arc-comparison`            | Main outer flex container for the entire comparison diagram.     |
| `<ArcComparison>`        | SVG canvas       | `.alpha-arc-comparison-canvas`     | Vector canvas rendering the curved guide arcs and edge hubs.     |
| `<ArcComparison>`        | Edge hub         | `.alpha-arc-comparison__hub`       | SVG path for the semicircular anchor hub.                        |
| `<ArcComparison>`        | Guide arc        | `.alpha-arc-comparison__arc`       | SVG path for the curved outer alignment arc.                     |
| `<ArcComparison>`        | Hub title        | `.alpha-arc-comparison__hub-title` | Text container displaying the title inside the semicircular hub. |
| `<ArcComparison>`        | Center VS badge  | `.alpha-arc-comparison__vs`        | Circular badge centered on the divider line between both sides.  |
| `<ArcComparisonLeft>`    | Left column      | `.alpha-arc-comparison-left`       | Left comparison items container.                                 |
| `<ArcComparisonRight>`   | Right column     | `.alpha-arc-comparison-right`      | Right comparison items container.                                |
| `<ArcComparisonOrbit>`   | Orbit item       | `.alpha-arc-comparison-orbit`      | Radial criteria row positioned along the guide arc.              |
| `<ArcComparisonBadge>`   | Criterion badge  | `.alpha-arc-comparison-badge`      | Circular numbered badge indicating the criterion index.          |
| `<ArcComparisonHeading>` | Heading title    | `.alpha-arc-comparison-heading`    | `<h4>` element for the criterion title label.                    |
| `<ArcComparisonContent>` | Description text | `.alpha-arc-comparison-content`    | `<p>` element for the criterion body description paragraph.      |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all arc comparison components across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all ArcComparison diagrams across slides */

/* 1. Customize the central versus badge */
.alpha-arc-comparison__vs {
  font-weight: 800;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  border: 2px solid var(--alpha-stroke-primary);
}

/* 2. Customize the criterion heading typography */
.alpha-arc-comparison-heading {
  font-family: 'Fira Code', monospace;
  font-size: 1.05rem;
  letter-spacing: 0.02em;
}

/* 3. Customize the body description text */
.alpha-arc-comparison-content {
  line-height: 1.5;
  font-size: 0.9rem;
}

/* 4. Customize circular numbered badges */
.alpha-arc-comparison-badge {
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for comparisons on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<ArcComparison :count="3">
  <!-- left and right sides -->
</ArcComparison>

<style>
/* Scoped to this slide only */
:deep(.alpha-arc-comparison-heading) {
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

:deep(.alpha-arc-comparison__hub-title) {
  font-weight: 800;
  text-decoration: underline;
}

:deep(.alpha-arc-comparison-badge) {
  transform: scale(1.08);
}
</style>
```

### 4. Geometry & Arc Calibration

- **`hubRadius`** (default `135`): Controls the curvature radius in pixels of the semicircular hubs.
- **`arcRadius`** (default `235`): Radial distance from canvas edge to outer guide line.
- **`autoScale`** (default `true`): Scales the entire diagram fluidly to avoid overflow on smaller viewports.

### 5. Rich Content Slots

- Use the `#title` slot on `<ArcComparisonLeft>` and `<ArcComparisonRight>` to embed complex titles, badges, or icons.
- Use `<ArcComparisonHeading>` and `<ArcComparisonContent>` inside `<ArcComparisonOrbit>` for full control over typography and formatting.
