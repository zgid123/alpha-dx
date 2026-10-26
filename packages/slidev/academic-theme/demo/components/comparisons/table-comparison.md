---
hideInToc: true
---

# TableComparison

<div class="mt-6">
  <TableComparison>
    <TableComparisonColumns>
      <TableComparisonColumn color="#0e7490">
        Static Typing
      </TableComparisonColumn>
      <TableComparisonColumn color="#0284c7">
        Dynamic Typing
      </TableComparisonColumn>
      <TableComparisonColumn color="#6366f1">
        Gradual Typing
      </TableComparisonColumn>
    </TableComparisonColumns>
    <TableComparisonRows>
      <TableComparisonRow>
        <template #heading>Type Checking</template>
        <TableComparisonCell>Compile time</TableComparisonCell>
        <TableComparisonCell>Runtime</TableComparisonCell>
        <TableComparisonCell>Configurable</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow>
        <template #heading>Refactoring Safety</template>
        <TableComparisonCell>Highest</TableComparisonCell>
        <TableComparisonCell>Relies on tests</TableComparisonCell>
        <TableComparisonCell>High within annotated boundaries</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow>
        <template #heading>Feedback Loop</template>
        <TableComparisonCell>Instant editor diagnostics</TableComparisonCell>
        <TableComparisonCell>Requires execution</TableComparisonCell>
        <TableComparisonCell>Instant on typed code</TableComparisonCell>
      </TableComparisonRow>
    </TableComparisonRows>
  </TableComparison>
</div>
