# ReflectedTitle

Creates a large, prominent presentation heading accompanied by a soft, mirrored inverted reflection underneath.

## Purpose

Creates a large display heading with a mirrored CSS reflection effect underneath for visual emphasis.

**When to use**: On hero slides or section dividers where you want a dramatic title treatment. Works best with dark backgrounds or inside banner containers.

## Presentation Preview

<ReflectedTitleDemo />

---

## Usage Examples

### Basic Title

```vue
<ReflectedTitle title="Alpha's Slidev Addon" />
```

### Inside Dark Banner

```vue
<div class="rounded-xl bg-slate-900/70 p-10 text-center">
  <ReflectedTitle title="Distributed Architecture" />
</div>
```

---

## Props Reference

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `title` | `string` | — | **Yes** | The heading text to display and reflect via CSS pseudo-element. |
