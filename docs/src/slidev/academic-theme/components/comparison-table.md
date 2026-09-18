# Comparison Table

Multi-column comparison matrix with colored column headers, criteria row labels, and cell values for comparing experimental models, baseline algorithms, or ablation studies. Includes `ComparisonTable`, `ComparisonTableCols`, `ComparisonTableCol`, `ComparisonTableRows`, `ComparisonTableRow`, and `ComparisonTableCell`.

## Presentation Preview

<ComparisonTableDemo theme="academic" />

---

## Usage Examples

### Ablation Matrix Structure

```vue
<ComparisonTable>
  <ComparisonTableCols>
    <ComparisonTableCol color="#0ea5e9">
      Baseline Model
    </ComparisonTableCol>
    <ComparisonTableCol color="#10b981">
      Proposed Model
    </ComparisonTableCol>
    <ComparisonTableCol color="#f59e0b">
      Ablated Variant
    </ComparisonTableCol>
  </ComparisonTableCols>

  <ComparisonTableRows>
    <ComparisonTableRow title="Accuracy">
      <ComparisonTableCell>82.4%</ComparisonTableCell>
      <ComparisonTableCell>94.1%</ComparisonTableCell>
      <ComparisonTableCell>88.7%</ComparisonTableCell>
    </ComparisonTableRow>
    <ComparisonTableRow title="Latency">
      <ComparisonTableCell>120 ms</ComparisonTableCell>
      <ComparisonTableCell>28 ms</ComparisonTableCell>
      <ComparisonTableCell>45 ms</ComparisonTableCell>
    </ComparisonTableRow>
    <ComparisonTableRow title="Parameters">
      <ComparisonTableCell>110M</ComparisonTableCell>
      <ComparisonTableCell>25M</ComparisonTableCell>
      <ComparisonTableCell>25M</ComparisonTableCell>
    </ComparisonTableRow>
  </ComparisonTableRows>
</ComparisonTable>
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

## Child Components

- `ComparisonTableCols`: Header wrapper for column definitions.
- `ComparisonTableCol`: Column header label and color definition.
- `ComparisonTableRows`: Container for rows.
- `ComparisonTableRow`: Row container with an optional criteria `title`.
- `ComparisonTableCell`: Cell content matching the corresponding column index.
