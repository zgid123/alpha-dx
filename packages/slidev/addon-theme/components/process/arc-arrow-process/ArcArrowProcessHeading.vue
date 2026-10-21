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
  return props.color ?? calloutContext?.item.value.titleColor;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-arrow-process-heading mb-1.5 font-sans font-bold leading-tight text-(--alpha-arc-arrow-process-heading) select-none',
);
</script>

<template>
  <h4
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="
      headingColor && !headingColor.includes('--alpha-arc-arrow-process-heading')
        ? { '--alpha-arc-arrow-process-heading': headingColor }
        : undefined
    "
  >
    <slot>{{ '' }}</slot>
  </h4>
</template>
