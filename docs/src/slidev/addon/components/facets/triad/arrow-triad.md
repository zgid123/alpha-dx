# Arrow Triad

Three-way curved arrow infographic with concentric dashed guide lines and customizable callout blocks. Includes `ArrowTriad`, `ArrowTriadCallout`, `ArrowTriadHeading`, `ArrowTriadContent`, and `ArrowTriadIcon`.

## Purpose

Three-way curved arrow infographic for visualizing cyclical relationships, interdependent processes, or three pillars of a methodology.

**When to use**: When presenting three interconnected concepts that flow into each other — development cycles, feedback loops, or three-pillar frameworks. Choose layout variants to control callout arrangement.

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

### Props Reference (`ArrowTriadCallout`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `id` | `string \| number` | `undefined` | No | Override internal ID. |
| `index` | `number` | `undefined` | No | Override auto-registered index (0, 1, or 2). |
| `icon` | `string \| object \| false` | `undefined` | No | Iconifier icon name or object. |
| `color` | `string` | `undefined` | No | Accent color override. |
| `cardBg` | `string` | `undefined` | No | Background color of the callout card. |
| `textColor` | `string` | `undefined` | No | Text color for description. |
| `titleColor` | `string` | `undefined` | No | Text color for title. |
| `title` | `string` | `undefined` | No | Title text. |
| `description` | `string` | `undefined` | No | Description text. |
