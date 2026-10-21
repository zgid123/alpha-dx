# ReflectedTitle

Creates a prominent presentation heading accompanied by a soft, mirrored inverted reflection underneath.

## Purpose

Creates a large display heading with a mirrored CSS reflection effect underneath for visual emphasis.

**When to use**: On hero slides or section dividers where you want a dramatic title treatment. Works best with dark backgrounds or inside banner containers.

## Presentation Preview

<ReflectedTitleDemo theme="academic" />

---

## Usage Examples

### Basic Title

```vue
<ReflectedTitle title="Alpha's Academic Presentation" />
```

### Inside Academic Banner

```vue
<div class="rounded-xl bg-slate-900/70 p-10 text-center">
  <ReflectedTitle title="Distributed Architecture" />
</div>
```

### Slidev Configuration

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

---

## Props Reference

### `ReflectedTitle`

- **Rendered Class:** `.alpha-reflected-title`
- **Rendered HTML Tag:** `<h1>` (with `data-title` attribute and `::after` CSS pseudo-element mirror reflection)
- **Role:** Main heading displaying text with an animated inverted reflection gradient below.

| Prop    | Type     | Default | Required | Description                                                     |
| :------ | :------- | :------ | :------: | :-------------------------------------------------------------- |
| `title` | `string` | —       | **Yes**  | The heading text to display and reflect via CSS pseudo-element. |

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the reflection text and accent color globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                        | Default                                    | Description                          |
| :------------------------------ | :----------------------------------------- | :----------------------------------- |
| `--alpha-reflected-title-color` | `var(--alpha-foreground-primary, #a5f3fc)` | Reflection text and highlight color. |

```vue
<!-- Example: Customizing colors via CSS variables -->
<ReflectedTitle
  title="Neural Architectures"
  :style="{
    '--alpha-reflected-title-color': '#38bdf8'
  }"
/>
```

### 2. UnoCSS Utility Styling

`ReflectedTitle` passes forwarded attributes via `useMergedUnoAttrs`. You can pass UnoCSS utility classes to adjust font size, letter-spacing, or centering:

```vue
<ReflectedTitle
  title="Quantum Simulation"
  class="text-5xl font-black tracking-tight text-center my-6"
/>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by `<ReflectedTitle>`:

```html
<!-- <ReflectedTitle> (Heading with reflected pseudo-element) -->
<h1 class="alpha-reflected-title relative text-5xl font-bold ..." data-title="Neural Architectures">
  Neural Architectures
  <!-- ::after pseudo-element creates the mirrored gradient reflection -->
</h1>
```

#### Class Reference Table

| Component          | Target Element | Rendered Class           | Purpose & Description                                                    |
| :----------------- | :------------- | :----------------------- | :----------------------------------------------------------------------- |
| `<ReflectedTitle>` | Heading        | `.alpha-reflected-title` | Title element rendering reflected mirrored pseudo-element via `::after`. |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all reflected title components across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all ReflectedTitle headings across slides */
.alpha-reflected-title {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.03em;
}

/* Customizing reflection pseudo-element */
.alpha-reflected-title::after {
  opacity: 0.45;
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for titles on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<ReflectedTitle title="Scoped Reflected Title" />

<style>
/* Scoped to this slide only */
:deep(.alpha-reflected-title) {
  font-weight: 800;
  color: #38bdf8 !important;
}

:deep(.alpha-reflected-title)::after {
  opacity: 0.7;
}
</style>
```

### 4. High-Contrast Contrast Tips

- For best visual fidelity, place `ReflectedTitle` against a deep slate or darkened container (e.g. `bg-slate-900`) so the gradient mirror reflection fades cleanly into the backdrop.
