# Default Layout (`default`)

The `default` layout is the standard content slide for the Academic Theme. It provides structured academic typography, generous margins, and an integrated bottom metadata bar displaying slide numbers and presentation details.

## Presentation Preview

<LayoutDemo layout="default" theme="academic" />

---

## Usage

In your slide markdown frontmatter (or omitted for standard slides):

```md
---
layout: default
---

# Methodology & Formulation

Detailed slide contents, equations, bullet points, and data tables.
```

---

## Behavior

- Centers or aligns slide content within academic margin bounds.
- Integrates with `slide-bottom.vue` for automatic slide numbering (`tabular-nums`) and footer presentation metadata.
- Compatible with all components from `@alphacifer/slidev-addon-theme`.
