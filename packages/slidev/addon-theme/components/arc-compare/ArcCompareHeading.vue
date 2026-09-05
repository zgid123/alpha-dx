<script setup lang="ts">
import { computed, inject } from 'vue';

import { ARC_COMPARE_CALLOUT_KEY } from '../../utils/arcCompare';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArcCompareHeading',
});

export interface IArcCompareHeadingProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IArcCompareHeadingProps>(), {
  color: undefined,
});

const calloutContext = inject(ARC_COMPARE_CALLOUT_KEY, undefined);

const headingColor = computed(() => {
  return (
    props.color ??
    calloutContext?.item.value.color ??
    calloutContext?.color.value ??
    '#e87a36'
  );
});

const headingStyle = computed(() => {
  return {
    color: headingColor.value,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-compare-heading font-bold text-[1.05rem] leading-tight mb-0.5 tracking-tight',
);
</script>

<template>
  <h3
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="headingStyle"
  >
    <slot>{{ calloutContext?.item.value.title ?? 'Add Text Here' }}</slot>
  </h3>
</template>
