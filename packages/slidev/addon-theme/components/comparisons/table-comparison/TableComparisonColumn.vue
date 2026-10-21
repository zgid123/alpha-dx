<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  DEFAULT_COL_COLORS,
  DEFAULT_COL_HEADER_TEXT_COLOR,
  resolveDimension,
  TABLE_COMPARISON_COLS_KEY,
  TABLE_COMPARISON_KEY,
} from '../../../utils/comparisons/table-comparison';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'TableComparisonColumn',
});

export interface ITableComparisonColumnProps {
  readonly color?: string;
  readonly textColor?: string;
  readonly width?: number | string;
  readonly borderRadius?: number | string;
}

const props = withDefaults(defineProps<ITableComparisonColumnProps>(), {
  color: undefined,
  textColor: undefined,
  width: undefined,
  borderRadius: undefined,
});

const tableContext = inject(TABLE_COMPARISON_KEY, undefined);
const colsContext = inject(TABLE_COMPARISON_COLS_KEY, undefined);

const autoIndex = colsContext?.registerCol() ?? 0;

const resolvedColor = computed(() => {
  if (props.color) {
    return props.color;
  }

  const index = autoIndex % DEFAULT_COL_COLORS.length;
  return `var(--alpha-table-comparison-col-${index + 1}-background, ${DEFAULT_COL_COLORS[index]})`;
});

const resolvedTextColor = computed(() => {
  return (
    props.textColor ??
    tableContext?.colHeaderTextColor.value ??
    DEFAULT_COL_HEADER_TEXT_COLOR
  );
});

const resolvedBorderRadius = computed(() => {
  return (
    resolveDimension(props.borderRadius) ??
    tableContext?.borderRadius.value ??
    '8px'
  );
});

const resolvedWidth = computed(() => {
  return resolveDimension(props.width);
});

const resolvedPadding = computed(() => {
  return tableContext?.dense.value ? 'py-2 px-3' : 'py-3 px-4';
});

const colStyle = computed(() => {
  return {
    ...(!resolvedColor.value.includes(
      '--alpha-table-comparison-col-1-background',
    )
      ? { '--alpha-table-comparison-col-1-background': resolvedColor.value }
      : {}),
    ...(!resolvedTextColor.value.includes('--alpha-table-comparison-col')
      ? { '--alpha-table-comparison-col': resolvedTextColor.value }
      : {}),
    borderRadius: resolvedBorderRadius.value,
    width: resolvedWidth.value,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(() => {
  return `alpha-table-comparison-col bg-(--alpha-table-comparison-col-1-background) text-(--alpha-table-comparison-col) font-bold uppercase tracking-wider text-[1rem] leading-snug text-center align-middle select-text transition-all duration-200 [&_p]:text-[1rem] [&_p]:text-center [&_p]:m-0 ${resolvedPadding.value}`;
});
</script>

<template>
  <th
    scope="col"
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="colStyle"
  >
    <slot />
  </th>
</template>
