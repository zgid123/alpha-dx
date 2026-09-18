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

### Core Components

- [**Speaker**](./components/speaker.md): Anchors author or team attribution and a formatted presentation date to the bottom of a slide.
- [**Date**](./components/date.md): Formats presentation dates using `formatDate` from `@alphacifer/core-utils/dateUtils`.
- [**Quote**](./components/quote.md): Styled blockquotes with optional author attribution.
- [**Reflected Title**](./components/reflected-title.md): Title with an inverted pseudo-element reflection.
- [**Q & A**](./components/qna.md): Animated "Q & A" title sequence.

### Cards & Structure

- [**Horizontal Card**](./components/horiz-card.md): Step-based horizontal cards with accent corner blobs and badges (`HorizCard`).
- [**Vertical Card**](./components/vert-card.md): Vertical cards with corner stripes and flexible badge variants (`VertCard`).
- [**Chevron Card**](./components/chevron-card.md): Horizontal process step cards with left chevron badge (`ChevronCard`).
- [**Comparison Table**](./components/comparison-table.md): Multi-column matrix comparison table (`ComparisonTable`).

### Diagrams & Process Flows

- [**Hex Triad**](./components/hex-triad.md): 3-item interlocking hexagonal diagram (`HexTriad`).
- [**Arrow Triad**](./components/arrow-triad.md): Three-way curved arrow infographic (`ArrowTriad`).
- [**Quad Hub**](./components/quad-hub.md): 4-part concentric quadrant infographic with center hub (`QuadHub`).
- [**Arc Compare**](./components/arc-compare.md): Multi-point side-by-side architecture comparisons (`ArcCompare`).
- [**Arc Arrow Process**](./components/arc-arrow-process.md): U-shaped curved workflow with interlocking chevron arrows (`ArcArrowProcess`).

### Animation & Transitions

- [**Transition Heading**](./components/transition-heading.md): Shifting heading coordinating opening and revealed states (`TransitionHeading`).
- [**Thanks**](./components/thanks.md): Closing artwork composition with decorative squares (`ThanksContent`).

---

## Next Steps

Explore any component above to try interactive controls, presentation mode, and light/dark theme toggles.
