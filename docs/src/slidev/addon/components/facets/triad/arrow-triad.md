# Arrow Triad

Three-way curved arrow infographic with concentric dashed guide lines and customizable callout blocks. Includes `ArrowTriad`, `ArrowTriadCallout`, `ArrowTriadHeading`, `ArrowTriadContent`, and `ArrowTriadIcon`.

## Purpose

Three-way curved arrow infographic for visualizing cyclical relationships, interdependent processes, or three pillars of a methodology.

**When to use**: When presenting three interconnected concepts that flow into each other — development cycles, feedback loops, or three-pillar frameworks. Choose layout variants to control callout arrangement.

## Presentation Preview

<ArrowTriadDemo />

---

## Usage Examples

### Default Layout (`2-left-1-right`)

```vue
<ArrowTriad>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Architect</ArrowTriadHeading>
    <ArrowTriadContent>
      Design clear domain boundaries and clean abstractions.
    </ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Implement</ArrowTriadHeading>
    <ArrowTriadContent>
      Construct robust type-safe utilities with automated test suites.
    </ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Deliver</ArrowTriadHeading>
    <ArrowTriadContent>
      Ship packages, generate presentations, and maintain high standards.
    </ArrowTriadContent>
  </ArrowTriadCallout>
</ArrowTriad>
```

### Inverted Layout (`1-left-2-right`)

```vue
<ArrowTriad layout="1-left-2-right" :animation="false">
  <ArrowTriadCallout>
    <ArrowTriadIcon icon="i-lucide-search" />
    <ArrowTriadHeading>Step 1</ArrowTriadHeading>
    <ArrowTriadContent>Initial assessment</ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout>
    <ArrowTriadIcon icon="i-lucide-settings" />
    <ArrowTriadHeading>Step 2</ArrowTriadHeading>
    <ArrowTriadContent>Execution phase</ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout>
    <ArrowTriadIcon icon="i-lucide-check" />
    <ArrowTriadHeading>Step 3</ArrowTriadHeading>
    <ArrowTriadContent>Review and retro</ArrowTriadContent>
  </ArrowTriadCallout>
</ArrowTriad>
```

---

## Props Reference

### `ArrowTriad`

- **Rendered Class:** `.alpha-arrow-triad`
- **Rendered HTML Tag:** `<div>`
- **Role:** Root triad diagram container managing responsive auto-scaling and central arrow loop stage.

| Prop           | Type                                                           | Default            | Required | Description                                          |
| :------------- | :------------------------------------------------------------- | :----------------- | :------: | :--------------------------------------------------- |
| `layout`       | `'2-left-1-right' \| '1-left-2-right' \| '2-left' \| '1-left'` | `'2-left-1-right'` |    No    | Arrangement of the callout blocks around the arrows. |
| `animation`    | `boolean`                                                      | `true`             |    No    | Enables entrance animation sequence.                 |
| `triangleHead` | `boolean`                                                      | `true`             |    No    | Shows or hides triangle arrow heads.                 |
| `neckLine`     | `boolean`                                                      | `true`             |    No    | Shows or hides dashed connector guide lines.         |
| `scale`        | `number`                                                       | `undefined`        |    No    | Explicit scale multiplier for the diagram.           |
| `autoScale`    | `boolean`                                                      | `true`             |    No    | Automatically scales diagram to fit slide height.    |

---

## Child Components Summary

- `ArrowTriadCallout`: Individual callout container.
- `ArrowTriadHeading`: Callout header text.
- `ArrowTriadContent`: Callout body content.
- `ArrowTriadIcon`: Optional icon container for each callout.

### `ArrowTriadCallout`

- **Rendered Class:** `.alpha-arrow-triad-callout` (modifiers: `.alpha-arrow-triad-callout--animated`, `.alpha-arrow-triad-callout--{0..2}`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Floating callout card positioning icon, heading title, and body description.

| Prop          | Type                        | Default     | Required | Description                                  |
| :------------ | :-------------------------- | :---------- | :------: | :------------------------------------------- |
| `id`          | `string \| number`          | `undefined` |    No    | Override internal ID.                        |
| `index`       | `number`                    | `undefined` |    No    | Override auto-registered index (0, 1, or 2). |
| `icon`        | `string \| object \| false` | `undefined` |    No    | Iconifier icon name or object.               |
| `color`       | `string`                    | `undefined` |    No    | Accent color override.                       |
| `cardBg`      | `string`                    | `undefined` |    No    | Background color of the callout card.        |
| `textColor`   | `string`                    | `undefined` |    No    | Text color for description.                  |
| `titleColor`  | `string`                    | `undefined` |    No    | Text color for title.                        |
| `title`       | `string`                    | `undefined` |    No    | Title text.                                  |
| `description` | `string`                    | `undefined` |    No    | Description text.                            |

### `ArrowTriadHeading`

- **Rendered Class:** `.alpha-arrow-triad-heading`
- **Rendered HTML Tag:** `<h4>`
- **Role:** Callout uppercase heading title text.

| Prop    | Type     | Default     | Required | Description                        |
| :------ | :------- | :---------- | :------: | :--------------------------------- |
| `color` | `string` | `undefined` |    No    | Heading title text color override. |

### `ArrowTriadContent`

- **Rendered Class:** `.alpha-arrow-triad-content`
- **Rendered HTML Tag:** `<p>`
- **Role:** Callout body description text block.

| Prop    | Type     | Default     | Required | Description                           |
| :------ | :------- | :---------- | :------: | :------------------------------------ |
| `color` | `string` | `undefined` |    No    | Body description text color override. |

### `ArrowTriadIcon`

- **Rendered Class:** `.alpha-arrow-triad-icon`
- **Rendered HTML Tag:** `<div>`
- **Role:** Centered icon container placed in the header of each callout card.

| Prop    | Type               | Default     | Required | Description                           |
| :------ | :----------------- | :---------- | :------: | :------------------------------------ |
| `icon`  | `string \| object` | `undefined` |    No    | Icon class string or Vue component.   |
| `color` | `string`           | `undefined` |    No    | Foreground icon color override.       |
| `size`  | `number \| string` | `36`        |    No    | Icon size in pixels or CSS dimension. |

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the diagram colors globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                               | Default                                    | Description                            |
| :------------------------------------- | :----------------------------------------- | :------------------------------------- |
| `--alpha-arrow-triad-item-1-color`     | `#fec201`                                  | First node/arrow accent color.         |
| `--alpha-arrow-triad-item-2-color`     | `#71ad49`                                  | Second node/arrow accent color.        |
| `--alpha-arrow-triad-item-3-color`     | `#5b9bd5`                                  | Third node/arrow accent color.         |
| `--alpha-arrow-triad-heading`          | `var(--alpha-foreground-primary, #1e293b)` | Callout heading title text color.      |
| `--alpha-arrow-triad-content`          | `var(--alpha-foreground-primary, #64748b)` | Callout description body text color.   |
| `--alpha-arrow-triad-connector-stroke` | `#94a3b8`                                  | Curved guide dashed stroke color.      |
| `--alpha-arrow-triad-icon`             | `#334155`                                  | Icon foreground color within callouts. |

```vue
<!-- Example: Customizing colors via CSS variables -->
<ArrowTriad
  :style="{
    '--alpha-arrow-triad-item-1-color': '#06b6d4',
    '--alpha-arrow-triad-item-2-color': '#3b82f6',
    '--alpha-arrow-triad-item-3-color': '#6366f1'
  }"
>
  <!-- callouts -->
</ArrowTriad>
```

### 2. UnoCSS Utility Styling

`ArrowTriad` passes attributes to the root container via `useMergedUnoAttrs`. You can pass UnoCSS utility classes to adjust alignment or add slide margins:

```vue
<ArrowTriad class="my-4 max-w-5xl mx-auto">
  <!-- callouts -->
</ArrowTriad>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <ArrowTriad> (Root diagram container) -->
<div class="alpha-arrow-triad">
  <div class="alpha-arrow-triad__stage">

    <!-- Central SVG Diagram with Curved Interlocking Arrows -->
    <div class="alpha-arrow-triad__center">
      <svg>
        <!-- Dashed Guide Arcs -->
        <g class="alpha-arrow-triad__dashed [alpha-arrow-triad--animated]">
          <path ... />
        </g>

        <!-- Interlocking Arrow Branches (0: Yellow, 1: Green, 2: Blue) -->
        <g class="alpha-arrow-triad__branch alpha-arrow-triad__branch--yellow [alpha-arrow-triad--animated]">
          <path ... /> <!-- Arrow stem -->
          <polygon ... /> <!-- Arrow head -->
        </g>
      </svg>
    </div>

    <!-- Floating Callout Card (<ArrowTriadCallout>) -->
    <div class="alpha-arrow-triad-callout alpha-arrow-triad-callout--0 [alpha-arrow-triad-callout--animated]">
      <!-- Optional Icon Header (<ArrowTriadIcon>) -->
      <div class="alpha-arrow-triad-icon">
        <span class="i-lucide-activity" />
      </div>

      <!-- Heading (<ArrowTriadHeading>) -->
      <h4 class="alpha-arrow-triad-heading">Step 1</h4>

      <!-- Description (<ArrowTriadContent>) -->
      <p class="alpha-arrow-triad-content">Initial assessment</p>
    </div>

  </div>
</div>
```

#### Class Reference Table

| Component             | Target Element     | Rendered Class                         | Purpose & Description                                            |
| :-------------------- | :----------------- | :------------------------------------- | :--------------------------------------------------------------- |
| `<ArrowTriad>`        | Root container     | `.alpha-arrow-triad`                   | Main outer triad diagram container.                              |
| `<ArrowTriad>`        | Stage container    | `.alpha-arrow-triad__stage`            | Relative stage coordinates positioning arrows and callout cards. |
| `<ArrowTriad>`        | Center wrapper     | `.alpha-arrow-triad__center`           | Positions SVG arrows and circular guide tracks.                  |
| `<ArrowTriad>`        | Dashed guide loop  | `.alpha-arrow-triad__dashed`           | SVG group for dashed orbital guide paths.                        |
| `<ArrowTriad>`        | Arrow branch       | `.alpha-arrow-triad__branch`           | SVG group for curved arrow stem and polygonal arrow head.        |
| `<ArrowTriad>`        | Animation modifier | `.alpha-arrow-triad--animated`         | Entrance rotation and pop animation sequence modifier.           |
| `<ArrowTriadCallout>` | Callout card       | `.alpha-arrow-triad-callout`           | Rounded card container for title, description, and icon.         |
| `<ArrowTriadCallout>` | Callout modifier   | `.alpha-arrow-triad-callout--animated` | Entrance slide motion modifier.                                  |
| `<ArrowTriadHeading>` | Heading            | `.alpha-arrow-triad-heading`           | Callout title text block with uppercase styling.                 |
| `<ArrowTriadContent>` | Content block      | `.alpha-arrow-triad-content`           | Callout body description text block.                             |
| `<ArrowTriadIcon>`    | Icon container     | `.alpha-arrow-triad-icon`              | Optional icon container inside the callout card.                 |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all arrow triad diagrams across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all ArrowTriad diagrams across slides */

/* 1. Customize callout card shadow and radius */
.alpha-arrow-triad-callout {
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

/* 2. Customize callout heading typography */
.alpha-arrow-triad-heading {
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
}

/* 3. Adjust callout content line height */
.alpha-arrow-triad-content {
  line-height: 1.5;
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for arrow triad callouts on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<ArrowTriad>
  <!-- callouts -->
</ArrowTriad>

<style>
/* Scoped to this slide only */
:deep(.alpha-arrow-triad-callout) {
  border: 1px solid rgba(148, 163, 184, 0.2);
}

:deep(.alpha-arrow-triad-heading) {
  letter-spacing: 0.1em;
}
</style>
```

### 4. Layout Configurations

- **`layout`**: Control callout distribution around the triad cycle:
  - `'2-left-1-right'` (default): Two callouts on the left, one on the right.
  - `'1-left-2-right'`: One callout on the left, two on the right.
  - `'2-left'`: Compact presentation with only two left-hand callouts.
  - `'1-left'`: Minimal presentation with one focal callout.
- **`autoScale`** (default `true`): Automatically fits the diagram to slide height.

### 5. Granular Callout Customization

- Use `color`, `cardBg`, and `textColor` directly on `<ArrowTriadCallout>` for per-item overrides.
- Embed `<ArrowTriadIcon>` with custom UnoCSS icon classes for visual metaphors.
