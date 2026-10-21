# Speaker

Anchors speaker or team attribution and a formatted presentation date at the bottom of a slide within the **Academic Theme**.

## Purpose

Provides consistent speaker, researcher, or author attribution at the bottom of any slide. Anchors the presenter name (or team list) and formatted date.

**When to use**: On cover, intro, or end slides where you need to display who is presenting and the presentation date. Prefer `team` prop when multiple presenters share the stage.

## Presentation Preview

<SpeakerDemo theme="academic" />

---

## Usage Examples

### Single Author

```vue
<Speaker author="Alpha" date="2026-08-12" />
```

### Team Attribution

```vue
<Speaker :team="['Alpha', 'Beta']" date="2026-08-12" />
```

### Slidev Configuration

To use the Speaker component in an Academic presentation, enable the addon in your frontmatter:

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

---

## Props Reference

### `Speaker`

- **Rendered Class:** `.alpha-speaker` (embeds `.alpha-date` component)
- **Rendered HTML Tag:** `<div>`
- **Role:** Presenter attributions container positioned in bottom-right corner displaying author/team and presentation date.

| Prop     | Type       | Default   | Required | Description                                                                                          |
| :------- | :--------- | :-------- | :------: | :--------------------------------------------------------------------------------------------------- |
| `date`   | `string`   | —         | **Yes**  | Date string (e.g. `'2026-08-12'`). Formatted as `dd/MM/yyyy` via `@alphacifer/core-utils/dateUtils`. |
| `author` | `string`   | `'Alpha'` |    No    | Author name displayed when `team` is empty or omitted.                                               |
| `team`   | `string[]` | `[]`      |   `No`   | List of team member names. When non-empty, replaces the single author line.                          |

---

## Customization Guidelines

### 1. Typography & Theme Tokens

`Speaker` uses theme tokens for author attribution:
- Names render with `var(--alpha-foreground-primary)`.
- The bullet divider and date stamp render with `var(--alpha-foreground-secondary)`.

```vue
<!-- Example: Themed speaker attribution -->
<Speaker
  author="Dr. Jane Doe"
  date="2026-10-19"
  class="font-serif italic text-lg text-slate-700 dark:text-slate-300"
/>
```

### 2. UnoCSS Utility Styling

`Speaker` passes forwarded attributes through `useMergedUnoAttrs`. You can pass UnoCSS utility classes to adjust positioning (e.g. absolute bottom anchoring), margins, or alignment:

```vue
<Speaker
  :team="['Alice Chen', 'Bob Smith']"
  date="2026-10-19"
  class="justify-center mt-auto pb-4 gap-3 text-sm"
/>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by `<Speaker>`:

```html
<!-- <Speaker> (Root container) -->
<div class="alpha-speaker flex absolute bottom-3.75 right-7.5 flex-col ...">
  <!-- Author or Team list -->
  <p>Author: Jane Doe</p>

  <!-- Embedded Date Component (<Date>) -->
  <p class="alpha-date font-mono ...">
    Date: 19/10/2026
  </p>
</div>
```

#### Class Reference Table

| Component   | Target Element | Rendered Class   | Purpose & Description                                     |
| :---------- | :------------- | :--------------- | :-------------------------------------------------------- |
| `<Speaker>` | Root container | `.alpha-speaker` | Presenter attribution container anchored at bottom right. |
| `<Date>`    | Embedded date  | `.alpha-date`    | Date stamp rendered beneath presenter names.              |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all speaker components across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all Speaker components across slides */
.alpha-speaker {
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.02em;
}

.alpha-speaker .alpha-date {
  font-size: 0.8rem;
  opacity: 0.8;
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for speaker info on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<Speaker author="Dr. Jane Doe" date="2026-10-21" />

<style>
/* Scoped to this slide only */
:deep(.alpha-speaker) {
  right: 2rem;
  bottom: 2rem;
  font-weight: 600;
}

:deep(.alpha-speaker .alpha-date) {
  color: #0284c7;
}
</style>
```

### 4. Multi-Author & Collaboration Modes

- Use the `team` prop (e.g. `:team="['Alice', 'Bob', 'Charlie']"`) to automatically format multiple presenters with bullet delimiters.
