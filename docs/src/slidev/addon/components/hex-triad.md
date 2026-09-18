# Hex Triad

Three-part interlocking hexagonal diagram for presenting architectural pillars, core values, or sequential principles. Includes `HexTriad`, `HexTriadCallout`, `HexTriadBadge`, `HexTriadHeading`, `HexTriadContent`, `HexTriadCenterBadge`, and `HexTriadLayer`.

## Presentation Preview

<HexTriadDemo />

---

## Usage Examples

### Slotted Composition

```vue
<HexTriad title="Engineering Pillars" subtitle="Core design principles">
  <HexTriadCallout>
    <HexTriadBadge>01</HexTriadBadge>
    <HexTriadHeading>Performance</HexTriadHeading>
    <HexTriadContent>Fast builds, instant feedback, and zero-overhead runtime.</HexTriadContent>
  </HexTriadCallout>
  <HexTriadCallout>
    <HexTriadBadge>02</HexTriadBadge>
    <HexTriadHeading>Reliability</HexTriadHeading>
    <HexTriadContent>Strict type safety paired with deterministic test suites.</HexTriadContent>
  </HexTriadCallout>
  <HexTriadCallout>
    <HexTriadBadge>03</HexTriadBadge>
    <HexTriadHeading>Scalability</HexTriadHeading>
    <HexTriadContent>Seamless growth across packages, tools, and workflows.</HexTriadContent>
  </HexTriadCallout>
</HexTriad>
```

---

## Props Reference (`HexTriad`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `title` | `string` | `undefined` | No | Main diagram header title. |
| `subtitle` | `string` | `undefined` | No | Subtitle text displayed below the title. |
| `animation` | `boolean` | `true` | No | Enables the entrance animation sequence. |
| `items` | `readonly IHexTriadItem[]` | `undefined` | No | Array of item objects as an alternative to slot children. |
| `startDelay` | `number` | `undefined` | No | Animation delay offset in milliseconds. |

---

## Child Components

- `HexTriadCallout`: Container for each pillar callout.
- `HexTriadBadge`: Displays the badge number or icon synchronized with the center hexagon.
- `HexTriadHeading`: Heading text for the callout.
- `HexTriadContent`: Description body for the callout.
