<script setup lang="ts">
import { computed, inject } from 'vue';

import { ARC_COMPARISON_SIDE_KEY } from '../../../utils/arcComparison';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonTitle',
});

export interface IArcComparisonTitleProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IArcComparisonTitleProps>(), {
  color: undefined,
});

const sideContext = inject(ARC_COMPARISON_SIDE_KEY, undefined);

const titleColor = computed(() => {
  return props.color ?? sideContext?.color.value ?? '#e87a36';
});

const titleStyle = computed(() => {
  return {
    color: titleColor.value,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-comparison-title font-bold text-center px-2 leading-tight flex items-center justify-center select-none text-[1.125rem] tracking-tight',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="titleStyle"
  >
    <slot>Add Project<br />Name</slot>
  </div>
</template>
