# Square Pyramid

3D tiered square pyramid process diagram with stacked isometric square slabs, frosted glass translucent default layers, and an active sharp top layer. Includes `SquarePyramid`, `SquarePyramidStack`, `SquarePyramidStackTitle`, and `SquarePyramidStackContent`.

## Purpose

Tiered pyramid workflow where each tier is represented by a 3D isometric square slab with rounded corners and glassmorphism styling. The default layers feature a frosted-glass translucent effect with an inner highlight plate, while the active layer is highlighted without blur in the vibrant theme color with drop shadows.

**When to use**: When presenting hierarchical stages, tiered architectures, capability layers, or maturity levels with modern geometric square slabs. Supports 1 to 6 square layers with customizable theme colors and interactive layer activation.

## Presentation Preview

<SquarePyramidDemo />

---

## Usage Examples

### Compound Stacks Hierarchy

```vue
<SquarePyramid>
  <SquarePyramidStack>
    <SquarePyramidStackTitle>01 Strategy</SquarePyramidStackTitle>
    <SquarePyramidStackContent>
      Define clear technical north stars, design systems, and cross-team alignment.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackTitle>02 Architecture</SquarePyramidStackTitle>
    <SquarePyramidStackContent>
      Establish domain boundaries, type safety contracts, and scalable infrastructure.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackTitle>03 Implementation</SquarePyramidStackTitle>
    <SquarePyramidStackContent>
      Build high-performance components with smooth motion and responsive layout.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackTitle>04 Verification</SquarePyramidStackTitle>
    <SquarePyramidStackContent>
      Validate behavior with rigorous unit suites, formatting, and live slide builds.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
</SquarePyramid>
```

### Self-Contained Mockup with Custom Color

```vue
<SquarePyramid
  :count="6"
  :active-index="0"
  color="#6366f1"
/>
```

---

## Props Reference (`SquarePyramid`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `count` | `number` | `undefined` | No | Number of square layers (1 to 6). Inferred from slotted stacks if omitted. |
| `activeIndex` | `number` | `-1` | No | Index of the active square layer (0 = top). Rendered sharp with vibrant glow. |
| `color` | `string` | `'#3b82f6'` | No | Primary theme color. Dynamically computes active and translucent frosted glass gradients. |
| `colors` | `string[]` | `undefined` | No | Custom color palette per layer. Defaults to multi-hue palette (pink, purple, blue, cyan, teal, amber). |
| `interactive` | `boolean` | `true` | No | Enables clicking layers or stacks to change the active layer. |
| `animation` | `boolean` | `true` | No | Enables entrance and staggered floating animations. |
| `autoScale` | `boolean` | `true` | No | Enables responsive diagram scaling. |
| `width` | `number \| string` | `undefined` | No | Container width. |
| `height` | `number \| string` | `undefined` | No | Container height. |

---

## Child Components

- `SquarePyramidStack`: Container for each tier representing one square slab, title pill, and description card.
- `SquarePyramidStackTitle`: Left pill badge with step number, title, and connector line to the square slab.
- `SquarePyramidStackContent`: Right card box with detailed description text.
