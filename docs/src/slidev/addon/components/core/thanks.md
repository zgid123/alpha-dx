# Thanks

Composes closing "Thank You" artwork with animated geometric accent squares. Includes the `ThanksContent`, `ThanksSquare`, and `ThanksOutlineSquare` components.

## Presentation Preview

<ThanksDemo />

---

## Usage Examples

### Full Composition

```vue
<ThanksContent :animation="true" />
```

### Static Display

```vue
<ThanksContent :animation="false" />
```

### Individual Decorative Squares

```vue
<ThanksSquare class="left-20 top-20 h-28 w-28 bg-cyan-400" />
<ThanksOutlineSquare class="right-20 top-20 h-28 w-28 border-cyan-300" />
```

---

## Props Reference (`ThanksContent`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `animation` | `boolean` | `true` | No | Enables the animated entrance sequence. Set to `false` for static slides. |

---

## Related Layout

The addon also provides a preconfigured closing slide layout:

```md
---
layout: thanks
---
```
