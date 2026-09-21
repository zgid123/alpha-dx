<script setup lang="ts">
import { computed, inject } from 'vue';

import { RECT_ORBIT_TETRAD_CALLOUT_KEY } from '../../../utils/rectOrbitTetrad';

defineOptions({
  name: 'RectOrbitTetradHeading',
});

export interface IRectOrbitTetradHeadingProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IRectOrbitTetradHeadingProps>(), {
  color: undefined,
});

const calloutContext = inject(RECT_ORBIT_TETRAD_CALLOUT_KEY, undefined);

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
    class="alpha-rect-orbit-tetrad-heading font-bold text-[1.25rem] leading-tight tracking-tight m-0 p-0 select-none"
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
