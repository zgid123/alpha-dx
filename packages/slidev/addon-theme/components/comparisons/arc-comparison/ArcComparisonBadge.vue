<script setup lang="ts">
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import ArcOrbitBadge, {
  type IArcOrbitBadgeProps,
} from '../../core/arc-orbit/ArcOrbitBadge.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonBadge',
});

export interface IArcComparisonBadgeProps extends IArcOrbitBadgeProps {}

const props = defineProps<IArcComparisonBadgeProps>();

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-comparison-badge text-(--alpha-arc-comparison-badge)',
);
</script>

<template>
  <ArcOrbitBadge
    v-if="$slots.default"
    v-bind="{ ...props, ...forwardedAttrs() }"
    :class="className()"
  >
    <slot />
  </ArcOrbitBadge>
  <ArcOrbitBadge
    v-else
    v-bind="{ ...props, ...forwardedAttrs() }"
    :class="className()"
  />
</template>
