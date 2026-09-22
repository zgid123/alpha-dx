<script setup lang="ts">
import ArcOrbitHeading, {
  type IArcOrbitHeadingProps,
} from '../../core/arc-orbit/ArcOrbitHeading.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonHeading',
});

export interface IArcComparisonHeadingProps extends IArcOrbitHeadingProps {}

const props = defineProps<IArcComparisonHeadingProps>();
</script>

<template>
  <ArcOrbitHeading
    v-if="$slots.default"
    v-bind="{ ...props, ...$attrs }"
    class="alpha-arc-comparison-heading"
  >
    <slot />
  </ArcOrbitHeading>
  <ArcOrbitHeading
    v-else
    v-bind="{ ...props, ...$attrs }"
    class="alpha-arc-comparison-heading"
  />
</template>
