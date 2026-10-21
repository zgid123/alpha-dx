# Chevron Card

A horizontal process card for presenting research steps and decisions. Use the root `title` prop or `#title` slot for the heading. `ChevronCardContent` contains the card body.

## Presentation Preview

<ChevronCardDemo theme="academic" />

---

## Usage

```vue
<ChevronCard step="01" title="Literature Review" color="#f59e0b">
  <ChevronCardContent>Analyze existing work and identify open research questions.</ChevronCardContent>
</ChevronCard>

<ChevronCard step="02" color="#10b981">
  <template #title><em>Experiment</em></template>
  <ChevronCardContent>Define controlled methods and gather evidence.</ChevronCardContent>
</ChevronCard>
```

## Props

### `ChevronCard`

- **Rendered Class:** `.alpha-chevron-card` (modifier: `.alpha-chevron-card--animated`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Main card container wrapping the badge and content body.

| Prop           | Type               | Default                              | Required | Description                                       |
| :------------- | :----------------- | :----------------------------------- | :------: | :------------------------------------------------ |
| `step`         | `string \| number` | `'01'`                               |    No    | Step label in the chevron badge.                  |
| `title`        | `string \| VNode`  | `undefined`                          |    No    | Heading text or a Vue VNode.                      |
| `color`        | `string`           | `'var(--alpha-chevron-card-accent)'` |    No    | Badge accent color override.                      |
| `cardBg`       | `string`           | `'var(--alpha-chevron-card-bg)'`     |    No    | Background color of the card body container.      |
| `titleColor`   | `string`           | `undefined`                          |    No    | Heading text color override.                      |
| `textColor`    | `string`           | `undefined`                          |    No    | Body text color override.                         |
| `icon`         | `string \| object` | `undefined`                          |    No    | Optional icon rendered inside the badge.          |
| `width`        | `number \| string` | `undefined`                          |    No    | Optional explicit card width.                     |
| `height`       | `number \| string` | `undefined`                          |    No    | Minimum card height (defaults to `112px`).        |
| `notchDepth`   | `number`           | `26`                                 |    No    | Indentation depth of the chevron notch in pixels. |
| `chevronWidth` | `number`           | `130`                                |    No    | Width of the chevron badge in pixels.             |
| `borderRadius` | `number`           | `18`                                 |    No    | Corner radius for the card body container.        |
| `animation`    | `boolean`          | `true`                               |    No    | Toggles the entrance slide-in animation.          |

### `ChevronCardBadge`

- **Rendered Class:** `.alpha-chevron-card-badge`
- **Rendered HTML Tag:** `<div>`
- **Role:** Pointed chevron polygon badge displaying the step number or icon.

| Prop         | Type               | Default     | Required | Description                                                           |
| :----------- | :----------------- | :---------- | :------: | :-------------------------------------------------------------------- |
| `step`       | `string \| number` | `undefined` |    No    | Step label or counter (inherits from parent card context if omitted). |
| `icon`       | `string \| object` | `undefined` |    No    | Icon class string or icon component.                                  |
| `color`      | `string`           | `undefined` |    No    | Badge fill color override.                                            |
| `width`      | `number`           | `130`       |    No    | Badge width in pixels.                                                |
| `height`     | `number \| string` | `undefined` |    No    | Badge height override (defaults to `100%`).                           |
| `notchDepth` | `number`           | `26`        |    No    | Indentation depth of the chevron notch in pixels.                     |

### `ChevronCardContent`

- **Rendered Class:** `.alpha-chevron-card-content`
- **Rendered HTML Tag:** `<p>`
- **Role:** Main text container for the card description.

| Prop    | Type     | Default     | Required | Description                                                          |
| :------ | :------- | :---------- | :------: | :------------------------------------------------------------------- |
| `color` | `string` | `undefined` |    No    | Content text color override (inherits from parent card `textColor`). |

---

## Slots

| Slot      | Description                                                                                |
| :-------- | :----------------------------------------------------------------------------------------- |
| `default` | Composed card body content or child components (`ChevronCardBadge`, `ChevronCardContent`). |
| `title`   | Custom rich heading content (formatted text, icons, badges).                               |
| `badge`   | Replaces the default chevron badge with custom elements.                                   |
| `content` | Dedicated slot for the body text or arbitrary Vue components.                              |

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the card's theme globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                                | Default                                    | Description                                    |
| :-------------------------------------- | :----------------------------------------- | :--------------------------------------------- |
| `--alpha-chevron-card-accent`           | `#f59e0b`                                  | Accent color for the chevron badge background. |
| `--alpha-chevron-card-badge-bg`         | `var(--alpha-chevron-card-accent)`         | Background color of the chevron badge.         |
| `--alpha-chevron-card-badge-foreground` | `#ffffff`                                  | Foreground/icon color of the badge.            |
| `--alpha-chevron-card-bg`               | `#f5f5f7`                                  | Card body container background color.          |
| `--alpha-chevron-card-title`            | `var(--alpha-foreground-primary, #4b5563)` | Heading title color.                           |
| `--alpha-chevron-card-content`          | `var(--alpha-foreground-primary, #6b7280)` | Body content text color.                       |

```vue
<!-- Example: Customizing colors via CSS variables -->
<ChevronCard
  step="01"
  title="Themed Card"
  :style="{
    '--alpha-chevron-card-accent': '#6366f1',
    '--alpha-chevron-card-bg': '#e0e7ff',
    '--alpha-chevron-card-title': '#1e1b4b',
    '--alpha-chevron-card-content': '#312e81'
  }"
>
  <ChevronCardContent>Locally themed card container.</ChevronCardContent>
</ChevronCard>
```

### 2. UnoCSS Utility Styling

`ChevronCard` integrates `useMergedUnoAttrs`, allowing you to pass UnoCSS atomic utility classes directly to customize margins, hover effects, shadows, or borders without conflicting with the component's internal geometry:

```vue
<ChevronCard
  step="02"
  title="Interactive Card"
  class="shadow-md hover:shadow-xl hover:translate-x-1 transition-all duration-300"
>
  <ChevronCardContent>Hover to observe dynamic utility transformations.</ChevronCardContent>
</ChevronCard>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements, apply complex hover interactions, or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <ChevronCard> (Root container) -->
<div class="alpha-chevron-card [alpha-chevron-card--animated]">

  <!-- Chevron Badge (rendered by <ChevronCardBadge> or default badge) -->
  <div class="shrink-0 flex">
    <div class="alpha-chevron-card-badge">
      <!-- Step number or icon -->
    </div>
  </div>

  <!-- Content Body -->
  <div class="flex-1 flex flex-col ...">
    <!-- Card Title (rendered by <ChevronCard title="..."> or #title slot) -->
    <h4 class="alpha-chevron-card-title">...</h4>

    <!-- Card Description (rendered by <ChevronCardContent>) -->
    <p class="alpha-chevron-card-content">...</p>
  </div>

</div>
```

#### Class Reference Table

| Component              | Target Element       | Rendered Class                  | Purpose & Description                                              |
| :--------------------- | :------------------- | :------------------------------ | :----------------------------------------------------------------- |
| `<ChevronCard>`        | Root card wrapper    | `.alpha-chevron-card`           | Main flex container wrapping the badge and body content.           |
| `<ChevronCard>`        | Animation modifier   | `.alpha-chevron-card--animated` | Applied when `animation` prop is `true` for entrance slide motion. |
| `<ChevronCard>`        | Title heading        | `.alpha-chevron-card-title`     | `<h4>` heading element rendered for the card title.                |
| `<ChevronCardBadge>`   | Step badge container | `.alpha-chevron-card-badge`     | Clipped polygon container housing the step number text or icon.    |
| `<ChevronCardContent>` | Body text paragraph  | `.alpha-chevron-card-content`   | `<p>` element wrapping the card description text.                  |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all chevron cards across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all ChevronCards across slides */

/* 1. Customize the root card container */
.alpha-chevron-card {
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.alpha-chevron-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.18);
}

/* 2. Customize the chevron badge */
.alpha-chevron-card-badge {
  font-weight: 800;
  letter-spacing: 0.05em;
  filter: drop-shadow(2px 0 6px rgba(0, 0, 0, 0.15));
}

/* 3. Customize the title typography */
.alpha-chevron-card-title {
  font-family: 'Fira Code', monospace;
  font-size: 1.15rem;
  letter-spacing: 0.04em;
}

/* 4. Customize the content text */
.alpha-chevron-card-content {
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

<ChevronCard step="01" title="Scoped Card Override">
  <ChevronCardContent>
    This card's styling is customized for this slide only using :deep().
  </ChevronCardContent>
</ChevronCard>

<style>
/* Scoped to this slide only */
:deep(.alpha-chevron-card) {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.alpha-chevron-card-badge) {
  background: linear-gradient(135deg, #6366f1, #a855f7) !important;
}

:deep(.alpha-chevron-card-title) {
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style>
```

### 4. Geometry & Proportion Customization

Fine-tune the chevron's visual weight and proportions to suit slide density:

- **`notchDepth`** (default `26`): Controls the depth of the chevron's inner arrow indent.
- **`chevronWidth`** (default `130`): Controls the overall width of the badge.
- **`borderRadius`** (default `18`): Controls the right-side border radius of the card container.
- **`animation`** (default `true`): Set to `false` to disable the entrance animation.

### 5. Granular Slots & Subcomponent Composition

For rich content that cannot be represented by simple string props:

- **`#title`**: Render custom formatted headings, inline badges, or icons.
- **`#badge`**: Completely replace the default chevron with custom SVG graphics or indicators.
- **`#content`**: Render multi-column text, code snippets, or inline math.
