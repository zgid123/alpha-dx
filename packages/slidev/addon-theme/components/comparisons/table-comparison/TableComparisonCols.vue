<script setup lang="ts">
import { computed, inject, onBeforeUpdate, provide } from 'vue';

import {
  DEFAULT_ROW_HEADER_WIDTH,
  resolveDimension,
  TABLE_COMPARISON_COLS_KEY,
  TABLE_COMPARISON_KEY,
} from '../../../utils/tableComparison';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'TableComparisonCols',
});

export interface ITableComparisonColsProps {
  readonly cornerWidth?: number | string;
}

const props = withDefaults(defineProps<ITableComparisonColsProps>(), {
  cornerWidth: undefined,
});

const tableContext = inject(TABLE_COMPARISON_KEY, undefined);

let colCounter = 0;
onBeforeUpdate(() => {
  colCounter = 0;
});

provide(TABLE_COMPARISON_COLS_KEY, {
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
  'alpha-table-comparison-cols',
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
        class="alpha-table-comparison-corner p-0 bg-transparent border-none pointer-events-none select-none"
        :style="cornerStyle"
        aria-hidden="true"
      />
      <slot />
    </tr>
  </thead>
</template>
