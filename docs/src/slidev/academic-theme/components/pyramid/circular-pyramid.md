# Circular Pyramid

3D tiered circular pyramid process diagram with stacked circular discs, frosted glass blurred default layers, and an active sharp top layer. Includes `CircularPyramid`, `CircularPyramidStack`, `CircularPyramidStackTitle`, and `CircularPyramidStackContent`.

## Purpose

Tiered pyramid workflow where each tier is represented by a 3D circular disc. The default layers feature a frosted-glass blur effect, while the active layer is highlighted without blur in the vibrant theme color.

**When to use**: When presenting hierarchical stages, tiered architectures, research levels, or capability tiers in academic and technical decks. Supports 1 to 6 circular layers.

## Presentation Preview

<CircularPyramidDemo theme="academic" />

---

## Usage Examples

### Compound Stacks Hierarchy

```vue
<CircularPyramid>
  <CircularPyramidStack>
    <CircularPyramidStackTitle>01 Problem Definition</CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      Formalize domain constraints and research objectives.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackTitle>02 Methodology</CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      Implement the proposed algorithm with reproducible pipelines.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackTitle>03 Empirical Study</CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      Conduct empirical evaluation across standard academic benchmarks.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackTitle>04 Discussion</CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      Synthesize insights, limitations, and future research directions.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
</CircularPyramid>
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

## Props Reference (`CircularPyramid`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `count` | `number` | `undefined` | No | Number of circular layers (1 to 6). Inferred from slotted stacks if omitted. |
| `activeIndex` | `number` | `0` | No | Index of the active circular layer (0 = top). Rendered sharp without blur. |
| `color` | `string` | `'#3b82f6'` | No | Primary theme color. Dynamically computes active and blurred frosted glass gradients. |
| `interactive` | `boolean` | `true` | No | Enables clicking layers or stacks to change the active layer. |
| `animation` | `boolean` | `true` | No | Enables entrance and floating animations. |
| `autoScale` | `boolean` | `true` | No | Enables responsive diagram scaling. |
| `width` | `number \| string` | `undefined` | No | Container width. |
| `height` | `number \| string` | `undefined` | No | Container height. |

---

## Child Components

- `CircularPyramidStack`: Container for each tier representing one circular disc, title pill, and description card.
- `CircularPyramidStackTitle`: Left pill badge with step number, title, and connector line to the circular disc.
- `CircularPyramidStackContent`: Right card box with detailed description text.
