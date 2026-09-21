# Comparison Table

Multi-column comparison matrix with colored column headers, criteria row labels, and cell values for comparing architectural solutions or tech stacks. Includes `ComparisonTable`, `ComparisonTableCols`, `ComparisonTableCol`, `ComparisonTableRows`, `ComparisonTableRow`, and `ComparisonTableCell`.

## Presentation Preview

<ComparisonTableDemo />

---

## Usage Examples

### Custom Matrix Structure

```vue
<ComparisonTable>
  <ComparisonTableCols>
    <ComparisonTableCol color="#3b82f6">
      TypeScript Skill
    </ComparisonTableCol>
    <ComparisonTableCol color="#10b981">
      Testing Skill
    </ComparisonTableCol>
    <ComparisonTableCol color="#f59e0b">
      Slidev Addon
    </ComparisonTableCol>
  </ComparisonTableCols>

  <ComparisonTableRows>
    <ComparisonTableRow title="Type Safety">
      <ComparisonTableCell>Strict tsconfig</ComparisonTableCell>
      <ComparisonTableCell>Deterministic types</ComparisonTableCell>
      <ComparisonTableCell>Props contracts</ComparisonTableCell>
    </ComparisonTableRow>
    <ComparisonTableRow title="Tooling">
      <ComparisonTableCell>Biome & TS</ComparisonTableCell>
      <ComparisonTableCell>Vitest suites</ComparisonTableCell>
      <ComparisonTableCell>UnoCSS & Slidev</ComparisonTableCell>
    </ComparisonTableRow>
    <ComparisonTableRow title="Outputs">
      <ComparisonTableCell>Clean ESM modules</ComparisonTableCell>
      <ComparisonTableCell>Coverage reports</ComparisonTableCell>
      <ComparisonTableCell>Interactive decks</ComparisonTableCell>
    </ComparisonTableRow>
  </ComparisonTableRows>
</ComparisonTable>
```

### Default Mockup

```vue
<ComparisonTable />
```

---

## Child Components

- `ComparisonTableCols`: Header wrapper for column definitions.
- `ComparisonTableCol`: Column header label and color definition.
- `ComparisonTableRows`: Container for rows.
- `ComparisonTableRow`: Row container with a required or optional criteria `title`.
- `ComparisonTableCell`: Cell content matching the corresponding column index.
