<script setup lang="ts">
import { type ComputedRef, computed, inject, provide } from 'vue';

import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_CELL_BG,
  DEFAULT_CELL_COLOR,
  DEFAULT_COL_HEADER_TEXT_COLOR,
  DEFAULT_ROW_HEADER_COLOR,
  DEFAULT_ROW_HEADER_TEXT_COLOR,
  DEFAULT_ROW_HEADER_WIDTH,
  DEFAULT_SPACING,
  type ITableComparisonContext,
  resolveDimension,
  TABLE_COMPARISON_KEY,
} from '../../../utils/comparisons/table-comparison';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'TableComparison',
});

export interface ITableComparisonProps {
  readonly cellBg?: string;
  readonly cellColor?: string;
  readonly rowHeaderColor?: string;
  readonly rowHeaderTextColor?: string;
  readonly colHeaderTextColor?: string;
  readonly borderRadius?: number | string;
  readonly rowHeaderWidth?: number | string;
  readonly spacing?: number | string;
  readonly tableLayout?: 'fixed' | 'auto';
  readonly dense?: boolean;
  readonly animation?: boolean;
  readonly active?: boolean;
  readonly width?: number | string;
  readonly height?: number | string;
}

const props = withDefaults(defineProps<ITableComparisonProps>(), {
  cellBg: `var(--alpha-table-comparison-cell-bg, ${DEFAULT_CELL_BG})`,
  cellColor: DEFAULT_CELL_COLOR,
  rowHeaderColor: `var(--alpha-table-comparison-row-bg, ${DEFAULT_ROW_HEADER_COLOR})`,
  rowHeaderTextColor: DEFAULT_ROW_HEADER_TEXT_COLOR,
  colHeaderTextColor: DEFAULT_COL_HEADER_TEXT_COLOR,
  borderRadius: DEFAULT_BORDER_RADIUS,
  rowHeaderWidth: DEFAULT_ROW_HEADER_WIDTH,
  spacing: DEFAULT_SPACING,
  tableLayout: 'fixed',
  dense: false,
  animation: true,
  active: undefined,
  width: '100%',
  height: undefined,
});

const shiftingIntro = inject<
  | {
      active: ComputedRef<boolean>;
      isShifting?: ComputedRef<boolean>;
    }
  | undefined
>('SLIDEV_LAYOUT_SHIFTING_INTRO', undefined);

const isAnimated = computed(() => {
  if (!props.animation) {
    return false;
  }

  if (props.active !== undefined) {
    return props.active;
  }

  if (shiftingIntro) {
    return shiftingIntro.active.value;
  }

  return true;
});

const resolvedBorderRadius = computed(() => {
  return resolveDimension(props.borderRadius) ?? DEFAULT_BORDER_RADIUS;
});

const resolvedRowHeaderWidth = computed(() => {
  return resolveDimension(props.rowHeaderWidth) ?? DEFAULT_ROW_HEADER_WIDTH;
});

const resolvedSpacing = computed(() => {
  return resolveDimension(props.spacing) ?? DEFAULT_SPACING;
});

const resolvedWidth = computed(() => {
  return resolveDimension(props.width) ?? '100%';
});

const resolvedHeight = computed(() => {
  return resolveDimension(props.height);
});

provide<ITableComparisonContext>(TABLE_COMPARISON_KEY, {
  cellBg: computed(() => props.cellBg),
  cellColor: computed(() => props.cellColor),
  rowHeaderColor: computed(() => props.rowHeaderColor),
  rowHeaderTextColor: computed(() => props.rowHeaderTextColor),
  colHeaderTextColor: computed(() => props.colHeaderTextColor),
  borderRadius: resolvedBorderRadius,
  rowHeaderWidth: resolvedRowHeaderWidth,
  spacing: resolvedSpacing,
  dense: computed(() => props.dense),
  animation: isAnimated,
});

const tableStyle = computed(() => {
  return {
    width: resolvedWidth.value,
    height: resolvedHeight.value,
    borderCollapse: 'separate' as const,
    borderSpacing: resolvedSpacing.value,
    tableLayout: props.tableLayout,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-table-comparison w-full select-text font-sans relative my-auto',
);
</script>

<template>
  <div
    class="alpha-table-comparison-wrapper w-full flex items-center justify-center overflow-x-auto"
  >
    <table
      v-bind="forwardedAttrs()"
      :class="[
        className(),
        { 'alpha-table-comparison--animated': isAnimated },
      ]"
      :style="tableStyle"
    >
      <slot />
    </table>
  </div>
</template>

<style scoped>
.alpha-table-comparison--animated {
  animation: alpha-table-appear 0.35s ease-out;
}

@keyframes alpha-table-appear {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alpha-table-comparison :deep(tr) {
  background-color: transparent;
  border: none;
}

.alpha-table-comparison :deep(th),
.alpha-table-comparison :deep(td) {
  border: none;
}
</style>
