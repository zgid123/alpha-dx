# QnA

Renders an animated "Q & A" title sequence designed for transition slides and closing Q&A sessions.

## Purpose

Renders an animated "Q & A" title composition with entrance motion effects.

**When to use**: On the final or penultimate slide of your talk to signal the Q&A session. Typically used inside an `end` or `thanks` layout. Adjust `startDelay` for immediate or delayed playback.

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
