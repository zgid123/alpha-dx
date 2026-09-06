<script setup lang="ts">
import { computed, inject, onBeforeUpdate, provide } from 'vue';

import {
  COMPARISON_TABLE_COLS_KEY,
  COMPARISON_TABLE_KEY,
  DEFAULT_ROW_HEADER_WIDTH,
  resolveDimension,
} from '../../utils/comparisonTable';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ComparisonTableCols',
});

export interface IComparisonTableColsProps {
  readonly cornerWidth?: number | string;
}

const props = withDefaults(defineProps<IComparisonTableColsProps>(), {
  cornerWidth: undefined,
});

const tableContext = inject(COMPARISON_TABLE_KEY, undefined);

let colCounter = 0;
onBeforeUpdate(() => {
  colCounter = 0;
});

provide(COMPARISON_TABLE_COLS_KEY, {
  registerCol: () => {
    return colCounter++;
  },
});

const resolvedCornerWidth = computed(() => {
  return (
    resolveDimension(props.cornerWidth) ??
    tableContext?.rowHeaderWidth.value ??
    DEFAULT_ROW_HEADER_WIDTH
  );
});

const cornerStyle = computed(() => {
  return {
    width: resolvedCornerWidth.value,
    backgroundColor: 'transparent',
    border: 'none',
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-comparison-table-cols',
);
</script>

<template>
  <thead
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    <tr>
      <th
        scope="col"
        class="alpha-comparison-table-corner p-0 bg-transparent border-none pointer-events-none select-none"
        :style="cornerStyle"
        aria-hidden="true"
      />
      <slot />
    </tr>
  </thead>
</template>
