<script setup lang="ts">
import ComparisonTable from '@alphacifer/slidev-addon-theme/components/comparison-table/ComparisonTable.vue';
import ComparisonTableCell from '@alphacifer/slidev-addon-theme/components/comparison-table/ComparisonTableCell.vue';
import ComparisonTableCol from '@alphacifer/slidev-addon-theme/components/comparison-table/ComparisonTableCol.vue';
import ComparisonTableCols from '@alphacifer/slidev-addon-theme/components/comparison-table/ComparisonTableCols.vue';
import ComparisonTableRow from '@alphacifer/slidev-addon-theme/components/comparison-table/ComparisonTableRow.vue';
import ComparisonTableRows from '@alphacifer/slidev-addon-theme/components/comparison-table/ComparisonTableRows.vue';
import { ref } from 'vue';

import SlidevMockup from './SlidevMockup.vue';

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
    <ComparisonTable v-if="mode === 'default'" />

    <ComparisonTable v-else>
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

    <template #controls>
      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Preset:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: mode === 'custom' }]"
          @click="mode = 'custom'"
        >
          Custom Architecture Matrix
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
