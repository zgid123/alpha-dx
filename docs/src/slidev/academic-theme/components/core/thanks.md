# Thanks

Composes closing "Thank You" artwork with geometric accent squares for academic defense and lecture presentations.

## Purpose

Composes a closing "Thank You" artwork with animated decorative geometric squares and styled typography.

**When to use**: On the final slide of your presentation. Use the `thanks` layout for zero-config setup, or compose manually with `ThanksContent` for custom placement.

## Presentation Preview

<ThanksDemo theme="academic" />

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

### Slidev Configuration

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

---

## Props Reference (`ThanksContent`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `animation` | `boolean` | `true` | No | Enables the animated entrance sequence. Set to `false` for static slides. |
