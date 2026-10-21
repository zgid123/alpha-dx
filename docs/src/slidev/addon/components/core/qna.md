# QnA

Renders an animated "Q & A" title sequence designed for transition slides and closing Q&A sessions.

## Purpose

Renders an animated "Q & A" title composition with entrance motion effects.

**When to use**: On the final or penultimate slide of your talk to signal the Q&A session. Typically used inside an `end` or `thanks` layout. Adjust `startDelay` for immediate or delayed playback.

## Presentation Preview

<QnADemo />

---

## Usage Examples

### Default Delay

```vue
<QnA />
```

### Instant Playback

```vue
<QnA :start-delay="0" />
```

---

## Props Reference

### `QnA`

- **Rendered Class:** `.alpha-qna`
- **Rendered HTML Tag:** `<div>`
- **Role:** Main container displaying animated letters "Q", "&", "A" with motion effects.

| Prop         | Type     | Default | Required | Description                                                           |
| :----------- | :------- | :------ | :------: | :-------------------------------------------------------------------- |
| `startDelay` | `number` | `11500` |    No    | Delay in milliseconds before triggering the entrance motion sequence. |

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the Q&A text and highlight color globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable            | Default                                    | Description                    |
| :------------------ | :----------------------------------------- | :----------------------------- |
| `--alpha-qna-color` | `var(--alpha-foreground-primary, #2b90b6)` | Heading and accent text color. |

```vue
<!-- Example: Customizing colors via CSS variables -->
<QnA
  :start-delay="0"
  :style="{
    '--alpha-qna-color': '#0ea5e9'
  }"
/>
```

### 2. UnoCSS Utility Styling

`QnA` passes forwarded attributes via `useMergedUnoAttrs`. You can pass UnoCSS utility classes to adjust centering, font sizes, or layout positioning:

```vue
<QnA class="text-6xl font-black tracking-widest my-12" />
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by `<QnA>`:

```html
<!-- <QnA> (Root container) -->
<div class="alpha-qna flex items-center gap-8 ..." role="img" aria-label="Questions and answers">
  <span>Q</span>
  <span>&</span>
  <span>A</span>
</div>
```

#### Class Reference Table

| Component | Target Element | Rendered Class | Purpose & Description                      |
| :-------- | :------------- | :------------- | :----------------------------------------- |
| `<QnA>`   | Root container | `.alpha-qna`   | Main flex container for animated Q&A text. |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all Q&A components across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all QnA components across slides */
.alpha-qna {
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.1em;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for Q&A on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<QnA :start-delay="0" />

<style>
/* Scoped to this slide only */
:deep(.alpha-qna) {
  color: #ec4899 !important;
  text-shadow: 0 0 24px rgba(236, 72, 153, 0.4);
}
</style>
```

### 4. Immediate vs Delayed Sequence

- **`startDelay`** (default `11500`): In choreographed closing slides, the animation begins automatically after 11.5s. Set `:start-delay="0"` for instant rendering when switching directly to the slide.
