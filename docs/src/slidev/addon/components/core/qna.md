# QnA

Renders an animated "Q & A" title sequence designed for transition slides and closing Q&A sessions.

## Presentation Preview

<QnADemo />

---

## Usage Examples

### Default Delay

```vue
<QnA />
```

### Instant Playback

```vue
<QnA :start-delay="0" />
```

---

## Props Reference

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `startDelay` | `number` | `11500` | No | Delay in milliseconds before triggering the entrance motion sequence. |
