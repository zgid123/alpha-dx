# Table Comparison

Multi-column comparison matrix with colored column headers, criteria row labels, and cell values for comparing experimental models, baseline algorithms, or ablation studies. Includes `TableComparison`, `TableComparisonColumns`, `TableComparisonColumn`, `TableComparisonRows`, `TableComparisonRow`, and `TableComparisonCell`.

## Purpose

Multi-column comparison matrix with colored column headers, criteria row labels, and styled cells for structured feature or capability comparisons.

**When to use**: When comparing 2-4 solutions across multiple criteria in a tabular format — tech stack evaluations, ablation studies, or feature matrices. Prefer this over `ArcComparison` when you have more than 4 criteria or need a compact data-dense layout.

## Presentation Preview

<TableComparisonDemo theme="academic" />

---

## Usage Examples

### Ablation Matrix Structure

```vue
<TableComparison>
  <TableComparisonColumns>
    <TableComparisonColumn color="#0ea5e9">
      Baseline Model
    </TableComparisonColumn>
    <TableComparisonColumn color="#10b981">
      Proposed Model
    </TableComparisonColumn>
    <TableComparisonColumn color="#f59e0b">
      Ablated Variant
    </TableComparisonColumn>
  </TableComparisonColumns>

  <TableComparisonRows>
    <TableComparisonRow>
      <template #heading>Accuracy</template>
      <TableComparisonCell>82.4%</TableComparisonCell>
      <TableComparisonCell>94.1%</TableComparisonCell>
      <TableComparisonCell>88.7%</TableComparisonCell>
    </TableComparisonRow>
    <TableComparisonRow>
      <template #heading>Latency</template>
      <TableComparisonCell>120 ms</TableComparisonCell>
      <TableComparisonCell>28 ms</TableComparisonCell>
      <TableComparisonCell>45 ms</TableComparisonCell>
    </TableComparisonRow>
    <TableComparisonRow>
      <template #heading>Parameters</template>
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

- **Rendered Class:** `.alpha-table-comparison`
- **Rendered HTML Tag:** `<div>`
- **Role:** Main matrix container wrapping the responsive table and applying design token styles.

| Prop                 | Type                | Default     | Required | Description                                  |
| :------------------- | :------------------ | :---------- | :------: | :------------------------------------------- |
| `cellBg`             | `string`            | `'#d6e5ef'` |    No    | Background color for body table cells.       |
| `cellColor`          | `string`            | `'#475569'` |    No    | Text color for table body cells.             |
| `rowHeaderColor`     | `string`            | `'#2e8b9a'` |    No    | Background color for row title header cells. |
| `rowHeaderTextColor` | `string`            | `'#ffffff'` |    No    | Text color for row title header cells.       |
| `colHeaderTextColor` | `string`            | `'#ffffff'` |    No    | Text color for column header cells.          |
| `borderRadius`       | `number \| string`  | `'8px'`     |    No    | Border radius for cells and headers.         |
| `rowHeaderWidth`     | `number \| string`  | `'160px'`   |    No    | Fixed width for the criteria header column.  |
| `spacing`            | `number \| string`  | `'6px'`     |    No    | Cell grid spacing gap.                       |
| `tableLayout`        | `'fixed' \| 'auto'` | `'fixed'`   |    No    | CSS table layout algorithm.                  |
| `dense`              | `boolean`           | `false`     |    No    | Enables compact row padding.                 |
| `animation`          | `boolean`           | `true`      |    No    | Enables staggered row entrance animation.    |

### `TableComparisonColumns`

- **Rendered Class:** `.alpha-table-comparison-cols` (also renders `.alpha-table-comparison-corner`)
- **Rendered HTML Tag:** `<tr>` inside `<thead>`
- **Role:** Column definitions container header row.

Container component for column definitions. Takes no specific props and forwards attributes to its `<tr>` header row while rendering child `<TableComparisonColumn>` elements in its default slot.

### `TableComparisonColumn`

- **Rendered Class:** `.alpha-table-comparison-col`
- **Rendered HTML Tag:** `<th>`
- **Role:** Individual column header cell defining the column title, width, and theme.

| Prop        | Type               | Default     | Required | Description                           |
| :---------- | :----------------- | :---------- | :------: | :------------------------------------ |
| `color`     | `string`           | `auto`      |    No    | Column header background theme color. |
| `textColor` | `string`           | `undefined` |    No    | Header text color override.           |
| `width`     | `number \| string` | `undefined` |    No    | Explicit column width.                |

### `TableComparisonRows`

- **Rendered Class:** `.alpha-table-comparison-rows`
- **Rendered HTML Tag:** `<tbody>`
- **Role:** Table body container for criteria rows.

Container component for comparison rows. Takes no specific props and forwards attributes to its `<tbody>` table section while rendering child `<TableComparisonRow>` elements in its default slot.

### `TableComparisonRow`

- **Rendered Class:** `.alpha-table-comparison-row` (also renders `.alpha-table-comparison-row-title`)
- **Rendered HTML Tag:** `<tr>`
- **Role:** Comparison criteria row holding the title header and child data cells.

| Prop        | Type     | Default     | Required | Description                                      |
| :---------- | :------- | :---------- | :------: | :----------------------------------------------- |
| `title`     | `string` | `undefined` |    No    | Row criteria label displayed in the left header. |
| `color`     | `string` | `undefined` |    No    | Header background color override for this row.   |
| `textColor` | `string` | `undefined` |    No    | Header text color override for this row.         |

### `TableComparisonCell`

- **Rendered Class:** `.alpha-table-comparison-cell`
- **Rendered HTML Tag:** `<td>`
- **Role:** Individual data comparison value cell.

| Prop           | Type                            | Default     | Required | Description                                          |
| :------------- | :------------------------------ | :---------- | :------: | :--------------------------------------------------- |
| `text`         | `string \| number`              | `undefined` |    No    | Text content fallback when default slot is not used. |
| `color`        | `string`                        | `undefined` |    No    | Alias for cell background color.                     |
| `bg`           | `string`                        | `undefined` |    No    | Cell background color override.                      |
| `textColor`    | `string`                        | `undefined` |    No    | Cell text color override.                            |
| `borderRadius` | `number \| string`              | `undefined` |    No    | Cell corner border radius override.                  |
| `align`        | `'left' \| 'center' \| 'right'` | `'center'`  |    No    | Text alignment within the cell.                      |

---

## Child Components Summary

- `TableComparisonColumns`: Header wrapper for column definitions.
- `TableComparisonColumn`: Column header label and color definition.
- `TableComparisonRows`: Container for rows.
- `TableComparisonRow`: Row container with a criteria `title`.
- `TableComparisonCell`: Cell content matching the corresponding column index.

---

## Customization Guidelines

### 1. Design Tokens & CSS Variables

You can customize the matrix theme globally in slide frontmatter or locally on the component using the `:style` attribute:

| Variable                                    | Default                                    | Description                           |
| :------------------------------------------ | :----------------------------------------- | :------------------------------------ |
| `--alpha-table-comparison-cell`             | `var(--alpha-foreground-primary, #475569)` | Cell body text color.                 |
| `--alpha-table-comparison-cell-bg`          | `#d6e5ef`                                  | Cell body background color.           |
| `--alpha-table-comparison-col`              | `#ffffff`                                  | Column header text color.             |
| `--alpha-table-comparison-col-1-background` | `#354f82`                                  | Background color for column 1.        |
| `--alpha-table-comparison-col-2-background` | `#5b8bb3`                                  | Background color for column 2.        |
| `--alpha-table-comparison-col-3-background` | `#00a8a8`                                  | Background color for column 3.        |
| `--alpha-table-comparison-row`              | `#ffffff`                                  | Criteria row header text color.       |
| `--alpha-table-comparison-row-bg`           | `#2e8b9a`                                  | Criteria row header background color. |

```vue
<!-- Example: Customizing colors via CSS variables -->
<TableComparison
  :style="{
    '--alpha-table-comparison-cell-bg': '#f8fafc',
    '--alpha-table-comparison-cell': '#0f172a',
    '--alpha-table-comparison-row-bg': '#475569'
  }"
>
  <!-- table matrix content -->
</TableComparison>
```

### 2. UnoCSS Utility Styling

`TableComparison` passes forwarded attributes through `useMergedUnoAttrs`. You can pass UnoCSS utility classes to customize the wrapper elevation, width, and margins:

```vue
<TableComparison class="max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden">
  <!-- columns and rows -->
</TableComparison>
```

### 3. Component CSS Classes & Stylesheet Overrides

Slidev presentations support two primary styling approaches:
1. **UnoCSS utility classes** (`class="..."`) for direct inline styling.
2. **CSS stylesheet overrides** (`style.css` or slide `<style>` blocks) when you need to target internal elements, apply complex hover interactions, or enforce a global theme across multiple slides.

#### Rendered DOM Structure

The following tree shows the HTML elements and classes produced by each component:

```html
<!-- <TableComparison> (Root container) -->
<div class="alpha-table-comparison">
  <div class="alpha-table-comparison-wrapper">
    <table>

      <!-- Header Row Container (<TableComparisonColumns>) -->
      <thead>
        <tr class="alpha-table-comparison-cols">
          <!-- Top-left empty corner cell -->
          <th class="alpha-table-comparison-corner" />

          <!-- Column Header Cell (<TableComparisonColumn>) -->
          <th class="alpha-table-comparison-col">Model Alpha</th>
          <th class="alpha-table-comparison-col">Model Beta</th>
        </tr>
      </thead>

      <!-- Table Body Container (<TableComparisonRows>) -->
      <tbody class="alpha-table-comparison-rows">
        <!-- Criteria Row Container (<TableComparisonRow>) -->
        <tr class="alpha-table-comparison-row">
          <!-- Left-side criteria header cell -->
          <th class="alpha-table-comparison-row-title">Accuracy</th>

          <!-- Data Comparison Value Cells (<TableComparisonCell>) -->
          <td class="alpha-table-comparison-cell">94.2%</td>
          <td class="alpha-table-comparison-cell">89.1%</td>
        </tr>
      </tbody>

    </table>
  </div>
</div>
```

#### Class Reference Table

| Component                  | Target Element     | Rendered Class                      | Purpose & Description                                   |
| :------------------------- | :----------------- | :---------------------------------- | :------------------------------------------------------ |
| `<TableComparison>`        | Root container     | `.alpha-table-comparison`           | Main outer component container.                         |
| `<TableComparison>`        | Responsive wrapper | `.alpha-table-comparison-wrapper`   | Overflow and centering scroll wrapper for table grid.   |
| `<TableComparisonColumns>` | Column header row  | `.alpha-table-comparison-cols`      | `<tr>` header row grouping all column titles.           |
| `<TableComparisonColumns>` | Corner spacer      | `.alpha-table-comparison-corner`    | Top-left `<th>` cell above the row criteria titles.     |
| `<TableComparisonColumn>`  | Column header cell | `.alpha-table-comparison-col`       | Individual `<th>` cell defining column title and theme. |
| `<TableComparisonRows>`    | Table body wrapper | `.alpha-table-comparison-rows`      | `<tbody>` container wrapping all comparison rows.       |
| `<TableComparisonRow>`     | Criteria row       | `.alpha-table-comparison-row`       | `<tr>` row wrapping criteria title and cells.           |
| `<TableComparisonRow>`     | Criteria title     | `.alpha-table-comparison-row-title` | Left `<th>` cell displaying the criteria name.          |
| `<TableComparisonCell>`    | Data cell          | `.alpha-table-comparison-cell`      | `<td>` value cell displaying comparison metrics.        |

#### How to Override in Your Stylesheet

##### 1. Global Project Stylesheet (`style.css`)
To style all comparison tables across every slide in your presentation, add rules to `style.css` in your Slidev project root:

```css
/* style.css — Applies to all TableComparison matrices across slides */

/* 1. Customize column headers */
.alpha-table-comparison-col {
  font-family: 'Fira Code', monospace;
  letter-spacing: 0.05em;
  font-size: 1rem;
}

/* 2. Customize row criteria titles */
.alpha-table-comparison-row-title {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
}

/* 3. Customize data cells */
.alpha-table-comparison-cell {
  font-size: 0.95rem;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.04);
}

/* 4. Highlight specific cells or rows on hover */
.alpha-table-comparison-row:hover .alpha-table-comparison-cell {
  filter: brightness(1.05);
}
```

##### 2. Scoped Slide Stylesheet (`slides.md`)
To override styles for tables on a specific slide only, append a `<style>` block to that slide. In Slidev slide blocks, use `:deep()` to reach into child components:

```html
---
layout: default
---

<TableComparison>
  <!-- columns and rows -->
</TableComparison>

<style>
/* Scoped to this slide only */
:deep(.alpha-table-comparison-cell) {
  border-radius: 12px;
  font-weight: 600;
}

:deep(.alpha-table-comparison-row-title) {
  background: #334155 !important;
  color: #f8fafc !important;
}
</style>
```

### 4. Layout & Density Controls

- **`dense`** (default `false`): Set `dense` prop to reduce vertical cell padding for information-dense matrices.
- **`rowHeaderWidth`** (default `'160px'`): Adjust width allocated to row criteria labels.
- **`spacing`** (default `'6px'`): Controls the gap between cells in the table grid.
- **`borderRadius`** (default `'8px'`): Adjust corner curvature across all cells and headers.

### 5. Per-Cell & Per-Column Overrides

- Use the `color` prop on `<TableComparisonColumn>` for custom column header themes.
- Use `color`, `bg`, or `textColor` directly on `<TableComparisonCell>` to highlight winning benchmarks or standout values.
