<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  ARC_ORBIT_CALLOUT_KEY,
  DEFAULT_LOREM_TEXT,
} from '../../../utils/arcOrbit';
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
    color: contentColor.value,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-orbit-content font-sans text-[0.78rem] leading-[1.3] text-slate-600 dark:text-slate-300 opacity-90',
);
</script>

<template>
  <p
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="contentStyle"
  >
    <slot>{{ calloutContext?.item.value.description ?? DEFAULT_LOREM_TEXT }}</slot>
  </p>
</template>
