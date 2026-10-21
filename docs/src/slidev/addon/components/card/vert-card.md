# Vertical Card

A vertical card with an optional step badge, icon, divider, and accent details. Use `title` or `#title` for the heading, and compose body copy with `VerticalCardContent`.

## Presentation Preview

<VerticalCardDemo />

---

## Usage

```vue
<VerticalCard step="01" title="Outside Badge" variant="outside">
  <VerticalCardContent>The step badge sits just outside the left edge of the card.</VerticalCardContent>
</VerticalCard>

<VerticalCard title="Clean Layout" variant="none" color="#2563eb" :dots="false">
  <VerticalCardContent>A spacious layout works with or without an icon.</VerticalCardContent>
</VerticalCard>
```

## Props

### `VerticalCard`

- **Rendered Class:** `.alpha-vertical-card`
- **Rendered HTML Tag:** `<div>`
- **Role:** Main vertical card flex wrapper coordinating decorative corner blobs, ribbon badge, icon, and content.

| Prop            | Type                                          | Default                               | Required | Description                                            |
| :-------------- | :-------------------------------------------- | :------------------------------------ | :------: | :----------------------------------------------------- |
| `step`          | `string \| number`                            | `'01'`                                |    No    | Badge label in the step ribbon.                        |
| `title`         | `string \| VNode`                             | `undefined`                           |    No    | Heading text or a Vue VNode.                           |
| `color`         | `string`                                      | `'var(--alpha-vertical-card-accent)'` |    No    | Accent theme color for ribbon and decorative accents.  |
| `cardBg`        | `string`                                      | `'var(--alpha-vertical-card-bg)'`     |    No    | Background color for the card container.               |
| `variant`       | `'outside' \| 'inside' \| 'none' \| 'hidden'` | `'outside'`                           |    No    | Badge placement mode or complete visibility toggle.    |
| `textColor`     | `string`                                      | `undefined`                           |    No    | Body text color override.                              |
| `hasDivider`    | `boolean`                                     | `true`                                |    No    | Toggles the subtle separator line below the title.     |
| `dots`          | `boolean`                                     | `true`                                |    No    | Toggles the decorative background dot pattern.         |
| `icon`          | `string \| object`                            | `undefined`                           |    No    | Optional icon rendered inside the badge/header.        |
| `hasIconCircle` | `boolean`                                     | `undefined`                           |    No    | Overrides automatic icon circle background visibility. |

### `VerticalCardBadge`

- **Rendered Class:** `.alpha-vertical-card-badge`
- **Rendered HTML Tag:** `<div>`
- **Role:** Pointed ribbon badge anchored to the card edge displaying the step number.

| Prop    | Type               | Default     | Required | Description                                                             |
| :------ | :----------------- | :---------- | :------: | :---------------------------------------------------------------------- |
| `step`  | `string \| number` | `undefined` |    No    | Badge text or step number (inherits from parent card `step` or `'01'`). |
| `color` | `string`           | `undefined` |    No    | Badge fill color override.                                              |

### `VerticalCardIcon`

- **Rendered Class:** `.alpha-vertical-card-icon`
- **Rendered HTML Tag:** `<div>`
- **Role:** Circular icon accent badge centered above the title.

| Prop    | Type               | Default     | Required | Description                                 |
| :------ | :----------------- | :---------- | :------: | :------------------------------------------ |
| `icon`  | `string \| object` | `undefined` |    No    | Optional icon class string or component.    |
| `color` | `string`           | `undefined` |    No    | Foreground icon color override.             |
| `size`  | `number \| string` | `108`       |    No    | Circle diameter in pixels or CSS dimension. |

### `VerticalCardContent`

- **Rendered Class:** `.alpha-vertical-card-content`
- **Rendered HTML Tag:** `<p>`
- **Role:** Body description text container.

| Prop    | Type     | Default     | Required | Description                                                          |
| :------ | :------- | :---------- | :------: | :------------------------------------------------------------------- |
| `color` | `string` | `undefined` |    No    | Content text color override (inherits from parent card `textColor`). |

---

## Slots

| Slot      | Description                                                                                              |
| :-------- | :------------------------------------------------------------------------------------------------------- |
| `default` | Composed card body or child components (`VerticalCardBadge`, `VerticalCardContent`, `VerticalCardIcon`). |
| `title`   | Custom rich heading content (formatted text, icons, badges).                                             |
| `badge`   | Replaces the default step ribbon badge with custom elements.                                             |
| `icon`    | Custom icon slot placed in the top-right corner.                                                         |

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the card's theme globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                             | Default                                    | Description                                             |
| :----------------------------------- | :----------------------------------------- | :------------------------------------------------------ |
| `--alpha-vertical-card-accent`       | `#ea583a`                                  | Primary accent color for ribbon and badges.             |
| `--alpha-vertical-card-badge`        | `#ffffff`                                  | Foreground text/icon color in ribbon badge.             |
| `--alpha-vertical-card-badge-bg`     | `var(--alpha-vertical-card-accent)`        | Background color of the ribbon badge.                   |
| `--alpha-vertical-card-bg`           | `#ffffff`                                  | Background color of the card container.                 |
| `--alpha-vertical-card-title`        | `var(--alpha-vertical-card-accent)`        | Heading text color. Defaults to component accent color. |
| `--alpha-vertical-card-content`      | `var(--alpha-foreground-primary, #475569)` | Body content text color.                                |
| `--alpha-vertical-card-icon`         | `var(--alpha-vertical-card-accent)`        | Accent color for icon elements.                         |
| `--alpha-vertical-card-icon-bg`      | `color-mix(...)`                           | 18% tinted background for the icon circle.              |
| `--alpha-vertical-card-stripe-light` | `color-mix(...)`                           | 45% tinted accent for decorative corner stripes.        |

```vue
<!-- Example: Customizing colors via CSS variables -->
<VerticalCard
  step="01"
  title="Themed Metric"
  :style="{
    '--alpha-vertical-card-accent': '#10b981',
    '--alpha-vertical-card-bg': '#f0fdf4',
    '--alpha-vertical-card-content': '#047857'
  }"
>
  <VerticalCardContent>Metrics with specialized accent tokens.</VerticalCardContent>
</VerticalCard>
```

### 2. UnoCSS Utility Styling & Sizing

`VerticalCard` defaults to `w-full h-full` and integrates `useMergedUnoAttrs`. You can pass UnoCSS atomic utility classes directly to customize width, height, margins, elevation, or borders without conflicting with the component's internal geometry:

```vue
<!-- Sizing directly via utility classes -->
<VerticalCard
  step="02"
  title="Interactive Metric"
  class="w-72 h-[380px] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
>
  <VerticalCardContent>Enforce dimensions and hover elevation directly with utility classes.</VerticalCardContent>
</VerticalCard>
```

Alternatively, place `VerticalCard` inside a sized parent wrapper (e.g. `<div class="w-68 h-96">`) to let it scale fluidly.

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements, apply complex hover interactions, or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <VerticalCard> (Root container) -->
<div class="alpha-vertical-card">

  <!-- Clipped decorative accent layers -->
  <div class="absolute inset-0 ...">
    <svg>
      <path class="alpha-vertical-card__blob" ... />
    </svg>
  </div>

  <!-- Ribbon Step Badge (rendered by <VerticalCardBadge> or default badge) -->
  <div class="absolute -left-5 ...">
    <div class="alpha-vertical-card-badge">
      <!-- Step number or text -->
    </div>
  </div>

  <!-- Card Content Layer -->
  <div class="relative ...">
    <!-- Optional Icon Circle (rendered by <VerticalCardIcon>) -->
    <div class="alpha-vertical-card-icon">
      <!-- Icon element -->
    </div>

    <!-- Title and Content Description -->
    <div class="flex flex-col ...">
      <!-- Title heading (rendered by `title` prop or #title slot) -->
      <h3 class="alpha-vertical-card-title">...</h3>

      <!-- Body paragraph (rendered by <VerticalCardContent>) -->
      <p class="alpha-vertical-card-content">...</p>
    </div>
  </div>

</div>
```

#### Class Reference Table

| Component               | Target Element         | Rendered Class                 | Purpose & Description                                            |
| :---------------------- | :--------------------- | :----------------------------- | :--------------------------------------------------------------- |
| `<VerticalCard>`        | Root card wrapper      | `.alpha-vertical-card`         | Main vertical card flex wrapper coordinating shapes and content. |
| `<VerticalCard>`        | Corner decorative blob | `.alpha-vertical-card__blob`   | SVG path rendering decorative organic wave shape in the corner.  |
| `<VerticalCard>`        | Title heading          | `.alpha-vertical-card-title`   | `<h3>` heading element rendered for the card title.              |
| `<VerticalCardBadge>`   | Step ribbon container  | `.alpha-vertical-card-badge`   | Pointed ribbon badge displaying the step number or label.        |
| `<VerticalCardIcon>`    | Icon circle container  | `.alpha-vertical-card-icon`    | Circular container housing the decorative icon.                  |
| `<VerticalCardContent>` | Body text paragraph    | `.alpha-vertical-card-content` | `<p>` element wrapping the card description text.                |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all vertical cards across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all VerticalCards across slides */

/* 1. Customize the root card container */
.alpha-vertical-card {
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.alpha-vertical-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
}

/* 2. Customize the ribbon badge */
.alpha-vertical-card-badge {
  font-weight: 800;
  letter-spacing: 0.05em;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.15));
}

/* 3. Customize the icon circle */
.alpha-vertical-card-icon {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 4. Customize the title typography */
.alpha-vertical-card-title {
  font-family: 'Fira Code', monospace;
  font-size: 1.2rem;
  letter-spacing: 0.03em;
}

/* 5. Customize the content text */
.alpha-vertical-card-content {
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

<VerticalCard step="01" title="Scoped Vertical Card">
  <template #icon><div class="i-carbon-analytics text-2xl" /></template>
  <VerticalCardContent>
    This card's styling is customized for this slide only using :deep().
  </VerticalCardContent>
</VerticalCard>

<style>
/* Scoped to this slide only */
:deep(.alpha-vertical-card-badge) {
  background: #10b981 !important;
  color: #ffffff !important;
}

:deep(.alpha-vertical-card-title) {
  text-decoration: underline;
  text-underline-offset: 4px;
}

:deep(.alpha-vertical-card-icon) {
  border: 2px solid #10b981;
}
</style>
```

### 4. Badge & Divider Modes

- **`variant="none"`** or **`variant="hidden"`**: Omits the ribbon badge entirely for content-only cards.
- **`variant="outside"`** (default): Extends the ribbon badge beyond the card boundary.
- **`hasDivider`** (default `true`): Set `:hasDivider="false"` for seamless text flow between heading and body.
- **`dots`** (default `true`): Set `:dots="false"` to remove background micro-patterns.

### 5. Granular Slots & Subcomponent Composition

- **`#title`**: Render custom formatted headings, inline badges, or icons.
- **`#badge`**: Replace the ribbon badge with custom tags or status pills.
- **`#icon`**: Provide an icon (e.g., UnoCSS `<div class="i-carbon-analytics text-3xl" />`).
- Body content should be wrapped in `<VerticalCardContent>` to benefit from automated typography and theme color inheritance.
