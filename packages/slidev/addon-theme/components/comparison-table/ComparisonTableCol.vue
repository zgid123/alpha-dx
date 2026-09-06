<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  COMPARISON_TABLE_COLS_KEY,
  COMPARISON_TABLE_KEY,
  DEFAULT_COL_COLORS,
  DEFAULT_COL_HEADER_TEXT_COLOR,
  resolveDimension,
} from '../../utils/comparisonTable';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ComparisonTableCol',
});

export interface IComparisonTableColProps {
  readonly title?: string;
  readonly color?: string;
  readonly textColor?: string;
  readonly width?: number | string;
  readonly borderRadius?: number | string;
}

const props = withDefaults(defineProps<IComparisonTableColProps>(), {
  title: undefined,
  color: undefined,
  textColor: undefined,
  width: undefined,
  borderRadius: undefined,
});

const tableContext = inject(COMPARISON_TABLE_KEY, undefined);
const colsContext = inject(COMPARISON_TABLE_COLS_KEY, undefined);

const autoIndex = colsContext?.registerCol() ?? 0;

const resolvedColor = computed(() => {
  if (props.color) {
    return props.color;
  }

  return DEFAULT_COL_COLORS[autoIndex % DEFAULT_COL_COLORS.length];
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
    backgroundColor: resolvedColor.value,
    color: resolvedTextColor.value,
    borderRadius: resolvedBorderRadius.value,
    width: resolvedWidth.value,
    fontSize: '1rem',
    textAlign: 'center' as const,
    verticalAlign: 'middle' as const,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(() => {
  return `alpha-comparison-table-col font-bold uppercase tracking-wider text-[1rem] leading-snug text-center align-middle select-text transition-all duration-200 [&_p]:text-[1rem] [&_p]:text-center [&_p]:m-0 ${resolvedPadding.value}`;
});
</script>

<template>
  <th
    scope="col"
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="colStyle"
  >
    <slot>{{ title }}</slot>
  </th>
</template>
