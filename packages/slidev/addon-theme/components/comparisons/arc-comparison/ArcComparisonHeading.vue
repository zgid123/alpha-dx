<script setup lang="ts">
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import ArcOrbitHeading, {
  type IArcOrbitHeadingProps,
} from '../../core/arc-orbit/ArcOrbitHeading.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonHeading',
});

export interface IArcComparisonHeadingProps extends IArcOrbitHeadingProps {}

const props = defineProps<IArcComparisonHeadingProps>();

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-comparison-heading text-(--alpha-arc-comparison-heading)',
);
</script>

<template>
  <ArcOrbitHeading
    v-if="$slots.default"
    v-bind="{ ...props, ...forwardedAttrs() }"
    :class="className()"
  >
    <slot />
  </ArcOrbitHeading>
  <ArcOrbitHeading
    v-else
    v-bind="{ ...props, ...forwardedAttrs() }"
    :class="className()"
  />
</template>
