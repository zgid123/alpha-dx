<script setup lang="ts">
import ArcOrbitBadge, {
  type IArcOrbitBadgeProps,
} from '../../core/arc-orbit/ArcOrbitBadge.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonBadge',
});

export interface IArcComparisonBadgeProps extends IArcOrbitBadgeProps {}

const props = defineProps<IArcComparisonBadgeProps>();
</script>

<template>
  <ArcOrbitBadge
    v-if="$slots.default"
    v-bind="{ ...props, ...$attrs }"
    class="alpha-arc-comparison-badge"
  >
    <slot />
  </ArcOrbitBadge>
  <ArcOrbitBadge
    v-else
    v-bind="{ ...props, ...$attrs }"
    class="alpha-arc-comparison-badge"
  />
</template>
