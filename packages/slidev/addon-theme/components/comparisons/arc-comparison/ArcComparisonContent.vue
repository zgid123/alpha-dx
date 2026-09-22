<script setup lang="ts">
import ArcOrbitContent, {
  type IArcOrbitContentProps,
} from '../../core/arc-orbit/ArcOrbitContent.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonContent',
});

export interface IArcComparisonContentProps extends IArcOrbitContentProps {}

const props = defineProps<IArcComparisonContentProps>();
</script>

<template>
  <ArcOrbitContent
    v-if="$slots.default"
    v-bind="{ ...props, ...$attrs }"
    class="alpha-arc-comparison-content"
  >
    <slot />
  </ArcOrbitContent>
  <ArcOrbitContent
    v-else
    v-bind="{ ...props, ...$attrs }"
    class="alpha-arc-comparison-content"
  />
</template>
