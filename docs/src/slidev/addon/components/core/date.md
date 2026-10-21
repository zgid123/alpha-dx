# Date

Formats presentation dates consistently across slides as `dd/MM/yyyy`, defaulting to the current date when omitted.

## Purpose

Renders a consistently formatted presentation date (`dd/MM/yyyy`).

**When to use**: Whenever you need a standalone formatted date stamp — typically inside custom cover layouts or footer components. If you need date + author together, use `Speaker` instead.

## Presentation Preview

<DateDemo />

---

## Usage Examples

### Custom Date

```vue
<Date date="2026-08-12" />
```

### Current Date Fallback

```vue
<Date />
```

---

## Props Reference

### `Date`

- **Rendered Class:** `.alpha-date`
- **Rendered HTML Tag:** `<p>`
- **Role:** Main container displaying formatted date string with tabular numeric alignment.

| Prop   | Type     | Default     | Required | Description                                                                                                                                                   |
| :----- | :------- | :---------- | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `date` | `string` | `undefined` |    No    | Date string accepted by the JavaScript `Date` constructor. Formats to `dd/MM/yyyy` using `@alphacifer/core-utils/dateUtils`. When omitted, uses today's date. |

---

## Customization Guidelines

### 1. Typography & Tabular Digits

`Date` renders with `font-variant-numeric: tabular-nums` to ensure stable digit alignment across changing numbers. It uses `var(--alpha-foreground-secondary)` by default:

```vue
<!-- Example: Styled date badge -->
<Date
  date="2026-10-19"
  class="font-mono text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
/>
```

### 2. UnoCSS Utility Styling

`Date` passes forwarded attributes via `useMergedUnoAttrs`. You can pass UnoCSS utility classes to customize color, text weight, or opacity:

```vue
<Date class="text-sm font-semibold text-sky-600 dark:text-sky-400" />
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by `<Date>`:

```html
<!-- <Date> (Root container) -->
<p class="alpha-date font-mono tabular-nums ...">
  Date: 21/10/2026
</p>
```

#### Class Reference Table

| Component | Target Element | Rendered Class | Purpose & Description                                |
| :-------- | :------------- | :------------- | :--------------------------------------------------- |
| `<Date>`  | Root container | `.alpha-date`  | Main container displaying the formatted date string. |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all date components across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all Date components across slides */
.alpha-date {
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  opacity: 0.85;
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for dates on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<Date date="2026-10-21" />

<style>
/* Scoped to this slide only */
:deep(.alpha-date) {
  font-weight: 700;
  color: #0284c7;
}
</style>
```

### 4. Automatic Date Fallback

- Omitting the `date` prop automatically evaluates today's local date dynamically at presentation render time.
