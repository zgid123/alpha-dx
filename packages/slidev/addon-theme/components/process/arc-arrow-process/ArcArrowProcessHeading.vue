<script setup lang="ts">
import { computed, inject } from 'vue';

import { ARC_ARROW_PROCESS_CALLOUT_KEY } from '../../../utils/process/arc-arrow-process';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  name: 'ArcArrowProcessHeading',
  inheritAttrs: false,
});

export interface IArcArrowProcessHeadingProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IArcArrowProcessHeadingProps>(), {
  color: undefined,
});

const calloutContext = inject(ARC_ARROW_PROCESS_CALLOUT_KEY, undefined);

const headingColor = computed(() => {
  return props.color ?? calloutContext?.item.value.color;
});

const headingStyle = computed(() => {
  if (!headingColor.value) {
    return undefined;
  }

  return {
    color: headingColor.value,
    '--alpha-arc-arrow-process-heading': headingColor.value,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-arrow-process-heading mb-1.5 font-sans font-bold leading-tight select-none',
);
</script>

<template>
  <h4 v-bind="forwardedAttrs()" :class="className()" :style="headingStyle">
    <slot>{{ '' }}</slot>
  </h4>
</template>
