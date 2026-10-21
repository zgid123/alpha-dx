<script setup lang="ts">
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import ArcOrbitCallout from '../../core/arc-orbit/ArcOrbitCallout.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonOrbit',
});

export interface IArcComparisonOrbitProps {
  readonly side?: 'left' | 'right';
  readonly index?: number;
  readonly id?: string | number;
  readonly color?: string;
  readonly textColor?: string;
  readonly textGap?: number;
}

const props = withDefaults(defineProps<IArcComparisonOrbitProps>(), {
  side: undefined,
  index: undefined,
  id: undefined,
  color: undefined,
  textColor: undefined,
  textGap: undefined,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-comparison-orbit',
);
</script>

<template>
  <ArcOrbitCallout
    v-if="$slots.default"
    v-bind="{ ...props, ...forwardedAttrs() }"
    :position="props.side"
    :class="className()"
  >
    <slot />
  </ArcOrbitCallout>
  <ArcOrbitCallout
    v-else
    v-bind="{ ...props, ...forwardedAttrs() }"
    :position="props.side"
    :class="className()"
  />
</template>
