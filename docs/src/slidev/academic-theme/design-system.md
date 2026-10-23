# Academic Theme Design System

`@alphacifer/slidev-academic-theme` provides a refined, high-contrast design system specifically crafted for academic lectures, research paper presentations, conference talks, and master / Ph.D. dissertation defenses.

Built on top of [`@alphacifer/slidev-core-theme`](/slidev/design-system), it specializes the core foundation with scholarly color tokens, high-visibility lecture code blocks, and formal slide pagination.

---

## Interactive Academic Design System Explorer

Explore the Academic Theme's color tokens, typography scale, and a live presentation preview below:

<DesignSystemDemo variant="academic" />

---

## Academic Design Philosophy

Academic talks present distinct challenges compared to tech keynotes or commercial slide decks:

1. **Auditorium & Projector Visibility:** Lecture hall projectors often suffer from low contrast or washed-out blacks. The Academic Theme ensures all slide text, formulas, and diagrams maintain crisp readability.
2. **Scholarly & Restrained Palette:** Eliminates saturated neon gradients in favor of clear typography, a calm emerald dark accent (`#34d399`), and disciplined borders.
3. **High-Contrast Code Blocks in Dark Mode:** Code listings retain light-mode background and syntax highlighting even when presenting in dark mode, ensuring complex algorithms and equations remain legible to students in the back row.
4. **Formal Slide Paginator:** Displays tabular-numeral slide counts (`.alpha-academic-pagy`) on content slides, automatically suppressed on cover, section divider, agenda, and concluding artwork slides.

---

## Academic Color Tokens & Overrides

The Academic Theme inherits base tokens from `@alphacifer/slidev-core-theme` and introduces specialized overrides and layout variables:

| Token Name | Light Value | Dark Value | Semantic Role in Academic Slides |
| :--- | :--- | :--- | :--- |
| `--alpha-primary` | `#f8fafc` | `#0f172a` | Academic slide canvas background |
| `--alpha-foreground-primary` | `#0f172a` | `#f1f5f9` | Primary headings, theorems, and main body copy |
| `--alpha-foreground-secondary` | `#475569` | `#94a3b8` | Subtitles, speaker affiliations, date stamps, and citations |
| `--alpha-foreground-accent` | `#0284c7` | `#34d399` | Light Sky-600 in light mode; scholarly Emerald-400 in dark mode |
| `--alpha-stroke-primary` | `#cbd5e1` | `#475569` | Table boundaries, divider rules, and diagram connectors |

### Accent Color Override

While light mode uses the classic Sky blue (`#0284c7`), dark mode overrides `--alpha-foreground-accent` to an emerald tone (`#34d399`):

```css
/* @alphacifer/slidev-academic-theme/style.css */
.dark,
html.dark {
  --alpha-foreground-accent: #34d399; /* Emerald accent for academic dark mode */
}
```

### Academic Semantic Layout Tokens

The theme defines semantic CSS variables that allow deck-level customization of specific academic slide elements:

| Token Name | Default Fallback | Purpose |
| :--- | :--- | :--- |
| `--alpha-academic-page-background` | `var(--alpha-primary)` | Slide canvas background fill |
| `--alpha-academic-layout-text` | `var(--alpha-foreground-primary)` | Base layout font color |
| `--alpha-academic-heading-text` | `var(--alpha-foreground-primary)` | Standard slide title color |
| `--alpha-academic-cover-title` | `var(--alpha-foreground-accent)` | Thesis / lecture hero title color on cover slides |
| `--alpha-academic-cover-gap` | `0.75rem` | Vertical spacing between cover title, subtitle, and author metadata |
| `--alpha-academic-page-number-text` | `var(--alpha-foreground-primary)` | Paginator numbers in the slide footer |
| `--alpha-academic-mark-text` | `var(--alpha-foreground-accent)` | Bold highlighted text via `<mark>` |

---

## Lecture Code Block Tokens

In auditorium settings, dark code blocks on dark slides frequently wash out into an unreadable gray haze. The Academic Theme overrides Slidev's default Shiki code theme to keep code blocks light and crisp even in dark mode:

```css
.dark,
html.dark {
  --slidev-code-background: #f5f5f5;
  --slidev-code-foreground: #1b1b1b;
  --slidev-code-tab-divider: #e5e5e5;
  --slidev-code-tab-text-color: #67676c;
  --slidev-code-tab-active-text-color: #3c3c43;
}

/* Force syntax tokens to use light-mode colors in dark mode */
html.dark .shiki {
  --twoslash-popup-bg: var(--shiki-light-bg, inherit);
  color: var(--shiki-light, inherit);
}

html.dark pre.shiki span {
  color: var(--shiki-light, inherit);
}
```

---

## Canvas Blend Mode Neutralization

Slidev's default `handleBackground(bg, true)` injects a dark gradient overlay on dark slides. The Academic Theme neutralizes this using `background-blend-mode: screen`, guaranteeing that scientific figures, diagrams, and addon infographics render at their original brightness without dimming:

```css
.dark .slidev-page,
html.dark .alpha-bg-center {
  background-blend-mode: screen;
}
```

---

## Academic Typography & Layout Rules

### 1. Cover Slide (`cover`)
- Uses full-height centered layout (`.alpha-academic-cover`) with a disciplined vertical rhythm (`--alpha-academic-cover-gap: 0.75rem`).
- Cover `h1` renders with `--alpha-font-size-cover: 3.75rem` (60px), colored with `--alpha-academic-cover-title` (`var(--alpha-foreground-accent)`).
- Subtitles (`h2`, `h3`, `h4`) render centered with medium weight (500) and `--alpha-foreground-secondary`.

### 2. Standard Content Slide (`default`)
- Padding: `2.5rem 3rem` (40px top/bottom, 48px left/right).
- Content `h1` automatically formatted to `--alpha-font-size-h1: 2.25rem` (36px) bold.
- Subtitles (`h4`) automatically styled with `font-weight: 500` and `--alpha-foreground-secondary`.

### 3. Slide Pagination (`.alpha-academic-pagy`)
- Positioned in the bottom-right corner (`right: 3rem; bottom: 0.75rem`).
- Rendered with `font-variant-numeric: tabular-nums` to prevent layout shift during slide navigation.
- Automatically suppressed on `cover`, `thanks`, `arc-toc`, and `bg-center` slides:
  ```css
  .slidev-page:has(.alpha-thanks) .alpha-academic-pagy,
  .slidev-page:has(.alpha-academic-cover) .alpha-academic-pagy,
  .slidev-page:has(.alpha-arc-toc) .alpha-academic-pagy,
  .slidev-page:has(.alpha-bg-center) .alpha-academic-pagy {
    display: none;
  }
  ```

### 4. Text Highlighting (`<mark>`)
Academic texts frequently need keyword emphasis without garish highlighter boxes. `<mark>` is styled transparent with bold weight and accent color:
```css
.slidev-layout mark {
  font-weight: bold;
  color: var(--alpha-academic-mark-text, var(--alpha-foreground-accent));
  background-color: transparent;
}
```

---

## Usage in Slides

Register the Academic Theme in your presentation frontmatter:

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
---

# Thesis Defense Presentation
#### Ph.D. Candidate in Computer Science

<Speaker author="Alpha" date="2026-10-23" />
```

To incorporate interactive infographics (Arc Orbit, Triads, Pyramids, and Process flows), include `@alphacifer/slidev-addon-theme` in your `addons` list:

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

---

## Next Steps

- Check out the [Core Design System](/slidev/design-system) to learn about the foundational design tokens.
- Explore [Academic Theme Layouts](/slidev/academic-theme/layouts/cover) to see `cover`, `default`, `blank`, and `section` in action.
- Browse [Academic Theme Components](/slidev/academic-theme/components/core/speaker) for attribution and diagram components.
