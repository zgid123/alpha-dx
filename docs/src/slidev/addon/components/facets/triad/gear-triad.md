# Gear Triad

A three-part mechanical gear with an interlocking center hub, three composed callouts, and optional detail panels.

## Usage

### Standard Overview

Compose each callout from its heading, content, and optional icon.

<GearTriadDemo />

```vue
<GearTriad>
  <GearTriadCallout>
    <GearTriadIcon icon="document" />
    <GearTriadHeading>Hypothesis</GearTriadHeading>
    <GearTriadContent>Formulate testable questions and models.</GearTriadContent>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadIcon icon="shield" />
    <GearTriadHeading>Experiment</GearTriadHeading>
    <GearTriadContent>Run controlled investigations.</GearTriadContent>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadIcon icon="archive" />
    <GearTriadHeading>Validation</GearTriadHeading>
    <GearTriadContent>Verify findings with reproducible review.</GearTriadContent>
  </GearTriadCallout>
</GearTriad>
```

### With Interactive Details

When stepping through presentation clicks or selecting sectors, the gear shifts to the left and reveals expandable detail lists for the active option.

<GearTriadDetailsDemo />

```vue
<GearTriad>
  <!-- Triad Callouts -->
  <GearTriadCallout>
    <GearTriadIcon icon="document" />
    <GearTriadHeading>Hypothesis</GearTriadHeading>
    <GearTriadContent>Formulate testable questions and models.</GearTriadContent>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadIcon icon="shield" />
    <GearTriadHeading>Experiment</GearTriadHeading>
    <GearTriadContent>Run controlled investigations.</GearTriadContent>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadIcon icon="archive" />
    <GearTriadHeading>Validation</GearTriadHeading>
    <GearTriadContent>Verify findings with reproducible review.</GearTriadContent>
  </GearTriadCallout>

  <!-- Option 1 Details -->
  <GearTriadDetails :option="1">
    <GearTriadDetailsHeading>Phase Deep Dive</GearTriadDetailsHeading>
    <GearTriadDetailsContent>Detailed workflow and execution steps for Option 1.</GearTriadDetailsContent>
    <GearTriadDetail>Option 1: Modern high-performance reactivity layer.</GearTriadDetail>
    <GearTriadDetail>Option 1: Seamless automated slide deck layout shifts.</GearTriadDetail>
    <GearTriadDetail>Option 1: Declarative SVG geometry computation.</GearTriadDetail>
    <GearTriadDetail>Option 1: Synchronized rotation and translation.</GearTriadDetail>
  </GearTriadDetails>

  <!-- Option 2 Details -->
  <GearTriadDetails :option="2">
    <GearTriadDetailsHeading>Phase Deep Dive</GearTriadDetailsHeading>
    <GearTriadDetailsContent>Detailed workflow and execution steps for Option 2.</GearTriadDetailsContent>
    <GearTriadDetail>Option 2: Robust type-safe props and slots contract.</GearTriadDetail>
    <GearTriadDetail>Option 2: Cross-browser hardware-accelerated animations.</GearTriadDetail>
    <GearTriadDetail>Option 2: Layered Vitest and Biome verification safety net.</GearTriadDetail>
    <GearTriadDetail>Option 2: Zero-config Slidev click sequence integration.</GearTriadDetail>
  </GearTriadDetails>

  <!-- Option 3 Details -->
  <GearTriadDetails :option="3">
    <GearTriadDetailsHeading>Phase Deep Dive</GearTriadDetailsHeading>
    <GearTriadDetailsContent>Detailed workflow and execution steps for Option 3.</GearTriadDetailsContent>
    <GearTriadDetail>Option 3: Modular theme tokens with dark/light variants.</GearTriadDetail>
    <GearTriadDetail>Option 3: Adaptive aspect-ratio autoscale and responsive fitting.</GearTriadDetail>
    <GearTriadDetail>Option 3: Clean headless primitives with unstyled defaults.</GearTriadDetail>
    <GearTriadDetail>Option 3: Enterprise-ready slide presentation components.</GearTriadDetail>
  </GearTriadDetails>
</GearTriad>
```

## Props Reference

### `GearTriad`

- **Rendered Class:** `.alpha-gear-triad`
- **Rendered HTML Tag:** `<div>`
- **Role:** Root gear diagram container managing auto-scaling and gear animation state.

| Prop         | Type                        | Default     | Description                                          |
| :----------- | :-------------------------- | :---------- | :--------------------------------------------------- |
| `animation`  | `boolean`                   | `true`      | Enables entrance and continuous rotation animations. |
| `active`     | `boolean`                   | `undefined` | Controls entrance animation state.                   |
| `startDelay` | `number`                    | `undefined` | Delay before entrance animation, in milliseconds.    |
| `scale`      | `number`                    | `undefined` | Explicit scale multiplier.                           |
| `autoScale`  | `boolean`                   | `true`      | Fits the diagram to the slide.                       |
| `maxScale`   | `number`                    | `undefined` | Maximum auto scale.                                  |
| `height`     | `number \| string`          | `undefined` | Container height.                                    |
| `centerIcon` | `string \| object \| false` | `'gear'`    | Center icon, or `false` to hide it.                  |
| `step`       | `number`                    | `undefined` | Active transition step.                              |
| `clicks`     | `number`                    | `undefined` | Slide click count override.                          |
| `moved`      | `boolean`                   | `undefined` | Controls whether the gear is shifted.                |

### `GearTriadCallout`

- **Rendered Class:** `.alpha-gear-triad-callout` (modifiers: `.alpha-gear-triad-callout--animated`, `.alpha-gear-triad-callout--shifted`, `.alpha-gear-triad-callout--{0..2}`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Radial callout card container positioning heading and description text.

| Prop         | Type               | Default     | Required | Description                             |
| :----------- | :----------------- | :---------- | :------: | :-------------------------------------- |
| `id`         | `string \| number` | `undefined` |    No    | Optional callout identifier.            |
| `index`      | `number`           | `undefined` |    No    | Explicit callout position (0, 1, or 2). |
| `color`      | `string`           | `undefined` |    No    | Petal accent color override.            |
| `depthColor` | `string`           | `undefined` |    No    | Petal depth color override.             |
| `cardBg`     | `string`           | `undefined` |    No    | Callout background color.               |
| `textColor`  | `string`           | `undefined` |    No    | Callout content text color.             |
| `titleColor` | `string`           | `undefined` |    No    | Callout heading text color.             |

### `GearTriadCenter`

- **Rendered Class:** `.alpha-gear-triad-center`
- **Rendered HTML Tag:** `<div>`
- **Role:** Intermeshed center circular badge holding central icon or label.

| Prop       | Type               | Default  | Required | Description                              |
| :--------- | :----------------- | :------- | :------: | :--------------------------------------- |
| `icon`     | `string \| object` | `'gear'` |    No    | Center hub icon component or icon class. |
| `radius`   | `number`           | `54`     |    No    | Center circle radius in pixels.          |
| `iconSize` | `number`           | `42`     |    No    | Center icon size in pixels.              |

### `GearTriadHeading`

- **Rendered Class:** `.alpha-gear-triad-heading`
- **Rendered HTML Tag:** `<h4>`
- **Role:** Radial callout heading title text.

| Prop    | Type     | Default     | Required | Description                        |
| :------ | :------- | :---------- | :------: | :--------------------------------- |
| `color` | `string` | `undefined` |    No    | Heading title text color override. |

### `GearTriadContent`

- **Rendered Class:** `.alpha-gear-triad-content`
- **Rendered HTML Tag:** `<p>`
- **Role:** Radial callout body description text.

| Prop    | Type     | Default     | Required | Description                           |
| :------ | :------- | :---------- | :------: | :------------------------------------ |
| `color` | `string` | `undefined` |    No    | Body description text color override. |

### `GearTriadIcon`

- **Rendered Class:** `.alpha-gear-triad-icon`
- **Rendered HTML Tag:** `<div>`
- **Role:** Icon container for gear sector or central badge.

| Prop          | Type               | Default     | Required | Description                           |
| :------------ | :----------------- | :---------- | :------: | :------------------------------------ |
| `icon`        | `string \| object` | `undefined` |    No    | Icon class string or Vue component.   |
| `color`       | `string`           | `undefined` |    No    | Foreground icon color override.       |
| `size`        | `number \| string` | `32`        |    No    | Icon size in pixels or CSS dimension. |
| `strokeWidth` | `number`           | `2`         |    No    | Stroke width for SVG icon rendering.  |

### `GearTriadDetails`

- **Rendered Class:** `.alpha-gear-triad-details`
- **Rendered HTML Tag:** `<div>`
- **Role:** Expandable side details panel sliding in when a gear sector is selected.

| Prop     | Type     | Default     | Required | Description                                                                            |
| :------- | :------- | :---------- | :------: | :------------------------------------------------------------------------------------- |
| `option` | `number` | `undefined` |    No    | Associates this expanded detail panel with a specific gear sector number (1, 2, or 3). |

### `GearTriadDetailsHeading`

- **Rendered Class:** `.alpha-gear-triad-details-heading`
- **Rendered HTML Tag:** `<h3>`
- **Role:** Detail panel title heading text.

| Prop     | Type     | Default     | Required | Description                                                               |
| :------- | :------- | :---------- | :------: | :------------------------------------------------------------------------ |
| `color`  | `string` | `undefined` |    No    | Detail panel heading text color override. Defaults to active block color. |
| `option` | `number` | `undefined` |    No    | Option index this heading belongs to.                                     |

### `GearTriadDetailsContent`

- **Rendered Class:** `.alpha-gear-triad-details-content`
- **Rendered HTML Tag:** `<p>`
- **Role:** Detail panel subtitle or introductory description text.

| Prop    | Type     | Default     | Required | Description                                |
| :------ | :------- | :---------- | :------: | :----------------------------------------- |
| `color` | `string` | `undefined` |    No    | Detail panel subtitle text color override. |

### `GearTriadDetail`

- **Rendered Class:** `.alpha-gear-triad-detail` (child: `.alpha-gear-triad-detail__step`, `.alpha-gear-triad-detail__body`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Numbered detail item row container.

| Prop     | Type               | Default     | Required | Description                                            |
| :------- | :----------------- | :---------- | :------: | :----------------------------------------------------- |
| `step`   | `string \| number` | `undefined` |    No    | Numbered step label.                                   |
| `option` | `number`           | `undefined` |    No    | Option index this detail row belongs to.               |
| `color`  | `string`           | `undefined` |    No    | Number color override. Defaults to active block color. |

---

## Child Components Summary

- `GearTriadCallout`: One of the three composed radial callouts.
- `GearTriadHeading` and `GearTriadContent`: Callout text parts.
- `GearTriadIcon`: Optional callout icon.
- `GearTriadCenter`: Center hub badge.
- `GearTriadDetails`: Optional detail panel for an option.
- `GearTriadDetailsHeading` and `GearTriadDetailsContent`: Detail panel text parts.
- `GearTriadDetail`: Numbered detail row.

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the gears theme globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                             | Default                                    | Description                              |
| :----------------------------------- | :----------------------------------------- | :--------------------------------------- |
| `--alpha-gear-triad-item-1-color`    | `#1fb5b5`                                  | First gear tooth and body accent color.  |
| `--alpha-gear-triad-item-1-depth`    | `#126e7a`                                  | First gear 3D shadow/depth tint.         |
| `--alpha-gear-triad-item-2-color`    | `#f38942`                                  | Second gear tooth and body accent color. |
| `--alpha-gear-triad-item-2-depth`    | `#aa521d`                                  | Second gear 3D shadow/depth tint.        |
| `--alpha-gear-triad-item-3-color`    | `#f05367`                                  | Third gear tooth and body accent color.  |
| `--alpha-gear-triad-item-3-depth`    | `#a82c3c`                                  | Third gear 3D shadow/depth tint.         |
| `--alpha-gear-triad-center-bg-start` | `#ffffff`                                  | Center hub gradient start color.         |
| `--alpha-gear-triad-center-bg-end`   | `#f1f5f9`                                  | Center hub gradient end color.           |
| `--alpha-gear-triad-heading`         | `var(--alpha-foreground-primary, #0f172a)` | Callout title text color.                |
| `--alpha-gear-triad-content`         | `var(--alpha-foreground-primary, #64748b)` | Callout body description color.          |

```vue
<!-- Example: Customizing colors via CSS variables -->
<GearTriad
  :style="{
    '--alpha-gear-triad-item-1-color': '#0ea5e9',
    '--alpha-gear-triad-item-2-color': '#10b981',
    '--alpha-gear-triad-item-3-color': '#f59e0b'
  }"
>
  <!-- callouts and center hub -->
</GearTriad>
```

### 2. UnoCSS Utility Styling

`GearTriad` passes forwarded attributes via `useMergedUnoAttrs`. You can pass UnoCSS utility classes to adjust margins or responsive scale:

```vue
<GearTriad class="my-2 max-w-4xl mx-auto">
  <!-- triad structure -->
</GearTriad>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <GearTriad> (Root gear diagram container) -->
<div class="alpha-gear-triad">
  <!-- Auto-Scaled Stage Container -->
  <div class="alpha-gear-triad__scaler">
    <!-- Interactive Center SVG Gear Assembly -->
    <button type="button" class="alpha-gear-triad__diagram">
      <svg class="w-full h-full">
        <!-- SVG Gear Teeth and Hub (0, 1, 2) -->
        <g class="alpha-gear-triad__gear alpha-gear-triad__gear--0 [alpha-gear-triad__gear--animated]">
          <path ... />
        </g>
      </svg>

      <!-- Center Hub Circular Badge (<GearTriadCenter>) -->
      <div class="alpha-gear-triad-center">
        <!-- <GearTriadIcon> -->
        <div class="alpha-gear-triad-icon">
          <span class="i-lucide-settings" />
        </div>
      </div>
    </button>

    <!-- Radial Callout Card (<GearTriadCallout>) -->
    <div class="alpha-gear-triad-callout alpha-gear-triad-callout--0 [alpha-gear-triad-callout--animated]">
      <!-- <GearTriadHeading> -->
      <h4 class="alpha-gear-triad-heading">Discovery</h4>
      <!-- <GearTriadContent> -->
      <p class="alpha-gear-triad-content">Map customer pain points and system requirements.</p>
    </div>

    <!-- Optional Expanded Details Side Panel (<GearTriadDetails>) -->
    <div class="alpha-gear-triad-details">
      <!-- <GearTriadDetailsHeading> -->
      <h3 class="alpha-gear-triad-details-heading">Phase Deep Dive</h3>
      <!-- <GearTriadDetailsContent> -->
      <p class="alpha-gear-triad-details-content">Detailed workflow and execution steps.</p>

      <!-- Numbered Row (<GearTriadDetail>) -->
      <div class="alpha-gear-triad-detail">
        <span class="alpha-gear-triad-detail__step">01</span>
        <p class="alpha-gear-triad-detail__body">Conduct stakeholder interviews.</p>
      </div>
    </div>

  </div>
</div>
```

#### Class Reference Table

| Component                   | Target Element   | Rendered Class                        | Purpose & Description                                |
| :-------------------------- | :--------------- | :------------------------------------ | :--------------------------------------------------- |
| `<GearTriad>`               | Root container   | `.alpha-gear-triad`                   | Main outer gear triad container.                     |
| `<GearTriad>`               | Auto-scaler      | `.alpha-gear-triad__scaler`           | Scale container maintaining aspect ratio.            |
| `<GearTriad>`               | Diagram stage    | `.alpha-gear-triad__diagram`          | Central SVG gears wrapper button.                    |
| `<GearTriadCenter>`         | Center hub       | `.alpha-gear-triad-center`            | Central interlocking hub circular badge.             |
| `<GearTriadCallout>`        | Callout card     | `.alpha-gear-triad-callout`           | Radial callout card container.                       |
| `<GearTriadCallout>`        | Callout modifier | `.alpha-gear-triad-callout--animated` | Entrance slide motion modifier.                      |
| `<GearTriadCallout>`        | Shifted modifier | `.alpha-gear-triad-callout--shifted`  | Shifted position when detail panel is visible.       |
| `<GearTriadHeading>`        | Heading          | `.alpha-gear-triad-heading`           | Radial callout heading title text.                   |
| `<GearTriadContent>`        | Content block    | `.alpha-gear-triad-content`           | Radial callout body description text.                |
| `<GearTriadIcon>`           | Icon container   | `.alpha-gear-triad-icon`              | Gear sector or center hub icon container.            |
| `<GearTriadDetails>`        | Detail panel     | `.alpha-gear-triad-details`           | Side expanded details panel.                         |
| `<GearTriadDetailsHeading>` | Detail heading   | `.alpha-gear-triad-details-heading`   | Detail panel heading title text.                     |
| `<GearTriadDetailsContent>` | Detail subtitle  | `.alpha-gear-triad-details-content`   | Detail panel subtitle description text.              |
| `<GearTriadDetail>`         | Detail row       | `.alpha-gear-triad-detail`            | Numbered detail item row container.                  |
| `<GearTriadDetail>`         | Step label       | `.alpha-gear-triad-detail__step`      | Detail item step number or label (`01`, `02`, etc.). |
| `<GearTriadDetail>`         | Detail body      | `.alpha-gear-triad-detail__body`      | Detail item description content.                     |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all gear triad diagrams across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all GearTriad diagrams across slides */

/* 1. Customize central gear hub badge */
.alpha-gear-triad-center {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
}

/* 2. Customize callout heading typography */
.alpha-gear-triad-heading {
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
}

/* 3. Adjust callout content line height */
.alpha-gear-triad-content {
  line-height: 1.5;
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for gear diagrams on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<GearTriad>
  <!-- callouts and center hub -->
</GearTriad>

<style>
/* Scoped to this slide only */
:deep(.alpha-gear-triad-details) {
  backdrop-filter: blur(8px);
  border-radius: 16px;
}

:deep(.alpha-gear-triad-heading) {
  color: #0284c7;
}
</style>
```

### 4. Center Hub & Detail Callouts

- **`<GearTriadCenter>`**: Place a central title or icon inside the interconnected gears.
- **`<GearTriadDetails>`**: Embed expanded bullet lists or numbered metrics associated with specific gear sectors.
