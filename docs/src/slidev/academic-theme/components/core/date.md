# Date

Formats presentation dates consistently across academic slides as `dd/MM/yyyy`, defaulting to the current date when omitted.

## Purpose

Renders a consistently formatted presentation date (`dd/MM/yyyy`).

**When to use**: Whenever you need a standalone formatted date stamp — typically inside custom cover layouts or footer components. If you need date + author together, use `Speaker` instead.

## Presentation Preview

<DateDemo theme="academic" />

---

## Usage Examples

### Custom Date

```vue
<Date date="2026-08-12" />
```

### Current Date Fallback

```vue
<Date />
```

### Slidev Configuration

To use the Date component in an Academic presentation, enable the addon in your frontmatter:

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
| `date` | `string` | `undefined` | No | Date string accepted by the JavaScript `Date` constructor. Formats to `dd/MM/yyyy` using `@alphacifer/core-utils/dateUtils`. When omitted, uses today's date. |
