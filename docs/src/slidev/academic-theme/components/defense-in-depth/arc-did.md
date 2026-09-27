# Arc Defense-in-Depth (ArcDiD)

Concentric semicircular security defense-in-depth diagram with stacked arc layers, top-center titles, and radial control indicator pins for academic and research presentations. Includes `ArcDiD`, `ArcDiDLayer`, `ArcDiDLayerTitle`, `ArcDiDLayerParts`, and `ArcDiDLayerPart`.

## Purpose

Visualize layered defense-in-depth security architectures, multi-tier threat models, or layered conceptual domains where controls are organized into concentric protective rings.

**When to use**: Cybersecurity research papers, security baseline proposals, layered protocols, access governance frameworks, and threat mitigation models.

## Presentation Preview

<ArcDiDDemo theme="academic" />

---

## Usage Examples

### Compound Layers Hierarchy

```vue
<ArcDiD>
  <ArcDiDLayer>
    <ArcDiDLayerTitle>Physical
controls</ArcDiDLayerTitle>
    <ArcDiDLayerParts>
      <ArcDiDLayerPart>Access to servers</ArcDiDLayerPart>
      <ArcDiDLayerPart>Infrastructure</ArcDiDLayerPart>
    </ArcDiDLayerParts>
  </ArcDiDLayer>

  <ArcDiDLayer>
    <ArcDiDLayerTitle>Administrative
controls</ArcDiDLayerTitle>
    <ArcDiDLayerParts>
      <ArcDiDLayerSector>
        <ArcDiDLayerPart position="top">Approved destinations</ArcDiDLayerPart>
        <ArcDiDLayerPart position="bottom">Data-sharing policy</ArcDiDLayerPart>
      </ArcDiDLayerSector>
      <ArcDiDLayerPart>Staff procedures</ArcDiDLayerPart>
    </ArcDiDLayerParts>
  </ArcDiDLayer>

  <ArcDiDLayer>
    <ArcDiDLayerTitle>Technical
controls</ArcDiDLayerTitle>
    <ArcDiDLayerParts>
      <ArcDiDLayerPart>Authentication</ArcDiDLayerPart>
      <ArcDiDLayerSector :span="46" rotate="tangent">
        <ArcDiDLayerPart position="top">Access control</ArcDiDLayerPart>
        <ArcDiDLayerPart position="bottom">Encryption</ArcDiDLayerPart>
      </ArcDiDLayerSector>
      <ArcDiDLayerSector>
        <ArcDiDLayerPart position="top">DDM</ArcDiDLayerPart>
        <ArcDiDLayerPart position="bottom">DLP</ArcDiDLayerPart>
      </ArcDiDLayerSector>
      <ArcDiDLayerPart>Audit</ArcDiDLayerPart>
    </ArcDiDLayerParts>
  </ArcDiDLayer>
</ArcDiD>
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

## Props Reference (`ArcDiD`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `order` | `'outer-to-inner' \| 'inner-to-outer'` | `'outer-to-inner'` | No | Direction of layer nesting. |
| `count` | `number` | `undefined` | No | Number of layers (1 to 6). Inferred from slotted layers if omitted. |
| `activeIndex` | `number` | `-1` | No | Index of the active layer (-1 for all active). |
| `activePart` | `string \| number` | `undefined` | No | Label or index of a specific part to highlight. |
| `color` | `string` | `'#0ea5e9'` | No | Primary base theme color. Generates a balanced layered gradient palette. |
| `colors` | `string[]` | `undefined` | No | Optional explicit array of layer colors. |
| `interactive` | `boolean` | `true` | No | Enables clicking layers to highlight them. |
| `animation` | `boolean` | `true` | No | Enables entrance animations. |
| `autoScale` | `boolean` | `true` | No | Enables responsive diagram scaling via `useDiagramAutoScale`. |
| `width` | `number \| string` | `undefined` | No | Container width. |
| `height` | `number \| string` | `undefined` | No | Container height. |
| `innerRadius` | `number` | `110` | No | Radius of the inner cutout semicircle. |
| `outerRadius` | `number` | `390` | No | Radius of the outermost arc layer. |
| `gap` | `number` | `3` | No | Spacing between concentric arc layers. |
| `showDecorativeArcs` | `boolean` | `true` | No | Renders outer decorative radar/shield accent lines. |

---

## Child Components

- `ArcDiDLayer`: Concentric arc layer provider. Props: `title`, `color`, `textColor`, `index`, `active`.
- `ArcDiDLayerTitle`: Centered title pill at the top of the arc band.
- `ArcDiDLayerParts`: Container wrapper for layer parts and sectors.
- `ArcDiDLayerSector`: Groups multiple vertically/radially stacked parts in a shared angular sector. Props: `split` (optional concentric divider arc lines), `angle`, `span`, `color`, `rotate` (`boolean | number | 'tangent' | 'auto'`), `skew` (`number | string`).
- `ArcDiDLayerPart`: Individual control pin and label. Props: `label`, `position` (`'top' | 'middle' | 'bottom' | 'center'`), `maxWidth`, `angle`, `radius`, `radialOffset`, `rotate` (`boolean | number | 'tangent' | 'auto'`), `skew` (`number | string`), `active` (`boolean`), `color`, `icon`, `showDot`.
