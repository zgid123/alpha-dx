# Academic Theme

`@alphacifer/slidev-academic-theme` is a clean, light-only Slidev presentation theme designed for lectures, research presentations, technical reports, and thesis defenses.

## Installation

Install the theme package into your presentation project:

```bash
pnpm add -D @alphacifer/slidev-academic-theme
```

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

## Layouts

The theme includes five academic layouts:

- `cover`: Title slide with a restrained academic accent and full-height centered layout.
- `default`: Standard academic content slide with clean margins and typography.
- `blank`: Unconstrained canvas slide for diagrams, comparisons, or content without a top title.
- `section`: Centered section divider slide.
- `end`: Closing slide.

---

## Design Tokens

The theme provides CSS custom properties that can be adjusted in your deck-level `style.css`:

```css
:root {
  /* Primary text and heading color */
  --alpha-academic-primary: #0f172a;
  /* Content background color */
  --alpha-academic-bg: #f8fafc;
  /* Accent highlight (e.g. Cover / Badge) */
  --alpha-academic-accent: #0ea5e9;
  /* Accent foreground (e.g. highlighted terms) */
  --alpha-academic-accent-foreground: #0284c7;
}
```

---

## Featured Components

### Core

- [**Speaker**](./components/core/speaker.md): Anchors author or team attribution and a formatted presentation date to the bottom of a slide, styled with academic typography (`font-size: 20px`, `tabular-nums`).
- [**Date**](./components/core/date.md): Formats presentation dates using `formatDate` from `@alphacifer/core-utils/dateUtils`.
- [**Quote**](./components/core/quote.md): Styled blockquotes with optional author attribution.
- [**Reflected Title**](./components/core/reflected-title.md): Title with an inverted pseudo-element reflection.
- [**Q & A**](./components/core/qna.md): Animated "Q & A" title sequence.
- [**Transition Heading**](./components/core/transition-heading.md): Shifting heading coordinating opening and revealed states (`TransitionHeading`).
- [**Thanks**](./components/core/thanks.md): Closing artwork composition for defenses and lectures (`ThanksContent`).
- [**Arc Orbit**](./components/core/arc-orbit.md): Edge-anchored semicircular hub with radial orbiting callout nodes (`ArcOrbit`).

### Facets

#### Triad

- [**Arrow Triad**](./components/facets/triad/arrow-triad.md): Three-way curved arrow infographic (`ArrowTriad`).
- [**Hex Triad**](./components/facets/triad/hex-triad.md): 3-item interlocking hexagonal diagram for methodologies (`HexTriad`).

#### Tetrad

- [**Rect Orbit Tetrad**](./components/facets/tetrad/rect-orbit-tetrad.md): 4-part concentric quadrant infographic with center hub (`RectOrbitTetrad`).

### Process

- [**Arc Arrow Process**](./components/process/arc-arrow-process.md): U-shaped curved workflow with interlocking chevron arrows (`ArcArrowProcess`).

### Comparisons

- [**Arc Comparison**](./components/comparisons/arc-comparison.md): Multi-point side-by-side architecture comparisons (`ArcComparison`).
- [**Table Comparison**](./components/comparisons/table-comparison.md): Multi-column matrix comparison table for ablation and benchmark studies (`TableComparison`).

### Cards

- [**Horizontal Card**](./components/card/horiz-card.md): Step-based horizontal cards with accent corner blobs and badges (`HorizCard`).
- [**Vertical Card**](./components/card/vert-card.md): Vertical cards with corner accents and flexible badge variants (`VertCard`).
- [**Chevron Card**](./components/card/chevron-card.md): Horizontal chevron-accented cards with flexible badges (`ChevronCard`).

---

## Layouts

- [**Cover**](./layouts/cover.md): Academic presentation title and speaker attribution layout (`cover`).
- [**Default**](./layouts/default.md): Standard academic slide layout with footer metadata and slide numbering (`default`).
- [**Blank**](./layouts/blank.md): Unconstrained canvas slide without heading presumption for diagrams and content-first slides (`blank`).
- [**Section**](./layouts/section.md): Section divider and chapter transition layout (`section`).
- [**End**](./layouts/end.md): Formal concluding layout for lectures, defenses, and seminars (`end`).
- [**Arc TOC**](./layouts/arc-toc.md): Curved arc table of contents layout with connector lines and color markers (`arc-toc`).
- [**Background Center**](./layouts/bg-center.md): Centered content slide with full-bleed background and section indexing (`bg-center`).
- [**Shifting Intro**](./layouts/shifting-intro.md): Multi-stage transition slide shifting from centered title to top hero position (`shifting-intro`).
- [**Table of Contents**](./layouts/table-of-contents.md): Standard structured agenda slide with heading level controls (`table-of-contents`).
- [**Thanks**](./layouts/thanks.md): Concluding slide with animated geometric artwork and closing typography (`thanks`).

---

## Next Steps

Explore any component or layout above to try live interactive demos styled with the Academic Theme tokens.
