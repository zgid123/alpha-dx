# Arc Orbit

Edge-anchored semicircular hub with radial orbiting callout nodes along a curved guide arc. Designed as a foundational primitive that powers single-sided slide layouts and side-by-side comparisons. Includes `ArcOrbit`, `ArcOrbitCallout`, `ArcOrbitBadge`, `ArcOrbitHeading`, and `ArcOrbitContent`.

## Purpose

Renders an edge-anchored semicircular hub with 3 or 4 radial callout nodes along a curved guide arc. A foundational primitive for single-sided feature breakdowns and side-by-side comparisons.

**When to use**: When presenting 3-4 related concepts radiating from a central topic — feature breakdowns, architecture pillars, or product capabilities. Choose `position="left"` or `position="right"` based on your slide composition. For opposing dual-sided comparisons, use `ArcComparison` instead.

## Presentation Preview

<ArcOrbitDemo />

---

## Usage Examples

### Right-Anchored (Features / Pros Breakdown)

```vue
<ArcOrbit position="right" :count="3" color="#ea580c">
  <template #title>CRM<br />System</template>

    <ArcOrbitCallout>
      <ArcOrbitBadge>01</ArcOrbitBadge>
      <ArcOrbitHeading>Customer Service:</ArcOrbitHeading>
      <ArcOrbitContent>
        Streamline resolution and client messaging.
      </ArcOrbitContent>
    </ArcOrbitCallout>
    <ArcOrbitCallout>
      <ArcOrbitBadge>02</ArcOrbitBadge>
      <ArcOrbitHeading>Sales Efficiency:</ArcOrbitHeading>
      <ArcOrbitContent>
        Automate tasks and track pipeline leads.
      </ArcOrbitContent>
    </ArcOrbitCallout>
    <ArcOrbitCallout>
      <ArcOrbitBadge>03</ArcOrbitBadge>
      <ArcOrbitHeading>Data Analysis:</ArcOrbitHeading>
      <ArcOrbitContent>
        Gain customer insights through unified data.
      </ArcOrbitContent>
    </ArcOrbitCallout>

</ArcOrbit>
```

### Left-Anchored (4-Point Sequential Orbit)

```vue
<ArcOrbit position="left" :count="4" color="#0284c7">
  <template #title>Architecture<br />Pillars</template>

    <ArcOrbitCallout :index="0">
      <ArcOrbitBadge>01</ArcOrbitBadge>
      <ArcOrbitHeading>Bounded Context</ArcOrbitHeading>
      <ArcOrbitContent>
        Autonomous services communicate over defined asynchronous events.
      </ArcOrbitContent>
    </ArcOrbitCallout>
    <ArcOrbitCallout :index="1">
      <ArcOrbitBadge>02</ArcOrbitBadge>
      <ArcOrbitHeading>Elastic Scale</ArcOrbitHeading>
      <ArcOrbitContent>
        Horizontal autoscaling responds dynamically to spike traffic demand.
      </ArcOrbitContent>
    </ArcOrbitCallout>
    <ArcOrbitCallout :index="2">
      <ArcOrbitBadge>03</ArcOrbitBadge>
      <ArcOrbitHeading>Isolated Faults</ArcOrbitHeading>
      <ArcOrbitContent>
        Failures remain localized without cascading across service domains.
      </ArcOrbitContent>
    </ArcOrbitCallout>
    <ArcOrbitCallout :index="3">
      <ArcOrbitBadge>04</ArcOrbitBadge>
      <ArcOrbitHeading>Linear Complexity</ArcOrbitHeading>
      <ArcOrbitContent>
        Sparse kernel execution achieves linear time scaling.
      </ArcOrbitContent>
    </ArcOrbitCallout>

</ArcOrbit>
```

---

## Props Reference

### `ArcOrbit`

- **Rendered Class:** `.alpha-arc-orbit` (modifiers: `.alpha-arc-orbit--left`, `.alpha-arc-orbit--right`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Main container coordinating the edge hub, vector guide arcs, and orbiting callouts.

| Prop        | Type                | Default     | Required | Description                                                                        |
| :---------- | :------------------ | :---------- | :------: | :--------------------------------------------------------------------------------- |
| `position`  | `'left' \| 'right'` | `'left'`    |    No    | Edge placement of the semicircular hub. Callouts radiate inward toward the center. |
| `count`     | `number`            | `3`         |    No    | Number of orbiting callout nodes (`3` or `4`).                                     |
| `color`     | `string`            | `'#ea580c'` |    No    | Accent theme color for hub and badges.                                             |
| `title`     | `string \| VNode`   | `undefined` |    No    | Hub title; use the `#title` slot for rich template markup.                         |
| `animation` | `boolean`           | `true`      |    No    | Enables staggered entrance animations.                                             |
| `autoScale` | `boolean`           | `true`      |    No    | Automatically scales diagram to fit the container bounds.                          |
| `hubRadius` | `number`            | `135`       |    No    | Semicircular hub radius in pixels.                                                 |
| `arcRadius` | `number`            | `235`       |    No    | Radius of the guide arc in pixels.                                                 |
| `height`    | `number \| string`  | `undefined` |    No    | Explicit container height in pixels or CSS value.                                  |
| `scale`     | `number`            | `undefined` |    No    | Fixed scaling override factor.                                                     |
| `maxScale`  | `number`            | `undefined` |    No    | Maximum scale factor when `autoScale` is enabled.                                  |

### `ArcOrbitCallout`

- **Rendered Class:** `.alpha-arc-orbit-callout` (modifier: `.alpha-arc-orbit-callout--animated`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Individual orbiting node positioned along the radial guide arc.

| Prop        | Type                | Default         | Required | Description                                                  |
| :---------- | :------------------ | :-------------- | :------: | :----------------------------------------------------------- |
| `position`  | `'left' \| 'right'` | `root.position` |    No    | Override side alignment for this callout.                    |
| `index`     | `number`            | `auto`          |    No    | Explicit 0-indexed position on the arc (`0` to `count - 1`). |
| `id`        | `string \| number`  | `auto`          |    No    | Number or label inside the badge (e.g. `'01'`).              |
| `color`     | `string`            | `root.color`    |    No    | Custom accent color override for this callout.               |
| `textColor` | `string`            | `undefined`     |    No    | Custom description text color.                               |
| `textGap`   | `number`            | `auto`          |    No    | Gap in pixels between badge and callout text.                |

### `ArcOrbitBadge`

- **Rendered Class:** `.alpha-arc-orbit-badge`
- **Rendered HTML Tag:** `<div>`
- **Role:** Circular badge indicating the callout step number or icon.

| Prop    | Type               | Default         | Required | Description                             |
| :------ | :----------------- | :-------------- | :------: | :-------------------------------------- |
| `id`    | `string \| number` | `callout.id`    |    No    | Custom badge label.                     |
| `color` | `string`           | `callout.color` |    No    | Custom background color for the circle. |
| `size`  | `number`           | `52`            |    No    | Circle diameter in pixels.              |

### `ArcOrbitHeading`

- **Rendered Class:** `.alpha-arc-orbit-heading`
- **Rendered HTML Tag:** `<h4>`
- **Role:** Callout heading title text.

| Prop    | Type     | Default     | Required | Description                        |
| :------ | :------- | :---------- | :------: | :--------------------------------- |
| `color` | `string` | `undefined` |    No    | Heading title text color override. |

### `ArcOrbitContent`

- **Rendered Class:** `.alpha-arc-orbit-content`
- **Rendered HTML Tag:** `<p>`
- **Role:** Callout body description text paragraph.

| Prop    | Type     | Default     | Required | Description                           |
| :------ | :------- | :---------- | :------: | :------------------------------------ |
| `color` | `string` | `undefined` |    No    | Body description text color override. |

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the orbital colors globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                         | Default                                    | Description                                   |
| :------------------------------- | :----------------------------------------- | :-------------------------------------------- |
| `--alpha-arc-orbit-accent`       | `#ea580c`                                  | Primary accent color for hub and node badges. |
| `--alpha-arc-orbit-title`        | `var(--alpha-arc-orbit-accent)`            | Central hub title text color.                 |
| `--alpha-arc-orbit-heading`      | `var(--alpha-arc-orbit-accent)`            | Callout heading title text color.             |
| `--alpha-arc-orbit-content`      | `var(--alpha-foreground-primary, #475569)` | Callout body description color.               |
| `--alpha-arc-orbit-badge`        | `#ffffff`                                  | Foreground text color inside node badges.     |
| `--alpha-arc-orbit-guide-stroke` | `var(--alpha-stroke-primary)`              | Outer circular arc stroke color.              |
| `--alpha-arc-orbit-guide-dot`    | `#94a3b8`                                  | Alignment dot color along guide lines.        |
| `--alpha-arc-orbit-hub-fill`     | `#f1f3f6`                                  | Fill background of the main semicircular hub. |

```vue
<!-- Example: Customizing colors via CSS variables -->
<ArcOrbit
  :style="{
    '--alpha-arc-orbit-accent': '#2563eb',
    '--alpha-arc-orbit-hub-fill': '#eff6ff'
  }"
>
  <!-- callouts -->
</ArcOrbit>
```

### 2. UnoCSS Utility Styling

`ArcOrbit` integrates `useMergedUnoAttrs`. You can pass UnoCSS utility classes to adjust margins or responsive scale:

```vue
<ArcOrbit class="my-4 max-w-4xl mx-auto shadow-sm">
  <!-- callouts -->
</ArcOrbit>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements, apply complex hover interactions, or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <ArcOrbit> (Root container) -->
<div class="alpha-arc-orbit [alpha-arc-orbit--left | alpha-arc-orbit--right]">

  <!-- SVG Canvas (edge hub and radial guide arc) -->
  <svg>
    <path class="alpha-arc-orbit__hub" ... />
    <path class="alpha-arc-orbit__arc" ... />
  </svg>

  <!-- Hub Title Wrapper -->
  <div class="alpha-arc-orbit__hub-title">...</div>

  <!-- Radiating Orbit Callouts Overlay -->
  <div class="alpha-arc-orbit__contents-wrapper">
    <!-- Orbit Callout Node (<ArcOrbitCallout>) -->
    <div class="alpha-arc-orbit-callout [alpha-arc-orbit-callout--animated]">
      <!-- Circular Badge (<ArcOrbitBadge>) -->
      <div class="alpha-arc-orbit-badge">01</div>

      <!-- Text Container -->
      <div>
        <!-- Heading (<ArcOrbitHeading>) -->
        <h4 class="alpha-arc-orbit-heading">...</h4>
        <!-- Content Paragraph (<ArcOrbitContent>) -->
        <p class="alpha-arc-orbit-content">...</p>
      </div>
    </div>
  </div>

</div>
```

#### Class Reference Table

| Component           | Target Element   | Rendered Class                       | Purpose & Description                                        |
| :------------------ | :--------------- | :----------------------------------- | :----------------------------------------------------------- |
| `<ArcOrbit>`        | Root container   | `.alpha-arc-orbit`                   | Main outer flex container.                                   |
| `<ArcOrbit>`        | Left modifier    | `.alpha-arc-orbit--left`             | Applied when hub is anchored to the left canvas edge.        |
| `<ArcOrbit>`        | Right modifier   | `.alpha-arc-orbit--right`            | Applied when hub is anchored to the right canvas edge.       |
| `<ArcOrbit>`        | Semicircular hub | `.alpha-arc-orbit__hub`              | SVG path for the central edge-anchored hub.                  |
| `<ArcOrbit>`        | Guide arc        | `.alpha-arc-orbit__arc`              | SVG path for the radial alignment guide line.                |
| `<ArcOrbit>`        | Hub title        | `.alpha-arc-orbit__hub-title`        | Text container displaying the centered title inside the hub. |
| `<ArcOrbit>`        | Overlay wrapper  | `.alpha-arc-orbit__contents-wrapper` | Absolute positioning container for the radiating nodes.      |
| `<ArcOrbitCallout>` | Callout item     | `.alpha-arc-orbit-callout`           | Individual callout node positioned along the radial arc.     |
| `<ArcOrbitCallout>` | Motion modifier  | `.alpha-arc-orbit-callout--animated` | Applied when entrance animation is active.                   |
| `<ArcOrbitBadge>`   | Node badge       | `.alpha-arc-orbit-badge`             | Circular badge showing node step number or icon.             |
| `<ArcOrbitHeading>` | Heading title    | `.alpha-arc-orbit-heading`           | `<h4>` element for the callout title.                        |
| `<ArcOrbitContent>` | Description text | `.alpha-arc-orbit-content`           | `<p>` element for the callout body description.              |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all arc orbit components across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all ArcOrbit diagrams across slides */

/* 1. Customize hub title typography */
.alpha-arc-orbit__hub-title {
  font-family: 'Fira Code', monospace;
  font-size: 1.15rem;
  letter-spacing: 0.03em;
}

/* 2. Customize callout headings */
.alpha-arc-orbit-heading {
  font-weight: 700;
  letter-spacing: 0.02em;
}

/* 3. Customize body description text */
.alpha-arc-orbit-content {
  line-height: 1.5;
  font-size: 0.9rem;
}

/* 4. Customize circular node badges */
.alpha-arc-orbit-badge {
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for orbits on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<ArcOrbit position="left" :count="3">
  <!-- callouts -->
</ArcOrbit>

<style>
/* Scoped to this slide only */
:deep(.alpha-arc-orbit-heading) {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

:deep(.alpha-arc-orbit-badge) {
  transform: scale(1.05);
}
</style>
```

### 4. Orientation & Geometry Controls

- **`position="left"`** or **`position="right"`**: Switches the semicircular hub from the left to right canvas edge.
- **`hubRadius`** (default `135`) & **`arcRadius`** (default `235`): Fine-tune radial spacing between the center hub and radiating callout nodes.
- **`autoScale`** (default `true`): Keeps the diagram centered without clipping slide edges.
