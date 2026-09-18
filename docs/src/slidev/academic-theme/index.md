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

The theme includes four academic layouts:

- `cover`: Title slide with a restrained academic accent and full-height centered layout.
- `default`: Standard academic content slide with clean margins and typography.
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

### Core Components

- [**Speaker**](./components/speaker.md): Anchors author or team attribution and a formatted presentation date to the bottom of a slide, styled with academic typography (`font-size: 20px`, `tabular-nums`).
- [**Date**](./components/date.md): Formats presentation dates using `formatDate` from `@alphacifer/core-utils/dateUtils`.
- [**Quote**](./components/quote.md): Styled blockquotes with optional author attribution.
- [**Reflected Title**](./components/reflected-title.md): Title with an inverted pseudo-element reflection.
- [**Q & A**](./components/qna.md): Animated "Q & A" title sequence.

### Cards & Structure

- [**Horizontal Card**](./components/horiz-card.md): Step-based horizontal cards with accent corner blobs and badges (`HorizCard`).
- [**Vertical Card**](./components/vert-card.md): Vertical cards with corner accents and flexible badge variants (`VertCard`).
- [**Chevron Card**](./components/chevron-card.md): Horizontal process step cards with left chevron badge (`ChevronCard`).
- [**Comparison Table**](./components/comparison-table.md): Multi-column matrix comparison table for ablation and benchmark studies (`ComparisonTable`).

### Diagrams & Process Flows

- [**Hex Triad**](./components/hex-triad.md): 3-item interlocking hexagonal diagram for methodologies (`HexTriad`).
- [**Arrow Triad**](./components/arrow-triad.md): Three-way curved arrow infographic (`ArrowTriad`).
- [**Quad Hub**](./components/quad-hub.md): 4-part concentric quadrant infographic with center hub (`QuadHub`).
- [**Arc Compare**](./components/arc-compare.md): Multi-point side-by-side architecture comparisons (`ArcCompare`).
- [**Arc Arrow Process**](./components/arc-arrow-process.md): U-shaped curved workflow with interlocking chevron arrows (`ArcArrowProcess`).

### Animation & Transitions

- [**Transition Heading**](./components/transition-heading.md): Shifting heading coordinating opening and revealed states (`TransitionHeading`).
- [**Thanks**](./components/thanks.md): Closing artwork composition for defenses and lectures (`ThanksContent`).

---

## Next Steps

Explore any component above to try live interactive demos styled with the Academic Theme tokens.
