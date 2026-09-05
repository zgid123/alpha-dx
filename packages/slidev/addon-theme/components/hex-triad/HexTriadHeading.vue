<script setup lang="ts">
import { computed, inject } from 'vue';

import { HEX_TRIAD_CALLOUT_KEY } from '../../utils/hexTriad';

defineOptions({
  name: 'HexTriadHeading',
});

const calloutContext = inject(HEX_TRIAD_CALLOUT_KEY, undefined);
const headingColor = computed(() => {
  return calloutContext?.item.value.color ?? '#e11d48';
});
</script>

<template>
  <h3
    class="alpha-hex-triad-heading font-bold text-[1.25rem] tracking-tight mb-[0.5rem]"
    :style="{
      color: headingColor,
      fontSize: '1.25rem',
      fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    }"
  >
    <slot>Text Here</slot>
  </h3>
</template>
