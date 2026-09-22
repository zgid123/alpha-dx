<script setup lang="ts">
import ArcOrbitCallout from '../../core/arc-orbit/ArcOrbitCallout.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonOrbit',
});

export interface IArcComparisonOrbitProps {
  readonly side?: 'left' | 'right';
  readonly index?: number;
  readonly id?: string | number;
  readonly title?: string;
  readonly description?: string;
  readonly color?: string;
  readonly textColor?: string;
  readonly textGap?: number;
}

const props = withDefaults(defineProps<IArcComparisonOrbitProps>(), {
  side: undefined,
  index: undefined,
  id: undefined,
  title: undefined,
  description: undefined,
  color: undefined,
  textColor: undefined,
  textGap: undefined,
});
</script>

<template>
  <ArcOrbitCallout
    v-if="$slots.default"
    v-bind="{ ...props, ...$attrs }"
    :position="props.side"
    class="alpha-arc-comparison-orbit"
  >
    <slot />
  </ArcOrbitCallout>
  <ArcOrbitCallout
    v-else
    v-bind="{ ...props, ...$attrs }"
    :position="props.side"
    class="alpha-arc-comparison-orbit"
  />
</template>
