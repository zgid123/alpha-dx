# Slidev Addon

`@alphacifer/slidev-addon-theme` provides shared Vue presentation components, interactive diagrams, and custom layouts tailored for Slidev presentations using the **Seriph** theme.

## Installation

Install the addon package into your presentation project:

```bash
pnpm add -D @alphacifer/slidev-addon-theme
```

Register the addon in your `slides.md` frontmatter with the default `seriph` theme:

```yaml
---
theme: seriph
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

All components exported by the addon are automatically available in your slides without manual imports.

---

## Featured Components

### Core

- [**Speaker**](./components/core/speaker.md): Anchors author or team attribution and a formatted presentation date to the bottom of a slide.
- [**Date**](./components/core/date.md): Formats presentation dates using `formatDate` from `@alphacifer/core-utils/dateUtils`.
- [**Quote**](./components/core/quote.md): Styled blockquotes with optional author attribution.
- [**Reflected Title**](./components/core/reflected-title.md): Title with an inverted pseudo-element reflection.
- [**Q & A**](./components/core/qna.md): Animated "Q & A" title sequence.
- [**Transition Heading**](./components/core/transition-heading.md): Shifting heading coordinating opening and revealed states (`TransitionHeading`).
- [**Thanks**](./components/core/thanks.md): Closing artwork composition with decorative squares (`ThanksContent`).
- [**Arc Orbit**](./components/core/arc-orbit.md): Edge-anchored semicircular hub with radial orbiting callout nodes (`ArcOrbit`).

### Facets

#### Triad

- [**Arrow Triad**](./components/facets/triad/arrow-triad.md): Three-way curved arrow infographic (`ArrowTriad`).
- [**Hex Triad**](./components/facets/triad/hex-triad.md): 3-item interlocking hexagonal diagram (`HexTriad`).

#### Tetrad

- [**Rect Orbit Tetrad**](./components/facets/tetrad/rect-orbit-tetrad.md): 4-part concentric quadrant infographic with center hub (`RectOrbitTetrad`).

### Process

- [**Arc Arrow Process**](./components/process/arc-arrow-process.md): U-shaped curved workflow with interlocking chevron arrows (`ArcArrowProcess`).

### Comparisons

- [**Arc Comparison**](./components/comparisons/arc-comparison.md): Multi-point side-by-side architecture comparisons (`ArcComparison`).
- [**Table Comparison**](./components/comparisons/table-comparison.md): Multi-column matrix comparison table (`TableComparison`).

### Cards

- [**Horizontal Card**](./components/card/horiz-card.md): Step-based horizontal cards with accent corner blobs and badges (`HorizCard`).
- [**Vertical Card**](./components/card/vert-card.md): Vertical cards with corner stripes and flexible badge variants (`VertCard`).
- [**Chevron Card**](./components/card/chevron-card.md): Chevron-shaped cards with custom badge and notch depth (`ChevronCard`).

---

## Layouts

- [**Arc TOC**](./layouts/arc-toc.md): Circular arc table of contents with measured connectors and section markers (`arc-toc`).
- [**Background Center**](./layouts/bg-center.md): Full-slide centered background layout with dimming and index badge (`bg-center`).
- [**Shifting Intro**](./layouts/shifting-intro.md): Interactive hero title that shifts to the header on first click (`shifting-intro`).
- [**Table of Contents**](./layouts/table-of-contents.md): Standard table of contents with configurable heading depth (`table-of-contents`).
- [**Thanks**](./layouts/thanks.md): Concluding slide with animated geometric squares and artwork (`thanks`).

---

## Next Steps

Explore any component or layout above to try interactive controls, presentation mode, and light/dark theme toggles.
