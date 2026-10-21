# Quote

Displays a styled quotation with optional author attribution and academic typography.

## Purpose

Renders a styled blockquote with optional author attribution for memorable statements.

**When to use**: On slides dedicated to a key insight, memorable quote, or design principle. Pair with `center` or `section` layouts for maximum visual impact.

## Presentation Preview

<QuoteDemo theme="academic" />

---

## Usage Examples

### Standard Quote with Author

```vue
<Quote
  text="Reusable slides should feel native to every deck."
  author="Alpha"
/>
```

### Custom Title Class

```vue
<Quote
  text="Speed and rigor are complementary, not contradictory."
  author="Alpha"
  title-class="text-3xl!"
/>
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

### `Quote`

- **Rendered Class:** `.alpha-quote`
- **Rendered HTML Tag:** `<div>` (containing `<h3>` for quote text and `<p>` for author)
- **Role:** Main container displaying centered quote text and right-aligned author attribution.

| Prop         | Type     | Default     | Required | Description                                                          |
| :----------- | :------- | :---------- | :------: | :------------------------------------------------------------------- |
| `text`       | `string` | —           | **Yes**  | The quote text to display in quotation marks.                        |
| `author`     | `string` | `undefined` |    No    | Optional author attribution rendered beneath the quote.              |
| `titleClass` | `string` | `undefined` |    No    | Additional UnoCSS or utility classes applied to the heading element. |

---

## Customization Guidelines

### 1. Typography & Theme Tokens

`Quote` automatically inherits the theme's typographic hierarchy:
- Quote text uses `var(--alpha-foreground-primary)` with large serif or display typography.
- Author attribution inherits `var(--alpha-foreground-secondary)`.

```vue
<!-- Example: Custom font styling and author attribution -->
<Quote
  text="Clear structure lets the evidence carry the argument."
  author="Richard Feynman"
  title-class="italic font-serif text-3xl text-sky-600 dark:text-sky-400"
/>
```

### 2. UnoCSS Utility Styling

`Quote` supports forwarded attributes via `useMergedUnoAttrs`. You can pass UnoCSS utility classes to customize container padding, alignment, or borders:

```vue
<Quote
  text="Empirical results outperform theoretical speculation."
  author="Alpha"
  class="border-l-4 border-emerald-500 pl-6 my-8 max-w-2xl mx-auto"
/>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by `<Quote>`:

```html
<!-- <Quote> (Root container) -->
<div class="alpha-quote flex flex-col ...">
  <h3 class="text-center ...">"Clear structure lets the evidence carry the argument."</h3>
  <p class="self-end ...">— Richard Feynman</p>
</div>
```

#### Class Reference Table

| Component | Target Element | Rendered Class | Purpose & Description                                      |
| :-------- | :------------- | :------------- | :--------------------------------------------------------- |
| `<Quote>` | Root container | `.alpha-quote` | Main flex column quote container wrapping text and author. |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all quote components across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all Quote components across slides */
.alpha-quote {
  padding-left: 1.5rem;
  border-left: 4px solid var(--alpha-primary, #3b82f6);
}

.alpha-quote h1 {
  font-style: italic;
  font-family: Georgia, serif;
  letter-spacing: -0.01em;
}

.alpha-quote p {
  font-weight: 600;
  opacity: 0.85;
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for quotes on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<Quote text="Empirical results outperform theoretical speculation." author="Alpha" />

<style>
/* Scoped to this slide only */
:deep(.alpha-quote) h1 {
  color: #0284c7;
  font-family: 'Georgia', serif;
}
</style>
```

### 4. Granular Title Classes

- Use `titleClass` (e.g. `text-4xl! font-bold tracking-tight`) to override the quote text's size and weight independently of the author line.
