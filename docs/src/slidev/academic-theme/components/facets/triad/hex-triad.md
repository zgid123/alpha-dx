# Hex Triad

Three-part interlocking hexagonal diagram for presenting research pillars, core theoretical foundations, or methodology phases within the Academic Theme. Includes `HexTriad`, `HexTriadCallout`, `HexTriadBadge`, `HexTriadHeading`, `HexTriadContent`, `HexTriadCenterBadge`, and `HexTriadLayer`.

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
