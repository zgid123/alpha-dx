<script setup lang="ts">
import TableComparison from '@alphacifer/slidev-addon-theme/components/comparisons/table-comparison/TableComparison.vue';
import TableComparisonCell from '@alphacifer/slidev-addon-theme/components/comparisons/table-comparison/TableComparisonCell.vue';
import TableComparisonCol from '@alphacifer/slidev-addon-theme/components/comparisons/table-comparison/TableComparisonCol.vue';
import TableComparisonCols from '@alphacifer/slidev-addon-theme/components/comparisons/table-comparison/TableComparisonCols.vue';
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
    <TableComparison v-if="mode === 'default'" />

    <!-- Academic Ablation Matrix -->
    <TableComparison v-else-if="props.theme === 'academic'">
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

    <!-- Standard Architecture Matrix -->
    <TableComparison v-else>
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

    <template #controls>
      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Preset:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: mode === 'custom' }]"
          @click="mode = 'custom'"
        >
          {{ props.theme === 'academic' ? 'Ablation Matrix' : 'Custom Architecture Matrix' }}
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: mode === 'default' }]"
          @click="mode = 'default'"
        >
          Default Mockup
        </button>
      </div>
    </template>
  </SlidevMockup>
</template>
