# ReflectedTitle

Creates a prominent presentation heading accompanied by a soft, mirrored inverted reflection underneath.

## Presentation Preview

<ReflectedTitleDemo theme="academic" />

---

## Usage Examples

### Basic Title

```vue
<ReflectedTitle title="Alpha's Academic Presentation" />
```

### Inside Academic Banner

```vue
<div class="rounded-xl bg-slate-900/70 p-10 text-center">
  <ReflectedTitle title="Distributed Architecture" />
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
| `title` | `string` | — | **Yes** | The heading text to display and reflect via CSS pseudo-element. |
