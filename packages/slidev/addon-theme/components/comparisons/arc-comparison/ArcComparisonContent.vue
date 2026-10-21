<script setup lang="ts">
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import ArcOrbitContent, {
  type IArcOrbitContentProps,
} from '../../core/arc-orbit/ArcOrbitContent.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonContent',
});

export interface IArcComparisonContentProps extends IArcOrbitContentProps {}

const props = defineProps<IArcComparisonContentProps>();

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-comparison-content text-(--alpha-arc-comparison-content)',
);
</script>

<template>
  <ArcOrbitContent
    v-if="$slots.default"
    v-bind="{ ...props, ...forwardedAttrs() }"
    :class="className()"
  >
    <slot />
  </ArcOrbitContent>
  <ArcOrbitContent
    v-else
    v-bind="{ ...props, ...forwardedAttrs() }"
    :class="className()"
  />
</template>
