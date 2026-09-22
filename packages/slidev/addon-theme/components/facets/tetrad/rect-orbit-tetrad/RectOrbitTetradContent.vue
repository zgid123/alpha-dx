<script setup lang="ts">
import { computed, inject } from 'vue';

import { RECT_ORBIT_TETRAD_CALLOUT_KEY } from '../../../../utils/rectOrbitTetrad';

defineOptions({
  name: 'RectOrbitTetradContent',
});

export interface IRectOrbitTetradContentProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IRectOrbitTetradContentProps>(), {
  color: undefined,
});

const calloutContext = inject(RECT_ORBIT_TETRAD_CALLOUT_KEY, undefined);

const contentColor = computed(() => {
  return props.color ?? calloutContext?.item.value.textColor ?? '#555555';
});
</script>

<template>
  <div
    class="alpha-rect-orbit-tetrad-content text-[1rem] leading-[1.38] font-normal tracking-tight m-0 p-0 select-none"
    :style="{
      color: contentColor,
      margin: 0,
      padding: 0,
      fontSize: '1rem',
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif',
    }"
  >
    <slot />
  </div>
</template>
