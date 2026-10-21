# Thanks

Composes closing "Thank You" artwork with animated geometric accent squares. Includes the `SquareThanks`, `ThanksSquare`, and `ThanksOutlineSquare` components.

## Purpose

Composes a closing "Thank You" artwork with animated decorative geometric squares and styled typography.

**When to use**: On the final slide of your presentation. Use the `thanks` layout for zero-config setup, or compose manually with `SquareThanks` for custom placement.

## Presentation Preview

<ThanksDemo />

---

## Usage Examples

### Full Composition

```vue
<SquareThanks :animation="true" />
```

### Static Display

```vue
<SquareThanks :animation="false" />
```

### Custom Message Slot

```vue
<!-- Custom heading -->
<SquareThanks>
  <h1>Thank you</h1>
</SquareThanks>

<!-- Custom markup -->
<SquareThanks>
  <div>
    Thank you<br /> And good night!
  </div>
</SquareThanks>
```

### Individual Decorative Squares

```vue
<ThanksSquare class="left-20 top-20 h-28 w-28 bg-cyan-400" />
<ThanksOutlineSquare class="right-20 top-20 h-28 w-28 border-cyan-300" />
```

---

## Props Reference

### `SquareThanks`

- **Rendered Class:** Coordinates floating decoration squares and `.alpha-square-thanks-content`
- **Rendered HTML Tag:** Fragment / multiple floating elements
- **Role:** Main closing celebration component coordinating animated gradient squares and message.

| Prop        | Type      | Default     | Required | Description                                                               |
| :---------- | :-------- | :---------- | :------: | :------------------------------------------------------------------------ |
| `animation` | `boolean` | `true`      |    No    | Enables the animated entrance sequence. Set to `false` for static slides. |
| `color`     | `string`  | `undefined` |    No    | Content text color override.                                              |

### `SquareThanksContent`

- **Rendered Class:** `.alpha-square-thanks-content`
- **Rendered HTML Tag:** `<div>`
- **Role:** Centered thank-you title message.

| Prop        | Type      | Default     | Required | Description                       |
| :---------- | :-------- | :---------- | :------: | :-------------------------------- |
| `animation` | `boolean` | `true`      |    No    | Toggles entrance slide animation. |
| `color`     | `string`  | `undefined` |    No    | Content text color override.      |

### `ThanksSquare`

- **Rendered Class:** `.alpha-thanks-square` (with `.alpha-square-thanks-decoration`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Floating gradient-filled rounded decorative square.

Renders an individual gradient-filled decorative square. Accepts standard HTML attributes and UnoCSS classes via `useMergedUnoAttrs`.

### `ThanksOutlineSquare`

- **Rendered Class:** `.alpha-thanks-outline-square` (with `.alpha-square-thanks-decoration`)
- **Rendered HTML Tag:** `<div>`
- **Role:** Floating stroked outline decorative square.

Renders an individual stroked outline decorative square. Accepts standard HTML attributes and UnoCSS classes via `useMergedUnoAttrs`.

---

## Related Layout

The addon also provides a preconfigured closing slide layout:

```md
---
layout: thanks
---
```

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the celebration gradient squares globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                        | Default   | Description                                   |
| :------------------------------ | :-------- | :-------------------------------------------- |
| `--alpha-thanks-square-start`   | `#06b6d4` | Geometric square linear-gradient start color. |
| `--alpha-thanks-square-end`     | `#2563eb` | Geometric square linear-gradient end color.   |
| `--alpha-thanks-outline-stroke` | `#06b6d4` | Outer floating outline square stroke.         |
| `--alpha-square-thanks-content` | `#2b90b6` | Heading text color.                           |

```vue
<!-- Example: Customizing colors via CSS variables -->
<SquareThanks
  :style="{
    '--alpha-thanks-square-start': '#10b981',
    '--alpha-thanks-square-end': '#047857',
    '--alpha-thanks-outline-stroke': '#34d399',
    '--alpha-square-thanks-content': '#065f46'
  }"
/>
```

### 2. UnoCSS Utility Styling

`SquareThanks` passes forwarded attributes via `useMergedUnoAttrs`. You can pass UnoCSS utility classes to reposition or scale the artwork:

```vue
<SquareThanks class="scale-110 my-8" />
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- Floating Solid Squares (<ThanksSquare>) -->
<div class="alpha-square-thanks-decoration alpha-thanks-square ..."></div>

<!-- Floating Outline Squares (<ThanksOutlineSquare>) -->
<div class="alpha-square-thanks-decoration alpha-thanks-outline-square ..."></div>

<!-- Thank You Message (<SquareThanksContent>) -->
<div class="alpha-square-thanks-content font-bold text-center ...">
  Thank You<br>for your attention!
</div>
```

#### Class Reference Table

| Component               | Target Element       | Rendered Class                    | Purpose & Description                         |
| :---------------------- | :------------------- | :-------------------------------- | :-------------------------------------------- |
| `<SquareThanks>`        | Floating shape layer | `.alpha-square-thanks-decoration` | Common class applied to all floating squares. |
| `<SquareThanksContent>` | Message container    | `.alpha-square-thanks-content`    | Main centered thank-you message container.    |
| `<ThanksSquare>`        | Solid square         | `.alpha-thanks-square`            | Gradient-filled rounded square element.       |
| `<ThanksOutlineSquare>` | Outline square       | `.alpha-thanks-outline-square`    | Border outline square element.                |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all thanks components across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all SquareThanks components across slides */
.alpha-square-thanks-content {
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.05em;
  font-weight: 800;
}

.alpha-thanks-square {
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.12));
}

.alpha-thanks-outline-square {
  border-width: 3px;
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<SquareThanks />

<style>
/* Scoped to this slide only */
:deep(.alpha-square-thanks-content) {
  color: #10b981 !important;
  text-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
}

:deep(.alpha-thanks-square) {
  border-radius: 2rem;
}
</style>
```

### 4. Static Slides & Print Export

- **`animation`** (default `true`): When exporting presentation decks to PDF or printable handouts, pass `:animation="false"` to render final static resting frames immediately without transition delays.
