<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  DEFAULT_CELL_BG,
  DEFAULT_CELL_COLOR,
  resolveDimension,
  TABLE_COMPARISON_KEY,
} from '../../../utils/comparisons/table-comparison';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'TableComparisonCell',
});

export interface ITableComparisonCellProps {
  readonly color?: string;
  readonly bg?: string;
  readonly textColor?: string;
  readonly borderRadius?: number | string;
  readonly align?: 'left' | 'center' | 'right';
}

const props = withDefaults(defineProps<ITableComparisonCellProps>(), {
  color: undefined,
  bg: undefined,
  textColor: undefined,
  borderRadius: undefined,
  align: 'center',
});

const tableContext = inject(TABLE_COMPARISON_KEY, undefined);

const resolvedBg = computed(() => {
  return (
    props.bg ?? props.color ?? tableContext?.cellBg.value ?? DEFAULT_CELL_BG
  );
});

const resolvedTextColor = computed(() => {
  return props.textColor ?? tableContext?.cellColor.value ?? DEFAULT_CELL_COLOR;
});

const resolvedBorderRadius = computed(() => {
  return (
    resolveDimension(props.borderRadius) ??
    tableContext?.borderRadius.value ??
    '8px'
  );
});

const resolvedPadding = computed(() => {
  return tableContext?.dense.value ? 'py-2 px-3' : 'py-3 px-4';
});

const resolvedAlignClasses = computed(() => {
  if (props.align === 'left') {
    return 'text-left [&_p]:text-left';
  }

  if (props.align === 'right') {
    return 'text-right [&_p]:text-right';
  }

  return 'text-center [&_p]:text-center';
});

const cellStyle = computed(() => {
  return {
    ...(!resolvedBg.value.includes('--alpha-table-comparison-cell-bg')
      ? { '--alpha-table-comparison-cell-bg': resolvedBg.value }
      : {}),
    ...(!resolvedTextColor.value.includes('--alpha-table-comparison-cell')
      ? { '--alpha-table-comparison-cell': resolvedTextColor.value }
      : {}),
    borderRadius: resolvedBorderRadius.value,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(() => {
  return `alpha-table-comparison-cell bg-(--alpha-table-comparison-cell-bg) text-(--alpha-table-comparison-cell) font-medium text-[1rem] leading-relaxed align-middle transition-all duration-200 select-text [&_p]:text-[1rem] [&_p]:m-0 ${resolvedPadding.value} ${resolvedAlignClasses.value}`;
});
</script>

<template>
  <td v-bind="forwardedAttrs()" :class="className()" :style="cellStyle">
    <slot />
  </td>
</template>
