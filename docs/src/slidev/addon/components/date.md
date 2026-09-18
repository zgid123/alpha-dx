# Date

Formats presentation dates consistently across slides as `dd/MM/yyyy`, defaulting to the current date when omitted.

## Presentation Preview

<DateDemo />

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

---

## Props Reference

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `date` | `string` | `undefined` | No | Date string accepted by the JavaScript `Date` constructor. Formats to `dd/MM/yyyy` using `@alphacifer/core-utils/dateUtils`. When omitted, uses today's date. |
