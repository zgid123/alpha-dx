<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  ARC_ORBIT_CALLOUT_KEY,
  DEFAULT_ARC_ORBIT_COLOR,
} from '../../../utils/arcOrbit';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArcOrbitBadge',
});

export interface IArcOrbitBadgeProps {
  readonly id?: string | number;
  readonly color?: string;
  readonly size?: number;
}

const props = withDefaults(defineProps<IArcOrbitBadgeProps>(), {
  id: undefined,
  color: undefined,
  size: 52,
});

const calloutContext = inject(ARC_ORBIT_CALLOUT_KEY, undefined);

const badgeColor = computed(() => {
  return (
    props.color ??
    calloutContext?.item.value.color ??
    calloutContext?.color.value ??
    DEFAULT_ARC_ORBIT_COLOR
  );
});

const badgeId = computed(() => {
  return props.id ?? calloutContext?.item.value.id ?? '01';
});

const badgeStyle = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
    backgroundColor: badgeColor.value,
    fontSize: `${Math.round(props.size * 0.42)}px`,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-orbit-badge rounded-full flex items-center justify-center font-bold text-white shadow-md select-none flex-shrink-0 transition-transform duration-300',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="badgeStyle"
  >
    <slot>{{ badgeId }}</slot>
  </div>
</template>
