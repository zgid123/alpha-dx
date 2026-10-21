# Hexagon Triad

Three-part interlocking hexagonal diagram for presenting architectural pillars, core values, or sequential principles. Includes `HexagonTriad`, `HexagonTriadCallout`, `HexagonTriadBadge`, `HexagonTriadHeading`, `HexagonTriadContent`, `HexagonTriadCenterBadge`, and `HexagonTriadLayer`.

## Purpose

Three-part interlocking hexagonal diagram for presenting architectural pillars, core values, or sequential engineering principles with a synchronized center badge.

**When to use**: When you have exactly 3 equal-weight concepts that form a cohesive group — engineering pillars, design principles, or research dimensions. The hexagonal geometry emphasizes the interconnected nature of the items.

## Presentation Preview

<HexagonTriadDemo />

---

## Usage Examples

### Slotted Composition

```vue
<HexagonTriad>
  <HexagonTriadCallout>
    <HexagonTriadBadge>01</HexagonTriadBadge>
    <HexagonTriadHeading>Performance</HexagonTriadHeading>
    <HexagonTriadContent>Fast builds, instant feedback, and zero-overhead runtime.</HexagonTriadContent>
  </HexagonTriadCallout>
  <HexagonTriadCallout>
    <HexagonTriadBadge>02</HexagonTriadBadge>
    <HexagonTriadHeading>Reliability</HexagonTriadHeading>
    <HexagonTriadContent>Strict type safety paired with deterministic test suites.</HexagonTriadContent>
  </HexagonTriadCallout>
  <HexagonTriadCallout>
    <HexagonTriadBadge>03</HexagonTriadBadge>
    <HexagonTriadHeading>Scalability</HexagonTriadHeading>
    <HexagonTriadContent>Seamless growth across packages, tools, and workflows.</HexagonTriadContent>
  </HexagonTriadCallout>
</HexagonTriad>
```

---

## Props Reference

### `HexagonTriad`

- **Rendered Class:** `.alpha-hexagon-triad`
- **Rendered HTML Tag:** `<div>`
- **Role:** Root hexagon triad container coordinating layout and stage.

| Prop         | Type      | Default     | Required | Description                              |
| :----------- | :-------- | :---------- | :------: | :--------------------------------------- |
| `animation`  | `boolean` | `true`      |    No    | Enables the entrance animation sequence. |
| `startDelay` | `number`  | `undefined` |    No    | Animation delay offset in milliseconds.  |
| `active`     | `boolean` | `undefined` |    No    | Manually controls the animation state.   |

---

## Child Components Summary

- `HexagonTriadCallout`: Container for each pillar callout.
- `HexagonTriadBadge`: Displays the badge number or icon synchronized with the center hexagon.
- `HexagonTriadCenterBadge`: Center floating badge at the interlocking junction.
- `HexagonTriadHeading`: Heading text for the callout.
- `HexagonTriadContent`: Description body for the callout.

### `HexagonTriadCallout`

- **Rendered Class:** `.alpha-hexagon-triad-callout`
- **Rendered HTML Tag:** `<div>`
- **Role:** Outer callout row pairing the hexagon numeric badge with heading and description content.

| Prop           | Type               | Default     | Required | Description                           |
| :------------- | :----------------- | :---------- | :------: | :------------------------------------ |
| `index`        | `number`           | `undefined` |    No    | Sector index (0, 1, or 2).            |
| `badge`        | `string \| number` | `undefined` |    No    | Overrides badge number or label text. |
| `color`        | `string`           | `undefined` |    No    | Sector accent color override.         |
| `textColor`    | `string`           | `undefined` |    No    | Body text color override.             |
| `headingColor` | `string`           | `undefined` |    No    | Heading title color override.         |
| `title`        | `string`           | `undefined` |    No    | Title text.                           |
| `description`  | `string`           | `undefined` |    No    | Description text.                     |

### `HexagonTriadBadge`

- **Rendered Class:** `.alpha-hexagon-triad-badge`
- **Rendered HTML Tag:** `<div>`
- **Role:** Geometric 3D hexagon badge displaying numeric step index (`01`, `02`, `03`).

| Prop         | Type               | Default     | Required | Description                                   |
| :----------- | :----------------- | :---------- | :------: | :-------------------------------------------- |
| `badge`      | `string \| number` | `'01'`      |    No    | Overrides the badge number/text.              |
| `color`      | `string`           | `undefined` |    No    | Inner circle fill color override.             |
| `lightColor` | `string`           | `undefined` |    No    | Hexagon border and background color override. |
| `textColor`  | `string`           | `undefined` |    No    | Badge text color override.                    |

### `HexagonTriadCenterBadge`

- **Rendered Class:** `.alpha-hexagon-triad-center-badge`
- **Rendered HTML Tag:** `<div>`
- **Role:** Central interlocking badge positioned at the core junction of the triad.

| Prop          | Type               | Default     | Required | Description                          |
| :------------ | :----------------- | :---------- | :------: | :----------------------------------- |
| `badge`       | `string \| number` | `'00'`      |    No    | Center badge text or counter.        |
| `fillColor`   | `string`           | `undefined` |    No    | Center badge fill color override.    |
| `strokeColor` | `string`           | `undefined` |    No    | Center badge border stroke override. |

### `HexagonTriadHeading`

- **Rendered Class:** `.alpha-hexagon-triad-heading`
- **Rendered HTML Tag:** `<h4>`
- **Role:** Callout title heading text.

| Prop    | Type     | Default     | Required | Description                        |
| :------ | :------- | :---------- | :------: | :--------------------------------- |
| `color` | `string` | `undefined` |    No    | Heading title text color override. |

### `HexagonTriadContent`

- **Rendered Class:** `.alpha-hexagon-triad-content`
- **Rendered HTML Tag:** `<p>`
- **Role:** Callout body description paragraph.

| Prop    | Type     | Default     | Required | Description                           |
| :------ | :------- | :---------- | :------: | :------------------------------------ |
| `color` | `string` | `undefined` |    No    | Body description text color override. |

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the hexagon theme globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                             | Default                                    | Description                      |
| :----------------------------------- | :----------------------------------------- | :------------------------------- |
| `--alpha-hexagon-triad-item-1-color` | `#ee3248`                                  | First hexagon primary accent.    |
| `--alpha-hexagon-triad-item-1-light` | `#ff8595`                                  | First hexagon outer halo color.  |
| `--alpha-hexagon-triad-item-2-color` | `#f26522`                                  | Second hexagon primary accent.   |
| `--alpha-hexagon-triad-item-2-light` | `#ffb088`                                  | Second hexagon outer halo color. |
| `--alpha-hexagon-triad-item-3-color` | `#2b4594`                                  | Third hexagon primary accent.    |
| `--alpha-hexagon-triad-item-3-light` | `#8da4e2`                                  | Third hexagon outer halo color.  |
| `--alpha-hexagon-triad-content`      | `var(--alpha-foreground-primary, #475569)` | Description text color.          |

```vue
<!-- Example: Customizing colors via CSS variables -->
<HexagonTriad
  :style="{
    '--alpha-hexagon-triad-item-1-color': '#10b981',
    '--alpha-hexagon-triad-item-2-color': '#06b6d4',
    '--alpha-hexagon-triad-item-3-color': '#8b5cf6'
  }"
>
  <!-- callouts -->
</HexagonTriad>
```

### 2. UnoCSS Utility Styling

`HexagonTriad` supports forwarded attributes via `useMergedUnoAttrs`. You can pass UnoCSS utility classes to adjust centering and outer margins:

```vue
<HexagonTriad class="my-4 max-w-4xl mx-auto shadow-sm">
  <!-- triad content -->
</HexagonTriad>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <HexagonTriad> (Root diagram container) -->
<div class="alpha-hexagon-triad">
  <div class="alpha-hexagon-triad__stage">
    <!-- Center Column: Overlapping 3D Rounded Hexagon SVG -->
    <div class="alpha-hexagon-triad__center">
      <svg class="alpha-hexagon-triad__svg">
        <!-- Background Pastel Offset Hexagons -->
        <g class="alpha-hex-layer1 alpha-hex-layer1--1 [alpha-hex-layer1--animated]">
          <path class="alpha-hex-layer" ... />
        </g>
        <!-- 3D Extruded Base Hexagons -->
        <path class="alpha-hex-layer" ... />
        <!-- Top Colored Facet Hexagons -->
        <path class="alpha-hex-layer" ... />
      </svg>
    </div>

    <!-- Slotted Callout Row (<HexagonTriadCallout>) -->
    <div class="alpha-hexagon-triad-callout">
      <!-- Step Number Badge (<HexagonTriadBadge>) -->
      <div class="alpha-hexagon-triad-badge">
        <svg><!-- 3D hexagonal badge shape --></svg>
      </div>

      <!-- Text Group -->
      <div>
        <!-- <HexagonTriadHeading> -->
        <h4 class="alpha-hexagon-triad-heading">Discovery</h4>
        <!-- <HexagonTriadContent> -->
        <p class="alpha-hexagon-triad-content">Map customer pain points and system requirements.</p>
      </div>
    </div>

  </div>
</div>
```

#### Class Reference Table

| Component                   | Target Element      | Rendered Class                      | Purpose & Description                                       |
| :-------------------------- | :------------------ | :---------------------------------- | :---------------------------------------------------------- |
| `<HexagonTriad>`            | Root container      | `.alpha-hexagon-triad`              | Main outer triad diagram container.                         |
| `<HexagonTriad>`            | Stage wrapper       | `.alpha-hexagon-triad__stage`       | Relative stage positioning isometric hexagons and callouts. |
| `<HexagonTriad>`            | Center wrapper      | `.alpha-hexagon-triad__center`      | Positions overlapping 3D hexagon SVG diagram.               |
| `<HexagonTriad>`            | Center SVG          | `.alpha-hexagon-triad__svg`         | SVG rendering 3D extruded hexagon layers.                   |
| `<HexagonTriad>`            | Pastel offset layer | `.alpha-hex-layer1`                 | Background pastel offset hexagon group.                     |
| `<HexagonTriad>`            | Animation modifier  | `.alpha-hex-layer1--animated`       | Entrance slide-out animation modifier.                      |
| `<HexagonTriadBadge>`       | Badge container     | `.alpha-hexagon-triad-badge`        | 3D hexagonal step number container.                         |
| `<HexagonTriadCenterBadge>` | Center badge        | `.alpha-hexagon-triad-center-badge` | Core junction floating badge.                               |
| `<HexagonTriadCallout>`     | Callout row         | `.alpha-hexagon-triad-callout`      | Outer callout container coordinating badge and text.        |
| `<HexagonTriadHeading>`     | Heading             | `.alpha-hexagon-triad-heading`      | Callout title text block.                                   |
| `<HexagonTriadContent>`     | Content paragraph   | `.alpha-hexagon-triad-content`      | Callout body description paragraph.                         |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all hexagon triad diagrams across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all HexagonTriad diagrams across slides */

/* 1. Customize corner step badge */
.alpha-hexagon-triad-badge {
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.15));
}

/* 2. Customize callout heading typography */
.alpha-hexagon-triad-heading {
  font-family: 'Fira Code', monospace;
  font-size: 1.15rem;
}

/* 3. Adjust callout content line height */
.alpha-hexagon-triad-content {
  line-height: 1.5;
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for hexagon callouts on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<HexagonTriad>
  <!-- callouts -->
</HexagonTriad>

<style>
/* Scoped to this slide only */
:deep(.alpha-hexagon-triad-callout) {
  opacity: 0.95;
}

:deep(.alpha-hexagon-triad-heading) {
  letter-spacing: 0.05em;
}
</style>
```

### 4. Custom Badge Indicators

- Use `<HexagonTriadBadge>` inside a callout with custom `color`, `lightColor`, or custom numeric/text `id` to distinguish nodes.
