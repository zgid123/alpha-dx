<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  Fragment,
  inject,
  provide,
  useSlots,
  type VNode,
} from 'vue';

import {
  COMPARISON_TABLE_KEY,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_CELL_BG,
  DEFAULT_CELL_COLOR,
  DEFAULT_COL_HEADER_TEXT_COLOR,
  DEFAULT_MOCKUP_COLS,
  DEFAULT_MOCKUP_ROWS,
  DEFAULT_ROW_HEADER_COLOR,
  DEFAULT_ROW_HEADER_TEXT_COLOR,
  DEFAULT_ROW_HEADER_WIDTH,
  DEFAULT_SPACING,
  type IComparisonTableContext,
  resolveDimension,
} from '../../utils/comparisonTable';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';
import ComparisonTableCell from './ComparisonTableCell.vue';
import ComparisonTableCol from './ComparisonTableCol.vue';
import ComparisonTableCols from './ComparisonTableCols.vue';
import ComparisonTableRow from './ComparisonTableRow.vue';
import ComparisonTableRows from './ComparisonTableRows.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ComparisonTable',
});

export interface IComparisonTableProps {
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

const props = withDefaults(defineProps<IComparisonTableProps>(), {
  cellBg: DEFAULT_CELL_BG,
  cellColor: DEFAULT_CELL_COLOR,
  rowHeaderColor: DEFAULT_ROW_HEADER_COLOR,
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

const slots = useSlots();

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

provide<IComparisonTableContext>(COMPARISON_TABLE_KEY, {
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

function isSignificantNode(node: VNode): boolean {
  if (typeof node.type === 'symbol') {
    if (typeof node.children === 'string' && !node.children.trim()) {
      return false;
    }
  }

  if (typeof node.children === 'string' && !node.children.trim()) {
    return false;
  }

  return true;
}

function flattenVNodes(nodes: VNode[]): VNode[] {
  const result: VNode[] = [];

  for (const node of nodes) {
    if (node.type === Fragment && Array.isArray(node.children)) {
      result.push(...flattenVNodes(node.children as VNode[]));
    } else if (isSignificantNode(node)) {
      result.push(node);
    }
  }

  return result;
}

const defaultNodes = computed(() => {
  if (!slots.default) {
    return [];
  }

  return flattenVNodes(slots.default());
});

const hasCustomContent = computed(() => {
  return defaultNodes.value.length > 0;
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
  'alpha-comparison-table w-full select-text font-sans relative my-auto',
);
</script>

<template>
  <div class="alpha-comparison-table-wrapper w-full flex items-center justify-center overflow-x-auto">
    <table
      v-bind="forwardedAttrs()"
      :class="[
        className(),
        { 'alpha-comparison-table--animated': isAnimated },
      ]"
      :style="tableStyle"
    >
      <template v-if="hasCustomContent">
        <slot />
      </template>
      <template v-else>
        <ComparisonTableCols>
          <ComparisonTableCol
            v-for="col in DEFAULT_MOCKUP_COLS"
            :key="col.title"
            :color="col.color"
          >
            {{ col.title }}
          </ComparisonTableCol>
        </ComparisonTableCols>
        <ComparisonTableRows>
          <ComparisonTableRow
            v-for="row in DEFAULT_MOCKUP_ROWS"
            :key="row.title"
            :title="row.title"
          >
            <ComparisonTableCell
              v-for="(cellText, idx) in row.cells"
              :key="idx"
            >
              {{ cellText }}
            </ComparisonTableCell>
          </ComparisonTableRow>
        </ComparisonTableRows>
      </template>
    </table>
  </div>
</template>

<style scoped>
.alpha-comparison-table--animated {
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
</style>
