# Circular Pyramid

3D tiered circular pyramid process diagram with stacked circular discs, frosted glass blurred default layers, and an active sharp top layer. Includes `CircularPyramid`, `CircularPyramidStack`, `CircularPyramidStackHeading`, and `CircularPyramidStackContent`.

## Purpose

Tiered pyramid workflow where each tier is represented by a 3D circular disc. The default layers feature a frosted-glass blur effect, while the active layer is highlighted without blur in the vibrant theme color.

**When to use**: When presenting hierarchical stages, tiered architectures, capability layers, or maturity levels. Supports 1 to 6 circular layers with customizable theme colors and interactive layer activation.

## Presentation Preview

<CircularPyramidDemo />

---

## Usage Examples

### Compound Stacks Hierarchy

```vue
<CircularPyramid>
  <CircularPyramidStack>
    <CircularPyramidStackHeading>01 Strategy</CircularPyramidStackHeading>
    <CircularPyramidStackContent>
      Define clear technical north stars, design systems, and cross-team alignment.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackHeading>02 Architecture</CircularPyramidStackHeading>
    <CircularPyramidStackContent>
      Establish domain boundaries, type safety contracts, and scalable infrastructure.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackHeading>03 Implementation</CircularPyramidStackHeading>
    <CircularPyramidStackContent>
      Build high-performance components with smooth motion and responsive layout.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackHeading>04 Verification</CircularPyramidStackHeading>
    <CircularPyramidStackContent>
      Validate behavior with rigorous unit suites, formatting, and live slide builds.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
</CircularPyramid>
```

### Self-Contained Mockup with Custom Color

```vue
<CircularPyramid
  :count="6"
  :active-index="0"
  color="#6366f1"
/>
```

---

## Props Reference

### `CircularPyramid`

- **Rendered Class:** `.alpha-circular-pyramid` (modifier: `.alpha-circular-pyramid--animated`)
- **Rendered HTML Tag:** `<fieldset>`
- **Role:** Root circular pyramid diagram container coordinating responsive auto-scaling and floating disc stages.

| Prop          | Type               | Default     | Required | Description                                                                           |
| :------------ | :----------------- | :---------- | :------: | :------------------------------------------------------------------------------------ |
| `count`       | `number`           | `undefined` |    No    | Number of circular layers (1 to 6). Inferred from slotted stacks if omitted.          |
| `activeIndex` | `number`           | `0`         |    No    | Index of the active circular layer (0 = top). Rendered sharp without blur.            |
| `color`       | `string`           | `'#3b82f6'` |    No    | Primary theme color. Dynamically computes active and blurred frosted glass gradients. |
| `interactive` | `boolean`          | `true`      |    No    | Enables clicking layers or stacks to change the active layer.                         |
| `animation`   | `boolean`          | `true`      |    No    | Enables entrance and floating animations.                                             |
| `autoScale`   | `boolean`          | `true`      |    No    | Enables responsive diagram scaling.                                                   |
| `width`       | `number \| string` | `undefined` |    No    | Container width.                                                                      |
| `height`      | `number \| string` | `undefined` |    No    | Container height.                                                                     |

---

## Child Components Summary

- `CircularPyramidStack`: Row container aligning left heading and right content with tier disc.
- `CircularPyramidStackHeading`: Left heading component displaying numeric step pill and connector line.
- `CircularPyramidStackContent`: Right callout card displaying tier description and connector line.

### `CircularPyramidStack`

- **Rendered Class:** `.alpha-circular-pyramid-stack`
- **Rendered HTML Tag:** `<div>`
- **Role:** Tier row container coordinating left heading and right content around the corresponding 3D circular disc.

| Prop             | Type               | Default     | Required | Description                                                                |
| :--------------- | :----------------- | :---------- | :------: | :------------------------------------------------------------------------- |
| `index`          | `number`           | `undefined` |    No    | Zero-based index of the tier (from top to base). Auto-inferred if omitted. |
| `step`           | `string \| number` | `undefined` |    No    | Explicit step number or label displayed in the heading badge.              |
| `color`          | `string`           | `undefined` |    No    | Accent color override for this tier disc and connectors.                   |
| `active`         | `boolean`          | `undefined` |    No    | Overrides active focus state for this tier.                                |
| `connectorWidth` | `number`           | `undefined` |    No    | Connector horizontal width override in pixels.                             |

### `CircularPyramidStackHeading`

- **Rendered Class:** `.alpha-circular-pyramid-stack-heading` (pill: `.alpha-circular-pyramid-stack-heading__pill`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Left-side title pill badge displaying numeric step index and heading text.

| Prop       | Type               | Default     | Required | Description                                      |
| :--------- | :----------------- | :---------- | :------: | :----------------------------------------------- |
| `step`     | `string \| number` | `undefined` |    No    | Step number or text badge displayed in the pill. |
| `color`    | `string`           | `undefined` |    No    | Pill accent color override.                      |
| `minWidth` | `number`           | `150`       |    No    | Minimum width of the heading pill in pixels.     |

### `CircularPyramidStackContent`

- **Rendered Class:** `.alpha-circular-pyramid-stack-content` (wrapper: `.alpha-circular-pyramid-stack-content-wrapper`, modifiers: `.alpha-circular-pyramid-stack-content--active`, `.alpha-circular-pyramid-stack-content--default`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Right-side callout description card with connecting line leading to the tier disc.

| Prop             | Type     | Default     | Required | Description                             |
| :--------------- | :------- | :---------- | :------: | :-------------------------------------- |
| `color`          | `string` | `undefined` |    No    | Card accent color override.             |
| `connectorWidth` | `number` | `undefined` |    No    | Width of the connecting line in pixels. |

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize tier colors globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                                 | Default                                    | Description                           |
| :--------------------------------------- | :----------------------------------------- | :------------------------------------ |
| `--alpha-circular-pyramid-stack-1-color` | `#3b82f6`                                  | Tier 1 (top disc) accent color.       |
| `--alpha-circular-pyramid-stack-2-color` | `#6366f1`                                  | Tier 2 accent color.                  |
| `--alpha-circular-pyramid-stack-3-color` | `#10b981`                                  | Tier 3 accent color.                  |
| `--alpha-circular-pyramid-stack-4-color` | `#f59e0b`                                  | Tier 4 accent color.                  |
| `--alpha-circular-pyramid-stack-5-color` | `#ec4899`                                  | Tier 5 accent color.                  |
| `--alpha-circular-pyramid-stack-6-color` | `#06b6d4`                                  | Tier 6 (base disc) accent color.      |
| `--alpha-circular-pyramid-stack-heading` | `var(--alpha-foreground-primary, #334155)` | Left pill heading text color.         |
| `--alpha-circular-pyramid-stack-content` | `var(--alpha-foreground-primary, #475569)` | Right callout description text color. |

```vue
<!-- Example: Customizing colors via CSS variables -->
<CircularPyramid
  :style="{
    '--alpha-circular-pyramid-stack-1-color': '#0ea5e9',
    '--alpha-circular-pyramid-stack-2-color': '#10b981',
    '--alpha-circular-pyramid-stack-3-color': '#f59e0b'
  }"
>
  <!-- pyramid tiers -->
</CircularPyramid>
```

### 2. UnoCSS Utility Styling

`CircularPyramid` supports forwarded attributes via `useMergedUnoAttrs`. You can pass UnoCSS utility classes to customize overall positioning and scale:

```vue
<CircularPyramid class="my-2 max-w-4xl mx-auto">
  <!-- tiers -->
</CircularPyramid>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <CircularPyramid> (Root diagram container) -->
<fieldset class="alpha-circular-pyramid [alpha-circular-pyramid--animated]">
  <div class="alpha-circular-pyramid__stage">

    <!-- Central Floating Circular Pyramid Discs SVG Graphic -->
    <div class="alpha-circular-pyramid__middle">
      <svg class="alpha-circular-pyramid__svg">
        <g class="alpha-circular-pyramid__stack">
          <!-- Stacked Circular Disc (0: Top Disc to 5: Base Disc) -->
          <g class="alpha-circular-pyramid__layer alpha-circular-pyramid__layer--0 [alpha-circular-pyramid__layer--active]">
            <!-- 3D Cylindrical Mantle Rim -->
            <path class="alpha-circular-pyramid__rim" ... />
            <!-- Disc Top Elliptical Face -->
            <path class="alpha-circular-pyramid__face" ... />
          </g>
        </g>
      </svg>
      <!-- Interactive Click Overlay Button -->
      <button type="button" class="alpha-interaction-control" aria-label="Select layer 1" />
    </div>

    <!-- Slotted Tier Row (<CircularPyramidStack>) -->
    <div class="alpha-circular-pyramid-stack">
      <!-- Left Heading Pill (<CircularPyramidStackHeading>) -->
      <div class="alpha-circular-pyramid-stack-heading">
        <div class="alpha-circular-pyramid-stack-heading__pill">
          <span class="alpha-circular-pyramid-stack-heading__number">01</span>
          <span class="alpha-circular-pyramid-stack-heading__text">Strategy</span>
        </div>
        <div class="alpha-circular-pyramid-stack-heading__line" />
        <div class="alpha-circular-pyramid-stack-heading__dot" />
      </div>

      <!-- Right Content Card (<CircularPyramidStackContent>) -->
      <div class="alpha-circular-pyramid-stack-content-wrapper">
        <div class="alpha-circular-pyramid-stack-content alpha-circular-pyramid-stack-content--default">
          Define target goals and alignment principles.
        </div>
        <div class="alpha-circular-pyramid-stack-content__connector">
          <div class="alpha-circular-pyramid-stack-content__line" />
          <div class="alpha-circular-pyramid-stack-content__dot" />
        </div>
      </div>
    </div>

  </div>
</fieldset>
```

#### Class Reference Table

| Component                       | Target Element         | Rendered Class                                  | Purpose & Description                                         |
| :------------------------------ | :--------------------- | :---------------------------------------------- | :------------------------------------------------------------ |
| `<CircularPyramid>`             | Root container         | `.alpha-circular-pyramid`                       | Main outer circular pyramid fieldset.                         |
| `<CircularPyramid>`             | Animation modifier     | `.alpha-circular-pyramid--animated`             | Entrance floating animation modifier.                         |
| `<CircularPyramid>`             | Stage wrapper          | `.alpha-circular-pyramid__stage`                | Relative stage positioning central discs and side wings.      |
| `<CircularPyramid>`             | Middle wrapper         | `.alpha-circular-pyramid__middle`               | Coordinates SVG pyramid discs and button overlays.            |
| `<CircularPyramid>`             | Center SVG             | `.alpha-circular-pyramid__svg`                  | SVG rendering 3D stacked elliptical discs.                    |
| `<CircularPyramid>`             | Disc stack group       | `.alpha-circular-pyramid__stack`                | SVG `<g>` grouping all tier discs.                            |
| `<CircularPyramid>`             | Tier disc layer        | `.alpha-circular-pyramid__layer`                | Disc group (modifiers: `--active`, `--default`, `--{index}`). |
| `<CircularPyramid>`             | Cylindrical mantle rim | `.alpha-circular-pyramid__rim`                  | SVG path rendering the 3D depth rim of each disc.             |
| `<CircularPyramid>`             | Top elliptical face    | `.alpha-circular-pyramid__face`                 | SVG path rendering top luminous/frosted disc surface.         |
| `<CircularPyramid>`             | Interaction button     | `.alpha-interaction-control`                    | Transparent overlay button for interactive click selection.   |
| `<CircularPyramidStack>`        | Tier row container     | `.alpha-circular-pyramid-stack`                 | Row aligning left heading and right content with tier disc.   |
| `<CircularPyramidStackHeading>` | Heading wrapper        | `.alpha-circular-pyramid-stack-heading`         | Left heading component wrapper.                               |
| `<CircularPyramidStackHeading>` | Heading pill           | `.alpha-circular-pyramid-stack-heading__pill`   | Rounded pill badge with step number and title.                |
| `<CircularPyramidStackHeading>` | Step number badge      | `.alpha-circular-pyramid-stack-heading__number` | Circular badge showing tier numeric index.                    |
| `<CircularPyramidStackHeading>` | Heading label text     | `.alpha-circular-pyramid-stack-heading__text`   | Title label inside the heading pill.                          |
| `<CircularPyramidStackHeading>` | Connector line         | `.alpha-circular-pyramid-stack-heading__line`   | Horizontal track linking pill to disc anchor.                 |
| `<CircularPyramidStackHeading>` | Anchor dot             | `.alpha-circular-pyramid-stack-heading__dot`    | Dot target anchoring line to disc.                            |
| `<CircularPyramidStackContent>` | Content card           | `.alpha-circular-pyramid-stack-content`         | Right-side callout description card.                          |
| `<CircularPyramidStackContent>` | Active card modifier   | `.alpha-circular-pyramid-stack-content--active` | Highlighted active callout card.                              |
| `<CircularPyramidStackContent>` | Content wrapper        | `.alpha-circular-pyramid-stack-content-wrapper` | Container coordinating connector line and card.               |
| `<CircularPyramidStackContent>` | Connector line         | `.alpha-circular-pyramid-stack-content__line`   | Line leading from card to tier disc anchor.                   |
| `<CircularPyramidStackContent>` | Anchor dot             | `.alpha-circular-pyramid-stack-content__dot`    | Dot anchoring content track to disc edge.                     |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all circular pyramid diagrams across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all CircularPyramid diagrams across slides */

/* 1. Customize heading pill styling */
.alpha-circular-pyramid-stack-heading__pill {
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* 2. Customize content card appearance */
.alpha-circular-pyramid-stack-content {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  font-size: 0.8rem;
  line-height: 1.45;
}

/* 3. Smooth active layer transitions */
.alpha-circular-pyramid__layer {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for pyramid tiers on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<CircularPyramid>
  <!-- pyramid tiers -->
</CircularPyramid>

<style>
/* Scoped to this slide only */
:deep(.alpha-circular-pyramid-stack-heading__pill) {
  border-color: #0284c7;
}

:deep(.alpha-circular-pyramid-stack-content--active) {
  border-color: #0284c7;
  box-shadow: 0 0 12px rgba(2, 132, 199, 0.3);
}
</style>
```

### 4. Layer Count & Sizing Controls

- **`scale`**: Fine-tune the rendering scale multiplier for tight slide layouts.
- **`autoScale`** (default `true`): Automatically computes geometry bounds to avoid overflowing the viewport.
- Pass `color` prop directly on individual `<CircularPyramidStack>` elements to override individual tier discs.
