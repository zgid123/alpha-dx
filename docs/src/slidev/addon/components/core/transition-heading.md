# TransitionHeading

Coordinates heading position transitions between a centered opening state and a standard top-corner slide title position, typically used with the `shifting-intro` layout.

## Purpose

Coordinates a two-state heading transition — from centered hero position to standard top-left title position — triggered by Slidev clicks.

**When to use**: Inside the `shifting-intro` layout, or any slide where the title should start centered and animate to the corner when body content is revealed.

## Presentation Preview

<TransitionHeadingDemo />

---

## Usage Examples

### Slidev Click Integration

```vue
---
clicks: 1
---

<TransitionHeading :center="$clicks === 0">
  <h1>A Shifting Title</h1>
</TransitionHeading>

<div
  class="mt-24 transition-opacity duration-500"
  :class="$clicks === 0 ? 'opacity-0' : 'opacity-100'"
>
  <p>Body content revealed on the first click.</p>
</div>
```

---

## Props Reference

### `TransitionHeading`

- **Rendered Class:** `.alpha-transition-heading`
- **Rendered HTML Tag:** `<div>`
- **Role:** Absolute moving wrapper animating title markup between centered hero and corner positions.

| Prop     | Type      | Default | Required | Description                                                                    |
| :------- | :-------- | :------ | :------: | :----------------------------------------------------------------------------- |
| `center` | `boolean` | `false` |    No    | When `true`, centers the heading in the middle of the slide.                   |
| `idle`   | `boolean` | `false` |    No    | When `true`, places the heading in the standard top-left slide title location. |

---

## Slots Reference

| Slot      | Description                             |
| :-------- | :-------------------------------------- |
| `default` | Heading markup (e.g. `<h1>Title</h1>`). |

---

## Customization Guidelines

### 1. Slide Click Synchronization

`TransitionHeading` transitions between hero center and corner positions based on reactive Slidev state:

- Bind `:center="$clicks === 0"` to keep the title centered on initial slide view.
- When advancing (`$clicks > 0`), the title smoothly animates to the standard heading anchor.

```vue
<!-- Example: Shifting hero heading with delayed reveal -->
<TransitionHeading :center="$clicks === 0">
  <h1 class="text-4xl font-extrabold text-sky-600 dark:text-sky-400">
    Empirical Evaluation & Method
  </h1>
</TransitionHeading>

<div
  class="transition-all duration-500 mt-20"
  :class="$clicks === 0 ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'"
>
  <p>Revealed findings and analytical framework.</p>
</div>
```

### 2. UnoCSS Utility Styling

`TransitionHeading` passes forwarded attributes via `useMergedUnoAttrs`. You can pass UnoCSS utility classes to adjust transition durations or custom easing:

```vue
<TransitionHeading
  :center="$clicks === 0"
  class="transition-transform duration-700 ease-out"
>
  <h1>Custom Motion Heading</h1>
</TransitionHeading>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by `<TransitionHeading>`:

```html
<!-- <TransitionHeading> (Animated moving wrapper) -->
<div class="alpha-transition-heading transition-all duration-700 absolute ...">
  <!-- Slotted heading markup -->
  <h1>Empirical Evaluation & Method</h1>
</div>
```

#### Class Reference Table

| Component             | Target Element | Rendered Class              | Purpose & Description                                         |
| :-------------------- | :------------- | :-------------------------- | :------------------------------------------------------------ |
| `<TransitionHeading>` | Root container | `.alpha-transition-heading` | Absolute moving container holding the slotted heading markup. |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all transition headings across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all TransitionHeading elements across slides */
.alpha-transition-heading h1 {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
}

.alpha-transition-heading {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for transition headings on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<TransitionHeading :center="$clicks === 0">
  <h1>Custom Title</h1>
</TransitionHeading>

<style>
/* Scoped to this slide only */
:deep(.alpha-transition-heading) {
  transition-duration: 1000ms;
}

:deep(.alpha-transition-heading h1) {
  color: #0284c7;
}
</style>
```

### 4. Layout Integration

- Often used in tandem with the `layout: shifting-intro` layout, where automatic clicks context synchronization is handled for you.
