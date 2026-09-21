# Slidev Tools Overview

Alpha DX provides an ecosystem of presentation tools, reusable Vue components, and dedicated themes built for [Slidev](https://sli.dev).

---

## Packages

### 1. [@alphacifer/slidev-addon-theme](/slidev/addon/)
A modular Slidev addon providing:
- **Interactive Infographics & Diagrams**: Triads, hubs, process flows, and comparison matrices with parametric SVG geometry and animations.
- **Content Cards**: Horizontal and vertical card containers with step ribbons and corner accents.
- **Custom Layouts**: Interactive table of contents, animated intro shifts, full-bleed centered backgrounds, and closing artwork slides.
- **Seriph Theme Support**: Seamless integration with Slidev's default Seriph theme.

[Explore Addon Documentation &rarr;](/slidev/addon/)

---

### 2. [@alphacifer/slidev-academic-theme](/slidev/academic-theme/)
A comprehensive Slidev theme designed specifically for:
- Academic lectures and university courses.
- Master / PhD thesis defenses and qualification exams.
- Research paper presentations and conference talks.
- Structured typography, muted color palettes, and dedicated layouts (`cover`, `section`, `default`, `end`).

[Explore Academic Theme Documentation &rarr;](/slidev/academic-theme/)

---

## Architecture & Structure

Slidev presentation assets in Alpha DX follow a unified structure:

```
packages/slidev/
├── addon-theme/              # Addon package
│   ├── components/           # Grouped by usage: core, facets, process, compare, card
│   ├── layouts/              # Custom presentation layouts
│   └── utils/                # Geometry, UnoCSS class merging, auto-scaling
│
└── academic-theme/           # Complete Academic Theme
    ├── layouts/              # Academic slide layouts (cover, default, section, end)
    ├── style.css             # Academic typography & scoped CSS variables
    └── slide-bottom.vue      # Academic footer with slide numbering and author
```

---

## Quick Navigation

| Area | Addon | Academic Theme |
| :--- | :--- | :--- |
| **Overview** | [Addon Overview](/slidev/addon/) | [Academic Theme Overview](/slidev/academic-theme/) |
| **Components** | [Addon Components](/slidev/addon/components/core/speaker) | [Academic Components](/slidev/academic-theme/components/core/speaker) |
| **Layouts** | [Addon Layouts](/slidev/addon/layouts/arc-toc) | [Academic Layouts](/slidev/academic-theme/layouts/cover) |
