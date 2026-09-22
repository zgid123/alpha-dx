# Table Comparison

Multi-column comparison matrix with colored column headers, criteria row labels, and cell values for comparing architectural solutions or tech stacks. Includes `TableComparison`, `TableComparisonCols`, `TableComparisonCol`, `TableComparisonRows`, `TableComparisonRow`, and `TableComparisonCell`.

## Purpose

Multi-column comparison matrix with colored column headers, criteria row labels, and styled cells for structured feature or capability comparisons.

**When to use**: When comparing 2-4 solutions across multiple criteria in a tabular format — tech stack evaluations, ablation studies, or feature matrices. Prefer this over `ArcComparison` when you have more than 4 criteria or need a compact data-dense layout.

## Presentation Preview

<TableComparisonDemo />

---

## Usage Examples

### Custom Matrix Structure

```vue
<TableComparison>
  <TableComparisonCols>
    <TableComparisonCol color="#3b82f6">
      TypeScript Skill
    </TableComparisonCol>
    <TableComparisonCol color="#10b981">
      Testing Skill
    </TableComparisonCol>
    <TableComparisonCol color="#f59e0b">
      Slidev Addon
    </TableComparisonCol>
  </TableComparisonCols>

  <TableComparisonRows>
    <TableComparisonRow title="Type Safety">
      <TableComparisonCell>Strict tsconfig</TableComparisonCell>
      <TableComparisonCell>Deterministic types</TableComparisonCell>
      <TableComparisonCell>Props contracts</TableComparisonCell>
    </TableComparisonRow>
    <TableComparisonRow title="Tooling">
      <TableComparisonCell>Biome & TS</TableComparisonCell>
      <TableComparisonCell>Vitest suites</TableComparisonCell>
      <TableComparisonCell>UnoCSS & Slidev</TableComparisonCell>
    </TableComparisonRow>
    <TableComparisonRow title="Outputs">
      <TableComparisonCell>Clean ESM modules</TableComparisonCell>
      <TableComparisonCell>Coverage reports</TableComparisonCell>
      <TableComparisonCell>Interactive decks</TableComparisonCell>
    </TableComparisonRow>
  </TableComparisonRows>
</TableComparison>
```

### Default Mockup

```vue
<TableComparison />
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

### `TableComparisonCell`

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `text` | `string \| number` | `undefined` | No | Text content fallback when default slot is not used. |
| `color` | `string` | `undefined` | No | Alias for cell background color. |
| `bg` | `string` | `undefined` | No | Cell background color override. |
| `textColor` | `string` | `undefined` | No | Cell text color override. |
| `borderRadius` | `number \| string` | `undefined` | No | Cell corner border radius override. |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` | No | Text alignment within the cell. |

---

## Child Components Summary

- `TableComparisonCols`: Header wrapper for column definitions.
- `TableComparisonCol`: Column header label and color definition.
- `TableComparisonRows`: Container for rows.
- `TableComparisonRow`: Row container with a criteria `title`.
- `TableComparisonCell`: Cell content matching the corresponding column index.
