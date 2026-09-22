# Shifting Intro Layout (`shifting-intro`)

The `shifting-intro` layout coordinates a multi-stage slide opening: on click 0, the first heading starts centered on the slide; on click 1, the heading automatically animates upward into standard title position while revealing the remaining slide body content.

## Purpose

Multi-stage slide opening where the title starts centered, then animates upward into standard position while revealing body content on click.

**When to use**: Opening slides for major sections where you want a dramatic reveal — the centered title draws attention, then shifts to make room for the content. Works naturally with `TransitionHeading` component.

## Presentation Preview

<LayoutDemo layout="shifting-intro" />

---

## Usage

In your slide markdown frontmatter, set `layout: shifting-intro`:

```md
---
layout: shifting-intro
---

# Architecture Overview

Here is the revealed body content that appears once the title has shifted upward.
- Point 1
- Point 2
```

---

## Behavior

- Extracts the first immediate `<h1>` from the slide content to act as the shifting hero title.
- Keeps remaining slide content hidden on initial presentation load.
- On advance/click, triggers the transition animation upward and reveals body elements.
- Remaps implicit `v-click` animation steps to preserve proper sequence after the reveal.
- Provides `SLIDEV_LAYOUT_SHIFTING_INTRO` context for child components that synchronize with the shift.
