# Arrow Triad

Three-way curved arrow infographic with concentric dashed guide lines and customizable callout blocks. Includes `ArrowTriad`, `ArrowTriadCallout`, `ArrowTriadHeading`, `ArrowTriadContent`, and `ArrowTriadIcon`.

## Presentation Preview

<ArrowTriadDemo theme="academic" />

---

## Usage Examples

### Default Layout (`2-left-1-right`)

```vue
<ArrowTriad>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Hypothesis</ArrowTriadHeading>
    <ArrowTriadContent>
      Define theoretical models and expected outcomes.
    </ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Experiment</ArrowTriadHeading>
    <ArrowTriadContent>
      Execute controlled tests with automated data recording.
    </ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Evaluation</ArrowTriadHeading>
    <ArrowTriadContent>
      Perform rigorous statistical validation on results.
    </ArrowTriadContent>
  </ArrowTriadCallout>
</ArrowTriad>
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

## Props Reference (`ArrowTriad`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `layout` | `'2-left-1-right' \| '1-left-2-right' \| '2-left' \| '1-left'` | `'2-left-1-right'` | No | Arrangement of the callout blocks around the arrows. |
| `animation` | `boolean` | `true` | No | Enables entrance animation sequence. |
| `triangleHead` | `boolean` | `true` | No | Shows or hides triangle arrow heads. |
| `neckLine` | `boolean` | `true` | No | Shows or hides dashed connector guide lines. |
| `scale` | `number` | `undefined` | No | Explicit scale multiplier for the diagram. |
| `autoScale` | `boolean` | `true` | No | Automatically scales diagram to fit slide height. |
