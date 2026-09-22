<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  ARC_ORBIT_ROOT_KEY,
  DEFAULT_ARC_ORBIT_COLOR,
} from '../../../utils/arcOrbit';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArcOrbitTitle',
});

export interface IArcOrbitTitleProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IArcOrbitTitleProps>(), {
  color: undefined,
});

const rootContext = inject(ARC_ORBIT_ROOT_KEY, undefined);

const titleColor = computed(() => {
  return props.color ?? rootContext?.color.value ?? DEFAULT_ARC_ORBIT_COLOR;
});

const titleStyle = computed(() => {
  return {
    color: titleColor.value,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-orbit-title font-bold text-center px-2 leading-tight flex items-center justify-center select-none text-[1.125rem] tracking-tight whitespace-pre-line',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="titleStyle"
  >
    <slot>{{ rootContext?.title.value ?? 'Add Topic\nTitle' }}</slot>
  </div>
</template>
