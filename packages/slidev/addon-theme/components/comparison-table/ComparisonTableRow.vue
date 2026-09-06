<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  COMPARISON_TABLE_KEY,
  DEFAULT_ROW_HEADER_COLOR,
  DEFAULT_ROW_HEADER_TEXT_COLOR,
  resolveDimension,
} from '../../utils/comparisonTable';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ComparisonTableRow',
});

export interface IComparisonTableRowProps {
  readonly title?: string;
  readonly color?: string;
  readonly textColor?: string;
  readonly borderRadius?: number | string;
}

const props = withDefaults(defineProps<IComparisonTableRowProps>(), {
  title: undefined,
  color: undefined,
  textColor: undefined,
  borderRadius: undefined,
});

const tableContext = inject(COMPARISON_TABLE_KEY, undefined);

const resolvedBg = computed(() => {
  return (
    props.color ??
    tableContext?.rowHeaderColor.value ??
    DEFAULT_ROW_HEADER_COLOR
  );
});

const resolvedTextColor = computed(() => {
  return (
    props.textColor ??
    tableContext?.rowHeaderTextColor.value ??
    DEFAULT_ROW_HEADER_TEXT_COLOR
  );
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

const headerStyle = computed(() => {
  return {
    backgroundColor: resolvedBg.value,
    color: resolvedTextColor.value,
    borderRadius: resolvedBorderRadius.value,
    fontSize: '1rem',
    textAlign: 'center' as const,
    verticalAlign: 'middle' as const,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-comparison-table-row',
);
</script>

<template>
  <tr
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    <th
      scope="row"
      class="alpha-comparison-table-row-title font-bold uppercase tracking-wider text-[1rem] leading-snug text-center align-middle select-text transition-all duration-200 [&_p]:text-[1rem] [&_p]:text-center [&_p]:m-0"
      :class="resolvedPadding"
      :style="headerStyle"
    >
      <slot name="title">{{ title }}</slot>
    </th>
    <slot />
  </tr>
</template>
