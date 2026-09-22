# Chevron Card

Horizontal process card featuring an indented chevron badge on the left side and rounded container on the right. Includes `ChevronCard`, `ChevronCardBadge`, `ChevronCardHeading`, and `ChevronCardContent`.

## Purpose

Horizontal card with an indented chevron-shaped badge for presenting sequential process steps with visual directionality.

**When to use**: When building process grids where the chevron shape reinforces the sequential flow — onboarding steps, deployment pipelines, or sprint phases. Works well in 2x2 grid layouts.

## Presentation Preview

<ChevronCardDemo theme="academic" />

---

## Usage Examples

### Single Step Card

```vue
<ChevronCard step="01" color="#0ea5e9">
  <ChevronCardHeading>Literature Review</ChevronCardHeading>
  <ChevronCardContent>
    Survey domain publications, analyze existing state of the art, and identify key limitations.
  </ChevronCardContent>
</ChevronCard>
```

### Multi-step Research Workflow

```vue
<div class="grid grid-cols-2 gap-4">
  <ChevronCard step="01" color="#0ea5e9">
    <ChevronCardHeading>Hypothesis</ChevronCardHeading>
    <ChevronCardContent>Formalize mathematical models and hypotheses.</ChevronCardContent>
  </ChevronCard>

  <ChevronCard step="02" color="#10b981">
    <ChevronCardHeading>Experiment</ChevronCardHeading>
    <ChevronCardContent>Gather empirical datasets and run benchmark tests.</ChevronCardContent>
  </ChevronCard>

  <ChevronCard step="03" color="#06b6d4">
    <ChevronCardHeading>Analysis</ChevronCardHeading>
    <ChevronCardContent>Evaluate statistical confidence and validate assumptions.</ChevronCardContent>
  </ChevronCard>

  <ChevronCard step="04" color="#f43f5e">
    <ChevronCardHeading>Conclusion</ChevronCardHeading>
    <ChevronCardContent>Publish findings and discuss future research directions.</ChevronCardContent>
  </ChevronCard>
</div>
```

### Slidev Configuration

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

---

## Props Reference (`ChevronCard`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `step` | `string \| number` | `'01'` | No | Step number or text inside the chevron badge. |
| `color` | `string` | `'#f59e0b'` | No | Primary accent color for the chevron badge. |
| `notchDepth` | `number` | `26` | No | Inward notch depth of the chevron point in pixels. |
| `chevronWidth` | `number` | `130` | No | Width of the chevron badge section in pixels. |
| `cardBg` | `string` | `'#f5f5f7'` | No | Background color for the card body. |
| `borderRadius` | `number` | `18` | No | Border radius for the card container in pixels. |
| `animation` | `boolean` | `true` | No | Controls whether entrance animation is applied. |
