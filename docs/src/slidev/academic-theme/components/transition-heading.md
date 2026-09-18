# TransitionHeading

Coordinates heading position transitions between a centered opening state and a standard top-corner slide title position within the Academic Theme.

## Presentation Preview

<TransitionHeadingDemo theme="academic" />

---

## Usage Examples

### Slidev Click Integration

```vue
---
clicks: 1
---

<TransitionHeading :center="$clicks === 0">
  <h1>An Academic Title</h1>
</TransitionHeading>

<div
  class="mt-24 transition-opacity duration-500"
  :class="$clicks === 0 ? 'opacity-0' : 'opacity-100'"
>
  <p>Body content revealed on the first click.</p>
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

## Props Reference

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `center` | `boolean` | `false` | No | When `true`, centers the heading in the middle of the slide. |
| `idle` | `boolean` | `false` | No | When `true`, places the heading in the standard top-left slide title location. |

---

## Slots Reference

| Slot | Description |
| :--- | :--- |
| `default` | Heading markup (e.g. `<h1>Title</h1>`). |
