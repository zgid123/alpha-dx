# Academic Theme

`@alphacifer/slidev-academic-theme` is a clean, light-only Slidev presentation theme designed for lectures, research presentations, technical reports, and thesis defenses.

## Installation

Install the theme package into your presentation project:

```bash
pnpm add -D @alphacifer/slidev-academic-theme
```

The theme installs `@alphacifer/slidev-core-theme` automatically for shared
color tokens, typography defaults, and UnoCSS utilities. Core does not need to
be listed in `addons`.

Register the theme in your `slides.md` frontmatter:

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
---
```

Combine it with Alpha's reusable Slidev Addon when needed:

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

---

## Design System

The Academic Theme features a dedicated design system built upon [`@alphacifer/slidev-core-theme`](/slidev/design-system):
- **Scholarly Accent Palette**: Sky-600 in light mode and calm Emerald-400 (`#34d399`) in dark mode.
- **Lecture Code Blocks**: High-contrast light syntax highlighting in dark mode for lecture hall projectors.
- **Academic Typography**: Centered cover titles, medium subtitle hierarchy, and tabular slide pagination.

[Explore the Academic Theme Design System &rarr;](/slidev/academic-theme/design-system)

---

## Layouts

The theme includes five academic layouts:

- `cover`: Title slide with a restrained academic accent and full-height centered layout.
- `default`: Standard academic content slide with clean margins and typography.
- `blank`: Unconstrained canvas slide for diagrams, comparisons, or content without a top title.
- `section`: Centered section divider slide.
- `end`: Closing slide.

---

## Color Tokens

The theme provides CSS custom properties that can be adjusted in your deck-level `style.css`:

```css
:root {
  --alpha-primary: #f8fafc;
  --alpha-foreground-primary: #0f172a;
  --alpha-foreground-accent: #0284c7;
  --alpha-stroke-primary: #cbd5e1;
}

.dark {
  --alpha-foreground-accent: #34d399;
}
```

Core provides these shared tokens and UnoCSS color utilities through the theme:
`bg-primary`, `text-foreground-primary`, `text-foreground-accent`,
`border-stroke-primary`, `fill-primary`, and `stroke-stroke-primary`. The
optional addon package adds reusable components and layouts; the academic theme
does not require it.

---

## Featured Components

### Core

- [**Speaker**](./components/core/speaker.md): Anchors author or team attribution and a formatted presentation date to the bottom of a slide, styled with academic typography (`font-size: 20px`, `tabular-nums`).
- [**Date**](./components/core/date.md): Formats presentation dates using `formatDate` from `@alphacifer/core-utils/dateUtils`.
- [**Quote**](./components/core/quote.md): Styled blockquotes with optional author attribution.
- [**Reflected Title**](./components/core/reflected-title.md): Title with an inverted pseudo-element reflection.
- [**Q & A**](./components/core/qna.md): Animated "Q & A" title sequence.
- [**Transition Heading**](./components/core/transition-heading.md): Shifting heading coordinating opening and revealed states (`TransitionHeading`).
- [**Thanks**](./components/core/thanks.md): Closing artwork composition for defenses and lectures (`SquareThanks`).
- [**Arc Orbit**](./components/core/arc-orbit.md): Edge-anchored semicircular hub with radial orbiting callout nodes (`ArcOrbit`).

### Facets

#### Triad

- [**Arrow Triad**](./components/facets/triad/arrow-triad.md): Three-way curved arrow infographic (`ArrowTriad`).
- [**Hexagon Triad**](./components/facets/triad/hex-triad.md): 3-item interlocking hexagonal diagram for methodologies (`HexagonTriad`).

#### Tetrad

- [**Rectangle Orbit Tetrad**](./components/facets/tetrad/rect-orbit-tetrad.md): 4-part concentric quadrant infographic with center hub (`RectangleOrbitTetrad`).

### Process

- [**Arc Arrow Process**](./components/process/arc-arrow-process.md): U-shaped curved workflow with interlocking chevron arrows (`ArcArrowProcess`).

### Comparisons

- [**Arc Comparison**](./components/comparisons/arc-comparison.md): Multi-point side-by-side architecture comparisons (`ArcComparison`).
- [**Table Comparison**](./components/comparisons/table-comparison.md): Multi-column matrix comparison table for ablation and benchmark studies (`TableComparison`).

### Cards

- [**Horizontal Card**](./components/card/horiz-card.md): Step-based horizontal cards with accent corner blobs and badges (`HorizontalCard`).
- [**Vertical Card**](./components/card/vert-card.md): Vertical cards with corner accents and flexible badge variants (`VerticalCard`).
- [**Chevron Card**](./components/card/chevron-card.md): Horizontal chevron-accented cards with flexible badges (`ChevronCard`).

---

## Design System

The Academic Theme features a dedicated design system built upon [`@alphacifer/slidev-core-theme`](/slidev/design-system):
- **Scholarly Accent Palette**: Sky-600 in light mode and calm Emerald-400 (`#34d399`) in dark mode.
- **Lecture Code Blocks**: High-contrast light syntax highlighting in dark mode for lecture hall projectors.
- **Academic Typography**: Centered cover titles, medium subtitle hierarchy, and tabular slide pagination.

[Explore the Academic Theme Design System &rarr;](/slidev/academic-theme/design-system)

---

## Layouts

- [**Cover**](./layouts/cover.md): Academic presentation title and speaker attribution layout (`cover`).
- [**Default**](./layouts/default.md): Standard academic slide layout with footer metadata and slide numbering (`default`).
- [**Blank**](./layouts/blank.md): Unconstrained canvas slide without heading presumption for diagrams and content-first slides (`blank`).
- [**Section**](./layouts/section.md): Section divider and chapter transition layout (`section`).
- [**Arc TOC**](./layouts/arc-toc.md): Curved arc table of contents layout with connector lines and color markers (`arc-toc`).
- [**Background Center**](./layouts/bg-center.md): Centered content slide with full-bleed background and section indexing (`bg-center`).
- [**Shifting Intro**](./layouts/shifting-intro.md): Multi-stage transition slide shifting from centered title to top hero position (`shifting-intro`).
- [**Thanks**](./layouts/thanks.md): Concluding slide with animated geometric artwork and closing typography (`thanks`).

---

## Next Steps

Explore any component or layout above to try live interactive demos styled with the Academic Theme tokens.
