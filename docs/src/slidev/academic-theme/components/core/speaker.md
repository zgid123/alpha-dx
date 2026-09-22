# Speaker

Anchors speaker or team attribution and a formatted presentation date at the bottom of a slide within the **Academic Theme**.

## Purpose

Provides consistent speaker, researcher, or author attribution at the bottom of any slide. Anchors the presenter name (or team list) and formatted date.

**When to use**: On cover, intro, or end slides where you need to display who is presenting and the presentation date. Prefer `team` prop when multiple presenters share the stage.

## Presentation Preview

<SpeakerDemo theme="academic" />

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

### Slidev Configuration

To use the Speaker component in an Academic presentation, enable the addon in your frontmatter:

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
| `date` | `string` | — | **Yes** | Date string (e.g. `'2026-08-12'`). Formatted as `dd/MM/yyyy` via `@alphacifer/core-utils/dateUtils`. |
| `author` | `string` | `'Alpha'` | No | Author name displayed when `team` is empty or omitted. |
| `team` | `string[]` | `[]` | No | List of team member names. When non-empty, replaces the single author line. |
