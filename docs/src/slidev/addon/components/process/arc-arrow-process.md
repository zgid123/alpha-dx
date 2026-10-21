# Arc Arrow Process

U-shaped curved process workflow with interlocking chevron arrows and outline callouts. Supports 2, 3, or 4 steps, plus standalone arrows. Includes `ArcArrowProcess`, `ArcArrowProcessArrow`, `ArcArrowProcessCallout`, `ArcArrowProcessHeading`, `ArcArrowProcessContent`, and `ArcArrowProcessIcon`.

## Purpose

U-shaped curved workflow with interlocking chevron arrows showing a sequential process flow of 2-4 stages.

**When to use**: When presenting linear workflows, development pipelines, or step-by-step procedures. Supports 2, 3, or 4 stages. Use the standalone `ArcArrowProcessArrow` for decorative chevron elements outside the full process diagram.

## Presentation Preview

<ArcArrowProcessDemo />

---

## Usage Examples

### 3-Stage Process Flow

```vue
<ArcArrowProcess :count="3">
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Discovery & Plan</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Analyze domain architecture and specify component contracts.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Implementation</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Construct SVG geometry with interlocking notches and clean code.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Verification & Ship</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Execute comprehensive Vitest suites and build production presentations.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
</ArcArrowProcess>
```

### Standalone Chevron Arrow

```vue
<div class="flex items-center justify-center py-12">
  <ArcArrowProcessArrow
    :width="380"
    :height="215"
    color="#6fa3b5"
    gradient-end="#8cb8c8"
  />
</div>
```

---

## Props Reference

### `ArcArrowProcess`

- **Rendered Class:** `.alpha-arc-arrow-process` (modifier: `.alpha-arc-arrow-process--animated`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Root arc process container coordinating responsive height and central rotating chevron arrows.

| Prop         | Type               | Default     | Required | Description                                                                           |
| :----------- | :----------------- | :---------- | :------: | :------------------------------------------------------------------------------------ |
| `count`      | `number`           | `undefined` |    No    | Number of chevron arrow stages (`2`, `3`, or `4`). Inferred from callouts if omitted. |
| `animation`  | `boolean`          | `true`      |    No    | Enables entrance sequence animation.                                                  |
| `height`     | `number \| string` | `370`       |    No    | Diagram height in pixels (minimum `340px`).                                           |
| `startDelay` | `number`           | `undefined` |    No    | Animation delay in milliseconds.                                                      |

---

## Child Components Summary

- `ArcArrowProcessCallout`: Individual stage text block.
- `ArcArrowProcessHeading`: Stage title text.
- `ArcArrowProcessContent`: Stage description body.
- `ArcArrowProcessIcon`: Stage icon container.
- `ArcArrowProcessArrow`: Standalone or nested chevron arrow SVG component.

### `ArcArrowProcessCallout`

- **Rendered Class:** `.alpha-arc-arrow-process-callout` (modifiers: `.alpha-arc-arrow-process-callout--animated`, `.alpha-arc-arrow-process-callout--{0..3}`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Individual process stage callout block positioning heading, description text, and outline icon.

| Prop           | Type               | Default     | Required | Description                              |
| :------------- | :----------------- | :---------- | :------: | :--------------------------------------- |
| `index`        | `number`           | `undefined` |    No    | Stage index (0 to 3).                    |
| `color`        | `string`           | `undefined` |    No    | Accent color override.                   |
| `textColor`    | `string`           | `undefined` |    No    | Body text color override.                |
| `headingColor` | `string`           | `undefined` |    No    | Heading title color override.            |
| `title`        | `string`           | `undefined` |    No    | Stage title text.                        |
| `description`  | `string`           | `undefined` |    No    | Stage description text.                  |
| `icon`         | `string \| object` | `undefined` |    No    | Stage icon component or icon class name. |

### `ArcArrowProcessHeading`

- **Rendered Class:** `.alpha-arc-arrow-process-heading`
- **Rendered HTML Tag:** `<div>`
- **Role:** Stage title heading text.

| Prop    | Type     | Default     | Required | Description                        |
| :------ | :------- | :---------- | :------: | :--------------------------------- |
| `color` | `string` | `undefined` |    No    | Heading title text color override. |

### `ArcArrowProcessContent`

- **Rendered Class:** `.alpha-arc-arrow-process-content`
- **Rendered HTML Tag:** `<div>`
- **Role:** Stage body description text paragraph.

| Prop    | Type     | Default     | Required | Description                           |
| :------ | :------- | :---------- | :------: | :------------------------------------ |
| `color` | `string` | `undefined` |    No    | Body description text color override. |

### `ArcArrowProcessIcon`

- **Rendered Class:** `.alpha-arc-arrow-process-icon`
- **Rendered HTML Tag:** `<div>`
- **Role:** Stage icon container rendered adjacent to the text column.

| Prop    | Type               | Default     | Required | Description                           |
| :------ | :----------------- | :---------- | :------: | :------------------------------------ |
| `icon`  | `string \| object` | `undefined` |    No    | Icon class string or Vue component.   |
| `color` | `string`           | `undefined` |    No    | Foreground icon color override.       |
| `size`  | `number \| string` | `32`        |    No    | Icon size in pixels or CSS dimension. |

### `ArcArrowProcessArrow`

- **Rendered Class:** `.alpha-arc-arrow-process-arrow`
- **Rendered HTML Tag:** `<div>` wrapping `<svg>`
- **Role:** Curved rotating chevron arrow SVG element.

| Prop          | Type               | Default     | Required | Description                                                |
| :------------ | :----------------- | :---------- | :------: | :--------------------------------------------------------- |
| `color`       | `string`           | `'#6fa3b5'` |    No    | Base fill color.                                           |
| `gradientEnd` | `string`           | `'#8cb8c8'` |    No    | End color for the linear gradient.                         |
| `stroke`      | `string`           | `'#ffffff'` |    No    | Outline stroke color.                                      |
| `strokeWidth` | `number`           | `2.5`       |    No    | Outline stroke width.                                      |
| `width`       | `number \| string` | `undefined` |    No    | Width of the arrow wrapper.                                |
| `height`      | `number \| string` | `undefined` |    No    | Height of the arrow wrapper.                               |
| `rotation`    | `number`           | `0`         |    No    | Rotation angle.                                            |
| `standalone`  | `boolean`          | `undefined` |    No    | Forces standalone viewBox and layout if true.              |
| `path`        | `string`           | `undefined` |    No    | SVG path for the chevron.                                  |
| `viewBox`     | `string`           | `undefined` |    No    | Custom viewBox string.                                     |
| `originY`     | `number`           | `-220`      |    No    | Pivot point Y-coordinate for rotation when not standalone. |

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the process chevron colors globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                                 | Default                                    | Description                      |
| :--------------------------------------- | :----------------------------------------- | :------------------------------- |
| `--alpha-arc-arrow-process-item-1-color` | `#a0a5aa`                                  | Stage 1 chevron base fill color. |
| `--alpha-arc-arrow-process-item-2-color` | `#2c485d`                                  | Stage 2 chevron base fill color. |
| `--alpha-arc-arrow-process-item-3-color` | `#6fa3b5`                                  | Stage 3 chevron base fill color. |
| `--alpha-arc-arrow-process-item-4-color` | `#d6284d`                                  | Stage 4 chevron base fill color. |
| `--alpha-arc-arrow-process-heading`      | `var(--alpha-foreground-primary, #1e293b)` | Stage heading text color.        |
| `--alpha-arc-arrow-process-content`      | `var(--alpha-foreground-primary, #475569)` | Stage body description color.    |

```vue
<!-- Example: Customizing colors via CSS variables -->
<ArcArrowProcess
  :style="{
    '--alpha-arc-arrow-process-item-1-color': '#0ea5e9',
    '--alpha-arc-arrow-process-item-2-color': '#10b981',
    '--alpha-arc-arrow-process-item-3-color': '#f59e0b'
  }"
>
  <!-- process stages -->
</ArcArrowProcess>
```

### 2. UnoCSS Utility Styling

`ArcArrowProcess` passes forwarded attributes via `useMergedUnoAttrs`. You can pass UnoCSS utility classes to adjust margins or responsive scale:

```vue
<ArcArrowProcess class="my-2 max-w-5xl mx-auto">
  <!-- process callouts -->
</ArcArrowProcess>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <ArcArrowProcess> (Root process container) -->
<div class="alpha-arc-arrow-process [alpha-arc-arrow-process--animated]">
  <div class="alpha-arc-arrow-process__stage">

    <!-- Central Process Graphic: Layered Rotating Chevrons -->
    <div class="alpha-arc-arrow-process__center">
      <!-- <ArcArrowProcessArrow> (One per stage, rotating along the arc) -->
      <div class="alpha-arc-arrow-process-arrow alpha-arc-arrow-process__arrow alpha-arc-arrow-process__arrow--0 [alpha-arc-arrow-process--animated]">
        <svg viewBox="0 0 1000 700">
          <path ... /> <!-- Curved chevron arrow with gradient fill -->
        </svg>
      </div>
    </div>

    <!-- Process Stage Callout Block (<ArcArrowProcessCallout>) -->
    <div class="alpha-arc-arrow-process-callout alpha-arc-arrow-process-callout--0 [alpha-arc-arrow-process-callout--animated]">
      <!-- Text Column -->
      <div class="flex-1 flex flex-col items-start min-w-0">
        <!-- <ArcArrowProcessHeading> -->
        <div class="alpha-arc-arrow-process-heading">Stage 1: Ingest</div>
        <!-- <ArcArrowProcessContent> -->
        <div class="alpha-arc-arrow-process-content">Stream incoming telemetry into buffers.</div>
      </div>

      <!-- Icon Column (<ArcArrowProcessIcon>) -->
      <div class="alpha-arc-arrow-process-icon">
        <span class="i-lucide-activity" />
      </div>
    </div>

  </div>
</div>
```

#### Class Reference Table

| Component                  | Target Element   | Rendered Class                               | Purpose & Description                                |
| :------------------------- | :--------------- | :------------------------------------------- | :--------------------------------------------------- |
| `<ArcArrowProcess>`        | Root container   | `.alpha-arc-arrow-process`                   | Main outer arc process container.                    |
| `<ArcArrowProcess>`        | Root modifier    | `.alpha-arc-arrow-process--animated`         | Entrance sequence animation modifier.                |
| `<ArcArrowProcess>`        | Stage container  | `.alpha-arc-arrow-process__stage`            | Relative stage positioning arrows and callouts.      |
| `<ArcArrowProcess>`        | Center overlay   | `.alpha-arc-arrow-process__center`           | Layer holding rotating chevron arrows.               |
| `<ArcArrowProcess>`        | Arrow positioner | `.alpha-arc-arrow-process__arrow`            | Absolute positioner for individual rotating chevron. |
| `<ArcArrowProcessCallout>` | Callout card     | `.alpha-arc-arrow-process-callout`           | Stage title, text, and icon container.               |
| `<ArcArrowProcessCallout>` | Callout modifier | `.alpha-arc-arrow-process-callout--animated` | Entrance slide motion modifier.                      |
| `<ArcArrowProcessArrow>`   | SVG arrow        | `.alpha-arc-arrow-process-arrow`             | Rendered curved chevron SVG element.                 |
| `<ArcArrowProcessHeading>` | Heading          | `.alpha-arc-arrow-process-heading`           | Stage heading title text.                            |
| `<ArcArrowProcessContent>` | Content block    | `.alpha-arc-arrow-process-content`           | Stage description text paragraph.                    |
| `<ArcArrowProcessIcon>`    | Icon container   | `.alpha-arc-arrow-process-icon`              | Stage icon container.                                |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all arc arrow process diagrams across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all ArcArrowProcess diagrams across slides */

/* 1. Customize stage heading typography */
.alpha-arc-arrow-process-heading {
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
}

/* 2. Adjust stage description line height */
.alpha-arc-arrow-process-content {
  line-height: 1.5;
}

/* 3. Enhance drop shadow on rotating arrows */
.alpha-arc-arrow-process-arrow {
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.16));
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for process stages on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<ArcArrowProcess>
  <!-- stages -->
</ArcArrowProcess>

<style>
/* Scoped to this slide only */
:deep(.alpha-arc-arrow-process-callout) {
  border-left: 3px solid #0ea5e9;
  padding-left: 8px;
}

:deep(.alpha-arc-arrow-process-heading) {
  color: #0ea5e9;
}
</style>
```

### 4. Stage Count & Per-Arrow Styling

- Pass `count="2"`, `count="3"`, or `count="4"` to explicitly set the process stages.
- Customize individual chevron arrows by using `<ArcArrowProcessArrow>` with custom `color`, `gradientEnd`, or `stroke` properties.
