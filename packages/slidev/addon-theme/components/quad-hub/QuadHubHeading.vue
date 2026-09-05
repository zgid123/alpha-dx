<script setup lang="ts">
import { computed, inject } from 'vue';

import { QUAD_HUB_CALLOUT_KEY } from '../../utils/quadHub';

defineOptions({
  name: 'QuadHubHeading',
});

export interface IQuadHubHeadingProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IQuadHubHeadingProps>(), {
  color: undefined,
});

const calloutContext = inject(QUAD_HUB_CALLOUT_KEY, undefined);

const headingColor = computed(() => {
  return (
    props.color ??
    calloutContext?.item.value.titleColor ??
    calloutContext?.item.value.color ??
    '#f29e4b'
  );
});
</script>

<template>
  <div
    class="alpha-quad-hub-heading font-bold text-[1.25rem] leading-tight tracking-tight m-0 p-0 select-none"
    :style="{
      color: headingColor,
      margin: 0,
      padding: 0,
      fontSize: '1.25rem',
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif',
    }"
  >
    <slot />
  </div>
</template>
