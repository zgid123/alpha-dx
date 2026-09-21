# Speaker

Anchors speaker or team attribution and a formatted presentation date at the bottom of a slide.

## Presentation Preview

<SpeakerDemo />

---

## Usage Examples

### Single Author

```vue
<Speaker author="Alpha" date="2026-08-12" />
```

### Team Attribution

```vue
<Speaker :team="['Alpha', 'Beta']" date="2026-08-12" />
```

---

## Props Reference

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `date` | `string` | — | **Yes** | Date string (e.g. `'2026-08-12'`). Formatted as `dd/MM/yyyy` via `@alphacifer/core-utils/dateUtils`. |
| `author` | `string` | `'Alpha'` | No | Author name displayed when `team` is empty or omitted. |
| `team` | `string[]` | `[]` | No | List of team member names. When non-empty, replaces the single author line. |
