# Horizontal Card

A horizontal step card for research plans and academic presentation workflows. Its children are `HorizontalCardBadge`, `HorizontalCardContent`, and `HorizontalCardIcon`. The card heading uses the root `title` prop or `#title` slot.

## Presentation Preview

<HorizontalCardDemo theme="academic" />

---

## Usage

```vue
<HorizontalCard step="01" title="Discovery" color="#ea583a">
  <HorizontalCardContent>Review literature, form hypotheses, and specify experiment bounds.</HorizontalCardContent>
</HorizontalCard>

<HorizontalCard step="02" color="#2563eb">
  <template #title><strong>Clean Architecture</strong></template>
  <template #icon><div class="i-carbon-search text-4xl" /></template>
  <HorizontalCardContent>Separate research methods from evidence and findings.</HorizontalCardContent>
</HorizontalCard>
```

## Props

### `HorizontalCard`

- **Rendered Class:** `.alpha-horizontal-card`
- **Rendered HTML Tag:** `<div>`
- **Role:** Main card wrapper coordinating SVG accent vectors, badge, icon, and content.

| Prop            | Type                              | Default                                 | Required | Description                                            |
| :-------------- | :-------------------------------- | :-------------------------------------- | :------: | :----------------------------------------------------- |
| `step`          | `string \| number`                | `'01'`                                  |    No    | Step label shown in the badge.                         |
| `title`         | `string \| VNode`                 | `undefined`                             |    No    | Heading text or a Vue VNode.                           |
| `color`         | `string`                          | `'var(--alpha-horizontal-card-accent)'` |    No    | Accent color for the badge and decorative shapes.      |
| `cardBg`        | `string`                          | `'var(--alpha-horizontal-card-bg)'`     |    No    | Background color for the card container.               |
| `variant`       | `'outside' \| 'none' \| 'hidden'` | `'outside'`                             |    No    | Badge placement mode or complete visibility toggle.    |
| `textColor`     | `string`                          | `undefined`                             |    No    | Body text color override.                              |
| `icon`          | `string \| object`                | `undefined`                             |    No    | Optional icon rendered inside the badge/header.        |
| `hasIconCircle` | `boolean`                         | `undefined`                             |    No    | Overrides automatic icon circle background visibility. |
| `dots`          | `boolean`                         | `true`                                  |    No    | Toggles the decorative background dot pattern.         |

### `HorizontalCardBadge`

- **Rendered Class:** `.alpha-horizontal-card-badge`
- **Rendered HTML Tag:** `<div>`
- **Role:** Ribbon badge hanging over the top-left border displaying the step label.

| Prop    | Type               | Default     | Required | Description                                              |
| :------ | :----------------- | :---------- | :------: | :------------------------------------------------------- |
| `step`  | `string \| number` | `undefined` |    No    | Step label (inherits from parent card `step` or `'01'`). |
| `color` | `string`           | `undefined` |    No    | Badge fill color override.                               |

### `HorizontalCardIcon`

- **Rendered Class:** `.alpha-horizontal-card-icon`
- **Rendered HTML Tag:** `<div>`
- **Role:** Circular icon accent badge placed alongside the content body.

| Prop    | Type               | Default     | Required | Description                                 |
| :------ | :----------------- | :---------- | :------: | :------------------------------------------ |
| `icon`  | `string \| object` | `undefined` |    No    | Icon class string or Vue component.         |
| `color` | `string`           | `undefined` |    No    | Foreground icon color override.             |
| `size`  | `number \| string` | `52`        |    No    | Circle diameter in pixels or CSS dimension. |

### `HorizontalCardContent`

- **Rendered Class:** `.alpha-horizontal-card-content`
- **Rendered HTML Tag:** `<p>`
- **Role:** Body description text container.

| Prop    | Type     | Default     | Required | Description                                                          |
| :------ | :------- | :---------- | :------: | :------------------------------------------------------------------- |
| `color` | `string` | `undefined` |    No    | Content text color override (inherits from parent card `textColor`). |

---

## Slots

| Slot      | Description                                                                                                    |
| :-------- | :------------------------------------------------------------------------------------------------------------- |
| `default` | Composed card body or child components (`HorizontalCardBadge`, `HorizontalCardContent`, `HorizontalCardIcon`). |
| `title`   | Custom rich heading content (formatted text, icons, badges).                                                   |
| `badge`   | Replaces the default step badge with custom elements.                                                          |
| `icon`    | Custom icon slot placed in the top-right corner.                                                               |

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the card's theme globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                           | Default                                    | Description                                             |
| :--------------------------------- | :----------------------------------------- | :------------------------------------------------------ |
| `--alpha-horizontal-card-accent`   | `#ea583a`                                  | Primary accent color for badge and highlights.          |
| `--alpha-horizontal-card-badge`    | `#ffffff`                                  | Foreground text/icon color in badge.                    |
| `--alpha-horizontal-card-badge-bg` | `var(--alpha-horizontal-card-accent)`      | Background color of the step badge.                     |
| `--alpha-horizontal-card-bg`       | `#ffffff`                                  | Background color of the card container.                 |
| `--alpha-horizontal-card-title`    | `var(--alpha-horizontal-card-accent)`      | Heading text color. Defaults to component accent color. |
| `--alpha-horizontal-card-content`  | `var(--alpha-foreground-primary, #475569)` | Body content text color.                                |
| `--alpha-horizontal-card-icon`     | `var(--alpha-horizontal-card-accent)`      | Accent color for icon elements.                         |
| `--alpha-horizontal-card-icon-bg`  | `color-mix(...)`                           | 16% tinted background for the icon circle.              |

```vue
<!-- Example: Customizing colors via CSS variables -->
<HorizontalCard
  step="01"
  title="Themed Step"
  :style="{
    '--alpha-horizontal-card-accent': '#0284c7',
    '--alpha-horizontal-card-bg': '#f0f9ff',
    '--alpha-horizontal-card-title': '#0369a1',
    '--alpha-horizontal-card-content': '#0c4a6e'
  }"
>
  <HorizontalCardContent>Content with customized theme tokens.</HorizontalCardContent>
</HorizontalCard>
```

### 2. UnoCSS Utility Styling

`HorizontalCard` integrates `useMergedUnoAttrs`, allowing you to pass UnoCSS atomic utility classes directly to customize margins, hover effects, shadows, or borders without conflicting with the component's internal geometry:

```vue
<HorizontalCard
  step="02"
  title="Interactive Card"
  class="shadow-md hover:shadow-xl hover:translate-x-1 transition-all duration-300"
>
  <HorizontalCardContent>Hover to observe dynamic utility transformations.</HorizontalCardContent>
</HorizontalCard>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements, apply complex hover interactions, or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <HorizontalCard> (Root container) -->
<div class="alpha-horizontal-card">

  <!-- SVG background shape and accent paths -->
  <svg>
    <path class="alpha-horizontal-card__accent" ... />
    <path class="alpha-horizontal-card__body" ... />
  </svg>

  <!-- Step Badge (rendered by <HorizontalCardBadge> or default badge) -->
  <div class="absolute left-5 -top-5 ...">
    <div class="alpha-horizontal-card-badge">
      <!-- Step number or text -->
    </div>
  </div>

  <!-- Card Content Layer -->
  <div class="relative ...">
    <!-- Optional Icon Circle (rendered by <HorizontalCardIcon>) -->
    <div class="alpha-horizontal-card-icon">
      <!-- Icon element -->
    </div>

    <!-- Text Content -->
    <div class="flex-1 ...">
      <!-- Title heading (rendered by `title` prop or #title slot) -->
      <h4 class="alpha-horizontal-card-title">...</h4>

      <!-- Body paragraph (rendered by <HorizontalCardContent>) -->
      <p class="alpha-horizontal-card-content">...</p>
    </div>
  </div>

</div>
```

#### Class Reference Table

| Component                 | Target Element        | Rendered Class                   | Purpose & Description                                         |
| :------------------------ | :-------------------- | :------------------------------- | :------------------------------------------------------------ |
| `<HorizontalCard>`        | Root card wrapper     | `.alpha-horizontal-card`         | Main outer container coordinating vector shapes and content.  |
| `<HorizontalCard>`        | Background accent     | `.alpha-horizontal-card__accent` | SVG path rendering the solid accent shape behind the chamfer. |
| `<HorizontalCard>`        | Background body       | `.alpha-horizontal-card__body`   | SVG path rendering the main filleted chamfered card outline.  |
| `<HorizontalCard>`        | Title heading         | `.alpha-horizontal-card-title`   | `<h4>` heading element rendered for the card title.           |
| `<HorizontalCardBadge>`   | Step badge container  | `.alpha-horizontal-card-badge`   | Top ribbon badge displaying the step number or label.         |
| `<HorizontalCardIcon>`    | Icon circle container | `.alpha-horizontal-card-icon`    | Circular container housing the decorative icon.               |
| `<HorizontalCardContent>` | Body text paragraph   | `.alpha-horizontal-card-content` | `<p>` element wrapping the card description text.             |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all horizontal cards across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all HorizontalCards across slides */

/* 1. Customize the root card container */
.alpha-horizontal-card {
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.08));
  transition: transform 0.25s ease;
}

.alpha-horizontal-card:hover {
  transform: translateY(-3px);
}

/* 2. Customize the step badge ribbon */
.alpha-horizontal-card-badge {
  font-weight: 800;
  letter-spacing: 0.06em;
  border-radius: 6px;
}

/* 3. Customize the icon circle */
.alpha-horizontal-card-icon {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* 4. Customize the title typography */
.alpha-horizontal-card-title {
  font-family: 'Fira Code', monospace;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
}

/* 5. Customize the content text */
.alpha-horizontal-card-content {
  font-size: 0.95rem;
  line-height: 1.6;
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for cards on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<HorizontalCard step="01" title="Scoped Horizontal Card">
  <template #icon><div class="i-carbon-rocket text-2xl" /></template>
  <HorizontalCardContent>
    This card's styling is customized for this slide only using :deep().
  </HorizontalCardContent>
</HorizontalCard>

<style>
/* Scoped to this slide only */
:deep(.alpha-horizontal-card-badge) {
  background: #0284c7 !important;
  color: #ffffff !important;
}

:deep(.alpha-horizontal-card-title) {
  text-decoration: underline;
  text-underline-offset: 4px;
}

:deep(.alpha-horizontal-card-icon) {
  border: 2px solid #0284c7;
}
</style>
```

### 4. Decorative Details & Clean Layout

- **`dots`** (default `true`): Set `:dots="false"` for a clean, minimal card background without the SVG dot grid.
- **`hasIconCircle`**: Explicitly force the icon circle background on or off.

### 5. Granular Slots & Subcomponent Composition

- **`#title`**: Render custom formatted headings, inline badges, or icons.
- **`#badge`**: Replace the numbered step badge with a custom tag or status icon.
- **`#icon`**: Provide an icon (e.g., UnoCSS `<div class="i-carbon-chart-line text-3xl" />`).
- Body content should be wrapped in `<HorizontalCardContent>` to benefit from automated typography and theme color inheritance.
