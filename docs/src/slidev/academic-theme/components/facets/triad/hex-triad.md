# Hex Triad

Three-part interlocking hexagonal diagram for presenting architectural pillars, core values, or sequential principles. Includes `HexTriad`, `HexTriadCallout`, `HexTriadBadge`, `HexTriadHeading`, `HexTriadContent`, `HexTriadCenterBadge`, and `HexTriadLayer`.

## Purpose

Three-part interlocking hexagonal diagram for presenting architectural pillars, core values, or sequential engineering principles with a synchronized center badge.

**When to use**: When you have exactly 3 equal-weight concepts that form a cohesive group — engineering pillars, design principles, or research dimensions. The hexagonal geometry emphasizes the interconnected nature of the items.

## Presentation Preview

<HexTriadDemo theme="academic" />

---

## Usage Examples

### Slotted Composition

```vue
<HexTriad title="Research Methodology" subtitle="Tri-fold empirical approach">
  <HexTriadCallout>
    <HexTriadBadge>01</HexTriadBadge>
    <HexTriadHeading>Formulation</HexTriadHeading>
    <HexTriadContent>Theoretical formulation and mathematical derivations.</HexTriadContent>
  </HexTriadCallout>
  <HexTriadCallout>
    <HexTriadBadge>02</HexTriadBadge>
    <HexTriadHeading>Empirical Study</HexTriadHeading>
    <HexTriadContent>Controlled experiments across representative datasets.</HexTriadContent>
  </HexTriadCallout>
  <HexTriadCallout>
    <HexTriadBadge>03</HexTriadBadge>
    <HexTriadHeading>Evaluation</HexTriadHeading>
    <HexTriadContent>Comparative benchmarks against baseline architectures.</HexTriadContent>
  </HexTriadCallout>
</HexTriad>
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

### Props Reference (`HexTriadCallout`)

*(No specific props. Inherits context from `HexTriad`.)*

### Props Reference (`HexTriadBadge`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `id` | `string \| number` | `undefined` | No | Overrides the badge number/text. |
| `color` | `string` | `undefined` | No | Inner circle color override. |
| `lightColor` | `string` | `undefined` | No | Hexagon border and background color override. |
