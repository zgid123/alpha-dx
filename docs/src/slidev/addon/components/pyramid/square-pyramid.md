# Square Pyramid

3D tiered square pyramid process diagram with stacked isometric square slabs, frosted glass translucent default layers, and an active sharp top layer. Includes `SquarePyramid`, `SquarePyramidStack`, `SquarePyramidStackHeading`, and `SquarePyramidStackContent`.

## Purpose

Tiered pyramid workflow where each tier is represented by a 3D isometric square slab with rounded corners and glassmorphism styling. The default layers feature a frosted-glass translucent effect with an inner highlight plate, while the active layer is highlighted without blur in the vibrant theme color with drop shadows.

**When to use**: When presenting hierarchical stages, tiered architectures, capability layers, or maturity levels with modern geometric square slabs. Supports 1 to 6 square layers with customizable theme colors and interactive layer activation.

## Presentation Preview

<SquarePyramidDemo />

---

## Usage Examples

### Compound Stacks Hierarchy

```vue
<SquarePyramid>
  <SquarePyramidStack>
    <SquarePyramidStackHeading>01 Strategy</SquarePyramidStackHeading>
    <SquarePyramidStackContent>
      Define clear technical north stars, design systems, and cross-team alignment.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackHeading>02 Architecture</SquarePyramidStackHeading>
    <SquarePyramidStackContent>
      Establish domain boundaries, type safety contracts, and scalable infrastructure.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackHeading>03 Implementation</SquarePyramidStackHeading>
    <SquarePyramidStackContent>
      Build high-performance components with smooth motion and responsive layout.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackHeading>04 Verification</SquarePyramidStackHeading>
    <SquarePyramidStackContent>
      Validate behavior with rigorous unit suites, formatting, and live slide builds.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
</SquarePyramid>
```

### Self-Contained Mockup with Custom Color

```vue
<SquarePyramid
  :count="6"
  :active-index="0"
  color="#6366f1"
/>
```

---

## Props Reference

### `SquarePyramid`

- **Rendered Class:** `.alpha-square-pyramid` (modifier: `.alpha-square-pyramid--animated`)
- **Rendered HTML Tag:** `<fieldset>`
- **Role:** Root square pyramid diagram container coordinating responsive auto-scaling and 3D isometric slab stages.

| Prop          | Type               | Default     | Required | Description                                                                                            |
| :------------ | :----------------- | :---------- | :------: | :----------------------------------------------------------------------------------------------------- |
| `count`       | `number`           | `undefined` |    No    | Number of square layers (1 to 6). Inferred from slotted stacks if omitted.                             |
| `activeIndex` | `number`           | `-1`        |    No    | Index of the active square layer (0 = top). Rendered sharp with vibrant glow.                          |
| `color`       | `string`           | `'#3b82f6'` |    No    | Primary theme color. Dynamically computes active and translucent frosted glass gradients.              |
| `colors`      | `string[]`         | `undefined` |    No    | Custom color palette per layer. Defaults to multi-hue palette (pink, purple, blue, cyan, teal, amber). |
| `interactive` | `boolean`          | `true`      |    No    | Enables clicking layers or stacks to change the active layer.                                          |
| `animation`   | `boolean`          | `true`      |    No    | Enables entrance and staggered floating animations.                                                    |
| `autoScale`   | `boolean`          | `true`      |    No    | Enables responsive diagram scaling.                                                                    |
| `width`       | `number \| string` | `undefined` |    No    | Container width.                                                                                       |
| `height`      | `number \| string` | `undefined` |    No    | Container height.                                                                                      |

---

## Child Components Summary

- `SquarePyramidStack`: Row container coordinating left heading and right content around the corresponding isometric slab.
- `SquarePyramidStackHeading`: Left heading component displaying numeric step pill and connector line.
- `SquarePyramidStackContent`: Right callout card displaying tier description and connector line.

### `SquarePyramidStack`

- **Rendered Class:** `.alpha-square-pyramid-stack`
- **Rendered HTML Tag:** `<div>`
- **Role:** Tier row container coordinating left heading and right content around the corresponding isometric slab.

| Prop             | Type               | Default     | Required | Description                                                                |
| :--------------- | :----------------- | :---------- | :------: | :------------------------------------------------------------------------- |
| `index`          | `number`           | `undefined` |    No    | Zero-based index of the slab (from top to base). Auto-inferred if omitted. |
| `step`           | `string \| number` | `undefined` |    No    | Explicit step number or label displayed in the heading badge.              |
| `color`          | `string`           | `undefined` |    No    | Accent color override for this slab and connectors.                        |
| `active`         | `boolean`          | `undefined` |    No    | Overrides active focus state for this slab.                                |
| `connectorWidth` | `number`           | `undefined` |    No    | Connector horizontal width override in pixels.                             |

### `SquarePyramidStackHeading`

- **Rendered Class:** `.alpha-square-pyramid-stack-heading` (pill: `.alpha-square-pyramid-stack-heading__pill`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Left-side title pill badge displaying numeric step index and heading text.

| Prop       | Type               | Default     | Required | Description                                      |
| :--------- | :----------------- | :---------- | :------: | :----------------------------------------------- |
| `step`     | `string \| number` | `undefined` |    No    | Step number or text badge displayed in the pill. |
| `color`    | `string`           | `undefined` |    No    | Pill accent color override.                      |
| `minWidth` | `number`           | `150`       |    No    | Minimum width of the heading pill in pixels.     |

### `SquarePyramidStackContent`

- **Rendered Class:** `.alpha-square-pyramid-stack-content` (wrapper: `.alpha-square-pyramid-stack-content-wrapper`, modifiers: `.alpha-square-pyramid-stack-content--active`, `.alpha-square-pyramid-stack-content--default`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Right-side callout description card with connecting line leading to the slab edge.

| Prop             | Type     | Default     | Required | Description                             |
| :--------------- | :------- | :---------- | :------: | :-------------------------------------- |
| `color`          | `string` | `undefined` |    No    | Card accent color override.             |
| `connectorWidth` | `number` | `undefined` |    No    | Width of the connecting line in pixels. |

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize tier colors globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                               | Default                                    | Description                           |
| :------------------------------------- | :----------------------------------------- | :------------------------------------ |
| `--alpha-square-pyramid-stack-1-color` | `#ec4899`                                  | Tier 1 (top slab) accent color.       |
| `--alpha-square-pyramid-stack-2-color` | `#8b5cf6`                                  | Tier 2 accent color.                  |
| `--alpha-square-pyramid-stack-3-color` | `#3b82f6`                                  | Tier 3 accent color.                  |
| `--alpha-square-pyramid-stack-4-color` | `#06b6d4`                                  | Tier 4 accent color.                  |
| `--alpha-square-pyramid-stack-5-color` | `#14b8a6`                                  | Tier 5 accent color.                  |
| `--alpha-square-pyramid-stack-6-color` | `#f59e0b`                                  | Tier 6 (base slab) accent color.      |
| `--alpha-square-pyramid-stack-heading` | `var(--alpha-foreground-primary, #334155)` | Left pill heading text color.         |
| `--alpha-square-pyramid-stack-content` | `var(--alpha-foreground-primary, #475569)` | Right callout description text color. |

```vue
<!-- Example: Customizing colors via CSS variables -->
<SquarePyramid
  :style="{
    '--alpha-square-pyramid-stack-1-color': '#f43f5e',
    '--alpha-square-pyramid-stack-2-color': '#ec4899',
    '--alpha-square-pyramid-stack-3-color': '#a855f7'
  }"
>
  <!-- pyramid tiers -->
</SquarePyramid>
```

### 2. UnoCSS Utility Styling

`SquarePyramid` supports forwarded attributes via `useMergedUnoAttrs`. You can pass UnoCSS utility classes to adjust margins or responsive scale:

```vue
<SquarePyramid class="my-2 max-w-4xl mx-auto">
  <!-- tiers -->
</SquarePyramid>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <SquarePyramid> (Root diagram container) -->
<fieldset class="alpha-square-pyramid [alpha-square-pyramid--animated]">
  <div class="alpha-square-pyramid__stage">

    <!-- Central Floating Isometric Slabs SVG Graphic -->
    <div class="alpha-square-pyramid__middle">
      <svg class="alpha-square-pyramid__svg">
        <g class="alpha-square-pyramid__stack">
          <!-- Stacked Isometric Slab (0: Apex Slab to 5: Base Slab) -->
          <g class="alpha-square-pyramid__layer alpha-square-pyramid__layer--0 [alpha-square-pyramid__layer--active]">
            <!-- Front/Side Facets -->
            <polygon class="alpha-square-pyramid__face" ... />
            <!-- Top Slab Face -->
            <polygon class="alpha-square-pyramid__rim" ... />
          </g>
        </g>
      </svg>
      <!-- Interactive Click Overlay Button -->
      <button type="button" class="alpha-interaction-control" aria-label="Select layer 1" />
    </div>

    <!-- Slotted Tier Row (<SquarePyramidStack>) -->
    <div class="alpha-square-pyramid-stack">
      <!-- Left Heading Pill (<SquarePyramidStackHeading>) -->
      <div class="alpha-square-pyramid-stack-heading">
        <div class="alpha-square-pyramid-stack-heading__pill">
          <span class="alpha-square-pyramid-stack-heading__number">01</span>
          <span class="alpha-square-pyramid-stack-heading__text">Foundation</span>
        </div>
        <div class="alpha-square-pyramid-stack-heading__line" />
        <div class="alpha-square-pyramid-stack-heading__dot" />
      </div>

      <!-- Right Content Card (<SquarePyramidStackContent>) -->
      <div class="alpha-square-pyramid-stack-content-wrapper">
        <div class="alpha-square-pyramid-stack-content alpha-square-pyramid-stack-content--default">
          Establish infrastructure, core data schemas, and contracts.
        </div>
        <div class="alpha-square-pyramid-stack-content__connector">
          <div class="alpha-square-pyramid-stack-content__line" />
          <div class="alpha-square-pyramid-stack-content__dot" />
        </div>
      </div>
    </div>

  </div>
</fieldset>
```

#### Class Reference Table

| Component                     | Target Element       | Rendered Class                                | Purpose & Description                                              |
| :---------------------------- | :------------------- | :-------------------------------------------- | :----------------------------------------------------------------- |
| `<SquarePyramid>`             | Root container       | `.alpha-square-pyramid`                       | Main outer square pyramid fieldset.                                |
| `<SquarePyramid>`             | Animation modifier   | `.alpha-square-pyramid--animated`             | Entrance floating animation modifier.                              |
| `<SquarePyramid>`             | Stage wrapper        | `.alpha-square-pyramid__stage`                | Relative stage positioning central isometric slabs and side wings. |
| `<SquarePyramid>`             | Middle wrapper       | `.alpha-square-pyramid__middle`               | Coordinates SVG isometric slabs and interactive button overlays.   |
| `<SquarePyramid>`             | Center SVG           | `.alpha-square-pyramid__svg`                  | SVG rendering 3D isometric square pyramid slabs.                   |
| `<SquarePyramid>`             | Slab stack group     | `.alpha-square-pyramid__stack`                | SVG `<g>` grouping all tier slabs.                                 |
| `<SquarePyramid>`             | Tier slab layer      | `.alpha-square-pyramid__layer`                | Slab group (modifiers: `--active`, `--default`, `--{index}`).      |
| `<SquarePyramid>`             | Slab facet           | `.alpha-square-pyramid__face`                 | SVG polygon rendering 3D depth facets of the slab.                 |
| `<SquarePyramid>`             | Top slab surface     | `.alpha-square-pyramid__rim`                  | SVG polygon rendering top illuminated slab face.                   |
| `<SquarePyramid>`             | Interaction button   | `.alpha-interaction-control`                  | Transparent overlay button for interactive click selection.        |
| `<SquarePyramidStack>`        | Tier row container   | `.alpha-square-pyramid-stack`                 | Row aligning left heading and right content with isometric slab.   |
| `<SquarePyramidStackHeading>` | Heading wrapper      | `.alpha-square-pyramid-stack-heading`         | Left heading component wrapper.                                    |
| `<SquarePyramidStackHeading>` | Heading pill         | `.alpha-square-pyramid-stack-heading__pill`   | Rounded pill badge with step number and title.                     |
| `<SquarePyramidStackHeading>` | Step number badge    | `.alpha-square-pyramid-stack-heading__number` | Circular badge showing tier numeric index.                         |
| `<SquarePyramidStackHeading>` | Heading label text   | `.alpha-square-pyramid-stack-heading__text`   | Title label inside the heading pill.                               |
| `<SquarePyramidStackHeading>` | Connector line       | `.alpha-square-pyramid-stack-heading__line`   | Horizontal track linking pill to slab anchor.                      |
| `<SquarePyramidStackHeading>` | Anchor dot           | `.alpha-square-pyramid-stack-heading__dot`    | Dot target anchoring line to slab.                                 |
| `<SquarePyramidStackContent>` | Content card         | `.alpha-square-pyramid-stack-content`         | Right-side callout description card.                               |
| `<SquarePyramidStackContent>` | Active card modifier | `.alpha-square-pyramid-stack-content--active` | Highlighted active callout card.                                   |
| `<SquarePyramidStackContent>` | Content wrapper      | `.alpha-square-pyramid-stack-content-wrapper` | Container coordinating connector line and card.                    |
| `<SquarePyramidStackContent>` | Connector line       | `.alpha-square-pyramid-stack-content__line`   | Line leading from card to tier slab anchor.                        |
| `<SquarePyramidStackContent>` | Anchor dot           | `.alpha-square-pyramid-stack-content__dot`    | Dot anchoring content track to slab edge.                          |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all square pyramid diagrams across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all SquarePyramid diagrams across slides */

/* 1. Customize heading pill typography */
.alpha-square-pyramid-stack-heading__pill {
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* 2. Customize content callout appearance */
.alpha-square-pyramid-stack-content {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  font-size: 0.8rem;
  line-height: 1.45;
}

/* 3. Smooth active slab elevation */
.alpha-square-pyramid__layer {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for square pyramid tiers on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<SquarePyramid>
  <!-- pyramid tiers -->
</SquarePyramid>

<style>
/* Scoped to this slide only */
:deep(.alpha-square-pyramid-stack-heading__pill) {
  border-color: #f43f5e;
}

:deep(.alpha-square-pyramid-stack-content--active) {
  border-color: #f43f5e;
  box-shadow: 0 0 12px rgba(244, 63, 94, 0.3);
}
</style>
```

### 4. Isometric 3D View & Interaction

- **`interactive`** (default `true`): Set `:interactive="true"` to allow audience click selection highlighting specific pyramid slabs.
- **`autoScale`** (default `true`): Automatically keeps the isometric 3D canvas centered within the slide boundaries.
- Override specific tier colors by passing `color` directly to `<SquarePyramidStack>`.
