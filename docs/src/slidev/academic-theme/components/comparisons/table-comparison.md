# Table Comparison

Multi-column comparison matrix with colored column headers, criteria row labels, and cell values for comparing experimental models, baseline algorithms, or ablation studies. Includes `TableComparison`, `TableComparisonCols`, `TableComparisonCol`, `TableComparisonRows`, `TableComparisonRow`, and `TableComparisonCell`.

## Presentation Preview

<TableComparisonDemo theme="academic" />

---

## Usage Examples

### Ablation Matrix Structure

```vue
<TableComparison>
  <TableComparisonCols>
    <TableComparisonCol color="#0ea5e9">
      Baseline Model
    </TableComparisonCol>
    <TableComparisonCol color="#10b981">
      Proposed Model
    </TableComparisonCol>
    <TableComparisonCol color="#f59e0b">
      Ablated Variant
    </TableComparisonCol>
  </TableComparisonCols>

  <TableComparisonRows>
    <TableComparisonRow title="Accuracy">
      <TableComparisonCell>82.4%</TableComparisonCell>
      <TableComparisonCell>94.1%</TableComparisonCell>
      <TableComparisonCell>88.7%</TableComparisonCell>
    </TableComparisonRow>
    <TableComparisonRow title="Latency">
      <TableComparisonCell>120 ms</TableComparisonCell>
      <TableComparisonCell>28 ms</TableComparisonCell>
      <TableComparisonCell>45 ms</TableComparisonCell>
    </TableComparisonRow>
    <TableComparisonRow title="Parameters">
      <TableComparisonCell>110M</TableComparisonCell>
      <TableComparisonCell>25M</TableComparisonCell>
      <TableComparisonCell>25M</TableComparisonCell>
    </TableComparisonRow>
  </TableComparisonRows>
</TableComparison>
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

## Props Reference

### `TableComparison`

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `cellBg` | `string` | `'#d6e5ef'` | No | Background color for body table cells. |
| `cellColor` | `string` | `'#475569'` | No | Text color for table body cells. |
| `rowHeaderColor` | `string` | `'#2e8b9a'` | No | Background color for row title header cells. |
| `rowHeaderTextColor` | `string` | `'#ffffff'` | No | Text color for row title header cells. |
| `colHeaderTextColor` | `string` | `'#ffffff'` | No | Text color for column header cells. |
| `borderRadius` | `number \| string` | `'8px'` | No | Border radius for cells and headers. |
| `rowHeaderWidth` | `number \| string` | `'160px'` | No | Fixed width for the criteria header column. |
| `spacing` | `number \| string` | `'6px'` | No | Cell grid spacing gap. |
| `tableLayout` | `'fixed' \| 'auto'` | `'fixed'` | No | CSS table layout algorithm. |
| `dense` | `boolean` | `false` | No | Enables compact row padding. |
| `animation` | `boolean` | `true` | No | Enables staggered row entrance animation. |

### `TableComparisonCol`

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `color` | `string` | `auto` | No | Column header background theme color. |
| `textColor` | `string` | `undefined` | No | Header text color override. |
| `width` | `number \| string` | `undefined` | No | Explicit column width. |

### `TableComparisonRow`

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `title` | `string` | `undefined` | No | Row criteria label displayed in the left header. |
| `color` | `string` | `undefined` | No | Header background color override for this row. |
| `textColor` | `string` | `undefined` | No | Header text color override for this row. |

---

## Child Components Summary

- `TableComparisonCols`: Header wrapper for column definitions.
- `TableComparisonCol`: Column header label and color definition.
- `TableComparisonRows`: Container for rows.
- `TableComparisonRow`: Row container with a criteria `title`.
- `TableComparisonCell`: Cell content matching the corresponding column index.
