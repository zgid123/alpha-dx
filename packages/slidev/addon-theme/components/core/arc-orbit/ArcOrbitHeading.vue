<script setup lang="ts">
import { computed, inject } from 'vue';

import { ARC_ORBIT_CALLOUT_KEY } from '../../../utils/core/arc-orbit';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArcOrbitHeading',
});

export interface IArcOrbitHeadingProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IArcOrbitHeadingProps>(), {
  color: undefined,
});

const calloutContext = inject(ARC_ORBIT_CALLOUT_KEY, undefined);

const headingColor = computed(() => {
  return (
    props.color ??
    calloutContext?.item.value.color ??
    calloutContext?.color.value ??
    undefined
  );
});

const headingStyle = computed(() => {
  if (!headingColor.value) {
    return undefined;
  }

  return {
    color: headingColor.value,
    '--alpha-arc-orbit-heading': headingColor.value,
    '--alpha-arc-comparison-heading': headingColor.value,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-orbit-heading mb-0.5 font-sans font-bold leading-tight tracking-tight text-(--alpha-arc-orbit-heading)',
);
</script>

<template>
  <h4
    v-if="$slots.default"
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="headingStyle"
  >
    <slot>{{ '' }}</slot>
  </h4>
</template>
