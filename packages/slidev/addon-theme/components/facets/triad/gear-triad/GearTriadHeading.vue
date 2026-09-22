<script setup lang="ts">
import { computed, inject } from 'vue';

import { GEAR_TRIAD_CALLOUT_KEY } from '../../../../utils/gearTriad';

defineOptions({
  name: 'GearTriadHeading',
});

export interface IGearTriadHeadingProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IGearTriadHeadingProps>(), {
  color: undefined,
});

const calloutContext = inject(GEAR_TRIAD_CALLOUT_KEY, undefined);

const headingColor = computed(() => {
  return props.color ?? calloutContext?.item.value.titleColor ?? '#0f172a';
});
</script>

<template>
  <div
    class="alpha-gear-triad-heading font-bold text-[1.15rem] tracking-tight leading-snug mb-1.5 select-none"
    :style="{
      color: headingColor,
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
    }"
  >
    <slot>
      {{ calloutContext?.item.value.title }}
    </slot>
  </div>
</template>
