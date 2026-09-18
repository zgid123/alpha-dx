# Arrow Triad

Three-way curved arrow infographic with concentric dashed guide lines and customizable callout blocks. Includes `ArrowTriad`, `ArrowTriadCallout`, `ArrowTriadHeading`, `ArrowTriadContent`, and `ArrowTriadIcon`.

## Presentation Preview

<ArrowTriadDemo />

---

## Usage Examples

### Default Layout (`2-left-1-right`)

```vue
<ArrowTriad>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Architect</ArrowTriadHeading>
    <ArrowTriadContent>
      Design clear domain boundaries and clean abstractions.
    </ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Implement</ArrowTriadHeading>
    <ArrowTriadContent>
      Construct robust type-safe utilities with automated test suites.
    </ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Deliver</ArrowTriadHeading>
    <ArrowTriadContent>
      Ship packages, generate presentations, and maintain high standards.
    </ArrowTriadContent>
  </ArrowTriadCallout>
</ArrowTriad>
```

### Inverted Layout (`1-left-2-right`)

```vue
<ArrowTriad layout="1-left-2-right" :animation="false">
  <ArrowTriadCallout title="Step 1" description="Initial assessment" />
  <ArrowTriadCallout title="Step 2" description="Execution phase" />
  <ArrowTriadCallout title="Step 3" description="Review and retro" />
</ArrowTriad>
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

---

## Child Components

- `ArrowTriadCallout`: Individual callout container.
- `ArrowTriadHeading`: Callout header text.
- `ArrowTriadContent`: Callout body content.
- `ArrowTriadIcon`: Optional icon container for each callout.
