<script setup lang="ts">
import { computed, inject } from 'vue';

import { ARC_ORBIT_CALLOUT_KEY } from '../../../utils/core/arc-orbit';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArcOrbitContent',
});

export interface IArcOrbitContentProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IArcOrbitContentProps>(), {
  color: undefined,
});

const calloutContext = inject(ARC_ORBIT_CALLOUT_KEY, undefined);

const contentColor = computed(() => {
  return props.color ?? calloutContext?.item.value.textColor ?? undefined;
});

const contentStyle = computed(() => {
  if (!contentColor.value) {
    return undefined;
  }

  return {
    '--alpha-arc-orbit-content': contentColor.value,
    '--alpha-arc-comparison-content': contentColor.value,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-orbit-content font-sans leading-[1.3] text-(--alpha-arc-orbit-content) opacity-90',
);
</script>

<template>
  <p v-bind="forwardedAttrs()" :class="className()" :style="contentStyle">
    <slot />
  </p>
</template>
