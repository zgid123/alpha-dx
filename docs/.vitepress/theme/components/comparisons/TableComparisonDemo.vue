<script setup lang="ts">
import TableComparison from '@alphacifer/slidev-addon-theme/components/comparisons/table-comparison/TableComparison.vue';
import TableComparisonCell from '@alphacifer/slidev-addon-theme/components/comparisons/table-comparison/TableComparisonCell.vue';
import TableComparisonColumn from '@alphacifer/slidev-addon-theme/components/comparisons/table-comparison/TableComparisonColumn.vue';
import TableComparisonColumns from '@alphacifer/slidev-addon-theme/components/comparisons/table-comparison/TableComparisonColumns.vue';
import TableComparisonRow from '@alphacifer/slidev-addon-theme/components/comparisons/table-comparison/TableComparisonRow.vue';
import TableComparisonRows from '@alphacifer/slidev-addon-theme/components/comparisons/table-comparison/TableComparisonRows.vue';
import { ref } from 'vue';

import SlidevMockup from '../common/SlidevMockup.vue';

const props = withDefaults(
  defineProps<{
    theme?: 'seriph' | 'academic';
  }>(),
  {
    theme: 'seriph',
  },
);

const mode = ref<'default' | 'custom'>('custom');
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <!-- Academic Ablation Matrix -->
    <TableComparison v-if="props.theme === 'academic'">
      <TableComparisonColumns>
        <TableComparisonColumn
          :color="mode === 'custom' ? '#0ea5e9' : undefined"
        >
          Baseline Model
        </TableComparisonColumn>
        <TableComparisonColumn
          :color="mode === 'custom' ? '#10b981' : undefined"
        >
          Proposed Model
        </TableComparisonColumn>
        <TableComparisonColumn
          :color="mode === 'custom' ? '#f59e0b' : undefined"
        >
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

    <!-- Standard Architecture Matrix -->
    <TableComparison v-else>
      <TableComparisonColumns>
        <TableComparisonColumn
          :color="mode === 'custom' ? '#3b82f6' : undefined"
        >
          TypeScript Skill
        </TableComparisonColumn>
        <TableComparisonColumn
          :color="mode === 'custom' ? '#10b981' : undefined"
        >
          Testing Skill
        </TableComparisonColumn>
        <TableComparisonColumn
          :color="mode === 'custom' ? '#f59e0b' : undefined"
        >
          Slidev Addon
        </TableComparisonColumn>
      </TableComparisonColumns>
      <TableComparisonRows>
        <TableComparisonRow>
          <template #heading>Type Safety</template>
          <TableComparisonCell>Strict tsconfig</TableComparisonCell>
          <TableComparisonCell>Deterministic types</TableComparisonCell>
          <TableComparisonCell>Props contracts</TableComparisonCell>
        </TableComparisonRow>
        <TableComparisonRow>
          <template #heading>Tooling</template>
          <TableComparisonCell>Biome & TS</TableComparisonCell>
          <TableComparisonCell>Vitest suites</TableComparisonCell>
          <TableComparisonCell>UnoCSS & Slidev</TableComparisonCell>
        </TableComparisonRow>
        <TableComparisonRow>
          <template #heading>Outputs</template>
          <TableComparisonCell>Clean ESM modules</TableComparisonCell>
          <TableComparisonCell>Coverage reports</TableComparisonCell>
          <TableComparisonCell>Interactive decks</TableComparisonCell>
        </TableComparisonRow>
      </TableComparisonRows>
    </TableComparison>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Palette:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: mode === 'default' }]"
          @click="mode = 'default'"
        >
          Theme Default
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: mode === 'custom' }]"
          @click="mode = 'custom'"
        >
          Custom Colors
        </button>
      </div>
    </template>
  </SlidevMockup>
</template>
