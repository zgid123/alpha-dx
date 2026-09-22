<script setup lang="ts">
import ArcOrbitTitle, {
  type IArcOrbitTitleProps,
} from '../../core/arc-orbit/ArcOrbitTitle.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonTitle',
});

export interface IArcComparisonTitleProps extends IArcOrbitTitleProps {}

const props = defineProps<IArcComparisonTitleProps>();
</script>

<template>
  <ArcOrbitTitle
    v-if="$slots.default"
    v-bind="{ ...props, ...$attrs }"
    class="alpha-arc-comparison-title"
  >
    <slot />
  </ArcOrbitTitle>
  <ArcOrbitTitle
    v-else
    v-bind="{ ...props, ...$attrs }"
    class="alpha-arc-comparison-title"
  />
</template>
