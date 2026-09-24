# Circular Pyramid

3D tiered circular pyramid process diagram with stacked circular discs, frosted glass blurred default layers, and an active sharp top layer. Includes `CircularPyramid`, `CircularPyramidStack`, `CircularPyramidStackTitle`, and `CircularPyramidStackContent`.

## Purpose

Tiered pyramid workflow where each tier is represented by a 3D circular disc. The default layers feature a frosted-glass blur effect, while the active layer is highlighted without blur in the vibrant theme color.

**When to use**: When presenting hierarchical stages, tiered architectures, capability layers, or maturity levels. Supports 1 to 6 circular layers with customizable theme colors and interactive layer activation.

## Presentation Preview

<CircularPyramidDemo />

---

## Usage Examples

### Compound Stacks Hierarchy

```vue
<CircularPyramid>
  <CircularPyramidStack>
    <CircularPyramidStackTitle>01 Strategy</CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      Define clear technical north stars, design systems, and cross-team alignment.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackTitle>02 Architecture</CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      Establish domain boundaries, type safety contracts, and scalable infrastructure.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackTitle>03 Implementation</CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      Build high-performance components with smooth motion and responsive layout.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackTitle>04 Verification</CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      Validate behavior with rigorous unit suites, formatting, and live slide builds.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
</CircularPyramid>
```

### Self-Contained Mockup with Custom Color

```vue
<CircularPyramid
  :count="6"
  :active-index="0"
  color="#6366f1"
/>
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
